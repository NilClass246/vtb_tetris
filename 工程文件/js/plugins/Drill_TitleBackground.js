//=============================================================================
// Drill_TitleBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        标题 - 多层标题背景
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题中放置一个或者多个背景，并可以切换显示状态。
 * 要了解更详细的组合方法，去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * 该插件用法与菜单一样，但是，存储数据是全局的。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有titles1文件夹！（img/titles1）
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认背景
 *
 * 背景1 资源-背景
 * 背景2 资源-背景
 * 背景3 资源-背景
 * ……
 *
 * 你可以在同一个标题里面加入非常多的不同种类的背景。
 * （标题不支持混合模式与透明度）
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制标题背景的显示情况：
 * 
 * 插件指令（显示）：    >标题背景 : A : 显示
 * 插件指令（隐藏）：    >标题背景 : A : 隐藏
 * 插件指令（隐藏全部）：>标题背景 : 隐藏全部
 *
 * 插件指令（设置音乐）：>标题背景 : B : 改变音乐
 *
 * 参数A：背景编号
 *        显示隐藏对应配置的编号。
 * 参数B：音乐编号
 *        标题播放对应的音乐编号。
 *
 * 示例：
 * 插件指令：>标题背景 : 1 : 显示
 * 插件指令：>标题背景 : 3 : 隐藏
 * （切换不同的标题背景，因为处于全局，设置后永久有效）
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范了插件指令格式。
 *
 * @param ---背景音乐组---
 * @default
 *
 * @param 背景音乐-1
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-2
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-3
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-4
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-5
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-6
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-7
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-8
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-9
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-10
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-11
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-12
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-13
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-14
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-15
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param 背景音乐-16
 * @parent ---背景音乐组---
 * @desc 背景音乐的资源。
 * @default 
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 *
 * @param ---背景组 1至20---
 * @default
 *
 * @param 背景-1
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-2
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-3
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-4
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-5
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-6
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-7
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-8
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-9
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-10
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-11
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-12
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-13
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-14
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-15
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-16
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-17
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-18
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-19
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-20
 * @parent ---背景组 1至20---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组21至40---
 * @default
 *
 * @param 背景-21
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-22
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-23
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-24
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-25
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-26
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-27
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-28
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-29
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-30
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-31
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-32
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-33
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-34
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-35
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-36
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-37
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-38
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-39
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-40
 * @parent ---背景组21至40---
 * @type struct<TitleBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 */
