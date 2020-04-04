//=============================================================================
// Drill_TitleSocialBotton.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        标题 - 网址按钮
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_TitleSocialBotton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在标题窗口中添加你的微信、qq等网址按钮。
 * 【支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 先确保项目img文件夹下是否有titles1文件夹！（img/titles1）
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-网址按钮1
 * 资源-网址按钮2
 * 资源-网址按钮3
 * ……
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 *
 * @param ----按钮组----
 * @default 
 *
 * @param 网址按钮-1
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-2
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-3
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-4
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-5
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-6
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-7
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-8
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-9
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 * @param 网址按钮-10
 * @parent ----按钮组----
 * @type struct<SocialBotton>
 * @desc 网址按钮的详细配置信息。
 * @default 
 *
 */
/*~struct~SocialBotton:
 *
 * @param 访问网址
 * @desc 访问目标网址的url。
 * @default https://rpg.blue/thread-409713-1-1.html
 *
 * @param 访问方式
 * @type select
 * @option 新建浏览器标签
 * @value browser
 * @option 新建窗口
 * @value window
 * @desc 访问浏览器的方式。浏览器标签只对用浏览器打开的情况有效，点击后会新建浏览器标签。
 * @default window
 *
 * @param 资源-按钮
 * @desc 网址按钮的图片资源。
 * @default 
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param 平移-按钮 X
 * @desc x轴方向平移，单位像素。0为按钮的中心贴在最左边。
 * @default 700
 *
 * @param 平移-按钮 Y
 * @desc x轴方向平移，单位像素。0为按钮的中心贴在最上面。
 * @default 570
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		简单的按钮点击事件，然后调用网页的跳转页面功能。
//

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_TitleSocialBotton = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_TitleSocialBotton');

	DrillUp.title_socialBtns_max = 10;
	DrillUp.title_socialBtns = [];
	
	for (var i = 0; i < DrillUp.title_socialBtns_max; i++) {
		if( DrillUp.parameters['网址按钮-' + String(i+1) ] != "" ){
			DrillUp.title_socialBtns[i] = JSON.parse(DrillUp.parameters['网址按钮-' + String(i+1) ]);
			
			DrillUp.title_socialBtns[i]['url'] = String(DrillUp.title_socialBtns[i]["访问网址"]);
			DrillUp.title_socialBtns[i]['type'] = String(DrillUp.title_socialBtns[i]["访问方式"]);
			DrillUp.title_socialBtns[i]['src_img'] = String(DrillUp.title_socialBtns[i]["资源-按钮"]);
			DrillUp.title_socialBtns[i]['x'] = Number(DrillUp.title_socialBtns[i]["平移-按钮 X"]);
			DrillUp.title_socialBtns[i]['y'] = Number(DrillUp.title_socialBtns[i]["平移-按钮 Y"]);
		}else{
			DrillUp.title_socialBtns[i] = [];
		}
	}

//=============================================================================
// ** 标题界面
//=============================================================================

//==============================
// * 标题-在前景的上一层添加布局
//==============================
var _drill_Title_socialBtn_createForeground = Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function() {
	_drill_Title_socialBtn_createForeground.call(this);
	this._drill_visible_btns = [];
	this._drill_social_btn_field = new Sprite();
	this.addChild(this._drill_social_btn_field);	
	
	for (var i = 0; i < DrillUp.title_socialBtns_max; i++) {
		if( DrillUp.title_socialBtns[i].length != 0 ){
			var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.title_socialBtns[i] ));	//拷贝object（杜绝引用造成的修改）
			
			var temp_sprite = new Sprite(ImageManager.loadTitle1(temp_sprite_data['src_img']));
			temp_sprite.anchor.x = 0.5;
			temp_sprite.anchor.y = 0.5;
			temp_sprite.x = temp_sprite_data['x'];
			temp_sprite.y = temp_sprite_data['y'];
			temp_sprite._drill_btn_url = temp_sprite_data['url'];
			temp_sprite._drill_btn_type = temp_sprite_data['type'];
			
			this._drill_visible_btns.push(temp_sprite);
			this._drill_social_btn_field.addChild(temp_sprite);
			
		}
	}
}

//==============================
// * 标题-帧刷新
//==============================
var _drill_Title_socialBtn_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function() { 
	_drill_Title_socialBtn_update.call(this);
    if (TouchInput.isTriggered()) {		//鼠标点击图片监听
		this.drill_checkImgTouch();
	};
}
//==============================
// * 标题-窗口点击事件
//==============================
Scene_Title.prototype.drill_checkImgTouch = function() {
	
	for (var i = 0; i < this._drill_visible_btns.length; i++) {
		if (this.drill_isOnSprite( this._drill_visible_btns[i] ) ) {
			
			this.openUrl(
				this._drill_visible_btns[i]._drill_btn_url,
				this._drill_visible_btns[i]._drill_btn_type);
			SoundManager.playOk();
		}
	}
}
//==============================
// * 标题-鼠标点击图片范围判断
//==============================
Scene_Title.prototype.drill_isOnSprite = function(sprite) {
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (TouchInput.x < sprite.x - cw) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y - ch) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * 标题-打开网址
//==============================
Scene_Title.prototype.openUrl = function(url, type) {
	
	if(type == "browser"){
		require('nw.gui'); gui.Shell.openExternal(url); 
		return;
	}
	if(type == "window"){
		window.open(url);
		return;
	}
};


