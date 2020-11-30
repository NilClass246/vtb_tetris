//=============================================================================
// 对话框文字居中居右对齐插件
// aligncenter.js
// Copyright (c) 2018 村人Ａ
//=============================================================================

/*:
 * @plugindesc 对话框文字居中居右对齐插件
 * @author 村人A | 汉化：硕明云书
 *
 * @help
 *=============================================================================
 * 发起进攻(　 ´-ω ･)▄︻┻┳══━一全军出击！
 * =============================================================================
 * 解密套组B类
 * =============================================================================
 * 在信息内指定行的开头用“\#”居中对齐，[\_]右对齐。 
 * 想要对齐扩大/缩小字符时，要在“\#”或“\_”之前，将指定特殊字符“\{”或“\}”
 * =============================================================================
 * (҂‾ ▵‾)σ(˚▽˚’!)/随叫随到 ╰( ´・ω・)つ──☆✿✿✿
 * =============================================================================
 *
 */

(function() {
	var _Window_Base_initialize = Window_Base.prototype.initialize;
	Window_Base.prototype.initialize = function(x, y, width, height) {
		_Window_Base_initialize.call(this, x, y, width, height);
		this.villaA_paddingleft = 0;
		this.villaA_procLine = 0;
	}
	
	Window_Base.prototype.obtainEscapeCode = function(textState) {
		textState.index++;
		var regExp = /^[\$\.\|\^!><\{\}\\\#\_]|^[A-Z]+/i;
		var arr = regExp.exec(textState.text.slice(textState.index));
		if (arr) {
			textState.index += arr[0].length;
			return arr[0].toUpperCase();
		} else {
			return '';
		}
	};

	Window_Message.prototype.processEscapeCharacter = function(code, textState) {
		switch (code) {
		case '$':
			this._goldWindow.open();
			break;
		case '.':
			this.startWait(15);
			break;
		case '|':
			this.startWait(60);
			break;
		case '!':
			this.startPause();
			break;
		case '>':
			this._lineShowFast = true;
			break;
		case '<':
			this._lineShowFast = false;
			break;
		case '^':
			this._pauseSkip = true;
			break;
		case '\#':
			var linelenght = textState.text.split(/\r\n|\r|\n/)
			this.villaA_paddingleft = (this.width - this.textWidth(linelenght[this.villaA_procLine]) - this.newLineX())/2;
			break;
		case '\_':
			var linelenght = textState.text.split(/\r\n|\r|\n/)
			this.villaA_paddingleft = this.width - this.textWidth(linelenght[this.villaA_procLine]) - 20 - this.newLineX();
			break;
		default:
			Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
			break;
		}
	};

	Window_Base.prototype.processCharacter = function(textState) {
		switch (textState.text[textState.index]) {
		case '\n':
			this.processNewLine(textState);
			this.villaA_procLine++;
			break;
		case '\f':
			this.processNewPage(textState);
			break;
		case '\x1b':
			this.processEscapeCharacter(this.obtainEscapeCode(textState), textState);
			break;
		default:
			this.processNormalCharacter(textState);
			break;
		}
	};


	Window_Base.prototype.processNormalCharacter = function(textState) {
		var c = textState.text[textState.index++];
		var w = this.textWidth(c);
		this.contents.drawText(c, textState.x+this.villaA_paddingleft, textState.y, w * 2, textState.height);
		textState.x += w;
	};

	var _Window_Base_processNewLine = Window_Base.prototype.processNewLine
	Window_Base.prototype.processNewLine = function(textState) {
		_Window_Base_processNewLine.call(this, textState);
		this.villaA_paddingleft = 0;

	};

	var _Window_Message_startMessage = Window_Message.prototype.startMessage
	Window_Message.prototype.startMessage = function() {
			_Window_Message_startMessage.call(this);
			this.villaA_procLine = 0;
	};
	
	var _Window_Message_clearFlags = Window_Message.prototype.clearFlags
	Window_Message.prototype.clearFlags = function() {
	_Window_Message_clearFlags.call(this);
	this.villaA_paddingleft = 0;
	};
})();