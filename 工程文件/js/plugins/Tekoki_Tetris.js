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


//=============================================================================
// ** 场景定义
//=============================================================================

//TODO: 加个进度条

function Scene_Tetris() {
	this.initialize.apply(this, arguments);
}

Scene_Tetris.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Tetris.prototype.constructor = Scene_Tetris;

Scene_Tetris.prototype.initialize = function () {
	Scene_ItemBase.prototype.initialize.call(this);
	this.initializeData();
	this.initialize_Actor();
	this.enemies = TetrisManager.enemy_List[$gameVariables.value(1)].slice();
	this.initialize_Enemy();
	this.loadKeyMapper();
	this.skinID = null;
	this.loadBlockSkin();
}

Scene_Tetris.prototype.initialize_Actor = function () {
	var actor = $gameActors.actor(1)

	this.player = {
		category: "player",
		xposition: 375,
		yposition: 27,
		xrange: 25,
		yrange: 25,
		rangeRatio: 1,

		step: 50,
		field: new Array(this.COL-1),
		cur: null,
		next: [],
		hold: null,
		shadowImage: null,
		n: 0,
		SCORE: 0,
		gaugeSCORE: 0,
		curbag: TetrisManager.block_pics.slice(),

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
		delay_reset_times: 15,

		scaleX: 1,
		scaleY: 1,
		Count_Combos: -1,
		lastBack: false
	}

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
	//	[1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
	//	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
	//]

	this.player.picture.bitmap = ImageManager.loadPicture("redDumpling");
	this.player.exceeded = false;

	this.player.Count_Combos = 1;
	this.refreshCombo(this.player);
	this.player.Count_Combos = -1;
	this.refreshCombo(this.player);

	this.initialize_Skills();
}

Scene_Tetris.prototype.initialize_Skills = function () {
	var weapon = $gameActors.actor(1).equips()[0]

	this.SkillButtonOne = new SkillButton(weapon.id-1)
}

Scene_Tetris.prototype.initialize_Enemy = function () {
	if (this.enemies.length > 1) {
		this.multiple = true
	}
	for (var i in this.enemies) {
		this.enemies[i].curHp = this.enemies[i].Mhp;
		this.enemies[i].displayHp = this.enemies[i].curHp;

		this.enemies[i].curbag = TetrisManager.block_pics.slice();

		this.enemies[i].next = []
		this.enemies[i].cur = null;

		this.enemies[i].field = new Array(this.COL - 1);
		for (var j = 0; j < this.enemies[i].field.length; j++) {
			this.enemies[i].field[j] = new Array(this.ROW).fill(0);
		}

		this.enemies[i].pathGenerator = new Position_Manager();
		this.enemies[i].actionQueue = [];

		this.enemies[i].n = 0;

		this.enemies[i].living = true;

		this.enemies[i].scaleX = this.enemies[i].xrange / this.player.xrange;
		this.enemies[i].scaleY = this.enemies[i].yrange / this.player.yrange;

		this.enemies[i].Count_Combos = -1;
	}
}

Scene_Tetris.prototype.initializeData = function () {
	this.ROW = TetrisManager.ROW;
	this.COL = TetrisManager.COL;
	this.running = false;
	this.gameover = false;
	this.said = false;

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

	this.arr_delay = $gameVariables.value(3);
	this.das_dalay = $gameVariables.value(2);
	this.soft_drop_speed = $gameVariables.value(4);
	this.das_delay_count_right = 0;
	this.arr_delay_count_right = 0;
	this.das_delay_count_left = 0;
	this.arr_delay_count_left = 0;

	this.nextWindows = [];

	this.lastKick = false;
	this.isWaitingCloseUp = false;
	this.holded = false;
	this.merged = false;

	this.alldead = false;

	TetrisManager.Count_Blocks = 0;
	TetrisManager.Count_Buttons = 0;
	TetrisManager.Count_Lines = 0;
	TetrisManager.curhighestCombo = 0;
}

Scene_Tetris.prototype.loadKeyMapper = function () {
	ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.TetrisKeyMapper))
	ConfigManager.save();
	ConfigManager.load();
	TetrisManager.load();
}

Scene_Tetris.prototype.unloadKeyMapper = function () {
	ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.defaultMap))
	ConfigManager.applyKeyConfig();
	ConfigManager.save();
	ConfigManager.load();
	TetrisManager.save();
}

