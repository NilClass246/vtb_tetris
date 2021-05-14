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
 * 实现道具/技能登记界面的插件。
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
// ** 为了实现登记功能而添加的属性
//=============================================================================

TetrisManager.Temps.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    TetrisManager.Temps.Game_Actor_setup.call(this, actorId);
    this._signedItems = [];
    this._signedSkills = [];
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

Game_Actor.prototype.signSkill = function (skill) {
    if (skill
        && !this._signedSkills.contains(skill)
        && this._signedSkills.length < 3) {
        this._signedSkills.push(skill);
    }
}

Game_Actor.prototype.unsignSkill = function (skill) {
    if (this._signedSkills.contains(skill)) {
        this._signedSkills.splice(this._signedSkills.indexOf(skill), 1);
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

function Window_SkillHelp() {
    this.initialize.apply(this, arguments);
}

Window_SkillHelp.prototype = Object.create(Window_Help.prototype);
Window_SkillHelp.prototype.constructor = Window_SkillHelp;

Window_SkillHelp.prototype.initialize = function (numLines) {
    var x = Graphics.boxWidth * (2 / 3)
    var width = Graphics.boxWidth * (1 / 3);
    var height = this.fittingHeight(numLines || 2);
    var y = 0;
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
    var actorNum = $gameVariables.value(32)||1;
    var items = $gameActors.actor(actorNum)._signedItems;
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

//=============================================================================

function Window_SkillSign() {
    this.initialize.apply(this, arguments);
}

Window_SkillSign.prototype = Object.create(Window_Base.prototype);
Window_SkillSign.prototype.constructor = Window_SkillSign;

Window_SkillSign.prototype.initialize = function (y) {
    var x = Graphics.boxWidth * (2 / 3)
    var y = y;
    var width = Graphics.boxWidth * (1 / 3);
    var height = this.fittingHeight(3);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    TetrisManager.requestUpdateSign = false;
}

Window_SkillSign.prototype.refresh = function () {
    if (this._skillboard) {
        this.removeChild(this._skillboard);
    }
    this.skillButton_list = [];
    var skillIDs = [];
    var actorNum = $gameVariables.value(32)||1;
    var skills = $gameActors.actor(actorNum)._signedSkills;
    for (var i = 0; i < skills.length; i++) {
        if (skills[i].id !== 1) {
            skillIDs.push(String(skills[i].id));
        }
    }
    for (var i = 0; i < skillIDs.length; i++) {
        this.skillButton_list.push(new SkillButton(skillIDs[i]));
    }
    this._skillboard = new skillBoard(this.skillButton_list);
    this.addChild(this._skillboard);
    var x = 36;
    var y = 36;
    this._skillboard.move(x, y);
}

Window_SkillSign.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (TetrisManager.requestUpdateSign) {
        this.refresh();
        TetrisManager.requestUpdateSign = false;
    }
}

//=============================================================================

Window_ItemList.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    if (SceneManager._scene instanceof Scene_Item) {
        if (Input.isTriggered('shift')) {
            var actorNum = $gameVariables.value(32)||1;
            SoundManager.playOk();
            $gameActors.actor(actorNum).signItem(this.item());
            TetrisManager.requestUpdateSign = true;
            this.refresh();
        }

        if (Input.isTriggered('control')) {
            var actorNum = $gameVariables.value(32)||1;
            SoundManager.playOk();
            $gameActors.actor(actorNum).unsignItem(this.item());
            TetrisManager.requestUpdateSign = true;
            this.refresh();
        }
    }
}

//=============================================================================

Window_SkillList.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    if (SceneManager._scene instanceof Scene_Skill) {
        if (Input.isTriggered('shift')) {
            var actorNum = $gameVariables.value(32)||1;
            SoundManager.playOk();
            $gameActors.actor(actorNum).signSkill(this.item());
            TetrisManager.requestUpdateSign = true;
            this.refresh();
        }

        if (Input.isTriggered('control')) {
            var actorNum = $gameVariables.value(32)||1;
            SoundManager.playOk();
            $gameActors.actor(actorNum).unsignSkill(this.item());
            TetrisManager.requestUpdateSign = true;
            this.refresh();
        }
    }
}