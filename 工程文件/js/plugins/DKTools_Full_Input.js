/*
Title: Full Input
Author: DK (Denis Kuznetsov)
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 3.0
Release: 22.10.2017
First release: 30.01.2016
Supported languages: Russian, English
*/

/*ru
Название: Полный Ввод
Автор: DK (Денис Кузнецов)
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 3.0
Релиз: 22.10.2017
Первый релиз: 30.01.2016
Поддерживаемые языки: Русский, Английский
*/

/*:
* @plugindesc v.3.0 All keys of the keyboard and gamepad
* @author DK (Denis Kuznetsov)
* @help

 ### Info about plugin ###
 Title: DKTools_Full_Input
 Author: DK (Denis Kuznetsov)
 Site: https://dk-plugins.ru
 Version: 3.0
 Release: 22.10.2017
 First release: 30.01.2016
 Supported languages: Russian, English
 
 ### Important information ###
 Default RPG Maker MV values for Alt, Space, Insert, Q, W, X, Z
 Alt: 'control'
 Space: 'ok'
 Insert: 'escape'
 Q: 'pageup'
 W: 'pagedown'
 X: 'escape'
 Z: 'ok'
 
 The values of this plugin for Alt, Space, Insert, Q, W, X, Z
 Alt: 'alt'
 Space: 'space'
 Insert: 'insert'
 Q: 'q'
 W: 'w'
 X: 'x'
 Z: 'z'

 Left stick of gamepad separated from keys of controls (arrows) and have him own settings
 Default values for left stick at RPG Maker MV: up, down, left, right
 Values for left stick at this plugin: l_up, l_down, l_left, l_right

 Values for right stick at this plugin: r_up, r_down, r_left, r_right
 
 ### For developers ###
 All functions return name of pressed button
 If button was don't pressed, then function returns null

 returnCode - return key code ? true or false
 If returnCode is false, then will return name of button

 Added functions for check pressed key code:

 Input.keyPressed(code, gamepadCode, returnCode)
 Input.keyTriggered(code, gamepadCode, returnCode)
 Input.keyRepeated(code, gamepadCode, returnCode)
 Input.keyLongPressed(code, gamepadCode, returnCode)
 
 code - keyboard key code
 gamepadCode - gamepad key code

 If need check only gamepad, write null instead the codes

 Functions to check any directions of moving buttons:
 Checking is carried out for the symbols: up, down, left, right
 Input.anyDirectionPressed(returnCode)
 Input.anyDirectionTriggered(returnCode)
 Input.anyDirectionRepeated(returnCode)
 Input.anyDirectionLongPressed(returnCode)

 Functions to check deflection of left stick to any direction:
 Checking is carried out for the symbols: l_up, l_down, l_left, l_right
 Input.anyLDirectionPressed(returnCode)
 Input.anyLDirectionTriggered(returnCode)
 Input.anyLDirectionRepeated(returnCode)
 Input.anyLDirectionLongPressed(returnCode)

 Functions to check deflection of right stick to any direction:
 Checking is carried out for the symbols: r_up, r_down, r_left, r_right
 Input.anyRDirectionPressed(returnCode)
 Input.anyRDirectionTriggered(returnCode)
 Input.anyRDirectionRepeated(returnCode)
 Input.anyRDirectionLongPressed(returnCode)

 Functions to check one of many buttons with key codes:
 Input.anyKeyPressed(codes, gamepadCodes, returnCode)
 Input.anyKeyTriggered(codes, gamepadCodes, returnCode)
 Input.anyKeyRepeated(codes, gamepadCodes, returnCode)
 Input.anyKeyLongPressed(codes, gamepadCodes, returnCode)

 codes - array of codes keyboard buttons
 gamepadCodes - array of codes gamepad buttons

 If need check only gamepad, write null instead the code

 Functions to check one of many buttons with key names:
 Input.anyPressed(keys, returnCode)
 Input.anyTriggered(keys, returnCode)
 Input.anyRepeated(keys, returnCode)
 Input.anyLongPressed(keys, returnCode)

 keys - array of buttons name

 Functions to check pressing of any numbers:
 Input.anyNumberPressed(returnCode)
 Input.anyNumberTriggered(returnCode)
 Input.anyNumberRepeated(returnCode)
 Input.anyNumberLongPressed(returnCode)

 Functions to check pressing of any Numpad buttons:
 Input.anyNumpadPressed(returnCode)
 Input.anyNumpadTriggered(returnCode)
 Input.anyNumpadRepeated(returnCode)
 Input.anyNumpadLongPressed(returnCode)

 Functions to check pressing of any alphabet letters:
 Input.anyAlphabetPressed(returnCode)
 Input.anyAlphabetTriggered(returnCode)
 Input.anyAlphabetRepeated(returnCode)
 Input.anyAlphabetLongPressed(returnCode)

 Functions to check pressing of any F1-F12 button:
 Input.anyFPressed(returnCode)
 Input.anyFTriggered(returnCode)
 Input.anyFRepeated(returnCode)
 Input.anyFLongPressed(returnCode)
 
 Also added functions for checking pressed Backspace, Tab, Enter, Shift, Ctrl, Alt, Escape, Space

 Backspace:
 Input.BackspacePressed()
 Input.BackspaceTriggered()
 Input.BackspaceRepeated()
 Input.BackspaceLongPressed()

 Tab:
 Input.TabPressed()
 Input.TabTriggered()
 Input.TabRepeated()
 Input.TabLongPressed()

 Enter:
 Input.EnterPressed()
 Input.EnterTriggered()
 Input.EnterRepeated()
 Input.EnterLongPressed()

 Shift:
 Input.ShiftPressed()
 Input.ShiftTriggered()
 Input.ShiftRepeated()
 Input.ShiftLongPressed()

 Ctrl:
 Input.CtrlPressed()
 Input.CtrlTriggered()
 Input.CtrlRepeated()
 Input.CtrlLongPressed()

 Alt:
 Input.AltPressed()
 Input.AltTriggered()
 Input.AltRepeated()
 Input.AltLongPressed()

 Escape:
 Input.EscapePressed()
 Input.EscapeTriggered()
 Input.EscapeRepeated()
 Input.EscapeLongPressed()

 Space:
 Input.SpacePressed()
 Input.SpaceTriggered()
 Input.SpaceRepeated()
 Input.SpaceLongPressed()
 
 If you create a plugin based on this:
 Before using any function, make sure that the user has installed the plugin:
 if (Imported.DKTools_Full_Input)

 Get plugin version:
 var version = Imported.DKTools_Full_Input;

 #### License and terms of use ###

 Recent information about the terms of use: https://dk-plugins.ru/terms-of-use

 You can:
 -Free use the plugin for your commercial and non commercial projects.
 -Translate the plugin to other languages (please, inform, if you do this)

 You can't:
 -Delete or change any information about plugin (Title, authorship, contact information, version and release)
 -Change code of plugin out of border "Plugin settings" and "End of plugin settings" (if you found a bug contact me)

 * @param Keyboard
 * @desc Customizing the keyboard keys. Key Code - Key Name
 * @type struct<Keyboard>

 * @param Gamepad
 * @desc Customizing the gamepad keys. Key Code - Key Name
 * @type struct<Gamepad>

 * @param Switches
 * @desc List of switches
 * @type struct<Switches>[]
 * @default []

*/

