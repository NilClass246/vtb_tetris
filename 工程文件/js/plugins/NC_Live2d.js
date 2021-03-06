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
//=============================================================================
// 加载模型
//=============================================================================

NC.ModelList ={};
//const model_url = "live2d/haru/haru.model.json";

console.log(window.PIXI.Ticker.shared);
const model_url = "live2d/kureha_666/kureha_666_0101.model3.json";
(async function loadLive2d(){
    NC.ModelList["haru"] = await PIXI.live2d.Live2DModel.from(model_url);
    NC.ModelList["haru"].nupdate =true;
})();



function start_live2d(name) {
    SceneManager._scene._spriteset._baseSprite.addChild(NC.ModelList[name]);
}




function end_live2d(name) {
     SceneManager._scene._spriteset._baseSprite.removeChild(NC.ModelList[name]);
}

