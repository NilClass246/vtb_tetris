//=============================================================================
// Tekoki_Tetris.js v0.3
//=============================================================================

/*:
 * @plugindesc [v0.3] 俄罗斯方块战斗界面
 * @author 手艺人工坊 （程序： NilClass）
 * 
 * @help
 * =============================================================================
 *  ______        __              __
 * /\__  _\      /\ \            /\ \      __
 * \/_/\ \/    __\ \ \/'\     ___\ \ \/'\ /\_\
 *    \ \ \  /'__`\ \ , <    / __`\ \ , < \/\ \
 *     \ \ \/\  __/\ \ \\`\ /\ \L\ \ \ \\`\\ \ \
 *      \ \_\ \____\\ \_\ \_\ \____/\ \_\ \_\ \_\
 *       \/_/\/____/ \/_/\/_/\/___/  \/_/\/_/\/_/
 *
 *
 *  __      __                 __               __
 * /\ \  __/\ \               /\ \             /\ \
 * \ \ \/\ \ \ \    ___   _ __\ \ \/'\     ____\ \ \___     ___   _____
 *  \ \ \ \ \ \ \  / __`\/\`'__\ \ , <    /',__\\ \  _ `\  / __`\/\ '__`\
 *   \ \ \_/ \_\ \/\ \L\ \ \ \/ \ \ \\`\ /\__, `\\ \ \ \ \/\ \L\ \ \ \L\ \
 *    \ `\___x___/\ \____/\ \_\  \ \_\ \_\/\____/ \ \_\ \_\ \____/\ \ ,__/
 *    '\/__//__/  \/___/  \/_/   \/_/\/_/\/___/   \/_/\/_/\/___/  \ \ \/
 *                                                                 \ \_\
 *                                                                  \/_/
 * +++ TekokiWorkshop - Tetris.js (v0.3) +++
 * https://virtual98.com/
 * =============================================================================
 * 实现俄罗斯战斗界面的插件。
 * 目前还在测试阶段。
 * meameasuki！
 */
 
//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================


//=============================================================================
// ** CODE
//=============================================================================

var TetrisManager = TetrisManager || {};

TetrisManager.battleLabel = 'Test1'

//=============================================================================
// ** 入场特效 TODO
//=============================================================================

//=============================================================================
// ** 场景定义
//=============================================================================

//TODO: 成就系统本地化

//TODO: 滤镜兼容

//TODO: 胶囊系统

function Scene_Tetris() {
	this.initialize.apply(this, arguments);
}

Scene_Tetris.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Tetris.prototype.constructor = Scene_Tetris;

Scene_Tetris.prototype.initialize = function () {
	Scene_ItemBase.prototype.initialize.call(this);
	this.initializeData();
	this.loadKeyMapper();
	this._enemies = [];
	var enemyList = this.battleInfo.enemyList
	//var enemyList = TetrisManager.enemy_List[$gameVariables.value(1)]
	for (var i = 0; i < enemyList.length; i++) {
		this._enemies.push(Object.create(enemyList[i]));
    }
	this.initialize_Actor();
	this.initialize_Enemy();
	this.skinID = null;
	this.loadBlockSkin();
}

Scene_Tetris.prototype.initialize_Actor = function () {
	this.actor = $gameActors.actor(1)

	this.player = {
		actor: $gameActors.actor(1),
		running: true,
		category: "player",
		xposition: 382,
		yposition: 27,
		xrange: 25,
		yrange: 25,

		step: this.step,
		field: new Array(this.COL-1),
		cur: null,
		next: [],
		hold: null,
		shadowImage: null,
		n: 0,
		SCORE: 0,
		gaugeSCORE: 0,
		curbag: TetrisManager.block_pics.slice(),

		nextWindows: [],
		holdWindow: null,
		pictureBoard: new Tetris_Window(),
		picture: new Tachi('redDumpling'),

		delay_reset_times: 15,

		TargetIndex: 0,

		scaleX: 1,
		scaleY: 1,
		Count_Combos: -1,
		lastBack: false,
		gauge_pos: [],

		//属性
		displayHp: this.actor.hp,
		atk: this.actor.atk,
		def: this.actor.def,
		cri: this.actor.cri,
		eng: 0,
		meng: 100,

		AtkFreq: 10,
		AtkType: 'normal',

		Damage_mag: 1,
		Critical_mag: 1,
		Be_Damaged_mag: 1,
		Gauge_Score_mag: 1,

		lastKick: false,
		holded: false,
		merged: false,

		MovingToRight: null,
		MadeLeftInitialMove: false,
		MadeRightInitialMove: false,

		mergeTrembleCount: 0,
		rotated: false,
		pic_pos: [200, 300]
	}

	this.player.yposition -= TetrisManager.AboveLines * this.player.yrange;


	for (var i = 0; i < this.player.field.length; i++) {
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
	//]

	this.player.exceeded = false;

	this.player.removeState = function (id) {
		this.actor.removeState(id);
	}

	this.player.gold_got = 0;
	this.player.exp_got = 0;

	this.initialize_Skills();

	if ($gameVariables.value(18) == 1) {
		this.player.auto = true;
		this.player.pathGenerator = new Position_Manager();
		this.player.actionQueue = [];
	}
}

Scene_Tetris.prototype.initialize_Skills = function () {
	var skills = this.actor.skills();
	var skillnames = [] 
	for (var i = 0; i < skills.length-1; i++) {
		if (skills[i].name !== '攻击') {
			skillnames.push(skills[i].name)
        }
    }
	//this.SkillButtonOne = new SkillButton(weapon.id-1)
	this._Skill_Manager = new SkillManager(skillnames);
}

Scene_Tetris.prototype.initialize_Enemy = function () {
	for (var i in this._enemies) {
		this._enemies[i].running = true;

		this._enemies[i].curHp = this._enemies[i].Mhp;
		this._enemies[i].displayHp = this._enemies[i].curHp;
		this._enemies[i]._states = [];
		this._enemies[i].removeState = function (id) {
			this._states.splice(this._states.indexOf(id), 1);
		}
		this._enemies[i].living = true;

		this._enemies[i].yposition = this._enemies[i].assumeYpos - TetrisManager.AboveLines * this._enemies[i].yrange;
		//数据修正
		this._enemies[i].Damage_mag = 1
		this._enemies[i].Critical_mag = 1;
		this._enemies[i].Be_Damaged_mag = 1;
		if (!this._enemies[i].NoAi) {

			this._enemies[i].curEng = 0;

			this._enemies[i].curbag = TetrisManager.block_pics.slice();

			this._enemies[i].next = []
			this._enemies[i].cur = null;

			this._enemies[i].field = new Array(this.COL - 1);
			for (var j = 0; j < this._enemies[i].field.length; j++) {
				this._enemies[i].field[j] = new Array(this.ROW).fill(0);
			}

			this._enemies[i].pathGenerator = new Position_Manager();
			this._enemies[i].actionQueue = [];

			this._enemies[i].n = 0;

			this._enemies[i].Count_Combos = -1;
        }

		this._enemies[i].scaleX = this._enemies[i].xrange / this.player.xrange;
		this._enemies[i].scaleY = this._enemies[i].yrange / this.player.yrange;
		this._enemies[i].gauge_pos = [];

		if (!this._enemies[i].AtkType) {
			this._enemies[i].AtkType = 'normal'
		}

		if (this._enemies[i].manager) {
			this._enemies[i].manager.initialize();
        }

	}
}

Scene_Tetris.prototype.initializeData = function () {
	this.ROW = TetrisManager.ROW;
	this.COL = TetrisManager.COL;
	this.running = false;
	this.gameover = false;
	this.said = false;
	this.step = 50;

	this.seTick = {
		name: "Click",
		pan: 0,
		pitch: 50,
		volume: 50
	};
	this.seBoom = {
		name: "Boom",
		pan: 0,
		pitch: 50,
		volume: 50
	};
	this.arr_delay = ConfigManager.ARRDelay
	this.das_dalay = ConfigManager.DASDelay
	this.soft_drop_speed = Math.round(this.step/ConfigManager.SoftSpeed);
	this.das_delay_count_right = 0;
	this.das_delay_count_left = 0;

	this.arr_delay_count = 0;

	this.nextWindows = [];

	this.isWaitingCloseUp = false;

	this.alldead = false;
	this.ExItIng = false;

	TetrisManager.Count_Blocks = 0;
	TetrisManager.Count_Buttons = 0;
	TetrisManager.Count_Lines = 0;
	TetrisManager.Count_Tspin = 0;
	TetrisManager.curhighestCombo = 0;

	this.layed = false;
	this.FirstBegin = false;

	this.nextNumber = 6;

	this.windowTrembling = ConfigManager.Trembling;

	this.battleInfo = Object.create(TetrisManager.battle_List[TetrisManager.battleLabel]);

	this.beginFlag = true;

	this._placeActor = true;
	this._placeEnemy = true;
	this._isPaused = false;
	this.isPausedThisTurn = false;
}

Scene_Tetris.prototype.loadKeyMapper = function () {
	ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.TetrisKeyMapper))
	ConfigManager.save();
	ConfigManager.load();
	Input.gamepadMapper = Input.TetrisgamepadInput;
	//TetrisManager.twoPMode = true;
}

Scene_Tetris.prototype.unloadKeyMapper = function () {
	ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.defaultMap))
	ConfigManager.applyKeyConfig();
	ConfigManager.save();
	ConfigManager.load();
	Input.gamepadMapper = Input.defaultgamepadInput;
	TetrisManager.save();
	//TetrisManager.twoPMode = false;
}

Scene_Tetris.prototype.loadBlockSkin = function () {
	var armors = $gameActors.actor(1).armors()

	for (var i in armors) {
		switch (armors[i].name) {
			case "默认皮肤":
				this.skinID = "blockSkin\\default\\"
				this.specialID = "blockSkin\\special\\classic\\"
				break;
			case "经典皮肤":
				this.skinID = "blockSkin\\classic\\"
				this.specialID = "blockSkin\\special\\classic\\"
				break;
		}
	}

	if (!this.skinID) {
		this.skinID = "blockSkin\\default\\"
	}

	this.enemyID = "blockSkin\\enemy\\"

	this._minoSkin = {
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
		'r': null
	}

	this.enemyminoSkin = {
		'o': [],
		's': [],
		'5': [],
		'l': [],
		't': [],
		'j': [],
		'1': []
	}
	this.enemyshadowSkin = {
		'o': [],
		's': [],
		'5': [],
		'l': [],
		't': [],
		'j': [],
		'1': []
	}
	this.enemyblockSkin = {
		'o': null,
		's': null,
		'5': null,
		'l': null,
		't': null,
		'j': null,
		'1': null,
		'r': null
	}

	for (var i in TetrisManager.block_pics) {
		for (var j = 0; j < 4; j++) {
			if (j == 0) {
				this._minoSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.skinID + TetrisManager.block_pics[i]));
				this.shadowSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.skinID + TetrisManager.block_pics[i] + "_S"))
				this.enemyminoSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.enemyID + TetrisManager.block_pics[i]));
				this.enemyshadowSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.enemyID + TetrisManager.block_pics[i] + "_S"));
			} else {
				if (TetrisManager.block_pics[i] == 'o') {
					// pass
				} else {
					this._minoSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.skinID + TetrisManager.block_pics[i] + j));
					this.shadowSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.skinID + TetrisManager.block_pics[i] + j+'_S'));
					this.enemyminoSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.enemyID + TetrisManager.block_pics[i] + j));
					this.enemyshadowSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.enemyID + TetrisManager.block_pics[i] + j + '_S'));
				}
			}
		}
		this.blockSkin[TetrisManager.block_pics[i]] = ImageManager.loadPicture(this.skinID + TetrisManager.block_pics[i] + 'block');
		this.enemyblockSkin[TetrisManager.block_pics[i]] = ImageManager.loadPicture(this.enemyID + TetrisManager.block_pics[i] + 'block');
	}
	this.blockSkin['r'] = ImageManager.loadPicture(this.skinID + 'rblock');
	this.enemyblockSkin['r'] = ImageManager.loadPicture(this.enemyID + 'rblock');

	this._MergeEffect = ImageManager.loadPicture("MergeEffect");
	this._CancelEffect = ImageManager.loadPicture("CancelEffect");
}

