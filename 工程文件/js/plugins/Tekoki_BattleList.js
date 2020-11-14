//=============================================================================
// Tekoki_Puzzle.js v0.3
//=============================================================================

/*:
 * @plugindesc [v0.3] 俄罗斯方块战斗界面
 * @author 手艺人工坊 （程序： NilClass）
 * 
 * @help
 * =============================================================================
 *  ______        __              __
 * /\__  _\      /\ \            /\ \      __
 * \/_/\ \/    __\ \ \/'\     ___\ \ \/'\ /\_\
 *    \ \ \  /'__`\ \ , <    / __`\ \ , < \/\ \
 *     \ \ \/\  __/\ \ \\`\ /\ \L\ \ \ \\`\\ \ \
 *      \ \_\ \____\\ \_\ \_\ \____/\ \_\ \_\ \_\
 *       \/_/\/____/ \/_/\/_/\/___/  \/_/\/_/\/_/
 *
 *
 *  __      __                 __               __
 * /\ \  __/\ \               /\ \             /\ \
 * \ \ \/\ \ \ \    ___   _ __\ \ \/'\     ____\ \ \___     ___   _____
 *  \ \ \ \ \ \ \  / __`\/\`'__\ \ , <    /',__\\ \  _ `\  / __`\/\ '__`\
 *   \ \ \_/ \_\ \/\ \L\ \ \ \/ \ \ \\`\ /\__, `\\ \ \ \ \/\ \L\ \ \ \L\ \
 *    \ `\___x___/\ \____/\ \_\  \ \_\ \_\/\____/ \ \_\ \_\ \____/\ \ ,__/
 *    '\/__//__/  \/___/  \/_/   \/_/\/_/\/___/   \/_/\/_/\/___/  \ \ \/
 *                                                                 \ \_\
 *                                                                  \/_/
 * +++ TekokiWorkshop - Tetris.js (v0.3) +++
 * https://virtual98.com/
 * =============================================================================
 * 存储数据的插件。
 * 目前还在测试阶段。
 * meameasuki！
 */

TetrisManager = TetrisManager || {};

TetrisManager.hitFlag = {};

TetrisManager.splitStatus = 0;

TetrisManager.frameCaching = {
	'testFrame4': ImageManager.loadPicture('bars/testFrame4')
}

