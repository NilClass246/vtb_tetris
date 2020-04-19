//============================================================
// 俄罗斯方块的基本设定
//============================================================

var TetrisManager = TetrisManager || {};

TetrisManager.data = {
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
			[0, 0],
			[0, 6],
			[0, 6],
			[6, 6]
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

TetrisManager.block_pics = ["o", "s", "5", "l", "t", "j", "1"];

TetrisManager.generalKick = {
	"1to2": [[0, 0], [-1, 0], [-1, 1], [0, 2], [-1, 2]],
	"2to1": [[0, 0], [1, 0], [1, 1], [0, 2], [1, 2]],
	"2to3": [[0, 0], [1, 0], [1, 1], [0, 2], [1, 2]],
	"3to2": [[0, 0], [-1, 0], [-1, 1], [0, 2], [-1, -2]],
	"3to4": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
	"4to3": [[0, 0], [-1, 0], [-1, 1], [0, 2], [-1, 2]],
	"4to1": [[0, 0], [-1, 0], [-1, 1], [0, 2], [-1, 2]],
	"1to4": [[0, 0], [1, 0], [1, 1], [0, 2], [1, 2]]
}

TetrisManager.IKick = {
	"1to2": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, 2]],
	"2to1": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
	"2to3": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, 1]],
	"3to2": [[0, 0], [1, 0], [-2, 1], [1, -2], [-2, -1]],
	"3to4": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
	"4to3": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, 2]],
	"4to1": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
	"1to4": [[0, 0], [-1, 0], [2, 1], [-1, 2], [2, -1]]
}

TetrisManager.GeneralRuleSet = {
	'-3': [[1, 0], [1, -1]],
	'-2': [[-1, 1], [0, 1]],
	'-1': [[0, -1], [0, 0]],
	'0': [[0, 0], [-1, 0]],
	'1': [[1, 0], [1, -1]],
	'2': [[-1, 1], [0, 1]],
	'3': [[0, -1], [0, 0]]
}

TetrisManager.IRuleSet = {
	'-3': [[2, -1], [2, -2]],
	'-2': [[-2, 2], [-1, 2]],
	'-1': [[1, -2], [1, -1]],
	'0': [[-1, 1], [-2, 1]],
	'1': [[2, -1], [2, -2]],
	'2': [[-2, 2], [-1, 2]],
	'3': [[1, -2], [1, -1]]
}

TetrisManager.AIFrequency = 20;

//============================================================
// 超级旋转系统
//============================================================

TetrisManager.PlaceTest = function (battler, tempBlock, cur) {
	rotation = cur.rotation;
	box = cur.box;
	x = Math.floor((tempBlock.x - battler.xposition) / battler.xrange);
	y = Math.floor((tempBlock.y - battler.yposition) / battler.yrange);

	if (box) {
		len = box.length;
	} else {
		return false;
	}

	for (i = 0; i < len; i++) {
		if (i + y >= 0) {
			for (j = 0; j < box[i].length; j++) {
				if (box[i][j] !== 0) {
					if (j + x < 0 || j + x >= battler.field[i].length || i + y >= battler.field.length || (j + x >= 0 && battler.field[i + y] && battler.field[i + y][j + x] != 0)) {
						return false;
					}
				}
			}
		}
	}
	return true;
} 

TetrisManager.rotateRight = function (battler) {
	tempCur = {
		box: null,
		rotation: battler.cur.rotation
	};
	type = battler.cur.type;
	rotation = battler.cur.rotation;
	if ((rotation + 1) < (TetrisManager.data[type].length)) {
		tempCur.box = TetrisManager.data[type][rotation + 1];
		tempCur.rotation += 1;
	} else {
		tempCur.box = TetrisManager.data[type][0];
		tempCur.rotation = 0;
	}
	return tempCur;
}

TetrisManager.rotateLeft = function (battler) {
	tempCur = {
		box: null,
		rotation: battler.cur.rotation
	};
	type = battler.cur.type;
	rotation = battler.cur.rotation;
	if (rotation - 1 >= 0) {
		tempCur.box = TetrisManager.data[type][rotation - 1];
		tempCur.rotation -= 1;
	} else {
		tempCur.box = TetrisManager.data[type][TetrisManager.data[type].length - 1];
		tempCur.rotation = TetrisManager.data[type].length - 1;
	}

	return tempCur;
}

TetrisManager.rotationRule = function (battler, direction) {
	tempBlock = {
		x: battler.cur.block.x,
		y: battler.cur.block.y,
		rotationTime: battler.cur.rotationTime + direction
	}

	if (battler.cur.type == 'o') {
		return tempBlock
	}

	if ((battler.cur.type != '1') && (battler.cur.type != 'o')) {
		Rule = TetrisManager.GeneralRuleSet[((tempBlock.rotationTime % 4) + '')];
	}
	if ((battler.cur.type == '1')) {
		Rule = TetrisManager.IRuleSet[((tempBlock.rotationTime % 4) + '')];
	}

	if (tempBlock.rotationTime > battler.cur.rotationTime) {
		xHow = Rule[0][0];
		yHow = Rule[0][1];
	} else {
		xHow = Rule[1][0];
		yHow = Rule[1][1];
	}
	tempBlock.x += xHow * battler.xrange;
	tempBlock.y += yHow * battler.yrange;

	return tempBlock;
}

