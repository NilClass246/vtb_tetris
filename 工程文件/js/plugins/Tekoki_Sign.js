//=============================================================================
// Tekoki_Sign.js v0.3
//=============================================================================

/*:
 * @plugindesc [v0.3] 俄罗斯方块道具登记界面
 * @author 手艺人工坊 （程序： NilClass）
 * 
 * @help
 * =============================================================================
 *  ______        __              __
 * /\__  _\      /\ \            /\ \      __
 * \/_/\ \/    __\ \ \/'\     ___\ \ \/'\ /\_\
 *    \ \ \  /'__`\ \ , <    / __`\ \ , < \/\ \
 *     \ \ \/\  __/\ \ \\`\ /\ \L\ \ \ \\`\\ \ \
 *      \ \_\ \____\\ \_\ \_\ \____/\ \_\ \_\ \_\
 *       \/_/\/____/ \/_/\/_/\/___/  \/_/\/_/\/_/
 *
 *
 *  __      __                 __               __
 * /\ \  __/\ \               /\ \             /\ \
 * \ \ \/\ \ \ \    ___   _ __\ \ \/'\     ____\ \ \___     ___   _____
 *  \ \ \ \ \ \ \  / __`\/\`'__\ \ , <    /',__\\ \  _ `\  / __`\/\ '__`\
 *   \ \ \_/ \_\ \/\ \L\ \ \ \/ \ \ \\`\ /\__, `\\ \ \ \ \/\ \L\ \ \ \L\ \
 *    \ `\___x___/\ \____/\ \_\  \ \_\ \_\/\____/ \ \_\ \_\ \____/\ \ ,__/
 *    '\/__//__/  \/___/  \/_/   \/_/\/_/\/___/   \/_/\/_/\/___/  \ \ \/
 *                                                                 \ \_\
 *                                                                  \/_/
 * +++ TekokiWorkshop - Tetris.js (v0.3) +++
 * https://virtual98.com/
 * =============================================================================
 * 实现道具登记界面的插件。
 * 目前还在测试阶段。
 * meameasuki！
 */
 
//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================


//=============================================================================
// ** CODE
//=============================================================================

TetrisManager.requestUpdateSign = false;

//=============================================================================
// ** 场景定义
//=============================================================================

function Scene_Sign() {
    this.initialize.apply(this, arguments);
}

Scene_Sign.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Sign.prototype.constructor = Scene_Sign;

Scene_Sign.prototype.initialize = function () {
    Scene_ItemBase.prototype.initialize.call(this);
}

Scene_Sign.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
}

Scene_Sign.prototype.create = function () {
    Scene_ItemBase.prototype.create.call(this);

    this.Window_Top = new Window_Help();

    this.Window_Right = new SignWaitingWindow(600, 108, 600, 514);
    this.Window_Right.setHelpWindow(this.Window_Top);

    this.Window_Right.activate();
    this.Window_Right.selectLast();

    this.addWindow(this.Window_Right);
    this.addWindow(this.Window_Top);
}

//=============================================================================
// ** 道具选择界面
//=============================================================================

function SignWaitingWindow() {
    this.initialize.apply(this, arguments);
}

SignWaitingWindow.prototype = Object.create(Window_ItemList.prototype);
SignWaitingWindow.prototype.constructor = SignWaitingWindow;

SignWaitingWindow.prototype.initialize = function (x, y ,width,height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'none';
    this.refresh();
}

SignWaitingWindow.prototype.maxCols = function () {
    return 1;
};

SignWaitingWindow.prototype.spacing = function () {
    return 48;
};

SignWaitingWindow.prototype.includes = function (item) {
    return DataManager.isItem(item) && item.itypeId === 1;
};


//=============================================================================
// ** 道具登记界面
//=============================================================================

function SignHoldingWindow() {
    this.initialize.apply(this, arguments);
}

SignHoldingWindow.prototype = Object.create(Window_Selectable.prototype);
SignHoldingWindow.prototype.constructor = SignHoldingWindow;

SignHoldingWindow.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
}

function TestSigning() {
    SceneManager.push(Scene_Sign);
}

//=============================================================================
// ** 为了实现登记功能而添加的属性
//=============================================================================