TetrisManager.special_List = {
	'matsuri': {
		initialize: function () {
			this.bossID = 0;
		},
		create: function () {
			this.pictureBoard = new Tetris_Window(824, 0, 350, 624);
			this.pictureBoard.removeChildAt(0)
			this.picture = new Sprite();
			this.picture.bitmap = ImageManager.loadPicture('enemies/Matsuri')
			this.pictureBoard.addChild(this.picture);
			SceneManager._scene.addWindow(this.pictureBoard);
			this.skillManager = new SkillManager(['寸劲拳','草'], true);
			this.skillManager._skill_board.move(1010, 550)
			SceneManager._scene._boardLayer.addChild(this.skillManager._skill_board)
		},
		update: function () {
			this.skillManager.update();
			if (this.skillManager._skill_list[0].isPrepared) {
				this.skillManager.startSkill(0);
			}
			if (this.skillManager._skill_list[1].isPrepared) {
				this.skillManager.startSkill(1);
			}
		}
	},
	'vampire': {
		initialize: function () {
			this.bossID = 1;
			TetrisManager.hitcount = 0;
			this.timeLine = [0, 12, 13.85, 27, 28, 30, 33, 39, 41, 45, 48, 64, 71, 73, 75, 86, 94, 101, 105, 112, 115, 120]
		},
		create: function () {
			var scene = SceneManager._scene;
			var player = scene.getPlayer()
			this.enemyPos = {};
			this.enemyPos.x = scene._enemies[0].xposition;
			this.enemyPos.y = scene._enemies[0].assumeYpos;
			this.pictureBoard = new Tetris_Window(824, 0, 350, 624);
			this.pictureBoard.removeChildAt(0)
			this.picture = new Sprite();
			this.picture.bitmap = ImageManager.loadPicture('enemies/TEST')
			this.pictureBoard.addChild(this.picture);
			this.picture.opacity = 0;
			scene.addWindow(this.pictureBoard);
			this.curflag = 0;
			this.laying_count = 0;
			this.barFlag = 0;
			this.barFlag2 = 0;

			var options = {
				frame: ImageManager.loadPicture('ui/QTEPB'),
				maxLength: 400,
				maxWidth: 20
            }
			this._skillProgress = new VerticalProgressBar(100, options);
			this._skillProgress.move(1424, 50);
			scene._boardLayer.addChild(this._skillProgress);
			this._skillProgressNum = 0;

			this._skillProgress2 = new VerticalProgressBar(100, options);
			this._skillProgress2.move(1444, 50);
			scene._boardLayer.addChild(this._skillProgress2);
			this._skillProgressNum2 = 0;

			this.debugWindow = new Tetris_Window(0, 0, 100, 100);
			scene.addWindow(this.debugWindow);

			scene._placeEnemy = false;
			scene._enemies[0].running = false;

			this.revision = 0;
			this._placeSpecial = false;
		},
		onFirstUpdate: function () {
			scene = SceneManager._scene;
			this.back = new VampBack();
			scene._backgroundSprite.removeChildren();
			scene._backgroundSprite.addChild(this.back)
        },
		onStart: function () {
			var scene = SceneManager._scene
			scene._playerStateBoard.applyStates("13", 0);
			scene._enemies[0].StateBoard.applyStates("17", 0);
			//scene._playerStateBoard.applyStates("17", 0);
			this.bf = new BloodFilter();
			scene.addChild(this.bf);
        },
		update: function () {
			var time = Number(TetrisManager.getElapsedTime());
			var scene = SceneManager._scene
			var player = scene.getPlayer()
			this.debugWindow.contents.clear();
			this.debugWindow.drawText(time, 0, 0);
			//=============================================
			// 流程
			if (this.curflag == 0 && time >= this.timeLine[0]) {
				this.curflag = 1
				AudioManager.playBgm({
					name: "666",
					volume: 50,
					pitch: 100,
					pan: 0
				})
			}

			if (this.curflag == 1 && time >= this.timeLine[1] + this.revision) {
				this.curflag = 2
				scene._placeEnemy = true;
				this.back.changeFlag();
				this._placeSpecial = true;
				player.AtkType = 'recover';
			}

			if (this.curflag == 2 && time >= this.timeLine[2] + this.revision) {
				this.curflag = 3;
				TetrisManager.HarmSystem.dealDamage(scene._enemies[0], player, 0.2 * player.actor.mhp, 'real');

				this.barFlag = 1;
			}

			if (this.curflag == 3 && time >= this.timeLine[3] + this.revision) {
				this.curflag = 4;

				TetrisManager.HarmSystem.dealDamage(scene._enemies[0], player, 0.5 * player.actor.mhp, 'real');
				this.barFlag = 2;
			}

			if (this.curflag == 4 && time >= this.timeLine[4] + this.revision ){
				this.curflag = 5;
				player.next = [
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['o'][0]),
						type: 'o',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['o'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['l'][0]),
						type: 'l',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['l'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['s'][0]),
						type: 's',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['s'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['s'][0]),
						type: 's',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['s'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
				]
				for (var i = 0; i < player.next.length; i++) {
					player.next[i].block.scale.x = player.scaleX;
					player.next[i].block.scale.y = player.scaleY;
				}
				for (var i = 0; i < player.nextWindows.length; i++) {
					var shining = new ShiningPiece(120, 90);
					shining.move(
						player.xposition + TetrisManager.ROW * player.xrange + 40,
						player.yposition + TetrisManager.AboveLines * player.yrange - 5 + 90 * i)
					scene._effectLayer.addChild(shining)
				}
				scene.refreshNextWindows(player)
			}

			if (this.curflag == 5 && time >= this.timeLine[5] + this.revision) {
				this.curflag = 6;
				if (player.hold) {
					player.holdWindow.removeChild(player.hold.block)
				}
				player.hold = {
					block: new Sprite(scene._minoSkin['1'][0]),
					type: '1',
					rotation: 0,
					rotationTime: 0,
					box: TetrisManager.data['1'][0]
				};
				player.hold.block.move(scene.calPositionX(player.hold), 45)
				player.holdWindow.addChild(player.hold.block)
				scene.glowNext();

			}

			if (this.curflag == 6 && time >= this.timeLine[6] + this.revision) {
				this.curflag = 7;
				var br = new BrokenRect(player.hold.block, 100, 25);
				br.x += player.xposition - 140;
				br.y += player.yposition + TetrisManager.AboveLines * player.yrange - 5;
				scene._blockLayer.addChild(br);
				if (player.hold) {
					player.holdWindow.removeChild(player.hold.block)
				}
				player.hold = null
				scene.unglowNext();
				this.barFlag = 3;
			}

			if (this.curflag == 7 && time >= this.timeLine[7] + this.revision) {
				this.curflag = 8;
				TetrisManager.HarmSystem.dealDamage(scene._enemies[0], player, 0.2 * player.actor.mhp, 'real');
				this.barFlag = 2;
				this.barFlag2 = 3;
			}

			if (this.curflag == 8 && time >= this.timeLine[8] + this.revision) {
				this.curflag = 9;
				var index = 0;

				while (player.next[index].type == 'purples') {
					index += 1;
                }
				player.next[index] = {
					block: new Sprite(),
					type: 'purples',
					rotation: 0,
					rotationTime: 0,
					box: TetrisManager.specialBlockData['purples'][0].slice(),
					renderPos: 3,
				}

				player.next[index].block.bitmap = ImageManager.loadPicture('blockSkin/special/classic/purples');
				player.next[index].block.scale.x = player.scaleX;
				player.next[index].block.scale.y = player.scaleY;
				scene.refreshNextWindows(player);
				var shining = new ShiningPiece(120, 90);
				var nextX = player.xposition + TetrisManager.ROW * player.xrange + 40;
				var nextY = player.yposition + TetrisManager.AboveLines * player.yrange - 5 + 90 * index;
				shining.move(
					nextX,
					nextY)
				scene._effectLayer.addChild(shining)
				var trail = new SpinningBox(
					nextX - this.enemyPos.x + 60,
					nextY - this.enemyPos.y + 45
				);
				trail.move(this.enemyPos.x, this.enemyPos.y);
				scene._effectLayer.addChild(trail)

				this._skillProgressNum2 = 0
				this._skillProgress2.changeNumber(this._skillProgressNum2);
				this._skillProgress2.changeMax(100);
				this.barFlag2 = 4;
			}

			if (this.curflag == 9 && time >= this.timeLine[9] + this.revision) {
				this.curflag = 10;
				var index = 0;

				while (player.next[index].type == 'purples') {
					index += 1;
				}
				player.next[index] = {
					block: new Sprite(),
					type: 'purples',
					rotation: 0,
					rotationTime: 0,
					box: TetrisManager.specialBlockData['purples'][0].slice(),
					renderPos: 3,
				}

				player.next[index].block.bitmap = ImageManager.loadPicture('blockSkin/special/classic/purples');
				player.next[index].block.scale.x = player.scaleX;
				player.next[index].block.scale.y = player.scaleY;
				scene.refreshNextWindows(player);

				var shining = new ShiningPiece(120, 90);
				var nextX = player.xposition + TetrisManager.ROW * player.xrange + 40;
				var nextY = player.yposition + TetrisManager.AboveLines * player.yrange - 5 + 90 * index;
				shining.move(
					nextX,
					nextY)
				scene._effectLayer.addChild(shining)
				var trail = new SpinningBox(
					nextX - this.enemyPos.x + 60,
					nextY - this.enemyPos.y + 45
				);
				trail.move(this.enemyPos.x, this.enemyPos.y);
				scene._effectLayer.addChild(trail)

				this._skillProgressNum2 = 0
				this._skillProgress2.changeNumber(this._skillProgressNum2);
				this._skillProgress2.changeMax(100);
				this.barFlag2 = 5;
			}

			if (this.curflag == 10 && time >= this.timeLine[10] + this.revision) {
				this.curflag = 11;
				var index = 0;

				while (player.next[index].type == 'purples') {
					index += 1;
				}
				player.next[index] = {
					block: new Sprite(),
					type: 'purples',
					rotation: 0,
					rotationTime: 0,
					box: TetrisManager.specialBlockData['purples'][0].slice(),
					renderPos: 3,
				}

				player.next[index].block.bitmap = ImageManager.loadPicture('blockSkin/special/classic/purples');
				player.next[index].block.scale.x = player.scaleX;
				player.next[index].block.scale.y = player.scaleY;
				scene.refreshNextWindows(player);

				var shining = new ShiningPiece(120, 90);
				var nextX = player.xposition + TetrisManager.ROW * player.xrange + 40;
				var nextY = player.yposition + TetrisManager.AboveLines * player.yrange - 5 + 90 * index;
				shining.move(
					nextX,
					nextY)
				scene._effectLayer.addChild(shining)
				var trail = new SpinningBox(
					nextX - this.enemyPos.x + 60,
					nextY - this.enemyPos.y + 45
				);
				trail.move(this.enemyPos.x, this.enemyPos.y);
				scene._effectLayer.addChild(trail)

				this.barFlag2 = 2;
			}

			if (this.curflag == 11 && time >= this.timeLine[11] + this.revision) {
				this.curflag = 12;
				this.barFlag = 4;
			}

			if (this.curflag == 12 && time >= this.timeLine[12] + this.revision) {
				this.curflag = 13;
				this.barFlag2 = 1;
			}

			if (this.curflag == 13 && time >= this.timeLine[13] + this.revision) {
				this.curflag = 14;
				for (var i = 0; i < 3; i++) {
					var block = new Sprite();
					block.bitmap = ImageManager.loadPicture('blockSkin/special/classic/six');
					block.scale.x = player.scaleX;
					block.scale.y = player.scaleY;
					var nextX = player.xposition + TetrisManager.ROW * player.xrange + 40;
					var nextY = player.yposition + TetrisManager.AboveLines * player.yrange - 5 + 90 * i;
					var trail = new RotatingEnlargeningPart(block, [this.enemyPos.x, this.enemyPos.y], [nextX, nextY], 120,
						function () { this.s.destroy(); }, 0);
					scene._effectLayer.addChild(trail);
				}
            }

			if (this.curflag == 14 && time >= this.timeLine[14] + this.revision) {
				this.curflag = 15;
				this.barFlag2 = 2;
				for (var i = 0; i < 3; i++) {
					player.next[i] = {
						block: new Sprite(),
						type: 'six',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.specialBlockData['six'][0].slice(),
						renderPos: 3,

					}
					player.next[i].block.bitmap = ImageManager.loadPicture('blockSkin/special/classic/six');
					player.next[i].block.scale.x = player.scaleX;
					player.next[i].block.scale.y = player.scaleY;
					var shining = new ShiningPiece(120, 90);
					var nextX = player.xposition + TetrisManager.ROW * player.xrange + 40;
					var nextY = player.yposition + TetrisManager.AboveLines * player.yrange - 5 + 90 * i;
					shining.move(
						nextX,
						nextY)
					scene._effectLayer.addChild(shining)
					//var trail = new SpinningBox(
					//	nextX - this.enemyPos.x+60,
					//	nextY - this.enemyPos.y+45,
					//	0xff0000
					//);
					//trail.move(this.enemyPos.x, this.enemyPos.y);
					//scene._effectLayer.addChild(trail)
				}
				scene.refreshNextWindows(player)
			};

			if (this.curflag == 15 && time >= this.timeLine[15] + this.revision) {
				this.curflag = 16;
				TetrisManager.splitStatus = 1;
				this.barFlag = 2;
			}

			if (this.curflag == 16 && time >= this.timeLine[16] + this.revision) {
				this.curflag = 17;
				player.next = [
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['o'][0]),
						type: 'o',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['o'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['l'][0]),
						type: 'l',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['l'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['s'][0]),
						type: 's',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['s'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['s'][0]),
						type: 's',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['s'][0].slice(),
					},
					{
						block: new Sprite(scene._minoSkin['j'][0]),
						type: 'j',
						rotation: 0,
						rotationTime: 0,
						box: TetrisManager.data['j'][0].slice(),
					},
				]
				for (var i = 0; i < player.next.length; i++) {
					player.next[i].block.scale.x = player.scaleX;
					player.next[i].block.scale.y = player.scaleY;
				}
				for (var i = 0; i < player.nextWindows.length; i++) {
					var shining = new ShiningPiece(120, 90);
					shining.move(
						player.xposition + TetrisManager.ROW * player.xrange + 40,
						player.yposition + TetrisManager.AboveLines * player.yrange - 5 + 90 * i)
					scene._effectLayer.addChild(shining)
				}
				scene.refreshNextWindows(player)

				if (player.hold) {
					player.holdWindow.removeChild(player.hold.block)
				}
				player.hold = {
					block: new Sprite(scene._minoSkin['1'][0]),
					type: '1',
					rotation: 0,
					rotationTime: 0,
					box: TetrisManager.data['1'][0]
				};
				player.hold.block.move(scene.calPositionX(player.hold), 45)
				player.holdWindow.addChild(player.hold.block)
				scene.glowNext();

				this.barFlag = 5;

			}

			if (this.curflag == 17 && time >= this.timeLine[17] + this.revision) {
				this.curflag = 18;
				var br = new BrokenRect(player.hold.block, 100, 25);
				br.x += player.xposition - 140;
				br.y += player.yposition + TetrisManager.AboveLines * player.yrange - 5;
				scene._blockLayer.addChild(br);
				if (player.hold) {
					player.holdWindow.removeChild(player.hold.block)
				}
				player.hold = null
				scene.unglowNext();

				this._skillProgressNum = 0
				this._skillProgress.changeNumber(this._skillProgressNum);
				this._skillProgress.changeMax(100);
				this.barFlag = 6;

				TetrisManager.HarmSystem.dealDamage(scene._enemies[0], player, 0.2 * player.actor.mhp, 'real');
			}

			if (this.curflag == 18 && time >= this.timeLine[18] + this.revision) {
				this.curflag = 19;
				this.barFlag = 2;
				TetrisManager.HarmSystem.dealDamage(scene._enemies[0], player, 0.08 * player.actor.mhp, 'real');
			}

			if (this.curflag == 19 && time >= this.timeLine[19] + this.revision) {
				this.curflag = 20;
				this._qteBoard = new QTEBoard(['up', 'right', 'down', 'left']);
				this._qteBoard.move(500, 312);
				scene._upperLayer.addChild(this._qteBoard);
				this._qteM = new QTEManager(
					[{ type: 'up', duration: 1 }, { type: 'right', duration: 1 }],
					function () {
						TetrisManager.hitcount += 24;
					},
					this._qteBoard
				);
				scene.addChild(this._qteM)
				this._qteM._progressBar.move(500, 295);
				scene._upperLayer.addChild(this._qteM._progressBar);
			}

			if (this.curflag == 20 && time >= this.timeLine[20] + this.revision) {
				this.curflag = 21;
				var c = [{ type: 'up', duration: 1 }, { type: 'right', duration: 1 }, { type: 'down', duration: 1 }];
				this._qteM.reset(c, function () {
					TetrisManager.hitcount += 5;
				});
			}

			if (this.curflag == 21 && time >= this.timeLine[21] + this.revision) {
				this.curflag = 22;
				this.back.changeFlag();
				AudioManager.fadeOutBgm(1);
				player.running = false;
				this.s = -10;
				TetrisManager.splitStatus = 2;
			}

			if (this.curflag == 22) {
				this.s += 0.1;
				this.pictureBoard.y += this.s
				this.pictureBoard.x += 0.5;
				scene.removeChild(this._qteM)
				scene._upperLayer.removeChild(this._qteM._progressBar);
				scene._upperLayer.removeChild(this._qteBoard);
            }

			// 流程
			//=============================================

			switch (this.barFlag) {
				case 1:
					this._skillProgressNum = ((time - this.revision - this.timeLine[2]) / (this.timeLine[3] - this.timeLine[2]))*100;
					this._skillProgress.changeNumber(this._skillProgressNum);
					break;
				case 2:
					this._skillProgressNum = 0
					this._skillProgress.changeNumber(this._skillProgressNum);
					this._skillProgress.changeMax(100);
					this.barFlag = 0;
					break;
				case 3:
					this._skillProgressNum = ((time - this.revision - this.timeLine[6]) / (this.timeLine[7] - this.timeLine[6])) * 100
					this._skillProgress.changeNumber(this._skillProgressNum);
					break;
				case 4:
					this._skillProgressNum = ((time - this.revision - this.timeLine[11]) / (this.timeLine[15] - this.timeLine[11])) * 100;
					this._skillProgress.changeNumber(this._skillProgressNum);
					break;
				case 5:
					this._skillProgressNum = ((time - this.revision - this.timeLine[16]) / (this.timeLine[17] - this.timeLine[16])) * 100;
					this._skillProgress.changeNumber(this._skillProgressNum);
					break;
				case 6:
					this._skillProgressNum = ((time - this.revision - this.timeLine[17]) / (this.timeLine[18] - this.timeLine[17])) * 100;
					this._skillProgress.changeNumber(this._skillProgressNum);
					break;
			}

			switch (this.barFlag2) {
				case 1:
					this._skillProgressNum2 = ((time - this.revision - this.timeLine[12]) / (this.timeLine[14] - this.timeLine[12])) * 100;
					this._skillProgress2.changeNumber(this._skillProgressNum2);
					break;
				case 2:
					this._skillProgressNum2 = 0
					this._skillProgress2.changeNumber(this._skillProgressNum2);
					this._skillProgress2.changeMax(100);
					this.barFlag2 = 0;
					break;
				case 3:
					this._skillProgressNum2 = ((time - this.revision - this.timeLine[7]) / (this.timeLine[8] - this.timeLine[7])) * 100;
					this._skillProgress2.changeNumber(this._skillProgressNum2);
					break;
				case 4:
					this._skillProgressNum2 = ((time - this.revision - this.timeLine[8]) / (this.timeLine[9] - this.timeLine[8])) * 100;
					this._skillProgress2.changeNumber(this._skillProgressNum2);
					break;
				case 5:
					this._skillProgressNum2 = ((time - this.revision - this.timeLine[9]) / (this.timeLine[10] - this.timeLine[9])) * 100;
					this._skillProgress2.changeNumber(this._skillProgressNum2);
					break;

            }

			if (this._placeSpecial) {
				this.laying_count += 1;
				if (this.laying_count <= 50 - 10) {
					var n = (624 + 10) / (50 - 10)
					this._skillProgress.x -= n;
					this._skillProgress2.x -= n;
					//this.skillManager._skill_board.x -= n;
					this.picture.opacity += 10;
				} else {
					this._skillProgress.x += 1;
					this._skillProgress2.x += 1;
					//this.skillManager._skill_board.x += 1;
				}

				if (this.laying_count >= 50) {
					this._placeSpecial = false;
				}
			}

			if (TetrisManager.hitcount > 0) {
				TetrisManager.hitcount -= 1;
				TetrisManager.HarmSystem.dealDamage(scene._enemies[0], player, 0.01 * player.actor.mhp, 'real');
			}

			if (time >= 14 && scene._enemies[0].curHp>0) {
				scene._enemies[0].curHp = (1 - (time - this.revision - this.timeLine[2]) / (this.timeLine[21] - this.timeLine[2])) * scene._enemies[0].Mhp;
            }

		}
	},
	'tutorial': {
		initialize: function () {
			this.bossID = 2;
			this.scene = SceneManager._scene;
			this.emphasizer_flag = false;
		},
		create: function () {
			
		},
		update: function () {
			if (this.emphasizer_flag) {
				if (Input.isTriggered('ok')) {
					this.emphasizer_flag = false;
                }
            }
		},
		addEmphasizer: function (text, x, y, width, height) {
			this.emphasizer = new Emphasizer(text, x, y, width, height);
			this.scene.addChild(this.emphasizer);
		},
		delEmphasizer: function () {
			this.scene.removeChild(this.emphasizer);
        }
	},
}