Scene_Tetris.prototype.getSpecialSkin = function (name) {
	var bitmap = ImageManager.loadPicture(this.specialID + name);
	return bitmap
}

Scene_Tetris.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	AudioManager.playSe(this.seBoom);
	this.startFadeIn(60, false);
}

Scene_Tetris.prototype.createBackground = function () {
	Scene_MenuBase.prototype.createBackground.call(this);
}

Scene_Tetris.prototype.update = function () {
	Scene_MenuBase.prototype.update.call(this);
	if (this.beginFlag) {
		this.beginFlag = false;
		for (var i = 0; i < this._enemies.length; i++) {
			if (this._enemies[i].manager && this._enemies[i].manager.onFirstUpdate) {
				this._enemies[i].manager.onFirstUpdate();
            }
        }
    }

	if (!this.layed) {
		this.update_Player_Placement();
		this.update_Enemy_Placement();
	} else {
		if (Input.isTriggered('ok') || TouchInput.isPressed()) {
			if (this.gameover) {
				if (!this.AfterMathWindow) {
					this.createAfterMath();
				} else {
					this.endGame();
				}
			}
		}

		if (this._placeActor) {
			this.update_Player_Placement();
		}

		if (this._placeEnemy) {
			this.update_Enemy_Placement();
		}

		this.update_Animation();

		if (this.running) {
			this._Skill_Manager.update();
			this.update_Enemy();
			this._playerStateBoard.refreshStates();
			if (this.player.running) {
				if (this.player.auto) {
					this.update_auto();
				} else {
					this.update_Actor();
                }
            }
			this.isGameOver();
		}
		if (Input.isTriggered('cancel') || Input.isTriggered('menu')) {
			if (this._isPaused && !this.isPausedThisTurn) {
				this.Continue();
			}
		} 
		this.isPausedThisTurn = false;
    }
}

Scene_Tetris.prototype.update_Player_Placement = function () {
	if (this._placeActor) {
		this.player_laying_count += 1;
		if (this.player_laying_count <= this.laying_speed - 10) {
			var n = (624 + 10) / (this.laying_speed - 10)
			this.player.holdWindow.y += n;
			this.player.mainwindow.y += n;
			this.player.nextWindows.forEach(function (item) {
				item.y += n;
			})
		} else {
			this.player.holdWindow.y -= 1;
			this.player.mainwindow.y -= 1;
			this.player.nextWindows.forEach(function (item) {
				item.y -= 1;
			})
		}
		if (this.player_laying_count >= this.laying_speed) {
			this.layed = true;
			this._placeActor = false;
			if (!TetrisManager.autoStart) {
				this.StartWindow.activate();
				this.StartWindow.open();
			} else {
				this.Counter = new Counting();
				this._upperLayer.addChild(this.Counter);
			}
		}
    }
}

Scene_Tetris.prototype.update_Enemy_Placement = function () {
	if (this._placeEnemy) {
		this.enemy_laying_count += 1;
		if (this.enemy_laying_count <= this.laying_speed - 10) {
			var n = (624 + 10) / (this.laying_speed - 10)
			this._enemies.forEach(function (item) {
				if (!item.NoAi) {
					item.mainwindow.x -= n;
					item.cur.block.x -= n;
				}
				item.gaugeWindow.x -= n;
			})
		} else {
			this._enemies.forEach(function (item) {
				if (!item.NoAi) {
					item.mainwindow.x += 1;
					item.cur.block.x += 1;
				}
				item.gaugeWindow.x += 1;
			})
		}
		if (this.enemy_laying_count >= this.laying_speed) {
			this._placeEnemy = false;
			this._enemies.forEach(function (item) {
				item.running = true;
			})
		}
    }
}

Scene_Tetris.prototype.isGameOver = function () {
	if (this.actor.hp <= 0 || this.player.exceeded) {
		AudioManager.playSe(this.seBoom);
		this.running=false;
		this.gameover=true;
		$gameSwitches.setValue(20, false);
		this.say('战败！确认以退出..', 200)
	}
	if (this.alldead) {
		if (this.battleInfo.delayFinish) {
			this.battleInfo.delayFinish -= 1;
		} else {
			AudioManager.playSe(this.seBoom);
			this.running = false;
			this.gameover = true;
			$gameSwitches.setValue(20, true);
			this.say('胜利！确认以退出..', 200)
        }
	}
}

Scene_Tetris.prototype.update_Actor = function () {
	if (Input.isTriggered('cancel') || Input.isTriggered('menu')) {
		if (!this._isPaused && !this.isPausedThisTurn) {
			this.Pause();
		}
	}

	this.update_Movement(this.player);

	if (Input.isTriggered('tab')) {
		this.changeTarget();
	}

	if (Input.isTriggered('skillone')) {
		this._Skill_Manager.startSkill(0);
	}

	if (Input.isTriggered('skilltwo')) {
		this._Skill_Manager.startSkill(1);
	}

	if (Input.isTriggered('skillthree')) {
		this._Skill_Manager.startSkill(2);
	}
	
	this.player.n += 1
	if (this.player.n >= this.player.step) {

		if (TetrisManager.collide(this.player, this.player.cur)) {
			AudioManager.playSe(this.seTick)
			this.mergeBox(this.player);
			TetrisManager.Count_Blocks += 1;
			this.removeFromMainWindow(this.player, this.player.cur.block)
			this.player.cur = null;
			this.player.lastKick = false;
			this.createBox(this.player);
			this.shadow(this.player);
			this.drawArea(this.player);
			this.player.holded = false;
			this.player.delay_reset_times = 15;
		} else {
			this.player.cur.block.y += this.player.yrange;
			this.player.lastKick = false;
			this._playerStateBoard.onDown();
		}

		this.player.n = 0;
	}

	if (this.player.gaugeSCORE >= this.player.AtkFreq) {

		var overkill = this.player.gaugeSCORE - this.player.AtkFreq
		var damage = this.player.atk + overkill;
		if (this._enemies[this.player.TargetIndex]) {
			this.AttAck(this.player, this._enemies[this.player.TargetIndex], damage);
		}
		this.player.gaugeSCORE = 0;
		this.drawArea(this.player);
	}

	TetrisManager.curhighestLPM = TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60);
	TetrisManager.curhighestKPM = TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60);

	//this.ooooo += 1;
	//console.log('=============================')
	//console.log(this.ooooo)
	//console.log(this.player.mainwindow)
	//console.log('=============================')
}

Scene_Tetris.prototype.update_auto = function () {
	if (Input.isTriggered('cancel') || Input.isTriggered('menu')) {
		if (!this._isPaused && !this.isPausedThisTurn) {
			this.Pause();
		}
	}

	if (Input.isTriggered('tab')) {
		this.changeTarget();
	}

	if (Input.isTriggered('skillone')) {
		this._Skill_Manager.startSkill(0);
	}

	if (Input.isTriggered('skilltwo')) {
		this._Skill_Manager.startSkill(1);
	}

	if (Input.isTriggered('skillthree')) {
		this._Skill_Manager.startSkill(2);
	}

	this.player.n += 1
	if (this.player.n >= TetrisManager.AiSpeed) {
		this.player.n = 0;
		if (TetrisManager.collide(this.player, this.player.cur)) {
			AudioManager.playSe(this.seTick)
			this.mergeBox(this.player);
			TetrisManager.Count_Blocks += 1;
			this.removeFromMainWindow(this.player, this.player.cur.block)
			this.player.cur = null;
			this.player.lastKick = false;
			this.createBox(this.player);
			this.shadow(this.player);
			this.drawArea(this.player);
			this.player.holded = false;
			this.player.delay_reset_times = 15;
		} else {
			var nextStep = this.player.actionQueue.shift();
			switch (nextStep) {
				case 'Rotate':
					this.rotateBox(this.player, 1)
					break;
				case 'MoveLeft':
					if (this.bMove(this.player, -1)) {
						this.player.cur.block.x -= this.player.xrange;
					}
					break;
				case 'MoveRight':
					if (this.bMove(this.player, 1)) {
						this.player.cur.block.x += this.player.xrange;
					}
					break;
				case 'Drop':
					if (this.player.shadowImage) {
						this.player.cur.block.x = this.player.shadowImage.block.x;
						this.player.cur.block.y = this.player.shadowImage.block.y;
						this.player.n = this.player.step;
					}
					break;
			}
			this.shadow(this.player);
			this.player.lastKick = false;
			this._playerStateBoard.onDown();
		}
	}

	if (this.player.gaugeSCORE >= this.player.AtkFreq) {
		var overkill = this.player.gaugeSCORE - this.player.AtkFreq
		var damage = this.player.atk + overkill;
		if (this._enemies[this.player.TargetIndex]) {
			this.AttAck(this.player, this._enemies[this.player.TargetIndex], damage);
		}
		this.player.gaugeSCORE = 0;
		this.drawArea(this.player);
	}

	TetrisManager.curhighestLPM = TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60);
	TetrisManager.curhighestKPM = TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60);
}

Scene_Tetris.prototype.changeTarget = function () {
	var cursor = this.player.TargetIndex
	while (this._enemies[cursor + 1]) {
		cursor += 1;
		if (this._enemies[cursor].living) {
			this.player.TargetIndex = cursor
			this.TargetMark.aim(this._enemies[this.player.TargetIndex]);
			return;
        }
	}

	cursor = 0;
	while (cursor <= this.player.TargetIndex) {
		if (this._enemies[cursor].living) {
			this.player.TargetIndex = cursor
			this.TargetMark.aim(this._enemies[this.player.TargetIndex]);
			return;
		}
		cursor += 1;
	}

	this._blockLayer.removeChild(this.TargetMark);

}

