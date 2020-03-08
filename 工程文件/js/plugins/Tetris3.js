//=============================================================================
// Tetris.js v0.3
//=============================================================================

function Tetris_Window() {
	this.initialize.apply(this, arguments);
}

Tetris_Window.prototype = Object.create(Window_Base.prototype);
Tetris_Window.prototype.constructor = Tetris_Window;

Tetris_Window.prototype.initialize = function (x,y,width,height) {
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
}

Tetris_Window.prototype.refresh = function () {
	this.contents.clear();
}

function Scene_Tetris() {
	this.initialize.apply(this, arguments);
}

Scene_Tetris.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Tetris.prototype.constructor = Scene_Tetris;

Scene_Tetris.prototype.initialize = function () {
	Scene_ItemBase.prototype.initialize.call(this);
	this.initializeData();
	this.initialize_Actor();
	this.enemies = enemy_List[$gameVariables.value(1)];
	this.initialize_Enemy();
}

Scene_Tetris.prototype.initialize_Actor = function () {
	actor = $gameActors.actor(1)
	weapon = $gameActors.actor(1).equips()

	this.player = {
		category: "player",
		xposition: 375,
		yposition: 27,
		step: 20000,
		field: new Array(this.COL),
		cur: null,
		next: [],
		hold: null,
		shadowImage: null,
		n: 0,
		SCORE: 0,
		gaugeSCORE: 0,

		nextWindows: null,
		holdWindow: null,
		pictureBoard: new Tetris_Window(),
		picture: new Sprite(),

		Hp: actor.hp,
		Mhp: actor.mhp,
		Atk: actor.atk,
		Def: actor.def,

		AtkFreq: 10,
	}

	//for (i = 0; i < this.player.field.length; i++) {
	//	this.player.field[i] = new Array(this.ROW).fill(0);
	//}

	this.player.field = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	]

	this.player.picture.bitmap = ImageManager.loadPicture("redDumpling");
}

Scene_Tetris.prototype.initialize_Enemy = function () {
	// game_field = new Array(this.COL);
	// for (i = 0; i < game_field.length; i++) {
		// game_field[i] = new Array(this.ROW).fill(0);
	// }
	if (this.enemies.length > 1) {
		this.multiple = true
	}
	for (i in this.enemies) {
		this.enemies[i].curHp = this.enemies[i].Mhp;
		this.enemies[i].curDef = this.enemies[i].Def;
		//	this.enemies[i].field = new Array(this.COL);
		//	for (j in this.enemies[i].field) {
		//		this.enemies[i].field[j] = new Array(this.ROW).fill(0);
		//	}
		//	this.enemies[i].pathGenerator = new Position_Manager(this.enemies[i].field, this.data);
		//	if(i)
	}
	// this.enemies[0].pathGenerator = new Position_Manager(game_field, this.data);
}

