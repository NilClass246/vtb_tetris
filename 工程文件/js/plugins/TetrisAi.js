
function Position_Manager(){
	this.initialize.apply(this, arguments);
}

Position_Manager.prototype.initialize = function () {
	this.field = null;
	this.cur = null;
	this.emptylines = 0;
}

Position_Manager.prototype.inputData = function (field, cur) {
	this.field = TetrisManager.copy2DArray(field);
	this.cur = cur;
	this.filledlines = []
	for (var i = 0; i < this.field.length; i++) {
		for (var j = 0; j < this.field[i].length; j++) {
			if (this.field[i][j] !== 0) {
				this.filledlines.push(i)
            }
        }
	}
	this.emptylines = this.filledlines[0]
}

Position_Manager.prototype.generateAllSolution = function () {
	var solution_list = [];
	for (var i = 0; i < TetrisManager.data[this.cur.type].length; i++) {
		for (var j = 0; j < this.field[0].length; j++) {
			var tempBlock = {
				x: j,
				y: 0,
				rotation: i,
				box: []
			}

			tempBlock.box = TetrisManager.copy2DArray(TetrisManager.data[this.cur.type][i])

			if (this.collide(tempBlock, this.field)) {
				//pass
			} else {
				for (var k = 0; k < tempBlock.box.length; k++) {
					for (var l = 0; l < tempBlock.box[k].length; l++) {
						if (tempBlock.box[k][l]!=0) {
							tempBlock.box[k][l] = 42;
						}
					}
				}
				while (!this.collide(tempBlock, this.field)) {
					tempBlock.y += 1;
				}
				solution_list.push(tempBlock);
            }

        }
	}
	return solution_list;
}

Position_Manager.prototype.calculatePDValue = function (field, solution) {

	var landingHeight = solution.y;
	if (this.emptylines >= landingHeight) {
		var emptylines = landingHeight;
	} else {
		var emptylines = this.emptylines;
    }

	var erodedPieceCellsMetric = 0;
	var originalBlocks = 0;
	var cancelledROWs = 0;
	var boardRowTransitions = 0;
	var boardColTransitions = 0;
	var boardBuriedHoles = 0;
	var boardWells = 0;
	var wellCursor = 0;
	var wells = [];

	boardRowTransitions += 2 * emptylines;
	boardColTransitions += field[0].length;

	for (var i = (emptylines-1); i < field.length; i++){
		var isCancellable = true;
		for (var j = 0; j < field[i].length; j++) {
			//Row Transition
			if ((!this.isFilled(field, i, j)) && (!this.isExisted(field, i, j-1))) {
				boardRowTransitions++;
			}

			if (this.isFilled(field, i, j) !== this.isFilled(field, i, j+1)) {
				boardRowTransitions++;
			}

			if ((!this.isFilled(field, i, j)) && (!this.isExisted(field, i-1, j))) {
				boardColTransitions++;
            }

			//Col Transition
			if (this.isFilled(field, i, j) !== this.isFilled(field, i+1, j)) {
				boardColTransitions++;
			}

			//boardBuriedHoles

			if ((this.isFilled(field, i, j)) && (!this.isFilled(field, i + 1, j))) {
				var curX = j-1;
				var curY = i+1;
				rightWall = false;
				leftWall = false;
				while (this.isFilled(field, curY, curX)) {
					if (this.isFilled(field, curY + 1, curX + 1)) {
						leftWall = true;
						break;
					}
					curY += 1;
				}

				var curX = j;
				var curY = i;
				while (this.isFilled(field, curY, curX)) {
					if (this.isFilled(field, curY + 1, curX + 1)) {
						rightWall = true;
						break;
					}
					curX += 1;
				}
				if (leftWall && rightWall) {
					boardBuriedHoles++;
                }
            }

			//boardWells

			if (this.isFilled(field, i, j - 1) && (!this.isFilled(field, i, j)) && (this.isFilled(field,i, j + 1))) {
				if (!wells[wellCursor]) {
					wells.push([0])
				} else {
					wells[wellCursor].push(0)
					wellCursor += 1;
                }
            }

			//erodedPieceCellsMetric
			if (!this.isFilled(field, i, j)) {
				isCancellable = false;
			}

			if(field[i][j]==42){
				originalBlocks++;
			}
		}

		if(isCancellable){
			cancelledROWs++;
		}

		var wellNum = 0
		while (wells[wellCursor]) {
			arr = wells.splice(wellCursor, 1)
			for (var k = 0; k < arr.length; k++) {
				wellNum += k;
			}
		}
		boardWells += wellNum;
		wellCursor = 0;

	}

	erodedPieceCellsMetric = cancelledROWs*originalBlocks;
	//Final Value
	var PD_value =
		4.500158825082766 * landingHeight
		+ 3.4181268101392694 * erodedPieceCellsMetric
		- 3.2178882868487753 * boardRowTransitions
		- 9.348695305445199 * boardColTransitions
		- 7.899265427351652 * boardBuriedHoles
		- 3.3855972247263626 * boardWells
	return PD_value

}

