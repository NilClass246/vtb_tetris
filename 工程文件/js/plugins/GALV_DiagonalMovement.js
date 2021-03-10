//-----------------------------------------------------------------------------
//  Galv's Diagonal Movement
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_DiagonalMovement.js
//-----------------------------------------------------------------------------
//  2017-01-16 - Version 1.5 - added diagonal charset in the 'turn toward 
//                           - character' move route command
//  2016-10-05 - Version 1.4 - modified how diag speed was coded for
//                             compatibility purposes
//  2016-08-26 - Version 1.3 - changed alias methods
//                           - fixed turn direction move route after diag move
//  2016-05-17 - Version 1.2 - diagonal block option added to prevent moving
//                           - diagonally past blocking tiles.
//                           - added ability to disable diagonal movement
//                           - during game
//  2016-02-04 - Version 1.1 - added option to slow diagonal move speed
//  2015-12-12 - Version 1.0 - release
//-----------------------------------------------------------------------------
//  Terms can be found at:
//  galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_DiagonalMovement = true;

var Galv = Galv || {};
Galv.DM = Galv.DM || {};

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.5) Just a basic diagonal movement plugin. Written for compatibility with other Galv plugins.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Diagonal Mouse
 * @desc true or false for diagonal pathfinding movement on mouse click. true may conflict with pathfinding plugins.
 * @default false
 *
 * @param Diagonal Charset
 * @desc true or false if you want to use diagonal charactersets (see help for more)
 * @default true
 *
 * @param Diagonal Speed
 * @desc % of move speed characters move while travelling diagonally
 * @default 90
 *
 * @param Block Diagonal
 * @desc true or false - if diagonal movement is blocked when moving past an impassable tile or not.
 * @default false
 *
 * @help
 *   Galv's Diagonal Movement
 * ----------------------------------------------------------------------------
 * Plug and play. If this doesn't play nice with other plugins, try putting it
 * at the top of the plugin list. It overwrites the default diagonal function.
 *
 * If this conflicts with other pathfinding plugins you might have, change
 * 'Diagonal Mouse' setting to false.
 *
 * When 'Diagonal Charsets' is true, the plugin will change the sprite if the
 * character is on a diagonal. The new sprite used will be in the position
 * directly below the selected character graphic. This means that only sprites
 * on the top of a character sheet will be able to have diagonal graphics.
 *
 * Sprites on the bottom will not have diagonal graphics.
 * ----------------------------------------------------------------------------
 *   SCRIPT CALL
 * ----------------------------------------------------------------------------
 *
 *   $gameSystem.disableVert = true;   // DISABLE diagonal movement
 *
 *   $gameSystem.disableVert = false;  // ENABLE diagonal movement
 *
 * ----------------------------------------------------------------------------
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------