//特殊方块系统
TetrisManager.specialBlockData = {
	'grass': [
		[
			[0, 0, 0, 0, 0],
			[0, 2, 0, 2, 0],
			[2, 2, 2, 2, 2],
			[0, 2, 0, 2, 0],
			[2, 2, 2, 2, 2],
			[2, 0, 0, 0, 2],
			[2, 2, 2, 2, 2],
			[2, 0, 0, 0, 2],
			[2, 2, 2, 2, 2],
			[0, 0, 2, 0, 0],
			[2, 2, 2, 2, 2],
			[0, 0, 2, 0, 0],
			[0, 0, 2, 0, 0]
		]
	],
	'purples': [
		[
			[0, 0, 0],
			[0, 5, 0],
			[0, 5, 0],
			[0, 5, 0],
			[0, 5, 0],
			[5, 5, 5],
			[0, 5, 0],
		],
		[
			[0, 0, 0, 0, 0, 0],
			[0, 5, 0, 0, 0, 0],
			[5, 5, 5, 5, 5, 5],
			[0, 5, 0, 0, 0, 0],
		],
		[
			[0, 0, 0],
			[0, 5, 0],
			[5, 5, 5],
			[0, 5, 0],
			[0, 5, 0],
			[0, 5, 0],
			[0, 5, 0],
		],
		[
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 5, 0],
			[5, 5, 5, 5, 5, 5],
			[0, 0, 0, 0, 5, 0],
		],
	],
	'six': [
		[
			[0, 0, 0],
			[3, 3, 3],
			[3, 0, 0],
			[3, 3, 3],
			[3, 0, 3],
			[3, 3, 3],
		],
		[
			[0, 0, 0, 0, 0],
			[3, 3, 3, 3, 3],
			[3, 0, 3, 0, 3],
			[3, 3, 3, 0, 3],
		],
		[
			[0, 0, 0],
			[3, 3, 3],
			[3, 0, 3],
			[3, 3, 3],
			[0, 0, 3],
			[3, 3, 3],
		],
		[
			[0, 0, 0, 0, 0],
			[3, 0, 3, 3, 3],
			[3, 0, 3, 0, 3],
			[3, 3, 3, 3, 3],
		],
	]
}

TetrisManager.specialRuleSet = {
	'purples': {
		'-3': [[0, 3], [0, 0]],
		'-2': [[0, 0], [3, 0]],
		'-1': [[-3, 0], [-3, 3]],
		'0': [[3, -3], [0, -3]],
		'1': [[0, 3], [0, 0]],
		'2': [[0, 0], [3, 0]],
		'3': [[-3, 0], [-3, 3]]
	},
	"six": {
		'-3': [[-2, 1], [-2, 1]],
		'-2': [[2, -1], [2, -1]],
		'-1': [[-2, 1], [-2, 1]],
		'0': [[2, -1], [2, -1]],
		'1': [[-2, 1], [-2, 1]],
		'2': [[2, -1], [2, -1]],
		'3': [[-2, 1], [-2, 1]]
    }
}

TetrisManager.specialKick = {
	"1to2": [[0, 0], [1, 0], [-1, 0], [0, 1], [1, 1], [-1, 1], [2, 0], [-2, 0], [0, 2], [3, 0], [-3, 0], [0, 3], [0, -1], [0, -2], [0, -3]],
	"2to1": [[0, 0], [-1, 0], [1, 0], [0, 1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, 2], [-3, 0], [3, 0], [0, 3], [0, -1], [0, -2], [0, -3]],
	"2to3": [[0, 0], [1, 0], [-1, 0], [0, 1], [1, 1], [-1, 1], [2, 0], [-2, 0], [0, 2], [3, 0], [-3, 0], [0, 3], [0, -1], [0, -2], [0, -3]],
	"3to2": [[0, 0], [-1, 0], [1, 0], [0, 1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, 2], [-3, 0], [3, 0], [0, 3], [0, -1], [0, -2], [0, -3]],
	"3to4": [[0, 0], [1, 0], [-1, 0], [0, 1], [1, 1], [-1, 1], [2, 0], [-2, 0], [0, 2], [3, 0], [-3, 0], [0, 3], [0, -1], [0, -2], [0, -3]],
	"4to3": [[0, 0], [-1, 0], [1, 0], [0, 1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, 2], [-3, 0], [3, 0], [0, 3], [0, -1], [0, -2], [0, -3]],
	"4to1": [[0, 0], [1, 0], [-1, 0], [0, 1], [1, 1], [-1, 1], [2, 0], [-2, 0], [0, 2], [3, 0], [-3, 0], [0, 3], [0, -1], [0, -2], [0, -3]],
	"1to4": [[0, 0], [-1, 0], [1, 0], [0, 1], [-1, 1], [1, 1], [-2, 0], [2, 0], [0, 2], [-3, 0], [3, 0], [0, 3], [0, -1], [0, -2], [0, -3]],
}

var EmptySlot = [];

var TwoSlimes = [
	{
		name: "Slime",
		category: "enemy",
		xposition: 825,
		yposition: 84,
		assumeYpos: 84,
		//avatar: new Sprite(),
		avatarName: "Slime_Avatar",
		dx: 420,
		dy: 200,

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 12,
		yrange: 12,
	},
	{
		name: "Slime",
		category: "enemy",
		xposition: 1020,
		yposition: 276,
		assumeYpos: 276,
		//avatar: new Sprite(),
		avatarName: "Slime_Avatar",
		dx: 600,
		dy: 300,

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 12,
		yrange: 12,
	}
]

var FourKnights = [
	{
		name: "Knight",
		category: "enemy",
		xposition: 832,
		yposition: 84,
		assumeYpos: 84,
		avatar: new Sprite(),
		avatarName: "Knight_Avatar",

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,
	},
	{
		name: "Knight",
		category: "enemy",
		xposition: 1032,
		yposition: 84,
		assumeYpos: 84,
		avatar: new Sprite(),
		avatarName: "Knight_Avatar",

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,
	},
	{
		name: "Knight",
		category: "enemy",
		xposition: 832,
		yposition: 84,
		assumeYpos: 384,
		avatar: new Sprite(),
		avatarName: "Knight_Avatar",

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,
	},
	{
		name: "Knight",
		category: "enemy",
		xposition: 1032,
		yposition: 84,
		assumeYpos: 384,
		avatar: new Sprite(),
		avatarName: "Knight_Avatar",

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,
	}
]

var Enemy99 = [
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 70,
		assumeYpos: 70,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 70,
		assumeYpos: 70,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 70,
		assumeYpos: 70,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 70,
		assumeYpos: 70,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 178,
		assumeYpos: 178,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 178,
		assumeYpos: 178,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 178,
		assumeYpos: 178,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 178,
		assumeYpos: 178,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 286,
		assumeYpos: 286,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 286,
		assumeYpos: 286,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 286,
		assumeYpos: 286,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 286,
		assumeYpos: 286,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 830,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 920,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1010,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},
	{
		name: "Shrimp",
		category: "enemy",
		xposition: 1100,
		yposition: 502,
		assumeYpos: 502,
		avatar: new Sprite(),
		avatarName: "Shrimp_Avatar",

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 1,
		yrange: 1,
		windowHeight_Revision: 20
	},

]

var TestBoss = [
	{
		name: "Matsuri",
		category: "enemy",
		xposition: 824,
		yposition: 394,
		assumeYpos: 394,
		avatar: new Sprite(),
		avatarName: "Matsuri_Avatar",

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 1000,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,

		manager: Object.create(TetrisManager.special_List["matsuri"])
	},
]

var Vampire = [
	{
		name: "Vampire",
		category: "enemy",
		xposition: 824,
		yposition: 580,
		assumeYpos: 580,
		avatar: new Sprite(),
		avatarName: "Blank_Avatar",

		level: 3,
		curHp: 0,
		displayHp: 0,
		Mhp: 1000,
		atk: 0,
		def: 0,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 9,
		yrange: 9,

		manager: Object.create(TetrisManager.special_List["vampire"]),
		NoAi: true,
		updateAfterDeath: true,
		pic_pos: [1000, 300],
		gaugeWidth: 300,
		AtkAnim: null
	},
]

var Tutorial = [
	{
		name: "Slime",
		category: "enemy",
		xposition: 825,
		yposition: 84,
		assumeYpos: 84,
		avatarName: "Slime_Avatar",
		dx: 420,
		dy: 200,

		level: 1,
		curHp: 0,
		displayHp: 0,
		Mhp: 200,
		atk: 35,
		def: 20,
		curEng: 0,
		MEng: 30,
		EngSpd: 2,

		Gold: 20,
		Exp: 20,

		xrange: 12,
		yrange: 12,
		manager: Object.create(TetrisManager.special_List["tutorial"]),
	}
]

TetrisManager.enemy_List = [
	EmptySlot,
	TwoSlimes,
	FourKnights,
	Enemy99,
	TestBoss,
	Vampire
]