/*~struct~TitleBackground:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的标题背景==
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-背景
 * @desc 背景的图片资源。
 * @default 背景-默认背景
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 平移-背景 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入标题时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
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
 * @param 背景X速度
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 背景Y速度
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 *
 * @param 标题层级
 * @type select
 * @option 在标题框后面
 * @value 0
 * @option 在标题框前面
 * @value 1
 * @desc 背景所属的标题层级。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 背景在同一个标题层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_title_background_visible
//		覆盖重写方法	Scene_Title.prototype.playTitleMusic
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
　　Imported.Drill_TitleBackground = true;
　　var DrillUp = DrillUp || {}; 

	DrillUp.parameters = PluginManager.parameters('Drill_TitleBackground');
	
	DrillUp.title_backgrounds_max = 40;
	DrillUp.title_backgrounds = [];
	
	for (var i = 0; i < DrillUp.title_backgrounds_max; i++) {
		if( DrillUp.parameters['背景-' + String(i+1) ] != "" ){
			DrillUp.title_backgrounds[i] = JSON.parse(DrillUp.parameters['背景-' + String(i+1) ]);
			DrillUp.title_backgrounds[i]['visible'] = String(DrillUp.title_backgrounds[i]["初始是否显示"] || "true") == "true";
			DrillUp.title_backgrounds[i]['src_img'] = String(DrillUp.title_backgrounds[i]["资源-背景"]);
			DrillUp.title_backgrounds[i]['x'] = Number(DrillUp.title_backgrounds[i]["平移-背景 X"]);
			DrillUp.title_backgrounds[i]['y'] = Number(DrillUp.title_backgrounds[i]["平移-背景 Y"]);
			DrillUp.title_backgrounds[i]['opacity'] = Number(DrillUp.title_backgrounds[i]["透明度"]);
			DrillUp.title_backgrounds[i]['blendMode'] = Number(DrillUp.title_backgrounds[i]["混合模式"]);
			DrillUp.title_backgrounds[i]['x_speed'] = Number(DrillUp.title_backgrounds[i]["背景X速度"]);
			DrillUp.title_backgrounds[i]['y_speed'] = Number(DrillUp.title_backgrounds[i]["背景Y速度"]);
			DrillUp.title_backgrounds[i]['title_index'] = Number(DrillUp.title_backgrounds[i]["标题层级"]);
			DrillUp.title_backgrounds[i]['zIndex'] = Number(DrillUp.title_backgrounds[i]["图片层级"]);
		}else{
			DrillUp.title_backgrounds[i] = [];
		}
	}
	
	DrillUp.title_bgm_max = 16;
	DrillUp.title_bgm = [];
	for (var i = 0; i < DrillUp.title_bgm_max; i++) {
		DrillUp.title_bgm[i] = String(DrillUp.parameters['背景音乐-' + String(i + 1)] || "");
	};
	
//=============================================================================
// ** 全局读取
//=============================================================================
	var _drill_global = DataManager.loadGlobalInfo();
	//alert(JSON.stringify(_drill_global));
	if( !DrillUp.global_title_background_visible ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_title_background_visible"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_title_background_visible = _drill_global[0]["_global_title_background_visible"];
		}else{
			DrillUp.global_title_background_visible = [];
			for (var i = 0; i < DrillUp.title_backgrounds.length; i++) {
				DrillUp.global_title_background_visible.push( DrillUp.title_backgrounds[i]['visible'] );
			}
		}
	}
	if( !DrillUp.global_title_bgm ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_title_bgm"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_title_bgm = _drill_global[0]["_global_title_bgm"];
		}else{
			DrillUp.global_title_bgm = 0;
		}
	}
	
//=============================================================================
// ** 全局存储
//=============================================================================
var _drill_TitleBackground_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	info[0]["_global_title_background_visible"] = DrillUp.global_title_background_visible;
	info[0]["_global_title_bgm"] = DrillUp.global_title_bgm;
	_drill_TitleBackground_saveGlobal.call(this,info);
};
DataManager.forceSaveGlobalInfo = function() {		//强制存储（任何改变的全局变量的地方都需要调用该方法）
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_title_backgrounds_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_title_backgrounds_pluginCommand.call(this, command, args);
	if (command === '>标题背景') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '显示') {
				DrillUp.global_title_background_visible[temp1] = true;
				DataManager.forceSaveGlobalInfo();
			}
			if (type === '隐藏') {
				DrillUp.global_title_background_visible[temp1] = false;
				DataManager.forceSaveGlobalInfo();
			}
			if (type === '改变音乐') {
				DrillUp.global_title_bgm = temp1;
				DataManager.forceSaveGlobalInfo();
			}
		}
		if(args.length == 2){
			var type = String(args[1]);
			if (type === '隐藏全部') {
				for(var i=0; i<DrillUp.global_title_background_visible.length; i++){
					DrillUp.global_title_background_visible[i] = false;
				}
				DataManager.forceSaveGlobalInfo();
			}
		}
	}
	
};
//=============================================================================
// ** 标题背景音乐
//=============================================================================
Scene_Title.prototype.playTitleMusic = function() {
	var bgm = {};
	bgm.name = DrillUp.title_bgm[DrillUp.global_title_bgm];
	bgm.pitch = 100;
	bgm.volume = 100;
	$dataSystem.titleBgm = bgm;
	
    AudioManager.playBgm($dataSystem.titleBgm);
    AudioManager.stopBgs();
    AudioManager.stopMe();
};

//=============================================================================
// ** 从 Scene_Title 中进行背景追加
//=============================================================================

var _drill_title_background_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	SceneManager._drill_title_background = false;	
   	this._drill_sprite_backgrounds = [];							//注意，该数组与DrillUp.title_backgrounds数组的下标不同步，要使用data
   	this._drill_sprite_backgrounds_data = [];
	_drill_title_background_createBackground.call(this);		//与背景一同创建
	
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
// * 创建背景
//==============================
Scene_Title.prototype.drill_createBackgrounds = function() {	
	SceneManager._drill_title_background = true;	//只创建一次
	
	if(!this._drill_sprite_backgrounds){
		this._drill_sprite_backgrounds = [];		//防止某些覆写的标题报错
		this._drill_sprite_backgrounds_data = [];
	}
	if( !this._backgroundSprite ){		//标题后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//标题前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	for (var i = 0; i < DrillUp.title_backgrounds.length; i++) {
		if( DrillUp.title_backgrounds[i].length != 0 ){
			var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.title_backgrounds[i] ));	//拷贝object（杜绝引用造成的修改）
			var temp_sprite = new TilingSprite(ImageManager.loadTitle1(temp_sprite_data['src_img']));	//TilingSprite平铺图层
			temp_sprite.move(0, 0, Graphics.width, Graphics.height);
			temp_sprite.origin.x = temp_sprite_data['x'];
			temp_sprite.origin.y = temp_sprite_data['y'];
			temp_sprite.opacity = temp_sprite_data['opacity'];
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.zIndex = temp_sprite_data['zIndex'];
			temp_sprite.visible = DrillUp.global_title_background_visible[i];
			
			this._drill_sprite_backgrounds.push(temp_sprite);
			this._drill_sprite_backgrounds_data.push(temp_sprite_data);
			if( temp_sprite_data['title_index'] == 0 ){
				this._backgroundSprite.addChild(temp_sprite);
			}else{
				this._foregroundSprite.addChild(temp_sprite);
			}
		}
	}
	this.drill_sortByZIndex();
};

//==============================
// * 刷新背景
//==============================
var _drill_title_background_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() {
	_drill_title_background_update.call(this);
	
	if ( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_title_background ) {
		this.drill_createBackgrounds();				//创建，进入界面后只执行一次
	}
	if ( SceneManager._drill_title_background ) {this.drill_updateBackgrounds()};
};

Scene_Title.prototype.drill_updateBackgrounds = function() {
	for (var i = 0; i < this._drill_sprite_backgrounds.length; i++) {
		this._drill_sprite_backgrounds[i].origin.x += this._drill_sprite_backgrounds_data[i]['x_speed'];
		this._drill_sprite_backgrounds[i].origin.y += this._drill_sprite_backgrounds_data[i]['y_speed'];
	};
};