/*:ru
 * @plugindesc v.3.0 Использование всех кнопок клавиатуры и геймпада
 * @author DK (Денис Кузнецов)
 * @help

 ### Информация о плагине ###
 Название: DKTools_Full_Input
 Автор: DK (Денис Кузнецов)
 Сайт: https://dk-plugins.ru
 Версия: 3.0
 Релиз: 22.10.2017
 Первый релиз: 30.01.2016
 Поддерживаемые языки: Русский, Английский

 ### Требования и зависимости ###
 Наличие включенного плагина DKTools версии 0.99 или выше
 Версия мейкера 1.5+

 ### Важная информация ###
 Изменено назначение следующих клавиш:
 Alt, Space, Insert, Q, W, X, Z
 
 Стандартные значения клавиш в RPG Maker MV для Alt, Space, Insert, Q, W, X, Z
 Alt: 'control'
 Space: 'ok'
 Insert: 'escape'
 Q: 'pageup'
 W: 'pagedown'
 X: 'escape'
 Z: 'ok'
 
 Значения для клавиш в этом плагине Alt, Space, Insert, Q, W, X, Z
 Alt: 'alt'
 Space: 'space'
 Insert: 'insert'
 Q: 'q'
 W: 'w'
 X: 'x'
 Z: 'z'

 Левый стик геймпада отделен от клавиш управления (стрелочек) и имеет свои настройки
 Стандартные значения для левого стика в RPG Maker MV: up, down, left, right
 Значения для левого стика в этом плагине: l_up, l_down, l_left, l_right

 Значения для правого стика в этом плагине: r_up, r_down, r_left, r_right
 
 ### Для разработчиков ###
 Все функции возвращают название нажатой клавиши
 Если клавиша не была нажата, то функция возвращает null

 returnCode - вернуть код клавиши ? true или false
 Если false, то будет возвращено название клавиши

 Добавлены функции проверки нажатия клавиш по коду:
 
 Input.keyPressed(code, gamepadCode, returnCode)
 Input.keyTriggered(code, gamepadCode, returnCode)
 Input.keyRepeated(code, gamepadCode, returnCode)
 Input.keyLongPressed(code, gamepadCode, returnCode)
 
 code - код клавиши клавиатуры
 gamepadCode - код клавиши геймпада

 Если нужно проверить только геймпад, то вместо code напишите null

 Функции проверки нажатия любого из направлений движения:
 Проверка осуществляется для символов: up, down, left, right
 Input.anyDirectionPressed(returnCode)
 Input.anyDirectionTriggered(returnCode)
 Input.anyDirectionRepeated(returnCode)
 Input.anyDirectionLongPressed(returnCode)

 Функции проверки отклонения левого стика в какую-либо сторону:
 Проверка осуществляется для символов: l_up, l_down, l_left, l_right
 Input.anyLDirectionPressed(returnCode)
 Input.anyLDirectionTriggered(returnCode)
 Input.anyLDirectionRepeated(returnCode)
 Input.anyLDirectionLongPressed(returnCode)

 Функции проверки отклонения правого стика в какую-либо сторону:
 Проверка осуществляется для символов: r_up, r_down, r_left, r_right
 Input.anyRDirectionPressed(returnCode)
 Input.anyRDirectionTriggered(returnCode)
 Input.anyRDirectionRepeated(returnCode)
 Input.anyRDirectionLongPressed(returnCode)

 Функции проверки нажатия одной из нескольких клавиш по коду клавиш:
 Input.anyKeyPressed(codes, gamepadCodes, returnCode)
 Input.anyKeyTriggered(codes, gamepadCodes, returnCode)
 Input.anyKeyRepeated(codes, gamepadCodes, returnCode)
 Input.anyKeyLongPressed(codes, gamepadCodes, returnCode)

 codes - массив кодов клавиш клавиатуры
 gamepadCodes - массив кодов клавиш геймпада

 Если нужно проверить только геймпад, то вместо codes напишите null

 Функции проверки нажатия одной из нескольких клавиш по названию клавиш:
 Input.anyPressed(keys, returnCode)
 Input.anyTriggered(keys, returnCode)
 Input.anyRepeated(keys, returnCode)
 Input.anyLongPressed(keys, returnCode)

 keys - массив названий клавиш

 Функции проверки нажатия любой цифры:
 Input.anyNumberPressed(returnCode)
 Input.anyNumberTriggered(returnCode)
 Input.anyNumberRepeated(returnCode)
 Input.anyNumberLongPressed(returnCode)

 Функции проверки нажатия любой клавиши Numpad:
 Input.anyNumpadPressed(returnCode)
 Input.anyNumpadTriggered(returnCode)
 Input.anyNumpadRepeated(returnCode)
 Input.anyNumpadLongPressed(returnCode)

 Функции проверки нажатия любой буквы алфавита:
 Input.anyAlphabetPressed(returnCode)
 Input.anyAlphabetTriggered(returnCode)
 Input.anyAlphabetRepeated(returnCode)
 Input.anyAlphabetLongPressed(returnCode)

 Функции проверки нажатия любой клавиши F1-F12:
 Input.anyFPressed(returnCode)
 Input.anyFTriggered(returnCode)
 Input.anyFRepeated(returnCode)
 Input.anyFLongPressed(returnCode)

 Также добавлены функции проверки нажатия клавиш Backspace, Tab, Enter, Shift, Ctrl, Alt, Escape, Space

 Backspace:
 Input.BackspacePressed()
 Input.BackspaceTriggered()
 Input.BackspaceRepeated()
 Input.BackspaceLongPressed()

 Tab:
 Input.TabPressed()
 Input.TabTriggered()
 Input.TabRepeated()
 Input.TabLongPressed()

 Enter:
 Input.EnterPressed()
 Input.EnterTriggered()
 Input.EnterRepeated()
 Input.EnterLongPressed()

 Shift:
 Input.ShiftPressed()
 Input.ShiftTriggered()
 Input.ShiftRepeated()
 Input.ShiftLongPressed()

 Ctrl:
 Input.CtrlPressed()
 Input.CtrlTriggered()
 Input.CtrlRepeated()
 Input.CtrlLongPressed()

 Alt:
 Input.AltPressed()
 Input.AltTriggered()
 Input.AltRepeated()
 Input.AltLongPressed()
 
 Escape:
 Input.EscapePressed()
 Input.EscapeTriggered()
 Input.EscapeRepeated()
 Input.EscapeLongPressed()
 
 Space:
 Input.SpacePressed()
 Input.SpaceTriggered()
 Input.SpaceRepeated()
 Input.SpaceLongPressed()
 
 Если Вы создаете свой плагин на основе этого:
 Перед использованием любых функций убедитесь, что у пользователя установлен данный плагин:
 if (Imported.DKTools_Full_Input)

 Получить версию плагина:
 var version = Imported.DKTools_Full_Input;
 
 ### Лицензия и правила использования плагина ###

 Актуальная информация о правилах использования: https://dk-plugins.ru/terms-of-use

 Вы можете:
 -Бесплатно использовать данный плагин в некоммерческих и коммерческих проектах
 -Переводить плагин на другие языки (пожалуйста, сообщите, если Вы перевели плагин на другой язык)

 Вы не можете:
 -Убирать или изменять любую информацию о плагине (Название, авторство, контактная информация, версия и дата релиза)
 -Изменять код плагина вне поля "Настройки плагина" и "Конец настройки плагина" (если нашли ошибку, напишите мне о ней)

 * @param Keyboard
 * @text Клавиатура
 * @desc Настройка клавиш клавиатуры. Код клавиши - Имя клавиши
 * @type struct<Keyboard>

 * @param Gamepad
 * @text Геймпад
 * @desc Настройка клавиш геймпада. Код клавиши - Имя клавиши
 * @type struct<Gamepad>

 * @param Switches
 * @text Переключатели
 * @desc Список переключателей
 * @type struct<Switches>[]
 * @default []

*/

