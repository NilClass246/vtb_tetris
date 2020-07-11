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

TetrisManager = TetrisManager || {};

TetrisManager.special_List = {
	'matsuri': {
		initialize: function () {
			this.bossID = 0;
		},
		create: function () {
			this.pictureBoard = new Tetris_Window(824, 0, 350, 624);
			this.pictureBoard.removeChildAt(0)
			this.picture = new Sprite();
			this.picture.bitmap = ImageManager.loadPicture('enemies/Matsuri')
			this.pictureBoard.addChild(this.picture);
			SceneManager._scene.addWindow(this.pictureBoard);
			this.skillManager = new SkillManager(['寸劲拳','草'], true);
			this.skillManager._skill_board.move(1010, 550)
			SceneManager._scene._boardLayer.addChild(this.skillManager._skill_board)
		},
		update: function () {
			this.skillManager.update();
			if (this.skillManager._skill_list[0].isPrepared) {
				this.skillManager.startSkill(0);
			}
			if (this.skillManager._skill_list[1].isPrepared) {
				this.skillManager.startSkill(1);
			}
		}
	}
}

TetrisManager.specialBlockData = {
	'grass': [
		[
			[0, 0, 0, 0, 0],
			[0, 2, 0, 2, 0],
			[2, 2, 2, 2, 2],
			[0, 2, 0, 2, 0],
			[2, 2, 2, 2, 2],
			[2, 0, 0, 0, 2],
			[2, 2, 2, 2, 2],
			[2, 0, 0, 0, 2],
			[2, 2, 2, 2, 2],
			[0, 0, 2, 0, 0],
			[2, 2, 2, 2, 2],
			[0, 0, 2, 0, 0],
			[0, 0, 2, 0, 0]
		]
	]
}

var EmptySlot = [];

var TwoSlimes = [
	{
		name: "Slime",
		category: "enemy",
		xposition: 825,
		yposition: 84,
		assumeYpos: 84,
		avatar: new Sprite(),
		avatarName: "Slime_Avatar",
		dx: 420,
		dy: 200,

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
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
		dx: 600,
		dy: 300,

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
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

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
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

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
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

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
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

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,
	}
]

var Enemy99 = [
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 70,
		assumeYpos: 70,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 70,
		assumeYpos: 70,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 70,
		assumeYpos: 70,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 70,
		assumeYpos: 70,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 178,
		assumeYpos: 178,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 178,
		assumeYpos: 178,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 178,
		assumeYpos: 178,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 178,
		assumeYpos: 178,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 286,
		assumeYpos: 286,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 286,
		assumeYpos: 286,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 286,
		assumeYpos: 286,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 286,
		assumeYpos: 286,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},

]

var TestBoss = [
	{
		name: "Matsuri",
		category: "enemy",
		xposition: 824,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Matsuri_Avatar",

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 1000,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,

		manager: Object.create(TetrisManager.special_List["matsuri"])
	},
]

TetrisManager.enemy_List = [
	EmptySlot,
	TwoSlimes,
	FourKnights,
	Enemy99,
	TestBoss
]

