//=============================================================================
// MOG_Scrollbar.js
//=============================================================================

/*:
 * @plugindesc (v2.2)[v1.2]  主菜单 - 滚动条
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param 是否一直显示
 * @type boolean
 * @on 一直显示
 * @off 自动按需要显示
 * @desc true - 一直显示，false - 自动按需要显示
 * @default false
 *
 * @param 资源-滚动框
 * @desc 滚动框的图片资源。
 * @default 滚动条-外框
 * @require 1
 * @dir img/Menu__ui/
 * @type file
 *
 * @param 偏移-滚动框 X
 * @desc 以列表框右上角分配点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 偏移-滚动框 Y
 * @desc 以列表框右上角分配点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 资源-滚动内条
 * @desc 滚动框的图片资源。
 * @default 滚动条-内条
 * @require 1
 * @dir img/Menu__ui/
 * @type file
 *
 * @param 偏移-滚动内条 X
 * @desc 以列表框右上角分配点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 1
 *
 * @param 偏移-滚动内条 Y
 * @desc 以列表框右上角分配点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 1
 *
 * @help  
 * =============================================================================
 * +++ MOG - Scroll Bar (v2.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 游戏菜单中，当窗口的元素过多不能全显示时，右侧会出现一列滚动条。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、菜单界面、地图界面。
 *   滚动条作用于所有含选项的窗口。
 * 2.滚动条只显示，不能被鼠标拖动。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui文件夹。
 * 使用滚动条，需要配置资源文件：
 *
 * 资源-滚动框
 * 资源-滚动内条
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 修改了插件关联的资源文件夹。
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_Scrollbar = true;
　　var Moghunter = Moghunter || {}; 

    Moghunter.parameters = PluginManager.parameters('MOG_Scrollbar');
	Moghunter.scrollBarAlwaysVisible = String(Moghunter.parameters['是否一直显示'] || 'false');
    Moghunter.scrollBarX = Number(Moghunter.parameters['偏移-滚动框 X'] || 0);
    Moghunter.scrollBarY = Number(Moghunter.parameters['偏移-滚动框 Y'] || 0);	
    Moghunter.scrollBar_ButtonX = Number(Moghunter.parameters['偏移-滚动内条 X'] || 1);
    Moghunter.scrollBar_ButtonY = Number(Moghunter.parameters['偏移-滚动内条 Y'] || 1);	

	Moghunter.src_ScrollBarA = String(Moghunter.parameters['资源-滚动框']);
	Moghunter.src_ScrollBarB = String(Moghunter.parameters['资源-滚动内条']);
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuUi = function(filename) {
    return this.loadBitmap('img/Menu__ui/', filename, 0, true);
};

//=============================================================================
// ** Window Selectable
//=============================================================================	
//==============================
// * Initialize
//==============================
var _mog_scrollbar_winSel_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(x, y, width, height) {
	_mog_scrollbar_winSel_initialize.call(this,x, y, width, height);
	this.createScrollBar();
};

//==============================
// * create Scroll Bar
//==============================
Window_Selectable.prototype.createScrollBar = function() {
	this._refScroll = true;
	this._scrollBar = new SpriteScrollBar(this);
	var id = this.scrollBarSetChild();
	this.addChildAt(this._scrollBar,id);
};

//==============================
// * scrollBarSetChild
//==============================
Window_Selectable.prototype.scrollBarSetChild = function() {
	var id = 3;
	if (id > this.children.length) {id = this.children.length};
	return id;
};

//==============================
// * set Cursor Rect
//==============================
var _mog_scroll_setCursorRect = Window_Selectable.prototype.setCursorRect;
Window_Selectable.prototype.setCursorRect = function(x, y, width, height) {
	_mog_scroll_setCursorRect.call(this,x, y, width, height);
    this._refScroll = true;
};

//==============================
// * select
//==============================
var _mog_scrollbar_wsel_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
	_mog_scrollbar_wsel_select .call(this,index);
    if (this._scrollBar) {this._scrollBar.update()};
};

//=============================================================================
// ** Sprite Scroll Bar
//=============================================================================
function SpriteScrollBar() {
    this.initialize.apply(this, arguments);
};

SpriteScrollBar.prototype = Object.create(Sprite.prototype);
SpriteScrollBar.prototype.constructor = SpriteScrollBar;

//==============================
// * Initialize
//==============================
SpriteScrollBar.prototype.initialize = function(win) {
    Sprite.prototype.initialize.call(this);
	this._window = win;	
	this.visible = false;
    this._avisble = String(Moghunter.scrollBarAlwaysVisible) === 'true' ? true : false;
	this.loadBitmaps();
	this.createSprites();
};

//==============================
// * Load Bitmaps
//==============================
SpriteScrollBar.prototype.loadBitmaps = function() {
   this._img1 = ImageManager.load_MenuUi(Moghunter.src_ScrollBarA);
   this._img2 = ImageManager.load_MenuUi(Moghunter.src_ScrollBarB);
};

//==============================
// * rc
//==============================
SpriteScrollBar.prototype.rc = function() {
   return this._window._cursorRect
};

//==============================
// * create Sprites
//==============================
SpriteScrollBar.prototype.createSprites = function() {
    this.createBack();
	this.createButton();
};

//==============================
// * create Back
//==============================
SpriteScrollBar.prototype.createButton = function() {
    this._button = [];
	this._button._ny = 0;
	this._button._maxItens = -1;
	this._button._maxTopRow = -1;
	for (var i = 0; i < 3; i++) {
		 this._button[i] = new Sprite(this._img2);
		 this._button[i].visible = false;
		 this.addChild(this._button[i]);
	};	
};

//==============================
// * refresh button
//==============================
SpriteScrollBar.prototype.refreshButton = function() {
	var w = this._img2.width / 2;
	var h = this._img2.height;
    for (var i = 0; i < this._button.length; i++) {
		 var p = [0,-999];
		 var bx = Moghunter.scrollBar_ButtonX;
		 var by = this.buttonPos();
		 this._button[i].setFrame(0,0,w,h);
		 this._button[i].visible = true;
		 if (i === 0) {p = [bx,by - this._img2.height]};
		 if (i === 1) {p = [bx,by];this._button[i].setFrame(w,0,w,h)};
		 if (i === 2) {p = [bx,by + this.buttonSize() + this._img2.height]};
		 this._button[i].x = p[0];
	     if (this._button._maxItens != this._window.maxItems()) {
			 this._button[i].y = p[1]
			
		};
	};
	this.setScaleButton();
	this._button._maxItens = this._window.maxItems();
};

//==============================
// * update Button
//==============================
SpriteScrollBar.prototype.updateButton = function() {
    for (var i = 0; i < this._button.length; i++) {
		 var by = this.buttonPos();
		 if (i === 0) {ny = by - this._img2.height};
		 if (i === 1) {ny = by};
		 if (i === 2) {ny = by + this.buttonSize() + this._img2.height};
	     this._button[i].y = this.moveto(this._button[i].y,ny);
	};
};

//==============================
// * button Size
//==============================
SpriteScrollBar.prototype.buttonSize = function() {
	var size = (this.heightF() - (this.padding() * this._window.maxTopRow()));
	return Math.min(Math.max(size,this.padding()),this.heightF());
};

//==============================
// * moveto
//==============================
SpriteScrollBar.prototype.moveto = function(value,real_value) {
	if (value == real_value) {return value};
	var dnspeed = 3 + (Math.abs(value - real_value) / 10);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * scroll Bar Y
//==============================
SpriteScrollBar.prototype.scrollBarY = function() {
	return Moghunter.scrollBar_ButtonY;
};

//==============================
// * button Pos
//==============================
SpriteScrollBar.prototype.buttonPos = function() {
	var space_max = this.heightF() - this.buttonSize();
 	var space = space_max / this._window.maxTopRow();
	var s = Math.min(Math.max(space,0.001),space_max);
	var y = this.scrollBarY() + (s * Math.floor(this._window.topIndex() / this._window.maxCols()));
	return Math.min(Math.max(y,0),space_max);
};

//==============================
// * set Scale Button
//==============================
SpriteScrollBar.prototype.setScaleButton = function() {
    this._button[1].scale.y = this.buttonSize() / this._img2.height;
	this._button[2].scale.y = -1.00;
};

//==============================
// * create Back
//==============================
SpriteScrollBar.prototype.createBack = function() {
    this._back = [];
	for (var i = 0; i < 3; i++) {
		 this._back[i] = new Sprite(this._img1);
		 this._back[i].visible = false;
		 this.addChild(this._back[i]);
	};	
};

//==============================
// * refresh Back
//==============================
SpriteScrollBar.prototype.refreshBack = function() {
	var w = this._img1.width / 2;
	var h = this._img1.height;
    for (var i = 0; i < this._back.length; i++) {
		 var p = [0,0];
		 this._back[i].setFrame(0,0,w,h);
		 if (i === 0) {p = [0,-this._img1.height]};
		 if (i === 1) {p = [0,0];this._back[i].setFrame(w,0,w,h)};
		 if (i === 2) {p = [0,this.heightF() + this._img1.height]};
		 this._back[i].x = p[0];
		 this._back[i].y = p[1];
		 this._back[i].visible = true;
	};
	this.setScaleBack();
};

//==============================
// * Set Scale Back
//==============================
SpriteScrollBar.prototype.setScaleBack = function() {
    this._back[1].scale.y = this.heightF() / this._img1.height;
	this._back[2].scale.y = -1.00;
};

//==============================
// * Padding
//==============================
SpriteScrollBar.prototype.padding = function() {
   return this._window.standardPadding()
};

//==============================
// * Pos X
//==============================
SpriteScrollBar.prototype.posX = function() {
	return this._window.width - this.padding() + Moghunter.scrollBarX;
};

//==============================
// * Pos Y
//==============================
SpriteScrollBar.prototype.posY = function() {
	return this.padding() + Moghunter.scrollBarY;
};

//==============================
// * Height F
//==============================
SpriteScrollBar.prototype.heightF = function() {
    return this._window.height - (this.padding() * 2);
};

//==============================
// * refresh Sprites
//==============================
SpriteScrollBar.prototype.refreshSprites = function() {
    this._window._refScroll = false;
	this._button._maxTopRow = this._window.maxTopRow();
	this.refreshBack();
	this.refreshButton();
};

//==============================
// * needRefresh
//==============================
SpriteScrollBar.prototype.needRefresh = function() {
	if (this._window._refScroll) {return true};
	if (this._button._maxTopRow != this._window.maxTopRow()) {return true}; 
    return false;
};

//==============================
// * update Position
//==============================
SpriteScrollBar.prototype.updatePosition = function() {
     if (this.needRefresh()) {this.refreshSprites()};
	 this.updateButton();
	 this.visible = this.isVisible();
	 this.x = this.posX();
  	 this.y = this.posY();
     this.opacity = this._window.contentsOpacity;
	 if (!this.visible) {this._button._maxItens = -2}; 
};

//==============================
// * Is Visible
//==============================
SpriteScrollBar.prototype.isVisible = function() {
	if (this._window._opening) {return false};
	if (this._window._closing) {return false};
	if (this._window.openness <= 0) {return false};
	if (!this._window.visible) {return false};
	if (this._window.maxTopRow() === 0) {return false};
	if (!this._avisble && !this._window.active) {return false};
	return true;
};

//==============================
// * Update
//==============================
SpriteScrollBar.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this._img1) {return};
    if (!this._img1.isReady()) {return};
	if (!this.rc()) {this.visible = false;return};
	this.updatePosition();
};