Scene_Tetris.prototype.update_Movement = function (operator) {
	if (!Input.isPressed('left') && !Input.isPressed('right')) {
		operator.MovingToRight = null;
		this.arr_delay_count = 0;
	}

	if (!Input.isPressed('left')) {
		operator.MadeLeftInitialMove = false;
		this.das_delay_count_left = 0;
	}

	if (!Input.isPressed('right')) {
		operator.MadeRightInitialMove = false;
		this.das_delay_count_right = 0;
    }

	if (Input.isTriggered('right')) {
		TetrisManager.Count_Buttons += 1;
		operator.MovingToRight = true;
	}

	if (Input.isTriggered('left')) {
		TetrisManager.Count_Buttons += 1;
		operator.MovingToRight = false;
	}

	if (Input.isPressed('right') && !Input.isPressed('left')) {
		operator.MovingToRight = true;
	}

	if (Input.isPressed('left') && !Input.isPressed('right')) {
		operator.MovingToRight = false;
	}

	if (operator.MovingToRight !== null) {
		if (operator.MovingToRight) {
			if (!operator.MadeRightInitialMove) {
				if (this.bMove(operator, 1)) {
					operator.cur.block.x += operator.xrange;
					if (this._playerStateBoard) {
						this._playerStateBoard.onBlockChanging();
                    }
					this.resetCollideDelay(operator);
					this.shadow(operator);
					operator.lastKick = false;
					operator.MadeRightInitialMove = true;
				}
			} else {
				this.das_delay_count_right += 1;
				if (this.das_delay_count_right >= this.das_dalay) {
					if (this.arr_delay > 0) {
						this.arr_delay_count += 1;
						if (this.arr_delay_count >= this.arr_delay) {
							if (this.bMove(operator, 1)) {
								operator.cur.block.x += operator.xrange;
								if (this._playerStateBoard) {
									this._playerStateBoard.onBlockChanging();
								}
								this.resetCollideDelay(operator);
								this.shadow(operator);
								operator.lastKick = false;
							}
							this.arr_delay_count = 0;
						}
					} else {
						while (this.bMove(operator, 1)) {
							operator.cur.block.x += operator.xrange;
							if (this._playerStateBoard) {
								this._playerStateBoard.onBlockChanging();
							}
							this.resetCollideDelay(operator);
							this.shadow(operator);
							operator.lastKick = false;
						}
                    }
                }
            }
		} else {
			if (!operator.MadeLeftInitialMove) {
				if (this.bMove(operator, -1)) {
					operator.cur.block.x -= operator.xrange;
					if (this._playerStateBoard) {
						this._playerStateBoard.onBlockChanging();
					}
					this.resetCollideDelay(operator);
					this.shadow(operator);
					operator.lastKick = false;
					operator.MadeLeftInitialMove = true;
				}
			} else {
				this.das_delay_count_left += 1;
				if (this.das_delay_count_left >= this.das_dalay) {
					if (this.arr_delay > 0) {
						this.arr_delay_count += 1;
						if (this.arr_delay_count >= this.arr_delay) {
							if (this.bMove(operator, -1)) {
								operator.cur.block.x -= operator.xrange;
								if (this._playerStateBoard) {
									this._playerStateBoard.onBlockChanging();
								}
								this.resetCollideDelay(operator);
								this.shadow(operator);
								operator.lastKick = false;
							}
							this.arr_delay_count = 0;
						}
					} else {
						while (this.bMove(operator, -1)) {
							operator.cur.block.x -= operator.xrange;
							if (this._playerStateBoard) {
								this._playerStateBoard.onBlockChanging();
							}
							this.resetCollideDelay(operator);
							this.shadow(operator);
							operator.lastKick = false;
						}
					}
				}
            }
        }
    }
	//TODO: 跳舞毯适配
	//TODO: 180度旋转
	if (Input.isTriggered('up')) {
		if (!operator.cur.noRotate) {
			TetrisManager.Count_Buttons += 1;
			this.rotateBox(operator, 1);
			if (this._playerStateBoard) {
				this._playerStateBoard.onBlockChanging();
			}
			this.shadow(operator);
			operator.lastKick = true;
			this.resetCollideDelay(operator);
        }
	}

	if (Input.isTriggered('control')) {
		if (!operator.cur.noRotate) {
			TetrisManager.Count_Buttons += 1;
			this.rotateBox(operator, -1);
			if (this._playerStateBoard) {
				this._playerStateBoard.onBlockChanging();
			}
			this.shadow(operator);
			operator.lastKick = true;
			this.resetCollideDelay(operator);
        }
	}

	if (Input.isTriggered('shift')) {
		this.holdBox(this.player);
		if (this._playerStateBoard) {
			this._playerStateBoard.onBlockChanging();
		}
		this.shadow(operator);
	}

	if (Input.isTriggered('space')) {
		if (operator.shadowImage) {
			operator.cur.block.x = operator.shadowImage.block.x;
			operator.cur.block.y = operator.shadowImage.block.y;
			operator.n = operator.step;
			if (this._playerStateBoard) {
				this._playerStateBoard.onBlockChanging();
			}
		}
	}

	if (Input.isPressed('down') & !TetrisManager.collide(operator, operator.cur)) {
		if (this.soft_drop_speed <= 0) {
			if ((operator.cur.block.x !== operator.shadowImage.block.x) || (operator.cur.block.y !== operator.shadowImage.block.y)) {
				operator.cur.block.x = operator.shadowImage.block.x;
				operator.cur.block.y = operator.shadowImage.block.y;
				if (this._playerStateBoard) {
					this._playerStateBoard.onBlockChanging();
                }
				this.resetCollideDelay(operator);
			}
		} else {
			operator.step = this.soft_drop_speed;
		}
	} else {
		operator.step = this.step;
	}
}

Scene_Tetris.prototype.findRNGEnemy = function () {
	var rnd = Math.floor(Math.random() * (this._enemies.length));
	if (this._enemies[rnd].living) {
		return rnd
	} else {
		return this.findRNGEnemy();
    }
}

Scene_Tetris.prototype.update_Enemy = function () {
	this.alldead = true;
	for (var i = 0; i < this._enemies.length; i++) {
		var CurEnemy = this._enemies[i]
		if ((CurEnemy.manager && CurEnemy.living) || (CurEnemy.manager && CurEnemy.updateAfterDeath)) {
			CurEnemy.manager.update();
		}
		if (CurEnemy.living) {
			this.alldead = false;
			if (CurEnemy.running) {
				CurEnemy.StateBoard.refreshStates();
				if (!CurEnemy.NoAi) {
					if (CurEnemy.curEng >= CurEnemy.MEng) {
						this.AttAck(CurEnemy, this.player, CurEnemy.atk);
						CurEnemy.curEng = 0;
						this.drawArea(CurEnemy);
					}

					if (TetrisManager.collide(CurEnemy, CurEnemy.cur)) {
						this.mergeBox(CurEnemy);
						this._blockLayer.removeChild(CurEnemy.cur.block);
						this.drawArea(CurEnemy);
						CurEnemy.cur = null;
						this.createBox(CurEnemy);
						this.shadow(CurEnemy);
					}

					CurEnemy.n += 1;
					if (CurEnemy.n >= TetrisManager.AiSpeed) {
						var nextStep = CurEnemy.actionQueue.shift();
						switch (nextStep) {
							case 'Rotate':
								this.rotateBox(CurEnemy, 1)
								break;
							case 'MoveLeft':
								if (this.bMove(CurEnemy, -1)) {
									CurEnemy.cur.block.x -= CurEnemy.xrange;
								}
								break;
							case 'MoveRight':
								if (this.bMove(CurEnemy, 1)) {
									CurEnemy.cur.block.x += CurEnemy.xrange;
								}
								break;
							case 'Drop':
								if (CurEnemy.shadowImage) {
									CurEnemy.cur.block.x = CurEnemy.shadowImage.block.x;
									CurEnemy.cur.block.y = CurEnemy.shadowImage.block.y;
								}
								break;
						}
						this.shadow(CurEnemy)
						CurEnemy.n = 0;
					}
                }
            }

			if (CurEnemy.curHp <= 0) {
				CurEnemy.living = false;
				this.player.gold_got += CurEnemy.Gold;
				this.player.exp_got += CurEnemy.Exp;
			}
        }
	}
}

Scene_Tetris.prototype.update_Animation = function () {
	this.player.displayHp += (this.actor.hp - this.player.displayHp) / TetrisManager.GaugeConstant;
	this.refreshPlayerGauge();

	for (var i in this._enemies) {
		this._enemies[i].displayHp += (this._enemies[i].curHp - this._enemies[i].displayHp) / TetrisManager.GaugeConstant;
		this.refreshEnemyHPGauge(i)
	}
	if (this.windowTrembling) {
		if (this.player.mergeDownTrembling) {
			this.player.mainwindow.y += 1;
			this.player.mergeTrembleCount += 1;
			if (this.player.mergeTrembleCount >= 5) {
				this.player.mergeDownTrembling = false;
				this.player.mergeUpTrembling = true;
			}
		}

		if (this.player.mergeUpTrembling) {
			this.player.mainwindow.y -= 1;
			this.player.mergeTrembleCount -= 1;
			if (this.player.mergeTrembleCount <= 0) {
				this.player.mergeUpTrembling = false;
			}
		}
    }

}

Scene_Tetris.prototype.resetCollideDelay = function (operator) {
	if (TetrisManager.collide(operator, operator.cur) && operator.delay_reset_times > 0) {
		operator.n = 0;
		operator.delay_reset_times -= 1;
	}
}

