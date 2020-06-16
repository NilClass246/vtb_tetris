/*
Title: Localization
Author: DK (Denis Kuznetsov)
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 4.5.0
Release: 22.04.2020
First release: 28.08.2016
Supported languages: Russian, English
*/

/*ru
Название: Локализация
Автор: DK (Денис Кузнецов)
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 4.5.0
Релиз: 22.04.2020
Первый релиз: 28.08.2016
Поддерживаемые языки: Русский, Английский
*/

/*:
 * @plugindesc v.4.5.0 Localization of game
 * @author DK (Denis Kuznetsov)
 * @help

 ### Info about plugin ###
 Title: DKTools_Localization
 Author: DK (Denis Kuznetsov)
 Site: https://dk-plugins.ru
 Version: 4.5.0
 Release: 22.04.2020
 First release: 28.08.2016
 Supported languages: Russian, English
 Thank you for your support: https://dk-plugins.ru/donate

 ### Requirement for plugin ###
 Availability of working plugin DKTools version 8.0.1 or above

 ### Demo ###
 https://dk-plugins.ru/mv/system/localization/

 ### Special compatibility with other plugins ###
 The plugin is compatible with most other plugins,
 but plugins that do not work with localization can still be included.
 I add the compatibility of these plugins. For compatibility to work properly,
 plugins from the following list must be placed above the localization plugin:
 YEP_QuestJournal.js

 ## Attention! ##
 If you think that any plugin is not compatible with localization, let me know.

 ### Instructions ###

 ### 1 ### Installation ###
 1. Add at least one language in the "Game languages" parameter.
 2. If you changed the standard font in the game, you also need to change it in the "Standard Font" parameter.

 ### 2 ### Usage ###
 1. When you first start the game, the plugin will create a folder for translations and json files for each language.
 2. To localize text use the tags: [t][/t] or {} (preferable).
 3. To use a variable inside text use the tag: \VAR[ID],
 where ID is the number of the variable. Use only for depth of translation.

 ### Adding a new translation with an example of an event with a message ###
 1. Create a new event, add a message display.
 2. In the message, write {text} or [t]text[/ t]. Save the event and project.
 3. Open json files for each language.
 4. The first character of the file must be {, and the last one - }.
 These characters can not be deleted. Inside these brackets the translation of the game is written.
 6. Add the following text to one of the files and save it: "text": "Text".
 7. Start the game and the created event.

 ### Important ###
 The encoding in the translation files must be UTF-8 without BOM

 ### Using arrays ###
 Since version 4.2, the plugin supports arrays in json files.
 Such arrays are loaded into the localization data by file name.

 ### Using arrays with the quests.json file as an example ###
 1. The file has the following structure:
 [null, { "name": "Quest 1" }, { "name": "Quest 2" }]
 2. To display the text "Quest 1" in a message, you need to write a tag
 {quests[1].name}
 To access the array, you must first write the file name,
 in which it is stored, then it must be indicated in square brackets
 the element number and the field to be used.

 ### Using different files (audio, images and videos) for each language ###
 ## Attention! ##
 For this function to work on mobile devices and browsers,
 you must set the Nwjs + Stamp file system mode in the DKTools plugin!

 1. Create a new folder in the required folder
 2. Use the desired game locale as the folder name
 3. Move the files to the created folder
 Example:
 You want to use different Loading.png files for different languages
 The main file is located in the "img/system" folder.
 Create a folder "ru" in "img/system" and move there Loading.png for the Russian language.
 For example, for English, the main file from "img/system" will be used,
 and for the Russian language from the "img/system/ru" created by us.
 This function works only with audio, video and images.

 ### Using an unlimited number of translation files ###
 ## Attention! ##
 For this function to work on mobile devices and browsers,
 you must set the Nwjs + Stamp file system mode in the DKTools plugin!
 This instruction is intended for the folder that has a default name (locales)
 If you renamed the folder in the plugin settings, then use the new folder name!

 If you have a large amount of text in the game, and you are not comfortable using one json file,
 then you can split it into several json files and put it in a separate folder.
 Example for English locale (en):
 1. In the locales folder, create an "en" folder.
 2. Transfer your old en.json file from the locales folder to the new folder.
 3. Create several json files with any names.
 4. In each file, write down the required tags and save the changes.
 ## Attention! ##
 All tags in all files must have a unique name!
 If the tag names match, the first one will be loaded (order is not guaranteed)!

 ### 3 ### Plugin parameters ###
 1. Ignored files - Files that are ignored by the UpdateLocalizationTags plugin command.
 2. Parse Depth - The number of text translation operations.
 In the translated text you can specify another tag,
 and it will be translated if the depth of translation is greater than 1.
 Example:
 "text": "Text {text2}",
 "text2" "2"
 With a translation depth of more than 1, the result is "Text 2".
 3. Text Length - The length of the text at which it is saved in the cache.
 This is necessary to reduce the computational resources for translation.
 The cache is automatically cleared when between maps.

 ### 4 ### Message special symbols ###
 1. \language - Display the name of the current language

 ### 5 ### Plugin commands ###
 1. Updates tags in the translation files.
 The plugin command checks json files from "data/"
 except ignored files specified in the plugin parameters
 and also all the parameters of all plugins.
 Found tags are saved in new files in the localization folder with the prefix "new".
 UpdateLocalizationTags

 2. Clears the localization cache.
 ClearLocalizationCache

 ### License and terms of use ###

 Recent information about the terms of use: https://dk-plugins.ru/terms-of-use

 You can:
 -Free use the plugin for your commercial and non commercial projects.
 -Translate the plugin to other languages (inform if you do this)
 -Change code of plugin, but you must specify a link to the original plugin

 You can't:
 -Delete or change any information about plugin (Title, authorship, contact information, version and release)

 * @param Localization
 * @default ---------------------------------

 * @param Languages
 * @text Game languages
 * @parent Localization
 * @desc List of game languages
 * @type struct<Language>[]
 * @default ["{\"Language\":\"English\",\"Locale\":\"en\",\"Primary\":\"true\"}"]

 * @param Locale File
 * @text Path to save the language of the game
 * @parent Localization
 * @desc Path to save the language of the game
 * @default save/locale.rpgsave

 * @param Localization Folder
 * @text Path to the localization folder
 * @parent Localization
 * @desc Path to the localization folder
 * @default locales/

 * @param Standard Font
 * @desc Standard font (with extension) from fonts/folder
 * @default mplus-1m-regular.ttf

 * @param Fonts
 * @desc Fonts for each language
 * @type struct<Font>[]
 * @default []

 * @param First Launch
 * @parent Localization
 * @desc Show language choices the first time you start the game ?
 * @type boolean
 * @default false

 * @param Parse Depth
 * @desc Parse depth. See the plugin help for details.
 * @type number
 * @min 1
 * @max 5
 * @default 2

 * @param Cache
 * @parent Localization
 * @default ---------------------------------

 * @param Text Length
 * @parent Cache
 * @desc The minimum length of text to save to the cache. See the plugin help for details.
 * @type number
 * @min 8
 * @default 20

 * @param Update Localization Tags
 * @default ---------------------------------

 * @param Ignored Files
 * @parent Update Localization Tags
 * @desc Ignored files from data/. See the plugin help for details.
 * @type string[]
 * @default ["Animations","MapInfos","Tilesets"]

 * @param Title Menu
 * @default ---------------------------------

 * @param Show Command
 * @parent Title Menu
 * @desc Show the command in the title menu ?
 * @type boolean
 * @default true

 * @param Command Name
 * @parent Title Menu
 * @desc Command name
 * @default {interface_language}

 * @param Button
 * @parent Title Menu
 * @text Button on the title screen
 * @default ---------------------------------

 * @param Show Button
 * @parent Button
 * @desc Show the button in the title menu ?
 * @type boolean
 * @default false

 * @param Button Graphic
 * @parent Button
 * @desc Button graphic from img/system. Use %1 to replace by locale.
 * @default locale_%1

 * @param Button X
 * @parent Button
 * @desc The X coordinate
 * @type number
 * @min 0
 * @default 0

 * @param Button Y
 * @parent Button
 * @desc The Y coordinate
 * @type number
 * @min 0
 * @default 0

 * @param Options
 * @default ---------------------------------

 * @param Show Options Command
 * @parent Options
 * @desc Show the command in the options ?
 * @type boolean
 * @default false

 * @param Options Command Name
 * @parent Options
 * @desc Command name
 * @default {interface_language}

 * @param Scene Localization
 * @text Appearance
 * @default ---------------------------------

 * @param Background Filename
 * @parent Scene Localization
 * @desc Background
 * @type file
 * @dir img/system/

 * @param Foreground Filename
 * @parent Scene Localization
 * @desc Foreground
 * @type file
 * @dir img/system/

 * @param Window Width
 * @parent Scene Localization
 * @desc Window width
 * @type number
 * @min 1
 * @default 600

 * @param Window Rows
 * @text Number of visible rows
 * @parent Scene Localization
 * @desc Number of visible rows
 * @type number
 * @min 2
 * @default 2

 * @param Help Text
 * @parent Scene Localization
 * @desc Help text for each language
 * @type struct<HelpText>[]
 * @default ["{\"Locale\":\"en\",\"Data\":\"Select language\"}"]

 * @param Flag Filename
 * @parent Scene Localization
 * @desc Flag filename from img/system. Use %1 to replace by locale.
 * @default flag_%1

 * @param Flag Size
 * @parent Scene Localization
 * @desc Flag Size in pixels
 * @type number
 * @min 16
 * @default 48

 * @param Font Size
 * @parent Scene Localization
 * @desc Font size
 * @type number
 * @min 1
 * @default 28

 */