TetrisManager.skill_List = {
	"T旋之魂": {
		name: "T旋之魂",
		pic: "剑",
		user: "player",
		isPrepared: true,
		oldTime: 0,
		CD: 0,
		description: "将接下来的方块全部替换为T块",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var player = SceneManager._scene.getPlayer();
			this.SpinBoxes = []
			var sx = SceneManager._scene.getSkillPosition(this.index)[0];
			var sy = SceneManager._scene.getSkillPosition(this.index)[1];
			for (var i = 0; i < player.nextWindows.length; i++) {
				var s = new SpinningBox(player.nextWindows[i].x - sx + 25, player.nextWindows[i].y - sy + 25);

				s.move(sx, sy)
				this.SpinBoxes.push(s);
				SceneManager._scene._effectLayer.addChild(this.SpinBoxes[this.SpinBoxes.length-1])
			}

			var scene = SceneManager._scene
			var player = scene.getPlayer();
			for (var i = 0; i < player.next.length; i++) {
				player.next[i] = {
					block: new Sprite(),
					type: 't',
					rotation: 0,
					rotationTime: 0,
					box: TetrisManager.data['t'][0].slice()
				}
				player.next[i].block.bitmap = scene._minoSkin['t'][0];
				player.next[i].block.scale.x = player.scaleX;
				player.next[i].block.scale.y = player.scaleY;
			}
			scene.refreshNextWindows(player)

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 2;
			this.oldTime = Date.now();
		}
	},
	"咩毒": {
		name: "咩毒",
		pic: "咩毒",
		user: "player",
		isPrepared: true,
		CD: 0,
		description: "测试用技能(中毒)",
		CanUse: function () {
			if (SceneManager._scene.getPlayer().actor.hp > 10) {
				return true
            }
        },
		MakeEffect: function () {
			var Venom = new MeaDoku(this.index);
			SceneManager._scene.addChild(Venom);
		},
		Reset: function () {
			//this.isPrepared = false;
			//this.CD = 0;
			//this.oldTime = Date.now();
        }
    },
	"寸劲拳": {
		name: "寸劲拳",
		pic: "占位测试",
		user: "enemy",
		isPrepared: false,
		CD: 15,
		description: "打打打打打打打打打打！",
		oldTime: Date.now(),
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			this.allHolePositions = [
				[4, 38],[5, 38],
				[3, 37], [4, 37], [5, 37], [6, 37],
				[2, 36], [3, 36], [4, 36], [5, 36], [6, 36], [7, 36],
				[2, 35], [3, 35], [4, 35], [5, 35], [6, 35], [7, 35],
				[2, 34], [3, 34], [4, 34], [5, 34], [6, 34], [7, 34],
				[3, 33], [4, 33], [5, 33], [6, 33],
				[4, 32], [5, 32]
			]
			for (var i = 0; i < this.allHolePositions.length; i++) {
				scene.getPlayer().field[this.allHolePositions[i][1]][this.allHolePositions[i][0]] = 0;
			}
			scene.drawArea(scene.getPlayer())
			scene.shadow(scene.getPlayer());
			scene.createXYanimationWindow(1,
				scene.getPlayer().xposition + 5 * scene.getPlayer().xrange,
				scene.getPlayer().yposition + TetrisManager.AboveLines * scene.getPlayer().yrange + 20 * scene.getPlayer().yrange
			);
		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 15;
			this.oldTime = Date.now();
		}
	},
	"草": {
		name: "草",
		pic: "占位测试",
		user: "enemy",
		isPrepared: false,
		CD: 30,
		description: "wwwwwwwww",
		oldTime: Date.now(),
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer();
			player.next[0] = {
				block: new Sprite(),
				type: 'grass',
				rotation: 0,
				rotationTime: 0,
				box: TetrisManager.specialBlockData['grass'][0].slice(),
				renderPos: 2,
				noRotate: true
			}

			player.next[0].block.bitmap = ImageManager.loadPicture('blockSkin/special/classic/grass');
			player.next[0].block.scale.x = player.scaleX;
			player.next[0].block.scale.y = player.scaleY;
			scene.refreshNextWindows(player)

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 30;
			this.oldTime = Date.now();
		}
	},
	"战术嘲讽": {
		name: "战术嘲讽",
		pic: "占位测试",
		user: "player",
		isPrepared: true,
		oldTime: 0,
		CD: 0,
		description: "",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer();
			scene._enemies[scene.getPlayer().TargetIndex].StateBoard.applyStates("7", 10);
			
		},
		Reset: function () {
		}
	},
	"测试技能": {
		name: "测试技能",
		pic: "占位测试",
		user: "player",
		isPrepared: true,
		oldTime: 0,
		CD: 0,
		description: "",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {

			var scene = SceneManager._scene
			var player = scene.getPlayer();
			player.field = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			]
			scene.drawArea(player);
		},
		Reset: function () {
		}
	},
	"痛苦分裂": {
		name: "痛苦分裂",
		pic: "占位测试",
		user: "enemy",
		isPrepared: true,
		oldTime: 0,
		CD: 0,
		description: "",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			var s = new Split();
			scene.addChild(s)

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 12;
			this.oldTime = Date.now();
		}
	},
	"鲜血之触": {
		name: "鲜血之触",
		pic: "占位测试",
		user: "enemy",
		isPrepared: false,
		oldTime: 0,
		CD: 10,
		description: "",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer();

			TetrisManager.HarmSystem.dealDamage(null, player, player.actor.hp / 2, 'real');

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 12;
			this.oldTime = Date.now();
		}
	},
	"定式下落": {
		name: "定式下落",
		pic: "占位测试",
		user: "enemy",
		isPrepared: false,
		oldTime: 0,
		CD: 10,
		description: "",
		CanUse: function () {
			return true
		},
		MakeEffect: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer();

		},
		Reset: function () {
			this.isPrepared = false;
			this.CD = 12;
			this.oldTime = Date.now();
		}
	},
}

