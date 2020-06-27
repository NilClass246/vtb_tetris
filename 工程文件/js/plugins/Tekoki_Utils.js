//============================================================
// 俄罗斯方块的基本设定
//============================================================

var TetrisManager = TetrisManager || {};

TetrisManager.Temps = {};

TetrisManager.Records = {};

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

TetrisManager.twoPMode = false;

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

TetrisManager.Count_Tspin = 0;

TetrisManager.curhighestCombo = 0;

TetrisManager.curhighestLPM = 0;

TetrisManager.curhighestKPM = 0;

//TetrisManager.highestLPM = 0;

//TetrisManager.highestAPM = 0;

TetrisManager.TimerActivated = false;

TetrisManager.keyCodeList = {
	"8": "BACKSPACE",
	"9": "TAB",
	"13": "ENTER",
	"16": "SHIFT",
	"17": "CTRL",
	"18": "ALT",
	"19": "PAUSE_BREAK",
	"20": "CAPS_LOCK",
	"27": "ESCAPE",
	"33": "PAGE_UP",
	"34": "PAGE_DOWN",
	"35": "END",
	"36": "HOME",
	"37": "LEFT_ARROW",
	"38": "UP_ARROW",
	"39": "RIGHT_ARROW",
	"40": "DOWN_ARROW",
	"45": "INSERT",
	"46": "DELETE",
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
	"65": "A",
	"66": "B",
	"67": "C",
	"68": "D",
	"69": "E",
	"70": "F",
	"71": "G",
	"72": "H",
	"73": "I",
	"74": "J",
	"75": "K",
	"76": "L",
	"77": "M",
	"78": "N",
	"79": "O",
	"80": "P",
	"81": "Q",
	"82": "R",
	"83": "S",
	"84": "T",
	"85": "U",
	"86": "V",
	"87": "W",
	"88": "X",
	"89": "Y",
	"90": "Z",
	"91": "LEFT_WINDOW_KEY",
	"92": "RIGHT_WINDOW_KEY",
	"93": "SELECT_KEY",
	"96": "NUMPAD_0",
	"97": "NUMPAD_1",
	"98": "NUMPAD_2",
	"99": "NUMPAD_3",
	"100": "NUMPAD_4",
	"101": "NUMPAD_5",
	"102": "NUMPAD_6",
	"103": "NUMPAD_7",
	"104": "NUMPAD_8",
	"105": "NUMPAD_9",
	"106": "MULTIPLY",
	"107": "ADD",
	"109": "SUBTRACT",
	"110": "DECIMAL_POINT",
	"111": "DIVIDE",
	"112": "F1",
	"113": "F2",
	"114": "F3",
	"115": "F4",
	"116": "F5",
	"117": "F6",
	"118": "F7",
	"119": "F8",
	"120": "F9",
	"121": "F10",
	"122": "F11",
	"123": "F12",
	"144": "NUM_LOCK",
	"145": "SCROLL_LOCK",
	"186": "SEMI_COLON",
	"187": "EQUAL_SIGN",
	"188": "COMMA",
	"189": "DASH",
	"190": "PERIOD",
	"191": "FORWARD_SLASH",
	"192": "GRAVE_ACCENT",
	"219": "OPEN_BRACKET",
	"220": "BACK_SLASH",
	"221": "CLOSE_BRAKET",
	"222": "SINGLE_QUOTE"
}

TetrisManager.BlankLines = 2;

TetrisManager.GaugeConstant = 10;

TetrisManager.AboveLines = 16;

TetrisManager.AiSpeed = 0;

//============================================================
// 成就参数
//============================================================

TetrisManager.Records.Count_Tspin = 0;

TetrisManager.Records.Count_Blocks = 0;

TetrisManager.Records.Count_Buttons = 0;

TetrisManager.Records.Count_Lines = 0;

TetrisManager.Records.highestLPM = 0;

TetrisManager.Records.highestKPM = 0;

TetrisManager.Records.Total_Score = 0;

TetrisManager.localFileId = 4545;

TetrisManager.webStorageKey = "Tekoki-Tetris";

TetrisManager.makeData = function () {
	var tet = TetrisManager.Records;
	tet.AiSpeed = TetrisManager.AiSpeed;
	return tet
}

TetrisManager.save = function () {
	StorageManager.save(TetrisManager.localFileId, JSON.stringify(TetrisManager.makeData()));
}

