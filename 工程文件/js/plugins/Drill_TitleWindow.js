//=============================================================================
// Drill_TitleWindow.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        标题 - 标题窗口
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleWindow +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以对标题窗口、标题文字进行设置。
 * 如果要了解更多信息，去看看"关于菜单背景,粒子,魔法圈.docx"。
 * ★★必须放在插件 MOG_Credits 制作组 的后面★★
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有titles1文件夹！（img/titles1）
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 标题窗口-1
 * 标题窗口-2
 * 标题窗口-3
 * ……
 *
 * 由于游戏的过程中，标题的选项可能会变化，这里的布局可以通过插件
 * 指令调整。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以改变菜单的布局设置图片：（注意，插件指令做出的改变是全局的）
 * 
 * 插件指令：>标题窗口 : A : 改变布局
 *
 * 参数A：标题窗口的编号
 *
 * 示例：
 * 插件指令：>标题窗口 : 2 : 改变布局
 * （切换窗口布局为2号配置的图片）
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 规范了插件指令格式。
 *
 * @param ----杂项----
 * @default 
 *
 * @param 是否显示标题文字
 * @parent ----杂项----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 标题文字 X
 * @parent ----杂项----
 * @desc x轴方向平移，单位像素。0为文字中心贴在正中间。（可为负数）
 * @default 0
 *
 * @param 标题文字 Y
 * @parent ----杂项----
 * @desc y轴方向平移，单位像素。0为文字中心贴在最上面。
 * @default 156
 *
 * @param 标题文字字体大小
 * @parent ----杂项----
 * @type number
 * @min 1
 * @desc 标题文字的字体大小。
 * @default 72
 *
 * @param 标题文字描边厚度
 * @parent ----杂项----
 * @type number
 * @min 0
 * @desc 标题文字的描黑边的厚度，单位像素。
 * @default 8
 *
 * @param 是否添加退出选项
 * @parent ----杂项----
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加
 * @default true
 *
 * @param 用语-退出选项
 * @parent ----杂项----
 * @desc 退出选项的用语显示文本。（新游戏、继续等其他选项，在 数据库>用语 中设置。）
 * @default 退出
 *
 * @param ----标题窗口----
 * @default 
 * 
 * @param 平移-标题窗口 X
 * @parent ----标题窗口----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 273
 *
 * @param 平移-标题窗口 Y
 * @parent ----标题窗口----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 285
 *
 * @param 标题窗口起点 X
 * @parent ----标题窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -80
 *
 * @param 标题窗口起点 Y
 * @parent ----标题窗口----
 * @desc 窗口初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 标题窗口移动时长
 * @parent ----标题窗口----
 * @type number
 * @min 1
 * @desc 从偏移的位置到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 是否使用标题窗口布局
 * @parent ----标题窗口----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 平移-标题窗口布局 X
 * @parent 是否使用标题窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-标题窗口布局 Y
 * @parent 是否使用标题窗口布局
 * @desc 修正图片的偏移用。以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 标题窗口宽度
 * @parent ----标题窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的宽度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 270
 *
 * @param 标题窗口高度
 * @parent ----标题窗口----
 * @type number
 * @min 50
 * @desc 窗口将一个规划的矩形区域，矩形区域内控制文本显示，这里是矩形的高度，注意，矩形和资源图片的宽高没有任何关系！
 * @default 320
 *
 * @param 标题窗口列数
 * @parent ----标题窗口----
 * @type number
 * @min 1
 * @desc 标题窗口的列数。
 * @default 1
 *
 * @param 标题窗口字体大小
 * @parent ----标题窗口----
 * @type number
 * @min 1
 * @desc 标题窗口的字体大小。图标无法根据字体大小变化。
 * @default 22
 *
 * @param 标题对齐方式
 * @parent ----标题窗口----
 * @type select
 * @option 左对齐
 * @value left
 * @option 居中
 * @value center
 * @option 右对齐
 * @value right
 * @desc 选项文本的对齐方式，left - 左对齐，center - 居中，right - 右对齐。
 * @default center
 *
 *
 * @param 标题窗口-1
 * @desc 标题窗口布局的图片资源，默认使用第一个布局。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-2
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-3
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-4
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-5
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-6
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-7
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-8
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-9
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 标题窗口-10
 * @desc 修改的标题窗口布局图片资源。
 * @parent 是否使用标题窗口布局
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	无
//		全局存储变量	DrillUp.global_title_window_bitmap
//		覆盖重写方法	Scene_Title.prototype.drawGameTitle
//						Scene_Title.prototype.createCommandWindow
//
//插件记录：
//		本来打算把标题变成图片按钮的，但是由于各个插件都可以添加到标题，
//		复杂度太高，干脆还是保持原来的窗口模式。
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_TitleWindow = true;
　　var DrillUp = DrillUp || {}; 

	DrillUp.parameters = PluginManager.parameters('Drill_TitleWindow');
	
	DrillUp.titleWindow_text_visible = String(DrillUp.parameters['是否显示标题文字'] || "true") === "true";	
	DrillUp.titleWindow_text_x = Number(DrillUp.parameters['标题文字 X'] || 30);
	DrillUp.titleWindow_text_y = Number(DrillUp.parameters['标题文字 Y'] || 120);
	DrillUp.titleWindow_text_fontsize = Number(DrillUp.parameters['标题文字字体大小'] || 72);
	DrillUp.titleWindow_text_outlineWidth = Number(DrillUp.parameters['标题文字描边厚度'] || 8);
	DrillUp.titleWindow_quit_option = String(DrillUp.parameters['是否添加退出选项'] || "true") === "true";
	DrillUp.titleWindow_quit_text = String(DrillUp.parameters['用语-退出选项'] || "退出");
	
	DrillUp.titleWindow_x = Number(DrillUp.parameters['平移-标题窗口 X'] || 30);
	DrillUp.titleWindow_y = Number(DrillUp.parameters['平移-标题窗口 Y'] || 120);
	DrillUp.titleWindow_slideX = Number(DrillUp.parameters['标题窗口起点 X'] || -100);
	DrillUp.titleWindow_slideY = Number(DrillUp.parameters['标题窗口起点 Y'] || 0);
	DrillUp.titleWindow_slideTime = Number(DrillUp.parameters['标题窗口移动时长'] || 30);
	DrillUp.titleWindow_Layout_visible = String(DrillUp.parameters['是否使用标题窗口布局'] || "true") === "true";	
	DrillUp.titleWindow_LayoutX = Number(DrillUp.parameters['平移-标题窗口布局 X'] || 0);
	DrillUp.titleWindow_LayoutY = Number(DrillUp.parameters['平移-标题窗口布局 Y'] || 0);
	DrillUp.titleWindow_width = Number(DrillUp.parameters['标题窗口宽度'] || 220);
	DrillUp.titleWindow_height = Number(DrillUp.parameters['标题窗口高度'] || 460);
	DrillUp.titleWindow_col = Number(DrillUp.parameters['标题窗口列数'] || 1);
	DrillUp.titleWindow_fontsize = Number(DrillUp.parameters['标题窗口字体大小'] || 22);
    DrillUp.titleWindow_align  = String(DrillUp.parameters['标题对齐方式'] || "left");	

	DrillUp.titleWindow_list_length = 10;
	DrillUp.titleWindow_list = [];
	for (var i = 0; i < DrillUp.titleWindow_list_length ; i++ ) {
		DrillUp.titleWindow_list[i] = String(DrillUp.parameters['标题窗口-' + String(i+1) ] || "");
	};
	
