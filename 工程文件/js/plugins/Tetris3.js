//=============================================================================
// Tetris.js v0.3
//=============================================================================

/*:
 * @plugindesc [v0.3] 俄罗斯方块战斗界面
 * @author 手艺人工坊 （程序： NilClass）
 * 
 * @help
 * =============================================================================
 * +++ TekokiWorkshop - Tetris.js (v0.3) +++
 * https://virtual98.com/
 * =============================================================================
 * 实现俄罗斯战斗界面的插件。
 * 目前还在测试阶段。
 */
 
//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================


//=============================================================================
// ** CODE
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
	this.enemies = enemy_List[$gameVariables.value(1)].slice();
	this.initialize_Enemy();
	this.loadKeyMapper();
	this.skinID = null;
	this.loadBlockSkin();
}

Scene_Tetris.prototype.initialize_Actor = function () {
	actor = $gameActors.actor(1)

	this.player = {
		category: "player",
		xposition: 375,
		yposition: 27,
		step: 50,
		field: new Array(this.COL-1),
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
		displayHp: actor.hp,
		Mhp: actor.mhp,
		Atk: actor.atk,
		Def: actor.def,

		AtkFreq: 10,
		delay_reset_times: 15
	}

	for (i = 0; i < this.player.field.length; i++) {
		this.player.field[i] = new Array(this.ROW).fill(0);
	}

	//this.player.field = [
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	//	[0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	//	[1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
	//	[1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	//]

	this.player.picture.bitmap = ImageManager.loadPicture("redDumpling");
}

Scene_Tetris.prototype.loadSkills = function () {
	weapon = $gameActors.actor(1).weapons()[0]
	this.skillList = [];
	this.skillList.push(skill_List[weapon['name']]);


}

Scene_Tetris.prototype.initialize_Enemy = function () {
	if (this.enemies.length > 1) {
		this.multiple = true
	}
	for (i in this.enemies) {
		this.enemies[i].curHp = this.enemies[i].Mhp;
		this.enemies[i].displayHp = this.enemies[i].curHp;
	}
}

Scene_Tetris.prototype.initializeData = function () {
	this.ROW = 10;
	this.COL = 24;
	this.running = false;
	this.gameover = false;
	this.said = false;
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

	this.generalKick = {
		"1to2": [[0, 0], [-1, 0], [-1, 1], [0, 2], [-1, 2]],
		"2to1": [[0, 0], [1, 0], [1, 1], [0, 2], [1, 2]],
		"2to3": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
		"3to2": [[0, 0], [-1, 0], [-1, 1], [0, 2], [-1, -2]],
		"3to4": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
		"4to3": [[0, 0], [-1, 0], [-1, 1], [0, 2], [-1, 2]],
		"4to1": [[0, 0], [-1, 0], [-1, 1], [0, 2], [-1, 2]],
		"1to4": [[0, 0], [1, 0], [1, 1], [0, 2], [1, 2]]
	}

	this.IKick = {
		"1to2": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, 2]],
		"2to1": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
		"2to3": [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, 1]],
		"3to2": [[0, 0], [1, 0], [-2, 1], [1, -2], [-2, -1]],
		"3to4": [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
		"4to3": [[0, 0], [-2, 0], [1, 0], [-2, 1], [1, 2]],
		"4to1": [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
		"1to4": [[0, 0], [-1, 0], [2, 1], [-1, 2], [2, -1]]
	}

	this.GeneralRuleSet = {
		'-3': [[1, 0], [1, -1]],
		'-2': [[-1, 1], [0, 1]],
		'-1': [[0, -1], [0, 0]],
		'0': [[0, 0], [-1, 0]],
		'1': [[1, 0], [1, -1]],
		'2': [[-1, 1], [0, 1]],
		'3': [[0, -1], [0, 0]]
	}

	this.IRuleSet = {
		'-3': [[2, -1], [2, -2]],
		'-2': [[-2, 2], [-1, 2]],
		'-1': [[1, -2], [1, -1]],
		'0': [[-1, 1], [-2, 1]],
		'1': [[2, -1], [2, -2]],
		'2': [[-2, 2], [-1, 2]],
		'3': [[1, -2], [1, -1]]
	}

	this.block_pics = ["o", "s", "5", "l", "t", "j", "1"];
	this.curbag = this.block_pics.slice();

	this.arr_delay = $gameVariables.value(3);
	this.das_dalay = $gameVariables.value(2);
	this.das_delay_count_right = 0;
	this.arr_delay_count_right = 0;
	this.das_delay_count_left = 0;
	this.arr_delay_count_left = 0;

	this.nextWindows = [];
	this.enemyGaugeWindows = [];

	this.lastKick = false;
	this.isWaitingCloseUp = false;
	this.holded = false;
	this.exceeded = false;
	this.merged = false;

	this.GameOverFinished = false;

	this.PopList = [];
}