TetrisManager.load = function () {
	var json;
	var tet = {};
	try {
		json = StorageManager.load(TetrisManager.localFileId);
	} catch (e) {
		console.error(e);
	}
	if (json) {
		tet = JSON.parse(json);
	}

	for (name in tet) {
		switch (name) {
			case "Count_Tspin":
				TetrisManager.Records.Count_Tspin = tet[name];
				break;
			case "Count_Blocks":
				TetrisManager.Records.Count_Blocks = tet[name];
				break;
			case "Count_Buttons":
				TetrisManager.Records.Count_Buttons = tet[name];
				break;
			case "Count_Lines":
				TetrisManager.Records.Count_Lines = tet[name];
				break;
			case "highestLPM":
				TetrisManager.Records.highestLPM = tet[name];
				break;
			case "highestKPM":
				TetrisManager.Records.highestKPM = tet[name];
				break;
			case "Total_Score":
				TetrisManager.Records.Total_Score = tet[name];
				break;
			case "AiSpeed":
				TetrisManager.AiSpeed = tet[name];
				break;
        }
	}
}

TetrisManager.Temps.StorageManager_localFilePath = StorageManager.localFilePath;
StorageManager.localFilePath = function (savefileId) {
	if (savefileId === TetrisManager.localFileId) {
		return this.localFileDirectoryPath() + 'Tekoki.rpgsave';
	}
	return TetrisManager.Temps.StorageManager_localFilePath.apply(this, arguments);
}

TetrisManager.Temps.StorageManager_webStorageKey = StorageManager.webStorageKey;
StorageManager.webStorageKey = function (savefileId) {
	if (savefileId === TetrisManager.localFileId) {
		return TetrisManager.webStorageKey;
	}
	return TetrisManager.Temps.StorageManager_webStorageKey.apply(this, arguments);
};

TetrisManager.Temps.Scene_Boot_Start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function () {
	TetrisManager.Temps.Scene_Boot_Start.call(this);
	TetrisManager.load();
}

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

TetrisManager.randomnize = function (p) {
	p = p * 100;
	var rnd = Math.random() * 100;
	if (rnd <= p) {
		return true;
	} else {
		return false;
    }
}

//============================================================
// 内部方法继承
//============================================================
//TODO: Damn, why is the call method not working???

TetrisManager.Temps.is_OccasionOk = Game_BattlerBase.prototype.isOccasionOk
Game_BattlerBase.prototype.isOccasionOk = function (item) {
	if (SceneManager._scene instanceof Scene_Tetris || SceneManager._scene instanceof Scene_Puzzle) {
		return item.occasion === 0 || item.occasion === 1;
	} else {
		if ($gameParty.inBattle()) {
			return item.occasion === 0 || item.occasion === 1;
		} else {
			return item.occasion === 0 || item.occasion === 2;
		}
	}
}

Window_Selectable.prototype.getOpenness = function () {
	return this.openness;
}

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
			this.ProgressBar.addPhase($gameVariables.value(10), "ui\\LunaticBar")
			this.ProgressBar.addPhase($gameVariables.value(9), "ui\\HardBar")
			this.ProgressBar.addPhase($gameVariables.value(8), "ui\\NormalBar")
			this.ProgressBar.addPhase($gameVariables.value(7), "ui\\EasyBar")
			break;
	}
}

