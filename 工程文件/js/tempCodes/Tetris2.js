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
	this.initializeActor();
	this.initializeEnemy();
}

Scene_Tetris.prototype.initializeActor = function () {
	var actor = $gameActors.actor(1)
	var weapon = $gameActors.actor(1).equips()

	this.player = {
		category: "player",
		xposition: 200,
		yposition: 27,
		step: 20000,
		SCORE: 0,
		field: new Array(this.COL),
		cur: null,
		next: [],
		hold: null,
		shadowImage: null,
		n: 0,
		oldTime: Date.now(),
		gaugeSCORE: 0,

		nextWindows: [],
		mainWindow: new Tetris_Window(),
		holdWindow: new Tetris_Window(),

		Hp: actor.hp,
		Atk: actor.atk
	}

	for (var i = 0; i < this.player.field.length; i++) {
		this.player.field[i] = new Array(this.ROW).fill(0);
	}
}

Scene_Tetris.prototype.initializeEnemy = function () {
	this._enemies = [{
		category: "enemy",
		xposition: 0,
		yposition: 0,
		n: 0,
		oldTime: Date.now(),
		step:20000,
		field: new Array(this.COL),
		cur: null,
		next: [],
		actionQueue: null,

		mainWindow: new Tetris_Window(),

		Hp: 100,
		pathGenerator: null
	}];


	for (i in this._enemies) {
		this._enemies[i].field = new Array(this.COL);
		for (j in this._enemies[i]) {

			this._enemies[i].field[j] = new Array(this.ROW).fill(0);
		}


		this._enemies[i].pathGenerator = new Position_Manager(this._enemies[i].field, this.data);
	}
	game_field = new Array(this.COL);
	for (var i = 0; i < game_field.length; i++) {
		game_field[i] = new Array(this.ROW).fill(0);
	}

	this._enemies[0].pathGenerator = new Position_Manager(game_field, this.data);
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

	this.battleInfo = battleList[$gameVariables.value(1)];

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
			]
		]
	};
	this.block_pics = ["1", "5", "j", "l", "o", "s", "t"];

	this.nextWindows = [];
	this.shadowImage = null;
	this.refreshTime = 0;
	this.gaugeSCORE = 0;

}

Scene_Tetris.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	AudioManager.playSe(this.seBoom);
	this.startFadeIn(60, false);
}

Scene_Tetris.prototype.update = function () {
	Scene_MenuBase.prototype.update.call(this);
	this.updateEnemy();
}

Scene_Tetris.prototype.updateEnemy = function () {
	for (i in this._enemies) {
		this._enemies[i].n += Date.now()
		if (this._enemies[i].n >= this._enemies[i].step) {
			var nextAction = this._enemies[i].actionQueue.shift();
			switch (nextAction) {
				case "rotate":
					this.rotateBox(this._enemies[i].cur, 1);
				case "moveRight":
					this._enemies[i].cur.block.x += this.xrange;
				case "moveLeft":
					this._enemies[i].cur.block.x -= this.xrange;
				case "downwards":
					this._enemies[i].step = 500;
					this._enemies[i].cur.block.y += this.yrange;
			}
		}
	}
}

Scene_Tetris.prototype.findPath = function (enemy) {
	var best_solution = null;
	var best_PDvalue = null;

	for (Assume_X = 0; Assume_X < this.ROW; Assume_X++) {
		for (rotation in this.data[enemy.cur.type]) {
			var cur_solution = enemy.pathGenerator.solution_generate(Assume_X, enemy.cur.type, rotation);
			if (cur_solution) {
				var cur_PDvalue = enemy.pathGenerator.PDValue(cur_solution);

				if (!best_PDvalue || cur_PDvalue > best_PDvalue) {
					var best_solution = cur_solution;
					var best_PDvalue = cur_PDvalue;
				}
			}
		}
	}

	target_solution = best_solution;

	enemy.actionQueue = this.AIactionsRender(enemy.cur, target_solution);
}

