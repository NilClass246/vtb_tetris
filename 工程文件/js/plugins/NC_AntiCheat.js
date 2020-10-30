//=============================================================================
// NC_AntiCheat.js v0.3
//=============================================================================

var NC = NC || {}
NC.temps = NC.temps || {}

/*:
 * @plugindesc [v1.0] 反作弊插件
 * @author NilClass
 *
 * @help
 *  反作弊系统
 *  实时对比存储的数据，同时针对了几个常见的注入式修改器
 * 
 */

NC.temps.Game_System_prototype_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
	NC.temps.Game_System_prototype_initialize.call(this);
	this._antiCheat = {};
	this._isCheating = false;
}

NC.temps.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
	NC.temps.DataManager_setupNewGame.call(this);
	var actor = $gameActors.actor(1);
	$gameSystem._antiCheat.reservedLevel = actor._level;
	$gameSystem._antiCheat.reservedHp = actor.hp;
	$gameSystem._antiCheat.reservedMp = actor.mp;
	$gameSystem._antiCheat.reservedParamPlus = actor._paramPlus.slice();
}

Game_System.prototype.checkForCheats = function () {
	var actor = $gameActors.actor(1);
	if ($gameSystem._antiCheat.reservedHp != actor.hp
		|| $gameSystem._antiCheat.reservedMp != actor.mp
		|| $gameSystem._antiCheat.reservedLevel != actor._level
	) {
		this._isCheating = true;
	}

	for (var i = 0; i < $gameSystem._antiCheat.reservedParamPlus.length; i++) {
		if ($gameSystem._antiCheat.reservedParamPlus[i] != actor._paramPlus[i]) {
			this._isCheating = true;
        }
    }
	//针对变量名
	if (typeof CheatMenu !== 'undefined') {
		this._isCheating = true;
    }
	if (typeof Cheat_Menu !== 'undefined') {
		this._isCheating = true;
    }
}

NC.temps.Scene_Base_prototype_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function () {
	NC.temps.Scene_Base_prototype_update.call(this);
	if ($gameSystem) {
		$gameSystem.checkForCheats();
	}
}

//level
NC.temps.Game_Actor_prototype_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function () {
	NC.temps.Game_Actor_prototype_levelUp.call(this);
	$gameSystem._antiCheat.reservedLevel = this._level;
}

NC.temps.Game_Actor_prototype_levelDown = Game_Actor.prototype.levelDown
Game_Actor.prototype.levelDown = function () {
	NC.temps.Game_Actor_prototype_levelDown.call(this);
	$gameSystem._antiCheat.reservedLevel = this._level;
};

//hp
NC.temps.Game_BattlerBase_prototype_setHp = Game_BattlerBase.prototype.setHp;
Game_BattlerBase.prototype.setHp = function (hp) {
	NC.temps.Game_BattlerBase_prototype_setHp.call(this, hp);
	$gameSystem._antiCheat.reservedHp = this._hp;
}
//mp
NC.temps.Game_BattlerBase_prototype_setMp = Game_BattlerBase.prototype.setMp
Game_BattlerBase.prototype.setMp = function (mp) {
	NC.temps.Game_BattlerBase_prototype_setMp.call(this, mp);
	$gameSystem._antiCheat.reservedMp = this._mp;
}

//skillcost
NC.temps.Game_BattlerBase_prototype_paySkillCost = Game_BattlerBase.prototype.paySkillCost
Game_BattlerBase.prototype.paySkillCost = function (skill) {
	NC.temps.Game_BattlerBase_prototype_paySkillCost.call(this);
	$gameSystem._antiCheat.reservedMp = this._mp;
};

//recover
NC.temps.Game_BattlerBase_prototype_recoverAll = Game_BattlerBase.prototype.recoverAll
Game_BattlerBase.prototype.recoverAll = function () {
	NC.temps.Game_BattlerBase_prototype_recoverAll.call(this);
	$gameSystem._antiCheat.reservedHp = this._hp;
};

//death
NC.temps.Game_BattlerBase_prototype_die = Game_BattlerBase.prototype.die
Game_BattlerBase.prototype.die = function () {
	NC.temps.Game_BattlerBase_prototype_die.call(this);
	$gameSystem._antiCheat.reservedHp = this._hp;
};

NC.temps.Game_BattlerBase_prototype_revive = Game_BattlerBase.prototype.revive
Game_BattlerBase.prototype.revive = function () {
	NC.temps.Game_BattlerBase_prototype_revive.call(this);
	$gameSystem._antiCheat.reservedHp = this._hp;
};

//params
NC.temps.Game_BattlerBase_prototype_addParam = Game_BattlerBase.prototype.addParam
Game_BattlerBase.prototype.addParam = function (paramId, value) {
	NC.temps.Game_BattlerBase_prototype_addParam.call(this, paramId, value);
	$gameSystem._antiCheat.reservedParamPlus = this._paramPlus.slice();
};