Puzzle_Manager.prototype.update = function (score) {
	switch (this.puzzleID) {
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
//TODO: 制作锁定系统
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

//============================================================
// 伤害系统
//============================================================

TetrisManager.HarmSystem = {};

TetrisManager.HarmSystem.dealDamage = function (source, target, amount, type) {
	var scene = SceneManager._scene;
	if (target) {
		var finaldamage = amount
		var atkType = type
		switch (atkType) {
			case 'normal':
				finaldamage = 3 * amount - 2 * target.def;
				if (source.cri && TetrisManager.randomnize(source.cri)) {
					finaldamage = finaldamage * 2;
					atkType = 'critical';
				}
				break;
        }
		if (target.category == "enemy") {
			if (finaldamage >= 0) {
				target.curHp -= finaldamage;
			}
			if (target.curHp < 0) {
				target.curHp = 0;
				target.living = false;
				scene.changeTarget();
			}
			var pop = new PopNumber(new FNumber(finaldamage, 7));
			scene._blockLayer.addChild(pop)
			pop.move(target.xposition + 5 * target.xrange, target.yposition + TetrisManager.AboveLines * target.yrange + 10 * target.yrange);
			switch (atkType) {
				case 'normal':
					break;
				case 'poison':
					pop.setTint(0x009933)
					break;
			}
			pop.activate();
			//this.createXYanimationWindow(1, target.xposition + 5 * target.xrange, target.yposition + TetrisManager.AboveLines * target.yrange + 12 * target.yrange);
		} else {
			if (finaldamage >= 0) {
				scene.actor.gainHp(-finaldamage);
			}
			var pop = new PopNumber(new FNumber(finaldamage, 7));
			scene._blockLayer.addChild(pop)
			pop.move(target.pictureBoard.x + target.pictureBoard.width / 2, target.pictureBoard.y + target.pictureBoard.height / 2)
			switch (atkType) {
				case 'normal':
					break;
				case 'poison':
					pop.setTint(0x009933)
					break;
            }
			pop.activate();
			//this.createXYanimationWindow(1, target.pictureBoard.x + target.pictureBoard.width / 2, target.pictureBoard.y + target.pictureBoard.height / 2);
		}
	}
}

//============================================================
// 技能系统
//============================================================

function SkillManager() {
	this.initialize.apply(this, arguments);
}

SkillManager.prototype.initialize = function (skillIDList) {
	this.skill_list = [];
	this.skillButton_list = [];
	for (var i = 0; i < skillIDList.length; i++) {
		this.skill_list.push(
			Object.create(TetrisManager.skill_List[skillIDList[i]])
		);
		this.skillButton_list.push(new SkillButton(skillIDList[i]));
	}

	for (name in Input.keyMapper) {
		if (Input.keyMapper[name] == 'skillone') {
			if (this.skillButton_list[0]) {
				this.skillButton_list[0].writeHotKey(TetrisManager.keyCodeList[String(name)]);
            }
		}

		if (Input.keyMapper[name] == 'skilltwo') {
			if (this.skillButton_list[1]) {
				this.skillButton_list[1].writeHotKey(TetrisManager.keyCodeList[String(name)]);
            }
		}

		if (Input.keyMapper[name] == 'skillthree') {
			if (this.skillButton_list[2]) {
				this.skillButton_list[2].writeHotKey(TetrisManager.keyCodeList[String(name)]);
            }
		}
    }

	this._skill_board = new skillBoard(this.skillButton_list);
}

SkillManager.prototype.startSkill = function (id) {
	if (this.skill_list[id]&&this.skill_list[id].isPrepared) {
		this.skillButton_list[id].shine();
		this.skill_list[id].MakeEffect();
		this.skill_list[id].Reset();
		this.skillButton_list[id].writeCDTxt(this.skill_list[id].CD);
    }
}

SkillManager.prototype.update = function () {
	for (var i = 0; i < this.skill_list.length; i++) {
		if (this.skill_list[i].running) {
			if (this.skill_list[i].isCompleted()) {
				this.skill_list[i].Finish();
            }
		}
		if (!this.skill_list[i].isPrepared) {
			if ((Date.now() - this.skill_list[i].oldTime) / 1000 > 1) {
				this.skill_list[i].CD -= 1;
				this.skillButton_list[i].writeCDTxt(this.skill_list[i].CD);
				this.skill_list[i].oldTime = Date.now();
				if (this.skill_list[i].CD <= 0) {
					this.skill_list[i].isPrepared = true;
                }
            }
        }
	}
	if (Input.isTriggered('skillone')) {
		this.startSkill(0);
	}

	if (Input.isTriggered('skilltwo')) {
		this.startSkill(1);
	}

	if (Input.isTriggered('skillthree')) {
		this.startSkill(2);
	}
}


//-----------------------------------------------------------------------------

function SkillWindow() {
	this.initialize.apply(this, arguments);
}

SkillWindow.prototype = Object.create(Window_Selectable.prototype);
SkillWindow.prototype.constructor = SkillWindow;

SkillWindow.prototype.initialize = function (skillButtonList, helpWindow) {
	Window_Selectable.prototype.initialize.call(this);
	this.skillButton_list = skillButtonList;

	this.setHelpWindow(helpWindow);
	this._itemNum = 3;
	this.openness = 0;
	this.deactivate();
}

SkillWindow.prototype.start = function () {
	for (var i = 0; i < this.skillButton_list.length; i++) {
		this.skillButton_list[i].move(this.padding+this.spacing()+i*this.itemWidth(), this.padding)
		this.addChild(this.skillButton_list[i]);
    }
	this.updatePlacement();
	this.createContents();
	this.refresh();
	this.open();
	this.activate();
	this.select(0);
}

SkillWindow.prototype.updatePlacement = function () {
	this.width = this.windowWidth();
	this.height = this.windowHeight();
	this.x = 0
	this.y = 545;
};

SkillWindow.prototype.itemWidth = function () {
	return 50;
};

SkillWindow.prototype.itemHeight = function () {
	return 50;
};

SkillWindow.prototype.windowWidth = function () {
	return this.maxCols() * this.itemWidth() + this.padding * 2;
};

SkillWindow.prototype.windowHeight = function () {
	return this.itemWidth() + this.padding * 2;
};

SkillWindow.prototype.maxCols = function () {
	return this._itemNum;
}

SkillWindow.prototype.maxItems = function () {
	return this._itemNum;
};

SkillWindow.prototype.spacing = function () {
	return 1;
};

SkillWindow.prototype.update = function () {
	Window_Selectable.prototype.update.call(this);
}

SkillWindow.prototype.drawItem = function (index) {
	this.drawItemRect(index)
}

SkillWindow.prototype.drawItemRect = function (index) {
	var rect = this.itemRect(index);
	var color = this.gaugeBackColor();
	this.drawRect(rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2, color);
}

SkillWindow.prototype.getRectColor = function (index) {
	return this.gaugeBackColor();
};

SkillWindow.prototype.drawRect = function (dx, dy, dw, dh, color) {
	this.changePaintOpacity(false);
	this.contents.fillRect(dx, dy, dw, dh, color);
	this.changePaintOpacity(true);
};

SkillWindow.prototype.updateHelp = function () {
	if (!this._helpWindow) return;
	if (this.skillButton_list[this.index()] && this.skillButton_list[this.index()]._skill.description ) {
		this._helpWindow.setText(this.skillButton_list[this.index()]._skill.description);
	} else {
		this._helpWindow.setText("No Description")
    }
}

SkillWindow.prototype.isTouchOkEnabled = function () {
	return true;
};

SkillWindow.prototype.isOkEnabled = function () {
	return true;
};

SkillWindow.prototype.isCancelEnabled = function () {
	return true;
};

SkillWindow.prototype.isOkTriggered = function () {
	return Input.isTriggered('ok');
};

SkillWindow.prototype.processOk = function () {
	SoundManager.playOk();
	for (var i = 0; i < this.skillButton_list.length; i++) {
		this.removeChild(this.skillButton_list[i]);
	}
	this.deactivate();
	this.close();
	this._helpWindow.deactivate();
	this._helpWindow.close();
	SceneManager._scene._Skill_Manager.startSkill(this.index());
}

SkillWindow.prototype.processCancel = function(){
	SoundManager.playCancel();
	for (var i = 0; i < this.skillButton_list.length; i++) {
		this.removeChild(this.skillButton_list[i]);
	}
	SceneManager._scene.openPauseWindow();
	this.deactivate();
	this.close();
	this._helpWindow.deactivate();
	this._helpWindow.close();
}

//-----------------------------------------------------------------------------

function skillBoard() {
	this.initialize.apply(this, arguments);
}

skillBoard.prototype = Object.create(Sprite.prototype);
skillBoard.prototype.constructor = skillBoard;

skillBoard.prototype.initialize = function (skillButtonlist) {
	Sprite.prototype.initialize.call(this);
	this.skillButton_list = skillButtonlist
	this.background = new Tetris_Window(-5, -5, 160, 60);
	this.addChild(this.background);
	for (var i = 0; i < this.skillButton_list.length; i++) {
		this.skillButton_list[i].move(i * 50, 0);
		this.addChild(this.skillButton_list[i]);
	}
	for (var i = 0; i < 3 - this.skillButton_list.length; i++) {
		var sprite = new Sprite(ImageManager.loadPicture("Skills\\SkillFrame"));
		sprite.move(50 * (this.skillButton_list.length + i), 0);
		this.addChild(sprite);
    }
}

//-----------------------------------------------------------------------------

function itemBoard() {
	this.initialize.apply(this, arguments);
}

itemBoard.prototype = Object.create(Sprite.prototype);
itemBoard.prototype.constructor = itemBoard;

itemBoard.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this._data = $gameParty.allItems().filter(function (item) {
		return DataManager.isItem(item) && item.itypeId === 1;
	}, this);
	this.boardIndex = 0;
	this.setIndex = 0;
	this.lastSet = -1;
	this.iconSets = [];
	this.changingIcon = false;
	this.background = new Tetris_Window(-5, -5, 5 * 38 + 10, 48);
	this.addChild(this.background);

	this.Icons = [];
	for (var i = 0; i < this._data.length; i++) {
		if (this._data[i]) {
			this.Icons.push(new itemIcon(this._data[i]))
			//this.curIcons[i].move(i * 38, 0);
			//this.addChild(this.curIcons[i])
        }
	}

	for (name in Input.keyMapper) {
		if (Input.keyMapper[name] == 'itemone') {
			this.itemOneHotKey = TetrisManager.keyCodeList[String(name)];
		}
		if (Input.keyMapper[name] == 'itemtwo') {
			this.itemTwoHotKey = TetrisManager.keyCodeList[String(name)];
		}
		if (Input.keyMapper[name] == 'itemthree') {
			this.itemThreeHotKey = TetrisManager.keyCodeList[String(name)];
		}
		if (Input.keyMapper[name] == 'itemfour') {
			this.itemFourHotKey = TetrisManager.keyCodeList[String(name)];
		}
	}

	var count = 0;
	var tempSet = 0;
	this.iconSets.push(new Sprite());
	for (var i = 0; i < this.Icons.length; i++) {
		if (count >= 4) {
			count = 0;
			tempSet += 1;
			this.iconSets.push(new Sprite());
		}
		switch (count) {
			case 0:
				this.Icons[i].writeHotKey(this.itemOneHotKey);
				break;
			case 1:
				this.Icons[i].writeHotKey(this.itemTwoHotKey);
				break;
			case 2:
				this.Icons[i].writeHotKey(this.itemThreeHotKey);
				break;
			case 3:
				this.Icons[i].writeHotKey(this.itemFourHotKey);
				break;
		}
		this.Icons[i].move(count * 38, 0);
		this.iconSets[tempSet].addChild(this.Icons[i]);
		count += 1;
	}

	this.itemArrow = new Sprite(ImageManager.loadPicture('ui\\ItemArrow'));
	this.itemArrow.move(4 * 38 + 10, 0)
	this.addChild(this.itemArrow)
	this.addChild(this.iconSets[this.setIndex]);
}

itemBoard.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (Input.isTriggered('itemone')) {
		var id = this.boardIndex + 0
		this.useItem(id);
	}
	if (Input.isTriggered('itemtwo')) {
		var id = this.boardIndex + 1
		this.useItem(id);
	}
	if (Input.isTriggered('itemthree')) {
		var id = this.boardIndex + 2
		this.useItem(id);
	}
	if (Input.isTriggered('itemfour')) {
		var id = this.boardIndex + 3
		this.useItem(id);
	}

	if (Input.isTriggered('itemshift')) {
		if (!this.changingIcon) {
			if (this._data[this.boardIndex + 4]) {
				this.boardIndex += 4;
				this.setIndex += 1;
				this.lastSet = this.setIndex - 1;
			} else {
				this.boardIndex = 0;
				this.setIndex = 0;
				this.lastSet = this.iconSets.length - 1;
			}
			this.removeChild(this.iconSets[this.setIndex]);
			this.iconSets[this.setIndex].move(4 * 38, 0);
			this.iconSets[this.setIndex].opacity = 0;
			this.addChild(this.iconSets[this.setIndex]);
			console.log(this.setIndex);
			this.changingIcon = true;
        }
	}

	if (this.changingIcon) {
		if (this.iconSets.length > 1) {
			this.iconSets[this.lastSet].x -= 4 * 38 / 10;
			this.iconSets[this.setIndex].x -= 4 * 38 / 10;
			this.iconSets[this.lastSet].opacity -= 255 / 10;
			this.iconSets[this.setIndex].opacity += 255 / 10;
			if (this.iconSets[this.lastSet].opacity <= 0) {
				this.changingIcon = false;
			}
		} else {
			this.iconSets[this.setIndex].x -= 4 * 38 / 10;
			this.iconSets[this.setIndex].opacity += 255 / 10;
			if (this.iconSets[this.setIndex].opacity >= 255) {
				this.changingIcon = false;
			}
        }
    }
}

