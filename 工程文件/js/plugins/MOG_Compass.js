//=============================================================================
// MOG_Compass.js
//=============================================================================

/*:
 * @plugindesc 指南针系统
 * @author Moghunter
 *
 * @param Compass X-Axis
 * @desc 标准X位置
 * @default 5
 *
 * @param Compass Y-Axis
 * @desc 标准Y位置
 * @default 5
 *
 * @param Arrow X-Axis
 * @desc 
 * @default 80
 *
 * @param Arrow Y-Axis
 * @desc 
 * @default 79
 *
 * @param Destination Visible
 * @desc 激活事件(目的地)的名字
 * @default true
 *
 * @param Font Size
 * @desc 定义的字体大小
 * @default 18
 *
 * @param Destination X-Axis
 * @desc X
 * @default 25
 *
 * @param Destination Y-Axis
 * @desc Y
 * @default 155
 *
 * @param Steps Visible
 * @desc 计算到目标的距离
 * @default true
 *
 * @param Steps X-Axis
 * @desc X
 * @default 80
 *
 * @param Steps Y-Axis
 * @desc Y
 * @default 70
 *
 * @help  
 * =============================================================================
 * +++ MOG - Compass (v1.3) +++
 * By Moghunter 
 * 译：杰操
 * =============================================================================
 * 注意1：没有事件带着<Destination>的注释的时候，指南针是不会开启的！！所以一定要有个东西触发不然进去了什么也么有
 * 注意2：指南针下面自带目的地的名字（目的事件的名字），需要手动在设置关闭
 * 【文件】
 * 在此目录要有三个文件 /img/system/
 *
 * Compass_A.png
 * Compass_B.png
 * Compass_C.png
 *
 * =============================================================================
 * 跟踪的事件用注释带上这个
 * <ZNZ>
 *
 * =============================================================================
 * 开启或关闭的密语开关（用插件指令）
 *
 * hide_compass
 *
 * show_compass
 *
 * =============================================================================
 * Para forçar um evento de destino use o comando abaixo.
 * (NOTA - Esse comando é apenas para efeito temporário, ao usar o teleport 
 *         o evento volta ao estado normal.)
 *让一个目的地活动使用以下命令。
 *(注意,这个命令只是暂时现象,使用后传送事件会变回正常）
 *
 * compass_event_id : EVENT_ID
 *
 * =============================================================================
 * HISTÓRICO历时更新
 * =============================================================================
 * v1.3 - Correção do glitch de piscar a hud.   
 * v1.2 - Correção do efeito blinking da bussola durante os dialogos.
 * v1.1 - Correção do crash ao apagar (Erase) o evento do mapa.
 *      - Correção do efeito smart Fade.
 *      - Correção de não desligar o destino após ativar uma página em branco.
 *  
 */

//=============================================================================
// ** PLUGIN PARAMETERS   参数设置在这
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Compass = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Compass');
	Moghunter.compass_x = Number(Moghunter.parameters['Compass X-Axis'] || 5);
    Moghunter.compass_y = Number(Moghunter.parameters['Compass Y-Axis'] || 5);
	Moghunter.compass_arrow_x = Number(Moghunter.parameters['Arrow X-Axis'] || 80);
    Moghunter.compass_arrow_y = Number(Moghunter.parameters['Arrow Y-Axis'] || 79);
	Moghunter.compass_name_visible = String(Moghunter.parameters['Destination Visible'] || "true");
	Moghunter.compass_name_x = Number(Moghunter.parameters['Destination X-Axis'] || 25);
    Moghunter.compass_name_y = Number(Moghunter.parameters['Destination Y-Axis'] || 155);
	Moghunter.compass_font_size = Number(Moghunter.parameters['Font Size'] || 18);
	Moghunter.compass_steps_visible = String(Moghunter.parameters['Steps Visible'] || "true");
	Moghunter.compass_steps_x = Number(Moghunter.parameters['Steps X-Axis'] || 80);
    Moghunter.compass_steps_y = Number(Moghunter.parameters['Steps Y-Axis'] || 70);
    
