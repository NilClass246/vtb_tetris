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

TetrisManager.splitStatus = 0;

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
	},
	'vampire': {
		initialize: function () {
			this.bossID = 1;
			this.beginFlag = true;
		},
		create: function () {
			this.pictureBoard = new Tetris_Window(824, 0, 350, 624);
			this.pictureBoard.removeChildAt(0)
			this.picture = new Sprite();
			this.picture.bitmap = ImageManager.loadPicture('enemies/Matsuri')
			this.pictureBoard.addChild(this.picture);
			SceneManager._scene.addWindow(this.pictureBoard);
			this.skillManager = new SkillManager(['痛苦分裂', '鲜血之触'], true);
			this.skillManager._skill_board.move(1010, 550)
			SceneManager._scene._boardLayer.addChild(this.skillManager._skill_board)
		},
		update: function () {
			var scene = SceneManager._scene
			if (this.beginFlag) {
				scene._playerStateBoard.applyStates("13", 0);
				//this.bloodF = new BloodFilter()
				//scene.addChild(this.bloodF)
				this.beginFlag = false;
			}

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

var Vampire = [
	{
		name: "Vampire",
		category: "enemy",
		xposition: 824,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Blank_Avatar",

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 1000,
		atk: 0,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,

		manager: Object.create(TetrisManager.special_List["vampire"])
	},
]

TetrisManager.enemy_List = [
	EmptySlot,
	TwoSlimes,
	FourKnights,
	Enemy99,
	TestBoss,
	Vampire
]

TetrisManager.skill_List = {
	"T旋之魂": {
		name: "T旋之魂",
		pic: "剑",
		user: "player",
		isPrepared: true,
		oldTime: 0,
		CD: 0,
		description: "将接下来的方块全部替换为T块",
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
			var scene = SceneManager._scene
			var player = scene.getPlayer();
			scene._enemies[scene.getPlayer().TargetIndex].StateBoard.applyStates("7", 10);
			
		},
		Reset: function () {
		}
	},
	"测试技能": {
		name: "测试技能",
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
			var scene = SceneManager._scene
			scene._playerStateBoard.applyStates("13", 0);

		},
		Reset: function () {
		}
	},
	"痛苦分裂": {
		name: "痛苦分裂",
		pic: "占位测试",
		user: "enemy",
		isPrepared: true,
		oldTime: 0,
		CD: 0,
		description: "",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			var s = new Split();
			scene.addChild(s)

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 12;
			this.oldTime = Date.now();
		}
	},
	"鲜血之触": {
		name: "鲜血之触",
		pic: "占位测试",
		user: "enemy",
		isPrepared: false,
		oldTime: 0,
		CD: 10,
		description: "",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer();

			TetrisManager.HarmSystem.dealDamage(null, player, player.actor.hp / 2, 'real');

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 12;
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
				this.owner.StateBoard.setAvatarTint(this.id, 0xff99ff);
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
				this.owner.StateBoard.removeAvatarTint(this.id);
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
		id: 7,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			this.owner.Be_Damaged_mag = this.owner.Be_Damaged_mag*1.5
			if (this.owner.category == 'enemy') {
				this.owner.MEng = this.owner.MEng * 0.5;
				if (!this.emitter) {
					if (this.owner.windowHeight_Revision) {
						var r = this.owner.windowHeight_Revision;
					} else {
						var r = 0;
					}
					TetrisManager.pariticleSet['Angry']["spawnRect"]["w"] = this.owner.xrange * 10 + 65;
					TetrisManager.pariticleSet['Angry']["spawnRect"]["h"] = this.owner.yrange * 23 + 24 + r;
					this.emitter = new particleEmitter('Angry');
					this.emitter.x = this.owner.xposition - 15 - 7
					this.emitter.y = this.owner.assumeYpos - 28
					SceneManager._scene._effectLayer.addChild(this.emitter)
				} else {
					this.emitter._emitter.emit = true;
				}
				this.owner.StateBoard.setAvatarTint(this.id, 0xff99ff);
			} else {
				this.owner.AtkFreq = this.owner.AtkFreq * 0.5;
            }
		},
		update: function () {
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
				this.emitter._emitter.emit = false;
				this.owner.StateBoard.removeAvatarTint(this.id);
				this.owner.MEng = this.owner.MEng / 0.5;
			} else {
				this.owner.AtkFreq = this.owner.AtkFreq / 0.5;
            }
			this.owner.Be_Damaged_mag = this.owner.Be_Damaged_mag/1.5
		}
	},
	"13": {
		name: '分裂',
		id: 13,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			//===================================================================================
			// 覆写的方法：
			// refreshPlayerWindow
			// addToMainWindow
			// removeFromMainWindow
			// addEffect
			// drawArea
			//===================================================================================
			var scene = SceneManager._scene
			var player = scene.getPlayer();
			scene._splite1 = {};
			scene._splite2 = {};


			this.protoX = player.xposition - 15 - 7;
			this.protoY = 0
				//player.yposition + TetrisManager.AboveLines * player.yrange - 27;
			this.protoWidth = (TetrisManager.ROW * player.xrange + 65) / 2;

			scene._splite1.pack = new Sprite();
			scene._splite1.pack.move(this.protoX, this.protoY);
			scene._midLayer.addChild(scene._splite1.pack)

			scene._splite1.mask = new PIXI.Graphics();
			scene._splite1.mask.beginFill(0x000000);
			scene._splite1.mask.drawRect(
				0,
				0,
				this.protoWidth,
				624
			);
			scene._splite1.mask.endFill();
			scene._splite1.pack.addChild(scene._splite1.mask)

			scene._splite2.pack = new Sprite();
			scene._splite2.pack.move(this.protoX, this.protoY);
			scene._midLayer.addChild(scene._splite2.pack)

			scene._splite2.mask = new PIXI.Graphics();
			scene._splite2.mask.beginFill(0x000000);
			scene._splite2.mask.drawRect(
				this.protoWidth,
				0,
				this.protoWidth,
				624
			);
			scene._splite2.mask.endFill();
			scene._splite2.pack.addChild(scene._splite2.mask)

			scene.removeWindow(scene.getPlayer().mainwindow);
			//===================================================================================
			TetrisManager.Temps.Tetris_refreshPlayerWindow = Scene_Tetris.prototype.refreshPlayerWindow;
			Scene_Tetris.prototype.refreshPlayerWindow = function (operator) {
				if (this._playermainwindow1) {
					var tempY1 = this._playermainwindow1.y;
					var tempX1 = this._playermainwindow1.x;
					var tempRot1 = this._playermainwindow1.rotation;
					scene._splite1.pack.removeChild(this._playermainwindow1);
				}

				if (this._playermainwindow2) {
					var tempY2 = this._playermainwindow2.y;
					var tempX2 = this._playermainwindow2.x;
					var tempRot2 = this._playermainwindow2.rotation;
					scene._splite2.pack.removeChild(this._playermainwindow2);
				}
				//===================================================================================
				operator.mainwindow = new Tetris_Window(
					operator.xposition - 15 - 7,
					operator.yposition + TetrisManager.AboveLines * operator.yrange - 27,
					this.ROW * operator.xrange + 65,
					(this.COL - TetrisManager.AboveLines) * operator.yrange
				);
				operator.mainwindow.drawVerticalGauge(
					265,
					10,
					10,
					(this.COL - TetrisManager.AboveLines) * operator.yrange,
					operator.gaugeSCORE / this.player.AtkFreq, operator.mainwindow.hpGaugeColor1(),
					operator.mainwindow.hpGaugeColor1()
				);
				for (var i = 0; i <= this.ROW; i++) {
					operator.mainwindow.contents.drawLine(
						i * operator.xrange + 5,
						0,
						i * operator.xrange + 5,
						(this.COL - TetrisManager.AboveLines) * operator.yrange
					);
				}
				for (var i = 0; i <= this.COL; i++) {
					operator.mainwindow.contents.drawLine(
						4,
						i * operator.yrange - 14,
						this.ROW * operator.yrange + 4,
						i * operator.yrange - 14
					);
				}
				//===================================================================================
				this._playermainwindow1 = new Tetris_Window(
					tempX1 || 0,
					//operator.xposition - 15 - 7,
					tempY1 || (operator.yposition + TetrisManager.AboveLines * operator.yrange - 27),
					this.ROW * operator.xrange + 65,
					(this.COL - TetrisManager.AboveLines) * operator.yrange
				);
				this._playermainwindow1.drawVerticalGauge(
					265,
					10,
					10,
					(this.COL - TetrisManager.AboveLines) * operator.yrange,
					operator.gaugeSCORE / this.player.AtkFreq, operator.mainwindow.hpGaugeColor1(),
					operator.mainwindow.hpGaugeColor1()
				);
				for (var i = 0; i <= this.ROW; i++) {
					this._playermainwindow1.contents.drawLine(
						i * operator.xrange + 5,
						0,
						i * operator.xrange + 5,
						(this.COL - TetrisManager.AboveLines) * operator.yrange
					);
				}
				for (var i = 0; i <= this.COL; i++) {
					this._playermainwindow1.contents.drawLine(
						4,
						i * operator.yrange - 14,
						this.ROW * operator.yrange + 4,
						i * operator.yrange - 14
					);
				}
				if (operator.cur && operator.cur.block) {
					this._splite1.block = TetrisManager.simpleCopySprite(operator.cur.block);
					this._playermainwindow1.addChild(this._splite1.block)
				}

				if (operator.shadowImage) {
					this._splite1.shadow = TetrisManager.simpleCopySprite(operator.shadowImage.block);
					this._playermainwindow1.addChild(this._splite1.shadow)
				}
				if (tempRot1) {
					this._playermainwindow1.rotation = tempRot1
                }
				//===================================================================================
				this._playermainwindow2 = new Tetris_Window(
					tempX2 || 0,
					//operator.xposition - 15 - 7,
					tempY2 || (operator.yposition + TetrisManager.AboveLines * operator.yrange - 27),
					this.ROW * operator.xrange + 65,
					(this.COL - TetrisManager.AboveLines) * operator.yrange
				);
				this._playermainwindow2.drawVerticalGauge(
					265,
					10,
					10,
					(this.COL - TetrisManager.AboveLines) * operator.yrange,
					operator.gaugeSCORE / this.player.AtkFreq, operator.mainwindow.hpGaugeColor1(),
					operator.mainwindow.hpGaugeColor1()
				);
				for (var i = 0; i <= this.ROW; i++) {
					this._playermainwindow2.contents.drawLine(
						i * operator.xrange + 5,
						0,
						i * operator.xrange + 5,
						(this.COL - TetrisManager.AboveLines) * operator.yrange
					);
				}
				for (var i = 0; i <= this.COL; i++) {
					this._playermainwindow2.contents.drawLine(
						4,
						i * operator.yrange - 14,
						this.ROW * operator.yrange + 4,
						i * operator.yrange - 14
					);
				}
				if (operator.cur && operator.cur.block) {
					this._splite2.block = TetrisManager.simpleCopySprite(operator.cur.block);
					this._playermainwindow2.addChild(this._splite2.block)
				}
				if (operator.shadowImage) {
					this._splite2.shadow = TetrisManager.simpleCopySprite(operator.shadowImage.block);
					this._playermainwindow2.addChild(this._splite2.shadow)
				}
				if (tempRot2) {
					this._playermainwindow2.rotation = tempRot2
				}
				//===================================================================================

				this._playermainwindow1.mask = this._splite1.mask;
				this._playermainwindow2.mask = this._splite2.mask;
				//this._playermainwindow1.y -= 10;
				//this._playermainwindow2.y += 10;


				scene._splite1.pack.addChild(this._playermainwindow1);
				scene._splite2.pack.addChild(this._playermainwindow2);

				if (!operator.effectLayer_1) {
					operator.effectLayer_1 = new Sprite();
				}
				this._playermainwindow1.addChild(operator.effectLayer_1);

				if (!operator.effectLayer_2) {
					operator.effectLayer_2 = new Sprite();
				}
				this._playermainwindow2.addChild(operator.effectLayer_2);

				console.log(scene._splite1.pack);
				console.log(scene._splite2.pack);
			}

			//===================================================================================
			scene.refreshPlayerWindow(scene.getPlayer())
			//===================================================================================
			TetrisManager.Temps.Tetris_addToMainWindow = Scene_Tetris.prototype.addToMainWindow;
			Scene_Tetris.prototype.addToMainWindow = function (operator, sprite) {
				if (operator.rotated) {
					operator.rotated = false;
					return;
				}
				if (operator.category == 'player' && sprite !== operator.shadowImage.block) {
					var temp1 = TetrisManager.simpleCopySprite(sprite);
					this._playermainwindow1.addChild(temp1)
					var temp2 = TetrisManager.simpleCopySprite(sprite);
					this._playermainwindow2.addChild(temp2)
				} else {
					operator.mainwindow.addChild(sprite)
				}
			}
			//===================================================================================
			TetrisManager.Temps.Tetris_removeFromMainWindow = Scene_Tetris.prototype.removeFromMainWindow
			Scene_Tetris.prototype.removeFromMainWindow = function (operator, sprite) {
				if (operator.category == 'player') {
					this._playermainwindow1.removeChild(sprite)
					this._playermainwindow2.removeChild(sprite)
				} else {
					operator.mainwindow.removeChild(sprite)
				}
			}
			//===================================================================================
			TetrisManager.Temps.Tetris_addEffect = Scene_Tetris.prototype.addEffect
			Scene_Tetris.prototype.addEffect = function (operator, sprite) {
				if (operator.category == 'player') {
					var s = new MergeEffect(sprite.bitmap);
					s.x = sprite.x;
					s.y = sprite.y;
					s.scale.x = sprite.scale.x;
					s.scale.y = sprite.scale.y;
					operator.effectLayer_1.addChild(s);

					var s = new MergeEffect(sprite.bitmap);
					s.x = sprite.x;
					s.y = sprite.y;
					s.scale.x = sprite.scale.x;
					s.scale.y = sprite.scale.y;
					operator.effectLayer_2.addChild(s);
				} else {
					operator.effectLayer.addChild(sprite);
                }
			}

			//===================================================================================
			TetrisManager.Temps.Tetris_drawArea = Scene_Tetris.prototype.drawArea
			Scene_Tetris.prototype.drawArea = function (operator) {
				TetrisManager.Temps.Tetris_drawArea.call(this, operator);
				if (operator.category == 'player') {
					this._playermainwindow1.addChild(operator.effectLayer_1);
					this._playermainwindow2.addChild(operator.effectLayer_2);
                }
			}
			//===================================================================================
			scene.drawArea(scene.getPlayer())
			//===================================================================================
			Scene_Tetris.prototype.onEnd = function () {
				Scene_Tetris.prototype.refreshPlayerWindow = TetrisManager.Temps.Tetris_refreshPlayerWindow;
				Scene_Tetris.prototype.addToMainWindow = TetrisManager.Temps.Tetris_addToMainWindow;
				Scene_Tetris.prototype.removeFromMainWindow = TetrisManager.Temps.Tetris_removeFromMainWindow;
				Scene_Tetris.prototype.addEffect = TetrisManager.Temps.Tetris_addEffect
				Scene_Tetris.prototype.drawArea = TetrisManager.Temps.Tetris_drawArea
            }


		},
		update: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer()
			if (TetrisManager.splitStatus == 1) {
				var Light = new ConcentratedLight();
				Light.move(player.xposition - 15 - 7+(TetrisManager.ROW * player.xrange + 65) / 2, 0);
				scene._boardLayer.addChild(Light)
				this.distance = 50
				//this.distance = 25
				TetrisManager.splitStatus = 0;
			}

			if (TetrisManager.splitStatus == 2) {
				this.distance = -25;
				TetrisManager.splitStatus = 0;
            }

			if (this.distance > 25) {
				scene._splite1.pack.x -= 1;
				scene._splite1.pack.y -= 3;
				scene._splite1.pack.rotation += 0.1/25

				scene._splite2.pack.x += 1;
				scene._splite2.pack.y += 5;
				scene._splite2.pack.rotation -= 0.1 / 25
				console.log(1);
				this.distance -= 1;
			}

			if (this.distance <= 25 && this.distance > 0) {
				scene._splite1.pack.rotation -= 0.1 / 25
				scene._splite2.pack.rotation += 0.1 / 25
				console.log(2);
				this.distance -= 1;
			}

			//if (this.distance > 0) {
			//	scene._splite1.pack.x -= 1;
			//	scene._splite1.pack.y -= 3;
			//	scene._splite1.pack.rotation += 2 * Math.PI / 25;

			//	scene._splite2.pack.x += 1;
			//	scene._splite2.pack.y += 5;
			//	scene._splite2.pack.rotation -= 2 * Math.PI / 25;
			//	this.distance -= 1;
			//}

			if (this.distance < 0) {
				scene._splite1.pack.x += 1
					//+ 1 / 25;
				scene._splite1.pack.y += 3;
				scene._splite2.pack.x -= 1;
				scene._splite2.pack.y -= 5
					//- 0.5 / 25;
				this.distance += 1
			}

		},
		onLose: function () {
		},
		onDown: function () {
			var scene = SceneManager._scene
			scene._playermainwindow1.removeChild(scene._splite1.block)
			scene._playermainwindow2.removeChild(scene._splite2.block)
			scene._splite1.block = TetrisManager.simpleCopySprite(scene.getPlayer().cur.block);
			scene._splite2.block = TetrisManager.simpleCopySprite(scene.getPlayer().cur.block);
			scene._playermainwindow1.addChild(scene._splite1.block);
			scene._playermainwindow2.addChild(scene._splite2.block);
		},
		onBlockChanging: function () {
			var scene = SceneManager._scene
			scene._playermainwindow1.removeChild(scene._splite1.block)
			scene._playermainwindow2.removeChild(scene._splite2.block)
			scene._splite1.block = TetrisManager.simpleCopySprite(scene.getPlayer().cur.block);
			scene._splite2.block = TetrisManager.simpleCopySprite(scene.getPlayer().cur.block);
			scene._playermainwindow1.addChild(scene._splite1.block);
			scene._playermainwindow2.addChild(scene._splite2.block);
		},
		onShadow: function () {
			var scene = SceneManager._scene
			scene._playermainwindow1.removeChild(scene._splite1.shadow);
			scene._playermainwindow2.removeChild(scene._splite2.shadow);
			scene._splite1.shadow = TetrisManager.simpleCopySprite(scene.getPlayer().shadowImage.block);
			scene._splite2.shadow = TetrisManager.simpleCopySprite(scene.getPlayer().shadowImage.block);
			scene._playermainwindow1.addChild(scene._splite1.shadow);
			scene._playermainwindow2.addChild(scene._splite2.shadow);
        }
	},
	"14": {
		name: '绿茶回血（大）',
		id: 14,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			TetrisManager.HarmSystem.dealDamage(null, this.owner, -this.owner.actor.mhp*0.1, 'healing')

		},
		update: function () {

			if (((Date.now() - this.oldTime) / 1000) > 1) {
				TetrisManager.HarmSystem.dealDamage(null, this.owner, -this.owner.actor.mhp * 0.03, 'healing')
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(14);
			}
		},
		onLose: function () {
		}
	},
	"15": {
		name: '猫猫狂暴',
		id: 15,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			var actor = $gameActors.actor(1)
			this.atk_amount = Math.floor(actor.atk*0.25)
			actor.addParam(2, this.atk_amount);
			this.owner.Gauge_Score_mag = this.owner.Gauge_Score_mag *1.25
			this.emitter = new particleEmitter('Rage');
			this.emitter.y = Graphics.boxHeight;
			SceneManager._scene.addChild(this.emitter);
		},
		update: function () {

			if (((Date.now() - this.oldTime) / 1000) > 1) {
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(15);
			}
		},
		onLose: function () {
			$gameActors.actor(1).addParam(2, -this.atk_amount);
			this.owner.Gauge_Score_mag = this.owner.Gauge_Score_mag / 1.25
			this.emitter.stop();
		},
		onEnd: function () {
			$gameActors.actor(1).addParam(2, -this.atk_amount);
			this.owner.Gauge_Score_mag = this.owner.Gauge_Score_mag / 1.25
			this.emitter.stop();
        }
	},
}
//TODO:改进颜色设置
//TODO:改进攻击频率显示
TetrisManager.item_List = {
	"1": function () {
		var actor = $gameActors.actor(1)
		actor.gainHp(500);
		SceneManager._scene._playerStateBoard.applyStates("4", 10)
	},
	"2": function () {
		SceneManager._scene._playerStateBoard.applyStates("8", 5)
	},
	"8": function () {
		SceneManager._scene._playerStateBoard.applyStates("14", 10)
	},
	"11": function () {
		SceneManager._scene._playerStateBoard.applyStates("15", 10)
	},
	"13": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
        }
		player.hold = {
			block: new Sprite(scene._minoSkin['5'][0]),
			type: '5',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['5'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"14": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['s'][0]),
			type: 's',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['s'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"15": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['j'][0]),
			type: 'j',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['j'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"16": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['l'][0]),
			type: 'l',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['l'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"17": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['t'][0]),
			type: 't',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['t'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"18": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['1'][0]),
			type: '1',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['1'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"19": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['o'][0]),
			type: 'o',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['o'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
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

function Split() {
	this.initialize.apply(this, arguments);
}

Split.prototype = Object.create(Sprite.prototype);
Split.prototype.constructor = Split;

Split.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.time = 5;
	this.oldTime = Date.now();
	TetrisManager.splitStatus = 1;
}

Split.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if ((Date.now() - this.oldTime)* 0.001 >= this.time) {
		TetrisManager.splitStatus = 2;
		this.destroy();
    }
}