/*:ru
 * @plugindesc v.4.5.0 Локализация игры
 * @author DK (Денис Кузнецов)
 * @help

 ### Информация о плагине ###
 Название: DKTools_Localization
 Автор: DK (Денис Кузнецов)
 Сайт: https://dk-plugins.ru
 Версия: 4.5.0
 Релиз: 22.04.2020
 Первый релиз: 28.08.2016
 Поддерживаемые языки: Русский, Английский
 Спасибо за Вашу поддержку: https://dk-plugins.ru/donate

 ### Требования и зависимости ###
 Наличие включенного плагина DKTools версии 8.0.1 или выше

 ### Демоверсия ###
 https://dk-plugins.ru/mv/system/localization/

 ### Специальная совместимость с другими плагинами ###
 Плагин совместим с большинством других плагинов, но все же могут попасться плагины,
 которые не работают с локализацией. Я добавляю совместимость этих плагинов.
 Чтобы совместимость работала правильно,
 плагины из следующего списка необходимо разместить выше плагина локализации:
 YEP_QuestJournal.js

 ### Внимание! ###
 Если вы считаете, что какой-то плагин не совместим с локализацией сообщите мне об этом.

 ### Инструкции ###

 ### 1 ### Установка ###
 1. Добавить хотя бы один язык в параметре "Языки игры".
 2. Если вы меняли стандартный шрифт в игре, то его также нужно изменить в параметре "Стандартный шрифт".

 ### 2 ### Использование ###
 1. При первом запуске игры плагин создаст папку для переводов и json файлы для каждого языка.
 2. Для локализации текста используйте теги: [t][/t] или {} (предпочтительнее).
 3. Для использования переменной внутри текста используйте тег \VAR[ID],
 где ID - номер переменной. Используйте только для глубины перевода (см. ниже).

 ### Добавление нового перевода на примере события с сообщением ###
 1. Создайте новое событие, добавьте отображение сообщения.
 2. В сообщении напишите {text} или [t]text[/t]. Сохраните событие и проект.
 3. Откройте json файлы для каждого языка.
 4. Первый символ файла должна быть {, а последний - }.
 Эти символы нельзя удалять. Внутри этих скобок пишется перевод игры.
 6. Добавьте в один из файлов следующий текст и сохраните его: "text": "Текст".
 7. Запустите игру и созданное событие.

 ### Внимание! ###
 Кодировка в файлах перевода должна быть UTF-8 без BOM.

 ### Использование массивов ###
 Начиная с версии 4.2, плагин поддерживает массивы в json файлах.
 Такие массивы загружаются в данные локализации по названию файла.

 ### Использование массивов на примере файла quests.json ###
 1. Файл имеет следующую структуру:
 [null, { "name": "Quest 1" }, { "name": "Quest 2" }]
 2. Чтобы вывести в сообщении текст "Quest 1", необходимо прописать тег
 {quests[1].name}
 Чтобы обратиться к массиву сначала необходимо написать название файла,
 в котором он хранится, затем необходимо указать в квадратных скобках
 номер элемента и поле, которое должно быть использовано.

 ### Использование разных файлов (аудио, изображения, видео) для каждого языка ###
 ## Внимание! ##
 Для работы данной функции на мобильных устройствах и в браузерах
 необходимо выставить режим работы файловой системы Nwjs + Stamp в плагине DKTools!

 1. Создайте новую папку в необходимой папке
 2. В качестве имени папки используйте необходимую локаль игры
 3. Переместите файлы в созданную папку
 Пример:
 Необходимо использовать разные файлы Loading.png для разных языков
 Основной файл находится в папке "img/system".
 Создаем папку "ru" в "img/system" и перемещаем туда Loading.png для русского языка.
 Например, для английского языка будет использоваться основной файл из "img/system",
 а для русского языка из созданной нами "img/system/ru".
 Данная функция работает только с аудио, видео и изображениями.

 ### Использование неограниченного количества файлов перевода ###
 ## Внимание! ##
 Для работы данной функции на мобильных устройствах и в браузерах
 необходимо выставить режим работы файловой системы Nwjs + Stamp в плагине DKTools!
 Данная инструкция предназначена для папки, которая имеет название по умолчанию (locales)
 Если Вы переименовали папку в параметрах плагина, то используйте новое название папки!

 Если у Вас большое количество текста в игре, и Вам неудобно пользоваться одним json файлом,
 то Вы можете разбить его на несколько json файлов и поместить в отдельную папку.
 Пример для английской локали (en):
 1. В папке locales создайте папку en.
 2. Перенесите в новую папку свой старый файл en.json из папки locales.
 3. Создайте несколько json файлов с любыми именами.
 4. В каждом файле пропишите необходимые теги и сохраните изменения.
 ## Внимание! ##
 Все теги во всех файлах должны иметь уникальное название!
 В случае совпадения имен тегов будет загружен первый из них (порядок не гарантируется)!

 ### 3 ### Параметры плагина ###
 1. Игнорируемые файлы - Файлы, которые игнорируются командой плагина UpdateLocalizationTags.
 2. Глубина перевода - Количество операций перевода текста.
 В переведенном тексте Вы можете указать другой тег,
 и он будет переведен, если глубина перевода больше 1.
 Пример:
 "text": "Текст {text2}",
 "text2" "2"
 При глубине перевода больше 1 в итоге получится "Текст 2".
 3. Длина текста - Длина текста, при которой он сохраняется в кэш.
 Это нужно, чтобы сократить необходимые вычислительные ресурсы для перевода.
 Кэш автоматически очищается при переходе между картами.

 ### 4 ### Специальные символы сообщений ###
 1. \language - Вывести название текущего языка

 ### 5 ### Команды плагина ###
 1. Обновить теги в файлах перевода.
 Команда плагина проверяет json файлы из папки "data/" (кроме игнорируемых файлов,
 заданных в параметрах плагина), а также все параметры всех плагинов.
 Найденные теги сохраняются в новые файлы в папке локализации с префиксом "new".
 UpdateLocalizationTags

 2. Очистить кэш локализации.
 ClearLocalizationCache

 ### Лицензия и правила использования плагина ###

 Актуальная информация о правилах использования: https://dk-plugins.ru/terms-of-use

 Вы можете:
 -Бесплатно использовать данный плагин в некоммерческих и коммерческих проектах
 -Переводить плагин на другие языки (сообщите мне, если Вы перевели плагин на другой язык)
 -Изменять код плагина, но Вы обязаны указать ссылку на оригинальный плагин

 Вы не можете:
 -Убирать или изменять любую информацию о плагине (Название, авторство, контактная информация, версия и дата релиза)

 * @param Localization
 * @text Локализация
 * @default ---------------------------------

 * @param Languages
 * @text Языки игры
 * @parent Localization
 * @desc Список языков игры
 * @type struct<Language>[]
 * @default ["{\"Language\":\"Русский\",\"Locale\":\"ru\",\"Primary\":\"true\"}"]

 * @param Locale File
 * @text Путь для сохранения языка игры
 * @parent Localization
 * @desc Путь для сохранения языка игры
 * @default save/locale.rpgsave

 * @param Localization Folder
 * @text Путь к папке с переводами
 * @parent Localization
 * @desc Путь к папке с переводами
 * @default locales/

 * @param Standard Font
 * @text Стандартный шрифт
 * @parent Localization
 * @desc Стандартный шрифт (с расширением) из папки fonts/
 * @default mplus-1m-regular.ttf

 * @param Fonts
 * @text Шрифты
 * @parent Localization
 * @desc Шрифты для каждого языка
 * @type struct<Font>[]
 * @default []

 * @param First Launch
 * @parent Localization
 * @text Первый запуск
 * @desc Показывать выбор языка при первом запуске игры ?
 * @type boolean
 * @default false

 * @param Parse Depth
 * @text Глубина перевода
 * @parent Localization
 * @desc Глубина перевода. Подробнее в справке плагина.
 * @type number
 * @min 1
 * @max 5
 * @default 2

 * @param Cache
 * @text Кэш
 * @parent Localization
 * @default ---------------------------------

 * @param Text Length
 * @parent Cache
 * @text Длина текста
 * @desc Минимальная длина текста для сохранения в кэш. Подробнее в справке плагина.
 * @type number
 * @min 8
 * @default 20

 * @param Update Localization Tags
 * @text Обновление тегов локализации
 * @default ---------------------------------

 * @param Ignored Files
 * @text Игнорируемые файлы
 * @parent Update Localization Tags
 * @desc Игнорируемые файлы из папки data/. Подробнее в справке плагина.
 * @type string[]
 * @default ["Animations","MapInfos","Tilesets"]

 * @param Title Menu
 * @text Титульное меню
 * @default ---------------------------------

 * @param Show Command
 * @parent Title Menu
 * @text Показывать команду
 * @desc Показывать команду в титульном меню ?
 * @type boolean
 * @default true

 * @param Command Name
 * @text Название команды
 * @parent Title Menu
 * @desc Название команды
 * @default {interface_language}

 * @param Button
 * @parent Title Menu
 * @text Кнопка на титульном экране
 * @default ---------------------------------

 * @param Show Button
 * @text Показывать кнопку
 * @parent Button
 * @desc Показывать кнопку на титульном экране ?
 * @type boolean
 * @default false

 * @param Button Graphic
 * @text Графика кнопки
 * @parent Button
 * @desc Графика кнопки из папки img/system. Используйте %1, чтобы заменить на локаль игры.
 * @default locale_%1

 * @param Button X
 * @text Координата X
 * @parent Button
 * @desc Координата X
 * @type number
 * @min 0
 * @default 0

 * @param Button Y
 * @text Координата Y
 * @parent Button
 * @desc Координата Y
 * @type number
 * @min 0
 * @default 0

 * @param Options
 * @text Опции
 * @default ---------------------------------

 * @param Show Options Command
 * @parent Options
 * @text Показывать команду
 * @desc Показывать команду в опциях ?
 * @type boolean
 * @default false

 * @param Options Command Name
 * @text Название команды
 * @parent Options
 * @desc Название команды
 * @default {interface_language}

 * @param Scene Localization
 * @text Внешний вид
 * @default ---------------------------------

 * @param Background Filename
 * @text Задний фон
 * @parent Scene Localization
 * @desc Задний фон
 * @type file
 * @dir img/system/

 * @param Foreground Filename
 * @text Передний фон
 * @parent Scene Localization
 * @desc Передний фон
 * @type file
 * @dir img/system/

 * @param Window Width
 * @text Ширина окна
 * @parent Scene Localization
 * @desc Ширина окна
 * @type number
 * @min 1
 * @default 600

 * @param Window Rows
 * @text Количество отображаемых строк
 * @parent Scene Localization
 * @desc Количество отображаемых строк
 * @type number
 * @min 2
 * @default 2

 * @param Help Text
 * @text Текст подсказки
 * @parent Scene Localization
 * @desc Текст подсказки для каждого языка
 * @type struct<HelpText>[]
 * @default ["{\"Locale\":\"ru\",\"Data\":\"Выберите язык\"}"]

 * @param Flag Filename
 * @parent Scene Localization
 * @text Графика флага
 * @desc Графика флага из папки img/system. Используйте %1, чтобы заменить на локаль игры
 * @default flag_%1

 * @param Flag Size
 * @parent Scene Localization
 * @text Размер флага
 * @desc Размер флага в пикселях
 * @type number
 * @min 16
 * @default 48

 * @param Font Size
 * @parent Scene Localization
 * @text Размер шрифта
 * @desc Размер шрифта
 * @type number
 * @min 1
 * @default 28

 */

