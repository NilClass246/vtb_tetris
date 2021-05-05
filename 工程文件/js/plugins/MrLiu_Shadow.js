//=============================================================================

// MrLiu_Shadow.js

//=============================================================================

/*:

 * Version: 2015-11-17-0001

 * @plugindesc 在RMMV游戏中非战斗界面下显示人物影子,

 * @help 使用方法：

 * 默认情况下主角和队列都会显示影子，地图事件名中含有Sh则显示影子。

 * @author 过眼云烟

 */

var Imported = Imported || {};

Imported.MrLiu_Shadow = true;

 
var Lmd = Lmd || {};

Lmd.MrLiu_Shadow = Lmd.MrLiu_Shadow || {};

 
 
Lmd.MrLiu_Shadow.Sprite_Character_initialize = Sprite_Character.prototype.initialize;

Sprite_Character.prototype.initialize = function(character) {

    Lmd.MrLiu_Shadow.Sprite_Character_initialize.call(this,character);

        this._temperycharacter = character;

        if ((character instanceof Game_Player)||(character instanceof Game_Follower)){

                this.createShadowSet();

                this._showShadow = true;

        }

        if ((character instanceof Game_Event) && (character.event().name.indexOf("Sh")>=0)){

                this.createShadowSet();

                this._showShadow = true;

        }

};

 
Sprite_Character.prototype.createShadowSet = function() {

    this._shadowSprite = new Sprite();

    this._shadowSprite.bitmap = ImageManager.loadSystem('Shadow1');

        this._shadowSprite.x = this.x;

    this._shadowSprite.y = this.y+8;

        this._shadowSprite.anchor.x = 0.5;

    this._shadowSprite.anchor.y = 1;
    this._shadowSprite.scale.x = 0.7;
    this._shadowSprite.scale.y = 0.7;

    this._shadowSprite.z = -1;

    this.addChild(this._shadowSprite);

}        

 
Sprite_Character.prototype.update_character_shadow = function() {

        this._shadowSprite.scale.x = ((this.patternWidth() * 100) / 48) / 90.0;

        this._shadowSprite.scale.y = this._shadowSprite.scale.x;

    this._shadowSprite.opacity = 150;

        this._shadowSprite.visible = (this._characterName != "");

        if (this._lastone != this._shadowx){

        this._lastone = this._shadowx;

        console.log(this._shadowx);

        }

}        

 
Lmd.MrLiu_Shadow.Sprite_Character_update = Sprite_Character.prototype.update;

Sprite_Character.prototype.update = function() {

        Lmd.MrLiu_Shadow.Sprite_Character_update.call(this);

        if (this._showShadow == true) {

        this.update_character_shadow();

        }

}