/*~struct~Keyboard:
 * @param 8
 * @default backspace
 * @param 9
 * @default tab
 * @param 13
 * @default ok
 * @param 16
 * @default shift
 * @param 17
 * @default control
 * @param 18
 * @default alt
 * @param 19
 * @default pause
 * @param 20
 * @default capslock
 * @param 27
 * @default escape
 * @param 32
 * @default space
 * @param 33
 * @default pageup
 * @param 34
 * @default pagedown
 * @param 35
 * @default end
 * @param 36
 * @default home
 * @param 37
 * @default left
 * @param 38
 * @default up
 * @param 39
 * @default right
 * @param 40
 * @default down
 * @param 44
 * @default printscreen
 * @param 45
 * @default insert
 * @param 46
 * @default delete
 * @param 47
 * @default /
 * @param 48
 * @default 0
 * @param 49
 * @default 1
 * @param 50
 * @default 2
 * @param 51
 * @default 3
 * @param 52
 * @default 4
 * @param 53
 * @default 5
 * @param 54
 * @default 6
 * @param 55
 * @default 7
 * @param 56
 * @default 8
 * @param 57
 * @default 9
 * @param 65
 * @default a
 * @param 66
 * @default b
 * @param 67
 * @default c
 * @param 68
 * @default d
 * @param 69
 * @default e
 * @param 70
 * @default f
 * @param 71
 * @default g
 * @param 72
 * @default h
 * @param 73
 * @default i
 * @param 74
 * @default j
 * @param 75
 * @default k
 * @param 76
 * @default l
 * @param 77
 * @default m
 * @param 78
 * @default n
 * @param 79
 * @default o
 * @param 80
 * @default p
 * @param 81
 * @default q
 * @param 82
 * @default r
 * @param 83
 * @default s
 * @param 84
 * @default t
 * @param 85
 * @default u
 * @param 86
 * @default v
 * @param 87
 * @default w
 * @param 88
 * @default x
 * @param 89
 * @default y
 * @param 90
 * @default z
 * @param 96
 * @default escape
 * @param 97
 * @default numpad1
 * @param 98
 * @default down
 * @param 99
 * @default numpad3
 * @param 100
 * @default left
 * @param 101
 * @default numpad5
 * @param 102
 * @default right
 * @param 103
 * @default numpad7
 * @param 104
 * @default up
 * @param 105
 * @default numpad9
 * @param 106
 * @default *
 * @param 107
 * @default +
 * @param 109
 * @default -
 * @param 110
 * @default .
 * @param 111
 * @default /
 * @param 112
 * @default f1
 * @param 113
 * @default f2
 * @param 114
 * @default f3
 * @param 115
 * @default f4
 * @param 116
 * @default f5
 * @param 117
 * @default f6
 * @param 118
 * @default f7
 * @param 119
 * @default f8
 * @param 120
 * @default debug
 * @param 121
 * @default f10
 * @param 122
 * @default f11
 * @param 123
 * @default f12
 * @param 144
 * @default numlock
 * @param 145
 * @default scrolllock
 * @param 186
 * @default ;
 * @param 187
 * @default =
 * @param 188
 * @default <
 * @param 189
 * @default -
 * @param 190
 * @default >
 * @param 191
 * @default ?
 * @param 192
 * @default `
 * @param 219
 * @default [
 * @param 220
 * @default |
 * @param 221
 * @default ]
 * @param 222
 * @default "
 */