Scene_Tetris.prototype.createBox = function (battler) {

	if (battler.next.length == 0) {
		for (var i = 0; i < 4; i++) {
			var rnd = Math.floor(Math.random() * 7);
			battler.next.push({
				block: new Sprite(),
				type: this.block_pics[rnd],
				rotation: 0,
				box: this.data[this.block_pics[rnd]][0]
			});
			battler.next[i].block.bitmap = ImageManager.loadPicture(this.block_pics[rnd]);
			if (battler.nextWindows) {
				battler.nextWindows[i].addChild(battler.next[i].block)
			}
		}
		//this.refreshNextWindows();
	}

	if (!battler.cur) {
		var rnd = Math.floor(Math.random() * 7);

		battler.next.push({
			block: new Sprite(),
			type: this.block_pics[rnd],
			rotation: 0,
			box: this.data[this.block_pics[rnd]][0]
		});
		battler.next[battler.next.length - 1].block.bitmap = ImageManager.loadPicture(this.block_pics[rnd]);
		battler.cur = battler.next.shift();
		//this.refreshNextWindows();
		battler.cur.block.x = battler.xposition + (this.ROW * this.yrange) / 3;
		battler.cur.block.y = battler.yposition;

		//while (this.collide(this.cur)) {
		//	battler.cur.block.y -= 1;
		//}
		if (battler.category == "enemy") {
			this.findPath(battler);
		}
		this.addChild(battler.cur.block);
	}

}

Scene_Tetris.prototype.rotateBox = function (cur, direction) {
	var type = cur.type;
	var rotation = cur.rotation;
	if (direction == 1) {
		if (rotation + 1 <= this.data[type].length - 1) {
			cur.box = this.data[type][rotation + 1];
			this.removeChild(cur.block);
			cur.block.bitmap = ImageManager.loadPicture(type + (rotation + 1))
			cur.rotation++;
			this.addChild(cur.block);
		} else {
			cur.box = this.data[type][0];
			this.removeChild(cur.block);
			cur.block.bitmap = ImageManager.loadPicture(type);
			cur.rotation = 0;
			this.addChild(cur.block);
		}
	} else {
		if (rotation - 1 >= 0) {
			cur.box = this.data[type][rotation - 1];
			this.removeChild(cur.block);
			if (rotation - 1 == 0) {
				cur.block.bitmap = ImageManager.loadPicture(type);
			} else {
				cur.block.bitmap = ImageManager.loadPicture(type + (rotation - 1));
			}
			cur.rotation -= 1;
			this.addChild(cur.block);
		} else {
			cur.box = this.data[type][this.data[type].length - 1];
			this.removeChild(cur.block);
			if ((this.data[type].length - 1) == 0) {
				cur.block.bitmap = ImageManager.loadPicture(type);
			} else {
				cur.block.bitmap = ImageManager.loadPicture(type + (this.data[type].length - 1));
			}
			cur.rotation = this.data[type].length - 1;
			this.addChild(cur.block);
		}
	}


}

Scene_Tetris.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);
	this.createPlayerWindows();
	this.createEnemyWindows();
	this.createBox(this.player);
	for (i in this._enemies) {
		this.createBox(this._enemies[i]);
	}
}

Scene_Tetris.prototype.createPlayerWindows = function () {
	this.player.holdWindow.move(this.player.xposition - 100, this.player.yposition, 100, 100);
	this.player.holdWindow.drawText("hold", 0, 0);

	this.player.mainWindow.move(this.player.xposition, this.player.yposition - 5, this.ROW * this.xrange + 50, this.COL * this.yrange);
	this.player.mainWindow.drawText("wattttttttt", 0, 0);


	for (var i = 0; i < 4; i++) {
		this.player.nextWindows.push(new Tetris_Window());
		this.player.nextWindows[i].move(this.player.xposition + this.ROW * this.xrange + 50, this.player.yposition + 100 * i, 100, 100);
		this.addWindow(this.player.nextWindows[i]);
	}

	this.player.nextWindows[0].drawText("next", 0, -10)

	this.addWindow(this.player.holdWindow);
	this.addWindow(this.player.mainWindow);
	
}

Scene_Tetris.prototype.createEnemyWindows = function () {
	for (i = 0; i < this._enemies.length;i++) {
		this._enemies[i].xposition = this.player.xposition + 500;
		this._enemies[i].yposition = this.player.yposition;
		this._enemies[i].mainWindow.move(this._enemies[i].xposition, this._enemies[i].yposition - 5, this.ROW * this.xrange + 50, this.COL * this.yrange);
		this.addWindow(this._enemies[i].mainWindow);
	}
}

Scene_Tetris.prototype.createBackground = function () {
	this.backgroundSprite = new Sprite();
	this.backgroundSprite.bitmap = ImageManager.loadPicture("Translucent");
	this.addChild(this.backgroundSprite);
}

Scene_Tetris.prototype.AIactionsRender = function (cur, solution) {
	//var targetX = solution.x
	//var targetY = solution.y
	//var box = cur.box.slice();
	//var type = cur.type;
	//var rotation = cur.rotation;
	//var curX = Math.floor((cur.block.x - this.xposition) / this.xrange)
	//var curY = Math.floor((cur.block.y - this.yposition) / this.yrange);
	//var actionQueue = [];

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
