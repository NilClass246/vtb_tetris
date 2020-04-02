var AITest = [
	{
		category: "enemy",
		xposition: 800,
		yposition: 175,
		width: 260,
		height: 325,
		n: 0,
		oldTime: Date.now(),
		//step:20000,
		//field: new Array(this.COL),
		//cur: null,
		//next: [],
		//actionQueue: null,

		//mainWindow: null,
		pictureBoard: null,
		picture: new Sprite(),
		pictureName: "Inuyama",

		curHp: 0,
		Mhp: 200,
		Atk: 50,
		Def: 20,
		curEng: 0,
		MEng: 200,
		EngSpd: 1
		//pathGenerator: null
	}
]

var TwoSlimes = [
	{
		name: "Slime",
		category: "enemy",
		xposition: 800,
		yposition: 250,
		width: 175,
		height: 115,
		n: 0,
		oldTime: Date.now(),

		pictureBoard: null,
		picture: new Sprite(),
		pictureName: "Slime",

		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		Atk: 35,
		Def: 20,
		curEng: 0,
		MEng: 500,
		EngSpd: 1,

		Gold: 20,
		Exp: 20
	},
	{
		name: "Slime",
		category: "enemy",
		xposition: 975,
		yposition: 400,
		width: 175,
		height: 115,
		n: 0,
		oldTime: Date.now(),

		pictureBoard: null,
		picture: new Sprite(),
		pictureName: "Slime",

		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		Atk: 35,
		Def: 20,
		curEng: 0,
		MEng: 500,
		EngSpd: 1,

		Gold: 20,
		Exp: 20
	}
]

var enemy_List = [
	AITest,
	TwoSlimes
]

var skill_List = {
	'½£': function () {
		for (i in this.player.next) {
			this.player.next[i] = {
				block: new Sprite(),
				type: 't',
				rotation: 0,
				rotationTime: 0,
				box: this.data['t'][0].slice()
			}
			this.player.next[i].block.bitmap = ImageManager.loadPicture(this.minoSkin['t'][0])
		}
		this.refreshNextWindows();
    }
}