/*~struct~Gamepad:

 * @param 0
 * @default ok
 * @param 1
 * @default cancel
 * @param 2
 * @default shift
 * @param 3
 * @default menu
 * @param 4
 * @default pageup
 * @param 5
 * @default pagedown
 * @param 6
 * @default lt
 * @param 7
 * @default rt
 * @param 8
 * @default select
 * @param 9
 * @default start
 * @param 10
 * @default l3
 * @param 11
 * @default r3
 * @param 12
 * @default up
 * @param 13
 * @default down
 * @param 14
 * @default left
 * @param 15
 * @default right
 * @param 16
 * @default l_up
 * @param 17
 * @default l_down
 * @param 18
 * @default l_left
 * @param 19
 * @default l_right
 * @param 20
 * @default r_up
 * @param 21
 * @default r_down
 * @param 22
 * @default r_left
 * @param 23
 * @default r_right
 */

/*~struct~Switches:

 * @param Key Name
 * @desc Key Name

 * @param Switch
 * @desc Switch that is controlled by pressing a key
 * @type switch

 */

/*~struct~Switches:ru

 * @param Key Name
 * @text Название клавиши
 * @desc Название клавиши

 * @param Switch
 * @text Переключатель
 * @desc Переключатель, который управляется нажатием клавиши
 * @type switch

 */

