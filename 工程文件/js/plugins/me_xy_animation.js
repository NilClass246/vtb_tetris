
//-----------------------------------------------------------------------------
// 坐标显示动画
//
/*:
 * @plugindesc 坐标显示动画.
 * @author 杨志（yang1zhi）
 * @help  帮助
 */
 //在事件中的脚本里，写上$gameParty.XY_animation(1,100,100)
//也可以自己在指定的Scene里面调用createXYanimationWindow来实现
 
 Game_Party.prototype.XY_animation = function(id,x,y) {
    SceneManager._scene.createXYanimationWindow(id,x,y)
};
 
//显示动画
Scene_Base.prototype.createXYanimationWindow = function(id,x,y) {
	//新建动画
    this._XYanimationWindow = new Sprite_XY_animation(this);
    this.addChild(this._XYanimationWindow);
	//设动画坐标
	this._XYanimationWindow.move(x,y);
	//设动画ID
	var animation = $dataAnimations[id];
	//开始动画
	this._XYanimationWindow.startAnimation(animation, false, 0);
};

//本体-----------------------------------------------------------------------

function Sprite_XY_animation() {
    this.initialize.apply(this, arguments);
}

Sprite_XY_animation.prototype = Object.create(Sprite.prototype);
Sprite_XY_animation.prototype.constructor = Sprite_XY_animation;

Sprite_XY_animation.prototype.initialize = function(yuan) {
    Sprite.prototype.initialize.call(this);
	this._yuan = yuan
    this._animationSprites = [];
    this._effectTarget = this;
    this._hiding = false;
};

Sprite_XY_animation.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisibility();
    this.updateAnimationSprites();
};

Sprite_XY_animation.prototype.hide = function() {
    this._hiding = true;
    this.updateVisibility();
};

Sprite_XY_animation.prototype.show = function() {
    this._hiding = false;
    this.updateVisibility();
};

Sprite_XY_animation.prototype.updateVisibility = function() {
    this.visible = !this._hiding;
};

Sprite_XY_animation.prototype.updateAnimationSprites = function() {
	console.log(1)
    if (this._animationSprites.length > 0) {
        var sprites = this._animationSprites.clone();
        this._animationSprites = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            if (sprite.isPlaying()) {
                this._animationSprites.push(sprite);
            } else {
                sprite.remove();
				this._yuan.removeChild(this); 
            }
        }
    }
};

Sprite_XY_animation.prototype.startAnimation = function(animation, mirror, delay) {
    var sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
};

Sprite_XY_animation.prototype.isAnimationPlaying = function() {
    return this._animationSprites.length > 0;
};
