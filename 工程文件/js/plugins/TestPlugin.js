function testCommand(){
	var actor = $gameActors.actor(1)
	var d = 20
	var KO = true
	Game_Interpreter.prototype.changeHp.call(this, actor, d, KO);
}