//=============================================================================
// ** 全局读取
//=============================================================================
	var _drill_global = DataManager.loadGlobalInfo();
	//alert(JSON.stringify(_drill_global));
	if( !DrillUp.global_title_window_bitmap ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_title_window_bitmap"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_title_window_bitmap = _drill_global[0]["_global_title_window_bitmap"];
		}else{
			DrillUp.global_title_window_bitmap = DrillUp.titleWindow_list[0];
		}
	}
	
//=============================================================================
// ** 全局存储
//=============================================================================
var _drill_title_window_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	info[0]["_global_title_window_bitmap"] = DrillUp.global_title_window_bitmap;
	_drill_title_window_saveGlobal.call(this,info);
};
DataManager.forceSaveGlobalInfo = function() {		//强制存储（任何改变的全局变量的地方都需要调用该方法）
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_title_window_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_title_window_pluginCommand.call(this, command, args);
	if (command === '>标题窗口') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '改变布局') {
				DrillUp.global_title_window_bitmap = DrillUp.titleWindow_list[temp1];
				DataManager.forceSaveGlobalInfo();
			}
		}
	}
};

//=============================================================================
// ** 标题界面
//=============================================================================

//==============================
// * 标题-标题文字
//==============================
Scene_Title.prototype.drawGameTitle = function() {
    var x = DrillUp.titleWindow_text_x;
    var y = DrillUp.titleWindow_text_y;
    var maxWidth = Graphics.width;
    var text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = DrillUp.titleWindow_text_outlineWidth;
    this._gameTitleSprite.bitmap.fontSize = DrillUp.titleWindow_text_fontsize;
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, DrillUp.titleWindow_text_fontsize/2, 'center');
	this._gameTitleSprite.visible = DrillUp.titleWindow_text_visible;
};