Scene_Tetris.prototype.mergeBox = function(operator){
	var box = operator.cur.box;
	var len = operator.cur.box.length;
	var y = this.getPosY(operator)
	var x = this.getPosX(operator)

	if (operator.category == 'player' && !operator.mergeDownTrembling && !operator.mergeUpTrembling) {
		operator.mergeDownTrembling = true;
    }

	for (var i = 0; i < len; i++){
		if (i + y >= 0) {
			for (var j = 0; j < box[i].length; j++) {
				if (box[i][j] !== 0) {

					if (i + y + 1 >= operator.field.length || (i + y + 1 < operator.field.length && operator.field[i + y + 1][j + x] !== 0)) {
						//添加合并特效
						var MergeX = (j + x) * operator.xrange + TetrisManager.Xrevision
							//+ 7 * operator.scaleX;
						var MergeY = (i + y - TetrisManager.AboveLines + 1) * operator.yrange
							- 4 * operator.yrange + (3 + (-operator.yrange + 25));
						var Merging = new MergeEffect(this._MergeEffect);
						Merging.scale.x = operator.scaleX;
						Merging.scale.y = operator.scaleY;
						Merging.move(MergeX, MergeY);
						this.addEffect(operator, Merging);
					}
					if (operator.field[i + y] && operator.field[i + y][j + x] == 0) {
						operator.field[i + y][j + x] = box[i][j];
					}

					if (i + y < TetrisManager.AboveLines) {
						operator.exceeded = true;
					} else {
						operator.exceeded = false;
					}
				}
			}
		}
	}	

	var arr = this.isRemove(operator);
	if (arr) {
		if (operator.category == "player") {
			operator.merged = true;
			var Tspined = false;
			if (arr[0]) {
				//提升能量
				this.player.eng += 3;
				//提升Combo
				operator.Count_Combos += 1;
				Tspined = this.isTspin(operator)
				AudioManager.playSe(this.seBoom);
				if (operator.Count_Combos > TetrisManager.curhighestCombo) {
					TetrisManager.curhighestCombo = operator.Count_Combos;
                }
			} else {
				operator.Count_Combos = -1;
			}
			this.refreshCombo(operator);
			for (var i = 0; i < arr.length; i++) {
				operator.field.splice(arr[i], 1);
				operator.field.unshift(new Array(this.ROW).fill(0));
				TetrisManager.Count_Lines += 1;
				//添加消除特效
				var CancelX = TetrisManager.Xrevision
					//+ 7 * operator.scaleX;
				var CancelY = (arr[i] - 1 - TetrisManager.AboveLines + 1) * operator.yrange
					+ (3 + (-operator.yrange + 25));
				var Cancelling = new MergeEffect(this._CancelEffect);
				Cancelling.scale.x = operator.scaleX;
				Cancelling.scale.y = operator.scaleY;
				Cancelling.move(CancelX, CancelY);
				this.addEffect(operator, Cancelling)
			}
			//Tspin加分
			if (Tspined) {
				var TspinPopup = new Sprite();
				TspinPopup.bitmap = ImageManager.loadPicture('tspin');
				operator.TspinPopup = new PopNumber(TspinPopup);
				operator.TspinPopup.x = operator.xposition + 65;
				operator.TspinPopup.y = operator.yposition + TetrisManager.AboveLines * operator.yrange + 75;
				this._blockLayer.addChild(operator.TspinPopup);
				operator.TspinPopup.activate();
				var tempScore = Math.pow(5, arr.length);
				TetrisManager.Count_Tspin += 1;
			} else {
				var tempScore = Math.pow(3, arr.length);
			}
			//Combo加分
			if (operator.Count_Combos > 0) {
				tempScore = tempScore * (operator.Count_Combos+1);
			}
			//B2B加分
			if (arr[0]) {
				if (Tspined || arr.length >= 4) {
					if (operator.lastBack) {
						var b2bPopup = new Sprite();
						b2bPopup.bitmap = ImageManager.loadPicture('b2b');
						operator.b2bPopup = new PopNumber(b2bPopup);
						operator.b2bPopup.x = operator.xposition + 64;
						operator.b2bPopup.y = operator.yposition + TetrisManager.AboveLines * operator.yrange + 125;
						this._blockLayer.addChild(operator.b2bPopup);
						operator.b2bPopup.activate();
						tempScore = tempScore * 2;
					}
					operator.lastBack = true
				} else {
					operator.lastBack = false
				}
			}
			//加入分数
			operator.SCORE += tempScore;
			operator.gaugeSCORE += tempScore* operator.Gauge_Score_mag;
			this.refreshScoreBoard(operator);
			var tempPopScore = new FNumber(tempScore, 12);
			tempPopScore.changeDirection('left');
			var popScore = new PopNumber(tempPopScore);
			this._blockLayer.addChild(popScore);
			popScore.move(operator.xposition + this.ROW * operator.xrange, (this.COL - TetrisManager.AboveLines) * operator.yrange - 15);
			popScore.activate();
			operator.merged = false;
		} else {
			if (arr[0]) {
				operator.Count_Combos += 1;
			} else {
				operator.Count_Combos = -1;
			}
			this.refreshCombo(operator);
			for (var i = 0; i < arr.length; i++) {
				operator.field.splice(arr[i], 1);
				operator.field.unshift(new Array(this.ROW).fill(0));
				var CancelX = operator.xposition;
				var CancelY = (arr[i] - 1) * operator.yrange + operator.yposition;
				var Cancelling = new MergeEffect(this._CancelEffect);
				Cancelling.scale.x = operator.scaleX;
				Cancelling.scale.y = operator.scaleY;
				Cancelling.move(CancelX, CancelY);
				this._blockLayer.addChild(Cancelling)
			}
			var tempScore = Math.pow(operator.EngSpd, arr.length)
			if (operator.Count_Combos > 0) {
				tempScore = tempScore * (operator.Count_Combos + 1);
			}
			operator.curEng += tempScore;
        }
	};

	//TODO: 加入敌人Tspin
}

Scene_Tetris.prototype.isRemove = function(operator){
	var arr = [];
	for(var i=0; i<operator.field.length; i++){
		var remove = true;
		for(var j=0; j<operator.field[i].length; j++){
			if(operator.field[i][j] == 0){
				remove = false;
			}
		}
		if(remove){
			arr.push(i);
		}
	}
	return arr;
}