//=============================================================================

function BloodFilter() {
	this.initialize.apply(this, arguments);
}

BloodFilter.prototype = Object.create(Sprite.prototype);
BloodFilter.prototype.constructor = BloodFilter;

BloodFilter.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture('filter/Blood');
	this.opacity = 0;
	this.phaseFlag = 'increasing'
	this.timeCount = 0;
	this._frequency = 60;
}

BloodFilter.prototype.update = function () {
	Sprite.prototype.update.call(this);

	switch (this.phaseFlag) {
		case 'increasing':
			this.opacity += 127 / this._frequency;
			break;
		case 'decreasing':
			this.opacity -= 127 / this._frequency;
			break;
		case 'ending':
			this.opacity -= 127 / this._frequency;
			if (this.opacity <= 0) {
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

BloodFilter.prototype.stop = function () {
	this.phaseFlag = 'ending'
} 

//=============================================================================

function Counting() {

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

//-----------------------------------------------------------------------------

function SingleLight() {
	this.initialize.apply(this, arguments);
}

SingleLight.prototype = Object.create(Attack_Effect.prototype);
SingleLight.prototype.constructor = SingleLight;

SingleLight.prototype.initialize = function () {
	Attack_Effect.prototype.initialize.call(this);
	this.timeCount = 0;
	this.timeFlag = 0;
	this.bitmap = ImageManager.loadPicture('Effect/Light');

	this.anchor.x = 0.5;
	this.scale.x = 0.1;
	this.scale.y = 0;
	this.opacity = 128;
	this.markers = [5, 3, 7, 5]
}

SingleLight.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.timeFlag == 0) {
		this.scale.y+=0.2
	}

	if (this.timeFlag == 1) {
		this.scale.x += 0.3
	}

	if (this.timeFlag == 3) {
		this.scale.x -= 0.2
    }

	this.timeCount += 1;
	switch (this.timeCount) {
		case this.markers[0]:
			this.timeFlag = 1;
			break;
		case this.markers[0] + this.markers[1]:
			this.timeFlag = 2;
			break;
		case this.markers[0] + this.markers[1] + this.markers[2]:
			this.timeFlag = 3;
			break;
		case this.markers[0] + this.markers[1] + this.markers[2] + this.markers[3]:
			this.timeFlag = 4;
			this.completed = true;
			break;
    }

}

//-----------------------------------------------------------------------------

function ConcentratedLight() {
	this.initialize.apply(this, arguments);
}

ConcentratedLight.prototype = Object.create(Attack_Effect.prototype);
ConcentratedLight.prototype.constructor = ConcentratedLight;

ConcentratedLight.prototype.initialize = function () {
	Attack_Effect.prototype.initialize.call(this);
	this.timeCount = 5;
	this.numCount = 3;
}

ConcentratedLight.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.timeCount >= 5 && this.numCount>=0) {
		this.numCount -= 1;
		var light = new SingleLight();
		this.addChild(light);
		this.timeCount = 0;
	}

	if (this.numCount <= 0 && this.children[this.children.length - 1].isCompleted()) {
		this.destroy();
    }

	this.timeCount += 1;
}

