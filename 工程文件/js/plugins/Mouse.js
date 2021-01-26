//=============================================================================
// Mouse.js
//=============================================================================
/*:
 * @plugindesc 变更鼠标美化光标.
 * @author Fanzi.
 *
 * @param MouseBitmapName
 * @desc 鼠标图标名(写后缀)
 * @default mouse.cur
 *
 * @param ForbidBitmapName
 * @desc 阻挡图标名(写后缀)
 * @default hand.cur
 *
 * @param CursorBitmapName
 * @desc 光标图像(不写后缀,png格式)
 * @default cursor
 *
 * @help 
 * 所有素材存放在“img/mouse”路径。
 * 鼠标图标可用多种文件格式，填写参数时连同后缀名填写。
 * 地图闪烁的光标只用png格式图像文件，填写参数不用后缀。
 */

MouseBitmap = String(PluginManager.parameters('Mouse')["MouseBitmapName"]);// || "mouse.cur");
ForbidBitmap = String(PluginManager.parameters('Mouse')["ForbidBitmapName"]);// || "hand.cur");
CursorBitmap = String(PluginManager.parameters('Mouse')["CursorBitmapName"]);// || "cursor");

//-----------------------------------------------------------------------------
// 鼠标图标部分

Scene_Title.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    document.getElementById('UpperCanvas').style.cursor="url(img/mouse/" + MouseBitmap + "),auto";
    document.getElementById('ErrorPrinter').style.cursor="url(img/mouse/" + ForbidBitmap + "),auto";
};

//-----------------------------------------------------------------------------
// 点击光标部分

function Sprite_Destination() {
    this.initialize.apply(this, arguments);
}

Sprite_Destination.prototype = Object.create(Sprite.prototype);
Sprite_Destination.prototype.constructor = Sprite_Destination;

Sprite_Destination.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.createBitmap();
    this._frameCount = 0;
};

Sprite_Destination.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if ($gameTemp.isDestinationValid()){
        this.updatePosition();
        this.updateAnimation();
        this.visible = true;
    } else {
        this._frameCount = 0;
        this.visible = false;
    }
};

ImageManager.loadmouse = function(filename) {
    return this.loadBitmap('img/mouse/', filename, 0, true);
}

Sprite_Destination.prototype.createBitmap = function() {
    this._cursor = new Sprite();
    this._cursor.bitmap = ImageManager.loadmouse(CursorBitmap);
    this._cursor.anchor.x = 0.5;
    this._cursor.anchor.y = 0.5;
    this.addChild(this._cursor);
};

Sprite_Destination.prototype.updatePosition = function() {
    var tileWidth = $gameMap.tileWidth();
    var tileHeight = $gameMap.tileHeight();
    var x = $gameTemp.destinationX();
    var y = $gameTemp.destinationY();
    this.x = ($gameMap.adjustX(x) + 0.5) * tileWidth;
    this.y = ($gameMap.adjustY(y) + 0.5) * tileHeight;
};

Sprite_Destination.prototype.updateAnimation = function() {
    this._frameCount++;
    this._frameCount %= 20;
    this.opacity = (20 - this._frameCount) * 6;
    this.scale.x = 1 + this._frameCount / 20;
    this.scale.y = this.scale.x;
};