Scene_Tetris.prototype.isTspin = function (operator){

	var cur = operator.cur
	if (cur.type != 't') {
		return false;
	}
	if (!operator.lastKick || !operator.merged) {
		return false;
	}

	var rotation = operator.cur.rotation
	var field = operator.field;
	var x = this.getPosX(operator);
	var y = this.getPosY(operator);

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

	var blockCount = 0;
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

Scene_Tetris.prototype.drawArea = function (operator) {
	if (operator.category == "player") {
		this.refreshPlayerWindow(operator);
		var blockSkin = this.blockSkin;
	} else {
		this.refreshEnemyWindow(operator);
		var blockSkin = this.enemyblockSkin;
	}

	operator.mainwindow.removeChild(operator.effectLayer);
	for(var i in operator.field){
		for(var j in operator.field[i]){
			if (operator.field[i][j] != 0) {
				var blackBlock = new Sprite();
				switch (operator.field[i][j]) {
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
				blackBlock.bitmap = blockSkin[blocktype];
				blackBlock.scale.x = operator.scaleX;
				blackBlock.scale.y = operator.scaleY;
				blackBlock.x = j * operator.xrange + TetrisManager.Xrevision
					//battler.xrange + (-battler.xrange + 25) - 2;
				//j * (816 / 33) + 8.8 + 0.2 * j + 15;
				blackBlock.y = (i - TetrisManager.AboveLines) * operator.yrange + 3 + (-operator.yrange + 25);
					//(i) * (624 / 25) + 5.2;
				this.addToMainWindow(operator, blackBlock);
			}
		}
	}
	operator.mainwindow.addChild(operator.effectLayer);
}

Scene_Tetris.prototype.createBox = function (battler) {
	if (battler.category == "player") {
		var minoSkin = this._minoSkin;
	} else {
		var minoSkin = this.enemyminoSkin;
    }

	if (battler.next.length == 0) {
		for (var i = 0; i < this.nextNumber; i++) {
			var rnd = Math.floor(Math.random() * battler.curbag.length);
			battler.next.push({
				block: new Sprite(),
				type: battler.curbag[rnd],
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.data[battler.curbag[rnd]][0].slice()
			});
			battler.next[i].block.bitmap = minoSkin[battler.curbag[rnd]][0];
			battler.next[i].block.scale.x = battler.scaleX;
			battler.next[i].block.scale.y = battler.scaleY;
			battler.curbag.splice(rnd, 1);
			if (battler.curbag.length <= 0) {
				battler.curbag = TetrisManager.block_pics.slice();
			}
		}
		this.refreshNextWindows(battler);
	}

	if (!battler.cur) {
		var rnd = Math.floor(Math.random() * battler.curbag.length);
		battler.next.push({
			block: new Sprite(),
			type: battler.curbag[rnd],
			rotation: 0,
			rotationTime:0,
			box: TetrisManager.data[battler.curbag[rnd]][0].slice()
		});
		battler.next[battler.next.length - 1].block.bitmap = minoSkin[battler.curbag[rnd]][0];
		battler.next[battler.next.length - 1].block.scale.x = battler.scaleX;
		battler.next[battler.next.length - 1].block.scale.y = battler.scaleY;
		battler.curbag.splice(rnd, 1);
		if (battler.curbag.length <= 0) {
			battler.curbag = TetrisManager.block_pics.slice();
		}
		battler.cur = battler.next.shift();

		
		this.addBox(battler, battler.cur);
		if (battler.category == 'enemy'|| battler.auto) {
			battler.pathGenerator.inputData(battler.field, battler.cur);
			battler.actionQueue = battler.pathGenerator.render_ActionQueue();
		}
		this.refreshNextWindows(battler);
	}
}

Scene_Tetris.prototype.addBox = function (battler, cur) {
	if (cur.renderPos) {
		cur.block.x = cur.renderPos * battler.xrange + TetrisManager.Xrevision;
	} else {
		if (cur.type == "o") {
			cur.block.x = (TetrisManager.blockInitalPos + 1) * battler.xrange + TetrisManager.Xrevision;
			//+ 7;
		} else {
			cur.block.x = TetrisManager.blockInitalPos * battler.xrange + TetrisManager.Xrevision;
			//+ 7;
		}
    }
	cur.block.y = battler.yrange+3 + (-battler.yrange + 25);


	while (TetrisManager.collide(battler, cur)) {
		cur.block.y -= battler.yrange;
	}

	while (this.isOverlapped(battler)) {
		cur.block.y -= battler.yrange;
	}

	//this._blockLayer.addChild(cur.block)
	this.addToMainWindow(battler, cur.block);
}

Scene_Tetris.prototype.isOverlapped = function (battler) {
	var box = battler.cur.box;
	var len = battler.cur.box.length;
	var y = this.getPosY(battler);
	var x = this.getPosX(battler);

	for (var i = 0; i < len; i++) {
		if (i + y >= 0) {
			for (var j = 0; j < box[i].length; j++) {
				if (box[i][j] !== 0) {
					if (battler.field[i + y][j + x] !== 0) {
						return true;
                    }
				}
			}
		}
	}
	return false;
}

Scene_Tetris.prototype.bMove = function(battler, n){
	var cur = battler.cur;
	var x = this.getPosX(battler) + n;
	var y = this.getPosY(battler) ;
	for(var i=0; i<battler.cur.box.length; i++){
		for(var j=0; j<battler.cur.box[i].length; j++){
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

	var Finaltemp = TetrisManager.getRotationResult(battler, direction);
	if (Finaltemp) {
		if (battler.category == "player") {
			var minoSkin = this._minoSkin;
		} else {
			var minoSkin = this.enemyminoSkin;
        }
		this.resetCollideDelay(battler);
		var type = battler.cur.type;
		var rotation = battler.cur.rotation;
		//this._blockLayer.removeChild(battler.cur.block);
		battler.cur.block.x = Finaltemp.x;
		battler.cur.block.y = Finaltemp.y;
		battler.cur.rotationTime = Finaltemp.rotationTime;
		battler.cur.box = Finaltemp.box;
		if (TetrisManager.block_pics.contains(type)) {
			if (direction == 1) {
				if (rotation + 1 <= TetrisManager.data[type].length - 1) {
					battler.cur.block.bitmap = minoSkin[type][rotation + 1]
				} else {
					battler.cur.block.bitmap = minoSkin[type][0]
				}
			} else {
				if (rotation - 1 >= 0) {
					if (rotation - 1 == 0) {
						battler.cur.block.bitmap = minoSkin[type][0];
					} else {
						battler.cur.block.bitmap = minoSkin[type][rotation - 1];
					}
				} else {
					if ((TetrisManager.data[type].length - 1) == 0) {
						battler.cur.block.bitmap = minoSkin[type][0];
					} else {
						battler.cur.block.bitmap = minoSkin[type][(TetrisManager.data[type].length - 1)];
					}
				}
			}
		} else {
			if (direction == 1) {
				if (rotation + 1 <= TetrisManager.specialBlockData[type].length - 1) {
					battler.cur.block.bitmap = this.getSpecialSkin(type + (rotation + 1));
				} else {
					battler.cur.block.bitmap = this.getSpecialSkin(type);
				}
			} else {
				if (rotation - 1 >= 0) {
					if (rotation - 1 == 0) {
						battler.cur.block.bitmap = this.getSpecialSkin(type);
					} else {
						battler.cur.block.bitmap = this.getSpecialSkin(type + (rotation - 1));
					}
				} else {
					if ((TetrisManager.specialBlockData[type].length - 1) == 0) {
						battler.cur.block.bitmap = this.getSpecialSkin(type);
					} else {
						battler.cur.block.bitmap = this.getSpecialSkin(type + (TetrisManager.specialBlockData[type].length - 1))
					}
				}
			}
        }
		battler.cur.rotation = Finaltemp.rotation;
		//this._blockLayer.addChild(battler.cur.block)
		battler.rotated = true;
		this.addToMainWindow(battler, battler.cur.block);
	}
	

}
//TODO: 更新一下Tekoki_Puzzle
Scene_Tetris.prototype.holdBox = function(operator){
	if (operator.holded) {
		return
	}
	operator.justHold = true;
	if (!operator.hold) {
		operator.holded = true;
		this.removeFromMainWindow(operator, operator.cur.block)
		var type = operator.cur.type;
		if (TetrisManager.block_pics.indexOf(type) < 0) {
			operator.hold = {
				block: new Sprite(),
				type: type,
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.specialBlockData[type][0]
			};
			operator.hold.block.bitmap = ImageManager.loadPicture('blockSkin/special/classic/' + type);
		} else {
			operator.hold = {
				block: new Sprite(),
				type: type,
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.data[type][0]
			};
			operator.hold.block.bitmap = this._minoSkin[type][0];
		}
		operator.hold.block.x = this.calPositionX(operator.hold);
		operator.hold.block.y = 45;

		operator.cur = null;

		operator.holdWindow.addChild(operator.hold.block);
		this.createBox(operator);
		this.refreshNextWindows(operator);
	} else {
		operator.holded = true;
		this.removeFromMainWindow(operator, operator.cur.block)
		operator.holdWindow.removeChild(operator.hold.block)
		var type = operator.cur.type;
		operator.cur = operator.hold;
		if (TetrisManager.block_pics.indexOf(type) < 0) {
			operator.hold = {
				block: new Sprite(),
				type: type,
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.specialBlockData[type][0]
			};
			operator.hold.block.bitmap = ImageManager.loadPicture('blockSkin/special/classic/'+type);
		} else {
			operator.hold = {
				block: new Sprite(),
				type: type,
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.data[type][0]
			};
			operator.hold.block.bitmap = this._minoSkin[type][0];
        }
		operator.hold.block.x = this.calPositionX(operator.hold);
		operator.hold.block.y = 45;

		this.addBox(operator, operator.cur);
		operator.holdWindow.addChild(operator.hold.block)
	}
}

Scene_Tetris.prototype.calPositionX = function(cur){
	var type = cur.type;
	
	if(type == "o"){
		return 33;
	}
	
	if(type == "1"){
		return 11;
	}
	
	return 23;
}

Scene_Tetris.prototype.shadow = function(battler){
	var type = battler.cur.type;
	var rotation = battler.cur.rotation;

	if (battler.category == "player") {
		var shadowSkin = this.shadowSkin;
	} else {
		var shadowSkin = this.enemyshadowSkin;
    }
	if (TetrisManager.block_pics.indexOf(type) < 0) {
		if (rotation > 0) {
			var bitmap = this.getSpecialSkin(type + rotation + '_s');
		} else {
			var bitmap = this.getSpecialSkin(type + '_s');
        }
	} else {
		var bitmap = shadowSkin[type][rotation];
    }
	//if (rotation == 0) {
	//	var bitmap = shadowSkin[type][0];
	//}else{
	//	var bitmap = shadowSkin[type][rotation];
	//	}
	var x = battler.cur.block.x;
	var y = battler.cur.block.y;
	
	if (battler.shadowImage) {
		this.removeFromMainWindow(battler, battler.shadowImage.block)
	}
	
	battler.shadowImage = {
		block: new Sprite(),
		box: battler.cur.box.slice()
	}
	
	battler.shadowImage.block.bitmap = bitmap;
	battler.shadowImage.block.scale.x = battler.scaleX;
	battler.shadowImage.block.scale.y = battler.scaleY;
	battler.shadowImage.block.x = x;
	battler.shadowImage.block.y = y;
	//console.log('x:'+battler.shadowImage.block.x);
	//console.log('y:' +battler.shadowImage.block.y);
	//console.log('========================================');

	//var c = 0;
	while (!TetrisManager.collide(battler, battler.shadowImage)){
		battler.shadowImage.block.y += battler.yrange;
		//c += 1;
	}
	//console.log(c)
	this.addToMainWindow(battler, battler.shadowImage.block)
	if (this._playerStateBoard) {
		this._playerStateBoard.onShadow()
    }
}

Scene_Tetris.prototype.AttAck = function (source, target, damage) {
	//if (target) {
	//	if (target.category == "enemy") {
	//		var finaldamage = 3 * (damage) - 2 * (target.Def)
	//		if (finaldamage >= 0) {
	//			target.curHp -= finaldamage;
	//		}
	//		if (target.curHp < 0) {
	//			target.curHp = 0;
	//			target.living = false;
	//			this.changeTarget();
	//		}
	//		var pop = new PopNumber(new FNumber(finaldamage, 7));
	//		this._blockLayer.addChild(pop)
	//		pop.move(target.xposition + 5 * target.xrange, target.yposition + TetrisManager.AboveLines * target.yrange + 10 * target.yrange);
	//		pop.activate();
	//		this.createXYanimationWindow(1, target.xposition + 5 * target.xrange, target.yposition + TetrisManager.AboveLines * target.yrange + 12 * target.yrange);
	//	} else {
	//		var finaldamage = 3 * (damage) - 2 * (this.actor.def)
	//		if (finaldamage >= 0) {
	//			this.actor.gainHp(-finaldamage);
	//		}
	//		var pop = new PopNumber(new FNumber(finaldamage, 7));
	//		this._blockLayer.addChild(pop)
	//		pop.move(target.pictureBoard.x + target.pictureBoard.width / 2, target.pictureBoard.y + target.pictureBoard.height / 2)
	//		pop.activate();
	//		this.createXYanimationWindow(1, target.pictureBoard.x + target.pictureBoard.width / 2, target.pictureBoard.y + target.pictureBoard.height/2);
	//	}
 //   }

	TetrisManager.HarmSystem.dealDamage(source, target, damage, source.AtkType);
	if (source.category == 'enemy') {
		source.StateBoard.onAttack();
	} else {
		this._playerStateBoard.onAttack();
		this.player.eng += 1;
    }
}

Scene_Tetris.prototype.tryEscape = function () {
	var enemyTotalLevel = 0;
	for (var i = 0; i < this._enemies.length; i++) {
		enemyTotalLevel += this._enemies[i].level;
	}
	var enemyAvgLevel = enemyTotalLevel / this._enemies.length;

	var escapeRate = 1 - (enemyAvgLevel - this.actor.level) * 0.2;
	if (TetrisManager.randomnize(escapeRate)) {
		AudioManager.playSe(this.seBoom);
		this.running = false;
		this.gameover = true;
		this.say('成功逃脱！确认以退出...', 200)
		this.StartWindow.deactivate();
		this.StartWindow.close();
	} else {
		this.startGame();
		this.say('逃脱失败！', 200)
    }
}

Scene_Tetris.prototype.addMergableTrashLine = function (battler, number) {
	var rnd = Math.floor(Math.random() * this.ROW);
	for (var i = 0; i < number; i++) {
		var tempLine = new Array(this.ROW).fill(10);
		tempLine[rnd] = 0;
		battler.field.shift();
		battler.field.push(tempLine);
	}
	this.drawArea(battler);
}

Scene_Tetris.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);

	//图层分级

	this._midLayer = new Sprite();
	this.addChild(this._midLayer);

	this._blockLayer = new Sprite();
	this.addChild(this._blockLayer);

	this._boardLayer = new Sprite();
	this.addChild(this._boardLayer);

	this._effectLayer = new Sprite();
	this.addChild(this._effectLayer);

	this.PauseScreen = new Sprite();
	this.PauseScreen.bitmap = ImageManager.loadPicture('PauseScreen');
	this.PauseScreen.opacity = 0;
	this.addChild(this.PauseScreen)

	this._upperLayer = new Sprite();
	this.addChild(this._upperLayer);
	//图层分级

	this.createPlayerWindows();
	this.createEnemyWindows();
	this.drawArea(this.player);
	this.createBox(this.player);
	this.refreshNextWindows(this.player);
	for (var i in this._enemies) {
		if (!this._enemies[i].NoAi) {
			this.drawArea(this._enemies[i]);
			this.createBox(this._enemies[i]);
        }
	}

	if (!TetrisManager.autoStart) {
		this.createStartWindow();
	}

	this.TargetMark = new targetMark(this._enemies[this.player.TargetIndex]);
	this._blockLayer.addChild(this.TargetMark);

	//准备开场特效
	this.laying_speed = 50;
	this.laying_count = 0

	this.player_laying_count = 0;
	this.player.holdWindow.y -= 624;
	this.player.mainwindow.y -= 624;
	this.player.nextWindows.forEach(function (item) {
		item.y -= 624;
	})

	this.enemy_laying_count = 0;
	this._enemies.forEach(function (item) {
		if (!item.NoAi) {
			item.mainwindow.x += 624;
			item.cur.block.x += 624;
        }
		item.gaugeWindow.x += 624;
	})


	//放音乐
	if (this.battleInfo.music) {
		AudioManager.playBgm(this.battleInfo.music);
	}

}

Scene_Tetris.prototype.createPlayerWindows = function () {
	this.player.holdWindow = new Tetris_Window(
		this.player.xposition - 140,
		this.player.yposition + TetrisManager.AboveLines * this.player.yrange - 5,
		120, 120
	);
	this.player.holdWindow.drawText("HOLD", 12, -10);

	this.refreshPlayerWindow(this.player);
	
	this.player.pictureBoard.move(0, 100, 400, 624);
	this.player.pictureBoard.removeChildAt(0);
	this.player.pictureBoard.addChild(this.player.picture);

	this.playerGaugeBoard = new Tetris_Window(0, 500, 500, 200);
	this.playerGaugeBoard.padding = 0;
	this.playerGaugeBoard.removeChildAt(0);

	this._playerStateBoard = new stateBoard($gameActors.actor(1));
	this._playerStateBoard.move(20, 575);

	this._playerItemBoard = new itemBoard();
	this._playerItemBoard.move(10,455)

	this.addWindow(this.player.pictureBoard);
	this.addWindow(this.playerGaugeBoard);
	this.addWindow(this.player.holdWindow);
	this.addWindow(this.player.mainwindow);
	this._boardLayer.addChild(this._playerStateBoard)
	this._boardLayer.addChild(this._playerItemBoard);

	this._Skill_Manager._skill_board.move(10, 390);
	this._boardLayer.addChild(this._Skill_Manager._skill_board);

	for (var i = 0; i < this.nextNumber; i++) {
		this.player.nextWindows.push(new Tetris_Window(
			this.player.xposition + this.ROW * this.player.xrange + 40,
			this.player.yposition + TetrisManager.AboveLines * this.player.yrange - 5 + 90 * i,
			120, 90));
	}
	for (var i = 0; i < this.nextNumber; i++) {
		this.addWindow(this.player.nextWindows[i]);
	}
	this.refreshPlayerGauge();

	if (this.player.auto) {
		this.autoSprite = new ShiningText("AUTO", 100, 100, 32);
		this._effectLayer.addChild(this.autoSprite);
		this.autoSprite.move(this.player.xposition - 15 - 7 + (this.ROW * this.player.xrange + 65) / 2,
			this.player.yposition + TetrisManager.AboveLines * this.player.yrange - 27 + ((this.COL - TetrisManager.AboveLines) * this.player.yrange) / 2);
    }

	this.refreshScoreBoard(this.player);
}

Scene_Tetris.prototype.createEnemyWindows = function () {
	for (var i = 0; i < this._enemies.length; i++) {
		var CurEnemy = this._enemies[i];
		if (CurEnemy.manager) {
			CurEnemy.manager.create();
		}
		if (!CurEnemy.gaugeWidth) {
			CurEnemy.gaugeWidth = this.ROW * CurEnemy.xrange + 80;
		}
		CurEnemy.gaugeWindow = new Full_Window(
			CurEnemy.xposition - 30,
			CurEnemy.yposition + TetrisManager.AboveLines * CurEnemy.yrange - 68,
			CurEnemy.gaugeWidth,
			48);
		CurEnemy.avatar = new Sprite();
		CurEnemy.avatar.bitmap = ImageManager.loadPicture("enemies\\" + CurEnemy.avatarName);
		CurEnemy.gaugeWindow.addChild(CurEnemy.avatar);

		CurEnemy.StateBoard = new stateBoard(CurEnemy);
		CurEnemy.StateBoard.move(CurEnemy.xposition, CurEnemy.yposition + TetrisManager.AboveLines * CurEnemy.yrange);
		this.addWindow(CurEnemy.StateBoard);
		if (!CurEnemy.NoAi) {
			this.refreshEnemyWindow(CurEnemy);
        }
		this.addWindow(CurEnemy.gaugeWindow);
		this.refreshEnemyHPGauge(i)
	}
}

Scene_Tetris.prototype.createStartWindow = function () {
	this.StartWindow = new Window_TetrisStart();
	this.StartWindow.setHandler('begin', this.startGame.bind(this))
	this.StartWindow.setHandler('escape', this.tryEscape.bind(this))
	this._upperLayer.addChild(this.StartWindow);
	this.StartWindow.deactivate();
	this.StartWindow.close();
}

Scene_Tetris.prototype.startGame = function () {
	if (!this.running && !this.gameover && !this.FirstBegin && this.layed) {
		this.FirstBegin = true;
		TetrisManager.setTimer();
		AudioManager.playSe(this.seTick);
		this.drawArea(this.player);
		this.shadow(this.player);
		for (var i in this._enemies) {
			if (!this._enemies[i].NoAi) {
				this.shadow(this._enemies[i])
            }
			if (this._enemies[i].manager && this._enemies[i].manager.onStart) {
				this._enemies[i].manager.onStart();
            }
		}
		this.running = true;
		this.eliminateBUGs(this.player);
		if (!TetrisManager.autoStart) {
			this.StartWindow.deactivate();
			this.StartWindow.close();
        }
	}
}

Scene_Tetris.prototype.endGame = function () {
	if (this.AfterMathWindow.isLayed() && !this.ExItIng) {
		this.onEnd();
		this.ExItIng = true;
		this.startFadeOut(60, false);
		this.unloadKeyMapper();
		this._playerStateBoard.onEnd();
		this._playerStateBoard.clearAllStates();
		for (var i = 0; i < this._enemies.length; i++) {
			this._enemies[i].StateBoard.onEnd();
			this._enemies[i].StateBoard.clearAllStates();
		}
		$gameVariables.setValue(6, this.player.SCORE);
		TetrisManager.desetTimer();
		AudioManager.fadeOutBgm(1);
		SceneManager.pop(Scene_Tetris);
		Scene_Tetris.prototype.onEnd = function () {
		}
		if (this.actor.hp <= 0) {
			this.actor.addState(1);
        }
	}
}
//如果你做了很过分的更改，请覆写这个方法来复元。
Scene_Tetris.prototype.onEnd = function () {

}

Scene_Tetris.prototype.refreshPlayerGauge = function(){
	this.playerGaugeBoard.contents.clear();
	var rate = this.player.displayHp / this.actor.mhp
	var eng_rate = this.player.eng / this.player.meng
	this.playerGaugeBoard.drawThinGauge(10, -12, 350, rate, 20, this.playerGaugeBoard.hpGaugeColor1(), this.playerGaugeBoard.hpGaugeColor2());
	this.playerGaugeBoard.drawThinGauge(10, 7, 340, eng_rate, 7, this.playerGaugeBoard.mpGaugeColor1(), this.playerGaugeBoard.mpGaugeColor2())
	this.player.gauge_pos = [this.playerGaugeBoard.x + 360 * rate, this.playerGaugeBoard.y]

	if (!this.player_hp_number) {
		this.player_hp_number = new FNumber(this.player.displayHp, 7);
		this.player_hp_number.changeDirection("left");
		this.playerGaugeBoard.addChild(this.player_hp_number);
		this.player_hp_number.move(320, -14);
	} else {
		this.player_hp_number.change(this.player.displayHp)
	}
}

Scene_Tetris.prototype.refreshPlayerWindow = function (operator) {
	this.removeWindow(operator.mainwindow);
	operator.mainwindow = new Tetris_Window(operator.xposition - 15 - 7,
		operator.yposition + TetrisManager.AboveLines * operator.yrange - 27,
		this.ROW * operator.xrange + 65,
		(this.COL - TetrisManager.AboveLines) * operator.yrange);
	operator.mainwindow.drawVerticalGauge(265, 10, 10, (this.COL - TetrisManager.AboveLines) * operator.yrange, operator.gaugeSCORE / this.player.AtkFreq, operator.mainwindow.hpGaugeColor1(), operator.mainwindow.hpGaugeColor1());
	for (var i = 0; i <= this.ROW; i++) {
		operator.mainwindow.contents.drawLine(i * operator.xrange + 5, 0, i * operator.xrange + 5, (this.COL - TetrisManager.AboveLines) * operator.yrange);
	}
	for (var i = 0; i <= this.COL; i++) {
		operator.mainwindow.contents.drawLine(4, i * operator.yrange - 14, this.ROW * operator.yrange + 4, i * operator.yrange - 14);
	}
	this.addWindow(operator.mainwindow);
	if (operator.cur && operator.cur.block) {
		this.addToMainWindow(operator, operator.cur.block);
	}
	if (operator.shadowImage) {
		this.addToMainWindow(operator, operator.shadowImage.block);
	}

	if (!operator.effectLayer) {
		operator.effectLayer = new Sprite();
    }
	operator.mainwindow.addChild(operator.effectLayer);
}

Scene_Tetris.prototype.addEffect = function (operator, sprite) {
	operator.effectLayer.addChild(sprite);
}

Scene_Tetris.prototype.addToMainWindow = function (operator, sprite) {
	operator.mainwindow.addChild(sprite)
}

Scene_Tetris.prototype.removeFromMainWindow = function (operator, sprite) {
	operator.mainwindow.removeChild(sprite)
}

Scene_Tetris.prototype.refreshScoreBoard = function (operator) {
	this._blockLayer.removeChild(operator.ScoreBoard);
	operator.ScoreBoard = new FNumber(operator.SCORE, 12);
	operator.ScoreBoard.changeDirection("left")
	operator.ScoreBoard.move(operator.xposition + this.ROW * operator.xrange, (this.COL - TetrisManager.AboveLines) * operator.yrange - 15);
	this._blockLayer.addChild(operator.ScoreBoard)
}

Scene_Tetris.prototype.refreshEnemyWindow = function (enemy) {
	this.removeWindow(enemy.mainwindow);
	if (enemy.windowHeight_Revision) {
		var r = enemy.windowHeight_Revision;
	} else {
		var r = 0;
    }
	enemy.mainwindow = new Tetris_Window(
		enemy.xposition - 15 - 7,
		enemy.assumeYpos - 27,
		this.ROW * enemy.xrange + 65,
		(this.COL - TetrisManager.AboveLines) * enemy.yrange + 24 + r)
	enemy.mainwindow.drawVerticalGauge(this.ROW * enemy.xrange + 12, 0, 10, (this.COL - TetrisManager.AboveLines) * enemy.yrange+r, enemy.curEng / enemy.MEng, enemy.mainwindow.hpGaugeColor1(), enemy.mainwindow.hpGaugeColor1());
	for (var j = 0; j <= this.ROW; j++) {
		enemy.mainwindow.contents.drawLine(j * enemy.xrange + 5, 0, j * enemy.xrange + 5, this.COL * enemy.yrange);
	}
	for (var j = 0; j <= this.COL; j++) {
		enemy.mainwindow.contents.drawLine(4, j * enemy.yrange - 14, this.ROW * enemy.yrange + 4, j * enemy.yrange - 14);
	}
	this.addWindow(enemy.mainwindow);
	this.addWindow(enemy.gaugeWindow);
	if (!enemy.effectLayer) {
		enemy.effectLayer = new Sprite();
    }
	enemy.mainwindow.addChild(enemy.effectLayer);
}

Scene_Tetris.prototype.refreshEnemyHPGauge = function (enemyid) {
	var CurEnemy = this._enemies[enemyid]
	CurEnemy.gaugeWindow.refresh();
	rate = CurEnemy.displayHp / CurEnemy.Mhp;
	CurEnemy.gaugeWindow.drawThinGauge(50, -5, CurEnemy.gaugeWidth-80, rate, 12, CurEnemy.gaugeWindow._background.hpGaugeColor1(), CurEnemy.gaugeWindow._background.hpGaugeColor1());
	CurEnemy.gauge_pos = [CurEnemy.gaugeWindow.x + 36 + (CurEnemy.gaugeWidth - 80) * rate, CurEnemy.gaugeWindow.y+20]


	CurEnemy.gaugeWindow.removeChild(CurEnemy.hp_number);
	CurEnemy.hp_number = new FNumber(CurEnemy.displayHp, 7);
	CurEnemy.hp_number.changeDirection("left");
	CurEnemy.gaugeWindow.addChild(CurEnemy.hp_number);
	CurEnemy.hp_number.move((CurEnemy.gaugeWidth - 80) + 54, 20);
}

Scene_Tetris.prototype.refreshNextWindows = function (operator) {
	if (operator.nextWindows && operator.next) {
		for (var i = 0; i < operator.nextWindows.length; i++) {
			if (operator.nextWindows[i].children.length >= 2) {
				operator.nextWindows[i].removeChildAt(operator.nextWindows[i].children.length-1);
			}
			operator.next[i].block.x = this.calPositionX(operator.next[i]);
			operator.next[i].block.y = 25;
			operator.nextWindows[i].addChild(operator.next[i].block);
		}
    }
}

Scene_Tetris.prototype.refreshCombo = function (battler) {
	if (battler.Count_Combos > 0) {
		if (battler.comboX) {
			this._blockLayer.removeChild(battler.comboX)
		}
		battler.comboX = new ComboSprite(battler.Count_Combos);
		battler.comboX.scale.x = battler.scaleX;
		battler.comboX.scale.y = battler.scaleY;
		battler.comboX.move(battler.xposition - 100 * battler.scaleX, battler.yposition+ TetrisManager.AboveLines*battler.yrange + 100 * battler.scaleY);
		this._blockLayer.addChild(battler.comboX)
	} else {
		if (battler.comboX) {
			battler.comboX.deactivate();
        }
    }
}

Scene_Tetris.prototype.Pause = function () {
	this.running = false;
	$gameSystem.saveBgm();
	AudioManager.fadeOutBgm(1);
	TetrisManager.pauseTimer();
	this.openPauseScreen();
	this._isPaused = true;
	this.isPausedThisTurn = true;
}

Scene_Tetris.prototype.Continue = function () {
	this.running = true;
	$gameSystem.replayBgm();
	TetrisManager.continueTimer();
	this.closePauseScreen();
	this._isPaused = false;
	this.isPausedThisTurn = true;
}

Scene_Tetris.prototype.openPauseScreen = function () {
	this.PauseScreen.opacity = 150;
}

Scene_Tetris.prototype.closePauseScreen = function () {
	this.PauseScreen.opacity = 0;
}

Scene_Tetris.prototype.say = function (txt, duration) {
	this._blockLayer.removeChild(this.NoticeBox);
	this.NoticeBox = new Notice_Widnow(duration);
	this.NoticeBox.drawText(txt, 0, 0);
	this._upperLayer.addChild(this.NoticeBox);
}

Scene_Tetris.prototype.createAfterMath = function () {
	var info = {};
	info.score = this.player.SCORE;
	info.combo = TetrisManager.curhighestCombo;
	info.LPM = TetrisManager.curhighestLPM;
	info.APM = TetrisManager.curhighestKPM;
	info.gold = this.player.gold_got;
	info.exp = this.player.exp_got;

	this.AfterMathWindow = new AfterMath_Window(info);
	this._upperLayer.addChild(this.AfterMathWindow);

	TetrisManager.Records.Count_Blocks += TetrisManager.Count_Blocks;
	TetrisManager.Records.Count_Buttons += TetrisManager.Count_Buttons;
	TetrisManager.Records.Count_Lines += TetrisManager.Count_Lines;
	TetrisManager.Records.Count_Tspin += TetrisManager.Count_Tspin;
	TetrisManager.Records.Total_Score += this.player.SCORE;
	if ($gameVariables.value(23) > TetrisManager.Records.highestLPM) {
		TetrisManager.Records.highestLPM = $gameVariables.value(23);
	}
	if ($gameVariables.value(24) > TetrisManager.Records.highestKPM) {
		TetrisManager.Records.highestKPM = $gameVariables.value(24);
	}

	$gameParty.gainGold(this.player.gold_got);
	$gameActors.actor(1).gainExp(this.player.exp_got);
}

Scene_Tetris.prototype.eliminateBUGs = function (operator) {
	operator.Count_Combos = 1;
	this.refreshCombo(operator);
	operator.Count_Combos = -1;
	this.refreshCombo(operator);
}

Scene_Tetris.prototype.beginRunning = function () {
	this.running = true;
}

Scene_Tetris.prototype.stopRunning = function () {
	this.running = false;
}

Scene_Tetris.prototype.getPlayer = function () {
	return this.player
}

Scene_Tetris.prototype.getSkillPosition = function (id) {
	return [this._Skill_Manager._skill_board.x + id * 50+25, this._Skill_Manager._skill_board.y+25]
}

Scene_Tetris.prototype.getPosX = function (operator) {
	var x = Math.floor((operator.cur.block.x - TetrisManager.Xrevision) / operator.xrange);
	return x
}

Scene_Tetris.prototype.getPosY = function (operator) {
	var y = Math.floor((operator.cur.block.y) / operator.yrange)
		+ TetrisManager.AboveLines - 1
		- Math.floor((3 + (-operator.yrange + 25)) / operator.yrange);;
	return y
}

Scene_Tetris.prototype.glowNext = function () {
	var glow = new Sprite(ImageManager.loadPicture('ui/NextGlow'))
	this._nextGlow = new WindowGlow(glow);
	this._nextGlow.move(this.player.xposition - 140,
		this.player.yposition + TetrisManager.AboveLines * this.player.yrange - 5
	)
	this._blockLayer.addChild(this._nextGlow)
}

Scene_Tetris.prototype.unglowNext = function () {
	if (this._nextGlow) {
		this._nextGlow.stop();
    }
}

function tetris_start() {
	if (TetrisManager.twoPMode) {
		SceneManager.push(Scene_Double);
	} else {
		SceneManager.push(Scene_Tetris);
    }
}

//=============================================================================
// ** 游戏内的特殊窗口
//=============================================================================

function Window_TetrisStart() {
	this.initialize.apply(this, arguments);
}

Window_TetrisStart.prototype = Object.create(Window_Command.prototype);
Window_TetrisStart.prototype.constructor = Window_TetrisStart;

Window_TetrisStart.prototype.initialize = function () {
	Window_Command.prototype.initialize.call(this, 0, 0);
	this.x = 0;
	this.y = 200;
}

Window_TetrisStart.prototype.makeCommandList = function () {
	this.addCommand("战斗", 'begin', true);
	this.addCommand("逃跑", 'escape', true);
}

//=============================================================================

function Window_Pause() {
	this.initialize.apply(this, arguments);
}

Window_Pause.prototype = Object.create(Window_Command.prototype);
Window_Pause.prototype.constructor = Window_Pause;

Window_Pause.prototype.initialize = function () {
	Window_Command.prototype.initialize.call(this, 0, 0);
	this.x = 0;
	this.y = 545;
	this.scene = SceneManager._scene;
	this.openness = 0;
	this.deactivate();
}

Window_Pause.prototype.start = function () {
	this.activate();
	this.open();
}

Window_Pause.prototype.makeCommandList = function () {
}

Window_Pause.prototype.maxCols = function () {
	return 1;
}

Window_Pause.prototype.isCancelEnabled = function () {
	return true;
};

Window_Pause.prototype.processCancel = function () {
	SoundManager.playCancel();
	this.scene.beginRunning();
	this.deactivate();
	this.close();
	this.scene.closePauseScreen();
}

//=============================================================================
// ** 双人模式游戏
//=============================================================================

function Scene_Double() {
	this.initialize.apply(this, arguments);
}

Scene_Double.prototype = Object.create(Scene_Tetris.prototype);
Scene_Double.prototype.constructor = Scene_Double;

Scene_Double.prototype.initializeData = function () {
	this.ROW = TetrisManager.ROW;
	this.COL = TetrisManager.COL;
	this.running = false;
	this.gameover = false;
	this.said = false;
	this.step = 50;

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
	this.arr_delay = ConfigManager.ARRDelay
	this.das_dalay = ConfigManager.DASDelay
	this.soft_drop_speed = Math.round(this.step / ConfigManager.SoftSpeed);
	this.isWaitingCloseUp = false;

	this.alldead = false;
	this.ExItIng = false;

	TetrisManager.Count_Blocks = 0;
	TetrisManager.Count_Buttons = 0;
	TetrisManager.Count_Lines = 0;
	TetrisManager.Count_Tspin = 0;
	TetrisManager.curhighestCombo = 0;

	this.layed = false;
	this.FirstBegin = false;
	this.nextNumber = 4;
}

Scene_Double.prototype.initialize_Actor = function () {
	this.actor = $gameActors.actor(1)

	this._operator1 = {
		actor: $gameActors.actor(1),
		category: "player",
		xposition: 133,
		yposition: 50,
		xrange: 23,
		yrange: 23,
		step: this.step,
		field: new Array(this.COL - 1),
		cur: null,
		next: [],
		hold: null,
		shadowImage: null,
		n: 0,
		SCORE: 0,
		gaugeSCORE: 0,
		curbag: TetrisManager.block_pics.slice(),
		nextWindows: [],
		holdWindow: null,
		delay_reset_times: 15,

		scaleX: 23/25,
		scaleY: 23 / 25,
		Count_Combos: -1,
		lastBack: false,

		das_delay_count_right: 0,
		das_delay_count_left: 0,
		arr_delay_count: 0,

		lastKick: false,
		holded: false,
		merged: false
	}

	this._operator2 = {
		actor: $gameActors.actor(1),
		category: "player",
		xposition: 823,
		yposition: 50,
		xrange: 23,
		yrange: 23,
		step: this.step,
		field: new Array(this.COL - 1),
		cur: null,
		next: [],
		hold: null,
		shadowImage: null,
		n: 0,
		SCORE: 0,
		gaugeSCORE: 0,
		curbag: TetrisManager.block_pics.slice(),
		nextWindows: [],
		holdWindow: null,
		delay_reset_times: 15,

		scaleX: 23 / 25,
		scaleY: 23 / 25,
		Count_Combos: -1,
		lastBack: false,

		das_delay_count_right: 0,
		das_delay_count_left: 0,
		arr_delay_count: 0,

		lastKick: false,
		holded: false,
		merged: false,

		MovingToRight: null,
		MadeLeftInitialMove: false,
		MadeRightInitialMove: false
	}

	this.player = {
		actor: $gameActors.actor(1),
		running: true,
		category: "player",

		pictureBoard: new Tetris_Window(),
		picture: new Sprite(),
		gauge_pos: [],
		//属性
		displayHp: this.actor.hp,
		atk: this.actor.atk,
		def: this.actor.def,
		cri: this.actor.cri,
		TargetIndex: 0,

		AtkFreq: 10,
		AtkType: 'normal',

		Damage_mag: 1,
		Critical_mag: 1
	}

	this._operator1.yposition -= TetrisManager.AboveLines * this._operator1.yrange;
	this._operator2.yposition -= TetrisManager.AboveLines * this._operator2.yrange;

	for (var i = 0; i < this._operator1.field.length; i++) {
		this._operator1.field[i] = new Array(this.ROW).fill(0);
		this._operator2.field[i] = new Array(this.ROW).fill(0);
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
	//]

	this.player.picture.bitmap = ImageManager.loadPicture("redDumpling");
	this.player.exceeded = false;

	this.player.removeState = function (id) {
		this.actor.removeState(id);
	}

	this.initialize_Skills();
}

Scene_Double.prototype.initialize_Enemy = function () {
	for (var i in this._enemies) {
		this._enemies[i].yposition = this._enemies[i].assumeYpos - TetrisManager.AboveLines * this._enemies[i].yrange;
		this._enemies[i].running = true;

		this._enemies[i].curHp = this._enemies[i].Mhp;
		this._enemies[i].displayHp = this._enemies[i].curHp;
		this._enemies[i]._states = [];
		this._enemies[i].removeState = function (id) {
			this._states.splice(this._states.indexOf(id), 1);
		}
		this._enemies[i].Damage_mag = 1
		this._enemies[i].Critical_mag = 1;
		this._enemies[i].curEng = 0;

		this._enemies[i].living = true;

		this._enemies[i].gauge_pos = [];

		if (!this._enemies[i].AtkType) {
			this._enemies[i].AtkType = 'normal'
		}

		if (this._enemies[i].manager) {
			this._enemies[i].manager.initialize();
		}

	}
}

Scene_Double.prototype.update = function () {
	Scene_MenuBase.prototype.update.call(this);
	if (!this.layed) {
		this.update_Placement();
	} else {
		//if (Input.isTriggered('ok') || TouchInput.isPressed()) {
		//	if (this.gameover) {
		//		if (!this.AfterMathWindow) {
		//			this.createAfterMath();
		//		} else {
		//			if (this.AfterMathWindow.isLayed() && !this.ExItIng) {
		//				this.endGame();
		//			}
		//		}
		//	}
		//}
		//this.update_Animation();
		if (this.running) {
			this._Skill_Manager.update();
			//this.update_Enemy();
			this._playerStateBoard.refreshStates();
			if (this.player.running) {
				this.update_Actor();
			}
			this.isGameOver();
		}
	}
}

Scene_Double.prototype.update_Actor = function () {
	this.update_Operator1();
	this.update_Operator2();
}

Scene_Double.prototype.update_Operator1 = function () {

	if (Input.isTriggered('cancel') || Input.isTriggered('menu')) {
		if (!this._isPaused) {
			this.Pause();
		} else {
			this.Continue();
        }
	}

	this.update_Movement(this.player);

	if (Input.isTriggered('tab')) {
		this._Skill_Manager.changeTarget();
	}

	if (Input.isTriggered('skillone')) {
		this._Skill_Manager.startSkill(0);
	}

	if (Input.isTriggered('skilltwo')) {
		this._Skill_Manager.startSkill(1);
	}

	if (Input.isTriggered('skillthree')) {
		this._Skill_Manager.startSkill(2);
	}

	this.player.n += 1
	if (this.player.n >= this.player.step) {

		if (TetrisManager.collide(this.player, this.player.cur)) {
			AudioManager.playSe(this.seTick)
			this.mergeBox(this.player);
			TetrisManager.Count_Blocks += 1;
			this._blockLayer.removeChild(this.player.cur.block);
			this.drawArea(this.player);
			this.player.cur = null;
			this.player.lastKick = false;
			this.createBox(this.player);
			this.shadow(this.player);
			this.player.holded = false;
			this.player.delay_reset_times = 15;
		} else {
			this.player.cur.block.y += this.player.yrange;
			this.player.lastKick = false;
		}

		this.player.n = 0;
	}

	if (this.player.gaugeSCORE >= this.player.AtkFreq) {

		var overkill = this.player.gaugeSCORE - this.player.AtkFreq
		var damage = this.player.atk + overkill;
		if (this._enemies[this.player.TargetIndex]) {
			this.AttAck(this.player, this._enemies[this.player.TargetIndex], damage);
		}
		this.player.gaugeSCORE = 0;
		this.drawArea(this.player);
	}

	TetrisManager.curhighestLPM = TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60);
	TetrisManager.curhighestKPM = TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60);
}

Scene_Double.prototype.update_Operator1 = function () {

}

Scene_Double.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);

	//图层分级

	this._blockLayer = new Sprite();
	this.addChild(this._blockLayer);

	this._boardLayer = new Sprite();
	this.addChild(this._boardLayer);

	this.PauseScreen = new Sprite();
	this.PauseScreen.bitmap = ImageManager.loadPicture('PauseScreen');
	this.PauseScreen.opacity = 0;
	this.addChild(this.PauseScreen)

	this._upperLayer = new Sprite();
	this.addChild(this._upperLayer);
	//图层分级

	this.createPlayerWindows();
	this.createEnemyWindows();
	this.createBox(this._operator1);
	this.createBox(this._operator2);
	this.drawArea(this._operator1);
	this.drawArea(this._operator2);

	this.createStartWindow();

	this.TargetMark = new targetMark(this._enemies[this.player.TargetIndex]);
	this._blockLayer.addChild(this.TargetMark);

	//TODO: 准备开场特效
	//this.laying_speed = 50;
	//this.laying_count = 0

	//this.holdWindow.y -= 624;
	//this.player.mainwindow.y -= 624;
	//this.nextWindows.forEach(function (item) {
	//	item.y -= 624;
	//})
	//this.player.cur.block.y -= 624;

	//this._enemies.forEach(function (item) {
	//	item.mainwindow.x += 624;
	//	item.cur.block.x += 624;
	//})
	//this.TargetMark.x -= 624;
}

