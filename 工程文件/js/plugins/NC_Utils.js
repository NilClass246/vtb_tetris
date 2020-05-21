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

TetrisManager.blockInitalPos = 3;

TetrisManager.generalKick = {
	"1to2": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
	"2to1": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
	"2to3": [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
	"3to2": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
	"3to4": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
	"4to3": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
	"4to1": [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
	"1to4": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]]
}

TetrisManager.IKick = {
	"1to2": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
	"2to1": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
	"2to3": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]],
	"3to2": [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
	"3to4": [[0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2]],
	"4to3": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2]],
	"4to1": [[0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
	"1to4": [[0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1]]
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

TetrisManager.ROW = 10;

TetrisManager.COL = 40;

TetrisManager.Count_Blocks = 0;

TetrisManager.Count_Buttons = 0;

TetrisManager.Count_Lines = 0;

TetrisManager.curhighestCombo = 0;

TetrisManager.curhighestLPM = 0;

TetrisManager.curhighestAPM = 0;

TetrisManager.highestLPM = 0;

TetrisManager.highestAPM = 0;

TetrisManager.AboveLines = 16;

TetrisManager.makeData = function () {
	var tet = {};

	tet.ArrDelay = $gameVariables.value(3)
	tet.DasDelay = $gameVariables.value(2)
	tet.softDropSpeed = $gameVariables.value(4)
	tet.AiSpeed = $gameVariables.value(5)

	return tet
}

TetrisManager.save = function () {
	StorageManager.save(514, JSON.stringify(TetrisManager.makeData()));
}

TetrisManager.load = function () {
	var json;
	var tet = {};
	try {
		json = StorageManager.load(514);
	} catch (e) {
		console.error(e);
	}
	if (json) {
		tet = JSON.parse(json);
	}
	if (tet['ArrDelay'] !== undefined) {
		$gameVariables.setValue(3, Number(tet['ArrDelay']))
	} else {
		$gameVariables.setValue(3, 3)
    }
	if (tet['DasDelay'] !== undefined) {
		$gameVariables.setValue(2, Number(tet['DasDelay']))
	} else {
		$gameVariables.setValue(2, 10)
    }
	if (tet['softDropSpeed'] !== undefined) {
		$gameVariables.setValue(4, Number(tet['softDropSpeed']))
	} else {
		$gameVariables.setValue(4, 20)
    }
	if (tet['AiSpeed'] !== undefined) {
		$gameVariables.setValue(5, Number(tet['AiSpeed']))
	} else {
		$gameVariables.setValue(5, 20)
    }
}

TetrisManager.TimerActivated = false;

TetrisManager.keyCodeList = {
	"8": "backspace",
	"9": "tab",
	"13": "enter",
	"16": "shift",
	"17": "ctrl",
	"18": "alt",
	"19": "pause_break",
	"20": "caps_lock",
	"27": "escape",
	"33": "page_up",
	"34": "page_down",
	"35": "end",
	"36": "home",
	"37": "left_arrow",
	"38": "up_arrow",
	"39": "right_arrow",
	"40": "down_arrow",
	"45": "insert",
	"46": "delete",
	"48": "0",
	"49": "1",
	"50": "2",
	"51": "3",
	"52": "4",
	"53": "5",
	"54": "6",
	"55": "7",
	"56": "8",
	"57": "9",
	"65": "a",
	"66": "b",
	"67": "c",
	"68": "d",
	"69": "e",
	"70": "f",
	"71": "g",
	"72": "h",
	"73": "i",
	"74": "j",
	"75": "k",
	"76": "l",
	"77": "m",
	"78": "n",
	"79": "o",
	"80": "p",
	"81": "q",
	"82": "r",
	"83": "s",
	"84": "t",
	"85": "u",
	"86": "v",
	"87": "w",
	"88": "x",
	"89": "y",
	"90": "z",
	"91": "left_window_key",
	"92": "right_window_key",
	"93": "select_key",
	"96": "numpad_0",
	"97": "numpad_1",
	"98": "numpad_2",
	"99": "numpad_3",
	"100": "numpad_4",
	"101": "numpad_5",
	"102": "numpad_6",
	"103": "numpad_7",
	"104": "numpad_8",
	"105": "numpad_9",
	"106": "multiply",
	"107": "add",
	"109": "subtract",
	"110": "decimal_point",
	"111": "divide",
	"112": "f1",
	"113": "f2",
	"114": "f3",
	"115": "f4",
	"116": "f5",
	"117": "f6",
	"118": "f7",
	"119": "f8",
	"120": "f9",
	"121": "f10",
	"122": "f11",
	"123": "f12",
	"144": "num_lock",
	"145": "scroll_lock",
	"186": "semi_colon",
	"187": "equal_sign",
	"188": "comma",
	"189": "dash",
	"190": "period",
	"191": "forward_slash",
	"192": "grave_accent",
	"219": "open_bracket",
	"220": "back_slash",
	"221": "close_braket",
	"222": "single_quote"
}

TetrisManager.BlankLines = 2;

TetrisManager.GaugeConstant = 10;

TetrisManager.Temps = {};

//============================================================
// 超级旋转系统
//============================================================

TetrisManager.PlaceTest = function (battler, tempBlock, cur) {
	var rotation = cur.rotation;
	var box = cur.box;
	var x = Math.floor((tempBlock.x - battler.xposition) / battler.xrange);
	var y = Math.floor((tempBlock.y - battler.yposition) / battler.yrange);

	if (box) {
		var len = box.length;
	} else {
		return false;
	}

	for (var i = 0; i < len; i++) {
		if (i + y >= 0) {
			for (var j = 0; j < box[i].length; j++) {
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
	var tempCur = {
		box: null,
		rotation: battler.cur.rotation
	};
	var type = battler.cur.type;
	var rotation = battler.cur.rotation;
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
	var tempCur = {
		box: null,
		rotation: battler.cur.rotation
	};
	var type = battler.cur.type;
	var rotation = battler.cur.rotation;
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
	var tempBlock = {
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
	var type = battler.cur.type;
	var rotation = battler.cur.rotation;
	var beginning = rotation + 1;
	var ending = null;
	if (rotation + direction < 0) {
		ending = 4
	}
	if (rotation + direction >= 4) {
		ending = 1
	}
	if (!ending) {
		ending = rotation + direction + 1
	}

	var key = beginning + "to" + ending;

	if (type == "1") {
		for (i in TetrisManager.IKick[key]) {
			var smallTemp = {
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
			var smallTemp = {
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
	var tempBlock = TetrisManager.rotationRule(battler, direction);
	if (direction == 1) {
		tempBox = TetrisManager.rotateRight(battler);
	} else {
		tempBox = TetrisManager.rotateLeft(battler);
	}
	var Finaltemp = TetrisManager.kickTheWall(battler, tempBlock, tempBox, direction);
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

TetrisManager.keepTwoDigits = function (num) {
	if ((!num && num !== 0) || (num == Infinity)) {
		return num;
    }
	var tempNum = Math.floor(num * 100) / 100
	tempNum = tempNum + "";
	tempNum2 = tempNum
	var n = tempNum2.split(".")
	if (n[1]) {
		for (var i = 0; i < (2 - n[1].length); i++) {
			tempNum += "0"
		}
	} else {
		tempNum += ".00";
	}
	
	return tempNum
}

TetrisManager.setTimer = function () {
	TetrisManager.oldTime = Date.now();
	TetrisManager.TimerActivated = true;
}

TetrisManager.getElapsedTime = function () {
	if (TetrisManager.TimerActivated) {
		return Math.floor((Date.now() - TetrisManager.oldTime) / 10) / 100;
	} else {
		return 0;
    }
}

TetrisManager.desetTimer = function () {
	TetrisManager.TimerActivated = false;
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
		assumeYpos: 84,
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
		assumeYpos: 84,
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
		yrange: 12,
	},
	{
		name: "Slime",
		category: "enemy",
		xposition: 1020,
		yposition: 276,
		assumeYpos: 276,
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
		yrange: 12,
	}
]

var FourKnights = [
	{
		name: "Knight",
		category: "enemy",
		xposition: 832,
		yposition: 84,
		assumeYpos: 84,
		avatar: new Sprite(),
		avatarName: "Knight_Avatar",

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

		xrange: 9,
		yrange: 9,
	},
	{
		name: "Knight",
		category: "enemy",
		xposition: 1032,
		yposition: 84,
		assumeYpos: 84,
		avatar: new Sprite(),
		avatarName: "Knight_Avatar",

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

		xrange: 9,
		yrange: 9,
	},
	{
		name: "Knight",
		category: "enemy",
		xposition: 832,
		yposition: 84,
		assumeYpos: 384,
		avatar: new Sprite(),
		avatarName: "Knight_Avatar",

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

		xrange: 9,
		yrange: 9,
	},
	{
		name: "Knight",
		category: "enemy",
		xposition: 1032,
		yposition: 84,
		assumeYpos: 384,
		avatar: new Sprite(),
		avatarName: "Knight_Avatar",

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

		xrange: 9,
		yrange: 9,
	}
]

TetrisManager.enemy_List = [
	AITest,
	TwoSlimes,
	FourKnights
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

//TODO: 重写技能系统

//============================================================
// 解密数据
//============================================================

function Puzzle_Manager() {
	this.initialize.apply(this, arguments);
}

Puzzle_Manager.prototype.initialize = function (ID) {
	this.puzzleID = ID;
	this.scene = SceneManager._scene;
	this.victory = false;
	this.startTime = Date.now();
}

Puzzle_Manager.prototype.create = function () {
	switch (this.puzzleID) {
		case 0:
			this.SCORE = 0;
			this.progress = 0;
			this.targetSCORE = $gameVariables.value(12)
			this.barX = 845;
			this.barY = 110;
			this.timeLimit = $gameVariables.value(11);
			this.curTime = this.getElapsedTime();
			this.ProgressBar = new ProgressBar(this.targetSCORE);
			this.ProgressBar.move(this.barX, this.barY);
			this.scene.addChild(this.ProgressBar)
			this.ProgressBar.setPhase($gameVariables.value(7), "ui\\EasyBar")
			this.ProgressBar.setPhase($gameVariables.value(8), "ui\\NormalBar")
			this.ProgressBar.setPhase($gameVariables.value(9), "ui\\HardBar")
			this.ProgressBar.setPhase($gameVariables.value(10), "ui\\LunaticBar")
			this.targetBoard = new Tetris_Window(845, 5, 350, 100);
			this.targetBoard.drawText("在"+this.timeLimit+"秒内获取尽量多的分数！", 0, 0)
			this.scene.addWindow(this.targetBoard);
			this.OtherWindow = new Tetris_Window(845, 180, 350, 435);
			this.OtherWindow.drawText("点击确认键开始游戏", 0, 0);
			this.scene.addWindow(this.OtherWindow);
			break;
		case 1:
			this.SCORE = 0;
			this.timeLimit = $gameVariables.value(11);
			this.targetBoard = new Tetris_Window(0, 0, 300, 100);
			this.targetBoard.contents.fontSize = 20;
			//this.targetBoard.removeChildAt(0);
			this.targetBoard.drawText("在" + this.timeLimit + "秒内获取尽量多的分数！", 0, 0);
			this.scene.addWindow(this.targetBoard);
			this.BarChart = new BarChartWindow(200, 400, "分数", 10);
			this.BarChart.x = 0;
			this.BarChart.y = 100;
			this.BarChart.addNewBar(0);
			this.BarChart.addNewBar(20);
			this.scene.addWindow(this.BarChart);
			break;
		case 2:
			this.timeLimit = $gameVariables.value(11);
			this.targetBoard = new Target_Window("在" + this.timeLimit + "秒内获取尽量多的分数！")
			this.scene.addChild(this.targetBoard);

			this.CheckBoard = new Tetris_Window(0, 0, 300, 300);
			this.CheckBoard.contents.fontSize = 18;
			this.CheckBoard.removeChildAt(0)
			this.EasyCheck = new CheckBox();
			this.CheckBoard.addChild(this.EasyCheck);
			this.EasyCheck.move(15, 21);
			this.CheckBoard.drawText("Easy: " + $gameVariables.value(7)+"分", 28, 0);
			this.NormalCheck = new CheckBox();
			this.CheckBoard.addChild(this.NormalCheck)
			this.NormalCheck.move(15, 49)
			this.CheckBoard.drawText("Normal: " + $gameVariables.value(8) + "分", 28, 28);
			this.HardCheck = new CheckBox();
			this.CheckBoard.addChild(this.HardCheck);
			this.HardCheck.move(15, 77)
			this.CheckBoard.drawText("Hard: " + $gameVariables.value(9) + "分", 28, 56);
			this.LunaticCheck = new CheckBox();
			this.CheckBoard.addChild(this.LunaticCheck);
			this.LunaticCheck.move(15, 105);
			this.CheckBoard.drawText("Lunatic: " + $gameVariables.value(10) + "分", 28, 84);

			this.scene.addChild(this.CheckBoard);

			this.infoBoard = new Tetris_Window(285, 142, 200, 500);
			this.infoBoard.contents.fontSize = 18;
			this.infoBoard.removeChildAt(0)
			this.infoBoard.drawText(
				"Time Left ", 0, 0)
			this.infoBoard.drawText(
				TetrisManager.keepTwoDigits(this.timeLimit - TetrisManager.getElapsedTime()) + "sec",
				20, 25)
			this.infoBoard.drawText(
				"LPM " + TetrisManager.keepTwoDigits(TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60)),
				0, 310)
			this.infoBoard.drawText(
				"KPM " + TetrisManager.keepTwoDigits(TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60)),
				0, 335)
			this.scene.addWindow(this.infoBoard);
			this.ProgressBar = new VerticalProgressBar(50);
			this.ProgressBar.move(75, 80);
			this.infoBoard.addChild(this.ProgressBar);
			this.ProgressBar.addPhase($gameVariables.value(7), "ui\\EasyBar")
			this.ProgressBar.addPhase($gameVariables.value(8), "ui\\NormalBar")
			this.ProgressBar.addPhase($gameVariables.value(9), "ui\\HardBar")
			this.ProgressBar.addPhase($gameVariables.value(10), "ui\\LunaticBar")

			break;
	}
}

Puzzle_Manager.prototype.update = function (score) {
	switch (this.puzzleID) {
		case 0:
			this.curTime = this.getElapsedTime();
			if (this.SCORE != score) {
				this.progress += score - this.SCORE;
				this.SCORE = score;
			}
			if (this.progress > $gameVariables.value(7)) {
				this.progress -= 0.01;
			}
			this.ProgressBar.changeNumber(this.progress)
			if (this.SCORE >= this.targetSCORE||this.curTime >= this.timeLimit) {
				this.victory = true;
			}
			if (this.victory) {
				this.OtherWindow.contents.clear();
				this.OtherWindow.drawText("挑战完成！", 0, 0);
			} else {
				this.OtherWindow.contents.clear();
				var leftTime = (this.timeLimit - this.curTime)
				this.OtherWindow.drawThinGauge(0, 25, 310, leftTime / this.timeLimit, 20, this.OtherWindow.mpGaugeColor1(), this.OtherWindow.mpGaugeColor2());
				leftTime = TetrisManager.keepTwoDigits(leftTime);
				this.OtherWindow.drawText("Time Left：" + leftTime + "sec", 0, 0);
            }
			break;
		case 1:
			this.BarChart.changeValue(0, score);
			break;
		case 2:
			if (this.victory) {
				this.end = new Target_Window("时间到！");
				this.scene.addChild(this.end);
			} else {
				this.infoBoard.refresh()
				this.infoBoard.drawText(
					"Time Left ", 0, 0)
				this.infoBoard.drawText(
					TetrisManager.keepTwoDigits(this.timeLimit - TetrisManager.getElapsedTime()) + "sec",
					20, 25)
				this.infoBoard.drawText(
					"LPM " + TetrisManager.keepTwoDigits(TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60)),
					0, 310)
				this.infoBoard.drawText(
					"KPM " + TetrisManager.keepTwoDigits(TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60)),
					0, 335)
				this.ProgressBar.changeNumber(score)

				this.EasyCheck.ChEck();
				if (score >= $gameVariables.value(8)) {
					this.NormalCheck.ChEck();
					if (score >= $gameVariables.value(9)) {
						this.HardCheck.ChEck();
						if (score >= $gameVariables.value(10)) {
							this.LunaticCheck.ChEck();
                        }
                    }
                }
            }

			if (this.timeLimit - TetrisManager.getElapsedTime() <= 0) {
				this.victory = true;
			}
			break;
	}
}

Puzzle_Manager.prototype.getElapsedTime = function () {
	return Math.floor((Date.now() - this.startTime) / 10) / 100;
}

Puzzle_Manager.prototype.isEnded = function () {
	return this.victory;
}

//=============================================================================
// 小组件定义
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

function AfterMath_Window() {
	this.initialize.apply(this, arguments);
}

AfterMath_Window.prototype = Object.create(Window_Base.prototype);
AfterMath_Window.prototype.constructor = AfterMath_Window;

AfterMath_Window.prototype.initialize = function (info) {
	Window_Base.prototype.initialize.call(this, 100, 100, 1000, 424);
	this.score = info.score;
	this.combo = info.combo;
	this.LPM = info.LPM;
	this.APM = info.APM;
	this.layed = false;
	this.refresh();
	this.drawText("本局分数：" + this.score, 0, 0);
	this.drawText("本局最大连击：" + this.combo, 0, 28);
	this.drawText("本局LPM：" + TetrisManager.keepTwoDigits(this.LPM), 0, 56);
	this.drawText("本局KPM：" + TetrisManager.keepTwoDigits(this.APM), 0, 84);

	this.contents.drawLine(500, 0, 500, 424, 5, "black");

	if (this.score >= $gameVariables.value(21)) {
		$gameVariables.setValue(21, this.score);
    }
	this.drawText("历史最高分：" + $gameVariables.value(21), 525, 0);

	if (this.combo >= $gameVariables.value(22)) {
		$gameVariables.setValue(22, this.combo);
	}
	this.drawText("历史最高连击：" + $gameVariables.value(22), 525, 28);

	if (this.LPM >= $gameVariables.value(23)) {
		$gameVariables.setValue(23, this.LPM);
	}
	this.drawText("历史最高LPM：" + $gameVariables.value(23), 525, 56);

	if (this.APM >= $gameVariables.value(24)) {
		$gameVariables.setValue(24, this.APM);
	}
	this.drawText("历史最高KPM：" + $gameVariables.value(24), 525, 84);

	this.opacity = 0;
	this.backOpacity = 255;
}

AfterMath_Window.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	if (!this.layed) {
		//this.x += 25;
		this.opacity += 10;
		if (this.opacity >= 255) {
			this.layed = true;
        }
    }
}

AfterMath_Window.prototype.refresh = function () {
	this.contents.clear();
}

AfterMath_Window.prototype.isLayed = function () {
	return this.layed;
}

//-----------------------------------------------------------------------------

function Chart_Window() {
	this.initialize.apply(this, arguments);
}

Chart_Window.prototype = Object.create(Window_Base.prototype);
Chart_Window.prototype.constructor = Chart_Window;

Chart_Window.prototype.initialize = function (width, height, labelX, labelY, Xmax, Ymax) {
	Window_Base.prototype.initialize.call(this, 0, 0, width + 36, height + 36);
	this.ChartHeight = height;
	this.ChartWidth = width;
	this.points = [];
	this.labelX = labelX;
	this.labelY = labelY;
	this.Xmax = Xmax;
	this.Ymax = Ymax;
	this.displayXmax = Xmax;
	this.displayYmax = Ymax;
	this.ActIvAtEd = false;
	this.cursor = 0;
}

Chart_Window.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	if (this.ActIvAtEd) {
		this.refresh();
		if (this.displayXmax < this.Xmax) {
			this.displayXmax += 1;
		}
		if (this.displayYmax < this.Ymax) {
			this.displayYmax += 1;
		}
		for (var i = 0; i < this.points.length; i++) {
			if (this.points[i + 1]) {
				var x = (this.points[i].x / this.displayXmax) * this.ChartWidth;
				var y = (1-this.points[i].y / this.displayYmax) * this.ChartHeight;
				var Nextx = (this.points[i + 1].x / this.displayXmax) * this.ChartWidth;
				var Nexty = (1-this.points[i + 1].y / this.displayYmax) * this.ChartHeight;
				this.contents.drawLine(x, y, Nextx, Nexty, 5);
			}
		}
	}
}

Chart_Window.prototype.InputPoint = function (x, y) {
	if (x >= this.Xmax) {
		this.Xmax = this.Xmax * 2;
	}
	if (y >= this.Ymax) {
		this.Ymax = this.Ymax * 2;
	}
	var point = {
		x: x,
		y: y
	}
	this.points.push(point);
}

Chart_Window.prototype.ActIvAtE = function () {
	this.ActIvAtEd = true;
}

Chart_Window.prototype.refresh = function () {
	this.contents.clear();
}

//-----------------------------------------------------------------------------

function BarChartWindow() {
	this.initialize.apply(this, arguments);
}

BarChartWindow.prototype = Object.create(Window_Base.prototype);
BarChartWindow.prototype.constructor = BarChartWindow;

BarChartWindow.prototype.initialize = function (width, height, labelY, Ymax) {
	this.modiAmount = 15;
	Window_Base.prototype.initialize.call(this, 0, 0, width + 36, height + 36,);
	this.ChartHeight = height;
	this.ChartWidth = width;
	this.standardBarWidth = 20;
	this.labelY = labelY;
	this.Ymax = Ymax;
	this.bars = [];
	this.oldLength = this.bars.length;
	this.contents.drawLine(0, this.ChartHeight - 18, this.ChartWidth, this.ChartHeight - 18, 4, 'white');
	this.contents.drawLine(18, 0, 18, this.ChartHeight, 4, 'white');
	this.fontSize = 5;
	this.drawText(this.labelY, 0, -5);
}

BarChartWindow.prototype.update = function () {
	Window_Base.prototype.update.call(this);

	if (this.oldLength != this.bars.length) {
		for (var i = 0; i < this.bars.length; i++) {
			this.bars[i].changeX(Math.floor((i+1)*(this.ChartWidth / (this.bars.length + 1)) + 18 + this.modiAmount));
		}
		this.oldLength = this.bars.length;
	}
}

BarChartWindow.prototype.addNewBar = function (amount) {
	var bar = new DataBar(
		this.ChartWidth + 18,
		this.ChartHeight+5,
		this.standardBarWidth,
		this.ChartHeight,
		amount,
		this.Ymax
	)
	this.addChild(bar)
	this.bars.push(bar);
}

BarChartWindow.prototype.refresh = function () {
	this.contents.clear();
}

BarChartWindow.prototype.changeValue = function (id, amount) {
	while (amount >= this.Ymax) {
		this.Ymax = this.Ymax * 2;
		for (var i = 0; i < this.bars.length; i++) {
			this.bars[i].changeMaxValue(this.Ymax);
        }
	}
	this.bars[id].changeValue(amount);
}

//-----------------------------------------------------------------------------

function SkillWindow() {
	this.initialize.apply(this, arguments);
}

SkillWindow.prototype = Object.create(Window_Selectable.prototype);
SkillWindow.prototype.constructor = SkillWindow;

SkillWindow.prototype.initialize = function () {
	Window_Selectable.prototype.initialize.call(this, 0, 0, 300, 100);
	this._itemNum = 3;
	this.deactivate();
}

SkillWindow.prototype.start = function () {
	this.createContents();
	this.refresh();
	this.open();
	this.activate();
	this.select(0);
}

SkillWindow.prototype.maxCols = function () {
	return this._itemNum;
}

SkillWindow.prototype.maxItems = function () {
	return this._itemNum;
};

SkillWindow.prototype.spacing = function () {
	return 1;
};

SkillWindow.prototype.drawItem = function (index) {
	this.drawItemRect(index)
}

SkillWindow.prototype.drawItemRect = function (index) {
	var rect = this.itemRect(index);
	var color = this.gaugeBackColor();
	this.drawRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
}


SkillWindow.prototype.drawRect = function (dx, dy, dw, dh, color) {
	this.changePaintOpacity(false);
	this.contents.fillRect(dx, dy, dw, dh, color);
	this.changePaintOpacity(true);
};

SkillWindow.prototype.isTouchOkEnabled = function () {
	return true;
};

SkillWindow.prototype.isOkEnabled = function () {
	return true;
};

SkillWindow.prototype.itemWidth = function () {
	return 32;
};

SkillWindow.prototype.isOkTriggered = function () {
	return Input.isTriggered('ok');
};

SkillWindow.prototype.processOk = function () {
	SoundManager.playOk();
	alert(this.index());
}

//-----------------------------------------------------------------------------

function DataBar() {
	this.initialize.apply(this, arguments);
}

DataBar.prototype = Object.create(Sprite.prototype);
DataBar.prototype.constructor = DataBar;

DataBar.prototype.initialize = function (x, y, width, height, curAmount, maxAmount) {
	Sprite.prototype.initialize.call(this);
	this.curAmount = curAmount;
	this.displayAmount = curAmount;

	this.maxAmount = maxAmount;
	this.displayYmax = maxAmount;

	this.BarWidth = width;
	this.displayWidth = width;

	this.BarHeight = height
	this.anchor.y = 1;
	this.anchor.x = 0.5;

	this.curX = x;
	this.displayX = x;
	this.curY = y;

	this.Ycursor = 0;
	this.cursorAmount = 2;
	this.move(this.displayX, y);
	this.bitmap = ImageManager.loadPicture("ui\\BarGrad");
	this.setFrame(0, this.Ycursor, this.displayWidth, (this.displayAmount / this.displayYmax) * this.BarHeight);

	this.FNumber = new FNumber(this.displayAmount, 9)
	this.FNumber.changeDirection("mid");
	this.addChild(this.FNumber)
	this.layed = false;
}

DataBar.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.displayAmount != this.curAmount) {
		if (this.displayAmount < this.curAmount) {
			this.displayAmount += 0.5;
		} else {
			this.displayAmount -= 0.5;
		}
		this.FNumber.change(Math.floor(this.displayAmount));
	}
	if (this.displayWidth != this.BarWidth) {
		if (this.displayWidth < this.BarWidth) {
			this.displayWidth += 1;
		} else {
			this.displayWidth -= 1;
        }
	}

	if (this.displayYmax != this.maxAmount) {
		if (this.displayYmax < this.maxAmount) {
			this.displayYmax += 0.5;
		} else {
			this.displayYmax -= 0.5;
		}
	}

	if (this.displayX != this.curX) {
		if (this.displayX < this.curX) {
			this.displayX += 1;
		} else {
			this.displayX -= 1;
        }
	}

	if (this.Ycursor <= 0) {
		this.cursorAmount = 2;
	}
	this.Ycursor += this.cursorAmount;
	this.move(this.displayX, this.curY);
	var rate = (this.displayAmount / this.displayYmax);
	if (rate >= 1) {
		rate = 1;
    }
	var Aheight = rate * this.BarHeight;
	if ((this.Ycursor + Aheight + 1) >= 1248) {
		this.cursorAmount = -2;
	}
	this.setFrame(0, this.Ycursor, this.displayWidth, Aheight);
	this.FNumber.move(-10, Aheight / (-2));
}

DataBar.prototype.changeAll = function (x, y, width, height, curAmount, maxAmount) {
	this.curAmount = curAmount;
	this.maxAmount = maxAmount;
	this.BarWidth = width;
	this.BarHeight = height
	this.curX = x;
	this.curY = y
	this.bitmap = ImageManager.loadPicture("ui\\BarGrad");
	this.setFrame(0, 0, this.BarWidth, (this.curAmount / this.maxAmount) * this.BarHeight);
}

DataBar.prototype.changeValue = function (amount) {
	this.curAmount = amount
}

DataBar.prototype.changeMaxValue = function (maxAmount) {
	this.maxAmount = maxAmount;
}

DataBar.prototype.changeWidth = function (width) {
	this.BarWidth = width;
}

DataBar.prototype.changeX = function (x) {
	this.curX = x;
}

//-----------------------------------------------------------------------------

function Test_Window() {
	this.initialize.apply(this, arguments);
}

Test_Window.prototype = Object.create(Window_Base.prototype);
Test_Window.prototype.constructor = Test_Window;

Test_Window.prototype.initialize = function () {
	Window_Base.prototype.initialize.call(this, 0, 0, 1200, 624);
}

Test_Window.prototype.refresh = function () {
	this.contents.clear();
}

//-----------------------------------------------------------------------------

function Target_Window() {
	this.initialize.apply(this, arguments);
}

Target_Window.prototype = Object.create(Window_Base.prototype);
Target_Window.prototype.constructor = Target_Window;

Target_Window.prototype.initialize = function (txt) {
	Window_Base.prototype.initialize.call(this, 0, 275, 1200, 75);
	var txtList = txt.split("");
	this.drawText(txt, 600-(txtList.length*28)/2, 0);
	this.opacity = 0;
	this.layed = false;
	this.lastTime = 100;
}

Target_Window.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	if (!this.layed) {
		this.opacity += 5;
		if (this.opacity >= 255) {
			this.layed = true;
		}
	} else {
		this.lastTime -= 1;
		if (this.lastTime <= 0) {
			this.opacity -= 5;
			if (this.opacity <= 0) {
				this.destroy();
			}
        }
    }
}

Target_Window.prototype.refresh = function () {
	this.contents.clear();
}

//-----------------------------------------------------------------------------

function CountDown_Window() {
	this.initialize.apply(this, arguments);
}

CountDown_Window.prototype = Object.create(Window_Base.prototype)
CountDown_Window.prototype.constructor = CountDown_Window;

CountDown_Window.prototype.initialize = function () {
	Window_Base.prototype.initialize.call(this, 0, 275, 1200, 75);
	this.removeChildAt(0)
	this.Count = 5;
	this.curTime = 0;
	this.stage = 0;
	this.drawText(this.Count, 600, 0);
	this.ExItIng = false;
}

CountDown_Window.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	this.curTime += 1;
	if (this.curTime >= 60) {
		this.curTime = 0;
		this.Count -= 1;
		if (this.Count >= 1) {
			this.refresh();
			this.drawText(this.Count, 600, 0);
        }
	}

	if (this.Count <= 1) {
		this.opacity -= 20;
		if (this.opacity <= 0) {
			this.destroy();
        }
	}
	
}

CountDown_Window.prototype.refresh = function () {
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

//-----------------------------------------------------------------------------
function ProgressBar() {
	this.initialize.apply(this, arguments);
}

ProgressBar.prototype = Object.create(Sprite.prototype);
ProgressBar.prototype.constructor = ProgressBar;

ProgressBar.prototype.initialize = function (maxAmount) {
	Sprite.prototype.initialize.call(this);
	this.curAmount = 0;
	this.maxAmount = maxAmount;
	this.BarContent = new Sprite();
	this.frame = new Sprite();
	this.BarContent.bitmap = ImageManager.loadPicture("ui\\ProgressBarContent");
	this.frame.bitmap = ImageManager.loadPicture("ui\\ProgressBarFrame");
	this.Xcursor = 0;

	this.BarContent.move(10, 0);
	this.addChild(this.BarContent);
	this.BarContent.setFrame(this.Xcursor, 0, 0, this.BarContent.bitmap.height);
	this.addChild(this.frame)
}

ProgressBar.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.curAmount / this.maxAmount >= 1) {
		width = 330;
	} else {
		width = 330 * (this.curAmount / this.maxAmount);
	}
	this.Xcursor += 7;
	if ((this.Xcursor + width) >= this.BarContent.bitmap.width) {
		this.Xcursor = 0;
	}
	this.BarContent.setFrame(this.Xcursor, 0, width, this.BarContent.bitmap.height);
}

