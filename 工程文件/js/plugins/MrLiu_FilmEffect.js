//=============================================================================
// MrLiu_FilmEffect.js
//=============================================================================

/*:
 * @plugindesc 在RMMV游戏中显示电影放映特效
 * @author MrLiu-过眼云烟
 * @help 10号开关开启电影效果。目前版本关闭10号开关后，电影效果暂时无法瞬间消失，请自行切换地图消失电影效果
 * 建议配合更改色调使用，效果更佳，配色建议：-17，-34，-68，211. 
 */
//-----------------------------------------------------------------------------
// Window_MapName
//
// The window for displaying the map name on the map screen.

var Imported = Imported || {};
Imported.MrLiu_FilmEffect = true;

var Lmd = Lmd || {};
Lmd.MrLiu_FilmEffect = Lmd.MrLiu_FilmEffect || {};
//====================================================================================================================================================================================================================
//=============================================================================
// * NoiseBase_Sprite  噪点壁纸
//=============================================================================
function NoiseBase_Sprite() {
    this.initialize.apply(this, arguments);
};

NoiseBase_Sprite.prototype = Object.create(Sprite.prototype);
NoiseBase_Sprite.prototype.constructor = NoiseBase_Sprite;

//==============================
// * Initialize
//==============================
NoiseBase_Sprite.prototype.initialize = function(start_x) {
    Sprite.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadSystem('noise_base');
	this.visible = false;
    this.visible = 1;
	this.blinkCursor = 0;
	this.update();
    //@blink = true
};

//==============================
// * Update
//==============================
NoiseBase_Sprite.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this.x = -(Math.random(this.bitmap.width - 640));

	if (this.blinkCursor >= 3){
		this.opacity = 230;
		this.blinkCursor = 0;
	}else{
		this.opacity = 255;
		this.blinkCursor += 1;
	}
};



//====================================================================================================================================================================================================================
//=============================================================================
// * NoiseLine_Sprite 噪点线
//=============================================================================
function NoiseLine_Sprite() {
    this.initialize.apply(this, arguments);
};

NoiseLine_Sprite.prototype = Object.create(Sprite.prototype);
NoiseLine_Sprite.prototype.constructor = NoiseLine_Sprite;

//==============================
// * Initialize
//==============================
NoiseLine_Sprite.prototype.initialize = function(start_x) {
    Sprite.prototype.initialize.call(this);
	this._VX = [-2, -1, -1, 0, 1, 1, 2];
    this._OS = [-50, -20, -10, 0, 10, 20, 30, 50];
	this.bitmap = ImageManager.loadSystem('noise_line');
	this.visible = true;
	this.x = start_x;
	this._vector_x = this._VX[Math.floor(Math.random()*this._VX.length)];
    this._opacity_speed = this._OS[Math.floor(Math.random()*this._OS.length)];	
	//this.z = 60;
};

//==============================
// * Update
//==============================
NoiseLine_Sprite.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this.x = Math.min((Math.max((this.x+this._vector_x),0)),1200);
	//console.log('this._vector_x:'+this.x);
    this.y = (Math.floor(Math.random()*(this.bitmap.height - 624)));//-(Math.floor(Math.random()*(this.bitmap.height - 480)));原来是负的
	//console.log('this._vector_y:'+this.y);
    this._vector_x = this._VX[Math.floor(Math.random()*this._VX.length)];//if Math.random(6).zero?
    this._opacity_speed = this._OS[Math.floor(Math.random()*this._OS.length)];//if Math.random(6).zero?  Math.floor(Math.random()*
	var m = this.opacity + this._opacity_speed;
	if (m < 0){
		this.opacity = 0;
	}else{
	if (m >255){
		this.opacity = 0;
	}
	else{
		this.opacity = m;
	}
	}
	//console.log('this._vector_opacity:'+this.opacity );
};
//====================================================================================================================================================================================================================
//=============================================================================
// * NoiseDot_Sprite 躁点块
//=============================================================================
function NoiseDot_Sprite() {
    this.initialize.apply(this, arguments);
};

NoiseDot_Sprite.prototype = Object.create(Sprite.prototype);
NoiseDot_Sprite.prototype.constructor = NoiseDot_Sprite;

//==============================
// * Initialize
//==============================
NoiseDot_Sprite.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadSystem('noise_dot');
	this.visible = true;
	this.z = 100;
	this.x = 100;//Math.random()*960;
      this.y = 100;//Math.random()*540;
      this.opacity = 255;
};