//=============================================================================
// ** Game System游戏系统
//=============================================================================

//==============================
// * Initialize 初始化
//==============================
var _alias_mog_compass_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alias_mog_compass_gsys_initialize.call(this);
	this._compass_event_id = 0;
	this._compass_visible = true   
};
//  =========visible这里设置的是可见度TURE表示可见=========== 

//=============================================================================
// ** Game_Interpreter 游戏解释
//=============================================================================	

//==============================
// * PluginCommand   插件开关
//==============================
var _alias_mog_compass_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_alias_mog_compass_pluginCommand.call(this,command, args)
	if (command === "show_compass")  {$gameSystem._compass_visible = true;};
	if (command === "hide_compass")  {$gameSystem._compass_visible = false;};
	if (command === "compass_event_id")  {$gameSystem._compass_event_id = Number(args[1]);
	$gameMap.events().forEach(function(event) {
		if (event.eventId() === ($gameSystem._compass_event_id)) {event._compass_destination = true}
		else {event._compass_destination = false}
    }, this);	
	};
	return true;
};

//=============================================================================
// ** Game Map  游戏地图
//=============================================================================

//==============================
// * Compass Destination
//==============================
Game_Map.prototype.compass_destination = function() {
	 return this._events[$gameSystem._compass_event_id];
};

//=============================================================================
// ** Game Event
//=============================================================================
var _alias_mog_gevent_initMembers = Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
    _alias_mog_gevent_initMembers.call(this);
	this._compass_destination = false;
};

//==============================
// * Setup Page
//==============================
var _alias_mog_compass_gevent_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_alias_mog_compass_gevent_setupPage.call(this);
	var dest = false;
	if (!this._erased && this.page()) {
	this.list().forEach(function(l) {
	   if ((l.code === 108 && l.parameters[0] == "<Destination>") || this._compass_destination) {
				$gameSystem._compass_event_id = this.eventId(); dest = true;
	   };
	}, this);
	};
	if (!dest && $gameSystem._compass_event_id == this.eventId()) {$gameSystem._compass_event_id = 0};
};

//=============================================================================
// ** Game Character Base 
//=============================================================================

//==============================
// * screen YC
//==============================
Game_CharacterBase.prototype.screenYC = function() {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th + th - this.jumpHeight());
};

//==============================
// * Screen RealX
//==============================
Game_CharacterBase.prototype.screen_realX = function() {
    return this.scrolledX() * $gameMap.tileWidth()
};

//==============================
// * Screen RealY
//==============================
Game_CharacterBase.prototype.screen_realY = function() {
    return this.scrolledY() * $gameMap.tileHeight()
};

//=============================================================================
// ** Spriteset_Map
//=============================================================================

//==============================
// * Create Upper Layer
//==============================
var _alias_mog_compass_sptrbase_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
	_alias_mog_compass_sptrbase_createUpperLayer.call(this)
	this.create_sprite_compass();
};

