// 实现俄罗斯方块AI的类

function Position_Manager(){
	this.initialize.apply(this, arguments);
}

Position_Manager.prototype.initialize = function(field, dataList){
	this.field = field;
	this.dataList = dataList;
}

Position_Manager.prototype.solution_generate = function(x, type, rotation){
	var box = this.dataList[type][rotation];
	var land_x = x;
	var land_y = 0;

	for(j in box){
		for(l in box[j]){
			if (box[j][l]!=0){
				box[j][l]=42;
			}
		}
	}
	while(!this.collide(box, land_x, land_y)){
		land_y++;
	}
	
	var solution = {
		x: land_x,
		y: land_y,
		rotation: rotation,
		box: box,
		result_field: this.merge(box,land_x,land_y)
	}
	
	return solution;
}

Position_Manager.prototype.PDValue = function(solution){
	var field = solution.result_field;
	
	var landingHeight = solution.y;
	var erodedPieceCellsMetric = 0;
	var originalBlocks = 0;
	var cancelledROWs = 0;
	var boardRowTransitions = 0;
	var boardColTransitions = 0;
	var boardBuriedHoles = 0;
	var boardWells = 0;
	var wellCursor = 0;
	
	for(i in field){
		for(j in field[i]){
			
			//Row Transition
			if((!field[i][j-1])||(!field[i][j+1])){
				boardRowTransitions++;
			}
			
			if(field[i][j+1]&&((field[i][j]==0 && field[i][j+1]!=0)||(field[i][j]!=0 && field[i][j+1]==0))){
				boardRowTransitions++;
			}
			
			//Col Transition
			if((!field[i+1])||(field[i][j]==0 && field[i+1][j]!=0)||(field[i][j]!=0 && field[i+1][j]==0)){
				boardColTransitions++;
			}
			
			//boardBuriedHoles
			if(field[i-1] && field[i][j+1] && field[i][j-1] && field[i][j]==0 && field[i-1][j]!=0 && field[i][j+1]!=0 && field[i][j-1]!=0){
				boardBuriedHoles++;
			}
			
			//boardWells
			if(field[i][j+1] && field[i][j-1] && field[i][j]==0 && field[i][j-1]!=0 && field[i][j+1]!=0){
				if(field[i+1] && field[i+1][j]==0){
					wellCursor++;
					boardWells = boardWells+wellCursor+1;
				}else{
					wellCursor = 0;
					boardWells++;
				}
			}
			
			//erodedPieceCellsMetric
			var isCancellable = true;
			if(field[i][j]==0){
				isCancellable = false;
			}
			
			if(field[i][j]==42){
				originalBlocks++;
			}
		}
		
		if(isCancellable){
			cancelledROWs++;
		}
	}
	
	erodedPieceCellsMetric = cancelledROWs*originalBlocks;
	
	//Final Value
	
	var PD_value = -landingHeight+ erodedPieceCellsMetric -boardRowTransitions - boardColTransitions - boardBuriedHoles - boardWells
	
	return PD_value
}

Position_Manager.prototype.collide = function(box, land_x, land_y){
	var len = box.length;
	var x = land_x;
	var y = land_y+1;

	for(var i=0; i<len; i++){
		if(i+y>=0){
			for(var j=0; j<box[i].length; j++){
				if (box[i][j] !== 0){

					if (i + y >= this.field.length || (i + y < this.field.length && this.field[i+y][j+x] != 0)){
						return true;
					}
				}
			}
		}
	}		
	return false;
}

Position_Manager.prototype.merge = function(box, land_x, land_y){
	var len = box.length;
	var temp_field = this.field.slice();
	var x = land_x;
	var y = land_y+1;
	
	for(var i=0; i<len; i++){
		if(i+y>=0){
			for(var j=0; j<box[i].length; j++){
				if(box[i][j] !==0 && temp_field[i+y] && temp_field[i+y][j+x] == 0){
					temp_field[i+y][j+x] = box[i][j];
				}
			}	
		}
	}
	
	return temp_field;
}

Position_Manager.prototype.update = function(field){
	this.field = field;
}