/*~struct~Language:

 * @param Language
 * @text Language name
 * @desc Language name

 * @param Locale
 * @text Short language name
 * @desc Short language name (locale)

 * @param Primary
 * @text Primary language
 * @desc Is this the primary language of the game ?
 * @type boolean
 * @default false

 */

/*~struct~Language:ru

 * @param Language
 * @text Название языка
 * @desc Название языка

 * @param Locale
 * @text Короткое название языка
 * @desc Короткое название языка (локаль)

 * @param Primary
 * @text Основной язык
 * @desc Это основной язык игры ?
 * @type boolean
 * @default false

 */

/*~struct~HelpText:

 * @param Locale
 * @desc Game locale. For example: en

 * @param Text
 * @desc Help text. For example: Select language

 */

/*~struct~HelpText:ru

 * @param Locale
 * @text Локаль игры
 * @desc Локаль игры. Например: ru

 * @param Text
 * @text Текст
 * @desc Текст подсказки. Например: Выберите язык

 */

/*~struct~Font:

 * @param Locale
 * @desc Game locale. For example: en

 * @param Font
 * @desc Font (with file extension). For example, my_amazing_font.ttf

 */

/*~struct~Font:ru

 * @param Locale
 * @text Локаль игры
 * @desc Локаль игры. Например: ru

 * @param Font
 * @text Шрифт
 * @desc Шрифт (с расширением файла). Например, my_amazing_font.ttf

 */

'use strict';

var Imported = Imported || {};
Imported.DKTools_Localization = '4.5.0';

if (Imported.DKTools) {
    DKTools.PluginManager.requirePlugin('DKTools', '8.0.1');
} else {
    throw new Error('No plugin "DKTools"! Plugin "DKTools_Localization" will not work!');
}

//===========================================================================
// initialize parameters
//===========================================================================

const LocalizationParam = new DKTools.ParameterManager('DKTools_Localization');

//===========================================================================
// initialize plugin commands
//===========================================================================