'use strict';

var Imported = Imported || {};
Imported.DKTools_Full_Input = 3.0;

if (Imported.DKTools) {
    DKTools.PluginManager.requirePlugin('DKTools', 0.99);
} else {
    throw new Error('No plugin "DKTools"! Plugin "DKTools_Full_Input" will not work!');
}

var FullInputParam = new DKTools.ParameterManager('DKTools_Full_Input');

_.reduce(FullInputParam.get('Switches'), function(accumulator, object) {
	const keyName = object['Key Name'];
	const switches = accumulator[keyName] || (accumulator[keyName] = []);
	if (object.Switch > 0) {
		switches.push(object.Switch);
	}
	return accumulator;
}, (FullInputParam.switches = {}));

Input.keyMapper = FullInputParam.get('Keyboard');
Input.gamepadMapper = FullInputParam.get('Gamepad');

/**
 * @private
 * @type {Number}
 */
Input._threshold = 0.5;

const Full_Input_Input_clear = Input.clear;
Input.clear = function() {
    Full_Input_Input_clear.call(this);
    this._keyboardDate = 0;
    this._gamepadDate = 0;
};

const Full_Input_Input_onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
    Full_Input_Input_onKeyDown.call(this, event);
    this._keyboardDate = Date.now();
    const keyName = this.keyMapper[event.keyCode];
	this._updateSwitches(keyName, true);
};

const Full_Input_Input_onKeyUp = Input._onKeyUp;
Input._onKeyUp = function(event) {
    Full_Input_Input_onKeyUp.call(this, event);
    const keyName = this.keyMapper[event.keyCode];
    this._updateSwitches(keyName, false);
};

/**
 * @private
 * @param gamepad
 */
Input._updateGamepadState = function(gamepad) {
	const lastState = this._gamepadStates[gamepad.index] || [];
    const newState = [];
    const buttons = gamepad.buttons;
    const axes = gamepad.axes;
    const threshold = this._threshold;
    let dateUpdated = false;

    _.forEach(buttons, function(button, index) {
		newState[index] = button.pressed;
    });

	newState[16] = axes[1] < -threshold; // l_up
	newState[17] = axes[1] > threshold; // l_down
	newState[18] = axes[0] < -threshold; // l_left
	newState[19] = axes[0] > threshold; // l_right
	newState[20] = axes[3] < -threshold; // r_up
	newState[21] = axes[3] > threshold; // r_down
	newState[22] = axes[2] < -threshold; // r_left
	newState[23] = axes[2] > threshold; // r_right

	_.forEach(newState, function(value, index) {
        const keyName = this.gamepadMapper[index];
        if (!keyName) {
        	return;
		}
		if (lastState[index] !== value) {
			this._currentState[keyName] = value;
		}
        if (value) {
            if (!dateUpdated) {
                dateUpdated = true;
                this._gamepadDate = Date.now();
            }
			this._updateSwitches(keyName, true);
        } else if (!value && lastState[index]) {
            this._updateSwitches(keyName, false);
		}
    }.bind(this));

	this._gamepadStates[gamepad.index] = newState;
};

Input._updateSwitches = function(keyName, state) {
    _.forEach(FullInputParam.switches[keyName], function(switchId) {
        $gameSwitches.setValue(switchId, state);
    });
};

/**
 * @static
 * @param {Number} code
 * @returns {String | null}
 */
Input.keyNameByCode = function(code) {
	if (this._keyboardDate > this._gamepadDate) {
        return this.keyMapper[code];
	}
	return this.gamepadMapper[code] || null;
};