Scene_Tetris.prototype.loadKeyMapper = function () {
	ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.TetrisKeyMapper))
	ConfigManager.save();
	ConfigManager.load();
}

Scene_Tetris.prototype.unloadKeyMapper = function () {
	ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.defaultMap))
	ConfigManager.applyKeyConfig();
	ConfigManager.save();
	ConfigManager.load();
}

Scene_Tetris.prototype.loadBlockSkin = function () {
	armors = $gameActors.actor(1).armors()

	for (i in armors) {
		switch (armors[i].name) {
			case "默认皮肤":
				this.skinID = "blockSkin\\default\\"
				break;
			case "经典皮肤":
				this.skinID = "blockSkin\\classic\\"
				break;
		}
	}

	if (!this.skinID) {
		this.skinID = "blockSkin\\default\\"
	}

	this.minoSkin = {
		'o': [],
		's': [],
		'5': [],
		'l': [],
		't': [],
		'j': [],
		'1': []
	}
	this.shadowSkin = {
		'o': [],
		's': [],
		'5': [],
		'l': [],
		't': [],
		'j': [],
		'1': []
	}
	this.blockSkin = {
		'o': null,
		's': null,
		'5': null,
		'l': null,
		't': null,
		'j': null,
		'1': null,
		'r': null,
	}
	for (i in this.block_pics) {
		for (j = 0; j < 4; j++) {
			if (j == 0) {
				this.minoSkin[this.block_pics[i]].push(ImageManager.loadPicture(this.skinID + this.block_pics[i]));
				this.shadowSkin[this.block_pics[i]].push(ImageManager.loadPicture(this.skinID + this.block_pics[i]+"_S"))
			} else {
				if (this.block_pics[i] == 'o') {
					// pass
				} else {
					this.minoSkin[this.block_pics[i]].push(ImageManager.loadPicture(this.skinID + this.block_pics[i] + j));
					this.shadowSkin[this.block_pics[i]].push(ImageManager.loadPicture(this.skinID + this.block_pics[i] + j+'_S'));
				}
			}
		}
		this.blockSkin[this.block_pics[i]] = ImageManager.loadPicture(this.skinID + this.block_pics[i] + 'block');
	}
	this.blockSkin['r'] = ImageManager.loadPicture(this.skinID + 'rblock');
}

Scene_Tetris.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	AudioManager.playSe(this.seBoom);
	this.startFadeIn(60, false);
}