DKTools.PluginCommandManager.set('UpdateLocalizationTags', async () => {
    if (!DKTools.IO.isLocalMode()) {
        return;
    }

    const directory = new DKTools.IO.Directory('data/');
    const result = await directory.getJsonFilesAsync();

    if (result.status !== DKTools.IO.OK) {
        throw new Error('Can not load json files from folder "data/"');
    }

    if (result.data.length === 0) {
        throw new Error('Folder "data/" does not contain json files');
    }

    const ignoredFiles = LocalizationParam.get('Ignored Files');
    const files = _.filter(result.data, file => !DKTools.Utils.Array.contains(ignoredFiles, file.getName()));

    if (files.length === 0) {
        return;
    }

    const regexOld = DKTools.Localization.regexOld;
    const regexNew = DKTools.Localization.regexNew;
    const data = {};

    const processMatch = (regex, value) => {
        let result = regex.exec(value);

        while (result !== null) {
            const match = result[1];

            _.set(data, match, '');

            result = regex.exec(value);
        }
    };

    const parseObject = (object) => {
        if (!(object instanceof Object)) {
            return;
        }

        _.forEach(object, (value) => {
            if (DKTools.Utils.isString(value)) {
                processMatch(regexOld, value);
                processMatch(regexNew, value);
            } else {
                parseObject(value);
            }
        });
    };

    _.forEach(files, async file => {
        const fileData = await file.loadJsonAsync().then(result => result.data);

        _.forEach(fileData, parseObject);
    });

    _.forEach($plugins, plugin => {
        parseObject(new DKTools.ParameterManager(plugin.name).params);
    });

    const promises = DKTools.Localization.locales.map(async (locale) => {
        const basePath = DKTools.Localization._dataPath + locale;
        const file = new DKTools.IO.File(basePath + '.json');
        const localizationData = await DKTools.Localization._loadData(locale);
        let needSave = false;

        if (localizationData) {
            const newData = {};

            _.forEach(data, (value, key) => {
                if (_.get(localizationData, key) === undefined) {
                    newData[key] = value;

                    needSave = true;
                }
            });

            if (!needSave) {
                return Promise.resolve();
            }

            const newFile = new DKTools.IO.File(basePath + '_new.json');

            return newFile.saveJsonAsync(newData, { createDirectory: true });
        } else {
            return file.saveJsonAsync(data, { createDirectory: true });
        }
    });

    Promise.all(promises).then(() => {
        alert('Localization tags updated!');
    });
});

DKTools.PluginCommandManager.set('ClearLocalizationCache', () => {
    DKTools.Localization.clearCache();
});

//===========================================================================
// DKTools.Localization
//===========================================================================

/**
 * Static localization class
 *
 * @class DKTools.Localization
 * @memberof DKTools
 */