Scene_Tetris.prototype.initializeData = function () {
	this.ROW = 10;
	this.COL = 23;
	this.running = false;
	this.xrange = 25;
	this.yrange = 25;

	this.seTick = {
		name: "Click",
		pan: 0,
		pitch: 50,
		volume: 150
	};
	this.seBoom = {
		name: "Boom",
		pan: 0,
		pitch: 50,
		volume: 150
	};

	//this.battleInfo = battleList[$gameVariables.value(1)];

	this.data = {
		'o': [
			[
				[0, 0],
				[1, 1],
				[1, 1]
			]
		],
		's': [
			[
				[0, 0, 0],
				[0, 2, 2],
				[2, 2, 0]
			],
			[
				[0, 0, 0],
				[2, 0, 0],
				[2, 2, 0],
				[0, 2, 0],
			],
			[
				[0, 0, 0],
				[0, 2, 2],
				[2, 2, 0]
			],
			[
				[0, 0, 0],
				[2, 0, 0],
				[2, 2, 0],
				[0, 2, 0],
			]
		],
		'5': [
			[
				[0, 0, 0],
				[3, 3, 0],
				[0, 3, 3]
			],
			[
				[0, 0, 0],
				[0, 3, 0],
				[3, 3, 0],
				[3, 0, 0],
			],
			[
				[0, 0, 0],
				[3, 3, 0],
				[0, 3, 3]
			],
			[
				[0, 0, 0],
				[0, 3, 0],
				[3, 3, 0],
				[3, 0, 0],
			]
		],
		'l': [
			[
				[0, 0, 0],
				[0, 0, 4],
				[4, 4, 4]
			],
			[
				[0, 0, 0],
				[4, 0, 0],
				[4, 0, 0],
				[4, 4, 0],
			],
			[
				[0, 0, 0],
				[4, 4, 4],
				[4, 0, 0]
			],
			[
				[0, 0, 0],
				[4, 4, 0],
				[0, 4, 0],
				[0, 4, 0],
			]
		],
		't': [
			[
				[0, 0, 0],
				[0, 5, 0],
				[5, 5, 5]
			],
			[
				[0, 0, 0],
				[5, 0, 0],
				[5, 5, 0],
				[5, 0, 0],
			],
			[
				[0, 0, 0],
				[5, 5, 5],
				[0, 5, 0]
			],
			[
				[0, 0, 0],
				[0, 5, 0],
				[5, 5, 0],
				[0, 5, 0],
			]
		],
		'j': [
			[
				[0, 0, 0],
				[6, 0, 0],
				[6, 6, 6]
			],
			[
				[0, 0, 0],
				[6, 6, 0],
				[6, 0, 0],
				[6, 0, 0],
			],
			[
				[0, 0, 0],
				[6, 6, 6],
				[0, 0, 6]
			],
			[
				[0, 0, 0],
				[0, 0, 6],
				[0, 0, 6],
				[0, 6, 6]
			]

		],
		'1': [
			[
				[0, 0, 0, 0],
				[7, 7, 7, 7]
			],
			[
				[0, 0, 0, 0],
				[7, 0, 0, 0],
				[7, 0, 0, 0],
				[7, 0, 0, 0],
				[7, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[7, 7, 7, 7]
			],
			[
				[0, 0, 0, 0],
				[7, 0, 0, 0],
				[7, 0, 0, 0],
				[7, 0, 0, 0],
				[7, 0, 0, 0]
			]
		]
	};

	this.generalKick = {
		"1to2": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
		"2to1": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
		"2to3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
		"3to2": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
		"3to4": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
		"4to3": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
		"4to1": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
		"1to4": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
	}

	this.IKick = {
		"1to2": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
		"2to1": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
		"2to3": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
		"3to2": [[0, 0], [1, 0], [-2, 1], [1, -2], [-2, -1]],
		"3to4": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
		"4to3": [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
		"4to1": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
		"1to4": [[0, 0], [-1, 0], [2, 1], [-1, 2], [2, -1]]
	}

	this.block_pics = ["1", "5", "j", "l", "o", "s", "t"];
	this.refreshTime = 0;

	this.nextWindows = [];
	this.enemyGaugeWindows = [];
}

Scene_Tetris.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	AudioManager.playSe(this.seBoom);
	this.startFadeIn(60, false);
}

Scene_Tetris.prototype.update = function () {
	Scene_MenuBase.prototype.update.call(this);
	
	if (Input.isTriggered('ok')|| TouchInput.isPressed()) {
		if(this.gameover){
			this.startFadeIn(60, false);
			SceneManager.pop(Scene_Tetris);
		}else{
			if(!this.running){
				// this.say(this.battleInfo.playMsg)
				AudioManager.playSe(this.seTick);
				this.player.oldTime = Date.now();
				this.refreshPlayerWindow();
				this.drawArea(this.player);
				this.shadow();
				this.running = true;
			}
		}
	}
	if(this.running){
		this.update_Actor();
		this.update_Enemy();
	}
}

Scene_Tetris.prototype.update_Actor = function(){
	
	if (Input.isTriggered('right')){
		if(this.bMove(this.player, 1)){
			this.player.cur.block.x += this.xrange;
			this.shadow();
		}
	}
	
	if (Input.isTriggered('left')){
		if(this.bMove(this.player, -1)){
			this.player.cur.block.x -= this.xrange;
			this.shadow();
		}
	}
	
	if (Input.isTriggered('up')){
			this.rotateBox(this.player,1);
			this.shadow();
	}
	
	if (Input.isTriggered('control')){
			this.rotateBox(this.player,-1);
			this.shadow();
	}
	
	if (Input.isTriggered('shift')){
			this.holdBox();
			this.shadow();
	}
	
	if (Input.isTriggered('space')){
		if(this.player.shadowImage){
			this.player.cur.block.x = this.player.shadowImage.block.x;
			this.player.cur.block.y = this.player.shadowImage.block.y;
			this.player.n = this.player.step;
		}
	}
	
	if (Input.isPressed('down')){
		this.player.step = 200;
	}else{
		this.player.step = 20000;
	}
	
	if (this.player.cur.block.y < this.yposition){
		// this.say(this.battleInfo.defeatMsg)
		AudioManager.playSe(this.seBoom);
		this.running = false;
		this.gameover = true;
		//this.enemy.bitmap = ImageManager.loadPicture(this.battleInfo.enemyPic+ "_laugh");
		$gameSwitches.setValue(20, false);
	}
	
	this.player.n += Date.now() - this.player.oldTime;
	if (this.player.n >= this.player.step) {

		if (this.collide(this.player, this.player.cur)) {
			this.mergeBox(this.player);
			this.removeChild(this.player.cur.block);
			this.drawArea(this.player);
			this.player.cur = null;
			this.createBox(this.player);
			this.shadow();
			this.refreshNextWindows();
		} else {
			this.player.cur.block.y += this.yrange;
		}

		this.player.n = 0;
		this.player.oldTime = Date.now();
		this.refreshTime++;
	}

	if (this.player.gaugeSCORE >= this.player.AtkFreq) {
		overkill = this.player.gaugeSCORE - this.player.AtkFreq
		damage = this.player.Atk + overkill;
		if (this.multiple) {
			rnd = Math.floor(Math.random() * (this.enemies.length - 1));
			this.AttAck(this.player, this.enemies[rnd], damage);
			this.refreshEnemyHPGauge(rnd);
		} else {
			this.AttAck(this.player, this.enemies[0], damage);
			this.refreshEnemyHPGauge(0);
		}
		this.player.gaugeSCORE = 0;
		this.drawArea(this.player);
	}
}

Scene_Tetris.prototype.update_Enemy = function () {
	// for (i in this.enemies) {
		// this.enemies[i].n += Date.now()
		// if (this.enemies[i].n >= this.enemies[i].step) {
			// nextAction = this.enemies[i].actionQueue.shift();
			// switch (nextAction) {
				// case "rotate":
					// this.rotateBox(this.enemies[i].cur, 1);
				// case "moveRight":
					// this.enemies[i].cur.block.x += this.xrange;
				// case "moveLeft":
					// this.enemies[i].cur.block.x -= this.xrange;
				// case "downwards":
					// this.enemies[i].step = 500;
					// this.enemies[i].cur.block.y += this.yrange;
			// }
		// }
	// }
}

Scene_Tetris.prototype.update_Animation = function(){
	
}

Scene_Tetris.prototype.mergeBox = function(battler){
	AudioManager.playSe(this.seTick);
	box = battler.cur.box;
	len = battler.cur.box.length;
	y = Math.floor((battler.cur.block.y-battler.yposition)/this.yrange);
	x = Math.floor((battler.cur.block.x-battler.xposition)/this.xrange);
	for(i=0; i<len; i++){
		if(i+y>=0){
			for(j=0; j<box[i].length; j++){
				if(box[i][j] !==0 && battler.field[i+y] && battler.field[i+y][j+x] == 0){
					battler.field[i+y][j+x] = box[i][j];
				}
			}	
		}
	}		

	arr = this.isRemove(battler);
	
	if(arr){
		if(arr[0]){
			AudioManager.playSe(this.seBoom);
			// this.say(this.battleInfo.mergeMsg);
		}
		for(i=0; i<arr.length; i++){
			battler.field.splice(arr[i], 1);
			battler.field.unshift(new Array(this.ROW).fill(0));
		}
		this.player.SCORE+=Math.pow(3, arr.length);
		this.player.gaugeSCORE += Math.pow(3, arr.length);
	};
}

Scene_Tetris.prototype.isRemove = function(battler){
	arr = [];
	for(i=0; i<battler.field.length; i++){
		remove = true;
		for(j=0; j<battler.field[i].length; j++){
			if(battler.field[i][j] == 0){
				remove = false;
			}
		}
		if(remove){
			arr.push(i);
		}
	}
	return arr;
}
	
Scene_Tetris.prototype.drawArea = function(battler){
	this.refreshPlayerWindow();

	if (battler.category == "player") {
		mainWindow = this.playerMainWindow;
	}

	box = battler.cur.box;
	x = Math.floor((battler.cur.block.x-battler.xposition)/this.xrange);
	y = Math.floor((battler.cur.block.y-battler.yposition)/this.yrange)+1;

	for(i in battler.field){
		for(j in battler.field[i]){
			if(battler.field[i][j] != 0){
				blackBlock = new Sprite();
				blackBlock.bitmap = ImageManager.loadPicture("block");
				blackBlock.x = j*(816/33)+8.8+0.2*j;
				blackBlock.y = (i-1)*(624/25)+5.2;
				mainWindow.addChild(blackBlock);
			}
		}
	}
	
//	for(i in box){
//		for(j in box[i]){
//			if(box[i][j]!=0){
//				blackBlock = new Sprite();
//				blackBlock.bitmap = ImageManager.loadPicture("block");
//				blackBlock.x = (j+x)*(816/33)+8.8+0.2*(j+x);
//				blackBlock.y = (i+y-1)*(624/25)+5.2;
//				mainWindow.addChild(blackBlock);
//			}
//		}
//	}
}

Scene_Tetris.prototype.findPath = function (enemy) {
	 //best_solution = null;
	 //best_PDvalue = null;

	 //for (Assume_X = 0; Assume_X < this.ROW; Assume_X++) {
		// for (rotation in this.data[enemy.cur.type]) {
		//	 cur_solution = enemy.pathGenerator.solution_generate(Assume_X, enemy.cur.type, rotation);
		//	 if (cur_solution) {
		//		 cur_PDvalue = enemy.pathGenerator.PDValue(cur_solution);

		//		 if (!best_PDvalue || cur_PDvalue > best_PDvalue) {
		//			 best_solution = cur_solution;
		//			 best_PDvalue = cur_PDvalue;
		//		 }
		//	 }
		// }
	 //}

	 //target_solution = best_solution;

	 //enemy.actionQueue = this.AIactionsRender(enemy.cur, target_solution);
}

Scene_Tetris.prototype.createBox = function (battler) {

	if (battler.next.length == 0) {
		for (i = 0; i < 4; i++) {
			rnd = 6;
			// Math.floor(Math.random() * 7)
			battler.next.push({
				block: new Sprite(),
				type: this.block_pics[rnd],
				rotation: 0,
				rotationTime:0,
				box: this.data[this.block_pics[rnd]][0]
			});
			battler.next[i].block.bitmap = ImageManager.loadPicture(this.block_pics[rnd]);
			if (battler.nextWindows) {
				battler.nextWindows[i].addChild(battler.next[i].block)
			}
		}
	}

	if (!battler.cur) {
		rnd = Math.floor(Math.random() * 7);

		battler.next.push({
			block: new Sprite(),
			type: this.block_pics[rnd],
			rotation: 0,
			rotationTime:0,
			box: this.data[this.block_pics[rnd]][0]
		});
		battler.next[battler.next.length - 1].block.bitmap = ImageManager.loadPicture(this.block_pics[rnd]);
		battler.cur = battler.next.shift();
		battler.cur.block.x = battler.xposition + 3*this.xrange +7;
		battler.cur.block.y = battler.yposition;

		while (this.collide(battler, battler.cur)) {
			battler.cur.block.y -= 1;
		}
		if (battler.category == "enemy") {
			this.findPath(battler);
		}
		this.addChild(battler.cur.block);
	}
}

Scene_Tetris.prototype.collide = function(battler, cur){
	box = cur.box;
	len = cur.box.length;
	x = Math.floor((cur.block.x-battler.xposition)/this.xrange);
	y = Math.floor((cur.block.y-battler.yposition)/this.yrange)+1;
	for(i=0; i<len; i++){
		if(i+y>=0){
			for(j=0; j<box[i].length; j++){
				if(box[i][j] !== 0){

					if(i+y>=battler.field.length || (i+y<battler.field.length && battler.field[i+y][j+x] !== 0)){
						return true;
					}
				}
			}
		}
	}		
	return false;
}

Scene_Tetris.prototype.PlaceTest = function(battler, tempBlock, cur){
	type = cur.type;
	rotation = cur.rotation;
	box = cur.box;
	x = Math.floor((tempBlock.x - battler.xposition) / this.xrange);
	y = Math.floor((tempBlock.y - battler.yposition) / this.yrange);
		
	if(box){
		len = box.length;
	}else{
		return false;
	}
	
	for(i=0; i<len; i++){
		if(i+y>=0){
			for(j=0; j<box[i].length; j++){
				if(box[i][j] !== 0){
					if (j + x < 0 || j + x == battler.field[i].length || (j + x >= 0 && battler.field[i+y] && battler.field[i+y][j+x]!=0)){
						return false;
					}
				}
			}
		}
	}		
	return true;
} 

Scene_Tetris.prototype.bMove = function(battler, n){
	cur = battler.cur;
	x = Math.floor((battler.cur.block.x - battler.xposition) / this.xrange) + n;
	y = Math.floor((battler.cur.block.y-battler.yposition)/this.yrange);
	for(i=0; i<battler.cur.box.length; i++){
		for(j=0; j<battler.cur.box[i].length; j++){
			if(cur.box[i][j]!==0){
				if(j+x<0 || j+x==battler.field[0].length || ( i+y>=0 && j+x>=0 && battler.field[i+y] && battler.field[i+y][j+x]!==0)){
					return false;
				}
			}
		}
	}
	return true;
}

Scene_Tetris.prototype.rotateBox = function (battler, direction) {
	cur = battler.cur;
	tempBlock = this.rotationRule(direction);

	if (direction == 1) {
		tempBox = this.rotateRight();
	} else {
		tempBox = this.rotateLeft();
	}

	Finaltemp = this.kickTheWall(cur, tempBlock, tempBox, direction);

	if (Finaltemp) {
		type = this.player.cur.type;
		rotation = this.player.cur.rotation;
		this.removeChild(this.player.cur.block);
		this.player.cur.block.x = Finaltemp.x;
		this.player.cur.block.y = Finaltemp.y;
		this.player.cur.rotationTime = Finaltemp.rotationTime;
		this.player.cur.box = Finaltemp.box;
		if (direction == 1) {
			if (rotation + 1 <= this.data[type].length - 1) {
				this.player.cur.block.bitmap = ImageManager.loadPicture(type + (rotation + 1))
			} else {
				this.player.cur.block.bitmap = ImageManager.loadPicture(type);
			}
		} else {
			if (rotation - 1 >= 0) {
				if (rotation - 1 == 0) {
					this.player.cur.block.bitmap = ImageManager.loadPicture(type);
				} else {
					this.player.cur.block.bitmap = ImageManager.loadPicture(type + (rotation - 1));
				}
			} else {
				if ((this.data[type].length - 1) == 0) {
					this.player.cur.block.bitmap = ImageManager.loadPicture(type);
				} else {
					this.player.cur.block.bitmap = ImageManager.loadPicture(type + (this.data[type].length - 1));
				}
			}
		}
		this.player.cur.rotation = Finaltemp.rotation;
		this.addChild(this.player.cur.block);
	}
	

}

Scene_Tetris.prototype.kickTheWall = function (cur, tempBlock, tempBox, direction) {
	type = cur.type;
	rotation = cur.rotation;
	beginning = rotation + 1;
	if (rotation + direction < 0) {
		ending = 4
	}
	if (rotation + direction >= 4) {
		ending = 1
	} else {
		ending = rotation + direction + 1
	}

	key = beginning + "to" + ending;

	if (type == "1") {
		for (i in this.IKick[key]) {
			smallTemp = {
				x: tempBlock.x,
				y: tempBlock.y
			}
			smallTemp.x += this.IKick[key][i][0] * this.xrange;
			smallTemp.y += this.IKick[key][i][1] * this.yrange;
			if (this.PlaceTest(this.player, smallTemp, tempBox)) {
				FinalResult = {
					x: smallTemp.x,
					y: smallTemp.y,
					rotationTime: tempBlock.rotationTime,
					box: tempBox.box,
					rotation: tempBox.rotation,
				}
				return FinalResult;
			}
		}
		return null;
	}

	if (type != "o"&& type !="1") {
		for (i in this.generalKick[key]) {
			smallTemp = {
				x: tempBlock.x,
				y: tempBlock.y
			}
			smallTemp.x += this.generalKick[key][i][0] * this.xrange;
			smallTemp.y += this.generalKick[key][i][1] * this.yrange;
			if (this.PlaceTest(this.player, smallTemp, tempBox)) {
				FinalResult = {
					x: smallTemp.x,
					y: smallTemp.y,
					rotationTime: tempBlock.rotationTime,
					box: tempBox.box,
					rotation: tempBox.rotation,
				}
				return FinalResult;
			}
		}
		return null;
	}
}

Scene_Tetris.prototype.rotateRight = function () {
	tempCur = {
		box:null,
		rotation: this.player.cur.rotation
	};
	type = this.player.cur.type;
	rotation = this.player.cur.rotation;
	if (rotation + 1 <= this.data[type].length - 1) {
		tempCur.box = this.data[type][rotation + 1];
		tempCur.rotation++;
	} else {
		tempCur.box = this.data[type][0];
		tempCur.rotation = 0;
	}

	return tempCur;
}

Scene_Tetris.prototype.rotateLeft = function () {

	tempCur = {
		box: null,
		rotation: this.player.cur.rotation
	};
	type = this.player.cur.type;
	rotation = this.player.cur.rotation;
	if (rotation - 1 >= 0) {
		tempCur.box = this.data[type][rotation - 1];
		tempCur.rotation -= 1;
	} else {
		tempCur.box = this.data[type][this.data[type].length - 1];
		tempCur.rotation = this.data[type].length - 1;
	}

	return tempCur;
}

Scene_Tetris.prototype.rotationRule = function (direction) {
	tempBlock = {
		x: this.player.cur.block.x,
		y: this.player.cur.block.y,
		rotationTime: this.player.cur.rotationTime+1
	}
	switch (this.player.cur.type) {
		case "s":
			// y
			switch (tempBlock.rotationTime) {
				case 2:
					tempBlock.y += this.yrange;
					break;
				case 1:
					tempBlock.y -= this.yrange;
					break;
			}
			if (tempBlock.rotationTime > 2) {
				switch ((tempBlock.rotationTime - 2) % 4) {
					case 1:
						tempBlock.y -= this.yrange;
						break;
					case 0:
						tempBlock.y += this.yrange;
						break;

				}
			}
			// x
			switch (tempBlock.rotationTime % 4) {
				case 1:
					tempBlock.x += this.xrange;
					break
				case 2:
					tempBlock.x -= this.xrange;
					break
			}
			break
		case "5":
			// y
			switch (tempBlock.rotationTime) {
				case 2:
					tempBlock.y += this.yrange;
					break;
				case 1:
					tempBlock.y -= this.yrange;
					break;
			}
			if (tempBlock.rotationTime > 2) {
				switch ((tempBlock.rotationTime-2) % 4) {
					case 1:
						tempBlock.y -= this.yrange;
						break;
					case 0:
						tempBlock.y += this.yrange;
						break;

				}
			}
			// x
			switch (tempBlock.rotationTime % 4) {
				case 1:
					tempBlock.x += this.xrange;
					break
				case 2:
					tempBlock.x -= this.xrange;
					break
			}
			break
		case "t":
			if (tempBlock.rotationTime == 1) {
				tempBlock.y -= this.yrange;
			}
			switch (tempBlock.rotationTime % 4) {
				case 1:
					tempBlock.x += this.xrange;
					break
				case 2:
					tempBlock.x -= this.xrange;
					tempBlock.y += this.yrange;
					break
				case 3:
					tempBlock.y -= this.yrange;
					break
			}
			break
		case "1":
			switch (tempBlock.rotationTime % 4) {
				case 1:
					tempBlock.x += 2 * this.xrange;
					tempBlock.y -= 2*this.yrange;
					break
				case 2:
					tempBlock.x -= 2 * this.xrange;
					tempBlock.y += 2 * this.yrange;
					break
				case 3:
					tempBlock.x += this.xrange;
					tempBlock.y -= 2 * this.yrange;
					break
				case 0:
					tempBlock.x -= this.xrange;
					tempBlock.y += this.yrange;
			}
			break
		case "j":
			if (tempBlock.rotationTime == 1) {
				tempBlock.y -= this.yrange;
			}
			switch (tempBlock.rotationTime % 4) {
				case 1:
					tempBlock.x += this.xrange;
					break
				case 2:
					tempBlock.x -= this.xrange;
					tempBlock.y += this.yrange;
					break
				case 3:
					tempBlock.y -= this.yrange;
					break
			}
			break
		case "l":
			if (tempBlock.rotationTime == 1) {
				tempBlock.y -= this.yrange;
			}
			switch (tempBlock.rotationTime % 4) {
				case 1:
					tempBlock.x += this.xrange;
					break
				case 2:
					tempBlock.x -= this.xrange;
					tempBlock.y += this.yrange;
					break
				case 3:
					tempBlock.y -= this.yrange;
					break
			}
			break
	}

	return tempBlock;
}

Scene_Tetris.prototype.holdBox = function(){
	
	if(!this.player.hold){
		this.player.hold = this.player.cur;
		this.player.cur = null;
		this.player.hold.block.x =this.calPositionX(this.player.hold);
		this.player.hold.block.y =45;
		this.player.holdWindow.addChild(this.player.hold.block);
		this.createBox(this.player);
	}else{
		this.removeChild(this.player.cur.block);
		temp = this.player.cur;
		this.player.cur = this.player.hold;
		this.player.cur.block.x = temp.block.x;
		this.player.cur.block.y = temp.block.y;
		this.addChild(this.player.cur.block);
		this.player.hold = temp;
		this.player.hold.block.x =this.calPositionX(this.player.hold);
		this.player.hold.block.y =45;
		this.player.holdWindow.addChild(this.player.hold.block);
	}
}

Scene_Tetris.prototype.calPositionX = function(cur){
	type = cur.type;
	rotation = cur.rotation;
	
	if(type == "o"){
		return 10;
	}
	
	if(type == "l" && rotation == 1){
		return 0;
	}
	
	if((rotation == 1)||(rotation == 3)){
		if((type == "s")||(type == "5")||(type == "l")||(type == "t")||(type == "j")){
			return 10;
		}
	}
	
	return 5;
}

Scene_Tetris.prototype.shadow = function(){
	type = this.player.cur.type;
	rotation = this.player.cur.rotation;
	if(rotation==0){
		bitmap = ImageManager.loadPicture(type+"_S");
	}else{
		bitmap = ImageManager.loadPicture(type+(rotation+"_S"));
	}
	x = this.player.cur.block.x;
	y = this.player.cur.block.y;
	
	if(this.player.shadowImage){
		this.removeChild(this.player.shadowImage.block);
	}
	
	this.player.shadowImage = {
		block: new Sprite(),
		box: this.data[type][rotation]
	}
	
	this.player.shadowImage.block.bitmap = bitmap;
	this.player.shadowImage.block.x = x;
	this.player.shadowImage.block.y = y;
	
	while(!this.collide(this.player, this.player.shadowImage)){
		this.player.shadowImage.block.y += this.yrange;
	}
	this.addChild(this.player.shadowImage.block);
}

Scene_Tetris.prototype.AttAck = function (source, target, damage) {
	if (target.category == "enemy") {
		target.curHp -= 3 * (damage) - 2 * (target.curDef);
	} else {
		target.Hp -= 3 * (damage) - 2 * (target.Def)
	}
}

Scene_Tetris.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);
	this.createPlayerWindows();
	 this.createEnemyWindows();
	this.createBox(this.player);
	this.refreshNextWindows();
	// for (i in this.enemies) {
		// this.createBox(this.enemies[i]);
	// }
	this.drawArea(this.player);
	this.dialogWindow = new Tetris_Window();
	this.dialogWindow.removeChildAt(0);
	this.dialogSkin = new Sprite();
	this.dialogSkin.bitmap = ImageManager.loadPicture("dialogSkin");

}

