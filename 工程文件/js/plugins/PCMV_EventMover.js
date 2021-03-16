// PCMV_EventMover.js ver 1.0.3
// 2019 06/09 ステップを更新するように修正
// 2019 04/07 プレーヤーから遠ざかる機能を追加
/*:
 * @plugindesc 
 * @author pcmv
 * 
 * @help
 * 
 * イベントムーバー初期化
 * $gameMap.event( [EventId] ).initMover();
 * 
 * プレヤーの方向へ進む（毎フレーム呼び出す必要あり？）
 * $gameMap.event( [EventId] ).mover().setTargetPositionToPlayer();
 * 
 * プレヤーから遠ざかる（毎フレーム呼び出す必要あり？）
 * $gameMap.event( [EventId] ).mover().setReverseTargetPositionToPlayer( $gameMap.event( [EventId] ) );
 * 
 * 
 */

(function(_global) {
'use strict';

var CharacterMover = window.CharacterMover;

//-----------------------------------------------------------------------------
// EventMover
//
// イベントムーバー

function EventMover() {
    this.initialize.apply(this, arguments);
}

EventMover.prototype = Object.create(CharacterMover.prototype);
EventMover.prototype.constructor = EventMover;

// オブジェクト初期化
EventMover.prototype.initialize = function(character) {
    CharacterMover.prototype.initialize.call(this, character);
    this._character = character;
};

// キャラクター
EventMover.prototype.character = function() {
    //TODO : 参照を$gamePlayerのように変えるべき
    return this._character;
};

// 接触イベントIDリスト
EventMover.prototype.collidingEventIds = function() {
    return this._collidingEventIds;
};

// フレーム更新
EventMover.prototype.update = function() {
    this.updateCollidingEventIds();
    CharacterMover.prototype.update.call(this);
};

// 接触イベントIDリストの更新
EventMover.prototype.updateCollidingEventIds = function() {
    this._collidingEventIds = [];
};

// キャラクターの更新
EventMover.prototype.updateCharacter = function() {
	this.character().setPosVec(this._posVec);
	if(!this.character().isStopping()){
		this.character().setDirVec(this._velVec);
	}
};

// 目標位置の更新
EventMover.prototype.updateTargetPosition = function() {

	if( this.isTargetDestinationValid() ){
		this._tarPosVec = Vector.rect(
			this._targetDestinationX + 0.5,
			this._targetDestinationY + 0.5
		);
		if (this._tarPosVec.sub2(this._posVec).len() < 1.0 / 96.0) {
			this.clearTargetPosition();
		}

	}
	
/*
//TODO タッチされている場合はその方向へ進むコードのためここを置き換える
    if ($gameTemp.isDestinationValid()) {
        this._tarPosVec = Vector.rect(
            $gameTemp.destinationX() + 0.5,
            $gameTemp.destinationY() + 0.5
        );
        if (this._tarPosVec.sub2(this._posVec).len() < 1.0 / 96.0) {
            this.clearTargetPosition();
        }
    }
*/
};

// 目標位置のクリア
EventMover.prototype.clearTargetPosition = function() {
    this._tarPosVec = null;
};

//目的地を設定する($gameTemp.destinationX()、Y()の代用部分で使用する値をセットする)
EventMover.prototype.setTargetPosition = function(x, y) {
	this._targetDestinationX = x;
	this._targetDestinationY = y;
}
//目的地をプレーヤの座標に設定する
EventMover.prototype.setTargetPositionToPlayer = function() {
	this._targetDestinationX = $gamePlayer.x;
	this._targetDestinationY = $gamePlayer.y;
}
//目的地を指定キャラからプレーヤ座標の逆方向に設定する（引数にキャラを指定：自分のイベントを指定するとプレーヤーから遠ざかるような動作になる）
EventMover.prototype.setReverseTargetPositionToPlayer = function(character) {
	var x = ($gamePlayer.x - character.x) * -1;
	var y = ($gamePlayer.y - character.y) * -1;
	x += x < 0 ? -20 : 20;
	y += y < 0 ? -20 : 20;
	
	this._targetDestinationX = character.x + x;
	this._targetDestinationY = character.y + y;
}
//目的地をクリアにする($gameTemp.clearDestination();の代用)
EventMover.prototype.clearTargetDestination = function() {
	this._targetDestinationX = null;
	this._targetDestinationY = null;
}
//目的地が設定されているかを返す（$gameTemp.isDestinationValid()の代用）
EventMover.prototype.isTargetDestinationValid = function() {
	return this._targetDestinationX != null;
}

//=========================================================
// 速度の更新
EventMover.prototype.updateVelocity = function() {
    //CharacterMover.prototype.updateVelocity.call(this);
    
    var velVecLen = 0.0;
    var velVecDir = this._velVec.dir();
    if (!!this._tarPosVec) {
        var relPosVec = this._tarPosVec.sub2(this._posVec);
        velVecLen = Math.min(this.dpf(), relPosVec.len());
        velVecDir = relPosVec.dir();
//        console.log(velVecLen);
    }
    this._velVec = Vector.polar(velVecLen, velVecDir);

	/*
    if (this.isInputed()) {
        $gameTemp.clearDestination();
        this.clearTargetPosition();
        this.updateVelocityByInput();
    } else {
        CharacterMover.prototype.updateVelocity.call(this);
    }
    */
};

// 速度の更新
EventMover.prototype.updateVelocityByInput = function() {
    var velVecLen = 0.0;
    var velVecDir = 0.0;
    /*
    //TODO : アナログスティック又はキー入力によりベクトルを更新
    if (!!this.analogStick() && !!this.analogStick().tilt) {
        velVecLen = this.analogStick().tilt * this.dpf();
        velVecDir = this.analogStick().dir;
    } else if (Input.dir8 !== 0) {
        velVecLen = this.dpf();
        velVecDir = CharacterMover.dir8ToRad(Input.dir8);
    }
    */
    this._velVec = Vector.polar(velVecLen, velVecDir);
};
/*
//TODO : 不要
// 入力有無判定
EventMover.prototype.isInputed = function() {
    return (
        (!!this.analogStick() && this.analogStick().tilt !== 0.0) ||
        Input.dir8 !== 0
    );
};
*/
/*
//TODO : 不要
// アナログスティック入力値
EventMover.prototype.analogStick = function() {
    if (Imported.SAN_AnalogStick) {
        return Input.leftStick;
    }
    return undefined;
};
*/

//=========================================================
// 衝突キャラクター
//TODO : 要確認　プレーヤとの接触判定が行えるかを要確認
EventMover.prototype.collidingCharacters = function() {
    var characters = CharacterMover.prototype.collidingCharacters.call(this);
    var thisCharacter = this._character;
    var events = characters.filter(
        function(character) {
            return character instanceof Game_Event && character !==  thisCharacter ;//自分以外を取得するように変更
        }
    );
    var eventIds = events.map(
        function(event) {
            return event.eventId();
        }
    );
    this._collidingEventIds = this._collidingEventIds.concat(eventIds);
    this._collidingEventIds = this._collidingEventIds.filter(
        function(eventId, index, eventIds) {
            return eventIds.indexOf(eventId) === index;
        }
    );
    return characters;
};

// 衝突キャラクター
EventMover.prototype.isCollidingCharacter = function(character) {
    return (
        !this.isThrough() &&
        !character.isThrough() &&
        character !== this.character() &&
        this.isCollidableCharacter(character) &&
        this.isCollidingDistanceCharacter(character)
    );
};

// 衝突し得るキャラクター
EventMover.prototype.isCollidableCharacter = function(character) {
    return (
        this.isCollidableEvent(character) ||
        this.isCollidableVehicle(character)
    );
};

// 衝突し得るイベント
EventMover.prototype.isCollidableEvent = function(character) {
    return (
        character instanceof Game_Event &&
        character.isNormalPriority()
    );
};

// 衝突し得る乗り物
EventMover.prototype.isCollidableVehicle = function(character) {
    return (
        character instanceof Game_Vehicle &&
        (
            (this.character().isInBoat() && character.isShip()) ||
            (this.character().isInShip() && character.isBoat())
        )
    );
};


//-----------------------------------------------------------------------------
// Game_Event
//
// イベントキャラクター

// オブジェクト初期化（後から初期化できるかを検討）
var _Game_Event_initialize =
    Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function() {
    _Game_Event_initialize.apply(this, arguments);
//    this.initMover();
};

// メンバー変数の初期化
var _Game_Event_initMembers =
    Game_Event.prototype.initMembers;
Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    this._moveDefault = false;
};

// ムーバーの初期化
Game_Event.prototype.initMover = function() {
    this._mover = new EventMover(this);
    this._stepDistance = 0.0;
};
// ムーバー
Game_Event.prototype.mover = function() {
    //ムーバーに初回参照の場合は初期化する（一部のイベントのみ適用する場合に都合が良いため）
    if( ! this.hasMover() ){
       this.initMover();
    }
    return this._mover;
};

// すり抜け判定

// 移動中判定

// デフォルト移動判定
Game_Event.prototype.shouleMoveDefault = function() {
    return this._moveDefault;
};

// フレーム更新
var _Game_Event_update =
    Game_Event.prototype.update;
Game_Event.prototype.update = function(sceneActive) {
    if (this.canAnalogMove()) {
//        var lastScrolledX = this.scrolledX();
//        var lastScrolledY = this.scrolledY();
//        this.updateAnalogDashing();
//        Game_Character.prototype.update.call(this);
        _Game_Event_update.call(this, sceneActive);
//        this.updateScroll(lastScrolledX, lastScrolledY);
        this.updateSteps();
//        this.updateVehicle();
//        this.updateFollowers();
        this.updateAction();
        this.updateDistination();
//        this.updateIgnoringEventIds();
        return;
    }
    if (this.hasMover()) {
        this.updateDistination();
    }
    
    _Game_Event_update.call(this, sceneActive);
};

// アナログムーブ時のダッシュ判定の更新：不要

// 移動の更新

// 乗り物下乗の更新：不要

// ステップの更新
//TODO : 要確認

Game_Event.prototype.updateSteps = function() {
    this._stepDistance += this._mover.distanceMoved();
    if (this._stepDistance > 1.0) {
        this._stepDistance -= 1.0;
        this.increaseSteps();
    }
};


// フォロワーズの更新：不要

// アクションの更新：不要？
Game_Event.prototype.updateAction = function() {
    if (!$gameMap.isEventRunning()) {
        /*
        if (this.isMoving()) {
            this.checkEventTriggerHere([1,2]);
            if ($gameMap.setupStartingEvent()) {
                return;
            }
        }
        */
        this.checkEventTriggerTouchFront(5);
        /*
        if ($gameMap.setupStartingEvent()) {
            return;
        }
        */
        //this.triggerAction();
    }
};

// 目標座標の更新
Game_Event.prototype.updateDistination = function() {
    if (!this.canMove() || !this.isMoving()) {
        if (this.hasMover() && this._mover.isTargetDestinationValid() ) {
            this._mover.clearTargetDestination();
        }
        if (this.hasMover()) {
            this._mover.clearTargetPosition();
        }
    }
    /*
    if (!this.canMove() || !this.isMoving()) {
        if ($gameTemp.isDestinationValid()) {
            $gameTemp.clearDestination();
        }
        if (this.hasMover()) {
            this._mover.clearTargetPosition();
        }
    }
    */
};

// タッチによるイベント起動の確認：不要

// 隣接タイルのイベント起動確認：不要？

// 正面タイルのイベント起動確認：不要？

// 接触イベントの開始：不要？

// 無視イベントIDリストの更新：不要？

// 無視イベントIDの追加：不要？

// 無視イベントID判定：不要？

// デフォルト移動確認
Game_Event.prototype.checkMoveDefault = function() {
    if (this.isMoveRouteCommand(this.nextRouteCommand()) ||
        this.isMoveRouteCommand(this.processingRouteCommand()))
    {
        this._moveDefault = true;
    }
};

// 移動ルートの強制
var _Game_Event_forceMoveRoute =
    Game_Event.prototype.forceMoveRoute;
Game_Event.prototype.forceMoveRoute = function(moveRoute) {
    _Game_Event_forceMoveRoute.call(this, moveRoute);
    this.checkMoveDefault();
};

// 移動ルートインデックスの進行
var _Game_Event_advanceMoveRouteIndex =
    Game_Event.prototype.advanceMoveRouteIndex;
Game_Event.prototype.advanceMoveRouteIndex = function() {
    _Game_Event_advanceMoveRouteIndex.apply(this, arguments);
    if(!!this._moveRoute) {
        this.checkMoveDefault();
    }
};

// 場所移動の実行：不要？

//hasMover
var _Game_Event_hasMover =
    Game_Event.prototype.hasMover;
Game_Event.prototype.hasMover = function() {
    var ret = _Game_Event_hasMover.apply(this, arguments);
    if(ret){
    	//メソッドが定義されずに初期化されるパターンがあったためその対策（要調査）
    	ret = this._mover.isTargetDestinationValid?true:false;
    }
    return ret;
};

// アナログムーブ可能判定
Game_Event.prototype.canAnalogMove = function() {
    return (
        SceneManager.isSceneActive() &&
        this.hasMover() &&
        this.canMove() &&
        !this.isJumping() &&
        !this.isMoveRouteForcing() &&
        !this.shouleMoveDefault()
    );
};

// 移動可能判定：TODO　動作用確認
Game_Event.prototype.canMove = function() {
    if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
        return false;
    }
    if (this.isMoveRouteForcing() /*|| this.areFollowersGathering()*/ ) {
        return false;
    }
    return true;
};