DKTools.Localization = class {

    constructor() {
        return DKTools.Localization;
    }

    // static properties

    /**
     * @private
     * @static
     * @readonly
     * @type {String}
     */
    static get _localePath() {
        return DKTools.IO.normalizePath(LocalizationParam.get('Locale File'));
    }

    /**
     * @private
     * @static
     * @readonly
     * @type {String}
     */
    static get _dataPath() {
        return DKTools.IO.normalizePath(LocalizationParam.get('Localization Folder') + '/');
    }

    /**
     * @since 4.4.0
     *
     * @private
     * @static
     * @readonly
     * @type {String}
     */
    static get _webStoragePath() {
        return 'RPG Locale';
    }

    /**
     * @since 4.4.0
     *
     * @private
     * @static
     * @readonly
     * @type {DKTools.IO.File}
     */
    static get _file() {
        return new DKTools.IO.File(this._localePath);
    }

    // _initialize methods

    /**
     * @private
     * @static
     */
    static _initializeLanguages() {
        _.forEach(LocalizationParam.get('Languages'), (object) => {
            this._languages[object.Locale] = object.Language;
        });
    }

    /**
     * @private
     * @static
     * @async
     */
    static async _initializeLocale() {
        const locales = this.locales;

        if (!DKTools.Utils.Array.isEmpty(locales)) {
            const firstLaunch = LocalizationParam.get('First Launch');

            await this.loadLocale();

            if (!this._locale) {
                const primaryLanguage = LocalizationParam.get('Languages', { Primary: true });

                if (primaryLanguage) {
                    this._locale = primaryLanguage.Locale;
                } else {
                    this._locale = locales[0];

                    if (!firstLaunch) {
                        console.warn('You have not installed the primary language of the game! Automatically selected locale: ' + this._locale);
                    }
                }

                if (!firstLaunch) {
                    await this.saveLocale();
                }
            }
        } else {
            await this.removeLocale();

            throw new Error('Add at least one language! See help of plugin "DKTools_Localization"!');
        }
    }

    /**
     * @private
     * @static
     */
    static _initializeDecrypterIgnoreList() {
        _.forEach(this.locales, (locale) => {
            const path = `img/system/${locale}/Window.png`;
            const file = new DKTools.IO.File(path);

            if (file.exists()) {
                Decrypter._ignoreList.push(path);
            }
        });
    }

    // initialize methods

    /**
     * Initializes the manager
     *
     * @version 4.0
     * @static
     * @async
     */
    static async initialize() {

        /**
         * @private
         * @readonly
         * @type {String}
         */
        this._locale = '';

        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._languages = {};

        await this._initializeLanguages();
        await this._initializeLocale();
        await this._initializeDecrypterIgnoreList();
        await this._checkData();
        await this.clearCache();
        await this.loadData();
        await this.loadFont();
        await this.updateLoadingImage();

        /**
         * @private
         * @readonly
         * @type {Boolean}
         */
        this._isReady = true;
    }

    // get methods

    /**
     * @version 4.2
     * @private
     * @static
     */
    static _getText(text) {
        const parseDepth = LocalizationParam.get('Parse Depth');
        const regexVar = this.regexVar;
        const regexOld = this.regexOld;
        const regexNew = this.regexNew;
        const data = this._data;
        const cacheVariables = this._cacheVariables;
        const initialText = text;
        const variables = [];
        const varReplace = (text) => {
            return text.replace(regexVar, (string, match) => {
                const id = Number(match);

                cacheVariables[id] = true;

                variables.push(id);
                needCache = true;

                return $gameVariables.value(id);
            });
        };
        const textReplace = (text, regex) => {
            return text.replace(regex, (string, match) => {
                if (data.hasOwnProperty(match)) {
                    needCache = true;

                    return data[match];
                } else {
                    const value = _.get(data, match);

                    if (DKTools.Utils.isString(value)) {
                        needCache = true;

                        return value;
                    }
                }

                return match;
            });
        };
        const parseText = (text) => {
            text = varReplace(text);
            text = textReplace(text, regexOld);
            text = textReplace(text, regexNew);
            text = varReplace(text);

            return text;
        };

        let needCache = false;

        for (let i = 0; i < parseDepth; i++) {
            text = parseText(text);

            if (!needCache) {
                break;
            }
        }

        if (needCache && initialText.length >= LocalizationParam.get('Text Length')) {
            this._cache[initialText] = { variables, text };
        }

        return text;
    }

    /**
     * Returns localized text
     *
     * @static
     * @param {String} text - Text
     *
     * @returns {String} Localized text
     */
    static getText(text) {
        text = String(text);

        if (text.length < 3) {
            return text;
        }

        if (!this._data) {
            return text;
        }

        if (this._cache[text]) {
            return this._cache[text].text;
        }

        return this._getText(text);
    }

    /**
     * Returns the previous locale from the list
     *
     * @static
     * @returns {String | null} Previous locale from the list
     */
    static getPrevLocale() {
        const locales = this.locales;
        let index = _.indexOf(locales, this._locale);

        if (index >= 0) {
            index--;

            if (index < 0) {
                index = locales.length - 1;
            }

            return locales[index];
        }

        return null;
    }

    /**
     * Returns the next locale from the list
     *
     * @static
     * @returns {String | null} Next locale from the list or null
     */
    static getNextLocale() {
        const locales = this.locales;
        let index = _.indexOf(locales, this._locale);

        if (index >= 0) {
            index++;

            if (index === locales.length) {
                index = 0;
            }

            return locales[index];
        }

        return null;
    }

    /**
     * Returns the previous language from the list
     *
     * @static
     * @returns {String | null} Previous language from the list or null
     */
    static getPrevLanguage() {
        const locale = this.getPrevLocale();

        if (locale) {
            return this._languages[locale];
        }

        return null;
    }

    /**
     * Returns the next language from the list
     *
     * @static
     * @returns {String | null} Next language from the list or null
     */
    static getNextLanguage() {
        const locale = this.getNextLocale();

        if (locale) {
            return this._languages[locale];
        }

        return null;
    }

    /**
     * Returns the language of the game by the locale of the game
     *
     * @static
     *
     * @param {String} locale - Locale
     *
     * @returns {String | undefined} Language or undefined
     */
    static getLanguageByLocale(locale) {
        return this._languages[locale];
    }

    /**
     * Returns the locale of the game by the name of the language
     *
     * @static
     *
     * @param {String} language - Language
     *
     * @returns {String | undefined} Locale or undefined
     */
    static getLocaleByLanguage(language) {
        const languages = _.reduce(this._languages, function(acc, value, key) {
            acc[value] = key;

            return acc;
        }, {});

        return languages[language];
    }

    // clear methods

    /**
     * Clears the cache
     *
     * @static
     */
    static clearCache() {
        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._cache = {};

        /**
         * @private
         * @readonly
         * @type {Array}
         */
        this._cacheVariables = [];
    }

    // _check methods

    /**
     * Checks a directory and files with translations
     * Creates a directory and files if they are missing
     *
     * @version 4.0
     *
     * @private
     * @static
     * @async
     */
    static async _checkData() {
        if (!DKTools.IO.isLocalMode()) {
            return;
        }

        const dataPath = this._dataPath;
        const directory = new DKTools.IO.Directory(dataPath);
        const isTest = DKTools.Utils.isTest();

        if (!directory.exists()) {
            await directory.createAsync();

            if (isTest) {
                console.log('Created a directory for localization: ' + dataPath);
            }
        }

        _.forEach(this.locales, async locale => {
            const basePath = dataPath + locale;
            const path = basePath + '.json';
            const file = new DKTools.IO.File(path);
            const directory = new DKTools.IO.Directory(basePath);

            if (!file.exists() && !directory.exists()) {
                await file.saveJsonAsync({});

                if (isTest) {
                    console.log('Created a file for localization: ' + file.getFullPath());
                }
            }
        });
    }

    // check methods

    /**
     * Returns true if locale is valid
     *
     * @static
     * @param {String} locale - Locale
     * @returns {Boolean} Locale is valid
     */
    static checkLocale(locale) {
        return DKTools.Utils.Array.contains(this.locales, locale);
    }

    /**
     * Checks the cache
     *
     * @static
     * @param {Number} variableId - Variable ID
     */
    static checkCache(variableId) {
        if (!this._cacheVariables[variableId]) {
            return;
        }

        this._cache = _.filter(this._cache, cache => !DKTools.Utils.Array.contains(cache.variables, variableId));
    }

    // is methods

    /**
     * Returns true if the manager is ready
     *
     * @since 4.0
     * @static
     *
     * @returns {Boolean} Manager is ready
     */
    static isReady() {
        return this._isReady;
    }

    /**
     * Returns true if the locale file exists
     *
     * @since 4.4.0
     * @static
     * @returns {Boolean} Locale file exists
     */
    static isLocaleFileExists() {
        if (DKTools.IO.isLocalMode()) {
            return this._file.exists();
        }

        return DKTools.WebStorage.exists(this._webStoragePath);
    }

    // load methods

    /**
     * Loads the data
     *
     * @version 4.2
     * @since 4.0
     * @private
     * @static
     * @async
     *
     * @param {String} locale - Locale
     *
     * @returns {Object} Data
     */
    static async _loadData(locale) {
        const directoryPath = this._dataPath + locale;
        const directory = new DKTools.IO.Directory(directoryPath);
        const data = {};

        const processFile = async (file) => {
            const result = await file.loadJsonAsync();

            if (result.status === DKTools.IO.OK) {
                if (Array.isArray(result.data)) {
                    data[file.getName()] = result.data;

                    return;
                }

                _.forEach(result.data, (value, key) => {
                    if (data[key] === undefined) {
                        data[key] = value;
                    }
                });
            } else {
                const fullPath = file.getFullPath();

                if (result.status === DKTools.IO.ERROR_PARSING_DATA) {
                    let error = new Error(`Cannot parse JSON data from file: ${fullPath}.`);

                    if (result.error && result.error.message) {
                        error += ' Description: ' + result.error.message;
                    }

                    DKTools.Utils.throwError(error);
                } else {
                    const error = new Error(`Cannot load localization data from file: ${fullPath}`);

                    DKTools.Utils.throwError(error);
                }
            }

            return Promise.resolve();
        };

        if (directory.exists()) {
            const files = await directory.getJsonFilesAsync().then(result => result.data);

            if (files.length > 0) {
                await Promise.all(files.map(processFile));
            } else {
                DKTools.Utils.throwError(new Error(`Localization directory is empty: ${directoryPath}`));
            }
        } else {
            const filePath = directoryPath + '.json';
            const file = new DKTools.IO.File(filePath);

            if (file.exists()) {
                await processFile(file);
            } else {
                DKTools.Utils.throwError(new Error(`Localization file does not exist: ${filePath}`));
            }
        }

        return data;
    }

    /**
     * Loads the locale
     *
     * @version 4.2
     * @static
     * @async
     */
    static async loadLocale() {
        let locale;

        if (DKTools.IO.isLocalMode()) {
            locale = await this._file.loadAsync().then(result => result.data);
        } else {
            locale = DKTools.IO.WebStorage.load(this._webStoragePath).data;
        }

        if (this.checkLocale(locale)) {
            this._locale = locale;
        } else if (!LocalizationParam.get('First Launch')) {
            await this.removeLocale();
        }
    }

    /**
     * Loads the data
     *
     * @version 4.0
     * @static
     * @async
     */
    static async loadData() {
        this._data = await this._loadData(this._locale);
    }

    /**
     * Loads the font
     *
     * @version 4.2
     * @static
     * @async
     */
    static async loadFont() {
        return new Promise((resolve) => {
            const font = LocalizationParam.get('Fonts', { Locale: this.locale }, { key: 'Font' }) ||
                LocalizationParam.get('Standard Font');

            Graphics.loadFont('GameFont', 'fonts/' + font);

            if (Graphics.isFontLoaded('GameFont')) {
                resolve();
            } else {
                const interval = setInterval(() => {
                    if (Graphics.isFontLoaded('GameFont')) {
                        clearInterval(interval);

                        resolve();
                    }
                }, 50);
            }
        });
    }

    // other methods

    /**
     * Saves the locale
     *
     * @version 4.0
     * @static
     * @async
     */
    static async saveLocale() {
        if (DKTools.IO.isLocalMode()) {
            await this._file.saveAsync(this._locale, { createDirectory: true });
        } else {
            DKTools.IO.WebStorage.save(this._webStoragePath, this._locale);
        }
    }

    /**
     * Removes the locale
     *
     * @static
     * @async
     */
    static async removeLocale() {
        if (DKTools.IO.isLocalMode()) {
            await this._file.removeAsync();
        } else {
            DKTools.IO.WebStorage.remove(this._webStoragePath);
        }
    }

    /**
     * Selects the previous locale from the list
     *
     * @static
     * @async
     */
    static async selectPrevLocale() {
        await this._setLocale(this.getPrevLocale());
    }

    /**
     * Selects the next locale from the list
     *
     * @static
     * @async
     */
    static async selectNextLocale() {
        await this._setLocale(this.getNextLocale());
    }

    /**
     * Sets the game locale
     *
     * @private
     * @static
     * @async
     *
     * @param {String} locale - Locale
     *
     * @see DKTools.Localization.checkLocale
     */
    static async _setLocale(locale) {
        if (this.checkLocale(locale)) {
            const previousLocale = this._locale;

            this._locale = locale;

            if (this._locale !== previousLocale || !this.isLocaleFileExists()) {
                await this.saveLocale();
            }

            if (this._locale !== previousLocale) {
                await this._onLocaleChange(previousLocale);
            }
        } else {
            throw new Error('You are trying to establish a non-existent locale: ' + locale);
        }
    }

    /**
     * Handles the change of the game locale
     *
     * @private
     * @static
     * @async
     *
     * @param {String} previousLocale - Previous locale
     *
     * @see DKTools.Localization.addChangeLocaleListener
     */
    static async _onLocaleChange(previousLocale) {
        await this.clearCache();
        await this.loadData();
        await this.loadFont();
        await this.updateLoadingImage();
        await this.updateGameTitle();

        this._listeners.forEach((listener) => {
            listener(previousLocale, this._locale);
        });
    }

    /**
     * Adds a listener of change of the game locale
     *
     * @static
     * @param {Function} listener - Listener
     */
    static addChangeLocaleListener(listener) {
        if (DKTools.Utils.isFunction(listener)) {
            this._listeners.push(listener);
        }
    }

    // update methods

    /**
     * Updates the game title
     *
     * @since 4.5.0
     * @static
     */
    static updateGameTitle() {
        document.title = this.getText($dataSystem.gameTitle);
    }

    /**
     * Updates the image of loading
     *
     * @version 4.3
     * @static
     */
    static updateLoadingImage() {
        if (!DKTools.IO.isLocalMode() && DKTools.IO.mode === DKTools.IO.MODE_NWJS) {
            return;
        }

        const filename = 'Loading.png';
        const basePath = DKTools.IO.normalizePath('img/system/' + this._locale);
        const fullPath = DKTools.IO.normalizePath(basePath + '/' + filename);

        if (DKTools.IO.pathExists(fullPath)) {
            Graphics.setLoadingImage(fullPath);
        } else if (Decrypter.hasEncryptedImages || !$gameSystem) {
            if (DKTools.IO.pathExists(basePath + '/' + Decrypter.extToEncryptExt(filename))) {
                Graphics.setLoadingImage(fullPath);
            }
        }
    }

};

