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
 * 存储数据的插件。
 * 目前还在测试阶段。
 * meameasuki！
 */
 
var EmptySlot = [];

var TwoSlimes = [
	{
		name: "Slime",
		category: "enemy",
		xposition: 816,
		yposition: 84,
		assumeYpos: 84,
		avatar: new Sprite(),
		avatarName: "Slime_Avatar",

		Level: 1,
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

		Level: 1,
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

		Level: 3,
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

		Level: 3,
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

		Level: 3,
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

		Level: 3,
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
	EmptySlot,
	TwoSlimes,
	FourKnights
]

TetrisManager.skill_List = {
	"剑": {
		name: "剑",
		pic: "剑",
		running: false,
		description: "T旋之魂\n将接下来的方块全部替换为T块",
		MakeEffect: function () {
			this.running = true
			var player = SceneManager._scene.getPlayer();
			this.SpinBoxes = []
			var sx = 125;
			var sy = 500;
			for (var i = 0; i < player.nextWindows.length; i++) {
				var s = new SpinningBox(player.nextWindows[i].x - sx + 25, player.nextWindows[i].y - sy + 25);

				s.move(sx, sy)
				this.SpinBoxes.push(s);
				SceneManager._scene._blockLayer.addChild(this.SpinBoxes[this.SpinBoxes.length-1])
            }
		},
		isCompleted: function () {
			if (this.SpinBoxes[this.SpinBoxes.length-1].isCompleted()) {
				return true;
            }
		},
		Finish: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer();
			for (var i = 0; i < player.next.length; i++) {
				player.next[i] = {
					block: new Sprite(),
					type: 't',
					rotation: 0,
					rotationTime: 0,
					box: TetrisManager.data['t'][0].slice()
				}
				player.next[i].block.bitmap = scene._minoSkin['t'][0];
				player.next[i].block.scale.x = player.scaleX;
				player.next[i].block.scale.y = player.scaleY;
			}
			scene.refreshNextWindows();
			SoundManager.playOk();
			SceneManager._scene.closePauseScreen();
			SceneManager._scene.beginRunning();
			this.running = false;
		},
		Reset: function () {
			this.SpinBox = null;
			this.running = false;
		}
	}
}