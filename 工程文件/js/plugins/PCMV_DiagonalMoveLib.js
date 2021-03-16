// PCMV_DiagonalMoveLib ver 1.0
/*:
 * @plugindesc イベントの8方向移動のためのスクリプトを追加(依存：HalfMove.js)
 * @author pcmv
 * 
 * @help HalfMove.js(トリアコンタン様)以降に読み込んでください
 */


(function(_global) {
	'use strict';
	
	var pluginName = 'PCMV_DiagonalMoveLib';
	
	
	//=============================================================================
	// Game_Map
	//  Yami_8DirEx.jsより
	//=============================================================================
	//指定した座標から目標座標の方位を返す（8方向）
    Game_Map.prototype.diagonalDistance = function(x1, y1, x2, y2) {
        var x = Math.abs(this.deltaX(x1, x2));
        var y = Math.abs(this.deltaY(y1, y2));
        return Math.min(x, y) * 3 / 2 + Math.abs(x - y);
    };
	//=============================================================================
	// Game_Character
	//  Yami_8DirEx.jsより
	//=============================================================================
    Game_Character.prototype.isMoveDiagonally = function(direction) {
        return [1, 3, 7, 9].contains(direction);
    };
    Game_Character.prototype.isMoveStraight = function(direction) {
        return [2, 4, 6, 8].contains(direction);
    };
    Game_Character.prototype.getDiagonallyMovement = function(direction) {
        var horz = 0;
        var vert = 0;
        if (direction === 1) {
            horz = 4;
            vert = 2;
        } else if (direction === 3) {
            horz = 6;
            vert = 2;
        } else if (direction === 7) {
            horz = 4;
            vert = 8;
        } else if (direction === 9) {
            horz = 6;
            vert = 8;
        }
        return [horz, vert];
    };
	//経路検索（8方向対応）
    Game_Character.prototype.findDiagonalDirectionTo = function(goalX, goalY) {
        this._goaled = false;//先にfalseにしておく //https://tm.lucky-duet.com/viewtopic.php?t=2411
        var searchLimit = this.searchLimit()
        var mapWidth = $gameMap.width();
        var nodeList = [];
        var openList = [];
        var closedList = [];
        var start = {};
        var best = start

        if (this.x === goalX && this.y === goalY) {
            return 0;
        }

        start.parent = null;
        start.x = this.x;
        start.y = this.y;
        start.g = 0;
        start.f = $gameMap.diagonalDistance(start.x, start.y, goalX, goalY);
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
                this._goaled = true;
                console.log("goaled");
                break;
            }

           if (g1 >= searchLimit) {
                continue;
            }

            for (var j = 1; j <= 9; j++) {
                if(j === 5) {
                    continue;
                }
                var directions;
                if (this.isMoveDiagonally(j)) {
                    directions = this.getDiagonallyMovement(j);
                } else { 
                    directions = [j, j];
                }
                var horz = directions[0];
                var vert = directions[1];
                var x2 = $gameMap.roundXWithDirection(x1, horz);
                var y2 = $gameMap.roundYWithDirection(y1, vert);
                var pos2 = y2 * mapWidth + x2;

                if (closedList.contains(pos2)) {
                    continue;
                }

                if (this.isMoveStraight(j)) {
                    if (!this.canPass(x1, y1, j)) {
                        continue;
                    }
                } else if (this.isMoveDiagonally(j)) {
                    if (!this.canPassDiagonally(x1, y1, horz, vert)) {
                        continue;
                    }
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
                    neighbor.f = g2 + $gameMap.diagonalDistance(x2, y2, goalX, goalY);
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
        this._tempDirectionPos = node;

        var deltaX1 = $gameMap.deltaX(node.x, start.x);
        var deltaY1 = $gameMap.deltaY(node.y, start.y);
        if (deltaY1 > 0) {
            return deltaX1 === 0 ? 2 : deltaX1 > 0 ? 3 : 1;
        } else if (deltaY1 < 0) {
            return deltaX1 === 0 ? 8 : deltaX1 > 0 ? 9 : 7;
        } else { // deltaY1 === 0
            if (deltaX1 !== 0) {
                return deltaX1 > 0 ? 6 : 4;
            }
        }

        var deltaX2 = this.deltaXFrom(goalX);
        var deltaY2 = this.deltaYFrom(goalY);
        if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
            if(deltaX2 > 0) {
                return deltaY2 === 0 ? 4 : deltaY2 > 0 ? 7 : 1;
            } else if (deltaX2 < 0) {
                return deltaY2 === 0 ? 6 : deltaY2 > 0 ? 9 : 3;
            } else { // deltaX2 === 0
                return deltaY2 === 0 ? 0 : deltaY2 > 0 ? 8 : 2;
            }
        } else {
            if (deltaY2 > 0) {
                return deltaX2 === 0 ? 8 : deltaX2 > 0 ? 7 : 9;
            } else if (deltaY2 < 0) {
                return deltaX2 === 0 ? 2 : deltaX2 > 0 ? 1 : 3;
            } else { // deltaY2 === 0
                return deltaX2 === 0 ? 0 : deltaX2 > 0 ? 4 : 6;
            }
        }
    };
	//経路検索（4方向）
	Game_Character.prototype.checkDirectionTo = function(goalX, goalY, isPlayer, optSearchLimit) {
		var routeCodeMap = [
			0, // 0 empty
			5, // 1 左下
			1, // 2 下
			6, // 3 右下
			2, // 4 左
			0, // 5 empty
			3, // 6 右
			7, // 7 左上
			4, // 8 上
			8, // 9 右上
		];
	    var result = {
	    	"isGoaled" : false,
	    	"isAdjacent" : false,
	    	"turnCount" : 0,
	    	"list" : [],
	    };
        this._goaled = false;//先にfalseにしておく //https://tm.lucky-duet.com/viewtopic.php?t=2411
	    var searchLimit = this.searchLimit();
	    if(optSearchLimit){
	    	searchLimit = optSearchLimit;
	    }
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
	        
	        if( isPlayer
	            && ( goalX-1 <= current.x && current.x <= goalX+1 )
	            && ( goalY-1 <= current.y && current.y <= goalY+1 )
	           ){
                result.isGoaled = true;
                result.isAdjacent = true;
            }

	        if (current.x === goalX && current.y === goalY) {
	            best = current;
                this._goaled = true;
                result.isGoaled = true;
                result.isAdjacent = false;
	            break;
	        }

	        if (g1 >= searchLimit) {
	            continue;
	        }

	        for (var j = 0; j < 4; j++) {
	            var direction = 2 + j * 2;
	            var x2 = $gameMap.roundXWithDirection(x1, direction);
	            var y2 = $gameMap.roundYWithDirection(y1, direction);
	            var pos2 = y2 * mapWidth + x2;

	            if (closedList.contains(pos2)) {
	                continue;
	            }
	            if (!this.canPass(x1, y1, direction)) {
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
	    var lastItem = null;
	    var prevItem = null;
	    if(node){
	        lastItem = {
	        	"x" : node.x,
	        	"y" : node.y,
	        	"f" : node.f,
	        	"g" : node.g,
	        };
	        result.list.push(lastItem);
        }
	    while (node.parent && node.parent !== start) {
	        node = node.parent;
	        lastItem = {
	        	"x" : node.x,
	        	"y" : node.y,
	        	"f" : node.f,
	        	"g" : node.g,
	        };
	        result.list.push(lastItem);
	    }
	    result.list.reverse();
	    prevItem = start;
	    for(var i=0; i < result.list.length; i++){
	    	result.list[i].toDirection = this._getDirection(result.list[i], prevItem, { "x":goalX, "y":goalY});
	    	result.list[i].routeCode = routeCodeMap[result.list[i].toDirection];
	        if( prevItem.toDirection != null && prevItem.toDirection != result.list[i].toDirection){
	        	result.turnCount++;
	        }
	    	prevItem = result.list[i];
	    }
	    console.log(result);

	    return result;
	};
	Game_Character.prototype._getDirection = function( node, start, goal ) {
	    var deltaX1 = $gameMap.deltaX(node.x, start.x);
	    var deltaY1 = $gameMap.deltaY(node.y, start.y);
	    if (deltaY1 > 0) {
	        return 2;
	    } else if (deltaX1 < 0) {
	        return 4;
	    } else if (deltaX1 > 0) {
	        return 6;
	    } else if (deltaY1 < 0) {
	        return 8;
	    }

	    var deltaX2 = this.deltaXFrom( goal.x);
	    var deltaY2 = this.deltaYFrom( goal.y);
	    if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
	        return deltaX2 > 0 ? 4 : 6;
	    } else if (deltaY2 !== 0) {
	        return deltaY2 > 0 ? 8 : 2;
	    }
	    
	    return 0;
	};

	
	//=============================================================================
	// Game_Character
	//  キャラクターも8方向を対応
	//=============================================================================
	Game_Character.prototype.searchLimit = function() {
	    return 6;
	};
    Game_Character.prototype.executeMove = function(d) {
        if (d % 2 !== 0 && d !== 5) {
            this.executeDiagonalMove(d);
        } else {
            this.moveStraight(d);
            //TODO : 条件要検証
            /*
            if (!this.isMovementSucceeded() && this.isHalfMove() &&
                paramAvoidCorner && !$gameTemp.isDestinationValid() && !$gameMap.isEventRunning()) {
                this.executeMoveRetry(d);
            }
            */
        }
    };
	Game_Character.prototype.executeMoveToPlayer = function( direction4Flag ) {
		return this.executeMoveToXY($gamePlayer.x,$gamePlayer.y, direction4Flag);
	}
	Game_Character.prototype.executeMoveToXY = function( x, y, direction4Flag ) {
		if(direction4Flag){
			this._tempDirection = this.findDirectionTo(x, y);
		}else{
			this._tempDirection = this.findDiagonalDirectionTo(x, y);
		}
		
//		this.executeMove(this._tempDirection);
//		return;
		
		//移動が成功するかを確認
		var skipFlag = false;
		var d = this._tempDirection;
		var directions;
		if (this.isMoveDiagonally(d)) {
			directions = this.getDiagonallyMovement(d);
		} else { 
			directions = [d, d];
		}
		var horz = directions[0];
		var vert = directions[1];
		
		if (this.isMoveStraight(d)) {
			if (!this.canMapPass(this.x, this.y, d)) {
				skipFlag = true;
			}
		} else if (this.isMoveDiagonally(d)) {
			if (!this.canMapPassDiagonally(this.x, this.y, horz, vert)) {
				skipFlag = true;
			}
		}
		//console.log("d = "+this._tempDirection +" skip = "+skipFlag);
//		if(this._tempDirection===0){
//			console.log("direction is 0");
//		}
		if(!skipFlag){
			this.executeMove(this._tempDirection);
		}else{
			this._waitCount = 30;
		}
		this._isExecuteMoveSkip = skipFlag;
		return skipFlag;
	}
	Game_Character.prototype.isExecuteMoveSkip = function(){
		return this._isExecuteMoveSkip;
	}
	Game_Character.prototype.isExecuteMoveColliderPlayer = function(){
		return this._isExecuteMoveColliderPlayer;
	}
	
	//プレーヤー当り判定を除きマップを通過できるかを判定
	Game_Character.prototype.canMapPass = function(x, y, d) {
		this._isExecuteMoveColliderPlayer = false;
		var x2 = $gameMap.roundXWithDirection(x, d);
		var y2 = $gameMap.roundYWithDirection(y, d);
		if (!$gameMap.isValid(x2, y2)) {
//			console.log(" isValid");
			return false;
		}
		if (this.isThrough() || this.isDebugThrough()) {
			console.log(" isThrough");
			return true;
		}
		if (!this.isMapPassable(x, y, d)) {
//			console.log(" isMapPassable");
			return false;
		}
		if($gamePlayer.x == x2 && $gamePlayer.y === y2){
//			console.log(" gamePlayer");
			this._isExecuteMoveColliderPlayer = true;
			return true;
		}
		if (this.isCollidedWithCharacters(x2, y2)) {
//			console.log(" isCollidedWithCharacters "+x2+", "+y2 +" : "+this.x+", "+this.y);
			return false;
		}
		return true;
	};
	Game_CharacterBase.prototype.canMapPassDiagonally = function(x, y, horz, vert) {
		var x2 = $gameMap.roundXWithDirection(x, horz);
		var y2 = $gameMap.roundYWithDirection(y, vert);
		if (this.canMapPass(x, y, vert) && this.canMapPass(x, y2, horz)) {
			return true;
		}
		if (this.canMapPass(x, y, horz) && this.canMapPass(x2, y, vert)) {
			return true;
		}
		return false;
	};
	
	
	
})(this);