TetrisManager.skill_List = {
	"剑": {
		name: "剑",
		pic: "剑",
		user: "player",
		isPrepared: true,
		oldTime: 0,
		CD: 0,
		description: "T旋之魂\n将接下来的方块全部替换为T块",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var player = SceneManager._scene.getPlayer();
			this.SpinBoxes = []
			var sx = SceneManager._scene.getSkillPosition(this.index)[0];
			var sy = SceneManager._scene.getSkillPosition(this.index)[1];
			for (var i = 0; i < player.nextWindows.length; i++) {
				var s = new SpinningBox(player.nextWindows[i].x - sx + 25, player.nextWindows[i].y - sy + 25);

				s.move(sx, sy)
				this.SpinBoxes.push(s);
				SceneManager._scene._effectLayer.addChild(this.SpinBoxes[this.SpinBoxes.length-1])
			}

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
			scene.refreshNextWindows(player)

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 2;
			this.oldTime = Date.now();
		}
	},
	"咩毒": {
		name: "咩毒",
		pic: "咩毒",
		user: "player",
		isPrepared: true,
		CD: 0,
		description: "测试用技能(中毒)",
		CanUse: function () {
			if (SceneManager._scene.getPlayer().actor.hp > 10) {
				return true
            }
        },
		MakeEffect: function () {
			var Venom = new MeaDoku(this.index);
			SceneManager._scene.addChild(Venom);
		},
		Reset: function () {
			//this.isPrepared = false;
			//this.CD = 0;
			//this.oldTime = Date.now();
        }
    },
	"寸劲拳": {
		name: "寸劲拳",
		pic: "占位测试",
		user: "enemy",
		isPrepared: false,
		CD: 15,
		description: "打打打打打打打打打打！",
		oldTime: Date.now(),
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			this.allHolePositions = [
				[4, 38],[5, 38],
				[3, 37], [4, 37], [5, 37], [6, 37],
				[2, 36], [3, 36], [4, 36], [5, 36], [6, 36], [7, 36],
				[2, 35], [3, 35], [4, 35], [5, 35], [6, 35], [7, 35],
				[2, 34], [3, 34], [4, 34], [5, 34], [6, 34], [7, 34],
				[3, 33], [4, 33], [5, 33], [6, 33],
				[4, 32], [5, 32]
			]
			for (var i = 0; i < this.allHolePositions.length; i++) {
				scene.getPlayer().field[this.allHolePositions[i][1]][this.allHolePositions[i][0]] = 0;
			}
			scene.drawArea(scene.getPlayer())
			scene.shadow(scene.getPlayer());
			scene.createXYanimationWindow(1,
				scene.getPlayer().xposition + 5 * scene.getPlayer().xrange,
				scene.getPlayer().yposition + TetrisManager.AboveLines * scene.getPlayer().yrange + 20 * scene.getPlayer().yrange
			);
		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 15;
			this.oldTime = Date.now();
		}
	},
	"草": {
		name: "草",
		pic: "占位测试",
		user: "enemy",
		isPrepared: false,
		CD: 30,
		description: "wwwwwwwww",
		oldTime: Date.now(),
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer();
			player.next[0] = {
				block: new Sprite(),
				type: 'grass',
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.specialBlockData['grass'][0].slice(),
				renderPos: 2,
				noRotate: true
			}

			player.next[0].block.bitmap = ImageManager.loadPicture('blockSkin/special/grass');
			player.next[0].block.scale.x = player.scaleX;
			player.next[0].block.scale.y = player.scaleY;
			scene.refreshNextWindows(player)

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 30;
			this.oldTime = Date.now();
		}
	},
	"战术嘲讽": {
		name: "战术嘲讽",
		pic: "占位测试",
		user: "player",
		isPrepared: true,
		oldTime: 0,
		CD: 0,
		description: "",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 2;
			this.oldTime = Date.now();
		}
	},
}