TetrisManager.state_List = {
	"1": {
		id: 1,
		count: 0,
		type: 'out_battle',
		updated: false,
		onGain: function (owner) {
		},
		update: function () {
		},
		onLose: function () {
		}
    },
	"4": {
		name: '中毒',
		id: 4,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			if (this.owner.category == 'enemy') {
				if (!this.emitter) {
					TetrisManager.pariticleSet['Bubble']["spawnRect"]["w"] = this.owner.xrange * 10 + 65;
					this.emitter = new particleEmitter('Bubble', ['Bubble']);
					this.emitter.x = this.owner.xposition - 15 - 7;
					if (this.owner.windowHeight_Revision) {
						this.emitter.y = this.owner.assumeYpos + 23 * this.owner.yrange + this.owner.windowHeight_Revision
					} else {
						this.emitter.y = this.owner.assumeYpos + 23 * this.owner.yrange
					}
					SceneManager._scene._effectLayer.addChild(this.emitter)
				} else {
					this.emitter._emitter.emit = true;
				}
				this.owner.StateBoard.setAvatarTint(this.id, 0xff99ff);
            }
		},
		update: function () {

			if (((Date.now() - this.oldTime) / 1000) > 1) {
				TetrisManager.HarmSystem.dealDamage(null, this.owner, this.count, 'poison')
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(4);
            }
		},
		onLose: function () {
			if (this.owner.category == 'enemy') {
				this.emitter._emitter.emit = false;
				this.owner.StateBoard.removeAvatarTint(this.id);
			}
		}
	},
	"8": {
		name: '眩晕',
		id: 8,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			if (this.owner.category == "enemy") {
				this.owner.running = false;
			} else {
				SceneManager._scene.getPlayer().running = false;
			}
		},
		update: function () {
			if (((Date.now() - this.oldTime) / 1000) > 1) {
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(8);
			}
		},
		onLose: function () {
			if (this.owner.category == "enemy") {
				this.owner.running = true;
			} else {
				SceneManager._scene.getPlayer().running = true;
			}
		}
	},
	"7": {
		name: '愤怒',
		id: 7,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			this.owner.Be_Damaged_mag = this.owner.Be_Damaged_mag*1.5
			if (this.owner.category == 'enemy') {
				this.owner.MEng = this.owner.MEng * 0.5;
				if (!this.emitter) {
					if (this.owner.windowHeight_Revision) {
						var r = this.owner.windowHeight_Revision;
					} else {
						var r = 0;
					}
					TetrisManager.pariticleSet['Angry']["spawnRect"]["w"] = this.owner.xrange * 10 + 65;
					TetrisManager.pariticleSet['Angry']["spawnRect"]["h"] = this.owner.yrange * 23 + 24 + r;
					this.emitter = new particleEmitter('Angry', ['Angry_0', 'Angry_1', 'Angry_2']);
					this.emitter.x = this.owner.xposition - 15 - 7
					this.emitter.y = this.owner.assumeYpos - 28
					SceneManager._scene._effectLayer.addChild(this.emitter)
				} else {
					this.emitter._emitter.emit = true;
				}
				this.owner.StateBoard.setAvatarTint(this.id, 0xff99ff);
			} else {
				this.owner.AtkFreq = this.owner.AtkFreq * 0.5;
            }
		},
		update: function () {
			if (((Date.now() - this.oldTime) / 1000) > 1) {
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(7);
			}
		},
		onLose: function () {
			if (this.owner.category == 'enemy') {
				this.emitter._emitter.emit = false;
				this.owner.StateBoard.removeAvatarTint(this.id);
				this.owner.MEng = this.owner.MEng / 0.5;
			} else {
				this.owner.AtkFreq = this.owner.AtkFreq / 0.5;
            }
			this.owner.Be_Damaged_mag = this.owner.Be_Damaged_mag/1.5
		}
	},
	"13": {
		name: '分裂',
		id: 13,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			//===================================================================================
			// 覆写的方法：
			// refreshPlayerWindow
			// addToMainWindow
			// removeFromMainWindow
			// addEffect
			// drawArea
			//===================================================================================
			var scene = SceneManager._scene
			var player = scene.getPlayer();
			scene._splite1 = {};
			scene._splite2 = {};


			this.protoX = player.xposition - 15 - 7;
			this.protoY = 0
				//player.yposition + TetrisManager.AboveLines * player.yrange - 27;
			this.protoWidth = (TetrisManager.ROW * player.xrange + 65) / 2;

			scene._splite1.pack = new Sprite();
			scene._splite1.pack.move(this.protoX, this.protoY);
			scene._midLayer.addChild(scene._splite1.pack)

			scene._splite1.mask = new PIXI.Graphics();
			scene._splite1.mask.beginFill(0x000000);
			scene._splite1.mask.drawRect(
				0,
				0,
				this.protoWidth,
				624
			);
			scene._splite1.mask.endFill();
			scene._splite1.pack.addChild(scene._splite1.mask)

			scene._splite2.pack = new Sprite();
			scene._splite2.pack.move(this.protoX, this.protoY);
			scene._midLayer.addChild(scene._splite2.pack)

			scene._splite2.mask = new PIXI.Graphics();
			scene._splite2.mask.beginFill(0x000000);
			scene._splite2.mask.drawRect(
				this.protoWidth,
				0,
				this.protoWidth,
				624
			);
			scene._splite2.mask.endFill();
			scene._splite2.pack.addChild(scene._splite2.mask)

			scene.removeWindow(scene.getPlayer().mainwindow);
			//===================================================================================
			TetrisManager.Temps.Tetris_refreshPlayerWindow = Scene_Tetris.prototype.refreshPlayerWindow;
			Scene_Tetris.prototype.refreshPlayerWindow = function (operator) {
				if (this._playermainwindow1) {
					var tempY1 = this._playermainwindow1.y;
					var tempX1 = this._playermainwindow1.x;
					var tempRot1 = this._playermainwindow1.rotation;
					scene._splite1.pack.removeChild(this._playermainwindow1);
				}

				if (this._playermainwindow2) {
					var tempY2 = this._playermainwindow2.y;
					var tempX2 = this._playermainwindow2.x;
					var tempRot2 = this._playermainwindow2.rotation;
					scene._splite2.pack.removeChild(this._playermainwindow2);
				}
				//===================================================================================
				operator.mainwindow = new Tetris_Window(
					operator.xposition - 15 - 7,
					operator.yposition + TetrisManager.AboveLines * operator.yrange - 27,
					this.ROW * operator.xrange + 65,
					(this.COL - TetrisManager.AboveLines) * operator.yrange
				);
				operator.mainwindow.drawVerticalGauge(
					265,
					10,
					10,
					(this.COL - TetrisManager.AboveLines) * operator.yrange,
					operator.gaugeSCORE / this.player.AtkFreq, operator.mainwindow.hpGaugeColor1(),
					operator.mainwindow.hpGaugeColor1()
				);
				for (var i = 0; i <= this.ROW; i++) {
					operator.mainwindow.contents.drawLine(
						i * operator.xrange + 5,
						0,
						i * operator.xrange + 5,
						(this.COL - TetrisManager.AboveLines) * operator.yrange
					);
				}
				for (var i = 0; i <= this.COL; i++) {
					operator.mainwindow.contents.drawLine(
						4,
						i * operator.yrange - 14,
						this.ROW * operator.yrange + 4,
						i * operator.yrange - 14
					);
				}
				//===================================================================================
				this._playermainwindow1 = new Tetris_Window(
					tempX1 || 0,
					//operator.xposition - 15 - 7,
					tempY1 || (operator.yposition + TetrisManager.AboveLines * operator.yrange - 27),
					this.ROW * operator.xrange + 65,
					(this.COL - TetrisManager.AboveLines) * operator.yrange
				);
				this._playermainwindow1.drawVerticalGauge(
					265,
					10,
					10,
					(this.COL - TetrisManager.AboveLines) * operator.yrange,
					operator.gaugeSCORE / this.player.AtkFreq, operator.mainwindow.hpGaugeColor1(),
					operator.mainwindow.hpGaugeColor1()
				);
				for (var i = 0; i <= this.ROW; i++) {
					this._playermainwindow1.contents.drawLine(
						i * operator.xrange + 5,
						0,
						i * operator.xrange + 5,
						(this.COL - TetrisManager.AboveLines) * operator.yrange
					);
				}
				for (var i = 0; i <= this.COL; i++) {
					this._playermainwindow1.contents.drawLine(
						4,
						i * operator.yrange - 14,
						this.ROW * operator.yrange + 4,
						i * operator.yrange - 14
					);
				}
				if (operator.cur && operator.cur.block) {
					this._splite1.block = TetrisManager.simpleCopySprite(operator.cur.block);
					this._playermainwindow1.addChild(this._splite1.block)
				}

				if (operator.shadowImage) {
					this._splite1.shadow = TetrisManager.simpleCopySprite(operator.shadowImage.block);
					this._playermainwindow1.addChild(this._splite1.shadow)
				}
				if (tempRot1) {
					this._playermainwindow1.rotation = tempRot1
                }
				//===================================================================================
				this._playermainwindow2 = new Tetris_Window(
					tempX2 || 0,
					//operator.xposition - 15 - 7,
					tempY2 || (operator.yposition + TetrisManager.AboveLines * operator.yrange - 27),
					this.ROW * operator.xrange + 65,
					(this.COL - TetrisManager.AboveLines) * operator.yrange
				);
				this._playermainwindow2.drawVerticalGauge(
					265,
					10,
					10,
					(this.COL - TetrisManager.AboveLines) * operator.yrange,
					operator.gaugeSCORE / this.player.AtkFreq, operator.mainwindow.hpGaugeColor1(),
					operator.mainwindow.hpGaugeColor1()
				);
				for (var i = 0; i <= this.ROW; i++) {
					this._playermainwindow2.contents.drawLine(
						i * operator.xrange + 5,
						0,
						i * operator.xrange + 5,
						(this.COL - TetrisManager.AboveLines) * operator.yrange
					);
				}
				for (var i = 0; i <= this.COL; i++) {
					this._playermainwindow2.contents.drawLine(
						4,
						i * operator.yrange - 14,
						this.ROW * operator.yrange + 4,
						i * operator.yrange - 14
					);
				}
				if (operator.cur && operator.cur.block) {
					this._splite2.block = TetrisManager.simpleCopySprite(operator.cur.block);
					this._playermainwindow2.addChild(this._splite2.block)
				}
				if (operator.shadowImage) {
					this._splite2.shadow = TetrisManager.simpleCopySprite(operator.shadowImage.block);
					this._playermainwindow2.addChild(this._splite2.shadow)
				}
				if (tempRot2) {
					this._playermainwindow2.rotation = tempRot2
				}
				//===================================================================================

				this._playermainwindow1.mask = this._splite1.mask;
				this._playermainwindow2.mask = this._splite2.mask;
				//this._playermainwindow1.y -= 10;
				//this._playermainwindow2.y += 10;


				scene._splite1.pack.addChild(this._playermainwindow1);
				scene._splite2.pack.addChild(this._playermainwindow2);

				if (!operator.effectLayer_1) {
					operator.effectLayer_1 = new Sprite();
				}
				this._playermainwindow1.addChild(operator.effectLayer_1);

				if (!operator.effectLayer_2) {
					operator.effectLayer_2 = new Sprite();
				}
				this._playermainwindow2.addChild(operator.effectLayer_2);

			}

			//===================================================================================
			scene.refreshPlayerWindow(scene.getPlayer())
			//===================================================================================
			TetrisManager.Temps.Tetris_addToMainWindow = Scene_Tetris.prototype.addToMainWindow;
			Scene_Tetris.prototype.addToMainWindow = function (operator, sprite) {
				if (operator.rotated) {
					operator.rotated = false;
					return;
				}
				if (operator.category == 'player' && sprite !== operator.shadowImage.block) {
					var temp1 = TetrisManager.simpleCopySprite(sprite);
					this._playermainwindow1.addChild(temp1)
					var temp2 = TetrisManager.simpleCopySprite(sprite);
					this._playermainwindow2.addChild(temp2)
				} else {
					operator.mainwindow.addChild(sprite)
				}
			}
			//===================================================================================
			TetrisManager.Temps.Tetris_removeFromMainWindow = Scene_Tetris.prototype.removeFromMainWindow
			Scene_Tetris.prototype.removeFromMainWindow = function (operator, sprite) {
				if (operator.category == 'player') {
					this._playermainwindow1.removeChild(sprite)
					this._playermainwindow2.removeChild(sprite)
				} else {
					operator.mainwindow.removeChild(sprite)
				}
			}
			//===================================================================================
			TetrisManager.Temps.Tetris_addEffect = Scene_Tetris.prototype.addEffect
			Scene_Tetris.prototype.addEffect = function (operator, sprite) {
				if (operator.category == 'player') {
					var s = new MergeEffect(sprite.bitmap);
					s.x = sprite.x;
					s.y = sprite.y;
					s.scale.x = sprite.scale.x;
					s.scale.y = sprite.scale.y;
					operator.effectLayer_1.addChild(s);

					var s = new MergeEffect(sprite.bitmap);
					s.x = sprite.x;
					s.y = sprite.y;
					s.scale.x = sprite.scale.x;
					s.scale.y = sprite.scale.y;
					operator.effectLayer_2.addChild(s);
				} else {
					operator.effectLayer.addChild(sprite);
                }
			}

			//===================================================================================
			TetrisManager.Temps.Tetris_drawArea = Scene_Tetris.prototype.drawArea
			Scene_Tetris.prototype.drawArea = function (operator) {
				TetrisManager.Temps.Tetris_drawArea.call(this, operator);
				if (operator.category == 'player') {
					this._playermainwindow1.addChild(operator.effectLayer_1);
					this._playermainwindow2.addChild(operator.effectLayer_2);
                }
			}
			//===================================================================================
			scene.drawArea(scene.getPlayer())
			//===================================================================================
			Scene_Tetris.prototype.onEnd = function () {
				Scene_Tetris.prototype.refreshPlayerWindow = TetrisManager.Temps.Tetris_refreshPlayerWindow;
				Scene_Tetris.prototype.addToMainWindow = TetrisManager.Temps.Tetris_addToMainWindow;
				Scene_Tetris.prototype.removeFromMainWindow = TetrisManager.Temps.Tetris_removeFromMainWindow;
				Scene_Tetris.prototype.addEffect = TetrisManager.Temps.Tetris_addEffect
				Scene_Tetris.prototype.drawArea = TetrisManager.Temps.Tetris_drawArea
            }


		},
		update: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer()
			if (TetrisManager.splitStatus == 1) {
				var Light = new ConcentratedLight();
				Light.move(player.xposition - 15 - 7+(TetrisManager.ROW * player.xrange + 65) / 2, 0);
				scene._boardLayer.addChild(Light)
				this.distance = 50
				//this.distance = 25
				TetrisManager.splitStatus = 0;
				this.fireLeft = new SlicingFireEffect('left');
				scene._effectLayer.addChild(this.fireLeft);
				this.fireRight = new SlicingFireEffect('right');
				scene._effectLayer.addChild(this.fireRight);
			}

			if (TetrisManager.splitStatus == 2) {
				this.distance = -25;
				TetrisManager.splitStatus = 0;
				this.fireLeft.stop();
				this.fireRight.stop();
            }

			if (this.distance > 25) {
				scene._splite1.pack.x -= 1;
				scene._splite1.pack.y -= 3;
				scene._splite1.pack.rotation += 0.1 / 25;

				scene._splite2.pack.x += 1;
				scene._splite2.pack.y += 5;
				scene._splite2.pack.rotation -= 0.1 / 25;
				this.distance -= 1;
			}

			if (this.distance <= 25 && this.distance > 0) {
				scene._splite1.pack.rotation -= 0.1 / 25;
				scene._splite2.pack.rotation += 0.1 / 25;
				this.distance -= 1;
			}

			if (this.fireLeft && (this.fireLeft._flag!=='stopping')) {
				this.fireLeft.move(scene._splite1.pack.x + this.protoWidth - 5, scene._splite1.pack.y + 3);
			}

			if (this.fireRight && (this.fireRight._flag !== 'stopping')) {
				this.fireRight.move(scene._splite2.pack.x + this.protoWidth + 5, scene._splite2.pack.y + 3);
            }

			//if (this.distance > 0) {
			//	scene._splite1.pack.x -= 1;
			//	scene._splite1.pack.y -= 3;
			//	scene._splite1.pack.rotation += 2 * Math.PI / 25;

			//	scene._splite2.pack.x += 1;
			//	scene._splite2.pack.y += 5;
			//	scene._splite2.pack.rotation -= 2 * Math.PI / 25;
			//	this.distance -= 1;
			//}

			if (this.distance < 0) {
				scene._splite1.pack.x += 1
					//+ 1 / 25;
				scene._splite1.pack.y += 3;
				scene._splite2.pack.x -= 1;
				scene._splite2.pack.y -= 5;
					//- 0.5 / 25;
				this.distance += 1;
				console.log(this.distance);
			}

		},
		onLose: function () {
		},
		onDown: function () {
			var scene = SceneManager._scene
			scene._playermainwindow1.removeChild(scene._splite1.block)
			scene._playermainwindow2.removeChild(scene._splite2.block)
			scene._splite1.block = TetrisManager.simpleCopySprite(scene.getPlayer().cur.block);
			scene._splite2.block = TetrisManager.simpleCopySprite(scene.getPlayer().cur.block);
			scene._playermainwindow1.addChild(scene._splite1.block);
			scene._playermainwindow2.addChild(scene._splite2.block);
		},
		onBlockChanging: function () {
			var scene = SceneManager._scene
			var player = scene.getPlayer()
			if (player.justHold) {
				scene.drawArea(player)
				player.justHold = false;
            }
			scene._playermainwindow1.removeChild(scene._splite1.block)
			scene._playermainwindow2.removeChild(scene._splite2.block)
			scene._splite1.block = TetrisManager.simpleCopySprite(player.cur.block);
			scene._splite2.block = TetrisManager.simpleCopySprite(player.cur.block);
			scene._playermainwindow1.addChild(scene._splite1.block);
			scene._playermainwindow2.addChild(scene._splite2.block);
		},
		onShadow: function () {
			var scene = SceneManager._scene
			scene._playermainwindow1.removeChild(scene._splite1.shadow);
			scene._playermainwindow2.removeChild(scene._splite2.shadow);
			scene._splite1.shadow = TetrisManager.simpleCopySprite(scene.getPlayer().shadowImage.block);
			scene._splite2.shadow = TetrisManager.simpleCopySprite(scene.getPlayer().shadowImage.block);
			scene._playermainwindow1.addChild(scene._splite1.shadow);
			scene._playermainwindow2.addChild(scene._splite2.shadow);
        }
	},
	"14": {
		name: '绿茶回血（大）',
		id: 14,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			TetrisManager.HarmSystem.dealDamage(null, this.owner, -this.owner.actor.mhp*0.1, 'healing')

		},
		update: function () {

			if (((Date.now() - this.oldTime) / 1000) > 1) {
				TetrisManager.HarmSystem.dealDamage(null, this.owner, -this.owner.actor.mhp * 0.03, 'healing')
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(14);
			}
		},
		onLose: function () {
		}
	},
	"15": {
		name: '猫猫狂暴',
		id: 15,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			var actor = $gameActors.actor(1)
			this.atk_amount = Math.floor(actor.atk*0.25)
			actor.addParam(2, this.atk_amount);
			this.owner.Gauge_Score_mag = this.owner.Gauge_Score_mag *1.25
			this.emitter = new particleEmitter('Rage', ['Rage_0', 'Rage_1', 'Rage_2']);
			this.emitter.y = Graphics.boxHeight;
			SceneManager._scene.addChild(this.emitter);
		},
		update: function () {

			if (((Date.now() - this.oldTime) / 1000) > 1) {
				this.oldTime = Date.now();
				this.count -= 1;
				this.updated = true;
			}
			if (this.count <= 0) {
				this.owner.removeState(15);
			}
		},
		onLose: function () {
			$gameActors.actor(1).addParam(2, -this.atk_amount);
			this.owner.Gauge_Score_mag = this.owner.Gauge_Score_mag / 1.25
			this.emitter.stop();
		},
		onEnd: function () {
			$gameActors.actor(1).addParam(2, -this.atk_amount);
			this.owner.Gauge_Score_mag = this.owner.Gauge_Score_mag / 1.25
			this.emitter.stop();
        }
	},
	"17": {
		name: '耐久攻击',
		id: 17,
		count: 0,
		type: 'in_battle',
		updated: false,
		onGain: function (owner) {
			this.owner = owner
			this.oldTime = Date.now();
			this.owner.Be_Damaged_mag = 0;
		},
		update: function () {

		},
		onLose: function () {
			this.owner.Be_Damaged_mag = 1;
		},
	},
}
//TODO:改进颜色设置