ProgressBar.prototype.changeNumber = function (num) {
	this.curAmount = num;
}

ProgressBar.prototype.setPhase = function (amount, picname) {
	var barX = 350 * (amount / this.maxAmount);
	var PhaseBar = new Sprite();
	PhaseBar.bitmap = ImageManager.loadPicture("ui\\PhaseBar");
	PhaseBar.anchor.x = 0.5;
	PhaseBar.move(barX, -5);

	var pic = new Sprite();
	pic.bitmap = ImageManager.loadPicture(picname);
	pic.anchor.x = 0.5;
	this.addChild(pic);
	pic.move(barX, 55);

	this.addChild(PhaseBar);
	this.addChild(pic);
}

//-----------------------------------------------------------------------------

function VerticalProgressBar() {
	this.initialize.apply(this, arguments);
}

VerticalProgressBar.prototype = Object.create(Sprite.prototype);
VerticalProgressBar.prototype.constructor = VerticalProgressBar;

VerticalProgressBar.prototype.initialize = function (maxAmount) {
	Sprite.prototype.initialize.call(this);
	this.changeTime = TetrisManager.GaugeConstant;
	this.curAmount = 0;
	this.displayAmount = 0;
	this.maxAmount = maxAmount;
	this.displayMax = maxAmount;
	this.BarContent = new Sprite();
	this.frame = new Sprite();
	this.BarContent.bitmap = ImageManager.loadPicture("ui\\BarGrad");
	this.frame.bitmap = ImageManager.loadPicture("ui\\VerticalProgressBarFrame");
	this.Ycursor = 0;
	this.maxLength = 250;
	this.cursorAmount = 2;

	this.BarContent.move(0, this.maxLength);
	this.addChild(this.BarContent);
	this.BarContent.setFrame(0, this.Ycursor, 15, this.maxLength);
	this.addChild(this.frame)

	this.phases = [];
}