Scene_Tetris.prototype.update = function () {
	Scene_MenuBase.prototype.update.call(this);
	$gameScreen.update();
	if (Input.isTriggered('ok')|| TouchInput.isPressed()) {
		if (this.GameOverFinished){
			this.startFadeOut(60, false);
			this.unloadKeyMapper();
			SceneManager.pop(Scene_Tetris);
		} else {
			if (!this.running && !this.gameover) {
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

	if (!this.GameOverFinished && this.gameover) {
		this.GameOverWindow.x -= 5;
		if (this.GameOverWindow.x == 900) {
			this.GameOverFinished = true;
        }
    }

	if (this.running) {
		this.update_Actor();
		this.update_Enemy();
		this.update_Animation();
		this.isGameOver();
	}
}

Scene_Tetris.prototype.isGameOver = function () {

	if (this.player.Hp <= 0 || this.exceeded) {
		AudioManager.playSe(this.seBoom);
		this.running=false;
		this.gameover=true;
		$gameSwitches.setValue(20, false);
		this.GameOverWindow = new Tetris_Window(1200, 100, 300, 100);
		this.GameOverWindow.drawText('战败！确认以退出..', 0, 0);
		this.addWindow(this.GameOverWindow);
	}
	if(this.enemies.length<=0){
		AudioManager.playSe(this.seBoom);
		this.running=false;
		this.gameover=true;
		$gameSwitches.setValue(20, true);
		this.GameOverWindow = new Tetris_Window(1200, 100, 200, 100);
		this.GameOverWindow.drawText('胜利！确认以退出..', 0, 0);
		this.addWindow(this.GameOverWindow);
	}
}

Scene_Tetris.prototype.update_Actor = function(){
	
	if (Input.isTriggered('right')){
		if(this.bMove(this.player, 1)){
			this.player.cur.block.x += this.xrange;
			this.resetCollideDelay(this.player);
			this.shadow();
			this.lastKick = false;
		}
	}

	if (Input.isPressed('right')) {
		this.das_delay_count_right += 1;
		if (this.das_delay_count_right >= this.das_dalay) {
			this.arr_delay_count_right += 1;
			if (this.arr_delay_count_right >= this.arr_delay) {
				if (this.bMove(this.player, 1)) {
					this.player.cur.block.x += this.xrange;
					this.resetCollideDelay(this.player);
					this.shadow();
					this.lastKick = false;
				}
				this.arr_delay_count_right = 0;
			}
		}
	}

	if (!Input.isPressed('right')) {
		this.das_delay_count_right = 0;
		this.arr_delay_count_right = 0;
	}
	
	if (Input.isTriggered('left')){
		if(this.bMove(this.player, -1)){
			this.player.cur.block.x -= this.xrange;
			this.resetCollideDelay(this.player);
			this.shadow();
			this.lastKick = false;
		}
	}

	if (Input.isPressed('left')) {
		this.das_delay_count_left += 1;
		if (this.das_delay_count_left >= this.das_dalay) {
			this.arr_delay_count_left += 1;
			if (this.arr_delay_count_left >= this.arr_delay) {
				if (this.bMove(this.player, -1)) {
					this.player.cur.block.x -= this.xrange;
					this.resetCollideDelay(this.player);
					this.shadow();
					this.lastKick = false;
				}
				this.arr_delay_count_left = 0;
			}
		}
	}

	if (!Input.isPressed('left')) {
		this.das_delay_count_left = 0;
		this.arr_delay_count_left = 0;
	}
	
	if (Input.isTriggered('up')){
		this.rotateBox(this.player,1);
		this.shadow();
		this.lastKick = true;
	}
	
	if (Input.isTriggered('control')){
		this.rotateBox(this.player, -1);
		this.shadow();
		this.lastKick = true;
	}
	
	if (Input.isTriggered('shift')){
		this.holdBox();
		this.shadow();
	}
	
	if (Input.isTriggered('space')){
		if (this.player.shadowImage) {
			if (this.player.cur.block.y != this.player.shadowImage.block.y) {
				this.lastKick = false;
			}
			this.player.cur.block.x = this.player.shadowImage.block.x;
			this.player.cur.block.y = this.player.shadowImage.block.y;
			this.player.n = this.player.step;
		}
	}

	if (Input.isPressed('down') & !this.collide(this.player, this.player.cur)) {
		this.player.step = 4;
	}else{
		this.player.step = 50;
	}
	
	if (this.player.cur.block.y < this.yposition){
		AudioManager.playSe(this.seBoom);
		this.running = false;
		this.gameover = true;
		$gameSwitches.setValue(20, false);
	}
	
	this.player.n += 1
	if (this.player.n >= this.player.step) {

		if (this.collide(this.player, this.player.cur)) {
			this.mergeBox(this.player);
			this.removeChild(this.player.cur.block);
			this.drawArea(this.player);
			this.player.cur = null;
			this.createBox(this.player);
			this.shadow();
			this.refreshNextWindows();
			this.holded = false;
			this.player.delay_reset_times = 15;
		} else {
			this.player.cur.block.y += this.yrange;
			this.lastKick = false;
		}

		this.player.n = 0;
	}

	if (this.player.gaugeSCORE >= this.player.AtkFreq) {
		overkill = this.player.gaugeSCORE - this.player.AtkFreq
		damage = this.player.Atk + overkill;
		if (this.multiple) {
			rnd = Math.floor(Math.random() * (this.enemies.length));
			this.AttAck(this.player, this.enemies[rnd], damage);
		} else {
			this.AttAck(this.player, this.enemies[0], damage);
		}
		this.player.gaugeSCORE = 0;
		this.drawArea(this.player);
	}
}

Scene_Tetris.prototype.update_Enemy = function () {
	// detect death
	for (i in this.enemies) {
		if(this.enemies[i].curHp<=0){
			this.removeChild(this.enemies[i].pictureBoard);
			this.removeChild(this.enemyGaugeWindows[i]);
			this.enemies.splice(i, 1);
			this.enemyGaugeWindows.splice(i, 1);
		}
	}
	
	// charge Energy
	for(i in this.enemies){
		this.enemies[i].curEng+=this.enemies[i].EngSpd;
		this.refreshEnemyMPGauge(i);
		if(this.enemies[i].curEng>=this.enemies[i].MEng){
			this.AttAck(this.enemies[i], this.player, this.enemies[i].Atk);
			this.enemies[i].curEng = 0;
			this.refreshEnemyMPGauge(i);
		}
	}
	
}

Scene_Tetris.prototype.update_Animation = function () {

	if (this.PopList.length >= 1) {
		for (i in this.PopList) {
			if (this.PopList[i].isCompleted()) {
				this.removeChild(this.PopList[i]);
				this.PopList.splice(i, 1)
            }
        }
    }

	if (this.player.displayHp > this.player.Hp) {
		this.player.displayHp -= 1;
		this.refreshPlayerGauge();
	} else if (this.player.displayHp < this.player.Hp) {
		this.player.displayHp += 1;
		this.refreshPlayerGauge();
	}

	for (i in this.enemies) {
		if (this.enemies[i].displayHp > this.enemies[i].curHp) {
			this.enemies[i].displayHp -= 1
			this.refreshEnemyHPGauge(i)
		} else if (this.enemies[i].displayHp < this.enemies[i].curHp) {
			this.enemies[i].displayHp += 1
			this.refreshEnemyHPGauge(i)
		}
	}
}

Scene_Tetris.prototype.resetCollideDelay = function (battler) {
	if (this.collide(battler, battler.cur) && battler.delay_reset_times > 0) {
		battler.n = 0;
		battler.delay_reset_times -= 1;
	}
}

Scene_Tetris.prototype.mergeBox = function(battler){
	AudioManager.playSe(this.seTick);
	box = battler.cur.box;
	len = battler.cur.box.length;
	y = Math.floor((battler.cur.block.y-battler.yposition)/this.yrange);
	x = Math.floor((battler.cur.block.x-battler.xposition)/this.xrange);

	for (i = 0; i < len; i++){
		if (i + y >= 0) {
			for (j = 0; j < box[i].length; j++) {
				if (box[i][j] !== 0 && battler.field[i + y] && battler.field[i + y][j + x] == 0) {
					battler.field[i + y][j + x] = box[i][j];
				}
			}
		} else {
			this.exceeded = true;
        }
	}	

	arr = this.isRemove(battler);
	if (arr) {
		this.merged = true;
		Tspined = this.isTspin(this.player)
		if(arr[0]){
			AudioManager.playSe(this.seBoom);
		}
		for (i = 0; i < arr.length; i++){
			battler.field.splice(arr[i], 1);
			battler.field.unshift(new Array(this.ROW).fill(0));
		}
		if (Tspined) {
			this.TspinPopup.activate();
			this.player.SCORE += Math.pow(5, arr.length);
			this.player.gaugeSCORE += Math.pow(5, arr.length);
		} else {
			this.player.SCORE += Math.pow(3, arr.length);
			this.player.gaugeSCORE += Math.pow(3, arr.length);
		}
		this.merged = false;
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

Scene_Tetris.prototype.isTspin = function (battler){

	cur = battler.cur
	if (cur.type != 't') {
		return false;
	}
	if (!this.lastKick||!this.merged) {
		return false;
	}

	rotation = battler.cur.rotation
	field = battler.field;
	x = Math.floor((cur.block.x - battler.xposition) / this.xrange);
	y = Math.floor((cur.block.y - battler.yposition) / this.yrange);

	switch (rotation) {
		case 0:
			upleftpos = [x, y + 1];
			uprightpos = [x + 2, y + 1];
			downleftpos = [x, y + 3];
			downrightpos = [x + 2, y + 3];
			break
		case 1:
			upleftpos = [x - 1, y + 1];
			uprightpos = [x + 1, y + 1];
			downleftpos = [x - 1, y + 2];
			downrightpos = [x + 1, y + 2];
			break
		case 2:
			upleftpos = [x, y];
			uprightpos = [x + 2, y];
			downleftpos = [x, y + 2];
			downrightpos = [x + 2, y + 2];
			break
		case 3:
			upleftpos = [x, y + 1];
			uprightpos = [x + 2, y + 1];
			downleftpos = [x, y + 3];
			downrightpos = [x + 2, y + 3];
			break
	}

	blockCount = 0;
	if (field[upleftpos[1]][upleftpos[0]] != 0) {
		blockCount += 1
	}
	if (field[uprightpos[1]][uprightpos[0]] != 0) {
		blockCount += 1
	}
	if (!field[downleftpos[1]] || field[downleftpos[1]][downleftpos[0]] != 0) {
		blockCount += 1
	}
	if (!field[downrightpos[1]] || field[downrightpos[1]][downrightpos[0]] != 0) {
		blockCount += 1
	}
	if (blockCount >= 3) {
		return true
	}
	return false;
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
			if (battler.field[i][j] != 0) {
				blackBlock = new Sprite();
				switch (battler.field[i][j]) {
					case 1:
						blocktype = 'o';
						break;
					case 2:
						blocktype = 's';
						break;
					case 3:
						blocktype = '5';
						break;
					case 4:
						blocktype = 'l';
						break;
					case 5:
						blocktype = 't';
						break;
					case 6:
						blocktype = 'j';
						break;
					case 7:
						blocktype = '1';
						break;
					case 10:
						blocktype = 'r';
						break;
				}
				blackBlock.bitmap = this.blockSkin[blocktype];
				blackBlock.x = j*(816/33)+8.8+0.2*j+15;
				blackBlock.y = (i)*(624/25)+5.2;
				mainWindow.addChild(blackBlock);
			}
		}
	}
	
}

Scene_Tetris.prototype.createBox = function (battler) {
	this.lastKick = false;
	if (battler.next.length == 0) {
		for (i = 0; i < 6; i++) {
			rnd = Math.floor(Math.random() * this.curbag.length);
			battler.next.push({
				block: new Sprite(),
				type: this.curbag[rnd],
				rotation: 0,
				rotationTime: 0,
				box: this.data[this.curbag[rnd]][0].slice()
			});
			battler.next[i].block.bitmap = this.minoSkin[this.curbag[rnd]][0];
			this.curbag.splice(rnd, 1);
			if (this.curbag.length <= 0) {
				this.curbag = this.block_pics.slice();
			}
			if (battler.nextWindows) {
				battler.nextWindows[i].addChild(battler.next[i].block)
			}
		}
	}

	if (!battler.cur) {
		rnd = Math.floor(Math.random() * this.curbag.length);
		battler.next.push({
			block: new Sprite(),
			type: this.curbag[rnd],
			rotation: 0,
			rotationTime:0,
			box: this.data[this.curbag[rnd]][0].slice()
		});
		battler.next[battler.next.length - 1].block.bitmap = this.minoSkin[this.curbag[rnd]][0];
		this.curbag.splice(rnd, 1);
		if (this.curbag.length <= 0) {
			this.curbag = this.block_pics.slice();
		}
		battler.cur = battler.next.shift();
		battler.cur.block.x = battler.xposition + 4*this.xrange+7;
		battler.cur.block.y = battler.yposition;

		while (this.collide(battler, battler.cur)) {
			battler.cur.block.y -= this.yrange;
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
	type = battler.cur.type;
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
					if (j + x < 0 || j + x >= battler.field[i].length || i+y>=battler.field.length || (j + x >= 0 && battler.field[i+y] && battler.field[i+y][j+x]!=0)){
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
		this.resetCollideDelay(this.player);
		type = this.player.cur.type;
		rotation = this.player.cur.rotation;
		this.removeChild(this.player.cur.block);
		this.player.cur.block.x = Finaltemp.x;
		this.player.cur.block.y = Finaltemp.y;
		this.player.cur.rotationTime = Finaltemp.rotationTime;
		this.player.cur.box = Finaltemp.box;
		if (direction == 1) {
			if (rotation + 1 <= this.data[type].length - 1) {
				this.player.cur.block.bitmap = this.minoSkin[type][rotation+1]
			} else {
				this.player.cur.block.bitmap = this.minoSkin[type][0]
			}
		} else {
			if (rotation - 1 >= 0) {
				if (rotation - 1 == 0) {
					this.player.cur.block.bitmap = this.minoSkin[type][0];
				} else {
					this.player.cur.block.bitmap = this.minoSkin[type][rotation - 1];
				}
			} else {
				if ((this.data[type].length - 1) == 0) {
					this.player.cur.block.bitmap = this.minoSkin[type][0];
				} else {
					this.player.cur.block.bitmap = this.minoSkin[type][(this.data[type].length - 1)];
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
	if ((rotation + 1) < (this.data[type].length)) {
		tempCur.box = this.data[type][rotation + 1];
		tempCur.rotation += 1;
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
		rotationTime: this.player.cur.rotationTime+direction
	}

	if (this.player.cur.type == 'o') {
		return tempBlock
	}

	if ((this.player.cur.type != '1') && (this.player.cur.type != 'o')) {
		Rule = this.GeneralRuleSet[((tempBlock.rotationTime % 4) + '')];
	}
	if ((this.player.cur.type == '1')) {
		Rule = this.IRuleSet[((tempBlock.rotationTime % 4) + '')];
	}

	if (tempBlock.rotationTime > this.player.cur.rotationTime) {
		xHow = Rule[0][0];
		yHow = Rule[0][1];
	} else {
		xHow = Rule[1][0];
		yHow = Rule[1][1];
	}
	tempBlock.x += xHow * this.xrange;
	tempBlock.y += yHow * this.yrange;

	return tempBlock;
}

Scene_Tetris.prototype.holdBox = function(){
	if (this.holded) {
		return
	}

	if(!this.player.hold){
		this.removeChild(this.player.cur.block);
		this.player.hold = {
			block: new Sprite(),
			type: this.player.cur.type,
			rotation: 0,
			rotationTime: 0,
			box: this.data[this.player.cur.type][0]
		};
		this.player.hold.block.bitmap = this.minoSkin[type][0];
		this.player.hold.block.x = this.calPositionX(this.player.hold);
		this.player.hold.block.y = 45;

		this.player.cur = null;

		this.player.holdWindow.addChild(this.player.hold.block);
		this.createBox(this.player);
		this.refreshNextWindows();
	}else{
		this.removeChild(this.player.cur.block);
		this.player.holdWindow.removeChild(this.player.hold.block);
		temp = this.player.cur;
		this.player.cur = this.player.hold;
		this.player.cur.block.x = this.player.xposition + 4 * this.xrange + 7;
		this.player.cur.block.y = this.player.yposition;

		this.player.hold = {
			block: new Sprite(),
			type: temp.type,
			rotation: 0,
			rotationTime: 0,
			box: this.data[temp.type][0]
		};
		this.player.hold.block.bitmap = this.minoSkin[type][0];
		this.player.hold.block.x = this.calPositionX(this.player.hold);
		this.player.hold.block.y = 45;

		this.addChild(this.player.cur.block);
		this.player.holdWindow.addChild(this.player.hold.block);
		this.holded = true;
	}
}

Scene_Tetris.prototype.calPositionX = function(cur){
	type = cur.type;
	rotation = cur.rotation;
	
	if(type == "o"){
		return 33;
	}
	
	if(type == "1"){
		return 11;
	}
	
	return 23;
}

Scene_Tetris.prototype.shadow = function(){
	type = this.player.cur.type;
	rotation = this.player.cur.rotation;
	if (rotation == 0) {
		bitmap = this.shadowSkin[type][0];
	}else{
		bitmap = this.shadowSkin[type][rotation];
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
		finaldamage = 3 * (damage) - 2 * (target.Def)
		if (finaldamage >= 0) {
			target.curHp -= finaldamage;
		}
		pop = new PopNumber(new FNumber(finaldamage, 7));
		this.addChild(pop)
		pop.move(target.xposition + target.width / 3, target.yposition + target.height/3)
		this.PopList.push(pop);
		pop.activate();
		this.createXYanimationWindow(1, target.xposition + target.width / 2, target.yposition + target.height / 2);
	} else {
		finaldamage = 3 * (damage) - 2 * (target.Def)
		if (finaldamage >= 0) {
			target.Hp -= finaldamage
		}
		pop = new PopNumber(new FNumber(finaldamage, 7));
		this.addChild(pop)
		pop.move(135, 350)
		this.PopList.push(pop);
		pop.activate();
		this.createXYanimationWindow(1, target.xposition - 125, target.yposition + 200);
	}
}

Scene_Tetris.prototype.addMergableTrashLine = function (number) {
	rnd = Math.floor(Math.random() * this.ROW);
	for (i = 0; i < number; i++) {
		tempLine = new Array(this.ROW).fill(10);
		tempLine[rnd] = 0;
		this.player.field.shift();
		this.player.field.push(tempLine);
	}
	this.drawArea(this.player);
}

Scene_Tetris.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);
	this.createPlayerWindows();
	this.createEnemyWindows();
	this.createBox(this.player);
	this.refreshNextWindows();
	this.drawArea(this.player);

	TspinPopup = new Sprite();
	TspinPopup.bitmap = ImageManager.loadPicture('tspin');
	this.TspinPopup = new PopNumber(TspinPopup);
	this.TspinPopup.x = this.player.xposition + 65;
	this.TspinPopup.y = this.player.yposition + 75;
	this.addChild(this.TspinPopup);
}

Scene_Tetris.prototype.createPlayerWindows = function () {
	this.holdWindow = new Tetris_Window(this.player.xposition - 132, this.player.yposition-5, 120, 100);
	this.holdWindow.drawText("hold", 14, -10);
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

	for (i = 0; i < 6; i++) {
		this.nextWindows.push(new Tetris_Window(this.player.xposition + this.ROW * this.xrange + 47, this.player.yposition - 5 + 90 * i, 120, 90));
	}
	this.player.nextWindows = this.nextWindows;
	for (i = 0; i < 6; i++) {
		this.addWindow(this.player.nextWindows[i]);
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
		this.refreshEnemyMPGauge(i);
	}
}

Scene_Tetris.prototype.refreshPlayerGauge = function(){
	this.playerGaugeBoard.contents.clear();
	rate = this.player.displayHp / this.player.Mhp;
	this.playerGaugeBoard.drawThinGauge(10, -12, 360, rate, 20, this.playerGaugeBoard.hpGaugeColor1(), this.playerGaugeBoard.hpGaugeColor2());
	this.playerGaugeBoard.drawThinGauge(10, 10, 340, 0, 10, this.playerGaugeBoard.mpGaugeColor1(), this.playerGaugeBoard.mpGaugeColor2())

	if (!this.player_hp_number) {
		this.player_hp_number = new FNumber(this.player.displayHp, 7);
		this.playerGaugeBoard.addChild(this.player_hp_number);
		this.player_hp_number.move(300, -14);
	} else {
		this.player_hp_number.change(this.player.displayHp)
	}
}

Scene_Tetris.prototype.refreshPlayerWindow = function(){
	this.removeChild(this.playerMainWindow);
	this.playerMainWindow = new Tetris_Window(this.player.xposition-15, this.player.yposition - 27, this.ROW * this.xrange + 65, this.COL * this.yrange);
	this.playerMainWindow.drawVerticalGauge(265, 10, 10, this.COL * this.yrange, this.player.gaugeSCORE / this.player.AtkFreq, this.playerMainWindow.hpGaugeColor1(), this.playerMainWindow.hpGaugeColor1());
	for (i = 0; i <= this.ROW; i++) {
		this.playerMainWindow.contents.drawLine(i * this.xrange+5, 0, i * this.xrange+5, this.COL * this.yrange-40);
	}
	for (i = 0; i <= this.COL; i++) {
		this.playerMainWindow.contents.drawLine(4, i * this.yrange - 14, this.ROW * this.yrange+4, i * this.yrange - 14);
	}
	this.addWindow(this.playerMainWindow);
}

Scene_Tetris.prototype.refreshEnemyHPGauge = function (enemyid) {
	this.enemyGaugeWindows[enemyid].contents.clear();
	rate = this.enemies[enemyid].displayHp / this.enemies[enemyid].Mhp;
	if (this.multiple) {
		barHeight = 10
	} else {
		barHeight = 20
	}
	this.enemyGaugeWindows[enemyid].drawThinGauge(0, -12, this.enemies[enemyid].width - 25, rate, barHeight, this.enemyGaugeWindows[enemyid].hpGaugeColor1(), this.enemyGaugeWindows[enemyid].hpGaugeColor1());
}

Scene_Tetris.prototype.refreshEnemyMPGauge = function(enemyid){
	this.refreshEnemyHPGauge(enemyid);
	rate = this.enemies[i].curEng/this.enemies[i].MEng
	if (this.multiple) {
		barHeight = 7
	} else {
		barHeight = 10
	}
	this.enemyGaugeWindows[enemyid].drawThinGauge(0, -2, this.enemies[enemyid].width - 25, rate, barHeight, this.enemyGaugeWindows[enemyid].mpGaugeColor1(), this.enemyGaugeWindows[enemyid].mpGaugeColor1());
}

Scene_Tetris.prototype.refreshNextWindows = function () {
	for (i in this.player.next) {
		this.player.next[i].block.x = this.calPositionX(this.player.next[i]);
		this.player.next[i].block.y = 25;
		this.player.nextWindows[i].addChild(this.player.next[i].block);
	}
}

function tetris_start() {
	SceneManager.push(Scene_Tetris);
}