//=============================================================================
// Tekoki_Puzzle.js v0.3
//=============================================================================

/*:
 * @plugindesc [v0.3] 俄罗斯方块解密界面
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

TetrisManager = TetrisManager || {};
TetrisManager.puzzleID = 2;

//=============================================================================
// ** 教程场景定义
//=============================================================================

function Scene_Puzzle() {
	this.initialize.apply(this, arguments);
}

Scene_Puzzle.prototype = Object.create(Scene_Tetris.prototype);
Scene_Puzzle.prototype.constructor = Scene_Puzzle;

Scene_Puzzle.prototype.initialize = function () {
	Scene_ItemBase.prototype.initialize.call(this);
	this.actorNum = $gameVariables.value(32);
	this.initializeData();
	this.loadKeyMapper();
	this.initializeActor();
	this.loadBlockSkin();
	window.onblur = function () {
		if (SceneManager._scene.Pause) {
			SceneManager._scene.Pause();
		}
	};
	this.spawnNext = true;
}

Scene_Puzzle.prototype.initializeActor = function () {
	this.actor = $gameActors.actor(this.actorNum)

	this.player = {
		actor: $gameActors.actor(this.actorNum),
		running: true,
		category: "player",
		xposition: 425,
		yposition: 27,
		xrange: 25,
		yrange: 25,

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

		scaleX: 1,
		scaleY: 1,
		Count_Combos: -1,

		lastBack: false,
		gauge_pos: [],

		lastKick: false,
		holded: false,
		merged: false,

		MovingToRight: null,
		MadeLeftInitialMove: false,
		MadeRightInitialMove: false,

		mergeTrembleCount: 0,
		rotated: false
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
	//	[0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	//	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
	//	[1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
	//	[1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	//]
	this.player.exceeded = false;
}

Scene_Puzzle.prototype.initializeData = function () {
	this.ROW = TetrisManager.ROW;
	this.COL = TetrisManager.COL;
	this.running = false;
	this.gameover = false;
	this.step = 50;

	this.seTick = {
		name: "Click",
		pan: 0,
		pitch: 50,
		volume: 50
	}
	this.seBoom = {
		name: "Boom",
		pan: 0,
		pitch: 50,
		volume: 50
	}

	//this.arr_delay = $gameVariables.value(3);
	this.arr_delay = ConfigManager.ARRDelay
	//this.das_dalay = $gameVariables.value(2);
	this.das_dalay = ConfigManager.DASDelay
	//this.soft_drop_speed = $gameVariables.value(4);
	this.soft_drop_speed = Math.round(this.step / ConfigManager.SoftSpeed);
	this.das_delay_count_right = 0;
	this.das_delay_count_left = 0;

	this.arr_delay_count = 0;

	this.nextWindows = [];

	this.lastKick = false;
	this.isWaitingCloseUp = false;
	this.holded = false;
	this.merged = false;

	TetrisManager.Count_Blocks = 0;
	TetrisManager.Count_Buttons = 0;
	TetrisManager.Count_Lines = 0;
	TetrisManager.Count_Tspin
	TetrisManager.curhighestCombo = 0;

	this.layed = false;
	this.ExItIng = false;

	this.BeginClock = 150;
	this.FirstBegin = false;

	this.nextNumber = 6;

	this.windowTrembling = ConfigManager.Trembling;
}

Scene_Puzzle.prototype.update = function () {
	Scene_MenuBase.prototype.update.call(this);
	if (!this.layed) {
		this.layed = true;
	} else {
		if (this.BeginClock > 0) {
			this.BeginClock -= 1;
		} else {
			this.startGame();
		}

		if (this.gameover&&this.puzzleInfo.end && this.puzzleInfo.end.completed && !this.AfterMathWindow) {
			this.createAfterMath();
		}
		if (Input.isTriggered('ok') || TouchInput.isPressed()) {
			if (this.AfterMathWindow) {
					this.endGame();
			}
		}

		this.update_Animation();
		if (this.running) {
			this.update_Actor();
			this.isGameOver();
		}
		if (this.puzzleInfo.isEnded()&&!this.gameover) {
			this.running = false;
			this.gameover = true;
		}
		this.puzzleInfo.update(this.player.SCORE);
		if (Input.isTriggered('ok') || Input.isTriggered('cancel') || Input.isTriggered('menu') || TouchInput.isPressed()) {
			if (this._isPaused && !this.isPausedThisTurn) {
				this.Continue();
			}
		}
		this.isPausedThisTurn = false;
    }
}

Scene_Puzzle.prototype.update_Animation = function () {
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

Scene_Puzzle.prototype.startGame = function () {

	if (!this.running && !this.gameover && !this.FirstBegin && this.layed) {
		this.FirstBegin = true;
		TetrisManager.setTimer();
		AudioManager.playSe(this.seTick);
		this.drawArea(this.player);
		this.shadow(this.player);
		this.running = true;
		this.eliminateBUGs(this.player);
	}
}

Scene_Puzzle.prototype.endGame = function () {
	if (this.AfterMathWindow.isLayed() && !this.ExItIng) {
		//window.onblur = function () { };
		this.onEnd();
		this.ExItIng = true;
		this.startFadeOut(60, false);
		this.unloadKeyMapper();
		$gameVariables.setValue(6, this.player.SCORE);

		TetrisManager.desetTimer();
		SceneManager.pop(Scene_Tetris);
		Scene_Tetris.prototype.onEnd = function () {
		}
	}
}

Scene_Puzzle.prototype.isGameOver = function () {
	if (this.player.exceeded) {
		this.running = false;
		this.gameover = true;
		this.crossedBorder = true;
	}

	if (this.puzzleInfo.isEnded()) {
		this.running = false;
		this.gameover = true;
    }
}

Scene_Puzzle.prototype.update_Actor = function () {
	if (Input.isTriggered('cancel') || Input.isTriggered('menu')) {
		if (!this._isPaused && !this.isPausedThisTurn) {
			this.Pause();
		}
	}

	this.update_Movement(this.player);

	this.player.n += 1
	if (this.player.n >= this.player.step) {

		if (TetrisManager.collide(this.player, this.player.cur)) {
			AudioManager.playSe(this.seTick)
			this.mergeBox(this.player);
			TetrisManager.Count_Blocks += 1;
			this.refreshScoreBoard(this.player);
			this.removeFromMainWindow(this.player, this.player.cur.block)
			this.player.cur = null;
			this.lastKick = false;
			this.createBox(this.player);
			if (this.player.cur) {
				this.shadow(this.player);
            }
			this.drawArea(this.player);
			this.player.holded = false;
			this.player.delay_reset_times = 15;
		} else {
			this.player.cur.block.y += this.player.yrange;
			this.lastKick = false;
		}

		this.player.n = 0;
	}
	//TODO: 双人模式
	//TODO：TouchInput卡键修复
	TetrisManager.curhighestLPM = TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60);
	TetrisManager.curhighestKPM = TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60);
}

Scene_Puzzle.prototype.create = function () {
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
	this.puzzleInfo = new Puzzle_Manager(TetrisManager.puzzleID);
	this.puzzleInfo.create();
	this.createPlayerWindows();

	TspinPopup = new Sprite();
	TspinPopup.bitmap = ImageManager.loadPicture('tspin');
	this.TspinPopup = new PopNumber(TspinPopup);
	this.TspinPopup.x = this.player.xposition + 65;
	this.TspinPopup.y = this.player.yposition + 75;
	this._blockLayer.addChild(this.TspinPopup);

	this.createBox(this.player);
	this.shadow(this.player);
	this.refreshScoreBoard(this.player);
	this.drawArea(this.player);
	this.refreshNextWindows(this.player);

	this.eliminateBUGs(this.player);
}

Scene_Puzzle.prototype.createPlayerWindows = function () {
	this.player.holdWindow = new Tetris_Window(this.player.xposition - 140, this.player.yposition + TetrisManager.AboveLines*this.player.yrange - 5, 120, 120);
	this.player.holdWindow.drawText("HOLD", 12, -10);

	this.refreshPlayerWindow(this.player);

	this.addWindow(this.player.holdWindow);

	for (i = 0; i < 6; i++) {
		this.nextWindows.push(new Tetris_Window(this.player.xposition + this.ROW * this.player.xrange + 40, this.player.yposition + TetrisManager.AboveLines * this.player.yrange - 5 + 90 * i, 120, 90));
	}
	this.player.nextWindows = this.nextWindows;
	for (i = 0; i < 6; i++) {
		this.addWindow(this.player.nextWindows[i]);
	}
	this.scoreText = new Sprite(ImageManager.loadPicture("ui//score"));
	this.scoreText.move(this.player.xposition + this.ROW * this.player.xrange + 45, (this.COL - TetrisManager.AboveLines) * this.player.yrange - 15)
	this._blockLayer.addChild(this.scoreText);
	this.refreshScoreBoard(this.player);
}

Scene_Puzzle.prototype.refreshPlayerWindow = function (operator) {

	this.removeWindow(operator.mainwindow);
	operator.mainwindow = new Tetris_Window(operator.xposition - 15 - 7,
		operator.yposition + TetrisManager.AboveLines * operator.yrange - 27,
		this.ROW * operator.xrange + 65,
		(this.COL - TetrisManager.AboveLines) * operator.yrange);
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

function puzzle_start() {
	SceneManager.push(Scene_Puzzle);
}

//=============================================================================
// ** 转场场景定义
//=============================================================================

function Scene_Trans() {
	this.initialize.apply(this, arguments);
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
	//switch (this.puzzleID) {
	//	case 1:
	//		this.scene.addEmphasizer(
	//			"{Prologue_inbattle_2_1}"
	//			, 100, 312, 0, 0);
	//		this.scene.addEmphasizer(
	//			"{Prologue_inbattle_2_2}"
	//			, 100, 312, 0, 0);
	//		break;
	//	case 2:
	//		this.timeLimit = $gameVariables.value(11);
	//		this.targetBoard = new Target_Window("在" + this.timeLimit + "秒内获取尽量多的分数！")
	//		this.scene.addChild(this.targetBoard);

	//		this.CheckBoard = new Tetris_Window(0, 0, 300, 300);
	//		this.CheckBoard.contents.fontSize = 18;
	//		this.CheckBoard.removeChildAt(0)
	//		this.EasyCheck = new CheckBox();
	//		this.CheckBoard.addChild(this.EasyCheck);
	//		this.EasyCheck.move(15, 21);
	//		this.CheckBoard.drawText("Easy: " + $gameVariables.value(7) + "分", 28, 0);
	//		this.NormalCheck = new CheckBox();
	//		this.CheckBoard.addChild(this.NormalCheck)
	//		this.NormalCheck.move(15, 49)
	//		this.CheckBoard.drawText("Normal: " + $gameVariables.value(8) + "分", 28, 28);
	//		this.HardCheck = new CheckBox();
	//		this.CheckBoard.addChild(this.HardCheck);
	//		this.HardCheck.move(15, 77)
	//		this.CheckBoard.drawText("Hard: " + $gameVariables.value(9) + "分", 28, 56);
	//		this.LunaticCheck = new CheckBox();
	//		this.CheckBoard.addChild(this.LunaticCheck);
	//		this.LunaticCheck.move(15, 105);
	//		this.CheckBoard.drawText("Lunatic: " + $gameVariables.value(10) + "分", 28, 84);

	//		this.scene.addChild(this.CheckBoard);

	//		this.infoBoard = new Tetris_Window(278, 142, 200, 500);
	//		this.infoBoard.contents.fontSize = 18;
	//		this.infoBoard.removeChildAt(0)
	//		this.infoBoard.drawText(
	//			"Time Left ", 0, 0)
	//		this.infoBoard.drawText(
	//			TetrisManager.keepTwoDigits(this.timeLimit - TetrisManager.getElapsedTime()) + "sec",
	//			20, 25)
	//		this.infoBoard.drawText(
	//			"LPM " + TetrisManager.keepTwoDigits(TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60)),
	//			0, 310)
	//		this.infoBoard.drawText(
	//			"KPM " + TetrisManager.keepTwoDigits(TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60)),
	//			0, 335)

	//		this.scene.addWindow(this.infoBoard);
	//		this.ProgressBar = new VerticalProgressBar(50);
	//		this.ProgressBar.move(75, 80);
	//		this.infoBoard.addChild(this.ProgressBar);
	//		this.ProgressBar.addPhase($gameVariables.value(10), "ui\\LunaticBar")
	//		this.ProgressBar.addPhase($gameVariables.value(9), "ui\\HardBar")
	//		this.ProgressBar.addPhase($gameVariables.value(8), "ui\\NormalBar")
	//		this.ProgressBar.addPhase($gameVariables.value(7), "ui\\EasyBar")
	//		break;
	//}

	if (this.puzzleID == 3) {
		this.scene.player.field = [
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
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[10, 10, 10, 10, 10, 0, 10, 10, 10, 10],
			[10, 10, 10, 10, 0, 0, 10, 10, 10, 10],
			[10, 10, 10, 10, 0, 0, 0, 10, 10, 10],
			[10, 10, 10, 0, 0, 0, 0, 10, 10, 10],
			[10, 10, 10, 0, 0, 10, 0, 0, 10, 10],
			[10, 10, 0, 0, 10, 10, 0, 0, 10, 10],
			[10, 10, 0, 0, 10, 10, 10, 0, 0, 10],
			[10, 0, 0, 10, 10, 10, 10, 0, 0, 10],
			[10, 0, 0, 10, 10, 10, 10, 10, 0, 0],
			[0, 0, 10, 10, 10, 10, 10, 10, 0, 0],
			[0, 0, 10, 10, 10, 10, 10, 10, 10, 0],
			[0, 10, 10, 10, 10, 10, 10, 10, 10, 0],
			[0, 10, 10, 10, 10, 10, 10, 10, 10, 10],
		]
		this.scene.spawnNext = false;
		for (var i = 0; i < 12; i++) {
			this.scene.player.next[i] = {
				block: new Sprite(this.scene._minoSkin['1'][0]),
				type: '1',
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.data['1'][0].slice()
			}
		}
		this.targetBoard = new Target_Window("{Prologue_puzzle_1_inst}");
		this.scene.addChild(this.targetBoard);
	}

	if (this.puzzleID == 4) {
		this.scene.player.field = [
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
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 10, 10, 0, 0, 0],
			[10, 10, 10, 0, 0, 0, 10, 10, 10, 10],
			[10, 10, 10, 10, 0, 10, 10, 10, 10, 10],
			[10, 10, 10, 0, 0, 0, 10, 10, 10, 10],
			[10, 10, 10, 10, 0, 10, 10, 10, 10, 10],
			[10, 10, 10, 0, 0, 0, 10, 10, 10, 10],
			[10, 10, 10, 10, 0, 10, 10, 10, 10, 10],
			[10, 10, 10, 0, 0, 0, 10, 10, 10, 10],
			[10, 10, 10, 10, 0, 10, 10, 10, 10, 10],
			[10, 10, 10, 0, 0, 0, 10, 10, 10, 10],
			[10, 10, 10, 10, 0, 10, 10, 10, 10, 10],
		]
		this.scene.spawnNext = false;
		for (var i = 0; i < 5; i++) {
			this.scene.player.next[i] = {
				block: new Sprite(this.scene._minoSkin['t'][0]),
				type: 't',
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.data['t'][0].slice()
			}
		}
		this.targetBoard = new Target_Window("{Prologue_puzzle_1_inst}");
		this.scene.addChild(this.targetBoard);
    }
}

Puzzle_Manager.prototype.update = function (score) {
	//switch (this.puzzleID) {
	//	case 1:
	//		break;
	//	case 2:
	//		if (this.victory) {
	//			this.end = new Target_Window("{Time_up}");
	//			this.scene.addChild(this.end);
	//		} else {
	//			this.infoBoard.refresh()
	//			this.infoBoard.drawText(
	//				"Time Left ", 0, 0)
	//			this.infoBoard.drawText(
	//				TetrisManager.keepTwoDigits(this.timeLimit - TetrisManager.getElapsedTime()) + "sec",
	//				20, 25)
	//			this.infoBoard.drawText(
	//				"LPM " + TetrisManager.keepTwoDigits(TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60)),
	//				0, 310)
	//			this.infoBoard.drawText(
	//				"KPM " + TetrisManager.keepTwoDigits(TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60)),
	//				0, 335)
	//			this.ProgressBar.changeNumber(score)
	//			this.EasyCheck.ChEck();
	//			if (score >= $gameVariables.value(8)) {
	//				this.NormalCheck.ChEck();
	//				if (score >= $gameVariables.value(9)) {
	//					this.HardCheck.ChEck();
	//					if (score >= $gameVariables.value(10)) {
	//						this.LunaticCheck.ChEck();
	//					}
	//				}
	//			}
	//		}

	//		if (this.timeLimit - TetrisManager.getElapsedTime() <= 0) {
	//			this.victory = true;
	//		}
	//		break;
	//}

	if (this.puzzleID == 3) {
		if (!this.victory) {
			if (TetrisManager.checkEmpty2Darray(this.scene.player.field)) {
				$gameSwitches.setValue(20, true);
				this.end = new Target_Window("{Prologue_puzzle_1_end}");
				this.scene.addChild(this.end);
				this.victory = true;
			} else {
				if (!this.scene.player.next[0]||this.scene.crossedBorder) {
					$gameSwitches.setValue(20, false);
					this.end = new Target_Window("{Prologue_puzzle_1_noend}");
					this.scene.addChild(this.end);
					this.victory = true;
				}
			}
        }
	}

	if (this.puzzleID == 4) {
		if (!this.victory) {
			if(this.scene.crossedBorder){
					$gameSwitches.setValue(20, false);
					this.end = new Target_Window("{Prologue_puzzle_1_noend}");
					this.scene.addChild(this.end);
					this.victory = true;
			}
			if (!this.scene.player.next[0] && !this.scene.player.cur) {
				if (this.scene.player.field[this.scene.player.field.length - 1].equals([0, 0, 0, 0, 0, 10, 10, 0, 0, 0])) {
					$gameSwitches.setValue(20, true);
					this.end = new Target_Window("{Prologue_puzzle_1_end}");
					this.scene.addChild(this.end);
					this.victory = true;
				} else {
					$gameSwitches.setValue(20, false);
					this.end = new Target_Window("{Prologue_puzzle_1_noend}");
					this.scene.addChild(this.end);
					this.victory = true;
				}
			}
        }
    }
}

Puzzle_Manager.prototype.getElapsedTime = function () {
	return Math.floor((Date.now() - this.startTime) / 10) / 100;
}

Puzzle_Manager.prototype.isEnded = function () {
	return this.victory;
}