VerticalProgressBar.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.displayAmount != this.curAmount) {
		if (this.displayAmount < this.curAmount) {
			this.displayAmount += (this.curAmount - this.displayAmount) / this.changeTime;
		} else {
			this.displayAmount -= (this.curAmount - this.displayAmount) / this.changeTime;
        }
	}

	if (this.displayMax != this.maxAmount) {
		if (this.displayMax < this.maxAmount) {
			this.displayMax += (this.maxAmount - this.displayMax) / this.changeTime;
		} else {
			this.displayMax -= (this.maxAmount - this.displayMax) / this.changeTime;
		}
    }


	if (this.Ycursor <= 0) {
		this.cursorAmount = 2;
	}
	this.Ycursor += this.cursorAmount;
	var rate = (this.displayAmount / this.displayMax);
	if (rate >= 1) {
		rate = 1;
	}
	var Aheight = rate * this.maxLength;
	if ((this.Ycursor + Aheight + 1) >= 1248) {
		this.cursorAmount = -2;
	}
	this.BarContent.move(0, this.maxLength - Aheight);
	this.BarContent.setFrame(0, this.Ycursor, 15, Aheight);

	if (this.phases) {
		for (var i = 0; i < this.phases.length; i++) {
			var barY = (1 - (this.phases[i].amount / this.displayMax)) * this.maxLength;
			if (barY < 0) {
				barY = 0;
            }
			this.phases[i].bar.move(7.5, barY);
			this.phases[i].pic.move(-5, barY);
        }
    }
}

