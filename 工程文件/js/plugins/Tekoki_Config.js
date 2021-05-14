//=============================================================================
// Tekoki_Puzzle.js v0.3
//=============================================================================

/*:
 * @plugindesc [v0.3] 俄罗斯方块配置界面
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
 * 实现俄罗斯配置界面的插件。
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
// ** 选项
//=============================================================================

ConfigManager.ARRDelay = 3;
ConfigManager.DASDelay = 10;
ConfigManager.SoftSpeed = 20;
ConfigManager.isDancePad = false;
ConfigManager.Trembling = true;
ConfigManager.isHandStation = false;
ConfigManager.HandStationSensitivity = 5;
ConfigManager.isLeftHanded = false;

Input.defaultDancePadInput = {
    0: 'up',
    1: 'down',
    2: 'right',
    3: 'left',
    4: 'menu',
    5: 'shift',
    6: 'cancel',
    7: 'ok'
}

TetrisManager.Temps.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
    var config = TetrisManager.Temps.ConfigManager_makeData.call(this);
    config.ARRDelay = this.ARRDelay;
    config.DASDelay = this.DASDelay;
    config.SoftSpeed = this.SoftSpeed;
    config.isDancePad = this.isDancePad;
    config.Trembling = this.Trembling;
    config.isHandStation = this.isHandStation;
    config.HandStationSensitivity= this.HandStationSensitivity;
    config.isLeftHanded = this.isLeftHanded;
    return config;
};

TetrisManager.Temps.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    TetrisManager.Temps.ConfigManager_applyData.call(this, config);
    this.ARRDelay = this.readARR(config, 'ARRDelay');
    this.DASDelay = this.readDAS(config, 'DASDelay');
    this.SoftSpeed = this.readSoft(config, 'SoftSpeed');
    this.isDancePad = this.readFlag(config, 'isDancePad');
    this.Trembling = this.readFlag(config, 'Trembling');
    this.isHandStation = this.readFlag(config, 'isHandStation');
    this.HandStationSensitivity = this.readSensitivity(config, 'HandStationSensitivity');
    this.isLeftHanded = this.readFlag(config, 'isLeftHanded');
};

ConfigManager.readARR = function (config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return 3;
    }
};

ConfigManager.readDAS = function (config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return 10;
    }
};

ConfigManager.readSoft = function (config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return 20;
    }
};

ConfigManager.readSensitivity = function(config, name){
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return 100;
    }
}
//=============================================================================

TetrisManager.Temps.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions
Window_Options.prototype.addGeneralOptions = function () {
    TetrisManager.Temps.Window_Options_addGeneralOptions.call(this);
    this.addCommand('方块移动速度(ARR)设置', 'ARRParams', true);
    this.addCommand('方块灵敏度(DAS)设置', 'DASParams', true);
    this.addCommand('软降倍率设置', 'SoftParams', true);
    this.addCommand('俄罗斯方块游戏测试', 'TetrisTest');
    this.addCommand('是否应用跳舞毯配置', 'isDancePad');
    this.addCommand('是否应用下落抖动', 'Trembling');
    this.addCommand('是否Virgoo Fever控制器配置', 'isHandStation');
    this.addCommand('Virgoo Fever左惯用手模式', 'isLeftHanded')
    this.addCommand('Virgoo Fever灵敏度配置', 'HandStationSensitivity');

}

TetrisManager.Temps.Window_Options_drawItem = Window_Options.prototype.drawItem;

Window_Options.prototype.drawItem = function (index) {
    if (this.commandSymbol(index) === 'ARRParams'
        || this.commandSymbol(index) === 'DASParams'
        || this.commandSymbol(index) === 'SoftParams'
        || this.commandSymbol(index) === 'HandStationSensitivity'
        || this.commandSymbol(index) === 'TetrisTest') {
        var rect = this.itemRectForText(index);
        var text = this.commandName(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(text, rect.x, rect.y, rect.width, 'left');
    } else {
        TetrisManager.Temps.Window_Options_drawItem.call(this, index);
    }

}

TetrisManager.Temps.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function () {
    if (this.commandSymbol(this.index()) === 'ARRParams'
        || this.commandSymbol(this.index()) === 'DASParams'
        || this.commandSymbol(this.index()) === 'SoftParams'
        || this.commandSymbol(this.index()) === 'HandStationSensitivity') {
        Window_Command.prototype.processOk.call(this);
    }else if(this.commandSymbol(this.index()) === 'TetrisTest'){
        TetrisManager.puzzleID = -1;
        SceneManager.push(Scene_Puzzle);
    } else {
        TetrisManager.Temps.Window_Options_processOk.call(this);
        this.processHandStation();

    }
};

Window_Options.prototype.processHandStation = function(){
    if(this.commandSymbol(this.index()) == 'isHandStation'){
        if(ConfigManager.isHandStation && ConfigManager.isLeftHanded){
            ConfigManager.TetrisKeyMapper = JSON.parse(JSON.stringify(ConfigManager.LeftHandStationMap));
            ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.LeftMapHandStationMap));
            //TetrisManager.pointerLock();

        }else if(ConfigManager.isHandStation && !ConfigManager.isLeftHanded){
            ConfigManager.TetrisKeyMapper = JSON.parse(JSON.stringify(ConfigManager.RightHandStationMap));
            ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.RightMapHandStationMap));
            //TetrisManager.pointerLock();
        }else if(!ConfigManager.isHandStation){
            ConfigManager.TetrisKeyMapper = JSON.parse(JSON.stringify(ConfigManager.defaultMap));
            ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.defaultMap));
            //TetrisManager.pointerUnlock();
        }
        ConfigManager.applyKeyConfig();
        ConfigManager.save();
    }

    if(this.commandSymbol(this.index()) == 'isLeftHanded'){
        if(ConfigManager.isHandStation && ConfigManager.isLeftHanded){
            ConfigManager.TetrisKeyMapper = JSON.parse(JSON.stringify(ConfigManager.LeftHandStationMap));
            ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.LeftMapHandStationMap));
            //TetrisManager.pointerLock();
        }else if(ConfigManager.isHandStation && !ConfigManager.isLeftHanded){
            ConfigManager.TetrisKeyMapper = JSON.parse(JSON.stringify(ConfigManager.RightHandStationMap));
            ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.RightMapHandStationMap));
            //TetrisManager.pointerLock();
        }else if(!ConfigManager.isHandStation){
            ConfigManager.TetrisKeyMapper = JSON.parse(JSON.stringify(ConfigManager.defaultMap));
            ConfigManager.keyMapper = JSON.parse(JSON.stringify(ConfigManager.defaultMap));
            //TetrisManager.pointerUnlock();
        }
        ConfigManager.applyKeyConfig();
        ConfigManager.save();
    }
}
TetrisManager.onfocus = window.onfocus || function(){};
window.onfocus = function(){
    TetrisManager.onfocus.call(this);
    //if(ConfigManager.isHandStation){
        //TetrisManager.pointerLock();
    //}
}

TetrisManager.Temps.Window_Options_changeValue = Window_Options.prototype.changeValue;
Window_Options.prototype.changeValue = function (symbol, value) {
    TetrisManager.Temps.Window_Options_changeValue.call(this, symbol, value);
    if (ConfigManager.isDancePad) {
        Input.gamepadMapper = Input.defaultDancePadInput
    } else {
        Input.gamepadMapper = Input.defaultgamepadInput;
    }

    this.processHandStation();
};

//=============================================================================

TetrisManager.Temps.Scene_Options_createOptionsWindow =
    Scene_Options.prototype.createOptionsWindow;
Scene_Options.prototype.createOptionsWindow = function () {
    TetrisManager.Temps.Scene_Options_createOptionsWindow.call(this);
    this._optionsWindow.setHandler('ARRParams', this.ARRParamsConfig.bind(this));
    this._optionsWindow.setHandler('DASParams', this.DASParamsConfig.bind(this));
    this._optionsWindow.setHandler('SoftParams', this.SoftParamsConfig.bind(this));
    this._optionsWindow.setHandler('HandStationSensitivity', this.HandStationSensitivityConfig.bind(this));
};

Scene_Options.prototype.ARRParamsConfig = function () {
    var a = new Tetris_numberInput(0);
    this.addWindow(a)
    a.start();
    this.addWindow(a._messageWindow);
}; 

Scene_Options.prototype.DASParamsConfig = function () {
    var a = new Tetris_numberInput(1);
    this.addWindow(a)
    a.start();
    this.addWindow(a._messageWindow);
}; 

Scene_Options.prototype.SoftParamsConfig = function () {
    var a = new Tetris_numberInput(2);
    this.addWindow(a)
    a.start();
    this.addWindow(a._messageWindow);
}

Scene_Options.prototype.HandStationSensitivityConfig = function () {
    var a = new Tetris_numberInput(3);
    this.addWindow(a);
    a.start();
    this.addWindow(a._messageWindow);
}

Scene_Options.prototype.BackToOptions = function () {
    this._optionsWindow.activate();
}

//=============================================================================

//=============================================================================

function Tetris_numberInput() {
    this.initialize.apply(this, arguments);
}

Tetris_numberInput.prototype = Object.create(Window_Selectable.prototype);
Tetris_numberInput.prototype.constructor = Tetris_numberInput;

Tetris_numberInput.prototype.initialize = function (index) {
    Window_Selectable.prototype.initialize.call(this, 0, 0, 0, 0);
    this._number = 0;
    this._maxDigits = 1;
    this._maxValue = null;
    this._minValue = null
    this.IndEx = index
    this.openness = 0;
    this._messageWindow = new Tetris_Window(0, 424, 1200, 200);
    this.createButtons();
    this.deactivate();
};

Tetris_numberInput.prototype.start = function () {
    switch (this.IndEx) {
        case 0:
            this._maxDigits = 4;
            this._number = ConfigManager.ARRDelay;
            this._messageWindow.drawText("方块移动速度（ARR）的数值（单位：帧/格）", 0, 0)
            this._messageWindow.drawText("数值越大越慢", 0, 28)
            break;
        case 1:
            this._maxDigits = 4;
            this._number = ConfigManager.DASDelay;
            this._messageWindow.drawText("方块移动灵敏度（DAS）的数值（单位：帧）", 0, 0)
            this._messageWindow.drawText("数值越小越灵敏", 0, 28)
            break;
        case 2:
            this._maxDigits = 4;
            this._number = ConfigManager.SoftSpeed;
            this._messageWindow.drawText("软降倍率的数值（单位：正常速度的倍数）", 0, 0)
            this._messageWindow.drawText("数值越大越快", 0, 28)
            break;
        case 3:
            this._maxDigits = 2;
            this._maxValue = 10;
            this._minValue = 1;
            this._number = ConfigManager.HandStationSensitivity;
            this._messageWindow.drawText("手台旋转的灵敏度，在不使用手台进行游戏的情况下可以不用设置", 0, 0)
            this._messageWindow.drawText("数值越小越灵敏， 仅可设置在1-10之间", 0, 28)
            break;
    }
    if(!this._number){
        this._number = 0;
    }else{
        this._number = Number(this._number);
    }
    this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
    this.updatePlacement();
    this.placeButtons();
    this.updateButtonsVisiblity();
    this.createContents();
    this.refresh();
    this.open();
    this.activate();
    this.select(0);
};

Tetris_numberInput.prototype.updatePlacement = function () {
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = 300;
};

Tetris_numberInput.prototype.windowWidth = function () {
    return this.maxCols() * this.itemWidth() + this.padding * 2;
};

Tetris_numberInput.prototype.windowHeight = function () {
    return this.fittingHeight(1);
};

Tetris_numberInput.prototype.maxCols = function () {
    return this._maxDigits;
};

Tetris_numberInput.prototype.maxItems = function () {
    return this._maxDigits;
};

Tetris_numberInput.prototype.spacing = function () {
    return 0;
};

Tetris_numberInput.prototype.itemWidth = function () {
    return 32;
};

Tetris_numberInput.prototype.createButtons = function () {
    var bitmap = ImageManager.loadSystem('ButtonSet');
    var buttonWidth = 48;
    var buttonHeight = 48;
    this._buttons = [];
    for (var i = 0; i < 3; i++) {
        var button = new Sprite_Button();
        var x = buttonWidth * [1, 2, 4][i];
        var w = buttonWidth * (i === 2 ? 2 : 1);
        button.bitmap = bitmap;
        button.setColdFrame(x, 0, w, buttonHeight);
        button.setHotFrame(x, buttonHeight, w, buttonHeight);
        button.visible = false;
        this._buttons.push(button);
        this.addChild(button);
    }
    this._buttons[0].setClickHandler(this.onButtonDown.bind(this));
    this._buttons[1].setClickHandler(this.onButtonUp.bind(this));
    this._buttons[2].setClickHandler(this.onButtonOk.bind(this));
};

Tetris_numberInput.prototype.placeButtons = function () {
    var numButtons = this._buttons.length;
    var spacing = 16;
    var totalWidth = -spacing;
    for (var i = 0; i < numButtons; i++) {
        totalWidth += this._buttons[i].width + spacing;
    }
    var x = (this.width - totalWidth) / 2;
    for (var j = 0; j < numButtons; j++) {
        var button = this._buttons[j];
        button.x = x;
        button.y = this.buttonY();
        x += button.width + spacing;
    }
};

Tetris_numberInput.prototype.updateButtonsVisiblity = function () {
    if (TouchInput.date > Input.date) {
        this.showButtons();
    } else {
        this.hideButtons();
    }
};

Tetris_numberInput.prototype.showButtons = function () {
    for (var i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = true;
    }
};

Tetris_numberInput.prototype.hideButtons = function () {
    for (var i = 0; i < this._buttons.length; i++) {
        this._buttons[i].visible = false;
    }
};

Tetris_numberInput.prototype.buttonY = function () {
    var spacing = 8;
    return this.height + spacing;
};

Tetris_numberInput.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    this.processDigitChange();
};

Tetris_numberInput.prototype.processDigitChange = function () {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated('up')) {
            this.changeDigit(true);
        } else if (Input.isRepeated('down')) {
            this.changeDigit(false);
        }
    }
};

Tetris_numberInput.prototype.changeDigit = function (up) {
    var index = this.index();
    var place = Math.pow(10, this._maxDigits - 1 - index);
    var n = Math.floor(this._number / place) % 10;
    this._number -= n * place;
    if (up) {
        n = (n + 1) % 10;
    } else {
        n = (n + 9) % 10;
    }
    this._number += n * place;
    switch(this.IndEx){

    }
    this.refresh();
    SoundManager.playCursor();
};

Tetris_numberInput.prototype.isTouchOkEnabled = function () {
    return false;
};

Tetris_numberInput.prototype.isOkEnabled = function () {
    return true;
};

Tetris_numberInput.prototype.isCancelEnabled = function () {
    return false;
};

Tetris_numberInput.prototype.isOkTriggered = function () {
    return Input.isTriggered('ok');
};

Tetris_numberInput.prototype.processOk = function () {
    if(this._minValue&&this._number<this._minValue){
        SoundManager.playBuzzer();
        return;
    }
    if(this._maxValue && this._number>this._maxValue){
        SoundManager.playBuzzer();
        return;
    }
    SoundManager.playOk();
    switch (this.IndEx) {
        case 0:
            ConfigManager.ARRDelay = this._number;
            break;
        case 1:
            ConfigManager.DASDelay = this._number;
            break;
        case 2:
            ConfigManager.SoftSpeed = this._number;
            break;
        case 3:
            ConfigManager.HandStationSensitivity = this._number;
    }
    //this._messageWindow.terminateMessage();
    this.updateInputData();
    this.deactivate();
    this.close();
    this._messageWindow.close();
    ConfigManager.save();
    ConfigManager.load();
    SceneManager._scene.BackToOptions();
};

Tetris_numberInput.prototype.drawItem = function (index) {
    var rect = this.itemRect(index);
    var align = 'center';
    var s = this._number.padZero(this._maxDigits);
    var c = s.slice(index, index + 1);
    this.resetTextColor();
    this.drawText(c, rect.x, rect.y, rect.width, align);
};

Tetris_numberInput.prototype.onButtonUp = function () {
    this.changeDigit(true);
};

Tetris_numberInput.prototype.onButtonDown = function () {
    this.changeDigit(false);
};

Tetris_numberInput.prototype.onButtonOk = function () {
    this.processOk();
    this.hideButtons();
};