itemBoard.prototype.useItem = function (id) {
	var item = this._data[id];
	if (item && $gameParty.numItems(item) > 0) {
		SoundManager.playUseItem();
		//TODO: this.playSeForItem();
		this.user().useItem(item);
		this.applyItem(item);
		//this.checkCommonEvent();
		this.Icons[id].writeNum($gameParty.numItems(item))
		this.Icons[id].shine();
    }
}

itemBoard.prototype.user = function () {
	return $gameActors.actor(1);
}

itemBoard.prototype.applyItem = function (item) {
	var id = String(item["id"]);
	if (TetrisManager.item_List[id]) {
		TetrisManager.item_List[id]();
    }
}

function itemIcon() {
	this.initialize.apply(this, arguments);
}

itemIcon.prototype = Object.create(Sprite.prototype);
itemIcon.prototype.constructor = itemIcon;

itemIcon.prototype.initialize = function (item) {
	Sprite.prototype.initialize.call(this);
	var iconIndex = item.iconIndex
	this.icon = new Sprite(ImageManager.loadSystem('IconSet'))
	var pw = 32;
	var ph = 32;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	this.icon.setFrame(sx, sy, pw, ph);
	this.icon.move(3, 3);
	this.addChild(this.icon);
	this.iconFrame = new Sprite(ImageManager.loadPicture('ui\\ItemFrame'));
	this.iconCover = new Sprite(ImageManager.loadPicture('ui\\ItemCover'));
	this.iconCover.opacity = 0;
	this.addChild(this.iconFrame);
	this.addChild(this.iconCover);
	this.hotKeyTxt = new Sprite(new Bitmap(32, 32));
	this.hotKeyTxt.bitmap.fontSize = 14;
	this.hotKeyTxt.anchor.y = 0.5;
	this.addChild(this.hotKeyTxt);
	this.numTxt = new Sprite(new Bitmap(32, 32));
	this.numTxt.bitmap.fontSize = 18;
	this.numTxt.move(0, 16);
	this.addChild(this.numTxt);
	this.writeNum($gameParty.numItems(item))
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;

	this.shining = false;
	this.shined = false;
}

