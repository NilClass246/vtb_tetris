//============================================================
// 俄罗斯方块的基本设定
//============================================================

var TetrisManager = TetrisManager || {};

PIXI.autoDetectRenderer.antialias = true;

TetrisManager.Temps = {};

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

TetrisManager.HPGaugeConstant = 50;

TetrisManager.AboveLines = 16;

TetrisManager.AiSpeed = 20;
TetrisManager.playerAiSpeed = 20;

TetrisManager.Xrevision = 23;

TetrisManager.simpleCopySprite = function (s) {
	var t = new Sprite();
	t.bitmap = s.bitmap;
	t.x = s.x;
	t.y = s.y;
	t.scale.x = s.scale.x;
	t.scale.y = s.scale.y;
	t.opacity = s.opacity;
	t.rotation = s.rotation;
	return t;
}

TetrisManager.pariticleSet = {};

TetrisManager.pariticleSet['Fire'] = {
	"alpha": {
		"start": 1,
		"end": 0
	},
	"scale": {
		"start": 0.1,
		"end": 0.01,
		"minimumScaleMultiplier": 5
	},
	"color": {
		"start": "#ffa600",
		"end": "#ff2200"
	},
	"speed": {
		"start": 200,
		"end": 50,
		"minimumSpeedMultiplier": 0.01
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 270,
		"max": 270
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.2,
		"max": 0.8
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 500,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "point"
}

TetrisManager.pariticleSet['Poison'] = {
	"alpha": {
		"start": 1,
		"end": 0
	},
	"scale": {
		"start": 0.1,
		"end": 0.01,
		"minimumScaleMultiplier": 5
	},
	"color": {
		"start": "#d97ed9",
		"end": "#000000"
	},
	"speed": {
		"start": 200,
		"end": 50,
		"minimumSpeedMultiplier": 0.01
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 270,
		"max": 270
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.2,
		"max": 0.8
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 500,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "point"
}

TetrisManager.pariticleSet['Bubble'] = {
	"alpha": {
		"start": 1,
		"end": 0
	},
	"scale": {
		"start": 0.1,
		"end": 0.01,
		"minimumScaleMultiplier": 5
	},
	"color": {
		"start": "#d97ed9",
		"end": "#000000"
	},
	"speed": {
		"start": 200,
		"end": 50,
		"minimumSpeedMultiplier": 0.01
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 270,
		"max": 270
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.5,
		"max": 2
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 50,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "rect",
	"spawnRect": {
		"x": 0,
		"y": 0,
		"w": 0,
		"h": 0
	}
}

TetrisManager.pariticleSet['Angry'] = {
	"alpha": {
		"start": 1,
		"end": 0
	},
	"scale": {
		"start": 0.5,
		"end": 0.5,
		"minimumScaleMultiplier": 7
	},
	"color": {
		"start": "#ff0000",
		"end": "#ff5e00"
	},
	"speed": {
		"start": 0,
		"end": 0,
		"minimumSpeedMultiplier": 0.01
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 250,
		"max": 290
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 1,
		"max": 1
	},
	"lifetime": {
		"min": 1,
		"max": 1
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 5,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "rect",
	"spawnRect": {
		"x": 0,
		"y": 0,
		"w": 0,
		"h": 0
	}
}

TetrisManager.pariticleSet['Rage'] = {
	"alpha": {
		"start": 1,
		"end": 0
	},
	"scale": {
		"start": 0.2,
		"end": 0.01,
		"minimumScaleMultiplier": 5
	},
	"color": {
		"start": "#ff6600",
		"end": "#000000"
	},
	"speed": {
		"start": 200,
		"end": 50,
		"minimumSpeedMultiplier": 0.01
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 270,
		"max": 270
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.5,
		"max": 5
	},
	"blendMode": "normal",
	"frequency": 0.001,
	"emitterLifetime": -1,
	"maxParticles": 500,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "rect",
	"spawnRect": {
		"x": 0,
		"y": 0,
		"w": 1200,
		"h": 0
	}
}

TetrisManager.pariticleSet['semi-fire-left'] = {
	"alpha": {
		"start": 0.8,
		"end": 0.1
	},
	"scale": {
		"start": 0.3,
		"end": 0.001,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ff4040",
		"end": "#ff4040"
	},
	"speed": {
		"start": 0,
		"end": 0,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 50,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 0
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 1,
		"max": 1
	},
	"blendMode": "normal",
	"frequency": 0.01,
	"emitterLifetime": -1,
	"maxParticles": 100,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "rect",
	"spawnRect": {
		"x": 0,
		"y": 0,
		"w": 0,
		"h": 600
	}
};

TetrisManager.pariticleSet['semi-fire-right'] = {
	"alpha": {
		"start": 0.8,
		"end": 0.1
	},
	"scale": {
		"start": 0.3,
		"end": 0.001,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#ff4040",
		"end": "#ff4040"
	},
	"speed": {
		"start": 0,
		"end": 0,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": -50,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 0
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 1,
		"max": 1
	},
	"blendMode": "normal",
	"frequency": 0.01,
	"emitterLifetime": -1,
	"maxParticles": 100,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "rect",
	"spawnRect": {
		"x": 0,
		"y": 0,
		"w": 0,
		"h": 600
	}
};

TetrisManager.pariticleSet['trail'] ={
	"alpha": {
		"start": 0.8,
		"end": 0.1
	},
	"scale": {
		"start": 0.5,
		"end": 0.3,
		"minimumScaleMultiplier": 1
	},
	"color": {
		"start": "#03ff25",
		"end": "#ffffff"
	},
	"speed": {
		"start": 0,
		"end": 0,
		"minimumSpeedMultiplier": 1
	},
	"acceleration": {
		"x": 0,
		"y": 0
	},
	"maxSpeed": 0,
	"startRotation": {
		"min": 0,
		"max": 0
	},
	"noRotation": false,
	"rotationSpeed": {
		"min": 0,
		"max": 0
	},
	"lifetime": {
		"min": 0.2,
		"max": 0.2
	},
	"blendMode": "normal",
	"frequency": 0.008,
	"emitterLifetime": -1,
	"maxParticles": 1000,
	"pos": {
		"x": 0,
		"y": 0
	},
	"addAtBack": false,
	"spawnType": "point"
}

TetrisManager.seSet = {};

TetrisManager.seSet['Wind7'] ={
	name: "Wind7",
	pan: 0,
	pitch: 60,
	volume: 125
};

TetrisManager.starPic = ImageManager.loadPicture('ui/signStar');

TetrisManager.autoStart = false;

TetrisManager.TachiCodes = {
	"1": "redDumpling",
	"2": "Fighter"
}

//============================================================
// 成就参数
//============================================================

TetrisManager.Records = {};

TetrisManager.Records.Count_Tspin = 0;

TetrisManager.Records.Count_Blocks = 0;

TetrisManager.Records.Count_Buttons = 0;

TetrisManager.Records.Count_Lines = 0;

TetrisManager.Records.highestLPM = 0;

TetrisManager.Records.highestKPM = 0;

TetrisManager.Records.Total_Score = 0;

TetrisManager.Records.isTitleScreenChanged = false;

TetrisManager.Records.difficulty = 1;

TetrisManager.localFileId = 4545;

TetrisManager.webStorageKey = "Tekoki-Tetris";

TetrisManager.makeData = function () {
	var tet = TetrisManager.Records;
	tet.AiSpeed = TetrisManager.AiSpeed;
	tet.isTitleScreenChanged = TetrisManager.Records.isTitleScreenChanged;
	tet.difficulty = TetrisManager.Records.difficulty;
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
			case "AiSpeed":
				TetrisManager.AiSpeed = tet[name];
				break;
			case "isTitleScreenChanged":
				TetrisManager.Records.isTitleScreenChanged = tet[name];
				break;
			case "difficulty":
				TetrisManager.Records.difficulty = tet[name];
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

TetrisManager.Temps.Scene_Title_prototype_initialize = Scene_Title.prototype.initialize;
Scene_Title.prototype.initialize = function () {
	TetrisManager.Temps.Scene_Title_prototype_initialize.call(this);
	TetrisManager.load();
}

TetrisManager.Temps.Scene_Title_prototype_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function () {
	TetrisManager.Temps.Scene_Title_prototype_create.call(this);
	//console.log(ConfigManager.keyMapper);
	ConfigManager.applyKeyConfig();
	//if(ConfigManager.isHandStation){
		//TetrisManager.pointerLock();
	//}
	//if (!TetrisManager.Records.isTitleScreenChanged) {
	//	//var titletext = new Sprite(ImageManager.loadPicture("PrologueTitle"));
	//	//var titletext = new Text_Base("No Tetris No Life", 500, 200, 55, 'left');
	//	titletext.move(200, 100);
	//	this.addChild(titletext);
	//}
}

//============================================================
// 超级旋转系统
//============================================================

TetrisManager.PlaceTest = function (battler, tempBlock, cur) {
	var box = cur.box;
	var x = Math.floor((tempBlock.x - TetrisManager.Xrevision) / battler.xrange);
	var y = Math.floor((tempBlock.y) / battler.yrange)
		+ TetrisManager.AboveLines - 1
		- Math.floor((3 + (-battler.yrange + 25)) / battler.yrange);

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
	if (TetrisManager.block_pics.contains(type)) {
		var data = TetrisManager.data;
	} else {
		var data = TetrisManager.specialBlockData;
    }
	if ((rotation + 1) < (data[type].length)) {
		tempCur.box = data[type][rotation + 1];
		tempCur.rotation += 1;
	} else {
		tempCur.box = data[type][0];
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
	if (TetrisManager.block_pics.contains(type)) {
		var data = TetrisManager.data;
	} else {
		var data = TetrisManager.specialBlockData;
	}
	if (rotation - 1 >= 0) {
		tempCur.box = data[type][rotation - 1];
		tempCur.rotation -= 1;
	} else {
		tempCur.box = data[type][data[type].length - 1];
		tempCur.rotation = data[type].length - 1;
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

	if ((battler.cur.type == 'purples')) {
		Rule = TetrisManager.specialRuleSet['purples'][((tempBlock.rotationTime % 4) + '')];
	}

	if ((battler.cur.type == 'six')) {
		Rule = TetrisManager.specialRuleSet['six'][((tempBlock.rotationTime % 4) + '')];
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
		var kickTable = TetrisManager.IKick;
	}

	if (type != "o" && type != "1") {
		var kickTable = TetrisManager.generalKick;
	}

	if (!TetrisManager.block_pics.contains(type)) {
		var kickTable = TetrisManager.specialKick;
    }


	for (i in kickTable[key]) {
		var smallTemp = {
			x: tempBlock.x,
			y: tempBlock.y
		}
		smallTemp.x += kickTable[key][i][0] * battler.xrange;
		smallTemp.y += kickTable[key][i][1] * battler.yrange;
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

TetrisManager.getRotationResult = function (battler, direction) {
	if (battler.cur.type == 'o') {
		return
    }
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
	if(!cur){
		return false;
	}
	var box = cur.box;
	var len = cur.box.length;
	var x = Math.floor((cur.block.x - TetrisManager.Xrevision) / battler.xrange);
	var y = Math.floor((cur.block.y) / battler.yrange)
		+ TetrisManager.AboveLines - 1 + 1
		- Math.floor((3 + (-battler.yrange + 25)) / battler.yrange);
		//+ Math.floor(3 + (-battler.yrange + 25) / battler.yrange);
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

TetrisManager.checkEmpty2Darray = function (arr) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (arr[i][j] != 0) {
				return false;
            }
        }
	}
	return true;
}

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
	this.lastTime = 0;
	this.oldTime = Date.now();
	this.TimerActivated = true;
}

TetrisManager.resetTimer = function () {
	this.lastTime = 0;
	this.oldTime = Date.now();
	this.TimerActivated = true;
}

TetrisManager.getElapsedTime = function () {
	if (this.TimerActivated) {
		var time = (Math.floor((Date.now() - this.oldTime + this.lastTime) / 10) / 100)
		return time;
	} else {
		return 0;
    }
}

TetrisManager.pauseTimer = function () {
	this.lastTime = this.getElapsedTime()*1000;
	this.TimerActivated = false;
}

TetrisManager.continueTimer = function () {
	if (!this.lastTime) {
		this.lastTime = 0;
    }
	this.oldTime = Date.now();
	this.TimerActivated = true;
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

TetrisManager.componentToHex = function (c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

TetrisManager.rgbToHex = function (r, g, b) {
	return Number("0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b));
}

TetrisManager.convertToSecond = function(systemTime){
	return Math.floor(systemTime/1000);
}

//============================================================
// 内部方法继承与覆写
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
TetrisManager.Temps.Game_Party_isAllDead = Game_Party.prototype.isAllDead
Game_Party.prototype.isAllDead = function() {
	var allwell = false;
	for(var i=0; i<$gameParty.allMembers().length; i++){
		if($gameParty.allMembers()[i].hp>0){
			allwell = true;
		}
	}
	if(!allwell){
		return true;
	}
	TetrisManager.Temps.Game_Party_isAllDead.call(this);
};

Window_Selectable.prototype.getOpenness = function () {
	return this.openness;
}

Bitmap.prototype.drawHorGrad = function (width, height, color1, color2) {
	var context = this._context;
	var grad = context.createLinearGradient(0, 0, width, 0);
	grad.addColorStop(0, color1);
	grad.addColorStop(1, color2);
	context.fillStyle = grad;
	context.fillRect(0, 0, width, height);
	this._setDirty();
}

Bitmap.prototype.drawPolygon = function (pointList) {
	if (pointList.length >= 2) {
		var context = this._context;
		context.strokeStyle = 'white'
		context.beginPath();
		for (var i = 0; i < pointList.length - 1; i++) {
			context.moveTo(pointList[i].x, pointList[i].y);
			context.lineTo(pointList[i + 1].x, pointList[i + 1].y);
		}

		context.moveTo(pointList[pointList.length - 1].x, pointList[pointList.length - 1].y)
		context.lineTo(pointList[0].x, pointList[0].y)
		context.closePath();
		context.lineWidth = 2;
		context.stroke();
    }
}

TetrisManager.Temps.Game_Actor_Initialize = Game_Actor.prototype.initialize;
Game_Actor.prototype.initialize = function (actorId) {
	TetrisManager.Temps.Game_Actor_Initialize.call(this, actorId);
	this._signedItems = [];
};

TetrisManager.isScrollCenterAlligned = false;

TetrisManager.pointerLocked = false;

TetrisManager.pointerLock = function(){
	this.pointerLocked = true;
	this.lockPointer();
	//console.log('locked')
}

TetrisManager.pointerUnlock = function(){
	this.pointerLocked = false;
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
	document.exitPointerLock();
}

TetrisManager.SetFullScreen = function(){
	var canv = document.getElementById("GameCanvas");
	canv.requestFullscreen = canv.requestFullscreen || canv.mozRequestFullscreen || canv.mozRequestFullScreen || canv.webkitRequestFullscreen;
	canv.requestFullscreen();
};

TetrisManager.lockPointer = function(){
	var canv = document.getElementById("GameCanvas");
	canv.requestPointerLock();
}

TetrisManager.ExitFullScreen = function(){
	document.exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
	document.exitFullscreen();
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
TetrisManager.showInstructions = function () {
	this.instructions = new Window_Instructions();
	SceneManager._scene.addChild(this.instructions);
	this.hiding = false;
}

TetrisManager.hideInstructions = function () {
	if (!this.hiding) {
		var s = new SpriteSlider(this.instructions, 268, 107, 268, 737, 60, {destrucsive: true});
		SceneManager._scene.addChild(s);
		this.hiding = true;
    }
}

function Window_Instructions() {
	this.initialize.apply(this, arguments);
}

Window_Instructions.prototype = Object.create(Window_Base.prototype);
Window_Instructions.prototype.constructor = Window_Instructions;

Window_Instructions.prototype.initialize = function () {
	Window_Base.prototype.initialize.call(this, 268, 0, 644, 425);
	this.window_title = new Tetris_Window(268, -75, 644, 75);
	this.addChild(this.window_title);

	this.window_title.drawText("{instructions_title}", 10, 0);
	this.drawText("{instructions_Line1}", 10, 0);
	this.drawText("{instructions_Line2}", 10, 28);
	this.drawText("{instructions_Line3}", 10, 56);
	this.drawText("{instructions_Line4}", 10, 84);
	this.drawText("{instructions_Line5}", 475, 112);
	this.silder = new SpriteSlider(this, 268, -500, 268, 107, 60);
	this.addChild(this.silder);
	this.a = new SequenceAnimation({ name: "地图按键\\未标题-3", FinalNumber: 21, framedigits: 2, initialNumber: 0, delay: 2 });
	this.a.move(10, 200);
	this.addChild(this.a);
}

Window_Instructions.prototype.refresh = function () {
	this.contents.clear();
}

//-----------------------------------------------------------------------------
// icon 的超类

//-----------------------------------------------------------------------------

function Full_Window() {
	this.initialize.apply(this, arguments);
}

Full_Window.prototype = Object.create(Sprite.prototype);
Full_Window.prototype.constructor = Full_Window;

Full_Window.prototype.initialize = function (x, y, width, height) {
	Sprite.prototype.initialize.call(this);
	this._background = new Tetris_Window(0, 0, width, height);
	this.addChild(this._background);


	this._contents = new Sprite(new Bitmap(width, height));
	this.addChild(this._contents);
	this.x = x;
	this.y = y;
	this.contents = this._contents.bitmap;
}

Full_Window.prototype.refresh = function () {
	this.contents.clear();
}

Full_Window.prototype.drawThinGauge = function (x, y, width, rate, height, color1, color2) {
	var fillW = Math.floor(width * rate);
	var gaugeY = y + this._background.lineHeight() - 2 - height;
	this.contents.fillTrap(x, gaugeY, width, width, height, this._background.gaugeBackColor1(), this._background.gaugeBackColor2());
	this.contents.fillTrap(x, gaugeY, width, fillW, height, color1, color2);
	this.contents.outlineTrap(x, gaugeY, width, height, this._background.gaugeBackColor2(), this._background.gaugeBackColor2())
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
	this.gold = info.gold;
	this.exp = info.exp;
	this.layed = false;
	this.refresh();
	this.drawText("本局分数：" + this.score, 0, 0);
	this.drawText("本局最大连击：" + this.combo, 0, 28);
	this.drawText("本局LPM：" + TetrisManager.keepTwoDigits(this.LPM), 0, 56);
	this.drawText("本局KPM：" + TetrisManager.keepTwoDigits(this.APM), 0, 84);
	this.drawText("获得金币：" + (this.gold?this.gold:"0"), 0, 140);
	this.drawText("获得经验：" + (this.exp?this.exp:"0"), 0, 168);

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

	this.drawText("...按确认键继续", 775, 328);

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

TetrisManager.Temps.Game_Actor_prototype_addParam = Game_Actor.prototype.addParam;
Game_Actor.prototype.addParam = function(paramId, value){
	TetrisManager.Temps.Game_Actor_prototype_addParam.call(this, paramId, value);
	this._updateSpecialParams(paramID, value);
}
// 0 - 最大生命值 mhp
// 1 - 最大魔力值 mmp
// 2 - 力量 （影响攻击力和最大生命值）atk
// 3 - 防御力 def
// 4 - 智力 mat
// 5 - 魔法防御 mdf
// 6 - 敏捷 agi
// 7 - 幸运 luk
Game_Actor.prototype._updateSpecialParams = function(paramID, value){
	if(paramID==2){
		this.addParam(0, 10*value);
	}
	if(paramID ==4){
		this.addParam(1, 5*value);
	}
}

/**
 * 造成伤害和治疗的主方法.
 *
 * @method TetrisManager.HarmSystem.dealDamage
 * @param {Any} source 伤害来源
 * @param {Any} target 伤害目标
 * @param {Number} amount 伤害量
 * @param {String} type 伤害类型
 */
TetrisManager.HarmSystem.dealDamage = function (source, target, amount, type) {
	var scene = SceneManager._scene;
	if (target) {
		var finaldamage = amount
		var atkType = type
		var effective = false;
		//公式调整
		switch (atkType) {
			case 'normal':
				finaldamage = 3 * amount - 2 * target.def;
				finaldamage = source.Damage_mag * finaldamage
				if (source.cri && TetrisManager.randomnize(source.cri)) {
					finaldamage = finaldamage + source.Critical_mag * finaldamage;
					atkType = 'critical';
				}
				break;
			case 'recover':
				finaldamage = 3 * amount - 2 * target.def;
				finaldamage = source.Damage_mag * finaldamage
				if (source.cri && TetrisManager.randomnize(source.cri)) {
					finaldamage = finaldamage + source.Critical_mag * finaldamage;
					atkType = 'critical';
				}
				if (finaldamage >= 0) {
					source.actor.gainHp(finaldamage);
					var pop = new PopNumber(new FNumber(finaldamage, 7));
					scene._blockLayer.addChild(pop)
					pop.move(source.gauge_pos[0], source.gauge_pos[1]);
					pop.setTint(0x00ff00);
					pop.activate();
                }
				var e = new LifeStealEffect(target);
				scene._effectLayer.addChild(e);
				break;
		}
		//伤害调整
		if (finaldamage > 0) {
			finaldamage = finaldamage * target.Be_Damaged_mag;
		}
		//敌人的场合
		if (target.category == "enemy") {
			if (atkType == 'healing') {
				target.curHp -= finaldamage;
			} else {
				if (finaldamage >= 0) {
					target.curHp -= finaldamage;
				} else {
					finaldamage = 0;
                }
            }
			if (target.curHp < 0) {
				target.curHp = 0;
				scene.changeTarget();
			}
			var pop = new PopNumber(new FNumber(Math.abs(finaldamage), 7));
			scene._blockLayer.addChild(pop)
			pop.move(target.gauge_pos[0], target.gauge_pos[1]);

			switch (atkType) {
				case 'normal':
					target.avatar.shake(10);
					target.avatar.blink(0xff6666);
					break;
				case 'poison':
					pop.setTint(0xff99ff)
					break;
				case 'critical':
					pop.setTint(0xffc34d)
					break;
				case 'healing':
					pop.setTint(0x00ff00)
					break;
			}
			pop.activate();
			if (target.manager && target.manager.onAttacked) {
				target.manager.onAttacked();
            }

			//this.createXYanimationWindow(1, target.xposition + 5 * target.xrange, target.yposition + TetrisManager.AboveLines * target.yrange + 12 * target.yrange);
		//玩家的场合
		} else {
			if (atkType == 'healing') {
				target.actor.gainHp(-finaldamage);
			} else {
				if (finaldamage >= 0) {
					target.actor.gainHp(-finaldamage);
				} else {
					finaldamage = 0;
                }
			}
			var pop = new PopNumber(new FNumber(Math.abs(finaldamage), 7));
			scene._blockLayer.addChild(pop)
			pop.move(target.gauge_pos[0], target.gauge_pos[1])
			//pop.move(target.pictureBoard.x + target.pictureBoard.width / 2, target.pictureBoard.y + target.pictureBoard.height / 2)
			switch (atkType) {
				case 'normal':
					target.picture.shake(10);
					target.picture.blink(0xff6666);
					break;
				case 'poison':
					pop.setTint(0xff99ff)
					break;
				case 'critical':
					pop.setTint(0xffc34d)
					break;
				case 'healing':
					pop.setTint(0x00ff00)
					break;
				case 'real':
					target.picture.shake(10);
					target.picture.blink(0xff6666);
					break;
            }
			pop.activate();
			if (source && source.AtkAnim) {
				scene.createXYanimationWindow(source.AtkAnim,
					target.pic_pos[0] + (150 * Math.random() - 75),
					target.pic_pos[1] + (150 * Math.random() - 75));
            }
			//this.createXYanimationWindow(1, target.pictureBoard.x + target.pictureBoard.width / 2, target.pictureBoard.y + target.pictureBoard.height / 2);
		}
	}
}

TetrisManager.HarmSystem.getAtk = function(actor){
	return actor.atk*3;
}

TetrisManager.HarmSystem.getPhysPower = function(actor){
	return Math.floor((actor.atk>30?actor.atk:0)/7);
}

TetrisManager.HarmSystem.getSpellPower = function(actor){
	return Math.floor((actor.mat>20?(actor.atk-20):0)/5);
}

TetrisManager.HarmSystem.getCDReduction = function(actor){
	var cdr = 0;
	if(actor.mat>=20){
		cdr = 0.25*actor.mat-20;
	}
	return cdr;
}

TetrisManager.HarmSystem.getAtkEnergyRate = function(actor){
	return Math.min(1+actor.agi*0.01, 1.5);
}

TetrisManager.HarmSystem.getEvadedRate = function(actor){
	return Math.pow(1.002, actor.agi);
}

//============================================================
// 技能系统
//============================================================
function SkillManager() {
	this.initialize.apply(this, arguments);
}

SkillManager.prototype.initialize = function (skillIDList, isOwnerEnemy) {
	this.usedFirstSkill = false;
	this.running = true;
	this.isGamePadMode = Input.isControllerConnected();
	this._skill_list = [];
	this.skillButton_list = [];
	for (var i = 0; i < skillIDList.length; i++) {
		this._skill_list.push(
			Object.create(TetrisManager.skill_List[skillIDList[i]])
		);
		this._skill_list[i].index = i;
		this.skillButton_list.push(new SkillButton(skillIDList[i]));
	}

	this.isOwnerEnemy = isOwnerEnemy;

	if (!isOwnerEnemy) {
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
    }

	this._skill_board = new skillBoard(this.skillButton_list);
}

SkillManager.prototype.startSkill = function (id) {
	if(this.running){
		if (!this.usedFirstSkill) {
			this.usedFirstSkill = true;
		}
		if (this._skill_list[id] && this._skill_list[id].isPrepared && this._skill_list[id].CanUse()) {
			this.skillButton_list[id].shine();
			this._skill_list[id].MakeEffect();
			this._skill_list[id].Reset();
			this.skillButton_list[id].writeCDTxt(this._skill_list[id].CD);
		}
	}
}

SkillManager.prototype.update = function () {
	if (this.running) {
		if (!this.isOwnerEnemy) {
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

		for (var i = 0; i < this._skill_list.length; i++) {
			if (!this._skill_list[i].isPrepared) {

				if (SceneManager._scene.emphasizer_added) {
					if (!this.isPaused) {
						this.pause();
					}
				} else {
					if (this.isPaused) {
						this.continue();
					}

				}

				if (!SceneManager._scene.emphasizer_added && this._skill_list[i].beginCD) {
					this._skill_list[i].oldTime = Date.now();
					this._skill_list[i].beginCD = false;
				}

				if (!this.isPaused&& ((Date.now() - this._skill_list[i].oldTime) / 1000 > 1)) {
					this._skill_list[i].CD -= 1;
					this.skillButton_list[i].writeCDTxt(this._skill_list[i].CD);
					this._skill_list[i].oldTime = Date.now();
					if (this._skill_list[i].CD <= 0) {
						this._skill_list[i].isPrepared = true;
					}
				}
			}
		}
    }
}

SkillManager.prototype.pause = function () {
	this.isPaused = true;

}

SkillManager.prototype.continue = function () {
	for (var i = 0; i < this._skill_list.length; i++) {
		if (!this._skill_list[i].isPrepared) {
			this._skill_list[i].oldTime = Date.now();
		}
	}
	this.isPaused = false;
}

SkillManager.prototype.ban = function () {
	this.running = false;
	this._skill_board.x -= 160;
}

SkillManager.prototype.unban = function () {
	this.running = true;
	var s = new SpriteSlider(this._skill_board, this._skill_board.x, this._skill_board.y, this._skill_board.x + 160, this._skill_board.y, 60);
	SceneManager._scene.addChild(s);
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
	this._data = $gameActors.actor($gameVariables.value(32))._signedItems
	//$gameParty.allItems().filter(function (item) {
	//	return DataManager.isItem(item) && item.itypeId === 1;
	//}, this);
	this.boardIndex = 0;
	this.setIndex = 0;
	this.lastSet = -1;
	this.iconSets = [];
	this.changingIcon = false;
	this.background = new Tetris_Window(-5, -5, 155, 48);
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
			this.itemOneHotKey = ((TetrisManager.keyCodeList[String(name)])?(TetrisManager.keyCodeList[String(name)]):"");
		}
		if (Input.keyMapper[name] == 'itemtwo') {
			this.itemTwoHotKey = ((TetrisManager.keyCodeList[String(name)])?(TetrisManager.keyCodeList[String(name)]):"");
		}
		if (Input.keyMapper[name] == 'itemthree') {
			this.itemThreeHotKey = ((TetrisManager.keyCodeList[String(name)])?(TetrisManager.keyCodeList[String(name)]):"");
		}
		if (Input.keyMapper[name] == 'itemfour') {
			this.itemFourHotKey = ((TetrisManager.keyCodeList[String(name)])?(TetrisManager.keyCodeList[String(name)]):"");
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
				if(this.itemOneHotKey){
					this.Icons[i].writeHotKey(this.itemOneHotKey);
				}
				break;
			case 1:
				if(this.itemTwoHotKey){
					this.Icons[i].writeHotKey(this.itemTwoHotKey);
				}
				break;
			case 2:
				if(this.itemThreeHotKey){
					this.Icons[i].writeHotKey(this.itemThreeHotKey);
				}
				break;
			case 3:
				if(this.itemFourHotKey){
					this.Icons[i].writeHotKey(this.itemFourHotKey);
				}
				break;
		}
		this.Icons[i].move(count * 38, 0);
		this.iconSets[tempSet].addChild(this.Icons[i]);
		count += 1;
	}
	this.itemSetPosition = 1;
	this.itemBitmap1 = ImageManager.loadPicture('ui\\Item1');
	this.itemBitmap2 = ImageManager.loadPicture('ui\\Item2');
	this.itemArrow = new Sprite(this.itemBitmap1);
	this.itemArrow.move(4 * 38 + 10, 0)
	this.addChild(this.itemArrow)
	this.addChild(this.iconSets[this.setIndex]);

	this.running = true;
}

itemBoard.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.running && (SceneManager._scene.running || SceneManager._scene.emphasizer_added)) {
		if (Input.isTriggered('itemone')) {
			this.useItem(0);
		}
		if (Input.isTriggered('itemtwo')) {
			this.useItem(1);
		}
		if (Input.isTriggered('itemthree')) {
			this.useItem(2);
		}
		if (Input.isTriggered('itemfour')) {
			this.useItem(3);
		}

		if (Input.isTriggered('itemshift')) {
			this.shiftBoard();
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

}

itemBoard.prototype.shiftBoard = function(){
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
		this.changingIcon = true;

		if (this.itemSetPosition == 1) {
			this.itemArrow.bitmap = this.itemBitmap2;
			this.itemSetPosition = 2;
		} else {
			this.itemArrow.bitmap = this.itemBitmap1;
			this.itemSetPosition = 1;
		}
	}
}

itemBoard.prototype.useItem = function (id) {
	if (this.running && (SceneManager._scene.running || SceneManager._scene.emphasizer_added)) {
		id = this.boardIndex+id;
		var item = this._data[id];
		if (item && $gameParty.numItems(item) > 0) {
			SoundManager.playUseItem();
			this.user().useItem(item);
			this.applyItem(item);
			//this.checkCommonEvent();
			this.Icons[id].writeNum($gameParty.numItems(item))
			this.Icons[id].shine();
		}
	}
}

itemBoard.prototype.user = function () {
	return $gameActors.actor($gameVariables.value(32));
}

itemBoard.prototype.applyItem = function (item) {
	var id = String(item["id"]);
	if (TetrisManager.item_List[id]) {
		TetrisManager.item_List[id]();
    }
}

itemBoard.prototype.ban = function () {
	this.running = false;
	this.x -= 250;
}

itemBoard.prototype.unban = function () {
	this.running = true;
	var s = new SpriteSlider(this, this.x, this.y, this.x + 250, this.y, 60);
	this.addChild(s);
}

function itemIcon() {
	this.initialize.apply(this, arguments);
}

itemIcon.prototype = Object.create(Sprite.prototype);
itemIcon.prototype.constructor = itemIcon;

itemIcon.prototype.initialize = function (item) {
	Sprite.prototype.initialize.call(this);
	if (item) {
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
		//console.log($gameParty.numItems(item));
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;

		this.shining = false;
		this.shined = false;
	} else {
		this.iconFrame = new Sprite(ImageManager.loadPicture('ui\\ItemFrame'));
		this.addChild(this.iconFrame);
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
    }
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
	this.drawText(txt, 0, 0, 1200, "center");
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
				this.refresh();
				this.completed = true;
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

function Text_Base() {
	this.initialize.apply(this, arguments);
}

Text_Base.prototype = Object.create(Tetris_Window.prototype);
Text_Base.prototype.constructor = Text_Base;

Text_Base.prototype.initialize = function (text, width, height, size, align) {
	this.w = width;
	this.a = align;
	this.s = size;
	this.originalSize = Yanfly.Param.FontSize;
	this.rewrite(text);
	//for (var i = 0; i < texts.length; i++) {
	//	this.bitmap.drawText(texts[i], 0, i * size, width, this._height, align);
	//}
}

Text_Base.prototype.standardPadding = function() {
    return 0;
};

Text_Base.prototype.rewrite = function (text) {
	var text = DKTools.Localization.getText(text);
	var texts = text.split("\n");
	this.h = (texts.length) * (this.s * (4 / 3) * 2);
	Tetris_Window.prototype.initialize.call(this, 0, 0,  this.w, this.h);
	this.removeChildAt(0);
	this.contents.fontSize = this.s;
	Yanfly.Param.FontSize = this.s;
	this.contents.align = this.a;
	this.drawTextEx(text, 0, 0);
	Yanfly.Param.FontSize = this.originalSize;

}

Text_Base.prototype.refresh = function () {
	this.contents.clear();
}

//-----------------------------------------------------------------------------

function ShiningText() {
	this.initialize.apply(this, arguments);
}

ShiningText.prototype = Object.create(Sprite.prototype);
ShiningText.prototype.constructor = ShiningText;

ShiningText.prototype.initialize = function (text, width, height, size) {
	Sprite.prototype.initialize.call(this);
	var t = new Text_Base(text, width, height, size, 'center');
	this.bitmap = t.contents;
	//this.bitmap._smooth = true;
	//console.log(this.bitmap);
	this.layed = false;
	this.opacity = 0;
}

ShiningText.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (!this.layed) {
		this.opacity += 5;
		if (this.opacity >= 255) {
			this.layed = true;
		}
	} else {
		this.opacity -= 5;
		if (this.opacity <= 0) {
			this.layed = false;
		}
	}
}

//-----------------------------------------------------------------------------

function FloatingText(){
	this.initialize.apply(this, arguments);
}

FloatingText.prototype = Object.create(Text_Base.prototype);
FloatingText.prototype.constructor = FloatingText;

FloatingText.prototype.initialize = function (text, width, height, size) {
	Text_Base.prototype.initialize.call(this, text, width, height, size, 'left');
	this.f = new SpriteFloater(this, 5, 0.1);
	this.addChild(this.f);
	//this.layed = false;
	//this.count = 0;
}

//FloatingText.prototype.update = function () {
//	Text_Base.prototype.update.call(this);
//	if (!this.layed) {
//		this.y -= 0.1;
//		this.count += 0.1;
//		if (this.count >= 5) {
//			this.layed = true;
//		}
//	} else {
//		this.y += 0.1;
//		this.count -= 0.1;
//		if (this.count <= 0) {
//			this.layed = false;
//		}
//	}
//}

//-----------------------------------------------------------------------------

function ShiningPiece() {
	this.initialize.apply(this, arguments);
}

ShiningPiece.prototype = Object.create(Sprite.prototype);
ShiningPiece.prototype.constructor = ShiningPiece;

ShiningPiece.prototype.initialize = function (width, height) {
	Sprite.prototype.initialize.call(this);
	this.piece = new PIXI.Graphics();
	this.piece.beginFill(0xffffff);
	this.piece.drawRect(0, 0, width, height);
	this.piece.endFill();

	this.addChild(this.piece);
	this.layed = false;
	this.opacity = 0;
}

ShiningPiece.prototype.update = function () {
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
	//this._skillID = skillID;
	//this._skill = TetrisManager.skill_List[skillID];
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
	this.curTintId = null;
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
					if (this._owner.category == 'enemy') {
						this._statelist[strid].onGain(this._owner);
					} else {
						this._statelist[strid].onGain(SceneManager._scene.getPlayer());
                    }
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
			this._stateicons[strid] = null;
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
		if (this._owner.category == 'enemy') {
			this._statelist[strid].onGain(this._owner);
		} else {
			this._statelist[strid].onGain(SceneManager._scene.getPlayer());
		}
		this._statelist[strid].count += layers;
    }
}

stateBoard.prototype.clearAllStates = function () {
	for (var strid in this._statelist) {
		if (this._statelist[strid] && this._statelist[strid].type == 'in_battle') {
			var numid = Number(strid);
			this._owner._states.splice(this._owner._states.indexOf(numid), 1);
        }
	}

	if (this._owner.category == 'enemy') {
		this._owner.avatar.tint = 0xffffff;
	}
}

stateBoard.prototype.getStatePosition = function (strid) {
	if (this._stateicons[strid]) {
		return [this.x + this._stateicons[strid].x, this.y]
	} else {
		return [this.x + this.iconPos, this.y]
    }
}

stateBoard.prototype.setAvatarTint = function (numid, tint) {
	if (this._owner.category == 'enemy') {
		this._owner.avatar.tint = tint;
		this.curTintId = numid;
    }
}

stateBoard.prototype.removeAvatarTint = function (numid) {
	if (this._owner.category == 'enemy') {
		if (this.curTintId === numid) {
			this._owner.avatar.tint = 0xffffff;
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

stateBoard.prototype.onDown = function () {
	for (var strid in this._statelist) {
		if (this._statelist[strid] && this._statelist[strid].onDown) {
			this._statelist[strid].onDown();
		}
	}
}

stateBoard.prototype.onBlockChanging = function () {
	for (var strid in this._statelist) {
		if (this._statelist[strid] && this._statelist[strid].onBlockChanging) {
			this._statelist[strid].onBlockChanging();
		}
	}
}

stateBoard.prototype.onShadow = function () {
	for (var strid in this._statelist) {
		if (this._statelist[strid] && this._statelist[strid].onShadow) {
			this._statelist[strid].onShadow();
		}
	}
}

stateBoard.prototype.onEnd = function () {
	for (var strid in this._statelist) {
		if (this._statelist[strid] && this._statelist[strid].onEnd) {
			this._statelist[strid].onEnd();
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

//=============================================================================
// Gauge 构成

function Gauge_base() {
	this.initialize.apply(this, arguments);
}

Gauge_base.prototype = Object.create(Sprite.prototype);
Gauge_base.prototype.constructor = Gauge_base

Gauge_base.prototype.initialize = function (options) {
	Sprite.prototype.initialize.call(this);
	this.updateType = options.type;
	this.changeTime = TetrisManager.GaugeConstant;
	this.frameSource = options.frameSource;
	this.barSource = options.barSource;
	this.backSource = options.backSource;
	this.x = options.x;
	this.y = options.y;
	this.gwidth = options.width;
	this.gheight = options.height;
	this.cursor = 0;
	this.createBack();
	this.createContent();
	this.createFrame();

	this.curAmount = 0;
	this.displayAmount = 0;
	this.maxAmount = options.maxAmount;
	this.displayMax = options.maxAmount;
}

Gauge_base.prototype.createFrame = function () {
	var w = this.gwidth;
	var h = this.gheight;
	var m = 24;
	var bitmap = new Bitmap(w, h);

	this.frameSprite = new Sprite();
	this.frameSprite.bitmap = bitmap;
	this.frameSprite.setFrame(0, 0, w, h);
	this.addChild(this.frameSprite)
	if (w > 0 && h > 0 && this.frameSource) {
		var skin = this.frameSource;
		var q = 96
		var p = 96;
		bitmap.blt(skin, m, 0 + 0, p - m * 2, m, m, 0, w - m * 2, m);
		bitmap.blt(skin, m, 0 + q - m, p - m * 2, m, m, h - m, w - m * 2, m);
		bitmap.blt(skin, 0, 0 + m, m, p - m * 2, 0, m, m, h - m * 2);
		bitmap.blt(skin, q - m, 0 + m, m, p - m * 2, w - m, m, m, h - m * 2);
		bitmap.blt(skin, 0, 0 + 0, m, m, 0, 0, m, m);
		bitmap.blt(skin, q - m, 0 + 0, m, m, w - m, 0, m, m);
		bitmap.blt(skin, 0, 0 + q - m, m, m, 0, h - m, m, m);
		bitmap.blt(skin, q - m, 0 + q - m, m, m, w - m, h - m, m, m);
	}
}

Gauge_base.prototype.createContent = function () {
	this.contentSprite = new Sprite();
	this.contentSprite.bitmap = this.barSource;
	if (this.updateType === 'Horz') {
		this.contentSprite.move(0, 0);
		this.contentSprite.setFrame(0, 0, this.gwidth, this.gheight);
	}

	if (this.updateType === 'Vert') {
		this.contentSprite.move(0, this.gheight);
		this.contentSprite.setFrame(0, 0, this.gwidth, this.gheight);
	}
	this.addChild(this.contentSprite)
}

Gauge_base.prototype.createBack = function () {
	this.backSprite = new Sprite();
	this.backSprite.bitmap = this.backSource;
	this.backSprite.setFrame(0, 0, this.gwidth, this.gheight);
	this.addChild(this.backSprite);
}

Gauge_base.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.displayAmount != this.curAmount) {
		this.displayAmount += (this.curAmount - this.displayAmount) / this.changeTime;
	}

	if (this.displayMax != this.maxAmount) {
		this.displayMax += (this.maxAmount - this.displayMax) / this.changeTime;
	}
	var rate = (this.displayAmount / this.displayMax);
	if (rate >= 1) {
		rate = 1;
	}
	this.contentSprite.setFrame(0, 0, this.gwidth * rate, this.gheight);
	this.addChild(this.frameSprite)
}

Gauge_base.prototype.changeNumber = function (num) {
	this.curAmount = num;
}

Gauge_base.prototype.changeMax = function (max) {
	this.maxAmount = max;
}

//=============================================================================

TetrisManager.testFrame = ImageManager.loadPicture('bars/testFrame3');


function VerticalProgressBar() {
	this.initialize.apply(this, arguments);
}

VerticalProgressBar.prototype = Object.create(Sprite.prototype);
VerticalProgressBar.prototype.constructor = VerticalProgressBar;

VerticalProgressBar.prototype.initialize = function (maxAmount, options) {
	Sprite.prototype.initialize.call(this);
	this.changeTime = TetrisManager.GaugeConstant;
	this.curAmount = maxAmount;
	this.displayAmount = maxAmount;
	this.maxAmount = maxAmount;
	this.displayMax = maxAmount;
	this.BarContent = new Sprite();
	this.frame = new Sprite();
	if (options && options.content) {
		this.BarContent.bitmap = options.content;
	} else {
		this.BarContent.bitmap = ImageManager.loadPicture("ui\\BarGrad");
	}
	if (options && options.frame) {
		this.frame.bitmap = options.frame;
	} else {
		this.frame.bitmap = ImageManager.loadPicture("ui\\VerticalProgressBarFrame");
    }
	this.Ycursor = 0;
	if (options && options.maxLength) {
		this.maxLength = options.maxLength;
	} else {
		this.maxLength = 250;
	}

	if (options && options.maxWidth) {
		this.maxWidth = options.maxWidth;
	} else {
		this.maxWidth = 15;
    }
	this.cursorAmount = 2;

	this.BarContent.move(0, this.maxLength);
	this.addChild(this.BarContent);
	this.BarContent.setFrame(0, this.Ycursor, this.maxWidth, this.maxLength);
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
	this.BarContent.setFrame(0, this.Ycursor, this.maxWidth, Aheight);

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
	while (num > this.maxAmount) {
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

VerticalProgressBar.prototype.changeMax = function (max) {
	this.maxAmount = max;
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
		this.number_sprites[i].setFrame(Math.round(n * (this.number_sprites[i].bitmap.width / 10)), 0, Math.round((this.number_sprites[i].bitmap.width / 10)), this.number_sprites[i].bitmap.height)
		switch (this.ExtendDir) {
			case "left":
				this.number_sprites[i].x = Math.round((i * (this.number_sprites[i].bitmap.width / 10)) - ((numbers.length - 1) * (this.number_sprites[i].bitmap.width / 10)));
				break;
			case "right":
				this.number_sprites[i].x = Math.round(i * (this.number_sprites[i].bitmap.width / 10));
				break;
			case "mid":
				this.number_sprites[i].x = Math.round((i * (this.number_sprites[i].bitmap.width / 10)) - (((numbers.length - 1) * (this.number_sprites[i].bitmap.width / 10)) / 2));
				break;
		}
		this.number_sprites[i].tint = this.tint;
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
	this.ComboNum.x = 230;
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
	this.d = false;
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

targetMark.prototype = Object.create(SequenceAnimation.prototype);
targetMark.prototype.constructor = targetMark;

targetMark.prototype.initialize = function (target) {
	SequenceAnimation.prototype.initialize.call(this,
		{ name: "带字符//", FinalNumber: 7, framedigits: 1, initialNumber: 1, delay: 5});
	this.anchor.x = 0.5
	this.anchor.y = 0.5
	this.aim(target);
}

targetMark.prototype.update = function () {
	SequenceAnimation.prototype.update.call(this);
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
	if (TetrisManager.twoPMode) {
		this.targetX = target.dx-34
		this.targetY = target.dy
		this.targetScaleX = 0.4
		this.targetScaleY = 0.4
	} else {
		this.targetScaleX = target.scaleX;
		this.targetScaleY = target.scaleY;
		if (!target.NoAi) {
			this.targetX = target.mainwindow.x + (target.mainwindow.width - 200 * target.scaleX)/2;
			this.targetY = target.mainwindow.y + (target.mainwindow.height - 240 * target.scaleX) / 2;
		} else {
			this.targetX = target.xposition -5;
			this.targetY = target.assumeYpos-40;
        }
	}
}

//-----------------------------------------------------------------------------

function particleEmitter() {
	this.initialize.apply(this, arguments);
}

particleEmitter.prototype = Object.create(Sprite.prototype);
particleEmitter.prototype.constructor = particleEmitter;

particleEmitter.prototype.initialize = function (ID, assets) {
	Sprite.prototype.initialize.call(this);
	this.ID = ID;
	var images = []
	for (var i = 0; i < assets.length; i++) {
		images.push(PIXI.Texture.fromImage('img/pictures/Effect/' + assets[i] +'.png'));
    }
	this._emitter = new PIXI.particles.Emitter(this,
		images,
		TetrisManager.pariticleSet[ID]
	)
	this._emitter.emit = true;
	this.time = Date.now();
}

particleEmitter.prototype.update = function () {
	//Sprite.prototype.update.call(this);
	var now = Date.now();
	this._emitter.update((now - this.time) * 0.001);
	this.time = now;

	if (this.stopping) {
		if ((now - this.startStop) * 0.001>= this.stopTime) {
			this.destroy();
        }
    }
}

particleEmitter.prototype.move = function (x, y) {
	this._emitter.updateSpawnPos(x, y);
}

particleEmitter.prototype.stop = function () {
	this._emitter.emit = false;
	this.startStop = Date.now();
	this.stopTime = TetrisManager.pariticleSet[this.ID]['lifetime']['max'];
	this.stopping = true;
}

//-----------------------------------------------------------------------------

function Gauge() {
	this.initialize.apply(this, arguments);
}

Gauge.prototype = Object.create(Sprite.prototype);
Gauge.prototype.constructor = Gauge;

Gauge.prototype.initialize = function (width, height, rate, color1, color2) {
	Sprite.prototype.initialize.call(this);
	this.gradBitmap = new Bitmap(100, 100);
	//画边框
	this.gaugeFrame = new Sprite();
	this.gaugeFrame.bitmap = new Bitmap(width+5, height);
	this.gaugeFrame.bitmap.drawPolygon([
		new PIXI.Point(0, 0),
		new PIXI.Point(width, 0),
		new PIXI.Point(width-10, height),
		new PIXI.Point(0, height),
	])

	this.gaugeMask = new PIXI.Graphics();
	this.gaugeMask.beginFill(0);
	this.gaugeMask.drawPolygon([
		new PIXI.Point(0, 0),
		new PIXI.Point(width, 0),
		new PIXI.Point(width-10, height),
		new PIXI.Point(0, height),
	])
	this.gaugeMask.endFill();
	//画内容
	this.gaugeContent = new Sprite();
	this.gaugeContent.bitmap = new Bitmap(width, height);
	this.gaugeContent.bitmap.drawHorGrad(width*rate, height, color1, color2);
	this.gaugeContent.mask = this.gaugeMask;

	this.gaugeBack = new Sprite();
	this.gaugeBack.bitmap = new Bitmap(width, height);
	this.gaugeBack.bitmap.drawHorGrad(width, height, '#8A8A8A', '#FFFFFF');
	this.gaugeBack.mask = this.gaugeMask;

	this.addChild(this.gaugeBack);
	this.addChild(this.gaugeContent);
	this.addChild(this.gaugeMask);
	this.addChild(this.gaugeFrame);

	this.rate = rate;
	this.gaugeWidth = width;
	this.gaugeHeight = height;
	this.gaugeColor1 = color1;
	this.gaugeColor2 = color2;
}

Gauge.prototype.refresh = function (rate, partColor) {
	if (this.rate != rate) {
		var tw = this.gaugeWidth * rate
		var nw = this.gaugeWidth * this.rate
		if (this.rate > rate) {
			var f = new fallingPart(nw - tw, this.gaugeHeight, partColor, this.gaugeMask)
			f.x = tw
			this.addChild(f);
		}
		if (this.rate < rate) {
			var r = new risingPart(tw - nw, this.gaugeHeight, partColor, this.gaugeMask)
			r.x = nw
			this.addChild(r);
		}
		this.gaugeContent.bitmap.clear();
		this.gaugeContent.bitmap.drawHorGrad(tw, this.gaugeHeight, this.gaugeColor1, this.gaugeColor2);
		this.rate = rate;
    }
}

//-----------------------------------------------------------------------------

function fallingPart() {
	this.initialize.apply(this, arguments);
}

fallingPart.prototype = Object.create(Sprite.prototype);
fallingPart.prototype.constructor = fallingPart;

fallingPart.prototype.initialize = function (width, height, color, mask) {
	Sprite.prototype.initialize.call(this);
	this.rect = new PIXI.Graphics();
	this.rect.beginFill(color);
	this.rect.drawRect(0, 0, width, height);
	this.rect.endFill();
	this.rect.mask = mask.clone();

	this.addChild(this.rect);
	this.addChild(this.rect.mask);

	this.distance = height;
	this.disCount = 0;
}

fallingPart.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.y += 1;
	this.disCount += 1;
	if (this.disCount >= this.distance) {
		this.destroy();
    }
}

//-----------------------------------------------------------------------------

function risingPart() {
	this.initialize.apply(this, arguments);
}

risingPart.prototype = Object.create(Sprite.prototype);
risingPart.prototype.constructor = risingPart;

risingPart.prototype.initialize = function (width, height, color, mask) {
	Sprite.prototype.initialize.call(this);
	this.rect = new PIXI.Graphics();
	this.rect.beginFill(color);
	this.rect.drawRect(0, 0, width, height);
	this.rect.endFill();
	this.rect.mask = mask;
	this.addChild(this.rect);
	this.y += height
	this.distance = height;
	this.disCount = height;
}

risingPart.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.y -= 1;
	this.disCount -= 1;
	if (this.disCount <= this.distance) {
		this.destroy();
	}
}

//-----------------------------------------------------------------------------

function infoBoard() {
	this.initialize.apply(this, arguments);
}

infoBoard.prototype = Object.create(Sprite.prototype);
infoBoard.prototype.constructor = infoBoard

infoBoard.prototype.initialize = function (width, height) {
	Sprite.prototype.initialize.call(this);
	this._infoList = [];
	this._activatedInfo = [];
	this.curUpdatingInfo = null;
	this.isUpdatingInfo = false;
	this.w = width;
	this.h = height;
	this.stayTime = 180;
	this.count = 0;
}

infoBoard.prototype.update = function () {
	Sprite.prototype.initialize.call(this);
	if (!this.isUpdatingInfo && this._infoList[0]) {
		this.curUpdatingInfo = this._infoList.splice(0, 1);
	}
	if (this.isUpdatingInfo) {
		this.curUpdatingInfo.y -= 1;
		this._activatedInfo[this._activatedInfo.length-1].y -= 1;
		this.count += 1;
		if (this.count >= this.h) {
			this.count = 0;
			this.isUpdatingInfo = false;
			this._activatedInfo.push(this.curUpdatingInfo);
			this.curUpdatingInfo = null;
        }
	}

	for (var i = this._activatedInfo.length-1; i >= 0; i--) {
		if (this._activatedInfo[i - 1]) {
			this._activatedInfo[i - 1].y = this._activatedInfo[i].y - this._activatedInfo[i].height;
        }
    }
}

infoBoard.prototype.addInfo = function (text) {
	var info = new Info(text, this.w, this.h, this.stayTime);
	this.addChild(info);
	this._infoList.push(info);
}

function Info() {
	this.initialize.apply(this, arguments);
}

Info.prototype = Object.create(Sprite.prototype);
Info.prototype.constructor = Info;

Info.prototype.initialize = function (text, width, height, stayTime) {
	Sprite.prototype.initialize.call(this);
	this.back = new PIXI.Graphics()
		.beginFill(0x000000)
		.drawRect(0, 0, width, height)
		.endFill();
	this.addChild(this.back);

	this.text = new Text_Base(text, width, height, 24, "left");
	this.addChild(this.text);
	this.anchor.y = 1;
	this.count = 0;
	this.stayTime = stayTime;
}

Info.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.count
	if (this.closing) {
		this.scale.y -= 0.001;
		if (this.scale.y <= 0) {
			this.destroy();
        }
    }
}

Info.prototype.close = function () {
	this.closing = true;
}

//-----------------------------------------------------------------------------

function WindowGlow() {
	this.initialize.apply(this, arguments);
}

WindowGlow.prototype = Object.create(Sprite.prototype);
WindowGlow.prototype.constructor = WindowGlow;

WindowGlow.prototype.initialize = function (sprite) {
	Sprite.prototype.initialize.call(this);
	this.glow_sprite = sprite;
	this.addChild(this.glow_sprite);
	this.glow_sprite.opacity = 0;
	this.phaseFlag = 'increasing'
	this.timeCount = 0;
	this._frequency = 60;
}

WindowGlow.prototype.update = function () {
	Sprite.prototype.update.call(this);

	switch (this.phaseFlag) {
		case 'increasing':
			this.glow_sprite.opacity += 255 / this._frequency;
			break;
		case 'decreasing':
			this.glow_sprite.opacity -= 255 / this._frequency;
			break;
		case 'ending':
			this.glow_sprite.opacity -= 255 / this._frequency;
			if (this.glow_sprite.opacity <= 0) {
				this.destroy();
			}
			break;
	}

	if (this.timeCount > this._frequency) {
		if (this.phaseFlag != 'ending') {
			if (this.phaseFlag == 'increasing') {
				this.phaseFlag = 'decreasing'
			} else {
				this.phaseFlag = 'increasing'
			}
		}

		this.timeCount = 0;
	}


	this.timeCount += 1;
}

WindowGlow.prototype.stop = function () {
	this.phaseFlag = 'ending'
}

//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

function Tachi() {
	this.initialize.apply(this, arguments);
}

Tachi.prototype = Object.create(Sprite.prototype);
Tachi.prototype.constructor = Tachi;

Tachi.prototype.initialize = function (name) {
	Sprite.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture("Tachi/" + name);
	this.blink_sprite = new Sprite(ImageManager.loadPicture("Tachi/" + name));
}

Tachi.prototype.update = function () {
	Sprite.prototype.update.call(this);

	if (this.shakeFlag) {
		if (this.shakeCount % 4 == 0) {
			if (this.shaked) {
				this.x -= 10;
				this.shaked = false;
			} else {
				this.x += 10;
				this.shaked = true;
            }
        }
		this.shakeCount += 1;
		if (this.shakeCount >= this.shakeTime) {
			this.shakeFlag = false;
			if (this.shaked) {
				this.x -= 10;
				this.shaked = false;
            }
        }
	}

	if (this.blinkFlag) {
		this.blink_sprite.opacity += this.blink_speed;
		if (this.blink_sprite.opacity >= 255) {
			this.blink_speed = -this.blink_speed;
		}
		if (this.blink_sprite.opacity <= 0) {
			this.removeChild(this.blink_sprite);
			this.blinkFlag = false;
        }
	}

	if (this.breathingFlag) {
		if (this.inhaling) {
			this.scale.y += 0.0001;
			this.blink_sprite.scale.y += 0.0001;
			if (this.scale.y >= 1.01) {
				this.inhaling = false;
			}
		} else {
			this.scale.y -= 0.0001;
			this.blink_sprite.scale.y -= 0.0001;
			if (this.scale.y <= 1) {
				this.inhaling = true;
			}
		}
	} else {
		if (this.scale.y > 1) {
			this.scale.y -= 0.0001;
			this.blink_sprite.scale.y -= 0.0001;
        }
	}

	if (this.dyingFlag) {
		this.y += 1;
		if (this.shakeCount % 4 == 0) {
			if (this.shaked) {
				this.x -= 5;
				this.shaked = false;
			} else {
				this.x += 5;
				this.shaked = true;
			}
		}
		this.shakeCount += 1;
    }
}

Tachi.prototype.shake = function (time) {
	if (!this.shakeFlag) {
		this.shakeFlag = true;
		this.shakeCount = 0;
		this.shakeTime = time;
		this.shaked = false;
	}
}

Tachi.prototype.blink = function (color) {
	if (!this.blinkFlag) {
		this.blink_sprite.tint = color;
		this.blink_sprite.opacity = 0;
		this.blink_speed = 25;
		this.blinkFlag = true;
		this.addChild(this.blink_sprite);
	}
}

Tachi.prototype.startBreathing = function () {
	this.breathingFlag = true;
	this.inhaling = true;
}

Tachi.prototype.stopBreathing = function () {
	this.breathingFlag = false;
}

Tachi.prototype.startDying = function () {
	this.dyingFlag = true;
	this.stopBreathing();
	this.shakeFlag = true;
	this.shakeCount = 0;
	this.shaked = false;
}

//-----------------------------------------------------------------------------

function Emphasizer() {
	this.initialize.apply(this, arguments);
}

Emphasizer.prototype = Object.create(Sprite.prototype);
Emphasizer.prototype.constructor = Emphasizer;

Emphasizer.prototype.initialize = function (text, x, y, width, height, options) {
	Sprite.prototype.initialize.call(this);
	this.blackHole = new PIXI.Graphics()
		.beginFill(0x000000)
		.moveTo(0, 0)
		.lineTo(Graphics.boxWidth, 0)
		.lineTo(Graphics.boxWidth, Graphics.boxHeight)
		.lineTo(0, Graphics.boxHeight)
		.beginHole()
		.moveTo(x, y)
		.lineTo(x + width, y)
		.lineTo(x + width, y + height)
		.lineTo(x, y + height)
		.endHole()
		.endFill();
	this.addChild(this.blackHole);
	this.blackHole.alpha = 125 / 255;
	var Ftext = new FloatingText(text, 1200, 28, (options ? (options.fontSize ? options.fontSize : 24) : 24));
	Ftext.move((options ? (options.textX ? options.textX : x) : x),
		(options ? (options.textY ? options.textY : y - Ftext._height) : y - Ftext._height),
		Ftext.width,
		Ftext.height);

	this.addChild(Ftext);
	//console.log(Ftext);
	if (options && options.behaviour) {
		options.behaviour.call(this);
    }
}

//-----------------------------------------------------------------------------
/**
 * 制作移动特效的类.
 *
 * @method SpriteSlider
 * @param {Any} Sparent 需要转移的对象
 * @param {Any} StartX 起始X
 * @param {Any} StartY 起始Y
 * @param {Any} EndX 最终X
 * @param {Any} EndY 最终Y
 * @param {Any} time 转移时间（帧）
 */
function SpriteSlider() {
	this.initialize.apply(this, arguments);
}

SpriteSlider.prototype = Object.create(Sprite.prototype);
SpriteSlider.prototype.constructor = SpriteSlider;

SpriteSlider.prototype.initialize = function (Sparent, StartX, StartY, EndX, EndY, time, options) {
	Sprite.prototype.initialize.call(this);
	if (options) {
		this.dEstrucsive = options.destrucsive;
    }
	this.Sparent = Sparent
	this.Sparent.x = StartX;
	this.Sparent.y = StartY;
	this.laying_count = 0;
	this.laying_time = time;
	this.bounce_constant = 10;
	if (EndX - StartX) {
		this.nX = (EndX - StartX + this.bounce_constant) / (time - this.bounce_constant);
	} else {
		this.nX = 0;
	}
	if (EndY - StartY) {
		this.nY = (EndY - StartY + this.bounce_constant) / (time - this.bounce_constant);
	} else {
		this.nY = 0;
    }
	this._completed = false;
}

SpriteSlider.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.laying_count += 1;
	if (this.laying_count <= this.laying_time - this.bounce_constant) {
		this.Sparent.x += this.nX;
		this.Sparent.y += this.nY;
	} else {
		this.Sparent.x -= this.nX ? 1 : 0;
		this.Sparent.y -= this.nY ? 1 :0;
	}
	if (this.laying_count >= this.laying_time) {
		this.destroy();
		if (this.dEstrucsive) {
			this.Sparent.destroy();
		}
	}
}

//-----------------------------------------------------------------------------

function SpriteFloater() {
	this.initialize.apply(this, arguments);
}

SpriteFloater.prototype = Object.create(Sprite.prototype);
SpriteFloater.prototype.constructor = SpriteFloater;

SpriteFloater.prototype.initialize = function (Sparent, floatingDistance, floatingSpeed) {
	Sprite.prototype.initialize.call(this);
	this.Sparent = Sparent;
	this.floatingDistance = floatingDistance;
	this.floatingSpeed = floatingSpeed;
	this.layerd = false;
	this.count = 0
}

SpriteFloater.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (!this.layed) {
		this.Sparent.y -= this.floatingSpeed;
		this.count += this.floatingSpeed;
		if (this.count >= this.floatingDistance) {
			this.layed = true;
		}
	} else {
		this.Sparent.y += this.floatingSpeed;
		this.count -= this.floatingSpeed;
		if (this.count <= 0) {
			this.layed = false;
		}
	}
}

//-----------------------------------------------------------------------------

var TutorialManager = TutorialManager || {};

TutorialManager.TutorialID = -1;
TutorialManager.TutorialStage = 0;
TutorialManager.emphasizer_array = [];
TutorialManager.emphasizer_pointer = 0;
TutorialManager.tempSpeed = 0;

TutorialManager.update = function () {
	if (this.TutorialID == 1) {
		if ((SceneManager._scene instanceof Scene_Menu) && TutorialManager.TutorialStage == 0) {
			TutorialManager.TutorialStage = 1;
			this.nextEmphasizer();
		}
		if ((SceneManager._scene instanceof Scene_Item) && TutorialManager.TutorialStage == 1) {
			TutorialManager.TutorialStage = 2;
			this.nextEmphasizer();
		}

		if ((SceneManager._scene._itemWindow) && (SceneManager._scene._itemWindow.active)  && TutorialManager.TutorialStage == 2) {
			$gameVariables.setValue(30, 2);
			this.clearEmphasizer();
			this.reset();
        }
	}

	if (this.TutorialID == 2) {
		if ((SceneManager._scene instanceof Scene_Menu) && TutorialManager.TutorialStage == 0) {
			TutorialManager.TutorialStage = 1;
			this.nextEmphasizer();
		}
		if ((SceneManager._scene instanceof Scene_Item) && TutorialManager.TutorialStage == 1) {
			TutorialManager.TutorialStage = 2;
			this.nextEmphasizer();
		}

		if ((SceneManager._scene._itemWindow) && (SceneManager._scene._itemWindow.active) && TutorialManager.TutorialStage == 2) {
			$gameSwitches.setValue(35, false);
			this.clearEmphasizer();
			this.reset();
		}
    }

	if(this.TutorialID == 3){
		if ((SceneManager._scene instanceof Scene_Menu) && TutorialManager.TutorialStage == 0) {
			TutorialManager.TutorialStage = 1;
			this.nextEmphasizer();
		}
		if ((SceneManager._scene instanceof Scene_Skill) && TutorialManager.TutorialStage == 1) {
			TutorialManager.TutorialStage = 2;
			this.nextEmphasizer();
		}

		if ((SceneManager._scene._itemWindow) && (SceneManager._scene._itemWindow.active) && TutorialManager.TutorialStage == 2) {
			$gameSwitches.setValue(35, false);
			this.clearEmphasizer();
			this.reset();
		}
	}

}

TutorialManager.reset = function(){
	this.TutorialID = -1;
	this.TutorialStage = 0;
	this.emphasizer_array = [];
	this.emphasizer_pointer = 0;
	$gamePlayer.drill_MS_setASpeed(TutorialManager.tempSpeed);
	TutorialManager.tempSpeed = 0;
}

TutorialManager.startTutorial = function(id){
	this.TutorialID = id;
	if(this.TutorialID == 1){
		TutorialManager.addEmphasizer("{inst_items1}", 200, 200, 0, 0);
		TutorialManager.addEmphasizer("{inst_items2}", 18, 18, 204, 36, {textY: 72});
		TutorialManager.addEmphasizer("{inst_items3}", 0, 72, 800, 480, {textY: 172, textX:200});
	}
	if(this.TutorialID == 2){
		TutorialManager.addEmphasizer("{inst_equips1}", 200, 200, 0, 0);
		TutorialManager.addEmphasizer("{inst_equips2}", 18, 18, 204, 36, {textY: 72});
		TutorialManager.addEmphasizer("{inst_equips3}", 0, 72, 800, 480, {textY: 172, textX:200});
	}

	if(this.TutorialID == 3){
		TutorialManager.addEmphasizer("{inst_skills1}", 200, 200, 0, 0);
		TutorialManager.addEmphasizer("{inst_skills2}", 18, 54, 204, 36, {textY: 126});
		TutorialManager.addEmphasizer("{inst_skills3}", 0, 198, 800, 354, {textY: 172, textX:200});
	}
	TutorialManager.tempSpeed = $gamePlayer._moveSpeed;
	$gamePlayer.drill_MS_setASpeed(0);
	TutorialManager.TutorialStage = 0;
}

TutorialManager.addEmphasizer = function (text, x, y, width, height, options) {
	var emphasizer = new Emphasizer(text, x, y, width, height, options);
	this.emphasizer_array.push(emphasizer);
	if (!this.emphasizer_added) {
		SceneManager._scene.addChild(this.emphasizer_array[this.emphasizer_pointer]);
		this.emphasizer_added = true;
	}
}

TutorialManager.nextEmphasizer = function () {
	this.emphasizer_pointer++;
	if (this.emphasizer_array[this.emphasizer_pointer]) {
		SceneManager._scene.removeChild(this.emphasizer_array[this.emphasizer_pointer - 1]);
		SceneManager._scene.addChild(this.emphasizer_array[this.emphasizer_pointer]);
	} else {
		this.clearEmphasizer();
		this.emphasizer_pointer = 0;
		this.emphasizer_array = [];
		this.emphasizer_added = false;
	}
}

TutorialManager.clearEmphasizer = function () {
	SceneManager._scene.removeChild(this.emphasizer_array[this.emphasizer_pointer]);
	this.emphasizer_added = false;
	if (this.emphasizerBehaviour) {
		this.emphasizerBehaviour();
		this.emphasizerBehaviour = null;
	}

}

TutorialManager.setEmphasizerBehaviour = function (f) {
	this.emphasizerBehaviour = f;
}

TutorialManager.removeEmphasizers = function () {
	if (this.emphasizer_array[this.emphasizer_pointer]) {
		SceneManager._scene.removeChild(this.emphasizer_array[this.emphasizer_pointer]);
    }
}

TutorialManager.addEmphasizers = function () {
	if (this.emphasizer_array[this.emphasizer_pointer]) {
		SceneManager._scene.addChild(this.emphasizer_array[this.emphasizer_pointer]);
	}
}

TetrisManager.Temps.Scene_Menu_commandItem = Scene_Menu.prototype.commandItem;
Scene_Menu.prototype.commandItem = function() {
	if(TutorialManager.TutorialID==3){
		this._commandWindow.activate();
        return;
	}
    TetrisManager.Temps.Scene_Menu_commandItem.call(this);
};

TetrisManager.Temps.Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
Scene_Menu.prototype.commandPersonal = function() {
    if (TutorialManager.TutorialID == 1||TutorialManager.TutorialID == 2 || (TutorialManager.TutorialID==3&&this._commandWindow.currentSymbol()!="skill")) {
        this._commandWindow.activate();
        return;
    }
	TetrisManager.Temps.Scene_Menu_commandPersonal.call(this);
};

TetrisManager.Temps.Scene_Menu_commandFormation = Scene_Menu.prototype.commandFormation;
Scene_Menu.prototype.commandFormation = function() {
    if (TutorialManager.TutorialID == 1 || TutorialManager.TutorialID == 2 || TutorialManager.TutorialID==3){
        this._commandWindow.activate();
		return;
	}
	TetrisManager.Temps.Scene_Menu_commandFormation.call(this);
};

TetrisManager.Temps.Scene_Menu_commandOptions = Scene_Menu.prototype.commandOptions
Scene_Menu.prototype.commandOptions = function() {
    if (TutorialManager.TutorialID == 1 || TutorialManager.TutorialID == 2 || TutorialManager.TutorialID==3) {
        this._commandWindow.activate();
        return;
    }
	TetrisManager.Temps.Scene_Menu_commandOptions.call(this);
};

TetrisManager.Temps.Scene_Menu_commandSave = Scene_Menu.prototype.commandSave;
Scene_Menu.prototype.commandSave = function() {
    if (TutorialManager.TutorialID == 1 || TutorialManager.TutorialID == 2 || TutorialManager.TutorialID==3) {
        this._commandWindow.activate();
        return;
    }
    TetrisManager.Temps.Scene_Menu_commandSave.call(this);
};

TetrisManager.Temps.Scene_Menu_commandGameEnd = Scene_Menu.prototype.commandGameEnd;
Scene_Menu.prototype.commandGameEnd = function() {
    if (TutorialManager.TutorialID == 1 || TutorialManager.TutorialID == 2 || TutorialManager.TutorialID==3) {
        this._commandWindow.activate();
        return;
    }
    TetrisManager.Temps.Scene_Menu_commandGameEnd.call(this);
};

TetrisManager.Temps.Scene_Menu_popScene = Scene_Item.prototype.popScene;
Scene_Menu.prototype.popScene = function () {
    if (TutorialManager.TutorialID == 1 || TutorialManager.TutorialID == 2|| TutorialManager.TutorialID==3) {
        this._commandWindow.activate();
        return;
    }
    TetrisManager.Temps.Scene_Menu_popScene.call(this);
}
TetrisManager.Temps.Scene_Item_popScene = Scene_Item.prototype.popScene;
Scene_Item.prototype.popScene = function(){
	if (TutorialManager.TutorialID == 1 || TutorialManager.TutorialID == 2|| TutorialManager.TutorialID==3) {
        this._categoryWindow.activate();
        return;
    }
	TetrisManager.Temps.Scene_Item_popScene.call(this);
}

TetrisManager.Temps.Scene_Skill_popScene = Scene_Skill.prototype.popScene;
Scene_Skill.prototype.popScene = function(){
	if (TutorialManager.TutorialID == 1 || TutorialManager.TutorialID == 2|| TutorialManager.TutorialID==3) {
        this._skillTypeWindow.activate();
        return;
    }
	TetrisManager.Temps.Scene_Skill_popScene.call(this);
}


//-----------------------------------------------------------------------------

function ScreenMosaicEffect() {
	this.initialize.apply(this, arguments);
}

ScreenMosaicEffect.prototype = Object.create(Sprite.prototype);
ScreenMosaicEffect.prototype.constructor = ScreenMosaicEffect;

ScreenMosaicEffect.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.constant = 10;
	this.data = new Array(this.constant);
	for (var i = 0; i < this.data.length; i++) {
		this.data[i] = new Array(this.constant).fill(0);
	}
	this.w = Graphics.boxWidth / this.constant;
	this.h = Graphics.boxHeight / this.constant;
}

ScreenMosaicEffect.prototype.update = function () {
	//Sprite.prototype.update.call(this);
	this.constant -= 1;
	var rndi = Math.floor(Math.random() * this.data.length);
	var rndj = Math.floor(Math.random() * this.data[rndi].length);
	while (this.data[rndi][rndj]==1) {
		if (rndj < this.data[rndi].length-1) {
			rndj ++;
		} else {
			if (rndi < this.data.length-1) {
				rndi++;
				rndj = 0;
			} else {
				rndi = 0;
				rndj = 0;
            }
        }
	}
	this.data[rndi][rndj] = 1;
	var m = new PIXI.Graphics()
		.beginFill(0x000000)
		.drawRect(rndj * this.w, rndi * this.h, this.w, this.h)
		.endFill();
	this.addChild(m);
}

//-----------------------------------------------------------------------------

function ScoreGauge() {
	this.initialize.apply(this, arguments);
}

ScoreGauge.prototype = Object.create(Sprite.prototype);
ScoreGauge.prototype.constructor = ScoreGauge;

ScoreGauge.prototype.initialize = function (options) {
	Sprite.prototype.initialize.call(this);
	this.max = options.max;
	this.num = 0;
	this.gaugeWidth = options.width;
	this.gaugeHeight = options.height;
	this.bitmap = new Bitmap(this.gaugeWidth, this.gaugeHeight);
	this.colorpicker = new Tetris_Window(0, 0, 0, 0);
}

ScoreGauge.prototype.updateNum = function (num) {
	this.num = num;
	this.refresh();
}

ScoreGauge.prototype.updateMax = function (max) {
	this.max = max;
	this.refresh();
}

ScoreGauge.prototype.refresh = function () {
	this.bitmap.clear();
	var x = 0;
	var y = 0;
	var width = this.gaugeWidth;
	var height = this.gaugeHeight;
	var rate = this.num / this.max;
	var color1 = this.colorpicker.hpGaugeColor1();
	var color2 = this.colorpicker.hpGaugeColor2();
	var fillH = Math.floor(height * rate);
	var fillY = y + height - 2 - fillH
	this.bitmap.fillRect(x, y, width, height, this.colorpicker.gaugeBackColor1());
	this.bitmap.fillTrap(x, fillY, width, fillH, fillH, color1, color2, "|", "|");
	//if (outline) { this.bitmap.outlineTrap(x, fillY, width, height, outlineColor1, outlineColor2, "|", "|") };
}

//-----------------------------------------------------------------------------
// 目标sprite的超类

function targetPointer(){
	this.initialize.apply(this, arguments);
}

targetPointer.prototype = Object.create(Sprite.prototype);
targetPointer.prototype.constructor = targetPointer;

targetPointer.prototype.initialize = function(target){
	Sprite.prototype.initialize.call(this);
	this.w = 0;
	this.h = 0;
	if(target){
		this.aim(target);
	}
}

targetPointer.prototype.update = function(){
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

targetPointer.prototype.aim = function(target){
	this.targetScaleX = target.bitmap.width/this.w;
	this.targetScaleY = target.bitmap.height/this.h;

	this.targetX = target.x;
	this.targetY = target.y;
}

//-----------------------------------------------------------------------------

function ItemSkillPointer(){
	this.initialize.apply(this, arguments);
}

ItemSkillPointer.prototype = Object.create(targetPointer.prototype);
ItemSkillPointer.prototype.constructor = ItemSkillPointer;

ItemSkillPointer.prototype.initialize = function(){
	targetPointer.prototype.initialize.call(this);
	//console.log(1);
	this.w = 200;
	this.h = 200;
	this.button_list = ['skillone, skilltwo, skillthree, itemone, itemtwo, itemthree, itemfour']
	this.current_index = -1;
	this.bitmap = ImageManager.loadPicture("Target");
	this.iconsetNumber = SceneManager._scene._playerItemBoard.boardIndex;
	this.currentType = "skill";
	this.changeIndex(1);
}

ItemSkillPointer.prototype.update = function(){
	targetPointer.prototype.update.call(this);

	if(Input.isTriggered('pageup')){
		this.changeIndex(-1);
	}

	if(Input.isTriggered('pagedown')){
		this.changeIndex(1);
	}

	if(Input.isTriggered('chooseSkill')){
		this.changeType("skill");
	}

	if(Input.isTriggered('chooseItem')){
		this.changeType("item");
	}

	if(Input.isTriggered('ok')){
		if(SceneManager._scene.running){
			var itemManager = SceneManager._scene._playerItemBoard;
			var SkillManager = SceneManager._scene._Skill_Manager;
			switch(this.current_index){
				case 0:
					SkillManager.startSkill(0);
					break;
				case 1:
					SkillManager.startSkill(1);
					break;
				case 2:
					SkillManager.startSkill(2);
					break;
				case 3:
					itemManager.useItem(0);
					break;
				case 4:
					itemManager.useItem(1);
					break;
				case 5:
					itemManager.useItem(2);
					break;
				case 6:
					itemManager.useItem(3);
					break;
			}
		}
	}
}

ItemSkillPointer.prototype.changeIndex = function(diff){
	this.current_index+=diff;
	//console.log("diff: "+diff);
	this.changeIndexTo(this.current_index);
}


ItemSkillPointer.prototype.changeIndexTo = function(index){
	//console.log("input: "+index);
	//console.log("isSkill: "+ (this.currentType=="skill"))
	var itemManager = SceneManager._scene._playerItemBoard;
	var SkillManager = SceneManager._scene._Skill_Manager;
	this.iconsetNumber = SceneManager._scene._playerItemBoard.boardIndex;
	this.current_index = index;
	//技能的情况
	if(this.currentType == "skill"){
		//处理越界
		if(this.current_index<0){
			this.current_index = 0;
		}

		if(this.current_index>2){
			this.current_index = 2
		}

		//处理可视性
		if(!SkillManager.running){
			this.visible = false;
		}else{
			this.visible = true;
		}
		
	}else{//道具的情况
		//处理越界
		if(this.current_index<3){
			this.current_index = 3;
		}

		if(this.current_index> 6){
			itemManager.shiftBoard();
			this.current_index = 3;
		}

		//处理可视性
		if(!itemManager.running){
			this.visible = false;
		}else{
			this.visible = true;
		}
	}
	//console.log("output: "+ this.current_index);
	switch(this.current_index){
		case 0:
			if(SkillManager.skillButton_list[0]){
				this.visible = true;
				var button = SkillManager.skillButton_list[0];
				var target = {
					x: SkillManager._skill_board.x + button.x,
					y: SkillManager._skill_board.y + button.y,
					bitmap: button.bitmap
				}
				this.aim(target);
			}else{
				if(itemManager.Icons[this.iconsetNumber+0] && itemManager.running){
					//console.log("!!!!")
					this.changeType('item');
				}else{
					this.visible = false;
				}
			}
			break;
		case 1:
			if(SkillManager.skillButton_list[1]){
				var button = SkillManager.skillButton_list[1];
				var target = {
					x: SkillManager._skill_board.x + button.x,
					y: SkillManager._skill_board.y + button.y,
					bitmap: button.bitmap
				}
				this.aim(target);
			}else{
				this.changeIndex(-1);
			}
			break;
		case 2:
			if(SkillManager.skillButton_list[2]){
				var button = SkillManager.skillButton_list[2];
				var target = {
					x: SkillManager._skill_board.x + button.x,
					y: SkillManager._skill_board.y + button.y,
					bitmap: button.bitmap
				}
				this.aim(target);
			}else{
				this.changeIndex(-1);
			}
			break;
		case 3:
			if(itemManager.Icons[this.iconsetNumber+0]){
				var icon = itemManager.Icons[this.iconsetNumber+0];
				var target = {
					x: itemManager.x + icon.x,
					y: itemManager.y + icon.y,
					bitmap : new Bitmap(32, 32)
				}
				this.aim(target);
			}else{
				this.changeType("skill");
			}
			break;
		case 4:
			if(itemManager.Icons[this.iconsetNumber+1]){
				var icon = itemManager.Icons[this.iconsetNumber+1];
				var target = {
					x: itemManager.x + icon.x,
					y: itemManager.y + icon.y,
					bitmap : new Bitmap(32, 32)
				}
				this.aim(target);
			}else{
				itemManager.shiftBoard();
				this.changeIndexTo(3);
			}
			break;
		case 5:
			if(itemManager.Icons[this.iconsetNumber+2]){
				var icon = itemManager.Icons[this.iconsetNumber+2];
				var target = {
					x: itemManager.x + icon.x,
					y: itemManager.y + icon.y,
					bitmap : new Bitmap(32, 32)
				}
				this.aim(target);
			}else{
				itemManager.shiftBoard();
				this.changeIndexTo(3);
			}
			break;
		case 6:
			if(itemManager.Icons[this.iconsetNumber+3]){
				var icon = itemManager.Icons[this.iconsetNumber+3];
				var target = {
					x: itemManager.x + icon.x,
					y: itemManager.y + icon.y,
					bitmap : new Bitmap(32, 32)
				}
				this.aim(target);
			}else{
				itemManager.shiftBoard();
				this.changeIndexTo(3);
			}
			break;

	}
}

ItemSkillPointer.prototype.changeType = function(type){
	this.currentType = type;
	this.changeIndex(0);
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