/**
 * @static
 * @param {String} name
 * @returns {Number | null}
 */
Input.keyCodeByName = function(name) {
	let result = undefined;
	if (this._keyboardDate > this._gamepadDate) {
		result = _.find(this.keyMapper, name);
	} else {
        result = _.find(this.gamepadMapper, name);
	}
	if (_.isUndefined(result)) {
		return null;
	}
	return result;
};

/**
 * @static
 * @param {String[]} array
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyArrayNameHandler = function(array, method, returnCode) {
	array = array || [];
	for(let i = 0; i < array.length; i++) {
        const name = array[i];
		if (method(name)) {
			return returnCode ? this.keyCodeByName(name) : name;
		}
	}
	return null;
};

/**
 * @static
 * @param {Number[]} array
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyArrayCodeHandler = function(array, method, returnCode) {
	array = array || [];
	for(let i = 0; i < array.length; i++) {
		const code = array[i];
		if (method(code)) {
			return returnCode ? code : this.keyNameByCode(code);
		}
	}
	return null;
};

/**
 * @static
 * @param {Number} start
 * @param {Number} finish
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyForCodeHandler = function(start, finish, method, returnCode) {
	for(let code = start; code < finish + 1; code++) {
        const result = method(code, null, returnCode);
		if (result) {
			return result;
		}
	}
	return null;
};

// Key Code

/**
 * @static
 * @param {Number | null} code
 * @param {Number | null} gamepadCode
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.keyHandler = function(code, gamepadCode, method, returnCode) {
	const keyboardName = this.keyMapper[code];
    const gamepadName = this.gamepadMapper[gamepadCode];
	if (keyboardName != null && method(keyboardName)) {
		return returnCode ? code : keyboardName;
	}
	if (gamepadName != null && method(gamepadName)) {
		return returnCode ? gamepadCode : gamepadName;
	}
	return null;
};

/**
 * @static
 * @param {Number | null} code
 * @param {Number | null} gamepadCode
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.keyPressed = function(code, gamepadCode, returnCode) {
	return this.keyHandler(code, gamepadCode, this.isPressed.bind(this), returnCode);
};

/**
 * @static
 * @param {Number | null} code
 * @param {Number | null} gamepadCode
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.keyTriggered = function(code, gamepadCode, returnCode) {
	return this.keyHandler(code, gamepadCode, this.isTriggered.bind(this), returnCode);
};

/**
 * @static
 * @param {Number | null} code
 * @param {Number | null} gamepadCode
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.keyRepeated = function(code, gamepadCode, returnCode) {
	return this.keyHandler(code, gamepadCode, this.isRepeated.bind(this), returnCode);
};

/**
 * @static
 * @param {Number | null} code
 * @param {Number | null} gamepadCode
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.keyLongPressed = function(code, gamepadCode, returnCode) {
	return this.keyHandler(code, gamepadCode, this.isLongPressed.bind(this), returnCode);
};

// any Direction (symbols: up, down, left, right)

/**
 * @static
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyDirectionHandler = function(method, returnCode) {
	var array = ['up', 'down', 'left', 'right'];
	return this.anyArrayNameHandler(array, method, returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyDirectionPressed = function(returnCode) {
	return this.anyDirectionHandler(this.isPressed.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyDirectionTriggered = function(returnCode) {
	return this.anyDirectionHandler(this.isTriggered.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyDirectionRepeated = function(returnCode) {
	return this.anyDirectionHandler(this.isRepeated.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyDirectionLongPressed = function(returnCode) {
	return this.anyDirectionHandler(this.isLongPressed.bind(this), returnCode);
};

// only Left Stick (symbols: l_up, l_down, l_left, l_right)

/**
 * @static
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyLDirectionHandler = function(method, returnCode) {
	var array = ['l_up', 'l_down', 'l_left', 'l_right'];
	return this.anyArrayNameHandler(array, method, returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyLDirectionPressed = function(returnCode) {
	return this.anyLDirectionHandler(this.isPressed.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyLDirectionTriggered = function(returnCode) {
	return this.anyLDirectionHandler(this.isTriggered.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyLDirectionRepeated = function(returnCode) {
	return this.anyLDirectionHandler(this.isRepeated.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyLDirectionLongPressed = function(returnCode) {
	return this.anyLDirectionHandler(this.isLongPressed.bind(this), returnCode);
};

// only Right Stick (symbols: r_up, r_down, r_left, r_right)

/**
 * @static
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyRDirectionHandler = function(method, returnCode) {
	var array = ['r_up', 'r_down', 'r_left', 'r_right'];
	return this.anyArrayNameHandler(array, method, returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyRDirectionPressed = function(returnCode) {
	return this.anyRDirectionHandler(this.isPressed.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyRDirectionTriggered = function(returnCode) {
	return this.anyRDirectionHandler(this.isTriggered.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyRDirectionRepeated = function(returnCode) {
	return this.anyRDirectionHandler(this.isRepeated.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyRDirectionLongPressed = function(returnCode) {
	return this.anyRDirectionHandler(this.isLongPressed.bind(this), returnCode);
};

// any Key Code

/**
 * @static
 * @param {Number[] | null} codes
 * @param {Number[] | null} gamepadCodes
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyKeyHandler = function(codes, gamepadCodes, method, returnCode) {
	gamepadCodes = gamepadCodes || [];
	let result = this.anyArrayCodeHandler(codes, method, returnCode);
	if (result) {
		return result;
	}
	for(var i = 0; i < gamepadCodes.length; i++) {
		var code = gamepadCodes[i];
		result = method(null, code, returnCode);
		if (result) {
			return result;
		}
	}
	return null;
};

/**
 * @static
 * @param {Number[] | null} codes
 * @param {Number[] | null} gamepadCodes
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyKeyPressed = function(codes, gamepadCodes, returnCode) {
	return this.anyKeyHandler(codes, gamepadCodes, this.keyPressed.bind(this), returnCode);
};

/**
 * @static
 * @param {Number[] | null} codes
 * @param {Number[] | null} gamepadCodes
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyKeyTriggered = function(codes, gamepadCodes, returnCode) {
	return this.anyKeyHandler(codes, gamepadCodes, this.keyTriggered.bind(this), returnCode);
};

/**
 * @static
 * @param {Number[] | null} codes
 * @param {Number[] | null} gamepadCodes
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyKeyRepeated = function(codes, gamepadCodes, returnCode) {
	return this.anyKeyHandler(codes, gamepadCodes, this.keyRepeated.bind(this), returnCode);
};

/**
 * @static
 * @param {Number[] | null} codes
 * @param {Number[] | null} gamepadCodes
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyKeyLongPressed = function(codes, gamepadCodes, returnCode) {
	return this.anyKeyHandler(codes, gamepadCodes, this.keyLongPressed.bind(this), returnCode);
};

// any Key Name

/**
 * @static
 * @param {String[]} keys
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyPressed = function(keys, returnCode) {
	return this.anyArrayNameHandler(keys, this.isPressed.bind(this), returnCode);
};

/**
 * @static
 * @param {String[]} keys
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyTriggered = function(keys, returnCode) {
	return this.anyArrayNameHandler(keys, this.isTriggered.bind(this), returnCode);
};

/**
 * @static
 * @param {String[]} keys
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyRepeated = function(keys, returnCode) {
	return this.anyArrayNameHandler(keys, this.isRepeated.bind(this), returnCode);
};

/**
 * @static
 * @param {String[]} keys
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyLongPressed = function(keys, returnCode) {
	return this.anyArrayNameHandler(keys, this.isLongPressed.bind(this), returnCode);
};

// any Number (codes: 48-57)

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyNumberPressed = function(returnCode) {
	return this.anyForCodeHandler(48, 57, this.keyPressed.bind(this), returnCode); // 0 - 48, 9 - 57
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyNumberTriggered = function(returnCode) {
	return this.anyForCodeHandler(48, 57, this.keyTriggered.bind(this), returnCode); // 0 - 48, 9 - 57
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyNumberRepeated = function(returnCode) {
	return this.anyForCodeHandler(48, 57, this.keyRepeated.bind(this), returnCode); // 0 - 48, 9 - 57
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyNumberLongPressed = function(returnCode) {
	return this.anyForCodeHandler(48, 57, this.keyLongPressed.bind(this), returnCode); // 0 - 48, 9 - 57
};

// any Numpad (codes: 96-105)

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyNumpadPressed = function(returnCode) {
	return this.anyForCodeHandler(96, 105, this.keyPressed.bind(this), returnCode); // Numpad 0 - 96, Numpad 9 - 105
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyNumpadTriggered = function(returnCode) {
	return this.anyForCodeHandler(96, 105, this.keyTriggered.bind(this), returnCode); // Numpad 0 - 96, Numpad 9 - 105
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyNumpadRepeated = function(returnCode) {
	return this.anyForCodeHandler(96, 105, this.keyRepeated.bind(this), returnCode); // Numpad 0 - 96, Numpad 9 - 105
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyNumpadLongPressed = function(returnCode) {
	return this.anyForCodeHandler(96, 105, this.keyLongPressed.bind(this), returnCode); // Numpad 0 - 96, Numpad 9 - 105
};

// any Alphabet (codes: 65-90) + for russian: 186, 188, 190, 192, 219, 221, 222

/**
 * @static
 * @param {Function} method
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyAlphabetHandler = function(method, returnCode) {
    const result = this.anyForCodeHandler(65, 90, method, returnCode);
	if (result || !$gameSystem.isRussian()) {
		return result;
	}
	const array = [186, 188, 190, 192, 219, 221, 222]; // 186 - Ж, 188 - Б, 190 - Ю, 192 - Ё, 219 - Х, 221 - Ъ, 222 - Э
	return this.anyKeyHandler(array, null, method, returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyAlphabetPressed = function(returnCode) {
	return this.anyAlphabetHandler(this.keyPressed.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyAlphabetTriggered = function(returnCode) {
	return this.anyAlphabetHandler(this.keyTriggered.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyAlphabetRepeated = function(returnCode) {
	return this.anyAlphabetHandler(this.keyRepeated.bind(this), returnCode);
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyAlphabetLongPressed = function(returnCode) {
	return this.anyAlphabetHandler(this.keyLongPressed.bind(this), returnCode);
};

// any F (codes: 112-123)

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyFPressed = function(returnCode) {
	return this.anyForCodeHandler(112, 123, this.keyPressed.bind(this), returnCode); // F1 - 112, F12 - 123
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyFTriggered = function(returnCode) {
	return this.anyForCodeHandler(112, 123, this.keyTriggered.bind(this), returnCode); // F1 - 112, F12 - 123
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyFRepeated = function(returnCode) {
	return this.anyForCodeHandler(112, 123, this.keyRepeated.bind(this), returnCode); // F1 - 112, F12 - 123
};

/**
 * @static
 * @param {Boolean} [returnCode]
 * @returns {Boolean | null}
 */
