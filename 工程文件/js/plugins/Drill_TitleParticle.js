//=============================================================================
// Drill_TitleParticle.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        标题 - 多层标题粒子
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleParticle +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题中放置多个粒子，并可以切换显示状态。
 * 要了解更详细的组合方法，去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * 该插件用法与菜单一样，但是，存储数据是全局的。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有titles1文件夹！（img/titles1）
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认粒子
 *
 * 背景1 资源-粒子
 * 背景2 资源-粒子
 * 背景3 资源-粒子
 * ……
 *
 * 你可以在同一个标题里面加入非常多的不同种类的粒子。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制标题粒子的显示情况：
 * 
 * 插件指令（显示）：    >标题粒子 : A : 显示
 * 插件指令（隐藏）：    >标题粒子 : A : 隐藏
 *
 * 参数A：粒子编号
 *        显示隐藏对应配置的编号。
 *
 * 示例：
 * 插件指令：>标题粒子 : 1 : 显示
 * 插件指令：>标题粒子 : 10 : 隐藏
 * （切换不同的标题粒子，因为处于全局，设置后永久有效）
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范了插件指令格式。
 *
 *
 * @param ---粒子组 1至20---
 * @default
 *
 * @param 粒子-1
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-2
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-3
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-4
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-5
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-6
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-7
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-8
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-9
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-10
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-11
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-12
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-13
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-14
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-15
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-16
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-17
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-18
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-19
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-20
 * @parent ---粒子组 1至20---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param ---粒子组21至40---
 * @default
 *
 * @param 粒子-21
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-22
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-23
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-24
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-25
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-26
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-27
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-28
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-29
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-30
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-31
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-32
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-33
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-34
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-35
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-36
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-37
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-38
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-39
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 * @param 粒子-40
 * @parent ---粒子组21至40---
 * @type struct<TitleParticle>
 * @desc 粒子的详细配置信息。
 * @default 
 *
 */
