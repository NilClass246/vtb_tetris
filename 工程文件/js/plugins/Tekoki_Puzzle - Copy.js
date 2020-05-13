//=============================================================================
// Tekoki_Puzzle.js v0.3
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
// ** 教程场景定义
//=============================================================================

function Scene_Puzzle() {
	this.initialize.apply(this, arguments);
}

Scene_Puzzle.prototype = Object.create(Scene_Tetris.prototype);
Scene_Puzzle.prototype.constructor = Scene_Puzzle;

Scene_Puzzle.prototype.initialize = function () {
	Scene_ItemBase.prototype.initialize.call(this);
	this.initializeData();
	this.initializeActor();
	this.loadKeyMapper();
	this.loadBlockSkin();
}

Scene_Puzzle.prototype.initializeActor = function () {
	this.player = {
		category: "player",
		xposition: 425,
		yposition: 27,
		xrange: 25,
		yrange: 25,

		step: 50,
		field: new Array(this.COL - 1),
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

		delay_reset_times: 15,

		scaleX: 1,
		scaleY: 1,
		Count_Combos: -1
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
	//	[0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
	//	[0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
	//	[1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
	//	[1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
	//]
	this.player.exceeded = false;
	this.player.Count_Combos = 1;
	this.refreshCombo(this.player);
	this.player.Count_Combos = -1;
	this.refreshCombo(this.player);
}

Scene_Puzzle.prototype.initializeData = function () {
	this.ROW = TetrisManager.ROW;
	this.COL = TetrisManager.COL;
	this.running = false;
	this.gameover = false;

	this.seTick = {
		name: "Click",
		pan: 0,
		pitch: 50,
		volume: 150
	}
	this.seBoom = {
		name: "Boom",
		pan: 0,
		pitch: 50,
		volume: 150
	}

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

	TetrisManager.Count_Blocks = 0;
	TetrisManager.Count_Buttons = 0;
	TetrisManager.Count_Lines = 0;
	TetrisManager.curhighestCombo = 0;
}

Scene_Puzzle.prototype.update = function () {
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
				Scene_Tetris.prototype.drawArea.call(this, this.player);
				Scene_Tetris.prototype.shadow.call(this, this.player);
				this.running = true;
			}
		}
	}
	if (this.AfterMathWindow) {
		this.diminishBlocks();
	}
	if (this.running) {
		this.update_Actor();
		this.puzzleInfo.update(this.player.SCORE);
		this.isGameOver();
	}
}

Scene_Puzzle.prototype.isGameOver = function () {
	if (this.player.Hp <= 0 || this.player.exceeded) {
		AudioManager.playSe(this.seBoom);
		this.running = false;
		this.gameover = true;
		$gameSwitches.setValue(20, false);
		var msg = new Target_Window("越界！");
		this.addChild(msg);
	}

	if (this.puzzleInfo.isEnded()) {
		AudioManager.playSe(this.seBoom);
		this.running = false;
		this.gameover = true;
		$gameSwitches.setValue(20, true);
    }
}

Scene_Puzzle.prototype.update_Actor = function () {

	if (Input.isTriggered('right')) {
		TetrisManager.Count_Buttons += 1;
		if (this.bMove(this.player, 1)) {
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
		if (this.bMove(this.player, -1)) {
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
		this.rotateBox(this.player, 1);
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
	} else {
		this.player.step = 50;
	}

	if (this.player.cur.block.y < this.yposition) {
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
			this.refreshScoreBoard();
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

	TetrisManager.curhighestLPM = TetrisManager.Count_Lines / (TetrisManager.getElapsedTime() / 60);
	TetrisManager.curhighestAPM = TetrisManager.Count_Buttons / (TetrisManager.getElapsedTime() / 60);
}

Scene_Puzzle.prototype.create = function () {
	Scene_ItemBase.prototype.create.call(this);
	this.puzzleInfo = new Puzzle_Manager(2);
	this.puzzleInfo.create();
	this.createPlayerWindows();

	TspinPopup = new Sprite();
	TspinPopup.bitmap = ImageManager.loadPicture('tspin');
	this.TspinPopup = new PopNumber(TspinPopup);
	this.TspinPopup.x = this.player.xposition + 65;
	this.TspinPopup.y = this.player.yposition + 75;
	this.addChild(this.TspinPopup);

	this.createBox(this.player);
	this.shadow(this.player);
	this.refreshScoreBoard();
	this.drawArea(this.player);
}

Scene_Puzzle.prototype.createPlayerWindows = function () {
	this.holdWindow = new Tetris_Window(this.player.xposition - 132, this.player.yposition - 5, 120, 120);
	this.holdWindow.drawText("HOLD", 12, -10);
	this.player.holdWindow = this.holdWindow;
	this.addWindow(this.player.holdWindow);

	for (i = 0; i < 6; i++) {
		this.nextWindows.push(new Tetris_Window(this.player.xposition + this.ROW * this.player.xrange + 47, this.player.yposition - 5 + 90 * i, 120, 90));
	}
	this.player.nextWindows = this.nextWindows;
	for (i = 0; i < 6; i++) {
		this.addWindow(this.player.nextWindows[i]);
	}
	this.refreshPlayerWindow();
}

Scene_Puzzle.prototype.refreshPlayerWindow = function(){
	this.removeWindow(this.playerMainWindow);
	this.playerMainWindow = new Tetris_Window(this.player.xposition - 15, this.player.yposition - 27, this.ROW * this.player.xrange + 65, this.COL * this.player.yrange);
	for (i = 0; i <= this.ROW; i++) {
		this.playerMainWindow.contents.drawLine(i * this.player.xrange + 5, 0, i * this.player.xrange + 5, this.COL * this.player.yrange - 40);
	}
	for (i = 0; i <= this.COL; i++) {
		this.playerMainWindow.contents.drawLine(4, i * this.player.yrange - 14, this.ROW * this.player.yrange + 4, i * this.player.yrange - 14);
	}
	this.addWindow(this.playerMainWindow);
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