TetrisManager.item_List = {
	"1": function () {
		var actor = $gameActors.actor(1)
		actor.gainHp(500);
		SceneManager._scene._playerStateBoard.applyStates("4", 10)
	},
	"2": function () {
		SceneManager._scene._playerStateBoard.applyStates("8", 5)
	},
	"8": function () {
		SceneManager._scene._playerStateBoard.applyStates("14", 10)
	},
	"11": function () {
		SceneManager._scene._playerStateBoard.applyStates("15", 10)
	},
	"13": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
        }
		player.hold = {
			block: new Sprite(scene._minoSkin['5'][0]),
			type: '5',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['5'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"14": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['s'][0]),
			type: 's',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['s'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"15": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['j'][0]),
			type: 'j',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['j'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"16": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['l'][0]),
			type: 'l',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['l'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"17": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['t'][0]),
			type: 't',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['t'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"18": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['1'][0]),
			type: '1',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['1'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	},
	"19": function () {
		var scene = SceneManager._scene
		var player = SceneManager._scene.getPlayer();

		if (player.hold && player.hold.changed) {
			return
		}
		if (player.hold) {
			player.holdWindow.removeChild(player.hold.block)
		}
		player.hold = {
			block: new Sprite(scene._minoSkin['o'][0]),
			type: 'o',
			rotation: 0,
			rotationTime: 0,
			box: TetrisManager.data['o'][0].slice(),
			changed: true

		}
		player.hold.block.move(scene.calPositionX(player.hold), 45)
		player.holdWindow.addChild(player.hold.block);
	}

}

TetrisManager.battle_List = {
	"Test1": {
		//music: {
		//	name: "666",
		//	volume: 50,
		//	pitch: 100,
		//	pan: 0
		//},
		enemyList: TetrisManager.enemy_List[5],
		defaultBackground: false,
		delayFinish: 300
	},
	"Test2": {
		music: {
			name: "Tetris",
			volume: 50,
			pitch: 100,
			pan: 0
		},
		enemyList: TetrisManager.enemy_List[1],
	}
}

//=============================================================================
// ** 技能所需对象定义
//=============================================================================

function MeaDoku() {
	this.initialize.apply(this, arguments);
}

MeaDoku.prototype = Object.create(Sprite.prototype);
MeaDoku.prototype.constructor = MeaDoku;

MeaDoku.prototype.initialize = function (index) {
	Sprite.prototype.initialize.call(this);
	AudioManager.playSe(TetrisManager.seSet['Wind7']);
	var scene = SceneManager._scene
	scene.getPlayer().actor.gainHp(-10);

	this.enemy = scene._enemies[scene.getPlayer().TargetIndex];
	var sx = scene.getSkillPosition(index)[0];
	var sy = scene.getSkillPosition(index)[1];
	var ex = this.enemy.StateBoard.getStatePosition('4')[0];
	var ey = this.enemy.StateBoard.getStatePosition('4')[1];
	this.emitter = new PoisonDot(
		ex - sx,
		ey - sy
	);
	this.emitter.move(sx, sy);
	scene._effectLayer.addChild(this.emitter);
}

MeaDoku.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.emitter.isCompleted()) {
		this.enemy.StateBoard.applyStates("4", 10);
		this.destroy();
    }
}

//=============================================================================

function Split() {
	this.initialize.apply(this, arguments);
}

Split.prototype = Object.create(Sprite.prototype);
Split.prototype.constructor = Split;

Split.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.time = 5;
	this.oldTime = Date.now();
	TetrisManager.splitStatus = 1;
}

Split.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if ((Date.now() - this.oldTime)* 0.001 >= this.time) {
		TetrisManager.splitStatus = 2;
		this.destroy();
    }
}

//=============================================================================

function BloodFilter() {
	this.initialize.apply(this, arguments);
}

BloodFilter.prototype = Object.create(Sprite.prototype);
BloodFilter.prototype.constructor = BloodFilter;

BloodFilter.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture('filter/Blood');
	this.opacity = 0;
	this.phaseFlag = 'increasing'
	this.timeCount = 0;
	this._frequency = 180;
	this._maxOpacity = 127
}

BloodFilter.prototype.update = function () {
	Sprite.prototype.update.call(this);

	switch (this.phaseFlag) {
		case 'increasing':
			this.opacity += this._maxOpacity / this._frequency;
			break;
		case 'decreasing':
			this.opacity -= this._maxOpacity / this._frequency;
			break;
		case 'ending':
			this.opacity -= this._maxOpacity / this._frequency;
			if (this.opacity <= 0) {
				this.destroy();
			}
			break;
	}

	if (this.timeCount > this._frequency) {
		if (this.phaseFlag != 'ending') {
			if (this.phaseFlag == 'increasing') {
				if (this.opacity >= this._maxOpacity) {
					this.phaseFlag = 'decreasing'
                }
			} else {
				if (this.opacity <= 0) {
					this.phaseFlag = 'increasing'
                }
			}
        }

		this.timeCount = 0;
	}


	this.timeCount += 1;
}

BloodFilter.prototype.stop = function () {
	this.phaseFlag = 'ending'
} 

//=============================================================================

function Counting() {
	this.initialize.apply(this, arguments);
}

Counting.prototype = Object.create(Sprite.prototype);
Counting.prototype.constructor = Counting;

Counting.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	var map = new Bitmap(250, 250);
	this.Num = new Sprite(map);
	this.count = 4;
	this.time = 0;
	this.Num.anchor.x = 0.5;
	this.Num.anchor.y = 0.5;
	this.Num.move(Graphics.boxWidth / 2, Graphics.boxHeight / 2)
	this.Num.bitmap.fontSize = 64;
}

Counting.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.time == 0 && this.count >= 1) {
		this.count -= 1
		if (this.count <= 0) {
			SceneManager._scene.startGame();
			this.destroy()
		}
		this.time = 40;
		this.addChild(this.Num)
		this.Num.bitmap.clear()
		this.Num.bitmap.drawText(String(this.count), 0, 0, 250, 250, 'center');
		this.Num.scale.x = 0;
		this.Num.scale.y = 0;
		
    }

	if (this.time >= 30) {
		this.Num.scale.x += 0.1;
		this.Num.scale.y += 0.1;
	}

	if (this.time < 30 && this.time >= 10) {
		this.Num.scale.x -= 0.01;
		this.Num.scale.y -= 0.01;
	}

	if (this.time < 10 && this.time >= 0) {
		this.Num.scale.x -= 0.1;
		this.Num.scale.y -= 0.1;
	}

	this.time -= 1;

}

//=============================================================================

function VampBack() {
	this.initialize.apply(this, arguments);
}

VampBack.prototype = Object.create(Sprite.prototype);
VampBack.prototype.constructor = VampBack;

VampBack.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.coverSprite = new Sprite();
	this.coverSprite.bitmap = ImageManager.loadPicture('Darkness');

	this.backSprite = new Sprite();
	this.backSprite.bitmap = ImageManager.loadPicture('bg');

	this.addChild(this.backSprite);
	this.addChild(this.coverSprite);
	this.changingFlag = false;
}

VampBack.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (!this.changingFlag && this.coverSprite.opacity < 255) {
		this.coverSprite.opacity += 0.5;
	}

	if (this.changingFlag && this.coverSprite.opacity > 0) {
		this.coverSprite.opacity -= 10;
	}
}

VampBack.prototype.changeFlag = function () {
	if (this.changingFlag) {
		this.changingFlag = false;
	} else {
		this.changingFlag = true;
    }
}

//=============================================================================

function BrokenRect() {
	this.initialize.apply(this, arguments);
}

BrokenRect.prototype = Object.create(Sprite.prototype);
BrokenRect.prototype.constructor = BrokenRect;

BrokenRect.prototype.initialize = function (sprite, width, height) {
	Sprite.prototype.initialize.call(this);
	this._splite1 = {};
	this._splite2 = {};
	this._splite1.layer = new Sprite();
	this._splite2.layer = new Sprite();
	this._splite1.block = TetrisManager.simpleCopySprite(sprite);
	this._splite1.block.move(0, 0);
	this._splite2.block = TetrisManager.simpleCopySprite(sprite);
	this._splite2.block.move(0, 0);

	this.point1 = new PIXI.Point(Math.random() * (width), Math.random() * (height))
	this.point2 = new PIXI.Point(Math.random() * (width), Math.random() * (height))
	this.point3 = new PIXI.Point(Math.random() * (width), Math.random() * (height))

	this._splite1.mask = new PIXI.Graphics();
	this._splite1.mask.beginFill(0x000000);
	this._splite1.mask.drawPolygon([
		new PIXI.Point(0, 0),
		new PIXI.Point(width, 0),
		this.point1,
		this.point2,
		this.point3,
		new PIXI.Point(0, height),
	])
	this._splite1.mask.endFill();
	this._splite1.block.mask = this._splite1.mask;
	this._splite1.layer.addChild(this._splite1.block);
	this._splite1.layer.addChild(this._splite1.mask);

	this._splite2.mask = new PIXI.Graphics();
	this._splite2.mask.beginFill(0x000000);
	this._splite2.mask.drawPolygon([
		new PIXI.Point(width, 0),
		this.point1,
		this.point2,
		this.point3,
		new PIXI.Point(0, height),
		new PIXI.Point(width, height),
	])
	this._splite2.mask.endFill();
	this._splite2.block.mask = this._splite2.mask;
	this._splite2.layer.anchor.x = 1;
	this._splite2.layer.anchor.y = 1;
	this._splite2.layer.addChild(this._splite2.block);
	this._splite2.layer.addChild(this._splite2.mask);

	this.addChild(this._splite1.layer);
	this.addChild(this._splite2.layer);

	this.flag = 0;
	this.speed = -1;

	this._splite1.layer.rotation = -Math.PI / 4;
	this._splite2.layer.rotation = Math.PI / 4;
}

BrokenRect.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.speed += 0.1;
	this._splite1.layer.y += this.speed;
	this._splite2.layer.y += this.speed;
	if (this._splite1.layer.y >= 700) {
		this.destroy();
    }
}

//=============================================================================
//QTE组件
//qteData {type: 'up', duration: 10}

TetrisManager.QTEIndicator = {}

function QTEManager(){
	this.initialize.apply(this, arguments);
}

QTEManager.prototype = Object.create(Sprite.prototype);
QTEManager.prototype.constructor = QTEManager;

QTEManager.prototype.initialize = function (qteData, failFunction, qteBoard) {
	Sprite.prototype.initialize.call(this);	
	this._data = qteData
	this.startTime = Number(TetrisManager.getElapsedTime());
	this.flag = -1;
	this.iconID = -1;
	this.waitingTime = 0
	this._qteBoard = qteBoard;
	this._progressBar = new Gauge_base(
		{
			type: 'Horz',
			frameSource: TetrisManager.frameCaching['testFrame4'],
			barSource: ImageManager.loadPicture('bars/BarGrad2'),
			backSource: ImageManager.loadPicture('bars/BarBack2'),
			x: 0,
			y: 0,
			width: 100,
			height: 15,
			maxAmount: 20
		}
	);
	this.barTime = 0;
	this.activateNext();
	this.fail = failFunction;
	this._running = true;
}