//==============================
// * 标题-退出选项
//==============================
var _drill_title_window_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	_drill_title_window_createCommandWindow.call(this);
    this._commandWindow.setHandler('drill_title_quit',  this.drill_commandQuit.bind(this));
};
Scene_Title.prototype.drill_commandQuit = function() {
    this._commandWindow.close();
    SceneManager.pop();
};
var _drill_title_window_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _drill_title_window_makeCommandList.call(this);
	if( DrillUp.titleWindow_quit_option ){
		this.addCommand(DrillUp.titleWindow_quit_text, 'drill_title_quit');
	}
};

//==============================
// * 标题-每帧刷新
//==============================
var _drill_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() { 
	_drill_Title_update.call(this);
	this.drill_updateTitleWindow();
}

//==============================
// * 标题-在背景的上一层添加布局
//==============================
var _drill_Title_createBackground = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
	_drill_Title_createBackground.call(this);
	this._drill_window_field = new Sprite();
	this.addChild(this._drill_window_field);	
}
//=============================================================================
// ** 标题界面
//=============================================================================

//==============================
// * 标题-标题窗口初始化
//==============================
var _drill_title_window_createCommandWindow_init = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
	_drill_title_window_createCommandWindow_init.call(this);
	var wx = DrillUp.titleWindow_x;
    var wy = DrillUp.titleWindow_y;
	var ww = DrillUp.titleWindow_width;
    var wh = DrillUp.titleWindow_height;
    this._commandWindow.x = wx + DrillUp.titleWindow_slideX;
    this._commandWindow.y = wy + DrillUp.titleWindow_slideY;
    this._commandWindow.width = ww;
    this._commandWindow.height = wh;
	this._commandWindow.windowWidth = function(){ return ww;}
	this._commandWindow.windowHeight = function(){ return wh;}
	this._commandWindow.opacity = 0;
	this._commandWindow.contentsOpacity = 0;
	//this._commandWindow.visible = false;
	this._commandWindow._move = 0;
	this._commandWindow.standardFontSize = function(){ return DrillUp.titleWindow_fontsize;}
	if( DrillUp.titleWindow_Layout_visible ){
		this._layout_commandWindow = new Sprite(ImageManager.loadTitle1(DrillUp.global_title_window_bitmap));
		this._layout_commandWindow.opacity = 0;
		this._drill_window_field.addChild(this._layout_commandWindow);	
	}
    //this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    //this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    //this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
    //this.addWindow(this._commandWindow);
};

//==============================
// * 标题-标题窗口帧刷新
//==============================
Scene_Title.prototype.drill_updateTitleWindow = function() {
	if( this._commandWindow.isOpen() ){
		this._commandWindow._move += 1;
		if( this._commandWindow._move <= DrillUp.titleWindow_slideTime ){
			this._commandWindow.x -= DrillUp.titleWindow_slideX / DrillUp.titleWindow_slideTime;
			this._commandWindow.y -= DrillUp.titleWindow_slideY / DrillUp.titleWindow_slideTime;
			this._commandWindow.contentsOpacity += 256 / DrillUp.titleWindow_slideTime;
			if( DrillUp.titleWindow_Layout_visible ){
				this._layout_commandWindow.x = this._commandWindow.x + DrillUp.titleWindow_LayoutX;
				this._layout_commandWindow.y = this._commandWindow.y + DrillUp.titleWindow_LayoutY;
				this._layout_commandWindow.opacity = this._commandWindow.contentsOpacity;
			}else{
				this._commandWindow.opacity += 256 / DrillUp.titleWindow_slideTime;
			}
		}
	}
}

Window_TitleCommand.prototype.windowWidth = function() {
    return DrillUp.titleWindow_width;
};
Window_TitleCommand.prototype.maxCols = function() {
    return DrillUp.titleWindow_col;
};
Window_TitleCommand.prototype.itemTextAlign = function() {
    return DrillUp.titleWindow_align;
};