Scene_Tetris.prototype.createPlayerWindows = function () {
	this.holdWindow = new Tetris_Window(this.player.xposition - 120, this.player.yposition-5, 120, 100);
	this.holdWindow.drawText("hold", 12, -10);
	this.player.holdWindow = this.holdWindow;

	this.refreshPlayerWindow();
	
	this.player.pictureBoard.move(0, 100, 400, 624);
	this.player.pictureBoard.removeChildAt(0);
	this.player.pictureBoard.addChild(this.player.picture);

	this.playerGaugeBoard = new Tetris_Window(0, 500, 500, 200);
	this.playerGaugeBoard.padding = 0;
	this.playerGaugeBoard.removeChildAt(0);

	this.addWindow(this.player.pictureBoard);
	this.addWindow(this.playerGaugeBoard);
	this.addWindow(this.player.holdWindow);
	this.addWindow(this.playerMainWindow);

	for (i = 0; i < 4; i++) {
		this.nextWindows.push(new Tetris_Window(this.player.xposition + this.ROW * this.xrange + 47, this.player.yposition - 5 + 90 * i, 120, 90));
	}
	this.player.nextWindows = this.nextWindows;
	for (i = 0; i < 4; i++) {
		this.addChild(this.player.nextWindows[i]);
	}
	this.refreshPlayerGauge();
	
}