QTEManager.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._running) {
		var time = Number(TetrisManager.getElapsedTime()) - this.startTime;
		this._progressBar.changeNumber(time - this.barTime);
		if (TetrisManager.QTEIndicator.lastSign && TetrisManager.QTEIndicator.lastSign == this._data[this.flag].type) {
			TetrisManager.QTEIndicator.lastSign = null;
			this.pressed = true;
			this.waitingTime = time;
		}
		if (time >= this.waitingTime) {
			if (!this.pressed) {
				this.fail();
			}
			this.barTime = time;
			this.activateNext();
			this.pressed = false;
		}
    }
}

QTEManager.prototype.activateNext = function () {
	TetrisManager.QTEIndicator.lastSign = null;
	if (this.iconID >= 0) {
		this._qteBoard.unglowItem(this.iconID);
	}
	this.flag += 1;
	if (this._data[this.flag] && this._data[this.flag].type) {
		switch (this._data[this.flag].type) {
			case 'up':
				this.iconID = 0;
				break;
			case 'right':
				this.iconID = 1;
				break;
			case 'down':
				this.iconID = 2;
				break;
			case 'left':
				this.iconID = 3;
				break;
		}
		this._progressBar.changeNumber(0);
		this._progressBar.changeMax(this._data[this.flag].duration);
		this._qteBoard.glowItem(this.iconID);
		this.barTime = Number(TetrisManager.getElapsedTime()) - this.startTime;
		this.waitingTime += this._data[this.flag].duration;
	} else {
		this._progressBar.changeNumber(0);
		this._running = false;
		this._qteBoard.opacity = 100;
		this._progressBar.opacity = 100;
	}

}

QTEManager.prototype.reset = function (qteData, failFunction) {
	this._qteBoard.opacity = 255;
	this._progressBar.opacity = 255;
	this._data = qteData
	this.startTime = Number(TetrisManager.getElapsedTime());
	this.flag = -1;
	this.iconID = -1;
	this.waitingTime = 0
	this.barTime = 0;
	this.activateNext();
	if (failFunction) {
		this.fail = failFunction;
    }
	this._running = true;
}

function QTEBoard() {
	this.initialize.apply(this, arguments);
}

QTEBoard.prototype = Object.create(Sprite.prototype);
QTEBoard.prototype.constructor = QTEBoard;

QTEBoard.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);	

	this._sequence = ['up', 'right', 'down', 'left'];

	this.boardIndex = 0;
	this.setIndex = 0;
	this.lastSet = -1;
	this.iconSets = [];
	this.changingIcon = false;
	this.background = new Tetris_Window(-5, -5, 5 * 38 + 10, 48);
	this.addChild(this.background);

	this.Icons = [];
	for (var i = 0; i < this._sequence.length; i++) {
		if (this._sequence[i]) {
			switch (this._sequence[i]) {
				case 'up':
					var s = new QTEIcon(ImageManager.loadPicture('Others/ArrowUp'));
					s.cover();
					this.Icons.push(s);
					break;
				case 'right':
					var s = new QTEIcon(ImageManager.loadPicture('Others/ArrowRight'));
					s.cover();
					this.Icons.push(s);
					break;
				case 'down':
					var s = new QTEIcon(ImageManager.loadPicture('Others/ArrowRight'));
					s.cover();
					this.Icons.push(s);
					break;
				case 'left':
					var s = new QTEIcon(ImageManager.loadPicture('Others/ArrowLeft'));
					s.cover();
					this.Icons.push(s);
					break;
            }
        }
	}

	for (name in Input.keyMapper) {
		if (Input.keyMapper[name] == 'itemone') {
			this.itemOneHotKey = TetrisManager.keyCodeList[String(name)];
		}
		if (Input.keyMapper[name] == 'itemtwo') {
			this.itemTwoHotKey = TetrisManager.keyCodeList[String(name)];
		}
		if (Input.keyMapper[name] == 'itemthree') {
			this.itemThreeHotKey = TetrisManager.keyCodeList[String(name)];
		}
		if (Input.keyMapper[name] == 'itemfour') {
			this.itemFourHotKey = TetrisManager.keyCodeList[String(name)];
		}
	}

	var count = 0;
	var tempSet = 0;
	this.iconSets.push(new Sprite());
	for (var i = 0; i < this.Icons.length; i++) {
		if (count >= 4) {
			count = 0;
			tempSet += 1;
			this.iconSets.push(new Sprite());
		}
		switch (count) {
			case 0:
				this.Icons[i].writeHotKey(this.itemOneHotKey);
				break;
			case 1:
				this.Icons[i].writeHotKey(this.itemTwoHotKey);
				break;
			case 2:
				this.Icons[i].writeHotKey(this.itemThreeHotKey);
				break;
			case 3:
				this.Icons[i].writeHotKey(this.itemFourHotKey);
				break;
		}
		this.Icons[i].move(count * 38, 0);
		this.iconSets[tempSet].addChild(this.Icons[i]);
		count += 1;
	}
	this.iconSets.push(new Sprite());
	this.itemArrow = new Sprite(ImageManager.loadPicture('ui\\ItemArrow'));
	this.itemArrow.move(4 * 38 + 10, 0)
	this.addChild(this.itemArrow)
	this.addChild(this.iconSets[this.setIndex]);
}

QTEBoard.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (Input.isTriggered('itemone')) {
		var id = this.boardIndex + 0
		this.useItem(id);
	}
	if (Input.isTriggered('itemtwo')) {
		var id = this.boardIndex + 1
		this.useItem(id);
	}
	if (Input.isTriggered('itemthree')) {
		var id = this.boardIndex + 2
		this.useItem(id);
	}
	if (Input.isTriggered('itemfour')) {
		var id = this.boardIndex + 3
		this.useItem(id);
	}

	if (this.changingIcon) {
		if (this.iconSets.length > 1) {
			this.iconSets[this.lastSet].x -= 4 * 38 / 10;
			this.iconSets[this.setIndex].x -= 4 * 38 / 10;
			this.iconSets[this.lastSet].opacity -= 255 / 10;
			this.iconSets[this.setIndex].opacity += 255 / 10;
			if (this.iconSets[this.lastSet].opacity <= 0) {
				this.changingIcon = false;
			}
		} else {
			this.iconSets[this.setIndex].x -= 4 * 38 / 10;
			this.iconSets[this.setIndex].opacity += 255 / 10;
			if (this.iconSets[this.setIndex].opacity >= 255) {
				this.changingIcon = false;
			}
		}
	}
}

QTEBoard.prototype.switchToNext = function () {
	if (!this.changingIcon) {
		if (this.iconSets[this.setIndex + 1]) {
			this.boardIndex += 4;
			this.setIndex += 1;
			this.lastSet = this.setIndex - 1;
		} else {
			this.boardIndex = 0;
			this.setIndex = 0;
			this.lastSet = this.iconSets.length - 1;
		}
		this.removeChild(this.iconSets[this.setIndex]);
		this.iconSets[this.setIndex].move(4 * 38, 0);
		this.iconSets[this.setIndex].opacity = 0;
		this.addChild(this.iconSets[this.setIndex]);
		this.changingIcon = true;
	}
}

QTEBoard.prototype.useItem = function (id) {
	var type = this._sequence[id];
	TetrisManager.QTEIndicator.lastSign = type
}

QTEBoard.prototype.glowItem = function (id) {
	this.Icons[id].uncover();
	this.Icons[id].glow();
}

QTEBoard.prototype.unglowItem = function (id) {
	this.Icons[id].cover();
	this.Icons[id].unglow();
}

function QTEIcon() {
	this.initialize.apply(this, arguments);
}

QTEIcon.prototype = Object.create(Sprite.prototype);
QTEIcon.prototype.constructor = QTEIcon;

QTEIcon.prototype.initialize = function (bitmap) {
	Sprite.prototype.initialize.call(this);
	if (bitmap) {
		this.icon = new Sprite(bitmap)
		this.icon.move(3, 3);
		this.addChild(this.icon);
		this.iconFrame = new Sprite(ImageManager.loadPicture('ui\\ItemFrame'));
		this.iconCover = new Sprite(ImageManager.loadPicture('ui\\ItemCover'));
		this.iconCover.opacity = 0;
		this.addChild(this.iconFrame);
		this.addChild(this.iconCover);
		this.hotKeyTxt = new Sprite(new Bitmap(32, 32));
		this.hotKeyTxt.bitmap.fontSize = 14;
		this.hotKeyTxt.anchor.y = 0.5;
		this.addChild(this.hotKeyTxt);
		this.numTxt = new Sprite(new Bitmap(32, 32));
		this.numTxt.bitmap.fontSize = 18;
		this.numTxt.move(0, 16);
		this.addChild(this.numTxt);
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;

		this.shining = false;
		this.shined = false;
	} else {
		this.iconFrame = new Sprite(ImageManager.loadPicture('ui\\ItemFrame'));
		this.addChild(this.iconFrame);
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
	}
}

QTEIcon.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.shining && !this.shined) {
		this.scale.x += 0.1;
		this.scale.y += 0.1;
		if (this.scale.x >= 1.5) {
			this.shined = true;
		}
	}

	if (this.shined) {
		this.scale.x -= 0.1
		this.scale.y -= 0.1
		if (this.scale.x <= 1) {
			this.shining = false;
			this.shined = false;
		}
	}
}

QTEIcon.prototype.writeNum = function (num) {
	if (num > 0) {
		this.numTxt.bitmap.clear();
		this.numTxt.bitmap.drawText(String(num), 0, 0, 32, 32, 'right');
	} else {
		this.numTxt.bitmap.clear();
		this.iconCover.opacity = 200;
	}
}

QTEIcon.prototype.writeHotKey = function (keyname) {
	this.hotKeyTxt.bitmap.clear();
	this.hotKeyTxt.bitmap.drawText(keyname, 0, 0, 32, 32, 'left');
}

QTEIcon.prototype.shine = function () {
	this.shining = true;
}

QTEIcon.prototype.glow = function () {
	this.Glow = new WindowGlow(new Sprite(ImageManager.loadPicture('ui/ItemGlow')));
	this.addChild(this.Glow);
	this.Glow.move(-4, -4);
}

QTEIcon.prototype.unglow = function () {
	if (this.Glow) {
		this.removeChild(this.Glow)
    }
}

QTEIcon.prototype.cover = function () {
	this.iconCover.opacity = 200;
}

QTEIcon.prototype.uncover = function () {
	this.iconCover.opacity = 0;
}


//=============================================================================
// ** 技能特效的抽象类
//=============================================================================

function Attack_Effect() {
	this.initialize.apply(this, arguments);
}

Attack_Effect.prototype = Object.create(Sprite.prototype);
Attack_Effect.prototype.constructor = Attack_Effect;

Attack_Effect.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.completed = false;
}

Attack_Effect.prototype.isCompleted = function () {
	return this.completed;
}

Attack_Effect.prototype.Complete = function () {
	this.completed = true;
}

//-----------------------------------------------------------------------------

function DiminishingBox() {
	this.initialize.apply(this, arguments);
}

DiminishingBox.prototype = Object.create(Attack_Effect.prototype);
DiminishingBox.prototype.constructor = DiminishingBox;

DiminishingBox.prototype.initialize = function (speed, tint) {
	Attack_Effect.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture("theBox")
	if (tint) {
		this.tint = tint;
	} else {
		this.tint = 0x9900cc;
    }
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this.scale.x = 1;
	this.scale.y = 1;
	this.speed = speed
	this._time = 1 / this.speed;
}

DiminishingBox.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	this.rotation += Math.PI / 60;
	this.scale.x -= this.speed;
	this.scale.y -= this.speed;
	this._time -= 1;
	if (this._time <= 0) {
		this.Complete();
		this.destroy();
	}
}