//==============================
// * Update
//==============================
NoiseDot_Sprite.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (Math.floor(Math.random()*50) == 1){
      //this.scale.x = Math.random();
      //this.scale.y = Math.random();
      //this.rotation = Math.random()*360;
      this.x = Math.floor(Math.random()*1200);
      this.y = Math.floor(Math.random()*624);
      this.opacity = 255;}
    else{
      this.opacity = 0;
	}
};
//====================================================================================================================================================================================================================
//=============================================================================
// * Game_Temp
//=============================================================================

var _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
	    //this._r_noise_effect_set = new Spriteset_Noise();
};

Game_Temp.prototype.start_noise = function() {
    //this._r_noise_effect_set.start_noise();
	//console.log("Game_Temp开始躁动了");
	//console.log($gameSystem.r_noise_effect());
};
Game_Temp.prototype.end_noise = function() {
    //this._r_noise_effect_set.end_noise();
};


//====================================================================================================================================================================================================================
//=============================================================================
// * Game_System $gameTemp
//=============================================================================

var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(command, args) {
        _Game_System_initialize.call(this);
		this._r_noise_effect = false
		this._r_noise_effect_spriteset = null;
};

Game_System.prototype.start_noise = function() {
    this._r_noise_effect = true;
	$gameTemp.start_noise();
	//console.log("Game_System.prototype.start_noise已经执行");
	//console.log(this._r_noise_effect);
};

Game_System.prototype.end_noise = function() {
    this._r_noise_effect = false;
	$gameTemp.start_end();
};

Game_System.prototype.r_noise_effect = function() {
    return this._r_noise_effect;
};

//====================================================================================================================================================================================================================
//=============================================================================
// * Game_Interpreter
//=============================================================================

 var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'noise') {
            switch (args[0]) {
            case 'start':
                $gameSystem.start_noise();
				//console.log("插件已经生效");
                break;
            case 'end':
                $gameSystem.end_noise();
                break;
            }
        }
    };
	
	//==============================
// * createWeatherPlane
//==============================
Spriteset_Base.prototype.createNoisePlane = function() {
	this._NoisePlane = new Sprite();
	//this._NoisePlane.z = 3;
	//this._NoisePlane._zIndex = 3;
	this._NoisePlane.origin = new Point();
	this.addChild(this._NoisePlane);
	this._base_sprite1 = new NoiseBase_Sprite();
	this._line_sprites1 = new NoiseLine_Sprite(50);
	this._line_sprites2 = new NoiseLine_Sprite(350);
	this._line_sprites3 = new NoiseLine_Sprite(700);
	this._line_sprites4 = new NoiseLine_Sprite(800);
	this._line_sprites5 = new NoiseLine_Sprite(950);
	this._line_sprites6 = new NoiseLine_Sprite(1125);
	this._dot_sprite = new NoiseDot_Sprite();
	this._NoisePlane.addChild(this._base_sprite1);		
	this._NoisePlane.addChild(this._line_sprites1);
	this._NoisePlane.addChild(this._line_sprites2);
	this._NoisePlane.addChild(this._line_sprites3);
	this._NoisePlane.addChild(this._line_sprites4);
	this._NoisePlane.addChild(this._line_sprites5);
	this._NoisePlane.addChild(this._line_sprites6);
	this._NoisePlane.addChild(this._dot_sprite);
};
Spriteset_Base.prototype.updateNoisePlane = function() {
	if (((Graphics.frameCount % 3) == 0) & ($gameSwitches.value('10') == true)){
   //   this._base_sprite1.update();
	  //this._line_sprites1.update();
	  //this._line_sprites2.update();
	  //this._line_sprites3.update();
	  //this._line_sprites4.update();
   //   this._dot_sprite.update();
	  //console.log('更新啦');
	}
    };