itemIcon.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.shining && !this.shined) {
		this.scale.x += 0.1;
		this.scale.y += 0.1;
		if (this.scale.x >= 1.5) {
			this.shined = true;
		}
	}

	if (this.shined) {
		this.scale.x -= 0.1
		this.scale.y -= 0.1
		if (this.scale.x <= 1) {
			this.shining = false;
			this.shined = false;
		}
	}
}

itemIcon.prototype.writeNum = function (num) {
	if (num > 0) {
		this.numTxt.bitmap.clear();
		this.numTxt.bitmap.drawText(String(num), 0, 0, 32, 32, 'right');
	} else {
		this.numTxt.bitmap.clear();
		this.iconCover.opacity = 200;
    }
}

itemIcon.prototype.writeHotKey = function (keyname) {
	this.hotKeyTxt.bitmap.clear();
	this.hotKeyTxt.bitmap.drawText(keyname, 0, 0, 32, 32, 'left');
}

itemIcon.prototype.shine = function () {
	this.shining = true;
}

//-----------------------------------------------------------------------------

function Window_SkillHelp(){
	this.initialize.apply(this, arguments);
}

Window_SkillHelp.prototype = Object.create(Window_Help.prototype);
Window_SkillHelp.prototype.constructor = Window_SkillHelp;