// properties

Object.defineProperties(DKTools.Localization, {

    /**
     * @private
     * @type {Function[]}
     * @memberof DKTools.Localization
     */
    _listeners: { value: [] },

    /**
     * @private
     * @readonly
     * @type {RegExp}
     * @memberof DKTools.Localization
     */
    regexVar: { value: /\\VAR\[(\d+)\]/g },

    /**
     * @private
     * @readonly
     * @type {RegExp}
     * @memberof DKTools.Localization
     */
    regexOld: { value: /\[t\](.*?)\[\/t\]/g },

    /**
     * @private
     * @readonly
     * @type {RegExp}
     * @memberof DKTools.Localization
     */
    regexNew: { value: /\{(.*?)\}/g },

    /**
     * Locale of the game
     *
     * @type {String}
     * @memberof DKTools.Localization
     */
    locale: {
        get: function() {
            return this._locale;
        },
        set: function(value) {
            this._setLocale(value);
        },
        configurable: true
    },

    /**
     * Language of the game
     *
     * @readonly
     * @type {String}
     * @memberof DKTools.Localization
     */
    language: {
        get: function() {
            return this._languages[this._locale];
        },
        configurable: true
    },

    /**
     * Languages of the game
     *
     * @readonly
     * @type {String[]}
     * @memberof DKTools.Localization
     */
    languages: {
        get: function() {
            return Object.values(this._languages);
        },
        configurable: true
    },

    /**
     * Locales of the game
     *
     * @readonly
     * @type {String[]}
     * @memberof DKTools.Localization
     */
    locales: {
        get: function() {
            return Object.keys(this._languages);
        },
        configurable: true
    }

});

//===========================================================================
// DKTools.StartupManager
//===========================================================================

const Localization_DKTools_StartupManager_initializeModules = DKTools.StartupManager.initializeModules;
DKTools.StartupManager.initializeModules = async function() {
    await Localization_DKTools_StartupManager_initializeModules.call(this);
    await DKTools.Localization.initialize();
};

//===========================================================================
// DKTools.Sprite
//===========================================================================

const Localization_DKTools_Sprite_textWrap = DKTools.Sprite.prototype.textWrap;
DKTools.Sprite.prototype.textWrap = function(text, options = {}) {
    text = DKTools.Localization.getText(text);

    return Localization_DKTools_Sprite_textWrap.call(this, text, options);
};

const Localization_DKTools_Sprite_getTextWidth = DKTools.Sprite.prototype.getTextWidth;
DKTools.Sprite.prototype.getTextWidth = function(text) {
    text = DKTools.Localization.getText(text);

    return Localization_DKTools_Sprite_getTextWidth.call(this, text);
};

const Localization_DKTools_Sprite_getTextWidthEx = DKTools.Sprite.prototype.getTextWidthEx;
DKTools.Sprite.prototype.getTextWidthEx = function(text, options = {}) {
    text = DKTools.Localization.getText(text);

    return Localization_DKTools_Sprite_getTextWidthEx.call(this, text, options);
};

const Localization_DKTools_Sprite_drawTextEx = DKTools.Sprite.prototype.drawTextEx;
DKTools.Sprite.prototype.drawTextEx = function(text, options) {
    text = DKTools.Localization.getText(text);

    return Localization_DKTools_Sprite_drawTextEx.call(this, text, options);
};

DKTools.Sprite.prototype.processDrawLanguage = function(textState) {
    const { x, y, height } = textState;
    const language = DKTools.Localization.language;
    const width = this.getTextWidth(language);

    this.drawText(language, { x, y, width, height });

    textState.x += width;
};

//===========================================================================
// DKTools.Window
//===========================================================================

const Localization_DKTools_Window_textWrap = DKTools.Window.prototype.textWrap;
DKTools.Window.prototype.textWrap = function(text, options = {}) {
    text = DKTools.Localization.getText(text);

    return Localization_DKTools_Window_textWrap.call(this, text, options);
};

const Localization_DKTools_Window_getTextWidth = DKTools.Window.prototype.getTextWidth;
DKTools.Window.prototype.getTextWidth = function(text) {
    text = DKTools.Localization.getText(text);

    return Localization_DKTools_Window_getTextWidth.call(this, text);
};

const Localization_DKTools_Window_getTextWidthEx = DKTools.Window.prototype.getTextWidthEx;
DKTools.Window.prototype.getTextWidthEx = function(text, options = {}) {
    text = DKTools.Localization.getText(text);

    return Localization_DKTools_Window_getTextWidthEx.call(this, text, options);
};

const Localization_DKTools_Window_drawTextEx = DKTools.Window.prototype.drawTextEx;
DKTools.Window.prototype.drawTextEx = function(text, options) {
    text = DKTools.Localization.getText(text);

    return Localization_DKTools_Window_drawTextEx.call(this, text, options);
};

DKTools.Window.prototype.processDrawLanguage = function(textState) {
    const { x, y, height } = textState;
    const language = DKTools.Localization.language;
    const width = this.getTextWidth(language);

    this.drawText(language, { x, y, width, height });

    textState.x += width;
};

//===========================================================================
// Bitmap
//===========================================================================

const Localization_Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    text = DKTools.Localization.getText(text);

    Localization_Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
};

//===========================================================================
// Graphics
//===========================================================================

const Localization_Graphics_getErrorMessageForErrorPrint = Graphics._getErrorMessageForErrorPrint;
Graphics._getErrorMessageForErrorPrint = function() {
    return DKTools.Localization.getText(Localization_Graphics_getErrorMessageForErrorPrint.call(this));
};

const Localization_Graphics_getRestartMessageForErrorPrint = Graphics._getRestartMessageForErrorPrint;
Graphics._getRestartMessageForErrorPrint = function() {
    return DKTools.Localization.getText(Localization_Graphics_getRestartMessageForErrorPrint.call(this));
};

const Localization_Graphics_playVideo = Graphics.playVideo;
Graphics.playVideo = function(src) {
    if (DKTools.IO.isLocalMode()) {
        const data = src.split('/');
        const newSrc = DKTools.IO.normalizePath(data[0] + '/' + DKTools.Localization.locale + '/' + data[1]);

        if (DKTools.IO.pathExists(newSrc)) {
            src = newSrc;
        }
    }

    Localization_Graphics_playVideo.call(this, src);
};

//===========================================================================
// ImageManager
//===========================================================================

ImageManager._getNewFolderByLocale = function(folder, filename) {
    if (!folder || !filename || !DKTools.IO.isLocalMode() && DKTools.IO.mode === DKTools.IO.MODE_NWJS) {
        return folder;
    }

    const newFolder = DKTools.IO.normalizePath(folder + '/' + DKTools.Localization.locale + '/');
    const newFileName = encodeURIComponent(filename) + '.png';
    let newPath = DKTools.IO.normalizePath(newFolder + '/' + newFileName);

    if (DKTools.IO.pathExists(newPath)) {
        return newFolder;
    }

    if (Decrypter.hasEncryptedImages || !$dataSystem) {
        newPath = DKTools.IO.normalizePath(newFolder + '/' + Decrypter.extToEncryptExt(newFileName));

        if (DKTools.IO.pathExists(newPath)) {
            return newFolder;
        }
    }

    return folder;
};