Scene_Tetris.prototype.loadBlockSkin = function () {
	var armors = $gameActors.actor(1).armors()

	for (var i in armors) {
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

	this.enemyID = "blockSkin\\enemy\\"

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
				this.minoSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.skinID + TetrisManager.block_pics[i]));
				this.shadowSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.skinID + TetrisManager.block_pics[i] + "_S"))
				this.enemyminoSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.enemyID + TetrisManager.block_pics[i]));
				this.enemyshadowSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.enemyID + TetrisManager.block_pics[i] + "_S"));
			} else {
				if (TetrisManager.block_pics[i] == 'o') {
					// pass
				} else {
					this.minoSkin[TetrisManager.block_pics[i]].push(ImageManager.loadPicture(this.skinID + TetrisManager.block_pics[i] + j));
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

	this.MergeEffect = ImageManager.loadPicture("MergeEffect");
	this.CancelEffect = ImageManager.loadPicture("CancelEffect");
}

Scene_Tetris.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	AudioManager.playSe(this.seBoom);
	this.startFadeIn(60, false);
}

Scene_Tetris.prototype.update = function () {
	Scene_MenuBase.prototype.update.call(this);

	if (Input.isTriggered('ok') || TouchInput.isPressed()) {
		if (this.gameover) {
			if (!this.AfterMathWindow) {
				this.createAfterMath();
			} else {
				if (this.AfterMathWindow.isLayed()) {
					this.startFadeOut(60, false);
					this.unloadKeyMapper();
					$gameVariables.setValue(6, this.player.SCORE);
					TetrisManager.desetTimer();
					SceneManager.pop(Scene_Tetris);
                }
            }
		} else {
			if (!this.running && !this.gameover) {
				TetrisManager.setTimer();
				AudioManager.playSe(this.seTick);
				this.refreshPlayerWindow();
				this.drawArea(this.player);
				this.shadow(this.player);
				for (var i in this.enemies) {
					this.shadow(this.enemies[i])
                }
				this.running = true;
			}
		}
	}
	this.update_Animation();
	if (this.running) {
		this.update_Actor();
		this.update_Enemy();
		this.isGameOver();
	}
}

Scene_Tetris.prototype.isGameOver = function () {
	if (this.player.Hp <= 0 || this.player.exceeded) {
		AudioManager.playSe(this.seBoom);
		this.running=false;
		this.gameover=true;
		$gameSwitches.setValue(20, false);
		this.say('战败！确认以退出..', 200)
	}
	if(this.alldead){
		AudioManager.playSe(this.seBoom);
		this.running=false;
		this.gameover=true;
		$gameSwitches.setValue(20, true);
		this.say('胜利！确认以退出..', 200)
	}
}