Input.anyFLongPressed = function(returnCode) {
	return this.anyForCodeHandler(112, 123, this.keyLongPressed.bind(this), returnCode); // F1 - 112, F12 - 123
};

// Backspace

/**
 * @static
 * @returns {Boolean | null}
 */
Input.BackspacePressed = function() {
	return this.keyPressed(8);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.BackspaceTriggered = function() {
	return this.keyTriggered(8);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.BackspaceRepeated = function() {
	return this.keyRepeated(8);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.BackspaceLongPressed = function() {
	return this.keyLongPressed(8);
};

// Tab

/**
 * @static
 * @returns {Boolean | null}
 */
Input.TabPressed = function() {
	return this.keyPressed(9);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.TabTriggered = function() {
	return this.keyTriggered(9);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.TabRepeated = function() {
	return this.keyRepeated(9);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.TabLongPressed = function() {
	return this.keyLongPressed(9);
};

// Enter

/**
 * @static
 * @returns {Boolean | null}
 */
Input.EnterPressed = function() {
	return this.keyPressed(13);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.EnterTriggered = function() {
	return this.keyTriggered(13);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.EnterRepeated = function() {
	return this.keyRepeated(13);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.EnterLongPressed = function() {
	return this.keyLongPressed(13);
};

// Shift

/**
 * @static
 * @returns {Boolean | null}
 */
Input.ShiftPressed = function() {
	return this.keyPressed(16);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.ShiftTriggered = function() {
	return this.keyTriggered(16);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.ShiftRepeated = function() {
	return this.keyRepeated(16);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.ShiftLongPressed = function() {
	return this.keyLongPressed(16);
};

// Ctrl

/**
 * @static
 * @returns {Boolean | null}
 */
Input.CtrlPressed = function() {
	return this.keyPressed(17);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.CtrlTriggered = function() {
	return this.keyTriggered(17);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.CtrlRepeated = function() {
	return this.keyRepeated(17);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.CtrlLongPressed = function() {
	return this.keyLongPressed(17);
};

// Alt

/**
 * @static
 * @returns {Boolean | null}
 */
Input.AltPressed = function() {
	return this.keyPressed(18);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.AltTriggered = function() {
	return this.keyTriggered(18);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.AltRepeated = function() {
	return this.keyRepeated(18);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.AltLongPressed = function() {
	return this.keyLongPressed(18);
};

// Escape

/**
 * @static
 * @returns {Boolean | null}
 */
Input.EscapePressed = function() {
	return this.keyPressed(27);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.EscapeTriggered = function() {
	return this.keyTriggered(27);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.EscapeRepeated = function() {
	return this.keyRepeated(27);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.EscapeLongPressed = function() {
	return this.keyLongPressed(27);
};

// Space

/**
 * @static
 * @returns {Boolean | null}
 */
Input.SpacePressed = function() {
	return this.keyPressed(32);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.SpaceTriggered = function() {
	return this.keyTriggered(32);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.SpaceRepeated = function() {
	return this.keyRepeated(32);
};

/**
 * @static
 * @returns {Boolean | null}
 */
Input.SpaceLongPressed = function() {
	return this.keyLongPressed(32);
};