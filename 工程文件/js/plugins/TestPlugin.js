function testCommand(){
	if($gameActors.actor(1).isEquipped($dataWeapons[1])){
		alert("on");
	}else{
		alert("off");
	}
}