VerticalProgressBar.prototype.changeNumber = function (num) {
	this.curAmount = num;
	while (num >= this.maxAmount) {
		this.maxAmount = this.maxAmount * 1.5
    }
}

VerticalProgressBar.prototype.addPhase = function (amount, picname) {
	var bar = new Sprite();
	bar.bitmap = ImageManager.loadPicture("ui\\VerticalPhaseBar");
	bar.anchor.x = 0.5;
	bar.anchor.y = 0.5;

	var pic = new Sprite();
	pic.bitmap = ImageManager.loadPicture(picname);
	pic.anchor.y = 0.5;
	pic.anchor.x = 1;

	var phase = {
		amount: amount,
		bar: bar,
		pic: pic
	}

	this.phases.push(phase);
	this.addChild(this.phases[this.phases.length - 1].bar)
	this.addChild(this.phases[this.phases.length - 1].pic)
}

//-----------------------------------------------------------------------------

function FNumber() {
	this.initialize.apply(this, arguments);
}

FNumber.prototype = Object.create(Sprite.prototype);
FNumber.prototype.constructor = FNumber;

FNumber.prototype.initialize = function (number, maxdigits, skin) {
	Sprite.prototype.initialize.call(this);
	this.oldNumber = null;
	this.curNumber = Math.floor(number);
	this.maxdigits = maxdigits;
	this.loadimg(skin);
	this.ExtendDir = "right"
}