const Localization_ImageManager_loadBitmap = ImageManager.loadBitmap;
ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
    folder = this._getNewFolderByLocale(folder, filename);

    return Localization_ImageManager_loadBitmap.call(this, folder, filename, hue, smooth);
};

const Localization_ImageManager_reserveBitmap = ImageManager.reserveBitmap;
ImageManager.reserveBitmap = function(folder, filename, hue, smooth, reservationId) {
    folder = this._getNewFolderByLocale(folder, filename);

    return Localization_ImageManager_reserveBitmap.call(this, folder, filename, hue, smooth, reservationId);
};

const Localization_ImageManager_requestBitmap = ImageManager.requestBitmap;
ImageManager.requestBitmap = function(folder, filename, hue, smooth) {
    folder = this._getNewFolderByLocale(folder, filename);

    return Localization_ImageManager_requestBitmap.call(this, folder, filename, hue, smooth);
};

//===========================================================================
// AudioManager
//===========================================================================

AudioManager._getNewFolderByLocale = function(folder, name) {
    if (!folder || !name || !DKTools.IO.isLocalMode() && DKTools.IO.mode === DKTools.IO.MODE_NWJS) {
        return folder;
    }

    const basePath = Utils.RPGMAKER_VERSION > '1.6.0' ? this._path : this._basePath;
    const newFolder = DKTools.IO.normalizePath(folder + '/' + DKTools.Localization.locale + '/');
    const newFileName = encodeURIComponent(name) + this.audioFileExt();
    let newPath = DKTools.IO.normalizePath(basePath + '/' + newFolder + '/' + newFileName);

    if (DKTools.IO.pathExists(newPath)) {
        return newFolder;
    }

    if (Decrypter.hasEncryptedAudio || !$dataSystem) {
        newPath = DKTools.IO.normalizePath(basePath + '/' + newFolder + '/' + Decrypter.extToEncryptExt(newFileName));

        if (DKTools.IO.pathExists(newPath)) {
            return newFolder;
        }
    }

    return folder;
};

const Localization_AudioManager_createBuffer = AudioManager.createBuffer;
AudioManager.createBuffer = function(folder, name) {
    folder = this._getNewFolderByLocale(folder, name);

    return Localization_AudioManager_createBuffer.call(this, folder, name);
};

//===========================================================================
// TextManager
//===========================================================================

const Localization_TextManager_basic = TextManager.basic;
TextManager.basic = function(basicId) {
    const text = Localization_TextManager_basic.call(this, basicId);

    return DKTools.Localization.getText(text);
};

const Localization_TextManager_param = TextManager.param;
TextManager.param = function(paramId) {
    const text = Localization_TextManager_param.call(this, paramId);

    return DKTools.Localization.getText(text);
};

const Localization_TextManager_command = TextManager.command;
TextManager.command = function(commandId) {
    const text = Localization_TextManager_command.call(this, commandId);

    return DKTools.Localization.getText(text);
};

const Localization_TextManager_message = TextManager.message;
TextManager.message = function(messageId) {
    const text = Localization_TextManager_message.call(this, messageId);

    return DKTools.Localization.getText(text);
};

Object.defineProperty(TextManager, 'currencyUnit', {
    get: function() {
        return DKTools.Localization.getText($dataSystem.currencyUnit);
    },
    configurable: true
});

//===========================================================================
// Game_Message
//===========================================================================

const Localization_Game_Message_add = Game_Message.prototype.add;
Game_Message.prototype.add = function(text) {
    text = DKTools.Localization.getText(text);

    Localization_Game_Message_add.call(this, text);
};

const Localization_Game_Message_setChoices = Game_Message.prototype.setChoices;
Game_Message.prototype.setChoices = function(choices, defaultType, cancelType) {
    choices = choices.map(choice => DKTools.Localization.getText(choice));

    Localization_Game_Message_setChoices.call(this, choices, defaultType, cancelType);
};

//===========================================================================
// Game_Variables
//===========================================================================

const Localization_Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(id, value) {
    const lastValue = this.value(id);

    Localization_Game_Variables_setValue.call(this, id, value);

    if (lastValue !== this.value(id)) {
        DKTools.Localization.checkCache(id);
    }
};

//===========================================================================
// Game_Map
//===========================================================================

const Localization_Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Localization_Game_Map_setup.call(this, mapId);
    DKTools.Localization.clearCache();
};

//===========================================================================
// Window_Base
//===========================================================================

const Localization_Window_Base_textWidth = Window_Base.prototype.textWidth;
Window_Base.prototype.textWidth = function(text) {
    text = DKTools.Localization.getText(text);

    return Localization_Window_Base_textWidth.call(this, text);
};

const Localization_Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
Window_Base.prototype.drawTextEx = function(text, x, y) {
    text = DKTools.Localization.getText(text);

    return Localization_Window_Base_drawTextEx.call(this, text, x, y);
};

const Localization_Window_Base_actorName = Window_Base.prototype.actorName;
Window_Base.prototype.actorName = function(n) {
    const actorName = Localization_Window_Base_actorName.call(this, n);

    return DKTools.Localization.getText(actorName);
};

const Localization_Window_Base_partyMemberName = Window_Base.prototype.partyMemberName;
Window_Base.prototype.partyMemberName = function(n) {
    const partyMemberName = Localization_Window_Base_partyMemberName.call(this, n);

    return DKTools.Localization.getText(partyMemberName);
};

const Localization_Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    if (code === 'LANGUAGE') {
        this.processDrawLanguage(textState);
    } else {
        Localization_Window_Base_processEscapeCharacter.call(this, code, textState);
    }
};

Window_Base.prototype.processDrawLanguage = function(textState) {
    const language = DKTools.Localization.language;
    const width = this.textWidth(language);

    this.contents.drawText(language, textState.x, textState.y, width * 2, textState.height);

    textState.x += width;
};

//=============================================================================
// Window_TitleCommand
//=============================================================================

const Localization_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Localization_Window_TitleCommand_makeCommandList.call(this);

    if (LocalizationParam.get('Show Command')) {
        this.addLocaleCommand();
    }
};

Window_TitleCommand.prototype.addLocaleCommand = function() {
    this.addCommand(LocalizationParam.get('Command Name'), 'locale');
};

//===========================================================================
// Window_Message
//===========================================================================

const Localization_Window_Message_convertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
Window_Message.prototype.convertEscapeCharacters = function(text) {
    return DKTools.Localization.getText(
        Localization_Window_Message_convertEscapeCharacters.call(this, DKTools.Localization.getText(text)));
};

//===========================================================================
// Window_Options
//===========================================================================

const Localization_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    Localization_Window_Options_makeCommandList.call(this);

    if (LocalizationParam.get('Show Options Command')) {
        this.addLocaleCommand();
    }
};

Window_Options.prototype.addLocaleCommand = function() {
    this.addCommand(LocalizationParam.get('Options Command Name'), 'locale');
};

const Localization_Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);

    if (symbol === 'locale') {
        return DKTools.Localization.language;
    }

    return Localization_Window_Options_statusText.call(this, index);
};

const Localization_Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
Window_Options.prototype.getConfigValue = function(symbol) {
    if (symbol === 'locale') {
        return DKTools.Localization.locale;
    }

    return Localization_Window_Options_getConfigValue.call(this, symbol);
};

const Localization_Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
Window_Options.prototype.setConfigValue = function(symbol, volume) {
    if (symbol === 'locale') {
        DKTools.Localization.selectNextLocale().then(() => this.refresh());
    } else {
        Localization_Window_Options_setConfigValue.call(this, symbol, volume);
    }
};

//===========================================================================
// Scene_Boot
//===========================================================================

const Localization_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    Localization_Scene_Boot_start.call(this);

    if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
        if (LocalizationParam.get('First Launch') && !DKTools.Localization.isLocaleFileExists()) {
            const nextScene = SceneManager._nextScene.constructor;

            SceneManager.goto(Scene_SelectLanguage);
            SceneManager.prepareNextScene(nextScene);
        }
    }
};