//==============================
// * Create Sprite Compass
//==============================	
Spriteset_Map.prototype.create_sprite_compass = function() {
	$gameSystem._compass_event_id = 0;
	this._sprite_compass_ref = 10;
	this._sprite_compass_size = [-1,-1,-1,-1];
    this._sprite_compass_layout = new Sprite(ImageManager.loadSystem("Compass_A"));
	this._sprite_compass_layout.x = Moghunter.compass_x;
	this._sprite_compass_layout.y = Moghunter.compass_y;
	this._sprite_compass_layout.opacity = 0;
	this.addChild(this._sprite_compass_layout);	
    this._sprite_compass = new Sprite(ImageManager.loadSystem("Compass_B"));
	this._sprite_compass.anchor.x = 0.5;
	this._sprite_compass.anchor.y = 0.5;
	this._sprite_compass.x = Moghunter.compass_x + Moghunter.compass_arrow_x;
	this._sprite_compass.y = Moghunter.compass_y + Moghunter.compass_arrow_y;
	this._sprite_compass.opacity = 0;
	this.addChild(this._sprite_compass);
	this._sprite_compass_name = new Sprite(new Bitmap(120,32));
	this._sprite_compass_name.x = Moghunter.compass_x + Moghunter.compass_name_x + 60;
	this._sprite_compass_name.y = Moghunter.compass_y + Moghunter.compass_name_y + 16; 
	this._sprite_compass_name.anchor.x = 0.5;
	this._sprite_compass_name.anchor.y = 0.5;
	this._sprite_compass_name.bitmap.fontSize = Number(Moghunter.compass_font_size);
	this._sprite_compass_name.opacity = 0;	
	if (String(Moghunter.compass_name_visible) === "true") {this.addChild(this._sprite_compass_name)};
	this._sprite_compass_number = [];
	this._cpd_steps = [0,0];
	for (var i = 0; i < 4; i++) {
		this._sprite_compass_number[i] = new Sprite(ImageManager.loadSystem("Compass_C"));
		this._sprite_compass_number[i].x = Moghunter.compass_x + Moghunter.compass_steps_x;
		this._sprite_compass_number[i].y = Moghunter.compass_y + Moghunter.compass_steps_y;
		this._sprite_compass_number[i].visible = false;
		if (String(Moghunter.compass_steps_visible) === "true") {this.addChild(this._sprite_compass_number[i])};
	};
	this.check_destination_events();
};

//==============================
// * Refresh Steps Number
//==============================	
Spriteset_Map.prototype.refresh_steps_number = function(value) {
	if (this._cpd_steps[0] === 0) {return;};
	if (value > 9999) {value = 9999};
	numbers = Math.abs(value).toString().split("");  
	for (var i = 0; i < this._sprite_compass_number.length; i++) {
		 this._sprite_compass_number[i].visible = false;
		 if (i > numbers.length) {return};
		 var n = Number(numbers[i]);
		 this._sprite_compass_number[i].setFrame(n * this._cpd_steps[0] , 0, this._cpd_steps[0] , this._cpd_steps[1]);
		 this._sprite_compass_number[i].visible = true;	   
		 var nx = -(this._cpd_steps[0]  * i) + ((this._cpd_steps[0] / 2)  * numbers.length);
		 this._sprite_compass_number[i].x = Moghunter.compass_x + Moghunter.compass_steps_x - nx;
	};
};
	
//==============================
// * Check Destination Events
//==============================	
Spriteset_Map.prototype.check_destination_events = function() {
	$gameMap.events().forEach(function(event) {
		if (!event._erased && event.page()) {
		event.list().forEach(function(l) {
			if ((l.code === 108 && l.parameters[0] == "<Destination>") || event._compass_destination) {
			    $gameSystem._compass_event_id = event.eventId();
				var event_name = event.event().name;
				this._sprite_compass_name.bitmap.clear();
				this._sprite_compass_name.bitmap.drawText(String(event_name),0,0,120,32,'center');
				if ($gameSystem._compass_visible) {
					this._sprite_compass.opacity = 255;
					this._sprite_compass_layout.opacity = 255;
					this._sprite_compass_name.opacity = 255;
					for (var i = 0; i < this._sprite_compass_number.length; i++) {
						this._sprite_compass_number[i].opacity = 255;
					};
			    };
			};
	    }, this);
		};
    }, this);
	this._compass_event_id = $gameSystem._compass_event_id;
};

//==============================
// * Refresh Compass
//==============================
Spriteset_Map.prototype.refresh_compass = function() {
	this._compass_event_id = $gameSystem._compass_event_id;
	this._sprite_compass.opacity = 0;
    this._sprite_compass_layout.opacity = 0;
	this._sprite_compass_name.opacity = 0;
	for (var i = 0; i < this._sprite_compass_number.length; i++) {
		this._sprite_compass_number[i].opacity = 0;
	};	
	this._sprite_compass_ref = 10;	
	var event = $gameMap.events()[$gameSystem._compass_event_id - 1];
	this._sprite_compass_name.bitmap.clear();
	if (!event) {return};
	event_name = event.event().name;
	this._sprite_compass_name.bitmap.drawText(String(event_name),0,0,120,32,'center');
};

