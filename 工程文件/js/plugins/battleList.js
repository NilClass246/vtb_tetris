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
		Mhp: 200,
		Atk: 10,
		Def: 20,
		curEng: 0,
		MEng: 1000,
		EngSpd: 1
	},
	{
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
		Mhp: 200,
		Atk: 10,
		Def: 20,
		curEng: 0,
		MEng: 1000,
		EngSpd: 1
	}
]

var enemy_List = [
	AITest,
	TwoSlimes
]