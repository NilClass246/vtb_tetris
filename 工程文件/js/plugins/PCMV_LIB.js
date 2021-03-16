// PCMV_LIB ver 1.2
// 2019/05/08 円形範囲の判定関数を追加（PCMV_LIB.func.containsCircleAreaToEvent）
/*:
@plugindesc ベースライブラリ
@author pcmv
@help PCMV系プラグインより前に読み込んでください

■スクリプト

指定した位置がイベントを基準とした短形範囲に含まれるかを返す

PCMV_LIB.func.containsRectAreaToEvent( target, eventId, rectArea )

　target 対象の座標情報 target.x target.y　を使用する
　eventId	基準とするイベントID
　rectArea 範囲情報の配列
　　[ offsetX, offsetY, rangeX, rangeY ]
　　offsetX	短形範囲の左のオフセット
　　offsetY	短形範囲の上のオフセット
　　rangeX	オフセットから横方向の範囲
　　rangeY	オフセットから縦方向の範囲

　含まれる場合はtrueを返す
　
　例：イベントの下3x2にプレーヤがいるかを返す
　　
　　PCMV_LIB.func.containsRectAreaToEvent($gamePlayer,this.eventId(), [-1,1, 2,1] )

　　　範囲のイメージ　　敵
　　　　　　　　　　　■■■
　　　　　　　　　　　■■■

　　以下のように指定すると範囲は次のようになります
　　
　　PCMV_LIB.func.containsRectAreaToEvent($gamePlayer,this.eventId(), [-1,0, 2,2] )
　　
　　　範囲のイメージ　■敵■
　　　　　　　　　　　■■■
　　　　　　　　　　　■■■
　　
　　※[0,0, 0,0] = 敵の位置１マスの意味になります
　　
イベント名からイベントIDを取得する
isTemplate : trueでテンプレートマップから検索（テンプレートプラグイン未読み込みの場合はエラーになります）
PCMV_LIB.func.getEventIdByName( name, isTemplate )

指定した位置がイベントを基準とした円形範囲に含まれるかを返す

PCMV_LIB.func.containsCircleAreaToEvent( target, eventId, rectArea )

　target 対象の座標情報 target.x target.y　を使用する
　eventId	基準とするイベントID
　rectArea 範囲情報の配列
　　[ offsetX, offsetY, radius ]
　　offsetX	円形範囲の中心のX方向のオフセット
　　offsetY	円形範囲の中心のY方向のオフセット
　　radius	半径

　含まれる場合はtrueを返す

*/
var PCMV_LIB = PCMV_LIB || {};
(function(_global) {
	'use strict';
	
	
	//共通モジュール PCMV_LIB（仮） ver 0.1β -------------------------------
	PCMV_LIB.base = PCMV_LIB.base || {};
	PCMV_LIB.listener = PCMV_LIB.listener || {};
	PCMV_LIB.stage = PCMV_LIB.stage || {};
	PCMV_LIB.func = PCMV_LIB.func || {};

	//=========================
	//関数を定義
	//=========================
	/**
	クラス継承関数
	*/
	PCMV_LIB.extends = function(ctor, superCtor) {
		ctor._super_ = superCtor.prototype;
		ctor.prototype = Object.create(superCtor.prototype, {
			constructor: {
				value: ctor,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
	}
	//=========================
	//クラスを定義
	//=========================
	var p = null;
	/**
	base class
	*/
	PCMV_LIB.base.Base = function() {
		if(!(this instanceof PCMV_LIB.base.Base)) {
			return new PCMV_LIB.base.Base();
		}
		this.org = {};
		this.initialize();
	}
	p = PCMV_LIB.base.Base.prototype;
	p.initialize = function() {
	};
	
	/**
	base ext class
	*/
	PCMV_LIB.base.Ext =  function() {
		if(!(this instanceof PCMV_LIB.base.Ext)) {
			return new PCMV_LIB.base.Ext();
		}
		PCMV_LIB.base.Ext._super_.constructor.call(this);
		this.utils = new PCMV_LIB.Utils();
	}
	PCMV_LIB.extends(PCMV_LIB.base.Ext, PCMV_LIB.base.Base);

	p = PCMV_LIB.base.Ext.prototype;
	p.initialize = function() {
		PCMV_LIB.base.Ext._super_.initialize.call(this, arguments);
	};
	
	/**
	custom base stage class (extends PIXI.Container)
	*/
	PCMV_LIB.base.CustomBaseStage =  function() {
		if(!(this instanceof PCMV_LIB.base.CustomBaseStage)) {
			return new PCMV_LIB.base.CustomBaseStage();
		}
		PCMV_LIB.base.CustomBaseStage._super_.constructor.call(this);
		this.utils = new PCMV_LIB.Utils();
	}
	PCMV_LIB.extends(PCMV_LIB.base.CustomBaseStage, Stage);
	p = PCMV_LIB.base.CustomBaseStage.prototype;
	p.renderScene = function(){
		//MV画面に描画
		this.children.forEach(function(child) {
			if (child.update) {
				child.update();
			}
		});
		Graphics.render(this);
	}
	
	/**
	frame(Scene) listener class
	*/
	PCMV_LIB.listener.FrameListener =  function() {
		if(!(this instanceof PCMV_LIB.listener.FrameListener)) {
			return new PCMV_LIB.listener.FrameListener();
		}
		PCMV_LIB.listener.FrameListener._super_.constructor.call(this);
		
		this.frameCount = 0;
		this.loading_flag = false;
		this.isHook = false;
	}
	PCMV_LIB.extends(PCMV_LIB.listener.FrameListener, PCMV_LIB.base.Ext);
	p = PCMV_LIB.listener.FrameListener.prototype;
	p.startHook = function(){
		if(this.isHook){
			return;
		}
		this.isHook = true;
		var o = this;
		//MVフック
		this.org._SceneManager_initialize = SceneManager.initialize;
		SceneManager.initialize = function() {
			this.frameCount = 0;
			o.org._SceneManager_initialize.call(this);
			o.onSceneManagerInitialize();
		};
		this.org._SceneManager_onSceneLoading = SceneManager.onSceneLoading;
		SceneManager.onSceneLoading = function() {
			o.org._SceneManager_onSceneLoading.call(this);
			o.onRenderLoading();
		};
		
		this.org._SceneManager_updateScene = SceneManager.updateScene;
		SceneManager.updateScene = function() {
			o.org._SceneManager_updateScene.call(this);
			if ( ! SceneManager.isCurrentSceneStarted() && SceneManager._scene && Graphics._loadingCount >= 20) {
				if(o.loading_flag === false){
					o.onStartLoading();
				}
				o.loading_flag = true;
			}else{
				if(o.loading_flag === true){
					o.onEndLoading();
				}
				o.loading_flag = false;
			}
			o.onUpdate(o.frameCount, o.loading_flag);
			if(o.loading_flag){
				o.onLoading(o.frameCount, o.loading_flag);
			}
			o.frameCount = o.frameCount+1;
		};
		this.org._SceneManager_push = SceneManager.push;
		SceneManager.push = function(sceneClass) {
			o.org._SceneManager_push.call(this,sceneClass);
			o.onPush(sceneClass);
		};
		this.org._SceneManager_pop = SceneManager.pop;
		SceneManager.pop = function() {
			o.org._SceneManager_pop.call(this);
			o.onPop();
		};
	}
	p.endHook = function(){
		if( ! this.isHook){
			return;
		}
		SceneManager.initialize = this.org._SceneManager_initialize;
		SceneManager.onSceneLoading = this.org._SceneManager_onSceneLoading;
		SceneManager.updateScene = this.org._SceneManager_updateScene;
		SceneManager.push = this.org._SceneManager_push;
		this.isHook = false;
	}
	/**
	SceneManagerの初期化時に（ゲーム起動時に１回だけ）呼び出される
	*/
	p.onSceneManagerInitialize = function(){
	}
	/**
	フレーム更新時（1秒間に約60回）に呼び出される
	count : ゲーム起動時からのフレーム数
	loading_flag : ローディング画面中の場合true
	*/
	p.onUpdate = function(count, loading_flag){
	}
	/**
	シーン切り替え時に呼び出される
	（マップ画面からメニュー画面を表示した場合など）
	*/
	p.onPush = function(scene){
	}
	/**
	シーン切り替え時に呼び出される
	（メニュー画面からマップ画面に戻る場合など）
	*/
	p.onPop = function(){
	}
	/**
	ローディング画面開始時に呼び出される
	*/
	p.onStartLoading = function(){
	}
	/**
	ローディング画面中のフレーム更新時（1秒間に約60回）に呼び出される
	count : ゲーム起動時からのフレーム数
	*/
	p.onLoading = function(count){
	}
	/**
	ローディング画面中のフレーム更新時（1秒間に約60回）の画面描画タイミングに呼び出される
	※レンダーの描画処理のみに使用
	*/
	p.onRenderLoading =  function(scene){
	}
	/**
	ローディング画面終了時に呼び出される
	ロード画面の後片付け用
	*/
	p.onEndLoading = function(){
	}
	p.setAction = function( param ){
		if(param){
			if(param.onSceneManagerInitialize){
				this.onSceneManagerInitialize = param.onSceneManagerInitialize;
			}
			if(param.onUpdate){
				this.onUpdate = param.onUpdate;
			}
			if(param.onPush){
				this.onPush = param.onPush;
			}
			if(param.onPop){
				this.onPop = param.onPop;
			}
			if(param.onStartLoading){
				this.onStartLoading = param.onStartLoading;
			}
			if(param.onLoading){
				this.onLoading = param.onLoading;
			}
			if(param.onRenderLoading){
				this.onRenderLoading = param.onRenderLoading;
			}
			if(param.onEndLoading){
				this.onEndLoading = param.onEndLoading;
			}
			this.startHook();
		}
	};
	/**
	scene listener class
	※使用する場合は必ずゲーム開始時に初期化を行う
	*/
	PCMV_LIB.listener.SceneListener =  function() {
		if(!(this instanceof PCMV_LIB.listener.SceneListener)) {
			return new PCMV_LIB.listener.SceneListener();
		}
		PCMV_LIB.listener.SceneListener._super_.constructor.call(this);
		
		this.frameCount = 0;
		this.isHook = false;
		
		this.startHook();
	}
	PCMV_LIB.extends(PCMV_LIB.listener.SceneListener, PCMV_LIB.base.Ext);
	p = PCMV_LIB.listener.SceneListener.prototype;
	p.startHook = function(){
		if(this.isHook){
			return;
		}
		this.isHook = true;
		var o = this;
		//MVフック
		var _Scene_Base_initialize = Scene_Base.prototype.initialize;
		Scene_Base.prototype.initialize = function() {
			_Scene_Base_initialize.call(this);
			o.mapFrameCount = 0;
			o.onInitialize(this);
		};
		var _Scene_Base_update = Scene_Base.prototype.update;
		Scene_Base.prototype.update = function(sceneActive) {
			o.onUpdate(o.mapFrameCount,this);
			o.mapFrameCount = o.mapFrameCount+1;
			_Scene_Base_update.call(this, sceneActive);
		};
		
		var _Scene_Base_terminate  = Scene_Base.prototype.terminate ;
		Scene_Base.prototype.terminate = function() {
			o.onTerminate();
			_Scene_Base_terminate.call(this);
		}
	}
	
	/**
	フレーム更新時（1秒間に約60回）に呼び出される
	count : フレーム数
	*/
	p.onUpdate = function(count){
	}
	p.onInitialize = function(){
	}
	p.onTerminate = function(){
	}
	p.setAction = function( param ){
		if(param){
			if(param.onUpdate){
				this.onUpdate = param.onUpdate;
			}
			if(param.onInitialize){
				this.onInitialize = param.onInitialize;
			}
			if(param.onTerminate){
				this.onTerminate = param.onTerminate;
			}
		}
	};
	/**
	map listener class
	※使用する場合は必ずゲーム開始時に初期化を行う
	*/
	PCMV_LIB.listener.MapListener =  function() {
		if(!(this instanceof PCMV_LIB.listener.MapListener)) {
			return new PCMV_LIB.listener.MapListener();
		}
		PCMV_LIB.listener.MapListener._super_.constructor.call(this);
		
		this.frameCount = 0;
		this.isHook = false;
		
		this.startHook();
	}
	PCMV_LIB.extends(PCMV_LIB.listener.MapListener, PCMV_LIB.base.Ext);
	p = PCMV_LIB.listener.MapListener.prototype;
	p.startHook = function(){
		if(this.isHook){
			return;
		}
		this.isHook = true;
		var o = this;
		//MVフック
		var _Game_Map_initialize = Game_Map.prototype.initialize;
		Game_Map.prototype.initialize = function() {
			_Game_Map_initialize.call(this);
			o.mapFrameCount = 0;
			o.onInitialize();
		};
		var _Game_Map_update = Game_Map.prototype.update;
		Game_Map.prototype.update = function(sceneActive) {
			o.onUpdate(o.mapFrameCount);
			o.mapFrameCount = o.mapFrameCount+1;
			_Game_Map_update.call(this, sceneActive);
		};
		
		var _Scene_Map_updateDestination  = Scene_Map.prototype.updateDestination ;
		Scene_Map.prototype.updateDestination = function() {
			o.onUpdateDestination(o.mapFrameCount);
			_Scene_Map_updateDestination.call(this);
		}
		var _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
		Scene_Map.prototype.processMapTouch = function() {
			var r = o.onProcessMapTouch(o.mapFrameCount);
			if(r === false){return ;}
			_Scene_Map_processMapTouch.call(this);
		}
		
		var _Scene_Map_terminate  = Scene_Map.prototype.terminate ;
		Scene_Map.prototype.terminate = function() {
			o.onTerminate();
			_Scene_Map_terminate.call(this);
		}
	}
	
	/**
	地図画面のフレーム更新時（1秒間に約60回）に呼び出される
	count : ゲーム起動時からのフレーム数
	*/
	p.onUpdate = function(count){
	}
	p.onUpdateDestination = function(){
	}
	p.onProcessMapTouch = function(){
	}
	p.onInitialize = function(){
	}
	p.onTerminate = function(){
	}
	p.setAction = function( param ){
		if(param){
			if(param.onUpdate){
				this.onUpdate = param.onUpdate;
			}
			if(param.onUpdateDestination){
				this.onUpdateDestination = param.onUpdateDestination;
			}
			if(param.onProcessMapTouch){
				this.onProcessMapTouch = param.onProcessMapTouch;
			}
			if(param.onInitialize){
				this.onInitialize = param.onInitialize;
			}
			if(param.onTerminate){
				this.onTerminate = param.onTerminate;
			}
		}
	};

	/**
	loading stage class
	(シングルトン構造)
	*/
	/*
	PCMV_LIB.stage.LoadingStage = (function() {
		var inst = null;
		var ctor = function(){
			if(inst){
				return inst;
			}
			if(!(this instanceof PCMV_LIB.stage.LoadingStage)) {
				return new PCMV_LIB.stage.LoadingStage();
			}
			PCMV_LIB.stage.LoadingStage._super_.constructor.call(this);
			inst = this;
			
			this.frameListeber = new PCMV_LIB.listener.FrameListener();
			this.frameListeber.setAction({
				onSceneManagerInitialize : function(){
					Graphics.setLoadingImage('img/\pictures/Loading.png');
				},
				onRenderLoading : function(){
					if ( ! SceneManager.isCurrentSceneStarted() && SceneManager._scene && Graphics._loadingCount >= 20) {
						inst.renderScene();
					}
				},
				onEndLoading : function(){
					inst.removeChildren();
				}
			});
			inst = this;
		}
		return ctor;
	})();
	PCMV_LIB.extends(PCMV_LIB.stage.LoadingStage, PCMV_LIB.base.CustomBaseStage);
	p = PCMV_LIB.stage.LoadingStage.prototype;
	p.renderScene = function(){
		PCMV_LIB.stage.LoadingStage._super_.renderScene.call(this);
	}
	*/
	/**
	utils class
	MVのフックから便利機能を提供する
	（シングルトン構造）
	*/
	PCMV_LIB.Utils = (function() {
		var inst = null;
		var ctor = function(){
			if(inst){
				return inst;
			}
			if(!(this instanceof PCMV_LIB.Utils)) {
				return new PCMV_LIB.Utils();
			}
			PCMV_LIB.Utils._super_.constructor.call(this);
			inst = this;
			return inst
		}
		
		//MVフック
		var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
		Game_Interpreter.prototype.pluginCommand = function (command, args) {
			_Game_Interpreter_pluginCommand.call(this, command, args);
			var name = (command || '').toUpperCase();
			//utils = new PCMV.Utils();
			if(inst.commandNameList[name] != null && inst.commandFuncList[ inst.commandNameList[name] ]){
				inst.commandFuncList[ inst.commandNameList[name] ](args);
			}
		};
		

		/*TODO : 要検討
		var _Graphics__paintUpperCanvas = Graphics._paintUpperCanvas;
		Graphics._paintUpperCanvas = function() {
			Graphics._clearUpperCanvas();
			if (Graphics._loadingImage && Graphics._loadingCount >= 20) {
				var context = Graphics._upperCanvas.getContext('2d');
				var padding = Graphics._loadingImage.height / 4;
				//var dx = (this._width - Graphics._loadingImage.width) / 2;
				//var dy = (this._height - Graphics._loadingImage.height) / 2;
				var dx = (Graphics._width - Graphics._loadingImage.width) - padding;
				var dy = (Graphics._height - Graphics._loadingImage.height) - padding;
				var alpha = ((Graphics._loadingCount - 20) / 30).clamp(0, 1);
				context.save();
				context.globalAlpha = alpha;
				context.drawImage(Graphics._loadingImage, dx, dy);
				context.restore();
			}
			//_Graphics__paintUpperCanvas.call(this);
		};
		*/
		return ctor;
	})();
	PCMV_LIB.extends(PCMV_LIB.Utils, PCMV_LIB.base.Base);
	p = PCMV_LIB.Utils.prototype;
	p.initialize = function() {
		PCMV_LIB.Utils._super_.initialize.call(this, arguments);
		
		this.commandFuncList = [];
		this.commandNameList = {};
		
		this.frameCount = 0;
		this.frameListenerList = [];
		this.mapFrameCount = 0;
		this.mapListenerList = [];
		this.loading_flag = false;
		
		this.mobile_flag = navigator.userAgent.match(/(windows|macintosh)/i) !== null ? false : true;
		
	};
	/**
	テキストの制御文字で置き換える
	*/
	p.convertEscapeCharacters = function(text) {
		if (text == null) text = '';
		var window = SceneManager._scene._windowLayer.children[0];
		return window ? window.convertEscapeCharacters(text) : text;
	};
	/**
	プラグインコマンドを登録
	name コマンド名（同じ名前の場合は上書きされる）
			配列を指定すると複数の名前をつけられる（[ command1, command2 ]）
	func 実行関数を指定
		呼び出され方：func(args)
	*/
	p.addPluginCommand = function(name, func){
		this.commandFuncList.push(func);
		if(this.isArray(name)){
			for(var i=0; i < name.length; i++){
				this.commandNameList[name[i].toUpperCase()] = this.commandFuncList.length-1;
			}
		}else{
			this.commandNameList[name.toUpperCase()] = this.commandFuncList.length-1;
		}
		return this;
	}
	/**
	リストを列挙する
	*/
	p.eachList = function(list,func){
		var i,l;
		var r = true;
		l = list.length;
		for(i=0; i<l|0; i=(i+1)|0){
			if(func(list[i], i) === false){
				if(r===false){
					console.warn("actions return false");
				}
				r=false;
			}
		}
		return r;
	}
	/**
	整数に変換する
	*/
	p.int = function(v){
		var i = parseInt(v);
		return isNaN(i)? 0 : i;
	}
	/**
	配列かを判定する
	*/
	p.isArray = function(obj){
		if(!obj){return false;}
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
	/**
	２つの座標から距離を計算
	*/
	p.getDistance = function(x1, y1, x2, y2){
		return Math.sqrt( Math.pow( x2-x1, 2 ) + Math.pow( y2-y1, 2 ) ) ;
	}
	/**
	２つの座標から方位角を求める
	*/
	p.getAzimuth = function( x1, y1, x2, y2){
		var az = Math.atan2(y2 - y1,x2 - x1) * 180.0 / Math.PI;
		if(az < 0){
			az = az + 360;
		}
		az = az + 90;
		if(az >= 360){
			az = az - 360;
		}
		return az;
	}
	/**
	２つの座標から８方向を求める
	*/
	p.getDirection8 = function( x1, y1, x2, y2){
		var d8 = parseInt( (this.getAzimuth( x1, y1, x2, y2) + 22.5) / 45 );
		if(d8 == 8){
			d8 = 0;
		}
		return d8;
	}
	/**
	２つの座標から４方向を求める
	*/
	p.getDirection4 = function( x1, y1, x2, y2){
		var d4 = parseInt( (this.getAzimuth( x1, y1, x2, y2) + 45) / 90 );
		if(d4 == 4){
			d4 = 0;
		}
		return d4;
	}
	/**
	度からラジアンを返す
	*/
	p.degToRad = function(degree){
		return degree * ( Math.PI / 180 );
	}
	/**
	オブジェクトをコピーする（簡易コピー）
	*/
	p.objectCopy = function(obj){
		return JSON.parse(JSON.stringify(obj));
	}
	
	/**
	スマートフォンで起動しているかを返す
	*/
	p.isMobile = function(){
		return this.mobile_flag;
	}
	/**
	stringパラメータを取得する
	*/
	p.getParamString = function(pluginName,paramNames) {
		if (!Array.isArray(paramNames)) paramNames = [paramNames];
		for (var i = 0; i < paramNames.length; i++) {
			var name = PluginManager.parameters(pluginName)[paramNames[i]];
			if (name) return name;
		}
		return '';
	};
	/**
	booleanパラメータを取得する
	*/
	p.getParamBoolean = function(pluginName,paramNames) {
		var value = getParamString(paramNames);
		return value.toUpperCase() === 'ON' || value.toUpperCase() === 'TRUE';
	};
	/**
	オブジェクトが既にリスト内にすでに登録済みか
	※システムで利用
	*/
	p._existObject = function( obj,list, ctor){
		if(obj instanceof ctor && list){
			for( var i=0; i < list.length; i++ ){
				if(list[i] === obj){
					return false;
				}
			}
			return true;
		}
		return false;
	}
	p.addFrameListener = function(pcmv_frame_listener){
		if(this._existObject(pcmv_frame_listener, this.frameListenerList, PCMV_LIB.listener.FrameListener )){
			this.frameListenerList.push(pcmv_frame_listener);
			return true;
		}
		return false;
	}
	p.addMapListener = function(pcmv_map_listener){
		if(this._existObject(pcmv_map_listener, this.mapListenerList, PCMV_LIB.listener.MapListener )){
			this.mapListenerList.push(pcmv_map_listener);
			return true;
		}
		return false;
	}
	
	
	//================================================
	//静的関数を定義
	//================================================
	/**
	指定した位置がイベントを基準とした短形範囲に含まれるかを返す
		target 対象の座標情報 target.x target.y　を使用する
		eventId	基準とするイベントID
		rectArea 範囲情報の配列
			[ offsetX, offsetY, rangeX, rangeY ]
			offsetX	短形範囲の左のオフセット
			offsetY	短形範囲の上のオフセット
			rangeX	横方向の範囲 0～
			rangeY	縦方向の範囲 0～
	*/
	PCMV_LIB.func.containsRectAreaToEvent = function( target, eventId, rectArea ){
		var event = $gameMap.event(eventId);
		var rectTop = event.y + rectArea[1];
		var rectLeft = event.x + rectArea[0];
		var rectBottom = rectTop + rectArea[3];
		var rectRight = rectLeft + rectArea[2];
		return rectLeft <= target.x && target.x <= rectRight && rectTop <= target.y && target.y <= rectBottom;
	}
	PCMV_LIB.func.containsRectAreaToEvent2 = function( target, eventId, rectArea ){
		var event = $gameMap.event(eventId);
		var rectTop = event.y + rectArea[1];
		var rectLeft = event.x + rectArea[0];
		var rectBottom = rectTop + rectArea[3];
		var rectRight = rectLeft + rectArea[2];
		console.log( rectLeft +" <= "+target.x+" && "+target.x +" <= "+rectRight+" && "+rectTop+" <= "+target.y+" && "+target.y+" <= "+rectBottom);
		return rectLeft <= target.x && target.x <= rectRight && rectTop <= target.y && target.y <= rectBottom;
	}
	/**
	指定した位置がイベントを基準とした円形範囲に含まれるかを返す
		target 対象の座標情報 target.x target.y　を使用する
		eventId	基準とするイベントID
		rectArea 範囲情報の配列
			[ offsetX, offsetY, radius ]
			offsetX	円形範囲の中心のX方向のオフセット
			offsetY	円形範囲の中心のY方向のオフセット
			radius	半径
	*/
	PCMV_LIB.func.containsCircleAreaToEvent = function( target, eventId, rectArea ){
		var event = $gameMap.event(eventId);
		var centerY = event.y + rectArea[1];
		var centerX = event.x + rectArea[0];
		
		// 円内か判定
		// 公式　(x -a)^2 + (y-b)^2 = r^2
		var dist = Math.pow( (target.x - centerX), 2 ) + Math.pow( (target.y - centerY), 2);
		var r2 =  Math.pow( rectArea[2]+0.5, 2 );
		return dist < r2 ;//trueで円内
	}
	
	/**
	イベント名からGame_Eventオブジェクトを取得する
	*/
	PCMV_LIB.func.getEventByName = function( name ){
		var list = $gameMap.events();
		var event = 0;
		for(var i=0; i < list.length; i++){
			if(list[i].event().name == name){
				event = list[i];
				break;
			}
		}
		return event;
	}
	
	/**
	イベント名からイベントIDを取得する
	isTemplate : trueでテンプレートマップから検索
	*/
	PCMV_LIB.func.getEventIdByName = function( name, isTemplate ){
		var id = 0;
		if( ! isTemplate ){
			var list = $gameMap.events();
			for(var i=0; i < list.length; i++){
				if(list[i].event().name == name){
					id = list[i].eventId();
					break;
				}
			}
		}else{
			var e = 0;
			$dataTemplateEvents.some(function(dataItem) {
				if (dataItem && dataItem['name'] === name) {
					e = dataItem;
					return true;
				}
				return false;
			});
			id = e ? e.id : 0;
		}
		return id;
	}
	
	
	//ここまで共通-----------------------------------
	
})(this);