Scene_Tetris.prototype.createEnemyWindows = function () {
	for (i = 0; i < this.enemies.length; i++) {
		this.enemies[i].pictureBoard = new Tetris_Window(this.enemies[i].xposition, this.enemies[i].yposition, this.enemies[i].width, this.enemies[i].height);
		this.enemies[i].pictureBoard.removeChildAt(0);
		this.enemies[i].picture.bitmap = ImageManager.loadPicture("enemies/" + this.enemies[i].pictureName + "_normal");
		this.enemies[i].pictureBoard.addChild(this.enemies[i].picture);
		this.enemyGaugeWindows.push(new Tetris_Window(
			this.enemies[i].xposition,
			this.enemies[i].yposition + this.enemies[i].height,
			this.enemies[i].width+10,
			100
		))
		this.enemyGaugeWindows[i].removeChildAt(0);
		this.enemyGaugeWindows[i].padding = 0;
		// this.enemies[i].xposition = this.player.xposition + 500;
		// this.enemies[i].yposition = this.player.yposition;
		this.addChild(this.enemies[i].pictureBoard);
		this.addChild(this.enemyGaugeWindows[i]);
		this.refreshEnemyHPGauge(i);
	}
}

Scene_Tetris.prototype.say = function (battler, words) {
	if (battler.category == "player") {
		x = 100
		y = 100
	} else {
		x = 0
		y = 0
	}

	this.dialogWindow.move(x, y, 250, 100);
	this.dialogWindow.drawText(words, 0, 0);
	this.dialogSkin.move(x, y);
	this.addChild(this.dialogSkin);
	this.addChild(this.dialogWindow)
}