Scene_Boot.prototype.updateDocumentTitle = function() {
    DKTools.Localization.updateGameTitle();
};

//=============================================================================
// Scene_Title
//=============================================================================

const Localization_Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    Localization_Scene_Title_create.call(this);

    if (LocalizationParam.get('Show Button')) {
        this.createLocalizationButton();
    }
};

const Localization_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    Localization_Scene_Title_createCommandWindow.call(this);

    if (LocalizationParam.get('Show Command')) {
        this._commandWindow.setHandler('locale', this.onCommandLocale);
    }
};

Scene_Title.prototype.createLocalizationButton = function() {
    const x = LocalizationParam.get('Button X');
    const y = LocalizationParam.get('Button Y');
    const filename = LocalizationParam.get('Button Graphic').format(DKTools.Localization.locale);

    this._localizationButton = new DKTools.Sprite.Button(x, y);
    this._localizationButton.loadSystem(filename);
    this._localizationButton.setupAnchor(0.5, 0.5);
    this._localizationButton.start(true);

    this._localizationButton.addEvent({
        type: 'state-pressed',
        onUpdate: function() {
            this.setOpacity(200);
            this.setScale(0.95, 0.95);
        }.bind(this._localizationButton)
    });

    this._localizationButton.addEvent({
        type: 'state-normal',
        onUpdate: function() {
            this.setOpacity(255);
            this.setScale(1, 1);
        }.bind(this._localizationButton)
    });

    this._localizationButton.addEvent({
        type: 'mouse-click-left',
        onUpdate: this.onCommandLocale.bind(this)
    });

    this._localizationButton.addOneTimeEvent({
        type: 'ready',
        onSuccess: function() {
            this.move(x + this.width / 2, y + this.height / 2);
        }.bind(this._localizationButton)
    });

    this.addChild(this._localizationButton);
};

Scene_Title.prototype.onCommandLocale = function() {
    SceneManager.push(Scene_SelectLanguage);
};

//===========================================================================
// Scene_SelectLanguage
//===========================================================================

function Scene_SelectLanguage() {
    this.initialize.apply(this, arguments);
}

Scene_SelectLanguage.prototype = Object.create(DKTools.Scene.prototype);
Scene_SelectLanguage.prototype.constructor = Scene_SelectLanguage;

// prepare

Scene_SelectLanguage.prototype.prepare = function(nextScene) {
    this._nextScene = nextScene;
};

// preloading methods

Scene_SelectLanguage.prototype.setupPreloading = function() {
    const flagName = LocalizationParam.get('Flag Filename');
    const promises = DKTools.Localization.locales.map((locale) => {
        return DKTools.Utils.Bitmap.reserveAsync({
            folder: 'img/system/',
            filename: flagName.format(locale)
        });
    });

    this._preloader.addMany(promises);
};

// create methods

Scene_SelectLanguage.prototype.createBackground = function() {
    const background = LocalizationParam.get('Background Filename');

    if (!background) {
        return;
    }

    this._background = new DKTools.Sprite();

    this._background.setupGraphicName(background);

    this._background.start();

    this.addChild(this._background);
};

Scene_SelectLanguage.prototype.createAllWindows = function() {
    this.createLanguageWindow();
};

Scene_SelectLanguage.prototype.createHelpSprite = function () {
    const fontSize = LocalizationParam.get('Font Size');
    const contentsSprite = this._languageWindow.contentsSprite;
    const { x, y } = contentsSprite;

    this._helpSprite = new DKTools.Sprite(x, y, this._languageWindow.getContentsWidth(), '1');

    this._helpSprite.setupFont({ fontSize });

    this._helpSprite.start();

    this._helpSprite.addEvent({
        type: 'draw-all',
        onUpdate: function() {
            const locale = contentsSprite.getCurrentItemExt();
            const data = LocalizationParam.get('Help Text', { Locale: locale });

            if (!data) {
                throw new Error(`Could not find help text for the locale: ${locale}`);
            }

            this.drawText(data.Text);
        }.bind(this._helpSprite)
    });

    this._languageWindow.addChild(this._helpSprite);
};

Scene_SelectLanguage.prototype.createLanguageWindow = function() {
    const flagName = LocalizationParam.get('Flag Filename');
    const flagSize = LocalizationParam.get('Flag Size');
    const fontSize = LocalizationParam.get('Font Size');

    this._languageWindow = new DKTools.Window.Selectable();

    const lineHeight = this._languageWindow.getLineHeight();
    const width = LocalizationParam.get('Window Width');
    const height = lineHeight * 2 + LocalizationParam.get('Window Rows') * flagSize;
    const x = (Graphics.boxWidth - width) / 2;
    const y = (Graphics.boxHeight - height) / 2;

    this._languageWindow.setupSize(width, height);
    this._languageWindow.move(x, y);

    this.createHelpSprite();

    const standardPosition = this._languageWindow.standardContentsPosition()();
    const contentsPosition = DKTools.Utils.Point.clone(standardPosition);
    const contentsHeight = this._languageWindow.getContentsHeight();
    const contentsSprite = this._languageWindow.contentsSprite;

    contentsPosition.y += this._languageWindow.getLineHeight();

    this._languageWindow.setupContentsPosition(contentsPosition);
    this._languageWindow.setupContentsHeight(contentsHeight - lineHeight);

    const items = DKTools.Localization.locales.map(locale => ({
        name: DKTools.Localization.getLanguageByLocale(locale),
        symbol: 'ok',
        handler: this.onLanguageOk.bind(this),
        ext: locale
    }));

    contentsSprite.setupItems(items);

    const handler = function(index) {
        const language = this.getItemName(index);
        const locale = this.getItemExt(index);
        const rect = this.getItemRectForText(index);
        const flag = ImageManager.loadSystem(flagName.format(locale));

        flag.addLoadListener(function() {
            this.drawBitmap(flag, {
                destination: {
                    x: rect.x,
                    y: rect.y + (rect.height - flag.height) / 2
                }
            });

            this.drawText(language, {
                x: rect.x + flag.width + 4,
                y: rect.y,
                height: rect.height,
                align: 'left'
            });
        }.bind(contentsSprite));
    }.bind(contentsSprite);

    contentsSprite.setupItemDrawHandler(handler);
    contentsSprite.setupItemHeight(flagSize);

    contentsSprite.setupFont({ fontSize });

    contentsSprite.setHandler('cancel', this.onLanguageCancel.bind(this));

    contentsSprite.addEvent({
        type: 'select',
        onUpdate: function() {
            this._helpSprite.refreshAll();
        }.bind(this)
    });

    this._languageWindow.start(true);

    this.addWindow(this._languageWindow);
};

Scene_SelectLanguage.prototype.createForeground = function() {
    const foreground = LocalizationParam.get('Foreground Filename');

    if (!foreground) {
        return;
    }

    this._foreground = new DKTools.Sprite();

    this._foreground.setupGraphicName(foreground);

    this._foreground.start();

    this.addChild(this._foreground);
};

// handler methods

Scene_SelectLanguage.prototype.onLanguageOk = function() {
    DKTools.Localization.locale = this._languageWindow.contentsSprite.getCurrentItemExt();

    this.fadeOutAll();
    this.popScene();
};

Scene_SelectLanguage.prototype.onLanguageCancel = function() {
    this.popScene();
};

Scene_SelectLanguage.prototype.popScene = function() {
    if (this._nextScene) {
        SceneManager.goto(this._nextScene);
    } else {
        DKTools.Scene.prototype.popScene.call(this);
    }
};

//===========================================================================
// Compatibility with other plugins
//===========================================================================

if (Imported.YEP_QuestJournal) {

    const Localization_Window_QuestData_drawQuestTextEx = Window_QuestData.prototype.drawQuestTextEx;
    Window_QuestData.prototype.drawQuestTextEx = function(text, x, y) {
        text = DKTools.Localization.getText(text);

        return Localization_Window_QuestData_drawQuestTextEx.call(this, text, x, y);
    };

}