FNumber.prototype.loadimg = function (skin) {
	if (skin) {
		this.number_img = ImageManager.loadPicture(skin)
	} else {
		this.number_img = ImageManager.loadPicture('numbers')
    }
}

FNumber.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.curNumber !== this.oldNumber || this.oldNumber === null) {
		this.create_number();
	}
}

FNumber.prototype.changeDirection = function (dir) {
	this.ExtendDir = dir
	this.create_number();
}

FNumber.prototype.create_number = function () {
	//if (this.number_sprites) {
	//	this.removeChildren();
	//for (var i = 0; i < this.number_sprites.length; i++) {
	//	this.removeChild(this.number_sprites[i])
	//}
	//}
	this.removeChildren();
	var numbers = Math.abs(this.curNumber).toString().split("");
	this.number_sprites = [];
	for (var i = 0; i < this.maxdigits; i++) {
		if (i > (numbers.length - 1)) { continue }
		this.number_sprites.push(new Sprite());
		this.number_sprites[i].bitmap = this.number_img;
		var n = Number(numbers[i]);
		this.number_sprites[i].setFrame(n * (this.number_sprites[i].bitmap.width / 10), 0, (this.number_sprites[i].bitmap.width / 10), this.number_sprites[i].bitmap.height)
		switch (this.ExtendDir) {
			case "left":
				this.number_sprites[i].x = (i * (this.number_sprites[i].bitmap.width / 10)) - ((numbers.length - 1) * (this.number_sprites[i].bitmap.width / 10))
				break;
			case "right":
				this.number_sprites[i].x = i * (this.number_sprites[i].bitmap.width / 10);
				break;
			case "mid":
				this.number_sprites[i].x = (i * (this.number_sprites[i].bitmap.width / 10)) - (((numbers.length - 1) * (this.number_sprites[i].bitmap.width / 10)) / 2)
				break;
		}
		//this.number_sprites[i].y = this.y;
		this.addChild(this.number_sprites[i])
	}
	this.oldNumber = this.curNumber;
}

