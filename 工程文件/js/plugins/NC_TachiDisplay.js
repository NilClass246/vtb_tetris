//=============================================================================
// NC_TachiDisplay.js v0.1
//=============================================================================

var NC = NC || {}
NC.temps = NC.temps || {}

/*:
 * @plugindesc [v0.1] 对话立绘插件
 * @author NilClass
 *
 * @help
 *  在对话界面更方便的显示立绘的插件
 * 	没什么技术含量
 * 
 */

NC.picData = {
	"mea":{
		suffix : "mea/",
		picheight : 762,
		picwidth:300,
		x : -100,
		y : 50
	},
	"alice":{
		suffix : "alice/",
		picheight : 762,
		picwidth:393,
		x : 807,
		y : 80
	}
}

NC.showTachi = function(info){
		//info attributes
		//info.id
		//info.character
		//info.name
		//info.position
		var root = "CharacterTachi/"
		var picheight = 540;
		var picwidth = 300;
		var x = 0;
		var y = 0;
		var data = NC.picData[info.character];
		var suffix = data.suffix;
		picheight = data.picheight;
		picwidth = data.picwidth;
		x = data.x;
		y = data.y;
		var id = info.id;
		var position = info.position;
		var name = info.name;
		if(position=="left"){
			//this.tachiOrder.push(id);
			//this.arrangeTachi();

			$gameScreen.showPicture(id, root+suffix+name, 0, x-picwidth, y, 100, 100, 0, 0);
			$gameScreen.movePicture(id, 0, x, y, 100, 100, 255, 0, 30);
	
		}else if(position =="right"){
			$gameScreen.showPicture(id, root+suffix+name, 0, x+picwidth, y, 100, 100, 0, 0);
			$gameScreen.movePicture(id, 0, x, y, 100, 100, 255, 0, 30);
		}
} 

NC.changeTachi = function(info){
	var root = "CharacterTachi/"
	var picheight = 540;
	var picwidth = 300;
	var x = 0;
	var y = 0;
	var data = NC.picData[info.character];
	var suffix = data.suffix;
	picheight = data.picheight;
	picwidth = data.picwidth;
	x = data.x;
	y = data.y;
	var id = info.id;
	var position = info.position;
	var name = info.name;
	if(position=="left"){
		$gameScreen.showPicture(id, root+suffix+name, 0, x, y, 100, 100, 255, 0);
	}else if(position =="right"){
		$gameScreen.showPicture(id, root+suffix+name, 0, x, y, 100, 100, 255, 0);
	}
}

NC.hideTachi = function(id, character,position){
	var data = NC.picData[character];
	var x = data.x;
	var y= data.y;
	var picwidth = data.picwidth;
	if(position=="left"){
		//$gameScreen.showPicture(id, root+suffix+name, 0, x-picwidth, y, 100, 100, 0, 0);
		$gameScreen.movePicture(id, 0, x-picwidth, y, 100, 100, 0, 0, 30);

	}else if(position =="right"){
		//$gameScreen.showPicture(id, root+suffix+name, 0, x+picwidth, y, 100, 100, 0, 0);
		$gameScreen.movePicture(id, 0, x+picwidth, y, 100, 100, 0, 0, 30);
	}
}

NC.showTextBoxBackground = function(duration){
	var mheight = SceneManager._scene._messageWindow.height
	var y = Graphics.boxHeight - mheight;
	var x = 0;
	var topheight = 50;
	$gameScreen.showPicture(100, "Darkness", 0, x, Graphics.boxHeight, 100, 100, 200, 0);
	$gameScreen.movePicture(100, 0, x, y, 100, 100, 200, 0, duration);
	$gameScreen.showPicture(99, "Darkness", 0, x, -Graphics.boxHeight, 100, 100, 200, 0);
	$gameScreen.movePicture(99, 0, x, -Graphics.boxHeight+topheight, 100, 100, 200, 0, duration);
}

NC.hideTextBoxBackground = function(duration){
	var x = 0;
	$gameScreen.movePicture(100, 0, x, Graphics.boxHeight, 100, 100, 200, 0, duration);
	$gameScreen.movePicture(99, 0, x, -Graphics.boxHeight, 100, 100, 200, 0, duration);
}