Window_SkillHelp.initialize = function (x, y, width, height) {
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this._text = '';
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
	this._skillID = skillID;
	this._skill = TetrisManager.skill_List[skillID];
	this.bitmap = ImageManager.loadPicture("Skills\\" + TetrisManager.skill_List[skillID].pic);
	this.skillFrame = new Sprite();
	this.skillFrame.bitmap = ImageManager.loadPicture("Skills\\SkillFrame");
	this.addChild(this.skillFrame);
	this.skillCover = new Sprite(ImageManager.loadPicture("Skills\\SkillCover"));
	this.skillCover.opacity = 0;
	this.addChild(this.skillCover);
	this.hotKeyTxt = new Sprite(new Bitmap(50, 50));
	this.hotKeyTxt.bitmap.fontSize = 14;
	this.hotKeyTxt.anchor.y = 0.5;
	this.addChild(this.hotKeyTxt);
	this.CDTxt = new Sprite(new Bitmap(50, 50));
	this.CDTxt.bitmap.fontSize = 18;
	this.addChild(this.CDTxt);

	this.shining = false;
	this.shined = false;

}

SkillButton.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.shining && !this.shined) {
		this.scale.x += 0.1;
		this.scale.y += 0.1;
		if (this.scale.x >= 1.5) {
			this.shined = true;
		}
	}

	if (this.shined) {
		this.scale.x -= 0.1
		this.scale.y -= 0.1
		if (this.scale.x <= 1) {
			this.shining = false;
			this.shined = false;
		}
	}
}

SkillButton.prototype.writeHotKey = function (string) {
	this.hotKeyTxt.bitmap.clear();
	this.hotKeyTxt.bitmap.drawText(string, 0, 0, 50, 50, 'left');
}

SkillButton.prototype.writeCDTxt = function (number) {
	if (number > 0) {
		this.skillCover.opacity = 255;
		this.CDTxt.bitmap.clear();
		this.CDTxt.bitmap.drawText(String(number), 0, 0, 50, 50, 'center');
	} else {
		this.skillCover.opacity = 0;
		this.CDTxt.bitmap.clear();
    }
}

SkillButton.prototype.shine = function () {
	this.shining = true;
}


//-----------------------------------------------------------------------------
//Buff系统

function stateBoard() {
	this.initialize.apply(this, arguments);
}

stateBoard.prototype = Object.create(Sprite.prototype);
stateBoard.prototype.constructor = stateBoard;

stateBoard.prototype.initialize = function (owner) {
	Sprite.prototype.initialize.call(this);
	this._owner = owner
	this._currentStates = {};
	this._previousStates = {};
	this.oldTime = Date.now();
	this._stateicons = {};
	this._statelist = {};
	this.iconPos = 0;
}