Scene_Tetris.prototype.update_Actor = function () {

	if (Input.isTriggered("skillone")) {
		//if (this.SkillButtonOne.isPrepared()) {
		//	this.SkillButtonOne.getSkill().apply(this);
		//	this.SkillButtonOne.reset();
		//}
		alert('yes');
	}
	
	if (Input.isTriggered('right')) {
		TetrisManager.Count_Buttons += 1;
		if(this.bMove(this.player, 1)){
			this.player.cur.block.x += this.player.xrange;
			this.resetCollideDelay(this.player);
			this.shadow(this.player);
			this.lastKick = false;
		}
	}

	if (Input.isPressed('right')) {
		this.das_delay_count_right += 1;
		if (this.das_delay_count_right >= this.das_dalay) {
			this.arr_delay_count_right += 1;
			if (this.arr_delay_count_right >= this.arr_delay) {
				if (this.bMove(this.player, 1)) {
					this.player.cur.block.x += this.player.xrange;
					this.resetCollideDelay(this.player);
					this.shadow(this.player);
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
	
	if (Input.isTriggered('left')) {
		TetrisManager.Count_Buttons += 1;
		if(this.bMove(this.player, -1)){
			this.player.cur.block.x -= this.player.xrange;
			this.resetCollideDelay(this.player);
			this.shadow(this.player);
			this.lastKick = false;
		}
	}

	if (Input.isPressed('left')) {
		this.das_delay_count_left += 1;
		if (this.das_delay_count_left >= this.das_dalay) {
			this.arr_delay_count_left += 1;
			if (this.arr_delay_count_left >= this.arr_delay) {
				if (this.bMove(this.player, -1)) {
					this.player.cur.block.x -= this.player.xrange;
					this.resetCollideDelay(this.player);
					this.shadow(this.player);
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
	
	if (Input.isTriggered('up')) {
		TetrisManager.Count_Buttons += 1;
		this.rotateBox(this.player,1);
		this.shadow(this.player);
		this.lastKick = true;
	}
	
	if (Input.isTriggered('control')) {
		TetrisManager.Count_Buttons += 1;
		this.rotateBox(this.player, -1);
		this.shadow(this.player);
		this.lastKick = true;
	}
	
	if (Input.isTriggered('shift')) {
		this.holdBox();
		this.shadow(this.player);
		this.player.Count_Combos += 1;
		this.refreshCombo(this.player);
	}
	
	if (Input.isTriggered('space')) {
		if (this.player.shadowImage) {
			if (this.player.cur.block.y != this.player.shadowImage.block.y) {
				this.lastKick = false;
			}
			this.player.cur.block.x = this.player.shadowImage.block.x;
			this.player.cur.block.y = this.player.shadowImage.block.y;
			this.player.n = this.player.step;
		}
	}

	if (Input.isPressed('down') & !TetrisManager.collide(this.player, this.player.cur)) {
		this.player.step = this.soft_drop_speed;
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

		if (TetrisManager.collide(this.player, this.player.cur)) {
			AudioManager.playSe(this.seTick)
			this.mergeBox(this.player);
			TetrisManager.Count_Blocks += 1;
			this.removeChild(this.player.cur.block);
			this.drawArea(this.player);
			this.player.cur = null;
			this.lastKick = false;
			this.createBox(this.player);
			this.shadow(this.player);
			this.holded = false;
			this.player.delay_reset_times = 15;
		} else {
			this.player.cur.block.y += this.player.yrange;
			this.lastKick = false;
		}

		this.player.n = 0;
	}

	if (this.player.gaugeSCORE >= this.player.AtkFreq) {
		var overkill = this.player.gaugeSCORE - this.player.AtkFreq
		var damage = this.player.Atk + overkill;
		if (this.multiple) {
			var rnd = Math.floor(Math.random() * (this.enemies.length));
			this.AttAck(this.player, this.enemies[rnd], damage);
		} else {
			this.AttAck(this.player, this.enemies[0], damage);
		}
		this.player.gaugeSCORE = 0;
		this.drawArea(this.player);
	}

	TetrisManager.curhighestLPM = TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60);
	TetrisManager.curhighestAPM = TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60);
}

Scene_Tetris.prototype.update_Enemy = function () {
	this.alldead = true;
	for (var i = 0; i < this.enemies.length; i++) {
		var CurEnemy = this.enemies[i]
		if (CurEnemy.living) {
			this.alldead = false;

			if (CurEnemy.curEng >= CurEnemy.MEng) {
				this.AttAck(CurEnemy, this.player, CurEnemy.Atk);
				CurEnemy.curEng = 0;
				this.refreshEnemyWindow(CurEnemy);
				this.drawArea(CurEnemy);
			}

			if (TetrisManager.collide(CurEnemy, CurEnemy.cur)) {
				this.mergeBox(CurEnemy);
				this.removeChild(CurEnemy.cur.block);
				this.drawArea(CurEnemy);
				CurEnemy.cur = null;
				this.lastKick = false;
				this.createBox(CurEnemy);
				this.shadow(CurEnemy);
			}

			CurEnemy.n += 1;
			if (CurEnemy.n >= $gameVariables.value(5)) {
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

			if (CurEnemy.curHp <= 0) {
				CurEnemy.living = false;
			}
        }
	}
}

Scene_Tetris.prototype.update_Animation = function () {

	if (this.player.displayHp > this.player.Hp) {
		this.player.displayHp -= 1;
		this.refreshPlayerGauge();
	} else if (this.player.displayHp < this.player.Hp) {
		this.player.displayHp += 1;
		this.refreshPlayerGauge();
	}

	for (var i in this.enemies) {
		if (this.enemies[i].displayHp > this.enemies[i].curHp) {
			this.enemies[i].displayHp -= 1
			this.refreshEnemyHPGauge(i)
		} else if (this.enemies[i].displayHp < this.enemies[i].curHp) {
			this.enemies[i].displayHp += 1
			this.refreshEnemyHPGauge(i)
		}
	}

	if (this.AfterMathWindow) {
		this.diminishBlocks();
    }
}

Scene_Tetris.prototype.resetCollideDelay = function (battler) {
	if (TetrisManager.collide(battler, battler.cur) && battler.delay_reset_times > 0) {
		battler.n = 0;
		battler.delay_reset_times -= 1;
	}
}

Scene_Tetris.prototype.mergeBox = function(battler){
	var box = battler.cur.box;
	var len = battler.cur.box.length;
	var y = Math.floor((battler.cur.block.y - battler.yposition) / battler.yrange);
	var x = Math.floor((battler.cur.block.x - battler.xposition) / battler.xrange);
	//Create Merging Effect

	for (var i = 0; i < len; i++){
		if (i + y >= 0) {
			for (var j = 0; j < box[i].length; j++) {
				if (box[i][j] !== 0) {

					if (i + y + 1 >= battler.field.length || (i + y + 1 < battler.field.length && battler.field[i + y + 1][j + x] !== 0)) {
						var MergeX = (j + x) * battler.xrange + battler.xposition+7;
						var MergeY = (i + y) * battler.yrange + battler.yposition - 4*battler.yrange;
						var Merging = new MergeEffect(this.MergeEffect);
						Merging.scale.x = battler.scaleX;
						Merging.scale.y = battler.scaleY;
						Merging.move(MergeX, MergeY);
						this.addChild(Merging);
					}
					if (battler.field[i + y] && battler.field[i + y][j + x] == 0) {
						battler.field[i + y][j + x] = box[i][j];
					}
				}
			}
		} else {
			battler.exceeded = true;
        }
	}	

	var arr = this.isRemove(battler);
	if (arr) {
		if (battler.category == "player") {
			this.merged = true;
			var Tspined = false;
			if (arr[0]) {
				battler.Count_Combos += 1;
				Tspined = this.isTspin(battler)
				AudioManager.playSe(this.seBoom);
				if (battler.Count_Combos > TetrisManager.curhighestCombo) {
					TetrisManager.curhighestCombo = battler.Count_Combos;
                }
			} else {
				battler.Count_Combos = -1;
			}
			this.refreshCombo(battler);
			for (var i = 0; i < arr.length; i++) {
				battler.field.splice(arr[i], 1);
				battler.field.unshift(new Array(this.ROW).fill(0));
				TetrisManager.Count_Lines += 1;
				var CancelX = battler.xposition + 7;
				var CancelY = (arr[i]-1) * battler.yrange + battler.yposition;
				var Cancelling = new MergeEffect(this.CancelEffect);
				Cancelling.scale.x = battler.scaleX;
				Cancelling.scale.y = battler.scaleY;
				Cancelling.move(CancelX, CancelY);
				this.addChild(Cancelling)
			}
			if (Tspined) {
				var TspinPopup = new Sprite();
				TspinPopup.bitmap = ImageManager.loadPicture('tspin');
				battler.TspinPopup = new PopNumber(TspinPopup);
				battler.TspinPopup.x = this.player.xposition + 65;
				battler.TspinPopup.y = this.player.yposition + 75;
				this.addChild(battler.TspinPopup);
				battler.TspinPopup.activate();
				var tempScore = Math.pow(5, arr.length);
			} else {
				var tempScore = Math.pow(3, arr.length);
			}

			if (battler.Count_Combos > 0) {
				tempScore = tempScore * (battler.Count_Combos+1);
			}

			if (Tspined || arr.length >= 4) {
				if (this.player.lastBack) {
					var b2bPopup = new Sprite();
					b2bPopup.bitmap = ImageManager.loadPicture('b2b');
					battler.b2bPopup = new PopNumber(b2bPopup);
					battler.b2bPopup.x = this.player.xposition + 65;
					battler.b2bPopup.y = this.player.yposition + 75;
					this.addChild(battler.b2bPopup);
					battler.b2bPopup.activate();
					tempScore = tempScore * 2;
				}
				this.player.lastBack = true
			} else {
				this.player.lastBack = false
            }
			this.player.SCORE += tempScore;
			this.player.gaugeSCORE += tempScore;
			this.refreshScoreBoard();
			var popScore = new PopNumber(new FNumber(tempScore, 9));
			this.addChild(popScore);
			popScore.move(this.player.xposition + this.ROW * this.player.xrange, this.COL * this.player.yrange - 15);
			popScore.activate();
			this.merged = false;
		} else {
			if (arr[0]) {
				battler.Count_Combos += 1;
				Tspined = this.isTspin(battler)
			} else {
				battler.Count_Combos = -1;
			}
			this.refreshCombo(battler);
			for (var i = 0; i < arr.length; i++) {
				battler.field.splice(arr[i], 1);
				battler.field.unshift(new Array(this.ROW).fill(0));
				var CancelX = battler.xposition + 7;
				var CancelY = (arr[i] - 1) * battler.yrange + battler.yposition;
				var Cancelling = new MergeEffect(this.CancelEffect);
				Cancelling.scale.x = battler.scaleX;
				Cancelling.scale.y = battler.scaleY;
				Cancelling.move(CancelX, CancelY);
				this.addChild(Cancelling)
			}
			var tempScore = Math.pow(battler.EngSpd, arr.length)
			if (battler.Count_Combos > 0) {
				tempScore = tempScore * (battler.Count_Combos + 1);
			}
			battler.curEng += tempScore;
        }
	};

	//TODO: 加入敌人Tspin
}

Scene_Tetris.prototype.isRemove = function(battler){
	var arr = [];
	for(var i=0; i<battler.field.length; i++){
		var remove = true;
		for(var j=0; j<battler.field[i].length; j++){
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

	var cur = battler.cur
	if (cur.type != 't') {
		return false;
	}
	if (!this.lastKick||!this.merged) {
		return false;
	}

	var rotation = battler.cur.rotation
	var field = battler.field;
	var x = Math.floor((cur.block.x - battler.xposition) / battler.xrange);
	var y = Math.floor((cur.block.y - battler.yposition) / battler.yrange);

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

Scene_Tetris.prototype.drawArea = function (battler) {

	if (battler.category == "player") {
		this.refreshPlayerWindow();
		var mainWindow = this.playerMainWindow;
		var blockSkin = this.blockSkin;
	} else {
		this.refreshEnemyWindow(battler);
		var mainWindow = battler.mainWindow;
		var blockSkin = this.enemyblockSkin;
    }

	var box = battler.cur.box;
	var x = Math.floor((battler.cur.block.x - battler.xposition) / battler.xrange);
	var y = Math.floor((battler.cur.block.y - battler.yposition) / battler.yrange)+1;

	for(var i in battler.field){
		for(var j in battler.field[i]){
			if (battler.field[i][j] != 0) {
				var blackBlock = new Sprite();
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
				blackBlock.bitmap = blockSkin[blocktype];
				blackBlock.scale.x = battler.scaleX;
				blackBlock.scale.y = battler.scaleY;
				blackBlock.x = j * battler.xrange + 23
					//battler.xrange + (-battler.xrange + 25) - 2;
				//j * (816 / 33) + 8.8 + 0.2 * j + 15;
				blackBlock.y = i * battler.yrange + 3 + (-battler.yrange + 25);
					//(i) * (624 / 25) + 5.2;
				mainWindow.addChild(blackBlock);
			}
		}
	}
	
}

Scene_Tetris.prototype.createBox = function (battler) {
	if (battler.category == "player") {
		var minoSkin = this.minoSkin;
	} else {
		var minoSkin = this.enemyminoSkin;
    }

	if (battler.next.length == 0) {
		for (var i = 0; i < 6; i++) {
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
			if (battler.nextWindows) {
				this.refreshNextWindows();
			}
		}
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
		battler.cur.block.x = battler.xposition + 4 * battler.xrange+7;
		battler.cur.block.y = battler.yposition;

		while (TetrisManager.collide(battler, battler.cur)) {
			battler.cur.block.y -= battler.yrange;
		}
		this.addChild(battler.cur.block);
		if (battler.category == 'enemy') {
			battler.pathGenerator.inputData(battler.field, battler.cur);
			battler.actionQueue = battler.pathGenerator.render_ActionQueue();
			//for (i in battler.actionQueue) {
			//	console.log(battler.actionQueue[i])
			//}
		}
		this.refreshNextWindows();
	}
}

Scene_Tetris.prototype.bMove = function(battler, n){
	var cur = battler.cur;
	var x = Math.floor((battler.cur.block.x - battler.xposition) / battler.xrange) + n;
	var y = Math.floor((battler.cur.block.y - battler.yposition) / battler.yrange);
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
			var minoSkin = this.minoSkin;
		} else {
			var minoSkin = this.enemyminoSkin;
        }
		this.resetCollideDelay(battler);
		var type = battler.cur.type;
		var rotation = battler.cur.rotation;
		this.removeChild(battler.cur.block);
		battler.cur.block.x = Finaltemp.x;
		battler.cur.block.y = Finaltemp.y;
		battler.cur.rotationTime = Finaltemp.rotationTime;
		battler.cur.box = Finaltemp.box;
		if (direction == 1) {
			if (rotation + 1 <= TetrisManager.data[type].length - 1) {
				battler.cur.block.bitmap = minoSkin[type][rotation+1]
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
		battler.cur.rotation = Finaltemp.rotation;
		this.addChild(battler.cur.block);
	}
	

}

Scene_Tetris.prototype.holdBox = function(){
	if (this.holded) {
		return
	}

	if(!this.player.hold){
		this.removeChild(this.player.cur.block);
		var type = this.player.cur.type;
		this.player.hold = {
			block: new Sprite(),
			type: this.player.cur.type,
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data[this.player.cur.type][0]
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
		var type = this.player.cur.type;
		this.player.cur = this.player.hold;
		this.player.cur.block.x = this.player.xposition + 4 * this.player.xrange + 7;
		this.player.cur.block.y = this.player.yposition;

		this.player.hold = {
			block: new Sprite(),
			type: type,
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data[type][0]
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
	var type = cur.type;
	var rotation = cur.rotation;
	
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

	if (rotation == 0) {
		var bitmap = shadowSkin[type][0];
	}else{
		var bitmap = shadowSkin[type][rotation];
	}
	var x = battler.cur.block.x;
	var y = battler.cur.block.y;
	
	if (battler.shadowImage){
		this.removeChild(battler.shadowImage.block);
	}
	
	battler.shadowImage = {
		block: new Sprite(),
		box: TetrisManager.data[type][rotation]
	}
	
	battler.shadowImage.block.bitmap = bitmap;
	battler.shadowImage.block.scale.x = battler.scaleX;
	battler.shadowImage.block.scale.y = battler.scaleY;
	battler.shadowImage.block.x = x;
	battler.shadowImage.block.y = y;
	
	while (!TetrisManager.collide(battler, battler.shadowImage)){
		battler.shadowImage.block.y += battler.yrange;
	}
	this.addChild(battler.shadowImage.block);
}

Scene_Tetris.prototype.AttAck = function (source, target, damage) {
	if (target.category == "enemy") {
		var finaldamage = 3 * (damage) - 2 * (target.Def)
		if (finaldamage >= 0) {
			target.curHp -= finaldamage;
		}
		var pop = new PopNumber(new FNumber(finaldamage, 7));
		this.addChild(pop)
		pop.move(target.xposition + 5 * target.xrange, target.yposition + 10 * target.yrange);
		pop.activate();
		this.createXYanimationWindow(1, target.xposition + 5 * target.xrange, target.yposition + 12 * target.yrange);
	} else {
		var finaldamage = 3 * (damage) - 2 * (target.Def)
		if (finaldamage >= 0) {
			target.Hp -= finaldamage
		}
		var pop = new PopNumber(new FNumber(finaldamage, 7));
		this.addChild(pop)
		pop.move(135, 350)
		pop.activate();
		this.createXYanimationWindow(1, target.xposition - 125, target.yposition + 200);
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
	this.createPlayerWindows();
	this.createEnemyWindows();
	this.createBox(this.player);
	this.refreshNextWindows();
	this.drawArea(this.player);

	this.say('按确认键开始游戏', 200);
	for (var i in this.enemies) {
		this.createBox(this.enemies[i])
	}

	this.refreshScoreBoard();
	//if (!$gameSystem._drill_sprite_backgrounds_visible) { $gameSystem.drill_backgroundVisibleInit(); }
	//$gameSystem._drill_sprite_backgrounds_visible[0] = false;
	//if (!$gameSystem._drill_sprite_backgrounds_visible) { $gameSystem.drill_backgroundVisibleInit(); }
	//$gameSystem._drill_sprite_backgrounds_visible[1] = false;

	//if (!$gameSystem._drill_sprite_backgrounds_visible) { $gameSystem.drill_backgroundVisibleInit(); }
	//$gameSystem._drill_sprite_backgrounds_visible[5] = true;
	//if (!$gameSystem._drill_sprite_backgrounds_visible) { $gameSystem.drill_backgroundVisibleInit(); }
	//$gameSystem._drill_sprite_backgrounds_visible[6] = true;
}

Scene_Tetris.prototype.createPlayerWindows = function () {
	this.holdWindow = new Tetris_Window(this.player.xposition - 132, this.player.yposition-5, 120, 120);
	this.holdWindow.drawText("HOLD", 12, -10);
	this.player.holdWindow = this.holdWindow;

	this.refreshPlayerWindow();
	
	this.player.pictureBoard.move(0, 100, 400, 624);
	this.player.pictureBoard.removeChildAt(0);
	this.player.pictureBoard.addChild(this.player.picture);

	this.playerGaugeBoard = new Tetris_Window(0, 500, 500, 200);
	this.playerGaugeBoard.padding = 0;
	this.playerGaugeBoard.removeChildAt(0);

	this.SkillBoard = new Tetris_Window(10, 550, 500, 200);
	this.SkillBoard.removeChildAt(0)
	this.SkillBoard.addChild(this.SkillButtonOne);

	this.addWindow(this.player.pictureBoard);
	this.addWindow(this.playerGaugeBoard);
	this.addWindow(this.player.holdWindow);
	this.addWindow(this.SkillBoard);
	this.addWindow(this.playerMainWindow);

	for (var i = 0; i < 6; i++) {
		this.nextWindows.push(new Tetris_Window(this.player.xposition + this.ROW * this.player.xrange + 47, this.player.yposition - 5 + 90 * i, 120, 90));
	}
	this.player.nextWindows = this.nextWindows;
	for (var i = 0; i < 6; i++) {
		this.addWindow(this.player.nextWindows[i]);
	}
	this.refreshPlayerGauge();


}

Scene_Tetris.prototype.createEnemyWindows = function () {
	for (var i = 0; i < this.enemies.length; i++) {
		var CurEnemy = this.enemies[i];
		
		CurEnemy.gaugeWindow = new Tetris_Window(CurEnemy.xposition-30, CurEnemy.yposition-68, this.ROW * CurEnemy.xrange+80, 48);
		CurEnemy.avatar.bitmap = ImageManager.loadPicture("enemies\\" + CurEnemy.avatarName);
		CurEnemy.gaugeWindow.addChild(CurEnemy.avatar);
		CurEnemy.avatar.move(0,0)
		this.refreshEnemyWindow(CurEnemy);
		this.addWindow(CurEnemy.gaugeWindow);
		this.refreshEnemyHPGauge(i)
	}
}

Scene_Tetris.prototype.refreshPlayerGauge = function(){
	this.playerGaugeBoard.contents.clear();
	var rate = this.player.displayHp / this.player.Mhp;
	this.playerGaugeBoard.drawThinGauge(10, -12, 360, rate, 20, this.playerGaugeBoard.hpGaugeColor1(), this.playerGaugeBoard.hpGaugeColor2());
	this.playerGaugeBoard.drawThinGauge(10, 10, 340, 0, 10, this.playerGaugeBoard.mpGaugeColor1(), this.playerGaugeBoard.mpGaugeColor2())

	if (!this.player_hp_number) {
		this.player_hp_number = new FNumber(this.player.displayHp, 7);
		this.player_hp_number.changeDirection("left");
		this.playerGaugeBoard.addChild(this.player_hp_number);
		this.player_hp_number.move(320, -14);
	} else {
		this.player_hp_number.change(this.player.displayHp)
	}
}

Scene_Tetris.prototype.refreshPlayerWindow = function () {
	this.removeWindow(this.playerMainWindow);
	this.playerMainWindow = new Tetris_Window(this.player.xposition - 15, this.player.yposition - 27, this.ROW * this.player.xrange + 65, this.COL * this.player.yrange);
	this.playerMainWindow.drawVerticalGauge(265, 10, 10, this.COL * this.player.yrange, this.player.gaugeSCORE / this.player.AtkFreq, this.playerMainWindow.hpGaugeColor1(), this.playerMainWindow.hpGaugeColor1());
	for (var i = 0; i <= this.ROW; i++) {
		this.playerMainWindow.contents.drawLine(i * this.player.xrange + 5, 0, i * this.player.xrange + 5, this.COL * this.player.yrange - 40);
	}
	for (var i = 0; i <= this.COL; i++) {
		this.playerMainWindow.contents.drawLine(4, i * this.player.yrange - 14, this.ROW * this.player.yrange + 4, i * this.player.yrange - 14);
	}
	this.addWindow(this.playerMainWindow);
}

Scene_Tetris.prototype.refreshScoreBoard = function () {
	this.removeChild(this.ScoreBoard);
	this.ScoreBoard = new FNumber(this.player.SCORE, 9);
	this.ScoreBoard.changeDirection("left")
	this.ScoreBoard.move(this.player.xposition + this.ROW * this.player.xrange, this.COL * this.player.yrange - 15);
	this.addChild(this.ScoreBoard)
}

Scene_Tetris.prototype.refreshEnemyWindow = function (enemy) {
	this.removeWindow(enemy.mainWindow);
	enemy.mainWindow = new Tetris_Window(enemy.xposition - 15, enemy.yposition - 28, this.ROW * enemy.xrange + 65, this.COL * enemy.yrange + 24)
	enemy.mainWindow.drawVerticalGauge(this.ROW * enemy.xrange+12, 0, 10, this.COL * enemy.yrange, enemy.curEng / enemy.MEng, enemy.mainWindow.hpGaugeColor1(), enemy.mainWindow.hpGaugeColor1());
	for (var j = 0; j <= this.ROW; j++) {
		enemy.mainWindow.contents.drawLine(j * enemy.xrange + 5, 0, j * enemy.xrange + 5, this.COL * enemy.yrange);
	}
	for (var j = 0; j <= this.COL; j++) {
		enemy.mainWindow.contents.drawLine(4, j * enemy.yrange - 14, this.ROW * enemy.yrange + 4, j * enemy.yrange - 14);
	}
	this.addWindow(enemy.mainWindow);
	this.addWindow(enemy.gaugeWindow);
}

Scene_Tetris.prototype.refreshEnemyHPGauge = function (enemyid) {
	var CurEnemy = this.enemies[enemyid]
	CurEnemy.gaugeWindow.contents.clear();
	rate = CurEnemy.displayHp / CurEnemy.Mhp;
	//if (this.multiple) {
	//	barHeight = 10
	//} else {
	//	barHeight = 20
	//}
	CurEnemy.gaugeWindow.drawThinGauge(36, -24, this.ROW * CurEnemy.xrange, rate, 12, CurEnemy.gaugeWindow.hpGaugeColor1(), CurEnemy.gaugeWindow.hpGaugeColor1());
}

Scene_Tetris.prototype.refreshNextWindows = function () {
	for (var i in this.player.next) {
		this.player.next[i].block.x = this.calPositionX(this.player.next[i]);
		this.player.next[i].block.y = 25;
		this.player.nextWindows[i].addChild(this.player.next[i].block);
	}
}

Scene_Tetris.prototype.refreshCombo = function (battler) {
	if (battler.Count_Combos > 0) {
		if (battler.comboX) {
			this.removeChild(battler.comboX)
		}
		battler.comboX = new ComboSprite(battler.Count_Combos);
		battler.comboX.scale.x = battler.scaleX;
		battler.comboX.scale.y = battler.scaleY;
		battler.comboX.move(battler.xposition - 100 * battler.scaleX, battler.yposition + 100 * battler.scaleY);
		this.addChild(battler.comboX)
	} else {
		if (battler.comboX) {
			battler.comboX.deactivate();
        }
    }
}

Scene_Tetris.prototype.say = function (txt, duration) {
	this.removeChild(this.NoticeBox);
	this.NoticeBox = new Notice_Widnow(duration);
	this.NoticeBox.drawText(txt, 0, 0);
	this.addWindow(this.NoticeBox);
}

Scene_Tetris.prototype.createAfterMath = function () {
	var info = {};
	info.score = this.player.SCORE;
	info.combo = TetrisManager.curhighestCombo;
	info.LPM = TetrisManager.curhighestLPM;
	info.APM = TetrisManager.curhighestAPM;
	this.AfterMathWindow = new AfterMath_Window(info);
	this.addChild(this.AfterMathWindow);
}

Scene_Tetris.prototype.diminishBlocks = function () {
	//var speed = 2;
	//this.player.cur.block.opacity -= speed;
	//this.player.shadowImage.block.opacity -= speed;
	//if (this.enemies) {
	//	for (var i = 0; i < this.enemies.length; i++) {
	//		this.enemies[i].cur.block.opacity -= speed;
	//		this.enemies[i].shadowImage.block.opacity -= speed;
	//	}
	//}
	//if (this.comboX) {
	//	this.comboX.opacity -= speed;
 //   }
	//this.ScoreBoard.opacity -= speed;
}

function tetris_start() {
	SceneManager.push(Scene_Tetris);
}