TetrisManager.state_List = {
	"1": {
		id: 1,
		count: 0,
		type: 'out_battle',
		updated: false,
		onGain: function (owner) {
		},
		update: function () {
		},
		onLose: function () {
		}
    },
	"4": {
		name: '中毒',
		id: 4,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			if (this.owner.category == 'enemy') {
				if (!this.emitter) {
					TetrisManager.pariticleSet['Bubble']["spawnRect"]["w"] = this.owner.xrange * 10 + 65;
					this.emitter = new particleEmitter('Bubble');
					this.emitter.x = this.owner.xposition - 15 - 7;
					if (this.owner.windowHeight_Revision) {
						this.emitter.y = this.owner.assumeYpos + 23 * this.owner.yrange + this.owner.windowHeight_Revision
					} else {
						this.emitter.y = this.owner.assumeYpos + 23 * this.owner.yrange
					}
					SceneManager._scene._effectLayer.addChild(this.emitter)
				} else {
					this.emitter._emitter.emit = true;
				}
				this.owner.avatar.tint = 0xff99ff;
            }
		},
		update: function () {

			if (((Date.now() - this.oldTime) / 1000) > 1) {
				TetrisManager.HarmSystem.dealDamage(null, this.owner, this.count, 'poison')
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(4);
            }
		},
		onLose: function () {
			if (this.owner.category == 'enemy') {
				this.emitter._emitter.emit = false;
				this.owner.avatar.tint = 0xffffff;
			}
		}
	},
	"8": {
		name: '眩晕',
		id: 8,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			if (this.owner.category == "enemy") {
				this.owner.running = false;
			} else {
				SceneManager._scene.getPlayer().running = false;
			}
		},
		update: function () {
			if (((Date.now() - this.oldTime) / 1000) > 1) {
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(8);
			}
		},
		onLose: function () {
			if (this.owner.category == "enemy") {
				this.owner.running = true;
			} else {
				SceneManager._scene.getPlayer().running = true;
			}
		}
	},
	"7": {
		name: '愤怒',
		id: 4,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			if (this.owner.category == 'enemy') {
			}
		},
		update: function () {
			console.log(this.owner)

			if (((Date.now() - this.oldTime) / 1000) > 1) {
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(7);
			}
		},
		onLose: function () {
			if (this.owner.category == 'enemy') {
			}
		}
	},

}

TetrisManager.item_List = {
	"1": function () {
		var actor = $gameActors.actor(1)
		actor.gainHp(500);
		SceneManager._scene._playerStateBoard.applyStates("4", 10)
	},
	"2": function () {
		SceneManager._scene._playerStateBoard.applyStates("8", 5)
	}
}

//=============================================================================
// ** 技能所需对象定义
//=============================================================================

function MeaDoku() {
	this.initialize.apply(this, arguments);
}

MeaDoku.prototype = Object.create(Sprite.prototype);
MeaDoku.prototype.constructor = MeaDoku;

MeaDoku.prototype.initialize = function (index) {
	Sprite.prototype.initialize.call(this);
	AudioManager.playSe(TetrisManager.seSet['Wind7']);
	var scene = SceneManager._scene
	scene.getPlayer().actor.gainHp(-10);

	this.enemy = scene._enemies[scene.getPlayer().TargetIndex];
	var sx = scene.getSkillPosition(index)[0];
	var sy = scene.getSkillPosition(index)[1];
	var ex = this.enemy.StateBoard.getStatePosition('4')[0];
	var ey = this.enemy.StateBoard.getStatePosition('4')[1];
	this.emitter = new PoisonDot(
		ex - sx,
		ey - sy
	);
	this.emitter.move(sx, sy);
	scene._effectLayer.addChild(this.emitter);
}

MeaDoku.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.emitter.isCompleted()) {
		this.enemy.StateBoard.applyStates("4", 10);
		this.destroy();
    }
}

//=============================================================================
// ** 技能特效的抽象类
//=============================================================================

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
		this.Ycursor += this.Ystep;
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
function PoisonDot() {
	this.initialize.apply(this, arguments);
}

PoisonDot.prototype = Object.create(Attack_Effect.prototype);
PoisonDot.prototype.constructor = PoisonDot;

PoisonDot.prototype.initialize = function (Xdistance, Ydistance) {
	Attack_Effect.prototype.initialize.call(this);
	this.Xdistance = Xdistance;
	this.Ydistance = Ydistance;
	this.time = 30
	this.Xstep = Xdistance / this.time;
	this.Ystep = Ydistance / this.time;
	this.Xcursor = 0;
	this.Ycursor = 0;
	this.emitter = new particleEmitter('Poison');
	this.addChild(this.emitter);
}

PoisonDot.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.time > 0) {
		this.Xcursor += this.Xstep;
		this.Ycursor += this.Ystep;
		this.emitter.move(this.Xcursor, this.Ycursor);
	}

	if (this.time <= 0) {
		this.Complete();
	}

	if (this.time <= -15) {
		this.emitter._emitter.emit = false;
	}

	if (this.time <= -30) {
		this.destroy();
	}

	this.time -= 1;
}