stateBoard.prototype.refreshStates = function () {
	for (var i = 0; i < this._owner._states.length; i++) {
		this._currentStates[String(this._owner._states[i])] = true;
	}

	for (var strid in this._currentStates) {
		if (this._owner._states.indexOf(Number(strid)) == -1) {
			this._currentStates[strid] = false;
		}

		if (this._currentStates[strid] && !this._previousStates[strid]) {
			if (!this._statelist[strid]) {
				this._statelist[strid] = Object.create(TetrisManager.state_List[strid])
				if (this._statelist[strid].onGain) {
					this._statelist[strid].onGain(this._owner);
                }
            }
			var stateicon = new stateIcon(this._statelist[strid])
			this._stateicons[strid] = stateicon;
			this._stateicons[strid].move(this.iconPos, 0);
			this.addChild(this._stateicons[strid])
			this.iconPos += 32;
		}
		if (!this._currentStates[strid] && this._previousStates[strid]) {
			if (this._statelist[strid].onLose) {
				this._statelist[strid].onLose();
            }
			this._statelist[strid] = null;
			this.removeChild(this._stateicons[strid]);
			this.iconPos -= 32;
		}

		if (this._statelist[strid]) {
			if (this._statelist[strid].update) {
				this._statelist[strid].update();
            }
			if (this._statelist[strid].updated) {
				this._stateicons[strid].shine();
				this._statelist[strid].updated = false;
            }
		}

		this._previousStates[strid] = this._currentStates[strid];
	}
}

stateBoard.prototype.applyStates = function (strid, layers) {
	if (this._statelist[strid]) {
		this._statelist[strid].count += layers;
	} else {
		this._owner._states.push(Number(strid));
		this._statelist[strid] = Object.create(TetrisManager.state_List[strid])
		this._statelist[strid].onGain(this._owner);
		this._statelist[strid].count += layers;
    }
}

stateBoard.prototype.clearAllStates = function () {
	for (var strid in this._statelist) {
		if (this._statelist[strid].type == 'in_battler') {
			var numid = Number(strid);
			this._owner._states.splice(this._owner._states.indexOf(numid), 1);
        }
    }
}

stateBoard.prototype.onAttack = function () {
	for (var strid in this._statelist) {
		if (this._statelist[strid] && this._statelist[strid].onAttack) {
			this._statelist[strid].onAttack();
        }
    }
}

function stateIcon() {
	this.initialize.apply(this, arguments);
}

stateIcon.prototype = Object.create(Sprite.prototype);
stateIcon.prototype.constructor = stateIcon;

stateIcon.prototype.initialize = function (state) {
	Sprite.prototype.initialize.call(this);
	this._state = state
	this.bitmap = ImageManager.loadSystem("IconSet");
	var iconIndex = $dataStates[Number(this._state.id)].iconIndex;
	var sx = iconIndex % 16 * 32;
	var sy = Math.floor(iconIndex / 16) * 32;
	this.setFrame(sx, sy, 32, 32);
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._textLayer = new Sprite(new Bitmap(32, 32));
	this._textLayer.anchor.x = 0.5;
	this._textLayer.anchor.y = 0.5;
	this.addChild(this._textLayer);
	this._textLayer.bitmap.fontSize = 18;
	this.shining = false;
	this.shined = false;
}

stateIcon.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._state.count > 0) {
		this._textLayer.bitmap.clear()
		this._textLayer.bitmap.drawText(this._state.count, 0, 0, 32, 32, 'right');
	}

	if (this._state.count == 0) {
		this._textLayer.bitmap.clear()
    }

	if (this.shining && !this.shined) {
		this.scale.x += 0.1;
		this.scale.y += 0.1;
		if (this.scale.x >= 1.5) {
			this.shined = true;
        }
	}

	if (this.shined) {
		this.scale.x -= 0.1
		this.scale.y -= 0.1
		if (this.scale.x <= 1) {
			this.shining = false;
			this.shined = false;
        }
    }
}

stateIcon.prototype.shine = function () {
	this.shining = true;
}

//-----------------------------------------------------------------------------
// 技能特效的抽象类
function Attack_Effect() {
	this.initialize.apply(this, arguments);
}

Attack_Effect.prototype = Object.create(Sprite.prototype);
Attack_Effect.prototype.constructor = Attack_Effect;

Attack_Effect.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.completed = false;
}

Attack_Effect.prototype.isCompleted = function () {
	return this.completed;
}

Attack_Effect.prototype.Complete = function () {
	this.completed = true;
}

//-----------------------------------------------------------------------------