Scene_Double.prototype.createPlayerWindows = function () {

	this._operator1.holdWindow = new Tetris_Window(
		this._operator1.xposition - 140,
		this._operator1.yposition + TetrisManager.AboveLines * this._operator1.yrange - 5,
		120, 120);
	this._operator1.holdWindow.drawText("HOLD", 12, -10);

	this._operator2.holdWindow = new Tetris_Window(
		this._operator2.xposition + this.ROW * this._operator2.xrange + 40,
		this._operator2.yposition + TetrisManager.AboveLines * this._operator2.yrange - 5,
		120, 120);
	this._operator2.holdWindow.drawText("HOLD", 12, -10);


	this.refreshPlayerWindow(this._operator1);
	this.refreshPlayerWindow(this._operator2);

	this.player.pictureBoard.move(350, 300, 400, 624);
	this.player.pictureBoard.removeChildAt(0);
	this.player.pictureBoard.addChild(this.player.picture);

	this.playerGaugeBoard = new Tetris_Window(400, 525, 500, 200);
	this.playerGaugeBoard.padding = 0;
	this.playerGaugeBoard.removeChildAt(0);

	this._playerStateBoard = new stateBoard($gameActors.actor(1));
	this._playerStateBoard.move(420, 575);

	this._playerItemBoard = new itemBoard();
	this._playerItemBoard.move(410, 480)

	this.addWindow(this.player.pictureBoard);
	this.addWindow(this.playerGaugeBoard);
	this.addWindow(this._operator1.holdWindow);
	this.addWindow(this._operator2.holdWindow);
	this.addWindow(this._operator1.mainwindow);
	this.addWindow(this._operator2.mainwindow);
	this._boardLayer.addChild(this._playerStateBoard)
	this._boardLayer.addChild(this._playerItemBoard);

	this._Skill_Manager._skill_board.move(410, 415);
	this._boardLayer.addChild(this._Skill_Manager._skill_board);

	for (var i = 0; i < this.nextNumber; i++) {
		this._operator1.nextWindows.push(
			new Tetris_Window(this._operator1.xposition - 140,
				this._operator1.yposition + TetrisManager.AboveLines * this._operator1.yrange - 5 +120 + 90 * i,
				120, 90));
		this._operator2.nextWindows.push(
			new Tetris_Window(this._operator2.xposition + this.ROW * this._operator2.xrange + 40,
				this._operator1.yposition + TetrisManager.AboveLines * this._operator1.yrange - 5 + 120 + 90 * i,
				120, 90));
	}
	for (var i = 0; i < this.nextNumber; i++) {
		this.addWindow(this._operator1.nextWindows[i]);
		this.addWindow(this._operator2.nextWindows[i]);
	}
	this.refreshPlayerGauge();

	this.refreshScoreBoard(this._operator1);
	this.refreshScoreBoard(this._operator2);
}

