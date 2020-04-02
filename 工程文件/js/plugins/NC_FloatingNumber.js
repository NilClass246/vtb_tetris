//=============================================================================
// NC_FloatingNumber.js
//=============================================================================

/*:
* @plugindesc [v0.3] 浮动数字类
* @author NilClass
*
* @help
* =============================================================================
* +++ NC_FloatingNumber.js (v0.1) +++
* Email: liu2002246@gmail.com
* QQ: 1781715361
* =============================================================================
* 实现俄罗斯战斗界面的插件。
* 目前还在测试阶段。
* 
*/

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** CODE
//=============================================================================

function FNumber() {
	this.initialize.apply(this, arguments);
}

FNumber.prototype = Object.create(Sprite.prototype);
FNumber.prototype.constructor = FNumber;

FNumber.prototype.initialize = function (number, maxdigits) {
	Sprite.prototype.initialize.call(this);
	this.oldNumber = null;
	this.curNumber = number;
	this.maxdigits = maxdigits;
	this.loadimg();
}

FNumber.prototype.loadimg = function () {
	this.number_img = ImageManager.loadPicture('numbers')
}

FNumber.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.curNumber != this.oldNumber) {
		this.create_number();
	}
}

FNumber.prototype.create_number = function () {
	if (this.number_sprites) {
		for (i in this.number_sprites) {
			this.removeChild(this.number_sprites[i])
		}
	}
	numbers = Math.abs(this.curNumber).toString().split("");
	this.number_sprites = [];
	for (i = 0; i < this.maxdigits; i++) {
		if (i > (numbers.length - 1)) { continue }
		this.number_sprites.push(new Sprite());
		this.number_sprites[i].bitmap = this.number_img;
		n = Number(numbers[i]);
		this.number_sprites[i].setFrame(n * (this.number_sprites[i].bitmap.width / 10), 0, (this.number_sprites[i].bitmap.width / 10), this.number_sprites[i].bitmap.height)
		this.number_sprites[i].x = i * (this.number_sprites[i].bitmap.width / 10)
		//this.number_sprites[i].y = this.y;
		this.addChild(this.number_sprites[i])
	}
	this.oldNumber = this.curNumber;
}

FNumber.prototype.change = function (newNumber) {
	this.oldNumber = this.curNumber;
	this.curNumber = newNumber;
}


function PopNumber() {
	this.initialize.apply(this, arguments);
}

PopNumber.prototype = Object.create(Sprite.prototype);
PopNumber.prototype.constructor = PopNumber;

PopNumber.prototype.initialize = function (sprite) {
	Sprite.prototype.initialize.call(this);
	this.curSprite = sprite
	this.EnAblEd = false;
	this.poped = false;
	this.completed = false;
	this.curSprite.opacity = 0;
	this.addChild(this.curSprite);
}

PopNumber.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.EnAblEd) {
		if (!this.poped) {
			this.curSprite.y+=1
			this.curSprite.opacity += 10;
			if (this.curSprite.opacity == 255) {
				this.poped = true;
			}
		} else {
			this.curSprite.opacity -= 10;
			this.curSprite.y += 1
			if (this.curSprite.opacity == 0) {
				this.poped = false;
				this.EnAblEd = false;
				this.curSprite.move(this.x, this.y);
				this.completed = true;
			}
		}
    }
}

PopNumber.prototype.activate = function () {
	this.EnAblEd = true;
}

PopNumber.prototype.isCompleted = function () {
	return this.completed;
}