function DiminishingBox() {
	this.initialize.apply(this, arguments);
}

DiminishingBox.prototype = Object.create(Attack_Effect.prototype);
DiminishingBox.prototype.constructor = DiminishingBox;

DiminishingBox.prototype.initialize = function (speed) {
	Attack_Effect.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture("theBox")
	this.tint = 0x9900cc;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.scale.x = 1;
	this.scale.y = 1;
	this.speed = speed
	this._time = 1 / this.speed;
}

DiminishingBox.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	this.rotation += Math.PI / 60;
	this.scale.x -= this.speed;
	this.scale.y -= this.speed;
	this._time -= 1;
	if (this._time <= 0) {
		this.Complete();
		this.destroy();
    }
}

function SpinningBox() {
	this.initialize.apply(this, arguments);
}

SpinningBox.prototype = Object.create(Attack_Effect.prototype);
SpinningBox.prototype.constructor = SpinningBox;

SpinningBox.prototype.initialize = function (Xdistance, Ydistance) {
	Attack_Effect.prototype.initialize.call(this);
	this.Xdistance = Xdistance;
	this.Ydistance = Ydistance;
	this.time = 30
	this.interval = 1;
	this.counter = 0;
	this.Xstep = Xdistance / this.time;
	this.Ystep = Ydistance / this.time;
	this.Xcursor = 0;
	this.Ycursor = 0;
	this.sampleBox = new DiminishingBox(0.01);

}

SpinningBox.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.time <= 0) {
		this.Complete();
	} else {
		this.Xcursor += this.Xstep;
		this.Xdistance -= this.Xstep;
		this.Ycursor += this.Ystep;
		this.Ydistance -= this.Ystep;
		this.counter += 1;
		if (this.counter >= this.interval) {
			var box = new DiminishingBox(0.01);
			box.move(this.Xcursor, this.Ycursor);
			this.addChild(box);
			this.counter = 0;
		}

    }

	if ((-this.time) >= this.sampleBox._time) {
		this.destroy();
	}

	this.time -= 1;
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
		this.displayAmount += (this.curAmount - this.displayAmount) / this.changeTime;
	}

	if (this.displayMax != this.maxAmount) {
		this.displayMax += (this.maxAmount - this.displayMax) / this.changeTime;
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
	this.curNumber = Math.round(number);
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
		this.number_sprites[i].tint = this.tint;
		console.log(this.tint);
		//this.number_sprites[i].y = this.y;
		this.addChild(this.number_sprites[i])
	}
	this.oldNumber = this.curNumber;
}

FNumber.prototype.change = function (newNumber) {
	this.curNumber = Math.round(newNumber);
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

PopNumber.prototype.setTint = function (tint) {
	this.tint = tint;
	this.curSprite.tint = this.tint;
	this.curSprite.create_number();
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

//-----------------------------------------------------------------------------

function targetMark() {
	this.initialize.apply(this, arguments);
}

targetMark.prototype = Object.create(Sprite.prototype);
targetMark.prototype.constructor = targetMark;

targetMark.prototype.initialize = function (target) {
	Sprite.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture("Target");
	this.anchor.x = 0.5
	this.anchor.y = 0.5
	this.scale.x = target.scaleX;
	this.targetScaleX = target.scaleX;
	this.scale.y = target.scaleY;
	this.targetScaleY = target.scaleY;
	this.move(
		target.xposition + (TetrisManager.ROW / 2) * target.xrange,
		target.yposition + ((TetrisManager.COL - TetrisManager.AboveLines) / 2) * target.yrange + TetrisManager.AboveLines * target.yrange
	)

	this.targetX = this.x;
	this.targetY = this.y;
}

targetMark.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.scale.x != this.targetScaleX) {
		this.scale.x += (this.targetScaleX - this.scale.x) / TetrisManager.GaugeConstant;
	}

	if (this.scale.y != this.targetScaleY) {
		this.scale.y += (this.targetScaleY - this.scale.y) / TetrisManager.GaugeConstant;
	}

	if (this.x != this.targetX) {
		this.x += (this.targetX - this.x) / TetrisManager.GaugeConstant;
	}

	if (this.y != this.targetY) {
		this.y += (this.targetY - this.y) / TetrisManager.GaugeConstant;
	}
}

targetMark.prototype.aim = function (target) {
	this.targetScaleX = target.scaleX;
	this.targetScaleY = target.scaleY;
	this.targetX = target.xposition + (TetrisManager.ROW / 2) * target.xrange;
	this.targetY = target.yposition + ((TetrisManager.COL - TetrisManager.AboveLines) / 2) * target.yrange + TetrisManager.AboveLines * target.yrange
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