TetrisManager.Temps.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    TetrisManager.Temps.Game_Actor_setup.call(this, actorId);
    this._signedItems = [];
}

Game_Actor.prototype.signItem = function (item) {
    if (item
        && DataManager.isItem(item)
        && item.itypeId === 1
        && !this._signedItems.contains(item)
        && this._signedItems.length < 8) {
        this._signedItems.push(item);
    }
}

Game_Actor.prototype.unsignItem = function (item) {
    if (this._signedItems.contains(item)) {
        this._signedItems.splice(this._signedItems.indexOf(item),1);
    }
}

//=============================================================================
// 增加的组件
//=============================================================================

function Window_ItemHelp() {
    this.initialize.apply(this, arguments);
}

Window_ItemHelp.prototype = Object.create(Window_Help.prototype);
Window_ItemHelp.prototype.constructor = Window_ItemHelp;

Window_ItemHelp.prototype.initialize = function (numLines) {
    var x = Graphics.boxWidth * (2 / 3)
    var width = Graphics.boxWidth * (1 / 3);
    var height = this.fittingHeight(numLines || 2);
    var y = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._text = '';
}

//=============================================================================

function Window_BottomTips() {
    this.initialize.apply(this, arguments);
}

Window_BottomTips.prototype = Object.create(Window_Base.prototype);
Window_BottomTips.prototype.constructor = Window_BottomTips;

Window_BottomTips.prototype.initialize = function (txt) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(1);
    var y = Graphics.boxHeight - height
    Window_Base.prototype.initialize.call(this, 0, y, width, height);
    this._text = txt
    this.refresh();
}

Window_BottomTips.prototype.refresh = function () {
    this.contents.clear();
    this.drawTextEx(this._text, this.textPadding(), 0);
};

//=============================================================================

function Window_Sign() {
    this.initialize.apply(this, arguments);
}

Window_Sign.prototype = Object.create(Window_Base.prototype);
Window_Sign.prototype.constructor = Window_Sign;

Window_Sign.prototype.initialize = function () {
    var x = Graphics.boxWidth * (2 / 3)
    var y = this.fittingHeight(11);
    var width = Graphics.boxWidth * (1 / 3);
    var height = this.fittingHeight(2);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._icons = [];
    this.exchangeSign = new Sprite(ImageManager.loadPicture('ui/Exchange'));
    this.refresh();
    TetrisManager.requestUpdateSign = false;
}

Window_Sign.prototype.refresh = function () {
    for (var i = 0; i < this._icons.length; i++) {
        this.removeChild(this._icons[i])
    }

    this._icons = [];
    var items = $gameActors.actor(1)._signedItems;
    console.log(items)
    var x = 32;
    var y = 16;

    for (var i = 0; i < 8; i++) {
        this._icons.push(new itemIcon(items[i]))
        this._icons[i].x = x;
        this._icons[i].y = y;
        this.addChild(this._icons[i]);
        x += 35;
        if (x >= 32+ 4 * 35) {
            x = 32;
            y+=38
        }
    }
    //TODO: 防作弊
    //TODO: 登记界面加入快捷键
    //TODO: 立绘系统
    //TODO: 写教程
    this.exchangeSign.move(42 + 4 * 35, 20);
    this.addChild(this.exchangeSign)
}

Window_Sign.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (TetrisManager.requestUpdateSign) {
        this.refresh();
        TetrisManager.requestUpdateSign = false;
    }
}

//Scene_Item.prototype.update = function () {
//    Scene_ItemBase.prototype.update.call(this);
//    if (Input.isTriggered('shift')) {
//        $gameActors.actor(1).signItem(this.item())
//        this._signWindow.refresh();
//    }
//}

Window_ItemList.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    if (SceneManager._scene instanceof Scene_Item) {
        if (Input.isTriggered('shift')) {
            SoundManager.playOk();
            $gameActors.actor(1).signItem(this.item())
            TetrisManager.requestUpdateSign = true;
            this.refresh();
        }

        if (Input.isTriggered('control')) {
            SoundManager.playOk();
            $gameActors.actor(1).unsignItem(this.item())
            TetrisManager.requestUpdateSign = true;
            this.refresh();
        }
    }
}