Scene_Tetris.prototype.unsay = function () {
	this.removeChild(this.dialogWindow);
	this.removeChild(this.dialogSkin);
}

Scene_Tetris.prototype.refreshPlayerGauge = function(){
	this.playerGaugeBoard.contents.clear();
	rate = this.player.Hp / this.player.Mhp;
	this.playerGaugeBoard.drawThinGauge(10, -12, 360, rate, 20, this.playerGaugeBoard.hpGaugeColor1(), this.playerGaugeBoard.hpGaugeColor2());
	this.playerGaugeBoard.drawThinGauge(10, 10, 340, 0, 10, this.playerGaugeBoard.mpGaugeColor1(), this.playerGaugeBoard.mpGaugeColor2())
}

Scene_Tetris.prototype.refreshPlayerWindow = function(){
	this.removeChild(this.playerMainWindow);
	this.playerMainWindow = new Tetris_Window(this.player.xposition, this.player.yposition - 5, this.ROW * this.xrange + 50, this.COL * this.yrange);
	this.playerMainWindow.drawVerticalGauge(250, 10, 10, this.COL * this.yrange - 10, this.player.gaugeSCORE / this.player.AtkFreq, this.playerMainWindow.hpGaugeColor1(), this.playerMainWindow.hpGaugeColor1());
	this.addWindow(this.playerMainWindow);
}

