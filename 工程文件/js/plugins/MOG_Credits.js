//=============================================================================
// MOG_Credits.js
//=============================================================================

/*:
 * @plugindesc (v1.1)[v1.2]  标题 - 制作组
 * @author Moghunter （Drill_up翻译+优化）
 *
 * @param 资源-制作组背景
 * @desc 制作组背景的图片资源。
 * @default 制作组-背景
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param 资源-制作组内容
 * @desc 制作组内容的图片资源。
 * @default 制作组-内容
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param 用语-制作组
 * @desc 标题选项的名称用语。
 * @default 制作组
 *
 * @param 画面滚动速度
 * @desc 画面滚动的速度，可为小数。
 * @default 1.2
 *
 * @help  
 * =============================================================================
 * +++ MOG - Credits (v1.1) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 在标题弄一个制作组的效果，以滚动图片的方式播放。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/titles2
 * 先确保项目img文件夹下是否有titles2文件夹。
 * 使用制作组效果，需要配置资源文件：
 *
 * 资源-制作组背景
 * 资源-制作组内容
 *
 * 该插件固定两个资源为左上角的位置，也就是说，资源宽度为816才能
 * 达到居中效果。
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
　　Imported.MOG_Credits = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_Credits');
	Moghunter.credits_commandName = String(Moghunter.parameters['用语-制作组'] || "Credits");
    Moghunter.credits_scrollSpeed = Number(Moghunter.parameters['画面滚动速度'] || 1);
    Moghunter.credits_src_CreditsA = String(Moghunter.parameters['资源-制作组背景']);
    Moghunter.credits_src_CreditsB = String(Moghunter.parameters['资源-制作组内容']);
	
//=============================================================================
// ** Window Title Command
//=============================================================================	
//==============================
// * make Command List
//==============================
var _mog_credits_wtc_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _mog_credits_wtc_makeCommandList.call(this);
	this.addCommand(String(Moghunter.credits_commandName),   'mcredits');
};	
	
//=============================================================================
// ** Scene Tittle
//=============================================================================	

//==============================
// * create Command Window
//==============================
var _mog_credits_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _mog_credits_createCommandWindow.call(this);
	this._commandWindow.setHandler('mcredits',  this.commandMCredits.bind(this));
};

//==============================
// * command MCredits
//==============================
Scene_Title.prototype.commandMCredits = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_MCredits);
};


//=============================================================================
// ** Scene M Credits
//=============================================================================	

//==============================
// * create Command Window
//==============================
function Scene_MCredits() {
    this.initialize.apply(this, arguments);
}

Scene_MCredits.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MCredits.prototype.constructor = Scene_MCredits;

//==============================
// * initialize
//==============================
Scene_MCredits.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

//==============================
// * Create Mbackground
//==============================
Scene_MCredits.prototype.create_mbackground = function() {
};

//==============================
// * create
//==============================
Scene_MCredits.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createPictureCredit();
};

//==============================
// * create
//==============================
Scene_MCredits.prototype.createPictureCredit = function() {
	this._creditsSpeed = Math.min(Math.max(Moghunter.credits_scrollSpeed,0.5),10);
    this.pictureCredit = [];
	this.pictureCredit[0] = new Sprite(ImageManager.loadTitle2( Moghunter.credits_src_CreditsA));
	this.addChild(this.pictureCredit[0]);
	if (Imported.MOG_MenuParticles && !this.skip_particles()) {this.create_mparticles()};
	this.pictureCredit[1] = new Sprite(ImageManager.loadTitle2( Moghunter.credits_src_CreditsB));
	this.pictureCredit[1].y = Graphics.boxHeight / 2;
	this.pictureCredit[1].opacity = 0;	
	this.addChild(this.pictureCredit[1]);
};

//==============================
// * Press Any Key
//==============================
Scene_MCredits.prototype.pressAnyKey = function() {
    if (TouchInput.isTriggered()) {return true};
	if (TouchInput.isCancelled()) {return true};
	if (Input.isTriggered("ok")) {return true};
	if (Input.isTriggered("cancel")) {return true};
    return false;
};

//==============================
// * Update
//==============================
Scene_MCredits.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.pictureCredit[1].opacity += 1;
	this.pictureCredit[1].y -= this._creditsSpeed;
	if (this.pressAnyKey()) {SoundManager.playCursor();SceneManager.pop()};	 
	if (this.pictureCredit[1].y < -this.pictureCredit[1].height) {SceneManager.pop()};
	if (this._backgroundSprite) {this._backgroundSprite.visible = false};
};