FNumber.prototype.change = function (newNumber) {
	this.curNumber = Math.floor(newNumber);
}

FNumber.prototype.changeNumSkin = function (skin) {
	this.number_img = ImageManager.loadPicture(skin);
	this.create_number();
}

//-----------------------------------------------------------------------------

function PopNumber() {
	this.initialize.apply(this, arguments);
}

PopNumber.prototype = Object.create(Sprite.prototype);
PopNumber.prototype.constructor = PopNumber;

PopNumber.prototype.initialize = function (sprite) {
	Sprite.prototype.initialize.call(this);
	this.curSprite = sprite
	this.EnAblEd = false;
	this.poped = false;
	this.completed = false;
	this.curSprite.opacity = 0;
	this.addChild(this.curSprite);
}

PopNumber.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.EnAblEd) {
		if (!this.poped) {
			this.curSprite.y += 0.5
			this.curSprite.opacity += 10;
			if (this.curSprite.opacity >= 255) {
				this.poped = true;
			}
		} else {
			this.curSprite.opacity -= 10;
			this.curSprite.y += 0.5
			if (this.curSprite.opacity <= 0) {
				this.poped = false;
				this.EnAblEd = false;
				this.curSprite.move(this.x, this.y);
				this.completed = true;
				this.destroy();
			}
		}
	}
}

PopNumber.prototype.activate = function () {
	this.EnAblEd = true;
}

PopNumber.prototype.isCompleted = function () {
	return this.completed;
}

//-----------------------------------------------------------------------------

function ComboSprite() {
	this.initialize.apply(this, arguments);
}

ComboSprite.prototype = Object.create(Sprite.prototype);
ComboSprite.prototype.constructor = ComboSprite;

ComboSprite.prototype.initialize = function (combo) {
	Sprite.prototype.initialize.call(this);
	this.ComboPic = new Sprite();
	this.ComboPic.bitmap = ImageManager.loadPicture("ui\\ComboX");
	this.ComboNum = new FNumber(combo, 9, "BigNumbers")
	this.ComboNum.x = 200;
	this.opacity = 0;
	this.addChild(this.ComboNum);
	this.addChild(this.ComboPic);
	this.layed = false;
	this.ExItIng = false;
}