//TODO : 動作確認のためコピペ　要最適化
Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
    if (!$gameMap.isEventRunning()) {
        if (this._trigger === 2 && $gamePlayer.pos(x, y)) {
//        console.log("ch");
            if (!this.isJumping() && this.isNormalPriority()) {
                this.start();
            }
        }
    }
};

Game_Event.prototype.resetStopCount = function() {
    this._stopCount = 0;
};

Game_Event.prototype.updateSelfMovement = function() {

//if(this.eventId()==36){
//	console.log(!this._locked +"\nnts "+this.isNearTheScreen() +"\nc "+ this.checkStop(this.stopCountThreshold()) +"\n this.isStopping() "+this.isStopping() +"\n "+this._stopCount);
//}

    if (!this._locked && this.isNearTheScreen() &&
            this.checkStop(this.stopCountThreshold())) {
        switch (this._moveType) {
        case 1:
            this.moveTypeRandom();
            break;
        case 2:
            this.moveTypeTowardPlayer();
            break;
        case 3:
            this.moveTypeCustom();
            break;
        }
    }
};

//-----------------------------------------------------------------------------
// Game_Map
//
// マップ
//
// SAN_AnalogMove.jsをの初期化処理にイベントキャラも対応するように拡張します
/*
// パーティー＋イベントキャラクター
Game_Map.prototype.partyAndEventCharacters = function() {
    var characters = [].concat(
        $gamePlayer,
        $gamePlayer.followers().followers(),
        $gameMap.events()
    );
    return characters;
};

// ムーバーの初期化
Game_Map.prototype.initCharacterMovers = function() {
    $gameMap.partyAndEventCharacters().forEach(
        function(character) {
            character.initMover();
        }
    );
};
*/


})(this);