function SpinningBox() {
	this.initialize.apply(this, arguments);
}

SpinningBox.prototype = Object.create(Attack_Effect.prototype);
SpinningBox.prototype.constructor = SpinningBox;

SpinningBox.prototype.initialize = function (Xdistance, Ydistance, tint) {
	Attack_Effect.prototype.initialize.call(this);
	this.Xdistance = Xdistance;
	this.Ydistance = Ydistance;
	this.time = 30
	this.interval = 1;
	this.counter = 0;
	this.Xstep = Xdistance / this.time;
	this.Ystep = Ydistance / this.time;
	this.Xcursor = 0;
	this.Ycursor = 0;
	this.tint = tint
	this.sampleBox = new DiminishingBox(0.01);

}

SpinningBox.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.time <= 0) {
		this.Complete();
	} else {
		this.Xcursor += this.Xstep;
		this.Ycursor += this.Ystep;
		this.counter += 1;
		if (this.counter >= this.interval) {
			var box = new DiminishingBox(0.01, this.tint);
			box.move(this.Xcursor, this.Ycursor);
			this.addChild(box);
			this.counter = 0;
		}

	}

	if ((-this.time) >= this.sampleBox._time) {
		this.destroy();
	}

	this.time -= 1;
}

//-----------------------------------------------------------------------------
function PoisonDot() {
	this.initialize.apply(this, arguments);
}

PoisonDot.prototype = Object.create(Attack_Effect.prototype);
PoisonDot.prototype.constructor = PoisonDot;

PoisonDot.prototype.initialize = function (Xdistance, Ydistance) {
	Attack_Effect.prototype.initialize.call(this);
	this.Xdistance = Xdistance;
	this.Ydistance = Ydistance;
	this.time = 30
	this.Xstep = Xdistance / this.time;
	this.Ystep = Ydistance / this.time;
	this.Xcursor = 0;
	this.Ycursor = 0;
	this.emitter = new particleEmitter('Poison', ['Poison']);
	this.addChild(this.emitter);
}

PoisonDot.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.time > 0) {
		this.Xcursor += this.Xstep;
		this.Ycursor += this.Ystep;
		this.emitter.move(this.Xcursor, this.Ycursor);
	}

	if (this.time <= 0) {
		this.Complete();
	}

	if (this.time <= -15) {
		this.emitter._emitter.emit = false;
	}

	if (this.time <= -30) {
		this.destroy();
	}

	this.time -= 1;
}

//-----------------------------------------------------------------------------

function SingleLight() {
	this.initialize.apply(this, arguments);
}

SingleLight.prototype = Object.create(Attack_Effect.prototype);
SingleLight.prototype.constructor = SingleLight;

SingleLight.prototype.initialize = function () {
	Attack_Effect.prototype.initialize.call(this);
	this.timeCount = 0;
	this.timeFlag = 0;
	this.bitmap = ImageManager.loadPicture('Effect/Light');

	this.anchor.x = 0.5;
	this.scale.x = 0.1;
	this.scale.y = 0;
	this.opacity = 128;
	this.markers = [5, 3, 7, 5]
}

SingleLight.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.timeFlag == 0) {
		this.scale.y+=0.2
	}

	if (this.timeFlag == 1) {
		this.scale.x += 0.3
	}

	if (this.timeFlag == 3) {
		this.scale.x -= 0.2
    }

	this.timeCount += 1;
	switch (this.timeCount) {
		case this.markers[0]:
			this.timeFlag = 1;
			break;
		case this.markers[0] + this.markers[1]:
			this.timeFlag = 2;
			break;
		case this.markers[0] + this.markers[1] + this.markers[2]:
			this.timeFlag = 3;
			break;
		case this.markers[0] + this.markers[1] + this.markers[2] + this.markers[3]:
			this.timeFlag = 4;
			this.completed = true;
			break;
    }

}

//-----------------------------------------------------------------------------

function ConcentratedLight() {
	this.initialize.apply(this, arguments);
}

ConcentratedLight.prototype = Object.create(Attack_Effect.prototype);
ConcentratedLight.prototype.constructor = ConcentratedLight;

ConcentratedLight.prototype.initialize = function () {
	Attack_Effect.prototype.initialize.call(this);
	this.timeCount = 5;
	this.numCount = 3;
}

ConcentratedLight.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.timeCount >= 5 && this.numCount>=0) {
		this.numCount -= 1;
		var light = new SingleLight();
		this.addChild(light);
		this.timeCount = 0;
	}

	if (this.numCount <= 0 && this.children[this.children.length - 1].isCompleted()) {
		this.destroy();
    }

	this.timeCount += 1;
}

//-----------------------------------------------------------------------------

function LifeStealEffect() {
	this.initialize.apply(this, arguments);
}

LifeStealEffect.prototype = Object.create(Attack_Effect.prototype);
LifeStealEffect.prototype.constructor = LifeStealEffect;

LifeStealEffect.prototype.initialize = function (enemy) {
	Attack_Effect.prototype.initialize.call(this);
	var scene = SceneManager._scene;
	var player = scene.getPlayer();
	var particle1 = new particleEmitter('trail', ['Particle']);
	var particle2 = new particleEmitter('trail', ['Particle']);
	var particle3 = new particleEmitter('trail', ['Particle']);
	if (enemy.pic_pos) {
		var epos = enemy.pic_pos;
	} else {
		var epos = enemy.gauge_pos;
    }
	var TMP1 = new TwistingMovingPart(particle1, epos, player.gauge_pos, 60,
		function () { this.s.stop(); }, 60);
	var TMP2 = new TwistingMovingPart(particle2, epos, player.gauge_pos, 60,
		function () { this.s.stop(); }, 60);
	var TMP3 = new TwistingMovingPart(particle3, epos, player.gauge_pos, 60,
		function () { this.s.stop(); }, 60);

	this.addChild(TMP1);
	this.addChild(TMP2);
	this.addChild(TMP3);
}


//-----------------------------------------------------------------------------

function TwistingMovingPart() {
	this.initialize.apply(this, arguments);
}

TwistingMovingPart.prototype = Object.create(Attack_Effect.prototype);
TwistingMovingPart.prototype.constructor = TwistingMovingPart;

TwistingMovingPart.prototype.initialize = function (sprite, start, end, time, stopFunction, stopTime) {
	Attack_Effect.prototype.initialize.call(this);
	this.s = sprite;
	this.start = start;
	this.end = end;
	this.mid = [];
	this.stopTime = stopTime;
	this.stopFunction = stopFunction;
	if (start[0] >= end[0]) {
		this.Xoffset = end[0]
	} else {
		this.Xoffset = start[0]
	}
	if (start[1] >= end[1]) {
		this.Yoffset = end[1]
	} else {
		this.Yoffset = start[1]
	}
	this.mid.push((Math.random() * Math.abs(start[0] - end[0])) + this.Xoffset);
	this.mid.push((Math.random() * Math.abs(start[1] - end[1])) + this.Yoffset);
	this.addChild(this.s)
	this.s.move(start[0], start[1]);
	this.tempX = start[0];
	this.tempY = start[1];

	this.Xspeed1 = (this.mid[0] - this.start[0]) / (time / 2);
	this.Yspeed1 = (this.mid[1] - this.start[1]) / (time / 2);
	this.Xspeed2 = (this.end[0] - this.mid[0]) / (time / 2);
	this.Yspeed2 = (this.end[1] - this.mid[1]) / (time / 2);
	this.flag = 0;
	this.stopCount = 0;
}

TwistingMovingPart.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.flag == 0) {
		this.tempX += this.Xspeed1;
		this.tempY += this.Yspeed1;
		this.s.move(this.tempX, this.tempY);
		if (Math.abs(this.tempX - this.mid[0])<= 0.1) {

			this.flag = 1;
        }
	}

	if (this.flag == 1) {
		this.tempX += this.Xspeed2;
		this.tempY += this.Yspeed2;
		this.s.move(this.tempX, this.tempY);
		if (Math.abs(this.tempX - this.end[0]) <= 0.1 ) {
			this.flag = 2;
		}
	}

	if (this.flag == 2) {
		this.stopFunction();
		this.flag = 3;
	}

	if (this.flag == 3) {
		if (this.stopCount >= this.stopTime) {
			this.destroy();
        }
		this.stopCount += 1;
    }

}

//-----------------------------------------------------------------------------

function RotatingEnlargeningPart() {
	this.initialize.apply(this, arguments);
}

RotatingEnlargeningPart.prototype = Object.create(Attack_Effect.prototype);
RotatingEnlargeningPart.prototype.constructor = RotatingEnlargeningPart;

RotatingEnlargeningPart.prototype.initialize = function (sprite, start, end, time, stopFunction, stopTime) {
	Attack_Effect.prototype.initialize.call(this);
	this.s = sprite;
	end[0] += 75;
	end[1] += 75; //之后要改
	this.start = start;
	this.end = end;
	this.stopTime = stopTime;
	this.stopFunction = stopFunction;

	console.log(start);
	console.log(end);

	this.addChild(this.s);
	this.s.scale.x = 0;
	this.s.scale.y = 0;

	this.s.anchor.x = 0.5;
	this.s.anchor.y = 0.5;

	this.Xspeed = (end[0] - start[0]) / time;
	this.Yspeed = (end[1] - start[1]) / time;
	this.rotspeed = (2 * Math.PI) / time;
	this.scalespeed = 1 / time;
	this.flag = 0;

	this.x = start[0];
	this.y = start[1];
}

RotatingEnlargeningPart.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	if (this.flag == 0) {
		this.x += this.Xspeed;
		this.y += this.Yspeed;
		this.s.scale.x += this.scalespeed;
		this.s.scale.y += this.scalespeed;
		this.s.rotation += this.rotspeed;

		if (Math.abs(this.x - this.end[0])<=0.01) {
			this.flag = 1;
        }
	}

	if (this.flag == 1) {
		this.stopFunction();
		this.flag = 2;
	}

	if (this.flag == 2) {
		if (this.stopCount >= this.stopTime) {
			this.destroy();
		}
		this.stopCount += 1;
    }
}

//-----------------------------------------------------------------------------

function SlicingFireEffect() {
	this.initialize.apply(this, arguments);
}

SlicingFireEffect.prototype = Object.create(Attack_Effect.prototype);
SlicingFireEffect.prototype.constructor = SlicingFireEffect;

SlicingFireEffect.prototype.initialize = function (direction) {
	Attack_Effect.prototype.initialize.call(this);
	this.dir = direction;
	this.cover = new Sprite();
	if (this.dir == 'left') {
		this.emitter = new particleEmitter('semi-fire-left', ['Particle']);
		this.cover.bitmap = ImageManager.loadPicture('ui/SliceFireEffect_Left');
		this.emitter.x += 3;
	} else {
		this.emitter = new particleEmitter('semi-fire-right', ['Particle']);
		this.cover.bitmap = ImageManager.loadPicture('ui/SliceFireEffect_Right');
		this.cover.anchor.x = 1;
	}
	this.addChild(this.emitter);
	this.addChild(this.cover);
	this.cover.opacity = 0;
	this._flag = 'increasing';
}

SlicingFireEffect.prototype.update = function () {
	Attack_Effect.prototype.update.call(this);
	switch (this._flag) {
		case 'increasing':
			this.cover.opacity += 1;
			if (this.cover.opacity >= 255) {
				this._flag = 'decreasing'
            }
			break;
		case 'decreasing':
			this.cover.opacity -= 1;
			if (this.cover.opacity <= 0) {
				this._flag = 'increasing'
			}
			break;
		case 'stopping':
			this.cover.opacity -= 1;
			if (this.cover.opacity <= 0) {
				this.destroy();
			}
			break;
    }

}

SlicingFireEffect.prototype.stop = function () {
	this._flag = 'stopping'
	this.emitter.stop();
}





