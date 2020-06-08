//=============================================================================
// NilCalss 插件 - 角色光源阴影
// NC_Shadow.js
//=============================================================================

var NC = NC || {}
NC.temps = NC.temps || {}

//=============================================================================
/*:
 * @plugindesc [地图角色光源阴影插件]
 * @author NilClass
 *
 * @param 阴影素材
 * @desc 阴影图片的素材路径
 * @default CharacterShadow
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param 阴影最大强度
 * @type number
 * @min 0
 * @max 255
 * @require 1
 * @desc 阴影所能显示出的的最大透明度
 * @default 200
 * 
 * 
 * @help
 * =============================================================================
 * +++ RM插件 - 角色光源阴影 +++
 * By NilClass
 * https://github.com/NilClass246
 * =============================================================================
 * 此插件用于设定在光源下的角色阴影。
 * 在靠近指定事件（光源）时，会在玩家脚下自动生成一个阴影。
 * =============================================================================
 * 使用方法：
 * 在事件注释中写入：
 * 角色阴影:A
 * 其中，A为会产生阴影的半径，单位为像素
 * =============================================================================
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 果真有为钢铁鏖战的不眠之夜？
 * 果真有哈拉库图之鹰？
 * ————《哈拉库图》王昌耀
 */

NC.parameters = PluginManager.parameters("NC_Shadow")
NC.shadowPath = String(NC.parameters['阴影素材']);
NC.shadowStrength = Number(NC.parameters['阴影最大强度'])

//=============================================================================
// 事件初始化
//=============================================================================

NC.temps.setupPageSettings = Game_Event.prototype.setupPageSettings
Game_Event.prototype.setupPageSettings = function () {
    NC.temps.setupPageSettings.call(this)
    this.NC_S_setupShadowSettings();
}

Game_Event.prototype.NC_S_setupShadowSettings = function () {
    this._needShadow = false;
    this._shadowRadius = 0;

    var page = this.page();
    if (page) {
        this.list().forEach(function (l) {
            if (l.code === 108) {
                var comment = l.parameters[0].split(/[:：]/);
                if (comment[0].toLowerCase() === "角色阴影") {
                    if (comment.length == 2) {
                        this._needShadow = true;
                        this._shadowRadius = Number(comment[1])
                        $gameTemp._NC_S_needRefresh = true;
                    }
                }
            }
        }, this)
    }

    if (this._needShadow) {
        this._characterShadow = new Sprite();
        this._characterShadow.bitmap = ImageManager.loadPicture(NC.shadowPath);
        this._characterShadow.anchor.x = 0.5;
        this._characterShadow.anchor.y = 1;
    }
}

NC.temps.Game_Event_Update = Game_Event.prototype.update;
Game_Event.prototype.update = function () {
    NC.temps.Game_Event_Update.call(this);
}

Game_Event.prototype.NC_S_verifyShadowDistance = function () {
    if (!this._needShadow) { return; }
    this._NC_S_distance = Math.sqrt(Math.pow(($gamePlayer.screenX() - this.screenX()), 2) + Math.pow(($gamePlayer.screenY() - this.screenY()), 2))
    if (this._NC_S_distance <= this._shadowRadius) {
        return true;
    } else {
        return false;
    }
}

//=============================================================================

NC.temps.Game_Temp_Initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
    NC.temps.Game_Temp_Initialize.call(this);
    this._NC_S_shadowEvents = [];			//含阴影的事件
    this._NC_S_needRefresh = true;
};

NC.temps.Game_Temp_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function (mapId) {
    $gameTemp._NC_S_shadowEvents = [];	//含阴影的事件
    $gameTemp._NC_S_needRefresh = true;
    NC.temps.Game_Temp_setup.call(this, mapId);
}

NC.temps.Spriteset_Map_CreateCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function () {
    $gameTemp._NC_S_shadowEvents = [];	//含阴影的事件
    $gameTemp._NC_S_needRefresh = true;
    NC.temps.Spriteset_Map_CreateCharacters.call(this);
}

NC.temps.Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function () {
    NC.temps.Spriteset_Map_createTilemap.call(this);
    this._NC_S_area = new Sprite();
    this._NC_S_area.z = 3;
    this._tilemap.addChild(this._NC_S_area);
}

NC.temps.Game_Map_Update = Game_Map.prototype.update;
Game_Map.prototype.update = function (sceneActive) {
    NC.temps.Game_Map_Update.call(this, sceneActive);

    this.NC_S_refreshEventTank();
};

Game_Map.prototype.NC_S_refreshEventTank = function () {
    if (!$gameTemp._NC_S_needRefresh) { return }
    $gameTemp._NC_S_needRefresh = false;

    var events = this.events();
    $gameTemp._NC_S_shadowEvents = [];			//容器中的事件，只增不减，除非清零
    for (var i = 0; i < events.length; i++) {
        var temp_event = events[i];
        if (temp_event._needShadow == true) {
            $gameTemp._NC_S_shadowEvents.push(temp_event);
        }
    }
}

NC.temps.Spriteset_Map_Update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function () {
    NC.temps.Spriteset_Map_Update.call(this);
    this.NC_S_updateNewEventShadow();
}
Spriteset_Map.prototype.NC_S_updateNewEventShadow = function () {
    //this._tilemap.removeChild(this._NC_S_area);
    var e_tank = $gameTemp._NC_S_shadowEvents;

    for (var i = 0; i < e_tank.length; i++) { //添加阴影
        var e = e_tank[i];
        this._NC_S_area.removeChild(e._characterShadow);
        if (e.NC_S_verifyShadowDistance()) {
            this.NC_S_createShadow(e);
        }
    }
    //this._tilemap.addChild(this._NC_S_area)
}
Spriteset_Map.prototype.NC_S_createShadow = function (e) {
    if (e == null) { return }
    var shadow = e._characterShadow
    var xLength = $gamePlayer.screenX() - e.screenX()
    var yLength = -($gamePlayer.screenY() - e.screenY())

    if (xLength > 0) {
        var angle = (Math.PI / 2) - Math.atan(yLength / xLength);
    }

    if (xLength == 0) {
        if (yLength > 0) {
            var angle = 0;
        } else {
            var angle = Math.PI;
        }
    }

    if (xLength < 0) {
        var angle = (Math.PI*(3/2)) - Math.atan(yLength / xLength);
    }

    shadow.rotation = angle;
    shadow.x = $gamePlayer.screenX();
    shadow.y = $gamePlayer.screenY() - 3;
    shadow.scale.y = 1 + (e._NC_S_distance / e._shadowRadius) * (0.5);
    shadow.opacity = (1 - e._NC_S_distance / e._shadowRadius) * (NC.shadowStrength);
    this._NC_S_area.addChild(shadow)
}
