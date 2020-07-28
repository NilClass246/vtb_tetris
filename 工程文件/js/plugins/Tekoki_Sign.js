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