(function() {
Galv.DM.mouseMove = PluginManager.parameters('Galv_DiagonalMovement')["Diagonal Mouse"].toLowerCase() == 'true';
Galv.DM.diagGraphic = PluginManager.parameters('Galv_DiagonalMovement')["Diagonal Charset"].toLowerCase() == 'true';
Galv.DM.diagMod = Number(PluginManager.parameters('Galv_DiagonalMovement')["Diagonal Speed"]) * 0.01;	
Galv.DM.diagBlocked = PluginManager.parameters('Galv_DiagonalMovement')["Block Diagonal"].toLowerCase() == 'true';

Game_CharacterBase.prototype._cframes = 3;

Galv.DM.Game_CharacterBase_realMoveSpeed = Game_CharacterBase.prototype.realMoveSpeed;
Game_CharacterBase.prototype.realMoveSpeed = function() {
	var spd = Galv.DM.Game_CharacterBase_realMoveSpeed.call(this);
	return this._diagDir ? spd * Galv.DM.diagMod : spd;
};

// overwrite
Game_Follower.prototype.realMoveSpeed = function() {
	return $gamePlayer.realMoveSpeed();
};

Galv.DM.getHorzVertDirs = function(direction) {
	switch (direction) {
		case 1: return [4,2];
		case 3: return [6,2];
		case 7: return [4,8];
		case 9: return [6,8];
		default: return [0,0];
	};
};

Galv.DM.getDir = function(horz,vert) {
	if (horz == 4 && vert == 2) return 1;
	if (horz == 6 && vert == 2) return 3;
	if (horz == 4 && vert == 8) return 7;
	if (horz == 6 && vert == 8) return 9;
	return 0;
};

Galv.DM.diagRow = {
	3: 0,
	1: 1,
	9: 2,
	7: 3
};

Galv.DM.Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
Game_CharacterBase.prototype.moveStraight = function(d) {
	this._diagDir = false;
	Galv.DM.Game_CharacterBase_moveStraight.call(this,d);
};

Galv.DM.Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function(d) {
	if (this._diagStraigten) this._diagDir = false;
	Galv.DM.Game_CharacterBase_setDirection.call(this,d);
};

if (Galv.DM.diagBlocked) {
	Game_Player.prototype.canPassDiagonally = function(x, y, horz, vert) {
		var x2 = $gameMap.roundXWithDirection(x, horz);
		var y2 = $gameMap.roundYWithDirection(y, vert);
		if (this.canPass(x, y, vert) && this.canPass(x, y2, horz) && this.canPass(x, y, horz) && this.canPass(x2, y, vert)) {
			return true;
		};
		return false;
	};
};

Galv.DM.Game_Player_canPassDiagonally = Game_Player.prototype.canPassDiagonally;
Game_Player.prototype.canPassDiagonally = function(x, y, horz, vert) {
	if ($gameSystem.disableVert) return false;
	return Galv.DM.Game_Player_canPassDiagonally.call(this,x,y,horz,vert);
};

// OVERWRITE
Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
	var diag = this.canPassDiagonally(this._x, this._y, horz, vert);
    var norm = this.canPass(this._x, this._y, horz) || this.canPass(this._x, this._y, vert);
	
	if (diag) {
		this._diagDir = Galv.DM.getDir(horz,vert);
        this._x = $gameMap.roundXWithDirection(this._x, horz);
        this._y = $gameMap.roundYWithDirection(this._y, vert);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
        this.increaseSteps();
	} else if (norm) {
		this._diagDir = false;
		this.moveStraight(this.getOtherdir(horz,vert));
    };
	
	this._diagStraigten = false;
    if (this._direction === this.reverseDir(horz)) this.setDirection(horz);
    if (this._direction === this.reverseDir(vert)) this.setDirection(vert);
	this._diagStraigten = true;
};

Game_CharacterBase.prototype.getOtherdir = function(horz, vert) {
    return this.canPass(this._x, this._y, horz) ? horz : vert;
};

// OVERWRITE
Game_Player.prototype.getInputDirection = function() {
    return Input.dir8;
};

Galv.DM.Game_Player_executeMove = Game_Player.prototype.executeMove;
Game_Player.prototype.executeMove = function(direction) {
	if (direction % 2 == 0) {
    	Galv.DM.Game_Player_executeMove.call(this,direction);
	} else if (Math.abs(direction % 2) == 1) {
		var dirArray = Galv.DM.getHorzVertDirs(direction);
		this.moveDiagonally(dirArray[0],dirArray[1]);
	};
};



// If using Diaonal Charset
if (Galv.DM.diagGraphic) {
Galv.DM.Sprite_Character_characterPatternY = Sprite_Character.prototype.characterPatternY;
Sprite_Character.prototype.characterPatternY = function() {
	if (!this._isBigCharacter && this._character._diagDir && this._character.characterIndex() < 4) {
		return Galv.DM.diagRow[this._character._diagDir];
	} else {
    	return Galv.DM.Sprite_Character_characterPatternY.call(this);
	};
};

Galv.DM.Sprite_Character_characterBlockX = Sprite_Character.prototype.characterBlockX;
Sprite_Character.prototype.characterBlockX = function() {
	if (!this._isBigCharacter && this._character._diagDir && this._character.characterIndex() < 4) {
		var index = this._character.characterIndex() + 4;
        return index % 4 * this._character._cframes;
	} else {	
	    return Galv.DM.Sprite_Character_characterBlockX.call(this);
	};

};

Galv.DM.Sprite_Character_characterBlockY = Sprite_Character.prototype.characterBlockY;
Sprite_Character.prototype.characterBlockY = function() {
	if (!this._isBigCharacter && this._character._diagDir && this._character.characterIndex() < 4) {
		var index = this._character.characterIndex() + 4;
        return Math.floor(index / 4) * 4;
	} else {	
	    return Galv.DM.Sprite_Character_characterBlockY.call(this);
	};

};
};
// end if using diagonal charset


// turn toward character on diagonal
// OVERWRITE
Game_Character.prototype.turnTowardCharacter = function(character) {
    var sx = this.deltaXFrom(character.x);
    var sy = this.deltaYFrom(character.y);
	
	var absSx = Math.abs(sx);
	var absSy = Math.abs(sy);

	if (absSx == absSy) {
		if (sx < 0) {
			this._diagDir = sy > 0 ? 9 : 3;
		} else if (sx > 0) {
			this._diagDir = sy > 0 ? 7 : 1;
		}
	} else {
		this._diagDir = 0;
	};
	if (absSx > absSy) {
       	this.setDirection(sx > 0 ? 4 : 6);
    } else if (sy !== 0) {
        this.setDirection(sy > 0 ? 8 : 2);
    }
};






// If using diagonal mouse movement:

if (Galv.DM.mouseMove) {
Galv.DM.Game_Character_findDirectionTo = Game_Character.prototype.findDirectionTo;
// OVERWRITE
Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
	if ($gameSystem.disableVert) {
		return Galv.DM.Game_Character_findDirectionTo.call(this,goalX,goalY);
	} else {
		var searchLimit = this.searchLimit();
		var mapWidth = $gameMap.width();
		var nodeList = [];
		var openList = [];
		var closedList = [];
		var start = {};
		var best = start;
	
		if (this.x === goalX && this.y === goalY) {
			return 0;
		}
	
		start.parent = null;
		start.x = this.x;
		start.y = this.y;
		start.g = 0;
		start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
		nodeList.push(start);
		openList.push(start.y * mapWidth + start.x);
	
		while (nodeList.length > 0) {
			var bestIndex = 0;
			for (var i = 0; i < nodeList.length; i++) {
				if (nodeList[i].f < nodeList[bestIndex].f) {
					bestIndex = i;
				}
			}
	
			var current = nodeList[bestIndex];
			var x1 = current.x;
			var y1 = current.y;
			var pos1 = y1 * mapWidth + x1;
			var g1 = current.g;
	
			nodeList.splice(bestIndex, 1);
			openList.splice(openList.indexOf(pos1), 1);
			closedList.push(pos1);
	
			if (current.x === goalX && current.y === goalY) {
				best = current;
				goaled = true;
				break;
			}
	
			if (g1 >= searchLimit) {
				continue;
			}
	
	
			for (var j = 0; j < 9; j++) {
				var direction = 1 + j;
				
				if (direction === 5) continue;
				
				var diag = Math.abs(direction % 2) == 1;
				var dirs = Galv.DM.getHorzVertDirs(direction);
				var horz = dirs[0];
				var vert = dirs[1];
				
				if (diag && this.canPassDiagonally(x1, y1, horz, vert) && (this.canPass(x1, y1, horz) || this.canPass(x1, y1, vert))) {
					// If can go diagonally and a horizontal dir isn't blocking
					var x2 = $gameMap.roundXWithDirection(x1, horz);
					var y2 = $gameMap.roundYWithDirection(y1, vert);
				} else if (this.canPass(x1, y1, direction)) {
					var x2 = $gameMap.roundXWithDirection(x1, direction);
					var y2 = $gameMap.roundYWithDirection(y1, direction);
				} else {
					continue;
				};
	
				var pos2 = y2 * mapWidth + x2;
	
				if (closedList.contains(pos2)) {
					continue;
				}
	
				var g2 = g1 + 1;
				var index2 = openList.indexOf(pos2);
	
				if (index2 < 0 || g2 < nodeList[index2].g) {
					var neighbor;
					if (index2 >= 0) {
						neighbor = nodeList[index2];
					} else {
						neighbor = {};
						nodeList.push(neighbor);
						openList.push(pos2);
					}
					neighbor.parent = current;
					neighbor.x = x2;
					neighbor.y = y2;
					neighbor.g = g2;
					neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
					if (!best || neighbor.f - neighbor.g < best.f - best.g) {
						best = neighbor;
					}
				}
			}
		}
	
		var node = best;
		while (node.parent && node.parent !== start) {
			node = node.parent;
		}
	
		var deltaX1 = $gameMap.deltaX(node.x, start.x);
		var deltaY1 = $gameMap.deltaY(node.y, start.y);
		
		
		if (deltaY1 > 0 && deltaX1 > 0) {
			return 3;
		} else if (deltaY1 > 0 && deltaX1 < 0) {
			return 1;
		} else if (deltaY1 < 0 && deltaX1 < 0) {
			return 7;
		} else if (deltaY1 < 0 && deltaX1 > 0) {
			return 9;
		};
		
		
		if (deltaY1 > 0) {
			return 2;
		} else if (deltaX1 < 0) {
			return 4;
		} else if (deltaX1 > 0) {
			return 6;
		} else if (deltaY1 < 0) {
			return 8;
		}
	
		var deltaX2 = this.deltaXFrom(goalX);
		var deltaY2 = this.deltaYFrom(goalY);
		
		
		if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
			return deltaX2 > 0 ? 4 : 6;
		} else if (deltaY2 !== 0) {
			return deltaY2 > 0 ? 8 : 2;
		}
	
		return 0;
	};
};
};

})();