ComboSprite.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (!this.layed && !this.ExItIng) {
		this.opacity += 5;
		if (this.opacity >= 255) {
			this.layed = true;
		}
	}
	if (this.ExItIng) {
		this.opacity -= 5;
		if (this.opacity <= 0) {
			this.destroy();
		}
	} 
}

ComboSprite.prototype.deactivate = function () {
	this.ExItIng = true;
}

//-----------------------------------------------------------------------------

function Sprite_Canvas() {
	this.initialize.apply(this, arguments);
}

Sprite_Canvas.prototype = Object.create(Sprite.prototype);
Sprite_Canvas.prototype.constructor = Sprite_Canvas;

Sprite_Canvas.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.loadWindowskin();
}

Sprite_Canvas.prototype.loadWindowskin = function () {
	this.windowskin = ImageManager.loadSystem('Window');
};

Sprite_Canvas.prototype.resetFontSettings = function () {
	this.bitmap.fontFace = this.standardFontFace();
	this.bitmap.fontSize = this.standardFontSize();
	this.resetTextColor();
}

Sprite_Canvas.prototype.resetTextColor = function () {
	this.changeTextColor(this.normalColor());
}

Sprite_Canvas.prototype.changeTextColor = function (color) {
	this.bitmap.textColor = color;
}

Sprite_Canvas.prototype.textColor = function (n) {
	var px = 96 + (n % 8) * 12 + 6;
	var py = 144 + Math.floor(n / 8) * 12 + 6;
	return this.windowskin.getPixel(px, py);
};

Sprite_Canvas.prototype.normalColor = function () {
	return this.textColor(0);
};

Sprite_Canvas.prototype.standardFontFace = function () {
	if ($gameSystem.isChinese()) {
		return 'SimHei, Heiti TC, sans-serif';
	} else if ($gameSystem.isKorean()) {
		return 'Dotum, AppleGothic, sans-serif';
	} else {
		return 'GameFont';
	}
};

Sprite_Canvas.prototype.standardFontSize = function () {
	return 28;
};

//-----------------------------------------------------------------------------

function Something() {
	this.initialize.apply(this, arguments);
}

Something.prototype = Object.create(Sprite_Canvas.prototype);
Something.prototype.constructor = Something;

Something.prototype.initialize = function () {
	Sprite_Canvas.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture("Window");
	this.resetFontSettings();
	this.bitmap.drawText("hello world");
}

//-----------------------------------------------------------------------------

function CheckBox() {
	this.initialize.apply(this, arguments);
}

CheckBox.prototype = Object.create(Sprite.prototype);
CheckBox.prototype.constructor = CheckBox;

CheckBox.prototype.initialize  = function() {
	Sprite.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture("ui\\CheckBox");
	this.Check = new Sprite();
	this.Check.bitmap = ImageManager.loadPicture("ui\\Check");
	this.added = false;
}

CheckBox.prototype.ChEck = function () {
	if (!this.added) {
		this.addChild(this.Check);
		this.added = true;
	}
}

CheckBox.prototype.UnChEck = function () {
	if (this.added) {
		this.removeChild(this.Check);
		this.added = false;
    }
}

//=============================================================================
// 地图遮罩
//=============================================================================

TetrisManager.SceneMapCreateDisplayObjects = Scene_Map.prototype.createDisplayObjects;

Scene_Map.prototype.createDisplayObjects = function () {
	TetrisManager.SceneMapCreateDisplayObjects.call(this);
	//TetrisManager.addOverlay();
}

TetrisManager.removeOverlay = function () {
	SceneManager._scene.removeChild(TetrisManager.CameraOverlay);
}

TetrisManager.addOverlay = function () {
	TetrisManager.CameraOverlay = new Sprite();
	TetrisManager.CameraOverlay.bitmap = ImageManager.loadPicture("Camera");
	SceneManager._scene.addChild(TetrisManager.CameraOverlay);
}