Position_Manager.prototype.isFilled = function (field, i, j) {
	if (!this.isExisted(field,i,j)) {
		return true
	}
	if (field[i][j] != 0) {
		return true
	}
	return false
}

Position_Manager.prototype.isExisted = function (field, i, j) {
	if ((i >= field.length) || (i < 0)) {
		return false
	}
	if ((j >= field[i].length) || (j < 0)) {
		return false
	}
	return true
}

Position_Manager.prototype.findBestSolution = function () {
	var solution_list = this.generateAllSolution();
	var BestSolution = solution_list[0];
	var BestPDValue = this.calculatePDValue(this.merge(solution_list[0]), solution_list[0]);
	for (var i = 0; i < solution_list.length; i++) {
		PDValue = this.calculatePDValue(this.merge(solution_list[i]), solution_list[i]);
		if (PDValue > BestPDValue) {
			BestSolution = solution_list[i];
			BestPDValue = PDValue;
        }
	}
	return BestSolution;
}

Position_Manager.prototype.render_ActionQueue = function () {
	var BestSolution = this.findBestSolution();
	var ActionQueue = [];
	if (this.cur.type == "o") {
		var x = TetrisManager.blockInitalPos + 1;
	} else {
		var x = TetrisManager.blockInitalPos;
    }
	var tempCur = {
		x: x,
		y: 0,
		rotation: 0,
		rotationTime: 0
	}

	while (tempCur.rotation < BestSolution.rotation) {
		tempCur = this.RotateRight(tempCur);
		ActionQueue.push('Rotate');
	}

	while (tempCur.x > BestSolution.x) {
		tempCur.x -= 1
		ActionQueue.push('MoveLeft')
	}

	while (tempCur.x < BestSolution.x) {
		tempCur.x += 1
		ActionQueue.push('MoveRight')
	}

	ActionQueue.push('Drop');
	return ActionQueue;
}

Position_Manager.prototype.collide = function (tempBlock, field) {
	var box = tempBlock.box;
	var len = tempBlock.box.length;
	var x = Number(tempBlock.x);
	var y = Number(tempBlock.y)+1;
	for (i = 0; i < len; i++) {
		if (i + y >= 0) {
			for (j = 0; j < box[i].length; j++) {
				if (box[i][j] !== 0) {
					if (i + y >= field.length || (j + x >= field[i+y].length) ||(i + y < field.length && field[i + y][j + x] !== 0)) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

Position_Manager.prototype.RotateRight = function (tempBlock) {
	tempBlock.rotationTime += 1;
	tempBlock.rotation += 1;
	if (this.cur.type == 'o') {
		return tempBlock
	}

	if ((this.cur.type != '1') && (this.cur.type != 'o')) {
		Rule = TetrisManager.GeneralRuleSet[((tempBlock.rotationTime % 4) + '')];
	}
	if ((this.cur.type == '1')) {
		Rule = TetrisManager.IRuleSet[((tempBlock.rotationTime % 4) + '')];
	}

	var xHow = Rule[0][0];
	var yHow = Rule[0][1];

	tempBlock.x += xHow
	tempBlock.y += yHow

	return tempBlock;
}

Position_Manager.prototype.merge = function (solution) {
	tempfield = TetrisManager.copy2DArray(this.field);

	var box = solution.box;
	var len = solution.box.length;
	var y = Number(solution.y)
	var x = Number(solution.x)
	for (i = 0; i < len; i++) {
		if (i + y >= 0) {
			for (j = 0; j < box[i].length; j++) {
				if (box[i][j] !== 0 && tempfield[i + y] && tempfield[i + y][j + x] == 0) {
					tempfield[i + y][j + x] = box[i][j];
				}
			}
		}
	}	

	return tempfield;
}
