//=============================================================================
// NilCalss 插件 - Live2d兼容
// NC_Live2d.js
//=============================================================================

var NC = NC || {}
NC.temps = NC.temps || {}

//=============================================================================
/*:
 * @plugindesc [Live2d兼容插件]
 * @author NilClass
 * 
 * @help
 * =============================================================================
 * +++ RM插件 - Live2d实现 +++
 * By NilClass
 * https://github.com/NilClass246
 * =============================================================================
 * 
 */

NC = NC || {};
NC.live2dModels = NC.live2dModels || {}

//=============================================================================
// 定义模型
//=============================================================================

NC.live2dModels.modelHaru = {
    "type": "Live2D Model Setting",
    "name": "haru",
    "model": "live2d/haru/haru_01.moc",
    "textures":
        [
            "live2d/haru/haru_01.1024/texture_00.png",
            "live2d/haru/haru_01.1024/texture_01.png",
            "live2d/haru/haru_01.1024/texture_02.png"
        ],
    "physics": "live2d/haru/haru.physics.json",
    "pose": "live2d/haru/haru.pose.json",
    "expressions":
        [
            { "name": "f01", "file": "live2d/haru/expressions/f01.exp.json" },
            { "name": "f02", "file": "live2d/haru/expressions/f02.exp.json" },
            { "name": "f03", "file": "live2d/haru/expressions/f03.exp.json" },
            { "name": "f04", "file": "live2d/haru/expressions/f04.exp.json" },
            { "name": "f05", "file": "live2d/haru/expressions/f05.exp.json" },
            { "name": "f06", "file": "live2d/haru/expressions/f06.exp.json" },
            { "name": "f07", "file": "live2d/haru/expressions/f07.exp.json" },
            { "name": "f08", "file": "live2d/haru/expressions/f08.exp.json" }
        ],
    "layout":
    {
        "center_x": 0,
        "y": 1.2,
        "width": 2.9
    },
    "hit_areas":
        [
            { "name": "head", "id": "D_REF.HEAD" },
            { "name": "body", "id": "D_REF.BODY" }
        ],
    "motions":
    {
        "idle":
            [
                { "file": "live2d/haru/motions/idle_00.mtn", "fade_in": 2000, "fade_out": 2000 },
                { "file": "live2d/haru/motions/idle_01.mtn", "fade_in": 2000, "fade_out": 2000 },
                { "file": "live2d/haru/motions/idle_02.mtn", "fade_in": 2000, "fade_out": 2000 }
            ],
        "tap_body":
            [
                { "file": "live2d/haru/motions/tapBody_00.mtn", "sound": "live2d/haru/sounds/tapBody_00.mp3" },
                { "file": "live2d/haru/motions/tapBody_01.mtn", "sound": "live2d/haru/sounds/tapBody_01.mp3" },
                { "file": "live2d/haru/motions/tapBody_02.mtn", "sound": "live2d/haru/sounds/tapBody_02.mp3" }
            ],
        "pinch_in":
            [
                { "file": "live2d/haru/motions/pinchIn_00.mtn", "sound": "live2d/haru/sounds/pinchIn_00.mp3" }
            ],
        "pinch_out":
            [
                { "file": "live2d/haru/motions/pinchOut_00.mtn", "sound": "live2d/haru/sounds/pinchOut_00.mp3" }
            ],
        "shake":
            [
                { "file": "live2d/haru/motions/shake_00.mtn", "sound": "live2d/haru/sounds/shake_00.mp3", "fade_in": 500 }
            ],
        "flick_head":
            [
                { "file": "live2d/haru/motions/flickHead_00.mtn", "sound": "live2d/haru/sounds/flickHead_00.mp3" }
            ]
    }
};

//=============================================================================
// 加载模型
//=============================================================================

NC.ModelList = {
    "haru": new PIXI.Live2DSprite(NC.live2dModels.modelHaru, {
        debugLog: false,
        randomMotion: false,
        eyeBlink: false,
    })
}
NC.ModelList["haru"].adjustScale(0, 0, 0.7);
NC.ModelList["haru"].startRandomMotion('idle');
NC.ModelList["haru"].on('mousemove', (evt) => {
    const point = evt.data.global;
    NC.ModelList["haru"].setViewPoint(point.x, point.y);
});

function start_live2d(name) {
    SceneManager._scene._spriteset._baseSprite.addChild(NC.ModelList[name]);
}

function live2d_moveBy(name, X, Y) {
    NC.ModelList[name].adjustTranslate(
        (X / (Graphics.boxWidth / 2)),
        (Y / (Graphics.boxHeight / 2))
    );
}

function end_live2d(name) {
    SceneManager._scene._spriteset._baseSprite.removeChild(NC.ModelList[name]);
}

