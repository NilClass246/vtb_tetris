//=============================================================================
// Tekoki 插件 - 预加载
// Tekoki_Preloader.js
//=============================================================================

var TetrisManager = TetrisManager || {};

/*:
 * @plugindesc [v0.3] 游戏预加载器
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
 * 防止卡顿出现的图片丢失和音乐迟钝。
 */

//=============================================================================
// 数据
//=============================================================================

TetrisManager.Preloader = {};

TetrisManager.Preloader.data = {
    "Prologue": {
        Images: [
            "pictures/PrologueTitle"
        ],
        Frames: [
            { name: "地图按键\\未标题-3", FinalNumber: 21, framedigits: 2, initialNumber: 0 },
            { name: "战斗界面\\image", FinalNumber: 19, framedigits: 2, initialNumber: 0 },
            { name: "技能\\qwe", FinalNumber: 21, framedigits: 2, initialNumber: 0 },
            { name: "道具\\123", FinalNumber: 21, framedigits: 2, initialNumber: 0 }
        ]
    }
}

//=============================================================================
// Tools
//=============================================================================

TetrisManager.encodeURIImageName = (imageName) => {
    let sep = imageName.split('/')
    let imageRealName = sep.pop()
    return `${sep.join('/')}/${encodeURIComponent(imageRealName)}`
}

ImageCache.prototype.release = function (key) {
    if (this._items[key]) {
        delete this._items[key]
    }
}

ImageCache.prototype.addGroup = function (group, key) {
    this._itemGroups = this._itemGroups || {}
    this._itemGroups[group] = this._itemGroups[group] || []
    this._itemGroups[group].push(key)
}

ImageCache.prototype.releaseGroup = function (group) {
    this._itemGroups = this._itemGroups || {}

    if (!this._itemGroups[group]) {
        return
    }

    for (let key of this._itemGroups[group]) {
        this.release(key)
    }
    delete this._itemGroups[group]
}

ImageManager.releaseBitmap = function (path, hue) {
    const cacheKey = this._generateCacheKey(path, hue)
    this._imageCache.release(cacheKey)
}

ImageManager.releaseGroup = function (group) {
    this._imageCache.releaseGroup(group)
}

TetrisManager.Temps._loadNormalBitmap = ImageManager.loadNormalBitmap
ImageManager.loadNormalBitmap = function (path, hue) {
    const group = path
    const key = this._generateCacheKey(path, hue)
    const bitmap = this._imageCache.get(key)

    if (!bitmap) {
        this._imageCache.addGroup(group, key)
    }

    return TetrisManager.Temps._loadNormalBitmap.call(this, path, hue)
}

//=============================================================================
// Main methods
//=============================================================================
TetrisManager.Preloader.loadChapter = function (chapterName) {
    this.data[chapterName].Images.forEach(function (imgName) {
        let path = `img/${TetrisManager.encodeURIImageName(imgName)}.png`;
        ImageManager.reserveNormalBitmap(`${path}`, 0, ImageManager._defaultReservationId);
    });
    this.data[chapterName].Frames.forEach(function (anim) {
        for (i = anim.initialNumber; i <= anim.FinalNumber; i++) {
            var curdigits = i.toString().split("");
            var suffix = ''
            if (anim.framedigits - curdigits.length > 0) {
                for (j = 0; j < (anim.framedigits - curdigits.length); j++) {
                    suffix += "0";
                }
            }
            suffix += i;
            var image = "pictures\\sequenceAnimation\\" + anim.name + suffix

            let path = `img/${TetrisManager.encodeURIImageName(image)}.png`;
            ImageManager.reserveNormalBitmap(`${path}`, 0, ImageManager._defaultReservationId);
        }
    });
}

TetrisManager.Preloader.releaseChapter = function (chapterName) {
    const assets = this.data[chapterName];

    if (!assets) {
        return;
    }

    for (let image of assets.Images) {
        ImageManager.releaseGroup(`img/${image}.png`);
    }

    for (let anim of assets.Frames) {
        for (i = anim.initialNumber; i <= anim.FinalNumber; i++) {
            var curdigits = i.toString().split("");
            var suffix = ''
            if (anim.framedigits - curdigits.length > 0) {
                for (j = 0; j < (anim.framedigits - curdigits.length); j++) {
                    suffix += "0";
                }
            }
            suffix += i;
            var image = "pictures\\sequenceAnimation\\" + anim.name + suffix
            ImageManager.releaseGroup(`img/${image}.png`);
        }
    }
}

