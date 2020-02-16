var InuyamaBattle = {
	order: 0,
	hp: 100,
	targetScore: 10,
	enemyPic: "Inuyama",
	initMsg: function(){
		alert("you did it!")
		$gameMessage.setBackground(1)
		$gameMessage.setPositionType(1)
		$gameMessage.add("Show Text Script Call")
	},
	startMsg: ["Mea酱,", "这次可别想逃跑哦！ ↓"],
	playMsg: ["可不要指望我手下留情哦"],
	mergeMsg: ["成功消行了吗，","还远远不够呢！"],
	rndMsg: [["撑不住的话，","现在投降还来得及哦？"], ["真的要这么放吗？"], ["这个方块是不是","往左挪些会更好呢？"]],
	defeatMsg: ["来，Mea酱，", "是你输了哦~ ↓"],
	winMsg: ["可恶，","Mea酱真是太强了…… ↓"]
}

var battleList = [
	InuyamaBattle
]