Scene_Tetris.prototype.refreshEnemyHPGauge = function (enemyid) {
	this.enemyGaugeWindows[enemyid].contents.clear();
	rate = this.enemies[enemyid].curHp / this.enemies[enemyid].Mhp;
	if (this.multiple) {
		barHeight = 10
	} else {
		barHeight = 20
	}
	this.enemyGaugeWindows[enemyid].drawThinGauge(0, -12, this.enemies[enemyid].width - 25, rate, barHeight, this.enemyGaugeWindows[enemyid].hpGaugeColor1(), this.enemyGaugeWindows[enemyid].hpGaugeColor1());
}

Scene_Tetris.prototype.refreshNextWindows = function () {
	for (i in this.player.next) {
		this.removeChild(this.player.nextWindows[i]);
		this.addChild(this.player.nextWindows[i]);
		this.player.next[i].block.x = this.calPositionX(this.player.next[i]);
		this.player.next[i].block.y = 25;
		this.player.nextWindows[i].addChild(this.player.next[i].block);
	}
}

Scene_Tetris.prototype.createBackground = function () {
	this.backgroundSprite = new Sprite();
	this.backgroundSprite.bitmap = ImageManager.loadPicture("Translucent");
	this.addChild(this.backgroundSprite);
}

Scene_Tetris.prototype.AIactionsRender = function (cur, solution) {
	//targetX = solution.x
	//targetY = solution.y
	//box = cur.box.slice();
	//type = cur.type;
	//rotation = cur.rotation;
	//curX = Math.floor((cur.block.x - this.xposition) / this.xrange)
	//curY = Math.floor((cur.block.y - this.yposition) / this.yrange);
	//actionQueue = [];

	//while (box != solution.box) {
	//	actionQueue.push("rotate");
	//	if (this.data[type][rotation + 1]) {
	//		box = this.data[type][rotation+1];
	//	} else {
	//		box = this.data[type][0];
	//	}
	//}
	//while (curX < targetX) {
	//	actionQueue.push("moveRight");
	//	curX += 1;
	//}

	//while (curX > targetY) {
	//	actionQueue.push("moveLeft");
	//	curX -= 1;
	//}

	//while (curX = targetX && curY != targetY) {
	//	actionQueue.push("downwards");
	//	curY += 1;
	//}

	//return actionQueue;
	
}

function tetris_start() {
	SceneManager.push(Scene_Tetris);
}