Scene_Double.prototype.createEnemyWindows = function () {
	for (var i = 0; i < this._enemies.length; i++) {
		var CurEnemy = this._enemies[i];

		//if (CurEnemy.manager) {
		//	CurEnemy.manager.create();
		//}

		CurEnemy.gaugeWindow = new Tetris_Window(CurEnemy.dx, CurEnemy.dy- 68, this.ROW * CurEnemy.xrange + 80, 48);
		CurEnemy.avatar.bitmap = ImageManager.loadPicture("enemies\\" + CurEnemy.avatarName);
		CurEnemy.gaugeWindow.addChild(CurEnemy.avatar);

		CurEnemy.StateBoard = new stateBoard(CurEnemy);
		CurEnemy.StateBoard.move(CurEnemy.dx, CurEnemy.dy);
		this.addWindow(CurEnemy.StateBoard);
		//this.refreshEnemyWindow(CurEnemy);
		this.addWindow(CurEnemy.gaugeWindow);
		this.refreshEnemyHPGauge(i)
	}
}

Scene_Double.prototype.update_Placement = function () {
	//this.laying_count += 1;
	//if (this.laying_count <= this.laying_speed - 10) {
	//	var n = (624 + 10) / (this.laying_speed - 10)
	//	this.player.holdWindow.y += n;
	//	this.player.mainwindow.y += n;
	//	this.nextWindows.forEach(function (item) {
	//		item.y += n;
	//	})
	//	this.player.cur.block.y += n;
	//	this._enemies.forEach(function (item) {
	//		item.mainwindow.x -= n
	//		item.cur.block.x -= n
	//	})
	//} else {
	//	this.player.holdWindow.y -= 1;
	//	this.player.mainwindow.y -= 1;
	//	this.nextWindows.forEach(function (item) {
	//		item.y -= 1;
	//	})
	//	this.player.cur.block.y -= 1;
	//	this._enemies.forEach(function (item) {
	//		item.mainwindow.x += 1
	//		item.cur.block.x += 1
	//	})
	//}
	//if (this.laying_count >= this.laying_speed) {
		this.layed = true;
		this.StartWindow.activate();
		this.StartWindow.open();
	//}
}

Scene_Double.prototype.startGame = function () {
	if (!this.running && !this.gameover && !this.FirstBegin && this.layed) {
		this.FirstBegin = true;
		TetrisManager.setTimer();
		AudioManager.playSe(this.seTick);
		this.refreshPlayerWindow(this._operator1);
		this.refreshPlayerWindow(this._operator2);
		this.shadow(this._operator1);
		this.shadow(this._operator2);
		this.running = true;
		this.eliminateBUGs(this._operator1);
		this.eliminateBUGs(this._operator2);
		this.StartWindow.deactivate();
		this.StartWindow.close();
	}
}