//==============================
// * Update
//==============================
var _alias_mog_compass_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_alias_mog_compass_update.call(this);
	if (this._sprite_compass) {this.update_compass()};
};
		
//==============================
// * Update Compass
//==============================
Spriteset_Map.prototype.update_compass = function() {
	if (this._compass_event_id != $gameSystem._compass_event_id) {this.refresh_compass()};
    this._sprite_compass_layout.opacity = this._sprite_compass.opacity;
    this._sprite_compass_name.opacity = this._sprite_compass.opacity;
	for (var i = 0; i < this._sprite_compass_number.length; i++) {
	     this._sprite_compass_number[i].opacity = this._sprite_compass.opacity;
	};	
	if (this._sprite_compass_size[0] == -1 && this._sprite_compass_layout.bitmap.isReady()) {this.set_compass_data()};
	if (!this.compass_visible()) {this._sprite_compass.opacity -= 5;return;}
	else {
         if (this.need_fade_sprite_compass()) {
			if ($gameMessage.isBusy()) {
		        this.opacity -= 10;
		    } else {		 
				if (this._sprite_compass.opacity > 90) {	
					this._sprite_compass.opacity -= 10;
					if (this._sprite_compass.opacity < 90) {this._sprite_compass.opacity = 90};
				};
		    };
	     } else {
			 this._sprite_compass.opacity += 10
		 };
	};	 
	this._sprite_compass_ref += 1;
    if (this._sprite_compass_ref > 4) {this.update_compass_direction();};
};

//==============================
// * Need Visible
//==============================
Spriteset_Map.prototype.compass_need_visible = function() {
	//if ($gameMessage.isBusy()) {return false}
	return true;
};

//==============================
// * Update Compass Direction
//==============================
Spriteset_Map.prototype.update_compass_direction = function() {
	this._sprite_compass_ref = 0;
	var dx = $gameMap.compass_destination().screenX();
	var dy = $gameMap.compass_destination().screenYC();
	var cx = $gamePlayer.screenX();
	var cy = $gamePlayer.screenYC();
	var axy = [cx - dx,cy - dy];	
    var angle = Math.atan2(axy[0],axy[1]);
	this._sprite_compass.rotation = -angle;
	var dist = (Math.abs(axy[0]) + Math.abs(axy[1]));
	var dist_2 = Math.floor(dist / 48);
	this.refresh_steps_number(dist_2);
};

//==============================
// * Set Compass Data
//==============================
Spriteset_Map.prototype.set_compass_data = function() {
  this._sprite_compass_size[0] = Moghunter.compass_x - ($gameMap.tileWidth() / 2);
  this._sprite_compass_size[1] = Moghunter.compass_y - $gameMap.tileHeight();
  this._sprite_compass_size[2] = Moghunter.compass_x + this._sprite_compass_layout.bitmap.width - $gameMap.tileWidth();
  this._sprite_compass_size[3] = Moghunter.compass_y + this._sprite_compass_layout.bitmap.height;
  this._cpd_steps[0] = this._sprite_compass_number[0].bitmap.width / 10;
  this._cpd_steps[1] = this._sprite_compass_number[0].bitmap.height;
};

//==============================
// * Need Fade Sprite Compass
//==============================
Spriteset_Map.prototype.need_fade_sprite_compass = function() {
	if ($gamePlayer.screen_realX() < this._sprite_compass_size[0]) {return false};
	if ($gamePlayer.screen_realX() > this._sprite_compass_size[2]) {return false};
	if ($gamePlayer.screen_realY() < this._sprite_compass_size[1]) {return false};
	if ($gamePlayer.screen_realY() > this._sprite_compass_size[3]) {return false};
	if (this._sprite_compass.opacity < 90) {return false} 
	return true;
};

//==============================
// * Compass Visible
//==============================
Spriteset_Map.prototype.compass_visible = function() {
	if (!$gameMap.compass_destination()) {return false};
	if ($gameMap.compass_destination()._erased) {return false};	
	if (!$gameSystem._compass_visible) {return false};
	if (SceneManager.isSceneChanging()) {return false};
	return true;
};