//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⣤⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣶⣤⡀
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⢀⢀⢀⢀⢀⣀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⢀⢀⣀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣳⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠙⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠈⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⣠⣤⣤⣴⣶⣤⣤⣄⣀⣙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⡀⢀⢀⢀⠉⠉⠙⠛⠛⠿⠿⠿⣿⣿⣿⣿⡿⠟⠋⠁
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⡟⠛⠛⠛⣿⣿⣿⣿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣤⣀
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⣶⣿⣿⣿⣤⣶⣤⣾⣿⣿⣿⣋⣠⣿⡿⠁⠉⢙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣥⣠⣤⣿⣣⣿⠋⣉⣩⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣰⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⢱⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢟⣿⣿⣿⣿⡟⠁⢀⣿⡟⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣿⣿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣣⣿⣿⣿⡿⠋⢀⢀⣸⡿⢱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢸⣿⣿⣿⣿⡃⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⡿⢋⣼⣿⣿⣿⠋⢀⢀⢀⣰⠟⠁⣾⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣿⣿⣿⣿⡟⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢡⣿⢟⣴⣿⣿⠿⠋⠁⢀⣠⣤⡾⠋⢀⣸⣿⣿⣿⠋⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢰⣿⣿⣿⣿⠁⢀⠘⣿⣿⣿⣿⣿⡿⡿⠋⠁⢀⠋⢀⠈⠉⣿⣄⢀⢀⢀⠈⠋⠁⢀⢀⢠⣿⣿⣿⠏⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⢀⢀⢀⢀⢀⢠⣴⣶⡄
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣼⣿⣿⣿⣏⣀⣀⣀⣿⣿⣿⣿⠟⢀⢀⢀⢀⢀⢀⢀⢀⢀⠛⢿⣷⣤⣀⢀⢀⢀⢀⢀⣾⣿⠿⠁⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⢀⢀⢀⢠⣿⣿⣿⡇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠳⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠉⠛⠿⢷⣶⣤⣀⡾⠋⢀⢀⢀⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⢀⢀⢀⣸⣿⣿⣿⡇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣰⣿⣿⣿⣿⢿⣿⣀⡀⣽⣿⣿⣿⣿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠉⠛⠿⠶⣦⣤⣄⣀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⢀⢀⢀⣿⢀⢀⢸⡇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣰⢿⣿⣿⣿⣿⢀⠉⠉⠁⠙⠛⠛⠛⠿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠘⠛⠻⠷⣦⢀⢀⢀⢀⢀⢀⠈⠙⠛⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⢀⢀⢀⢀⣿⢀⢀⢸⡇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣸⠃⣾⣿⣿⣿⡇⣠⡄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢠⣾⣿⣿⣿⣶⣶⣤⢀⢀⢀⢀⢀⢀⢀⢀⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀⢀⢀⢸⡏⢀⢀⢸⡇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⠃⢀⣿⣿⣿⣿⣿⣿⣇⡀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠐⠛⠛⠋⠛⢻⣿⣿⣿⣿⣿⣶⣦⡀⢀⢀⢀⡿⠁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⢀⢀⢀⢀⣸⡇⢀⢀⢸⡇
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⠃⢀⣰⣿⣿⣿⡿⡿⠋⠛⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠛⠛⢿⣿⣿⣿⣿⣿⣿⣿⣶⡶⠂⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⢀⢀⢀⣿⠁⢀⢀⣾⠁
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⠏⣀⣼⣿⣿⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⠈⠛⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠉⠿⣿⣿⣋⣿⣿⣷⠆⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⢀⢀⢀⢠⡿⢀⢀⢀⣿
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⢏⣼⡿⣻⣿⣿⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠋⠉⠉⠁⢀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢀⢀⢀⢀⢸⡇⢀⢀⢀⣿
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⣣⣿⣿⣿⣿⣿⣿⣿⣿⣇⢀⢀⢀⢀⢀⣿⡄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣤⣤⣠⣶⣶⣿⡀⢀⢀⢀⢀⢀⣠⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀⢀⢀⢀⣿⡅⢀⢀⢠⣿
//⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⣿⣿⢯⣿⣿⣿⣿⣿⣿⣿⣿⡆⢀⢀⢀⢀⠹⢷⡟⣰⠆⢠⢀⡀⡀⢀⢀⢀⢀⢀⢀⢀⠈⠁⢻⣿⣿⣿⣿⣷⣤⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀⢀⢀⢠⣿⠁⢀⢀⢸⣿⣄
//⢀⢀⢀⢀⢀⢀⢀⢀⣾⣿⡿⢣⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⢀⢀⢀⢀⢀⢀⠉⢀⠳⠎⠱⠇⠋⠁⢀⢀⢀⢀⢀⢀⢀⢀⠛⠛⠛⠛⠛⠻⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠶⣦⣤⣀⢸⡏⢀⢀⢀⢸⡏⠻⣷⣤⡀
//⢀⢀⢀⢀⢀⢀⢀⣾⣿⡟⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠛⠿⢿⣦⡄⢀⠈⠙⠛⠃⢀⢀⢀⢸⣇⢀⢀⠙⣿
//⢀⢀⢀⢀⢀⢀⣸⣿⠋⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢀⢀⢀⠛⢀⢀⢀⢀⢀⢀⢀⢀⢀⠈⠉⢀⢀⢀⣿
//⢀⢀⢀⢀⢀⣾⡿⠁⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⣴⣿⣿⣿⣿⣿⣿⡿⠫⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢿⡀
//⢀⢀⢀⢠⣾⣿⠃⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣤⣀⣀⡀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣀⣤⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡃⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣾⣇
//⢀⢀⢀⣾⣿⣏⣾⣿⣿⣿⣿⣿⣿⣿⠟⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣿⠈⢷⡀
//⢀⢀⢸⣿⣿⣽⣿⣿⣿⣿⣿⣿⡿⠃⢀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣿⡀⢀⠱
//⢀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⢀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠸⣧⡀⢀⡆
//⢀⢀⣿⣿⣿⣿⣿⣿⣿⣿⡟⢀⢀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣷⣶⣶⣄⣀⣀⣤⣴⣦⣤⣤⣀⢀⣠⣤⣀⡀⠹⠷⢀⠇
//⢀⢀⣿⣿⣿⣿⣿⣿⣿⡿⠁⢀⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⣉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣀⣤⣾
//⢀⢀⢻⣿⣿⣿⣿⣿⣿⠃⢀⢀⢀⣿⡿⠋⣿⣿⣿⣿⡟⠛⠛⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⠟⢀⣾⣿⣦⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
//⢀⢀⣸⣿⣿⣿⣿⣿⡿⢀⢀⢀⠸⠟⢠⣾⣿⣿⣿⣿⡇⢀⢀⢀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⠋⠉⠉⠉⢀⣼⣿⣿⠋⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠛⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏
//⢀⢀⣿⣿⣿⣿⣿⣿⠇⢀⢀⢀⢀⢠⣿⣿⡟⠘⣿⣿⡇⢀⢀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠉⠁⢀⢀⢀⢀⢀⢀⢀⢀⢠⣿⣿⡟⠁⢀⣾⣿⠟⠉⠁⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠉⠉⠉⠙⠛⠛⠿⢿⡏
//⢀⢰⣿⣿⣿⣿⣿⣿⢀⢀⢀⡒⢀⣿⣿⠟⢀⢀⠹⣿⡇⢀⢀⣨⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⡿⠋⢀⣴⣿⠟⠁⢀⢀⢠⣿⣿⣿⣿⣿⡿⢀⠹⣿⣿⣿⣿⣿⣿⡄
//⢀⣼⣿⣿⣿⣿⣿⡏⢀⢀⣘⠇⣾⣿⡟⢀⢀⢀⢀⢻⠇⢀⡈⠛⠛⢿⣿⣿⣿⣿⠿⠿⢿⡿⠋⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣴⣿⡿⠋⢀⣠⣾⣿⣿⢀⢀⢀⢀⣸⣿⣿⣿⣿⣿⢀⢀⢀⢨⣿⣿⣿⣿⣿⣇⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠐⠆
//⢀⣿⣿⣿⣿⣿⣿⠇⢀⢀⣿⢸⣿⡿⠁⢀⢀⢀⢀⢀⢀⠾⠃⢀⢀⢀⠉⠙⠁⢴⣾⡿⠋⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⣾⣿⡿⠋⢀⣠⣾⣿⣿⣿⣿⡄⢀⢀⢀⣿⣿⣿⣿⣿⡇⢀⢀⢀⣾⢿⣿⣿⣿⣿⣿⡀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⠰⠆
//⢀⣿⣿⣿⣿⣿⡿⢀⢀⢸⣏⣿⡿⠁⢀⢀⢀⢀⢀⣰⠆⢀⢀⢀⢀⢀⢀⢀⣠⡾⠋⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⣾⣿⠿⠋⢀⣤⣿⣿⣿⣿⠟⠉⠈⠁⢀⢀⢸⣿⣿⣿⣿⡟⢀⢀⢀⣰⣿⠈⣿⣿⣿⣿⣿⣷⡀
//⢀⣿⣿⣿⣿⣿⡇⠰⠆⣶⣾⡿⠁⢀⢀⢀⢀⢀⣸⣋⣀⣀⣀⣘⣛⠃⢶⣾⠟⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣤⣾⣿⠟⢁⣠⣴⣿⣿⣿⡿⠛⠁⢀⢀⢀⢀⢀⢠⣿⣿⣿⣿⡿⢀⢀⢀⢠⣿⠇⢀⣿⣿⣿⣿⣿⣿⠃
//⢀⣿⣿⣿⣿⣿⢀⢀⣸⣷⣿⠃⢀⢀⢀⢀⢀⢰⡿⠿⠿⠿⢿⣿⣿⣿⡿⠁⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⢀⣠⣶⣿⠟⢋⣠⣴⣿⣿⣿⡿⠟⠁⢀⢀⢀⢀⣶⢀⢀⢀⣿⣿⣿⣿⡟⠁⢀⢀⢀⣼⠏⢀⢀⣿⣿⣿⣿⡏⠁