var _alias_lmd_weather_ex_sprtbase_createScreenSprites = Spriteset_Base.prototype.createScreenSprites;
Spriteset_Base.prototype.createScreenSprites = function () {
	_alias_lmd_weather_ex_sprtbase_createScreenSprites.call(this);
	if ($gameSwitches.value('10') == true) {
		this.createNoisePlane();
	}
	//if ($gameSwitches.value('10') == true) {
	//	this.createNoisePlane();
	//}
};
//==============================
// * Update
//==============================
var _alias_lmd_weather_ex_sprtbase_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
     _alias_lmd_weather_ex_sprtbase_update.call(this);
	 if(($gameSwitches.value('10') == true)){
		 if (this._base_sprite1 == null
			 || this._line_sprites1 == null
			 || this._line_sprites1 == null
			 || this._line_sprites2 == null
			 || this._line_sprites3 == null
			 || this._line_sprites4 == null
			 || this._line_sprites5 == null
			 || this._line_sprites6 == null
			 || this._dot_sprite == null) {
			this.createNoisePlane(); 
		 }else{
			 this.updateNoisePlane();
		 }
	 } else {
		 if (this._NoisePlane) {
			 this._NoisePlane.removeChild(this._base_sprite1);
			 this._NoisePlane.removeChild(this._line_sprites1);
			 this._NoisePlane.removeChild(this._line_sprites2);
			 this._NoisePlane.removeChild(this._line_sprites3);
			 this._NoisePlane.removeChild(this._line_sprites4);
			 this._NoisePlane.removeChild(this._line_sprites5);
			 this._NoisePlane.removeChild(this._line_sprites6);
			 this._NoisePlane.removeChild(this._dot_sprite);
         }
		 this._base_sprite1==null ;
		 this._line_sprites1=null;
		 this._line_sprites1=null;
		 this._line_sprites2=null;
		 this._line_sprites3=null;
		 this._line_sprites4 = null;
		 this._line_sprites5 = null;
		 this._line_sprites6 = null;
		 this._dot_sprite=null;
		
	 }
};
	/*
	
//====================================================================================================================================================================================================================
//=============================================================================
// * Spriteset_Noise 电影特效精灵集合
//=============================================================================
function Spriteset_Noise() {
    this.initialize.apply(this, arguments);
};

Spriteset_Noise.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_Noise.prototype.constructor = Spriteset_Noise;

//==============================
// * Initialize
//==============================
Spriteset_Noise.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this._baseSprite = new Sprite();
    this._baseSprite.setFrame(0, 0, this.width, this.height);
	this.addChild(this._baseSprite);
	this.create_noise();
	console.log("精灵合计建立完毕");
	/*
    if ($gameSystem.r_noise_effect()){
	    this.start_noise(); 
		console.log("精灵合计开始躁动");
	}
	*/
//};
/*
//==============================
// * create_noise
//==============================
Spriteset_Noise.prototype.create_noise = function() {
    this._base_sprite1 = new NoiseBase_Sprite();
    this._line_sprites = [new NoiseLine_Sprite(50),new NoiseLine_Sprite(350),new NoiseLine_Sprite(400),new NoiseLine_Sprite(500)];
    this._dot_sprite = new NoiseDot_Sprite();
	this._base_sprite1.z=60;
    this._line_sprites.z=60;
    this._dot_sprite.z=60;
	this._baseSprite.addChild(this._base_sprite1);
	this._baseSprite.addChild(this._line_sprites);
	this._baseSprite.addChild(this._dot_sprite);
	//this._test_sprite = new Test_Sprite();
};

//==============================
// * start_noise
//==============================
Spriteset_Noise.prototype.start_noise = function() {
    this._base_sprite.visible = true;
	this._line_sprites.forEach(function(sprite) {
        sprite.visible = true;
    });
    this._dot_sprite.visible = true;
};

//==============================
// * end_noise
//==============================
Spriteset_Noise.prototype.end_noise = function() {
    this._base_sprite.visible = false;
	this._line_sprites.forEach(function(sprite) {
        sprite.visible = false;
    });
    this._dot_sprite.visible = false;
};

//==============================
// * Update
//==============================
Spriteset_Noise.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if ($gameSystem.r_noise_effect()){
	    this.start_noise(); 
	}
	if ($gameSystem.r_noise_effect() && ((Graphics.frameCount % 3) == 0)){
      this._base_sprite.update();
	  this._line_sprites.forEach(function(sprite) {
        sprite.update();
     });
      this._dot_sprite.update();
	  this._test_sprite.update();
	}
};
*/
/*
  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
		 this._FilmPlane = new Sprite();
	     this._FilmPlane.z = 50;
	     this._FilmPlane._zIndex = 3500;
		 this._baseSprite.addChild(this._FilmPlane);
		this.addChild($gameTemp._r_noise_effect_spriteset);
	    //this._tilemap.addChild(this._r_noise_effect_set);//this.addChild(this._r_noise_effect_set)
		//this._r_noise_effect_set = new Spriteset_Noise();
		//console.log(this._r_noise_effect_set instanceof Spriteset_Noise);
		
		//this.addChild(this._r_noise_effect_set);
		//this._r_noise_effect_set.update();
};
    var Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        Spriteset_Map_update.call(this);
        this.update_noise_effect();
    };

Spriteset_Map.prototype.update_noise_effect = function() {
   $gameTemp._r_noise_effect_spriteset.update();
};



/*
//====================================================================================================================================================================================================================
//=============================================================================
// * NoiseDot_Sprite 躁点块
//=============================================================================
function Test_Sprite() {
    this.initialize.apply(this, arguments);
};

Test_Sprite.prototype = Object.create(Sprite.prototype);
Test_Sprite.prototype.constructor = Test_Sprite;

//==============================
// * Initialize
//==============================
Test_Sprite.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadSystem('Boss_HP_A');
	this.visible = true;
};*/