/*~struct~TitleParticle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题粒子==
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-粒子
 * @desc 粒子的图片资源。
 * @default 粒子-默认粒子
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 平移-粒子 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入标题时图片的初始位置。
 * @default 0
 *
 * @param 平移-粒子 Y
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入标题时图片的初始位置。
 * @default 0
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 粒子数量
 * @type number
 * @min 1
 * @desc 标题的粒子数量。
 * @default 10
 *
 * @param 粒子X速度
 * @desc 粒子按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 粒子Y速度
 * @desc 粒子按y轴方向循环移动的速度。正数向下，负数向上。（可为小数）
 * @default 0
 *
 * @param 粒子旋转速度
 * @desc 正数逆时针，负数顺时针，单位 弧度/帧。(1秒60帧)
 * 6.28表示一圈，设置0.01表示大概10秒转一圈，设置0则不旋转。
 * @default 0.01
 *
 * @param 标题层级
 * @type select
 * @option 在标题后面
 * @value 0
 * @option 在标题前面
 * @value 1
 * @desc 粒子所属的标题层级。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 粒子在同一个标题层级下，先后排序的位置，0表示最后面。
 * @default 8
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_title_particle_visible
//		覆盖重写方法	无
//
//插件记录：
//		标题和菜单有很大区别：
//			标题不需要默认
//			标题是直接被初始化
//			标题不需要区分当前菜单
//			标题为全局存储

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_TitleParticle = true;
　　var DrillUp = DrillUp || {}; 

	DrillUp.parameters = PluginManager.parameters('Drill_TitleParticle');
	
	DrillUp.title_particles_max = 40;
	DrillUp.title_particles = [];
	
	for (var i = 0; i < DrillUp.title_particles_max; i++) {
		if( DrillUp.parameters['粒子-' + String(i+1) ] != "" ){
			DrillUp.title_particles[i] = JSON.parse(DrillUp.parameters['粒子-' + String(i+1) ]);
			DrillUp.title_particles[i]['visible'] = String(DrillUp.title_particles[i]["初始是否显示"] || "true") == "true";
			DrillUp.title_particles[i]['src_img'] = String(DrillUp.title_particles[i]["资源-粒子"]);
			DrillUp.title_particles[i]['x'] = Number(DrillUp.title_particles[i]["平移-粒子 X"]);
			DrillUp.title_particles[i]['y'] = Number(DrillUp.title_particles[i]["平移-粒子 Y"]);
			DrillUp.title_particles[i]['opacity'] = Number(DrillUp.title_particles[i]["透明度"]);
			DrillUp.title_particles[i]['blendMode'] = Number(DrillUp.title_particles[i]["混合模式"]);
			DrillUp.title_particles[i]['count'] = Number(DrillUp.title_particles[i]["粒子数量"]);
			DrillUp.title_particles[i]['x_speed'] = Number(DrillUp.title_particles[i]["粒子X速度"]);
			DrillUp.title_particles[i]['y_speed'] = Number(DrillUp.title_particles[i]["粒子Y速度"]);
			DrillUp.title_particles[i]['rotation'] = Number(DrillUp.title_particles[i]["粒子旋转速度"]);
			DrillUp.title_particles[i]['title_index'] = Number(DrillUp.title_particles[i]["标题层级"]);
			DrillUp.title_particles[i]['zIndex'] = Number(DrillUp.title_particles[i]["图片层级"]);
		}else{
			DrillUp.title_particles[i] = [];
		}
	}
	
//=============================================================================
// ** 全局读取
//=============================================================================
	var _drill_global = DataManager.loadGlobalInfo();
	//alert(JSON.stringify(_drill_global));
	if( !DrillUp.global_title_particle_visible ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_title_particle_visible"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_title_particle_visible = _drill_global[0]["_global_title_particle_visible"];
		}else{
			DrillUp.global_title_particle_visible = [];
			for (var i = 0; i < DrillUp.title_particles.length; i++) {
				DrillUp.global_title_particle_visible.push( DrillUp.title_particles[i]['visible'] );
			}
		}
	}
	
//=============================================================================
// ** 全局存储
//=============================================================================
var _drill_TitleParticle_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	info[0]["_global_title_particle_visible"] = DrillUp.global_title_particle_visible;
	_drill_TitleParticle_saveGlobal.call(this,info);
};
DataManager.forceSaveGlobalInfo = function() {		//强制存储（任何改变的全局变量的地方都需要调用该方法）
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_title_particles_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_title_particles_pluginCommand.call(this, command, args);
	if (command === '>标题粒子') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '显示') {
				DrillUp.global_title_particle_visible[temp1] = true;
				DataManager.forceSaveGlobalInfo();
			}
			if (type === '隐藏') {
				DrillUp.global_title_particle_visible[temp1] = false;
				DataManager.forceSaveGlobalInfo();
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if (type === '隐藏全部') {
				for(var i=0; i<DrillUp.global_title_particle_visible.length; i++){
					DrillUp.global_title_particle_visible[i] = false;
				}
				DataManager.forceSaveGlobalInfo();
			}
		}
	}
};

//=============================================================================
// ** 从 Scene_Title 中进行粒子追加
//=============================================================================

var _drill_title_particle_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	SceneManager._drill_title_particle = false;	
   	this._drill_sprite_particles = [];
   	this._drill_sprite_particles_data = [];
	_drill_title_particle_createBackground.call(this);		//与背景一同创建
	
	if( !this._backgroundSprite ){			//附着在定义的标题背景后面
		this._backgroundSprite = new Sprite();
		this.addChild(this._backgroundSprite);
	}
};

//==============================
// ** 层级排序
//==============================
Scene_Title.prototype.drill_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//==============================
// * 创建粒子
//==============================
Scene_Title.prototype.drill_createParticles = function() {	
	SceneManager._drill_title_particle = true;
	
	if(!this._drill_sprite_particles){
		this._drill_sprite_particles = [];		//防止某些覆写的标题报错
		this._drill_sprite_particles_data = [];
	}
	if( !this._backgroundSprite ){		//标题后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//标题前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	for (var i = 0; i < DrillUp.title_particles.length; i++) {
		if( DrillUp.title_particles[i].length != 0 ){
			for( var j = 0; j < DrillUp.title_particles[i]['count'] ; j++ ){
				
				var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.title_particles[i] ));	//拷贝object（杜绝引用造成的修改）
				
				var temp_sprite = new Sprite(ImageManager.loadTitle1(temp_sprite_data['src_img']));
				temp_sprite.anchor.x = 0.5;
				temp_sprite.anchor.y = 0.5;
				temp_sprite.blendMode = temp_sprite_data['blendMode'];
				temp_sprite.zIndex = temp_sprite_data['zIndex'];
				temp_sprite.visible = DrillUp.global_title_particle_visible[i];
				
				this._drill_sprite_particles.push(temp_sprite);
				this._drill_sprite_particles_data.push(temp_sprite_data);
				if( temp_sprite_data['title_index'] == 0 ){
					this._backgroundSprite.addChild(temp_sprite);
				}else{
					this._foregroundSprite.addChild(temp_sprite);
				}
				
				this.drill_resetParticles(this._drill_sprite_particles_data.length-1);
			}

		}
	}
	this.drill_sortByZIndex();
};

//==============================
// * 刷新粒子
//==============================
var _drill_title_particle_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_title_particle_update.call(this);
	
	if ( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_title_particle ) {
		this.drill_createParticles();				//创建，进入界面后只执行一次
	}
	if (SceneManager._drill_title_particle) {this.drill_updateParticles()};
};

Scene_Title.prototype.drill_updateParticles = function() {
	for (var i = 0; i < this._drill_sprite_particles.length; i++) {
		this._drill_sprite_particles[i].x += this._drill_sprite_particles_data[i]['x_speed_random'];
		this._drill_sprite_particles[i].y += this._drill_sprite_particles_data[i]['y_speed_random'];
		this._drill_sprite_particles[i].rotation += this._drill_sprite_particles_data[i]['rotation_random'];
		this._drill_sprite_particles[i].opacity += 3 * this._drill_sprite_particles_data[i]['opacity_dir'];
		if(this._drill_sprite_particles[i].opacity >= 255){
			this._drill_sprite_particles_data[i]['opacity_dir'] = -1 * Math.random() ;
		}
    	if (this.drill_needResetParticles(i)) { this.drill_resetParticles(i);};
	};
};

//==============================
// * 粒子重设条件
//==============================	
Scene_Title.prototype.drill_needResetParticles = function(i) {
	var spr = this._drill_sprite_particles[i];
	var data = this._drill_sprite_particles_data[i];
	
	if (spr.x < -1 * Math.abs(data['start_x_fix']) - spr.width * 3) {return true};		//过边界
	if (spr.x > Math.abs(data['start_x_fix']) + Graphics.boxWidth + spr.width * 3) {return true};
	if (spr.y < -1 * Math.abs(data['start_y_fix']) - spr.height * 3) {return true};
	if (spr.y > Math.abs(data['start_y_fix']) + Graphics.boxHeight + spr.height * 3) {return true};
	
	if(spr.opacity == 0 && data['opacity_dir'] < 0 ){return true;}	//透明度低
	
	return false;
};

//==============================
// * 粒子重设
//==============================	
Scene_Title.prototype.drill_resetParticles = function(i) {
	var spr = this._drill_sprite_particles[i];
	var data = this._drill_sprite_particles_data[i];
	
	data['x_speed_random'] = ((Math.random() * 2) + 0.4) * data['x_speed'] + Math.random()-0.5;		//偏随机x方向
	data['y_speed_random'] = ((Math.random() * 2) + 0.4) * data['y_speed'] + Math.random()-0.5;		//偏随机y方向
	data['rotation_random']= ((Math.random() * data['rotation']));									//偏随机旋转
	data['opacity_dir'] = 1 * Math.random();
	data['start_x_fix'] = 0;
	data['start_y_fix'] = 0;
	if (data['x_speed'] > 0) { data['start_x_fix'] = -(Graphics.boxWidth / 4)};		//起点偏移x
	if (data['x_speed'] < 0) { data['start_x_fix'] = (Graphics.boxWidth / 4)};
	if (data['y_speed'] > 0) { data['start_y_fix'] = -(Graphics.boxHeight / 4)};	//起点偏移y
	if (data['y_speed'] < 0) { data['start_y_fix'] = (Graphics.boxHeight / 4)};
	
	spr.x = data['start_x_fix'] + Math.randomInt(Graphics.boxWidth);		//变化值
	spr.y = data['start_y_fix'] + Math.randomInt(Graphics.boxHeight);
	spr.opacity = 0;
	var pz = ((Math.random() * 0.5) * 1);
	spr.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	
	//this._drill_sprite_particles[i] = spr;			//data得到的是变量地址，不需要重新赋值
	//this._drill_sprite_particles_data[i] = data;
	
};