TetrisManager.kickTheWall = function (battler, tempBlock, tempBox, direction) {
	type = battler.cur.type;
	rotation = battler.cur.rotation;
	beginning = rotation + 1;
	ending = null;
	if (rotation + direction < 0) {
		ending = 4
	}
	if (rotation + direction >= 4) {
		ending = 1
	}
	if (!ending) {
		ending = rotation + direction + 1
	}

	key = beginning + "to" + ending;

	if (type == "1") {
		for (i in TetrisManager.IKick[key]) {
			smallTemp = {
				x: tempBlock.x,
				y: tempBlock.y
			}
			smallTemp.x += TetrisManager.IKick[key][i][0] * battler.xrange;
			smallTemp.y += TetrisManager.IKick[key][i][1] * battler.yrange;
			if (TetrisManager.PlaceTest(battler, smallTemp, tempBox)) {
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

	if (type != "o" && type != "1") {
		for (i in TetrisManager.generalKick[key]) {
			smallTemp = {
				x: tempBlock.x,
				y: tempBlock.y
			}
			smallTemp.x += TetrisManager.generalKick[key][i][0] * battler.xrange;
			smallTemp.y += TetrisManager.generalKick[key][i][1] * battler.yrange;
			if (TetrisManager.PlaceTest(battler, smallTemp, tempBox)) {
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

TetrisManager.getRotationResult = function (battler, direction) {
	tempBlock = TetrisManager.rotationRule(battler, direction);
	if (direction == 1) {
		tempBox = TetrisManager.rotateRight(battler);
	} else {
		tempBox = TetrisManager.rotateLeft(battler);
	}
	Finaltemp = TetrisManager.kickTheWall(battler, tempBlock, tempBox, direction);
	return Finaltemp
}

TetrisManager.collide = function (battler, cur) {
	box = cur.box;
	len = cur.box.length;
	x = Math.floor((cur.block.x - battler.xposition) / battler.xrange);
	y = Math.floor((cur.block.y - battler.yposition) / battler.yrange) + 1;
	for (i = 0; i < len; i++) {
		if (i + y >= 0) {
			for (j = 0; j < box[i].length; j++) {
				if (box[i][j] !== 0) {

					if (i + y >= battler.field.length || (i + y < battler.field.length && battler.field[i + y][j + x] !== 0)) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

//============================================================
// 杂项方法
//============================================================

TetrisManager.copy2DArray = function (origin) {
	ArrayCopy = [];
	for (var i = 0; i < origin.length; i++) {
		tempArray = [];
		for (var j = 0; j < origin[i].length; j++) {
			tempNumber = origin[i][j]
			tempArray.push(tempNumber)
		}
		ArrayCopy.push(tempArray);
	}
	return ArrayCopy;
}

//=============================================================================
// ** 小组件定义
//=============================================================================

function Tetris_Window() {
	this.initialize.apply(this, arguments);
}

Tetris_Window.prototype = Object.create(Window_Base.prototype);
Tetris_Window.prototype.constructor = Tetris_Window;

Tetris_Window.prototype.initialize = function (x, y, width, height) {
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
}

Tetris_Window.prototype.refresh = function () {
	this.contents.clear();
}

//-----------------------------------------------------------------------------

function Notice_Widnow() {
	this.initialize.apply(this, arguments);
}

Notice_Widnow.prototype = Object.create(Window_Base.prototype);
Notice_Widnow.prototype.constructor = Notice_Widnow;

Notice_Widnow.prototype.initialize = function (duration) {
	Window_Base.prototype.initialize.call(this, 1200, 100, 405, 100);
	this.duration = duration;
	this.curTime = duration;
	this.targetPosition = 800;
	this.layed = false;
	this.completed = false;
	this.refresh();
}

Notice_Widnow.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	if (!this.completed) {
		if (!this.layed) {
			this.x -= 7;
			if (this.x <= this.targetPosition) {
				this.layed = true;
			}
		} else {
			if (this.curTime != 0) {
				this.curTime -= 1
			} else {
				this.x += 7;
				if (this.x >= 1200) {
					this.layed = false;
					this.completed = true;
				}
			}
		}
	}
}

Notice_Widnow.prototype.refresh = function () {
	this.contents.clear();
}

//-----------------------------------------------------------------------------

function MergeEffect() {
	this.initialize.apply(this, arguments);
}

MergeEffect.prototype = Object.create(Sprite.prototype);
MergeEffect.prototype.constructor = MergeEffect;

MergeEffect.prototype.initialize = function (bitmap) {
	Sprite.prototype.initialize.call(this);
	this.bitmap = bitmap
	this.layed = false;
	this.opacity = 0;
}

MergeEffect.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (!this.layed) {
		this.opacity += 25;
		if (this.opacity >= 255) {
			this.layed = true;
		}
	} else {
		this.opacity -= 25;
		if (this.opacity <= 0) {
			this.destroy();
		}
	}
}

//-----------------------------------------------------------------------------

function SkillButton() {
	this.initialize.apply(this, arguments);
}

SkillButton.prototype = Object.create(Sprite.prototype);
SkillButton.prototype.constructor = SkillButton;

SkillButton.prototype.initialize = function (skillID) {
	Sprite.prototype.initialize.call(this);
	this.skill = TetrisManager.skill_List[skillID];
	this.skillcover = new Sprite();
	this.skillcover.bitmap = ImageManager.loadPicture("Skills\\SkillCover");
	this.skillframe = new Sprite();
	this.skillframe.bitmap = ImageManager.loadPicture("Skills\\SkillFrame");
	this.skillicon = new Sprite();
	this.skillicon.bitmap = ImageManager.loadPicture("Skills\\" + skillID);

	this.addChild(this.skillicon);
	this.addChild(this.skillcover);
	this.addChild(this.skillframe);
	this.rate = 1;
	this.oldrate = 1;
	this.prepared = false;
}

SkillButton.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.rate != this.oldrate) {
		this.skillcover.setFrame(0, this.skillcover.bitmap.height * (1 - this.rate), this.skillcover.bitmap.width, this.skillcover.bitmap.height * this.rate);
		this.skillcover.move(0, this.skillcover.bitmap.height * (1 - this.rate))
		this.oldrate = this.rate;
	}
	if (this.rate <= 0) {
		this.prepared = true;
	} else {
		this.rate -= 0.01;
    }
}

SkillButton.prototype.updateRate = function (rate) {
	this.rate = 1 - rate;
}

SkillButton.prototype.isPrepared = function () {
	return this.prepared;
}

SkillButton.prototype.getSkill = function () {
	return this.skill;
}

SkillButton.prototype.reset = function () {
	this.rate = 1;
	this.prepared = false;
}

//-----------------------------------------------------------------------------

function SpinningBox() {
	this.initialize.apply(this, arguments);
}

SpinningBox.prototype = Object.create(Sprite.prototype);
SpinningBox.prototype.constructor = SpinningBox;

SpinningBox.prototype.initialize = function (Xdistance, Ydistance) {
	Sprite.prototype.initialize.call(this);
	this.Xdistance = Xdistance;
	this.Ydistance = Ydistance;
	this.bitmap = ImageManager.loadPicture("theBox")
	this.time = 75
	this.Xstep = Xdistance / this.time;
	this.Ystep = Ydistance / this.time;
	console.log(this.Xstep + " " + this.Ystep)
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
}

SpinningBox.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.rotation += Math.PI / 60
	this.x += this.Xstep;
	this.Xdistance -= this.Xstep;
	this.y += this.Ystep;
	this.Ydistance -= this.Ystep;
	this.time -= 1;
	if (this.time <= 0) {
		this.destroy();
    }
}

//============================================================
// 敌人数据
//============================================================

var AITest = [
	{
		name: "Inuyama",
		category: "enemy",
		xposition: 840,
		yposition: 24,
		width: 260,
		height: 325,

		pictureBoard: null,
		picture: new Sprite(),
		pictureName: "Inuyama",

		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		Atk: 50,
		Def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		xrange: 12,
		yrange: 12

	}
]

var TwoSlimes = [
	{
		name: "Slime",
		category: "enemy",
		xposition: 816,
		yposition: 84,

		avatar: new Sprite(),
		avatarName: "Slime_Avatar",

		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		Atk: 35,
		Def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 12,
		yrange: 12
	},
	{
		name: "Slime",
		category: "enemy",
		xposition: 1020,
		yposition: 276,

		avatar: new Sprite(),
		avatarName: "Slime_Avatar",

		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		Atk: 35,
		Def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 12,
		yrange: 12
	}
]

TetrisManager.enemy_List = [
	AITest,
	TwoSlimes
]

var sword = function () {
	for (i in this.player.next) {
		this.player.nextWindows[i].removeChild(this.player.next[i].block);
		this.player.next[i] = {
			block: new Sprite(),
			type: 't',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['t'][0].slice()
		}
		this.player.next[i].block.bitmap = this.minoSkin['t'][0]
		var effect = new SpinningBox(this.player.xposition + this.ROW * this.player.xrange + 110, this.player.yposition - 5 + 90 * i + 40 - 565)
		effect.move(25, 565)
		this.addChild(effect);
		AudioManager.playSe(this.seBoom);
	}
	this.refreshNextWindows();
}

TetrisManager.skill_List = [sword]