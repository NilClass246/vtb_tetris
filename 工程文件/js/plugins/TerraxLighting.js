//=============================================================================
// Terrax Plugins - Lighting system
// TerraxLighting.js
// Version: 1.5.1
//=============================================================================
//
// This script overwrites the following core scripts.
//
// Spriteset_Map.prototype.createLowerLayer
// （这个方法我帮他优化了，覆写是万恶之源，继承才是重中之重）
//
//=============================================================================
 /*:
 * @plugindesc (v1.51)[v1.1] 地图 - 多光源特效
 * @author Terrax（拾贝猫、Drill_up翻译+优化）
 *
 * @param 玩家光源半径
 * @type number
 * @min 0
 * @desc 玩家光源的半径，单位像素。
 * @default 300
 *
 * @param 是否添加选项设置
 * @type boolean
 * @on 添加
 * @off 不添加
 * @desc true - 添加，false - 不添加，选项中可以设置Terrax光源开启或关闭。
 * @default true
 *
 * @param 选项名称
 * @desc 选项中可以设置Terrax光源开启或关闭的名称。（如果你要做不可关闭的黑暗效果，就设置选项不添加。）
 * @default Terrax光源
 *
 * @param 进新地图是否重置光源
 * @type boolean
 * @on 重置
 * @off 不重置
 * @desc true - 重置，false - 不重置，进入新地图后，所有光源重置，插件指令变化的光源将恢复到原来状态。
 * @default false
 *
 * @param 保存时间变量（时）
 * @type switch
 * @desc 游戏内时间数值可被写入指定变量。
 * @default 0
 *
 * @param 保存时间变量（分）
 * @type switch
 * @desc 游戏内时间数值可被写入指定变量。
 * @default 0
 *
 * @param 保存时间变量（秒）
 * @type switch
 * @desc 游戏内时间数值可被写入指定变量。
 * @default 0 
 *
 * @param 平移-手电筒 X
 * @desc 以玩家的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0 
 *
 * @param 平移-手电筒 Y
 * @desc 以玩家的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0 
 *
 * @param 光源覆盖宽度
 * @type number
 * @min 1
 * @desc 如果你使用了更高的分辨率，要设置覆盖宽度。（默认rmmv是816x624）
 * @default 866
 *
 * @param 光源覆盖高度
 * @type number
 * @min 1
 * @desc 如果你使用了更高的分辨率，要设置覆盖高度。（默认rmmv是816x624）
 * @default 630
 *
 * @param 独立开关控制
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @option 无
 * @value 无
 * @desc 事件的指定独立开关开启了，该事件的光源就会被禁用。
 * @default 无
 *
 * @help
 * =============================================================================
 * +++ Terrax Plugins - Lighting system (v1.51) +++
 * By Terrax 
 * =============================================================================
 * 较高级的多光源特效，你可以设置多个光源，并且配置光线颜色。
 * ★★该插件功能和配置较复杂，请耐心阅读★★
 *
 * -----------------------------------------------------------------------------
 * ----相似插件
 * 该插件与 MOG_LimitedVisibility.js  地图–简单光源精灵 的功能是一样的。
 * （二者可以叠加使用，但是效果差强人意。）
 *
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 想要激活地图中的脚本，需要在事件的备注框内填入：
 * （注意，ABC参数之间都有一个空格）
 *
 * 事件备注：Light A B C D
 *
 * 参数A：光亮半径
 * 参数B：光亮颜色
 * 参数C：特殊参数（可以不填，可以多填）
 *         B50 增加百分之50的亮度 ，在0-99之间选择数字。
 *         D1 一半光照，当光源在北边时，光会面朝南方。
 *         D2 一半光照，当光源在东边时，光会面朝西方。
 *         D3 一半光照，当光源在南边时，光会面朝北方。
 *         D4 一半光照，当光源在西边时，光会面朝东方。
 * 参数D：光亮ID（可以不填）
 *        用于插件指令控制颜色或者开关的ID。
 *        （注意，设置了id的光源，默认是关闭的。）
 *
 * 示例：
 * 事件备注：Light 250 #FFFFFF         （圆形光源）
 * 事件备注：Light 200 #FFFFFF B50     （增加百分之50的亮度）
 * 事件备注：Light 200 #FFFFFF D1      （放置在墙上的光源的一半光照）
 * 事件备注：Light 200 #FFFFFF B50 D1  （上面二者组合）
 * 事件备注：Light 200 #FFFFFF 1       （设置光源+设置id）
 * 事件备注：Light 200 #FFFFFF B50 1   （+设置id）
 * 事件备注：Light 200 #FFFFFF D1 1    （+设置id）
 * 事件备注：Light 200 #FFFFFF B50 D1 1（+设置id）
 *
 * -----------------------------------------------------------------------------
 * ----基本可选设定
 * 
 * 插件指令（启用）：Light activate
 * 插件指令（关闭）：Light deactivate
 *
 * 插件指令（启用单光源）：Light on D
 * 插件指令（关闭单光源）：Light off D
 * 插件指令（单光源变色）：Light color D B
 * 插件指令（重置光源）：  Light switch reset
 *
 * 参数B：光亮颜色
 * 参数D：光亮ID
 *        备注中设置的id。
 *
 * 示例：
 * 插件指令：Light on 1
 * 插件指令：Light off 1
 * 插件指令：Light color 1 #FF0000
 * 插件指令：Light switch reset
 *
 *
 * 接下来是设置玩家自己的光源效果：
 *
 * 插件指令（改变玩家光源）：  Light radius A B C
 * 插件指令（慢改变玩家光源）：Light radiusgrow A B C
 * 插件指令（玩家手电筒开）：  Flashlight on E F B G
 * 插件指令（玩家手电筒关）：  Flashlight off
 *
 * 参数A：光亮半径
 * 参数B：光亮颜色
 * 参数C：特殊参数（可以不填，可以多填）
 *         B50 增加百分之50的亮度 ，在0-99之间选择数字。
 * 参数E：光照长度
 * 参数F：光照宽度
 * 参数G：光照密度
 *
 * 示例：
 * 插件指令：Light radius 100 #FFFFFF
 * 插件指令：Flashlight on 8 12 #FFFFFF 3
 * 插件指令：Flashlight off
 *
 * 注意，手电筒必须和玩家圆形光源一起用。如果关闭了玩家光源，就什么也看不见了。
 *
 * -----------------------------------------------------------------------------
 * ----高级可选设定
 *
 * 你如果想设置定时切换颜色的光源，把上述的 B 参数替换成：
 * 【cycle #FF0000 12 #00FF00 12 #0000FF 12】
 * 这将使灯光颜色循环从红色变为蓝色再变为绿色，12表示120帧。（1秒60帧）
 * 最少两种颜色，最大四种颜色。
 *
 * 示例：
 * 事件备注：Light 250 #FFFFFF B50                               （初始光源）
 * 事件备注：Light 250 cycle #FF0000 12 #00FF00 12 #0000FF 12 B50（替换后光源）
 *
 * 如果要使得光源轻微颤抖（火焰效果），把Light关键字替换成：
 * 【Fire】
 *
 * 示例：
 * 事件备注：Light 250 #FFFFFF B50   （初始光源）
 * 事件备注：Fire 250 #FFFFFF B50    （替换后光源）
 *
 * -----------------------------------------------------------------------------
 * ----其他可选设定
 * 为了触发地图上的昼夜循环，请在事件或地图备注中标明'DayNight'
 * 
 * 插件命令 'Daynight speed 10' 改变速度
 * Speed 10 意味着游戏中的一小时只需要10s（可能会更快）
 * 插件命令 'Daynight hour 16 30' 设定时间为16:30
 * 每个小时有独立的颜色数值
 * 插件命令 'Daynight color 0 #222222' 将零点的光源颜色数值改为#222222
 * 你可以用以下命令来增加时间的流逝： 'Daynight add 8 30' (将会增加8小时30分钟) 
 *
 * 如果你想利用时间来触发效果（比如说在天黑时打开灯）
 * 你可以使用参数'保存时间变量','保存时间变量（分）','保存时间变量（秒）'
 * 默认值是0，这意味着它是关闭的
 * 如果你将它设置为一个值，比如5，那么它将在游戏内的变量5中存储日夜值
 * 然后你便可以使用该变量来触发灯光了。
 * 为了方便同步/调试时间系统，你可以使用插件命令'daynight debug' 来显示当前时间
 * 如果你想去到外星球，当然也可以改变一天内时间的数值
 * 插件命令 'daynight hoursinday 48' (一天48小时，不要忘记填写小时数哦)
 *
 * 作为昼夜循环的替代品，你可以使用色调系统；如果你想用另外一个插件来完成昼夜循环，色调选项
 * 可能是最好的选择。
 * 插件命令 'Tint set #333333' 将会使房间不那么暗
 * 插件命令 'Tint fade #777777 5' 将会从当前颜色变化成新的颜色，数字5指变化的速度
 * 当数字是1时将会非常快，而20则会很慢。
 * 如果一个地区有昼夜循环系统，则色调系统将会失效
 *
 * 旋光灯与区域照明设置
 * 如果想不借助事件创造光源，你可以使用以下插件命令：
 * TileLight 1 ON #FFFFFF 150  将会在所有 tile-tag 1的事件上创造一个颜色#FFFFFF 半径150的光源
 * TileRegion 1 ON #FFFFFF 150 将会在所有区域编号为1的地方创造一个颜色#FFFFFF 半径150的光源
 * 你可以用以下命令来增加光源亮度  TileRegion 1 ON #FFFFFF 150 B50  (百分之五十的增加)
 * TileLight 1 OFF 将会关掉编号1的光源
 * TileRegion 1 OFF 将会关掉区编1的光源
 * TileFire and RegionFire 与 TileLight 相同, 但具备火焰效果
 * TileGlow and RegionGlow 与 TileLight 相同, 但具有轻微的脉冲效果。
 * 确保你的地图上最少有一个灯光事件，否则脚本将不会运行
 *
 * 备注与区域阻挡设置
 * 为了遮挡某些地区的光源，你可以使用以下插件命令
 * TileBlock 1 ON #000000  将会遮挡标签1的光源
 * RegionBlock 1 ON #000000 将会遮挡区编1的光源
 * TileBlock 1 OFF and TileRegion 1 OFF 关闭遮挡
 * 暗化而又不完全遮挡光，可以使用稍高的颜色设置，比如 (#333333) 
 * 此插件不进行函数追踪，所以保持灯光半径小于遮挡半径
 * 
 * 对于高级用户，如果想遮挡更多或更少的区域，也可以：
 * RegionBlock 1 ON #000000 shape xoffset yoffset width height
 * RegionBlock 1 ON #000000 1 20 20 10 10   -> 这将在20 20的地址遮挡10 10的方形区域
 * RegionBlock 1 ON #000000 2 20 20 10 10   -> 这将在20 20的地址遮挡10 10的椭圆形区域
 *
 * 你可以使用以下插件命令来创建一个持续时间短的光源效果
 * 插件命令: effect_on_event 003 200 #FFAAAA 50
 * -> 将正在事件ID为003创建一个半径200，颜色#FFAAAA，持续时间50帧的光圈
 * 插件命令: effect_on_xy 560 500 50 #FFAAAA 25
 * -> 将在坐标560 500创建一个半径50、颜色αFFAAAA、持续时间25帧的光圈
 * 可添加许多特殊效果
 * TrRAX照明系统与Mungunter时间系统兼容，详情请参见Read Me。
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得插件可以兼容 MOG_EventText事件头顶文字 和 Drill_LayerGround多层动态
 * 远景 插件。
 *
*/
//=============================================================================
//  ps.. if my code looks funky, i'm an old guy..
// object orientated programming bugs the hell out of me.
var Imported = Imported || {};
Imported.TerraxLighting = true;

	// These are global variables so they can be used by other plugins
 
	var Terrax_tint_speed = 60;
	var Terrax_tint_target = '#000000';

	var Terrax_ABS_skill_x = [];
	var Terrax_ABS_skill_y = [];
	var Terrax_ABS_skill = [];

	var Terrax_ABS_blast_x = [];
	var Terrax_ABS_blast_y = [];
	var Terrax_ABS_blast = [];
	var Terrax_ABS_blast_duration = [];
	var Terrax_ABS_blast_fade = [];
	var Terrax_ABS_blast_grow = [];
	var Terrax_ABS_blast_mapid = [];


(function() {

	var colorcycle_count = [1000];
	var colorcycle_timer = [1000];

	var event_note = [];
	var event_id = [];
	var event_x = [];
	var event_y = [];
	var event_dir = [];
	var event_moving = [];
	var event_stacknumber = [];
	var event_eventcount = 0;

	var tile_lights = [];
	var tile_blocks = [];


	var parameters = PluginManager.parameters('TerraxLighting');
    var player_radius = Number(parameters['玩家光源半径']);
	var reset_each_map = parameters['进新地图是否重置光源'] || 'true';
	var daynightsavehours = Number(parameters['保存时间变量（时）'] || 10);
	var daynightsavemin = Number(parameters['保存时间变量（分）'] || 11);
	var daynightsavesec = Number(parameters['保存时间变量（秒）'] || 12);
	var flashlightoffsetX = Number(parameters['平移-手电筒 X'] || 0);
	var flashlightoffsetY = Number(parameters['平移-手电筒 Y'] || 0);
	var killswitch = parameters['独立开关控制'] || '无';
	var add_to_options = parameters['是否添加选项设置'] || 'true';
	var optiontext = parameters['选项名称'] || 'Terrax光源';
	var options_lighting_on = true;

	var maxX = Number(parameters['光源覆盖宽度'] || 866);
	var maxY = Number(parameters['光源覆盖高度'] || 630);

	// global timing variables
	var tint_oldseconds=0;
	var tint_timer=0;
	var moghunter_phase = -1;
	var oldmap = 0;
	var oldseconds = 0;
	var oldseconds2 = 0;
	var daynightdebug = false;
	var speeddebug = false;
	var gamedebug = false;
	var debugtimer = 0;
	var event_reload_counter = 0;
	var mogdebug = false;
	var terrax_tint_speed_old = 60;
	var terrax_tint_target_old = '#000000'
	var tileglow = 0;
	var glow_oldseconds =0;
	var glow_dir = 1;
	var cyclecolor_counter = 0;
	var darkcount = 0;
	var daynightset = false;
	var averagetime = [];
	var averagetimecount = 0;

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
		if (typeof command != 'undefined') {
			command = command.toLowerCase();


			// ************* TILE TAGS ***************
			if (command === 'tileblock' || command === 'regionblock' || command === 'tilelight' || command === 'regionlight' || command === 'tilefire' || command === 'regionfire' || command === 'tileglow' || command === 'regionglow') {

				var tilearray = $gameVariables.GetTileArray();

				var tiletype = 0;
				if (command === 'tileblock') {
					tiletype = 1;
				}
				if (command === 'regionblock') {
					tiletype = 2;
				}
				if (command === 'tilelight') {
					tiletype = 3;
				}
				if (command === 'regionlight') {
					tiletype = 4;
				}
				if (command === 'tilefire') {
					tiletype = 5;
				}
				if (command === 'regionfire') {
					tiletype = 6;
				}
				if (command === 'tileglow') {
					tiletype = 7;
				}
				if (command === 'regionglow') {
					tiletype = 8;
				}

				//var tilenumber = Number(args[0]);
				var tilenumber = Number(eval(args[0]));
				var tile_on = 0;
				if (args[1] === 'on' || args[1] === 'ON') {
					tile_on = 1;
				}
				var tilecolor = args[2];
				var isValidColor1 = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(tilecolor);
				if (!isValidColor1) {
					if (tiletype === 1 || tiletype === 2) {
						tilecolor = '#000000';
					} else {
						tilecolor = '#FFFFFF';
					}
				}

				var tileradius = 100;
				var tilebrightness = 0.0;
				var shape = 0;
				var x1 = 0;
				var y1 = 0;
				var x2 = 0;
				var y2 = 0;
				if (tiletype === 1 || tiletype === 2) {
					if (args.length > 3) {
						shape = args[3];
					}
					if (args.length > 4) {
						x1 = args[4];
					}
					if (args.length > 5) {
						y1 = args[5];
					}
					if (args.length > 6) {
						x2 = args[6];
					}
					if (args.length > 7) {
						y2 = args[7];
					}
				} else {
					if (args.length > 3) {
						tileradius = args[3];
					}
					if (args.length > 4) {
						tilebrightness = args[4];
					}
				}

				var tilefound = false;

				for (var i = 0; i < tilearray.length; i++) {
					var tilestr = tilearray[i];
					var tileargs = tilestr.split(";");
					if (tileargs[0] == tiletype && tileargs[1] == tilenumber) {
						tilefound = true;
						if (tiletype === 1 || tiletype === 2) {
							tilearray[i] = tiletype + ";" + tilenumber + ";" + tile_on + ";" + tilecolor + ";" + shape + ";" + x1 + ";" + y1 + ";" + x2 + ";" + y2;
						} else {
							tilearray[i] = tiletype + ";" + tilenumber + ";" + tile_on + ";" + tilecolor + ";" + tileradius + ";" + tilebrightness;
						}
						//Graphics.Debug('Set',tilearray[i]);
					}
				}

				if (tilefound === false) {
					var tiletag = "";
					if (tiletype === 1 || tiletype === 2) {
						tiletag = tiletype + ";" + tilenumber + ";" + tile_on + ";" + tilecolor + ";" + shape + ";" + x1 + ";" + y1 + ";" + x2 + ";" + y2;
					} else {
						tiletag = tiletype + ";" + tilenumber + ";" + tile_on + ";" + tilecolor + ";" + tileradius + ";" + tilebrightness;
					}
					tilearray.push(tiletag);
					//Graphics.Debug('Push',tiletag);
				}
				$gameVariables.SetTileArray(tilearray);
				ReloadTagArea();
				//Graphics.Debug('tile length',tile_lights.length);
			}
			// ************* TINT  *******************
			if (command === 'tint') {

				if (args[0] === 'set') {
					//var tint_value = args[1];
					$gameVariables.SetTint(args[1]);
					$gameVariables.SetTintTarget(args[1]);
				}
				if (args[0] === 'fade') {
					//var Tint_target = args[1];
					//var Tint_speed = args[2];
					$gameVariables.SetTintTarget(args[1]);
					$gameVariables.SetTintSpeed(args[2]);
				}

				 //Graphics.Debug('TINT',args[1]+' '+args[1]+' '+args[2]);
			}

			// ************* MOGHUNTER TIMESYSTEM COMPATIBLE  *******************
			if (command === 'tls_moghunter') {
				if (args[0] === 'on') {
					//moghunter = true;
					$gameVariables.SetMog(true);
				}
				if (args[0] === 'off') {
					//moghunter = false
					$gameVariables.SetTint('#000000');
					$gameVariables.SetMog(false);
				}
				if (args[0] === 'tint') {

					if (args.length == 7) {
						var mogtint = $gameVariables.GetMogTintArray();
						for (var i = 0; i <= 5; i++) {
							var tintcolor = args[i];
							var isValidColor3 = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(tintcolor);
							if (isValidColor3 == true) {
								mogtint[i] = tintcolor;
								//Graphics.Debug('TEST',tintcolor);
								$gameVariables.SetMogTintArray(mogtint);
							}
						}
					}
				}
				if (args[0] === 'debug') {
					mogdebug = true;
				}
			}

			// ************* DAYNIGHT *******************
			if (command === 'daynight') {

				var daynightspeed = $gameVariables.GetDaynightSpeed();
				var daynighttimer = $gameVariables.GetDaynightTimer();     // timer = minutes * speed
				var daynightcycle = $gameVariables.GetDaynightCycle();     // cycle = hours
				var daynighthoursinday = $gameVariables.GetDaynightHoursinDay();   // 24
				var daynightcolors = $gameVariables.GetDaynightColorArray();

				if (args[0] === 'speed') {
					daynightspeed = Number(args[1]);
					if (daynightspeed <= 0) {
						daynightspeed = 5000;
					}
					$gameVariables.SetDaynightSpeed(daynightspeed);
				}

				if (args[0] === 'add') {
					var houradd = Number(args[1]);
					var minuteadd = 0;
					if (args.length > 2) {
						minuteadd = Number(args[2]);
					}

					var daynightminutes = Math.floor(daynighttimer / daynightspeed);
					daynightminutes = daynightminutes + minuteadd;
					if (daynightminutes > 60) {
						daynightminutes = daynightminutes - 60;
						daynightcycle = daynightcycle + 1;
					}
					daynightcycle = daynightcycle + houradd;
					daynighttimer = daynightminutes * daynightspeed;

					if (daynightsavemin > 0) {
						$gameVariables.setValue(daynightsavemin, daynightminutes);
					}
					if (daynightcycle < 0) {
						daynightcycle = 0;
					}
					if (daynightcycle >= daynighthoursinday) {
						daynightcycle = daynightcycle - daynighthoursinday;
					}
					if (daynightsavehours > 0) {
						$gameVariables.setValue(daynightsavehours, daynightcycle);
					}

					$gameVariables.SetDaynightTimer(daynighttimer);     // timer = minutes * speed
					$gameVariables.SetDaynightCycle(daynightcycle);     // cycle = hours

				}


				if (args[0] === 'hour') {
					daynightcycle = Number(args[1]);
					if (args.length > 2) {
						daynightminutes = Number(args[2]);
					} else {
						daynightminutes = 0;
					}
					daynighttimer = daynightminutes * daynightspeed;

					if (daynightsavemin > 0) {
						$gameVariables.setValue(daynightsavemin, daynightminutes);
					}
					if (daynightcycle < 0) {
						daynightcycle = 0;
					}
					if (daynightcycle >= daynighthoursinday) {
						daynightcycle = (daynighthoursinday - 1);
					}
					if (daynightsavehours > 0) {
						$gameVariables.setValue(daynightsavehours, daynightcycle);
					}

					$gameVariables.SetDaynightTimer(daynighttimer);     // timer = minutes * speed
					$gameVariables.SetDaynightCycle(daynightcycle);     // cycle = hours

				}

				if (args[0] === 'hoursinday') {

					var old_value = daynighthoursinday;
					daynighthoursinday = Number(args[1]);
					if (daynighthoursinday < 0) {
						daynighthoursinday = 0;
					}
					if (daynighthoursinday > old_value) {
						for (var i = old_value; i < daynighthoursinday; i++) {
							daynightcolors.push('#FFFFFF');
						}
					}
					$gameVariables.setDayNightColorArray(daynightcolors);
					$gameVariables.setDayNightHoursInDay(daynighthoursinday);
				}

				if (args[0] === 'debug') {
					daynightdebug = true;
				}


				if (args[0] === 'color') {

					var hour = Number(args[1]);
					if (hour < 0) {
						hour = 0;
					}
					if (hour >= daynighthoursinday) {
						hour = (daynighthoursinday - 1);
					}
					var hourcolor = args[2];
					var isValidColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hourcolor);
					if (isValidColor) {
						daynightcolors[hour] = hourcolor;
					}
					$gameVariables.SetDaynightColorArray(daynightcolors);
				}


			}

			// ************* FLASHLIGHT *******************
			if (command === 'flashlight') {
				if (args[0] == 'on') {

					var flashlightlength = $gameVariables.GetFlashlightLength();
					var flashlightwidth = $gameVariables.GetFlashlightWidth();
					var flashlightdensity = $gameVariables.GetFlashlightDensity();
					var playercolor = $gameVariables.GetPlayerColor();

					if (args.length >= 1) {
						flashlightlength = args[1];
					}
					if (args.length >= 2) {
						flashlightwidth = args[2];
					}
					if (args.length >= 3) {
						playercolor = args[3];
						var isValidPlayerColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(playercolor);
						if (!isValidPlayerColor) {
							playercolor = '#FFFFFF'
						}
					}
					if (args.length >= 4) {
						flashlightdensity = args[4]; // density
					}

					if (flashlightlength == 0 || isNaN(flashlightlength)) {
						flashlightlength = 8
					}
					if (flashlightwidth == 0 || isNaN(flashlightwidth)) {
						flashlightwidth = 12
					}
					if (flashlightdensity == 0 || isNaN(flashlightdensity)) {
						flashlightdensity = 3
					}

					$gameVariables.SetFlashlight(true);
					$gameVariables.SetPlayerColor(playercolor);
					$gameVariables.SetFlashlightWidth(flashlightwidth);
					$gameVariables.SetFlashlightLength(flashlightlength);
					$gameVariables.SetFlashlightDensity(flashlightdensity);

				}
				if (args[0] === 'off') {
					$gameVariables.SetFlashlight(false);
				}

			}

			// ******************* SET FIRE *******************
			if (command === 'setfire') {

				flickerradiusshift = args[0];
				flickercolorshift = args[1];
				$gameVariables.SetFireRadius(flickerradiusshift);
				$gameVariables.SetFireColorshift(flickercolorshift);
			}

			// ******************* FIRE *******************
			if (command === 'fire') {
				$gameVariables.SetFire(true);
			} else {
				$gameVariables.SetFire(false);
			}

			// ******************** MAIN PLAYER SETTINGS ***************
			if (command === 'light' || command === 'fire') {

				//******************* Light radius 100 #FFFFFF ************************
				if (args[0] == 'radius') {
					var newradius = Number(args[1]);
					if (newradius >= 0) {
						$gameVariables.SetRadius(newradius);
						$gameVariables.SetRadiusTarget(newradius);

					}
					if (args.length > 2) {
						playercolor = args[2];
						var isValidPlayerColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(playercolor);
						if (!isValidPlayerColor) {
							playercolor = '#FFFFFF'
						}
						$gameVariables.SetPlayerColor(playercolor);
					}
					// player brightness
					if (args.length > 3) {
						var brightness = 0.0;
						var b_arg = args[3];
						if (typeof b_arg != 'undefined') {
							var key = b_arg.substring(0, 1);
							if (key == 'b' || key == 'B') {
								var brightness = Number(b_arg.substring(1)) / 100;
								$gameVariables.SetPlayerBrightness(brightness);
							}
						}
					}
				}

				//******************* Light radiusgrow 100 #FFFFFF ************************
				if (args[0] === 'radiusgrow') {
					var evid = this._eventId;
					//Graphics.printError('test',evid);
					var newradius = Number(args[1]);
					if (newradius >= 0) {

						var lightgrow_value = $gameVariables.GetRadius();
						var lightgrow_target = newradius;
						var lightgrow_speed = 0.0;
						if (args.length >= 4) {
							if (player_radius > newradius) {
								//shrinking
								lightgrow_speed = (player_radius * 0.012) / Number(args[4]);
							} else {
								//growing
								lightgrow_speed = (newradius * 0.012) / Number(args[4]);
							}
						} else {
							lightgrow_speed = (Math.abs(newradius - player_radius)) / 500;
						}

						//Graphics.Debug('RADIUS GROW',player_radius+' '+lightgrow_value+' '+lightgrow_target+' '+lightgrow_speed);


						$gameVariables.SetRadius(lightgrow_value);
						$gameVariables.SetRadiusTarget(lightgrow_target);
						$gameVariables.SetRadiusSpeed(lightgrow_speed);
					}
					// player color
					if (args.length > 2) {
						playercolor = args[2];
						var isValidPlayerColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(playercolor);
						if (!isValidPlayerColor) {
							playercolor = '#FFFFFF'
						}
						$gameVariables.SetPlayerColor(playercolor);
					}
					// player brightness
					if (args.length > 3) {
						var brightness = 0.0;
						var b_arg = args[3];
						if (typeof b_arg != 'undefined') {
							var key = b_arg.substring(0, 1);
							if (key == 'b' || key == 'B') {
								brightness = Number(b_arg.substring(1)) / 100;
								$gameVariables.SetPlayerBrightness(brightness);
							}
						}
					}

				}

				// *********************** TURN SPECIFIC LIGHT ON *********************
				if (args[0] === 'on') {

					var lightarray_id = $gameVariables.GetLightArrayId();
					var lightarray_state = $gameVariables.GetLightArrayState();
					var lightarray_color = $gameVariables.GetLightArrayColor();

					var lightid = Number(args[1]);
					var idfound = false;
					for (var i = 0; i < lightarray_id.length; i++) {
						if (lightarray_id[i] == lightid) {
							idfound = true;
							lightarray_state[i] = true;
							//Graphics.Debug('state id',i);
						}
					}
					if (idfound == false) {
						lightarray_id.push(lightid);
						lightarray_state.push(true);
						lightarray_color.push('defaultcolor');
						//Graphics.Debug('new state id',i);
					}

					//Graphics.Debug("lightarrays",lightarray_id.length+' '+lightarray_state.length+' '+lightarray_color.length )

					$gameVariables.SetLightArrayId(lightarray_id);
					$gameVariables.SetLightArrayState(lightarray_state);
					$gameVariables.SetLightArrayColor(lightarray_color);
				}

				// *********************** TURN SPECIFIC LIGHT OFF *********************
				if (args[0] === 'off') {

					var lightarray_id = $gameVariables.GetLightArrayId();
					var lightarray_state = $gameVariables.GetLightArrayState();
					var lightarray_color = $gameVariables.GetLightArrayColor();

					var lightid = Number(args[1]);
					var idfound = false;
					for (var i = 0; i < lightarray_id.length; i++) {
						if (lightarray_id[i] == lightid) {
							idfound = true;
							lightarray_state[i] = false;
						}
					}
					if (idfound == false) {
						lightarray_id.push(lightid);
						lightarray_state.push(false);
						lightarray_color.push('defaultcolor');
					}
					$gameVariables.SetLightArrayId(lightarray_id);
					$gameVariables.SetLightArrayState(lightarray_state);
					$gameVariables.SetLightArrayColor(lightarray_color);
				}

				// *********************** SET COLOR *********************

				if (args[0] === 'color') {

					var newcolor = args[2];

					var lightarray_id = $gameVariables.GetLightArrayId();
					var lightarray_state = $gameVariables.GetLightArrayState();
					var lightarray_color = $gameVariables.GetLightArrayColor();

					var lightid = Number(args[1]);
					var idfound = false;
					for (var i = 0; i < lightarray_id.length; i++) {
						if (lightarray_id[i] == lightid) {
							idfound = true;
							//lightarray_state[i] = true;
							lightarray_color[i] = newcolor;
						}
					}

					$gameVariables.SetLightArrayId(lightarray_id);
					$gameVariables.SetLightArrayState(lightarray_state);
					$gameVariables.SetLightArrayColor(lightarray_color);
				}


				// **************************** RESET ALL SWITCHES ***********************
				if (args[0] === 'switch' && args[1] === 'reset') {

					var lightarray_id = $gameVariables.GetLightArrayId();
					var lightarray_state = $gameVariables.GetLightArrayState();
					// reset switches to false
					for (var i = 0; i < $gameMap.events().length; i++) {
						if ($gameMap.events()[i]) {
							for (var j = 0; j < lightarray_id.length; j++) {
								if (lightarray_id[j] == lightid) {
									var mapid = $gameMap.mapId();
									var eventid = $gameMap.events()[i]._eventId;
									var key = [mapid, eventid, 'D'];
									$gameSelfSwitches.setValue(key, false);
								}
							}
						}
					}
					lightarray_id = [];
					lightarray_state = [];
					lightarray_color = [];
					$gameVariables.SetLightArrayId(lightarray_id);
					$gameVariables.SetLightArrayState(lightarray_state);
					$gameVariables.SetLightArrayColor(lightarray_color);
				}
			}

			// *********************** TURN SCRIPT ON/OFF *********************
			if (command === 'light' && args[0] == 'deactivate') {
				//scriptactive = false;
				$gameVariables.SetScriptActive(false);
			}
			if (command === 'light' && args[0] == 'activate') {
				//scriptactive = true;
				$gameVariables.SetScriptActive(true);
			}

			// *********************** TURN SCRIPT ON/OFF *********************
			if (command === 'script' && args[0] == 'deactivate') {
				//scriptactive = false;
				$gameVariables.SetStopScript(true);
			}
			if (command === 'script' && args[0] == 'activate') {
				//scriptactive = true;
				$gameVariables.SetStopScript(false);
			}
			//************************** SPEED/DEBUG TEST ****************************
			if (command === 'script' && args[0] == 'speedtest'  && args[1]== 'on') {
				speeddebug = true ;
			}
			if (command === 'script' && args[0] == 'speedtest'  && args[1]== 'off') {
				gamedebug = false ;
			}
			if (command === 'script' && args[0] == 'debug'  && args[1]== 'on') {
				gamedebug = true ;
			}
			if (command === 'script' && args[0] == 'debug'  && args[1]== 'off') {
				gamedebug = false ;
			}

			//************************** RELOAD MAP EVENTS ****************************
			if (command === 'reload' && args[0] == 'events' ) {
				ReloadMapEvents();
				//Graphics.Debug('Reload','Reload');
			}

			// *********************** EFFECTS *********************
			if (command === 'effect_on_event') {
				var x1 = 0;
				var y1 = 0;
				var evid = -1;
				for (var i = 0; i < $gameMap.events().length; i++) {
					if ($gameMap.events()[i]) {
						evid = $gameMap.events()[i]._eventId;
						if (evid == args[0]) {
							x1 = $gameMap.events()[i]._realX * $gameMap.tileWidth();
							y1 = $gameMap.events()[i]._realY * $gameMap.tileHeight();
						}
					}
				}
				// def = radius,color,duration(,keyword,speed)
				// 0. Radius
				// 1. Color
				// 2. Time in Frames
				// 3. Keyword (optional)   FADEIN FADEOUT FADEBOTH GROW SHRINK GROWSHRINK BIO
				// 4. Fade/Grow Speed in frames

				var radius = args[1];
				if (radius.substring(0,1) == '#') {
					radius = $gameVariables.value(Number(radius.substring(1)));
				}
				var color = args[2];
				var time = args[3];
				if (time.substring(0, 1) == '#') {
					time = $gameVariables.value(Number(time.substring(1)));
				}
				var def = radius+","+color+","+time;
				if (args.length >=5 ) {
					var command = args[4];
					var ctime = args[5];
					if (ctime.substring(0, 1) == '#') {
						ctime = $gameVariables.value(Number(ctime.substring(1)));
					}
					def = def + "," + command + "," + ctime;
				}
				Terrax_ABS_blast_x.push(String(x1));
				Terrax_ABS_blast_y.push(String(y1));
				Terrax_ABS_blast.push(def);
				Terrax_ABS_blast_duration.push(-1);
				Terrax_ABS_blast_fade.push(-1);
				Terrax_ABS_blast_grow.push(-1);
				Terrax_ABS_blast_mapid.push($gameMap.mapId());
			}
			if (command === 'effect_on_xy') {
				//Graphics.Debug('ARGS',args.length);
				var x1 = args[0];
				if (x1.substring(0, 1) == '#') {
					x1 = $gameVariables.value(Number(x1.substring(1)));
				}
				var y1 = args[1];
				if (y1.substring(0, 1) == '#') {
					y1 = $gameVariables.value(Number(y1.substring(1)));
				}
				var radius = args[2];
				if (radius.substring(0,1) == '#') {
					radius = $gameVariables.value(Number(radius.substring(1)));
				}
				var color = args[3];
				var time = args[4];
				if (time.substring(0, 1) == '#') {
					time = $gameVariables.value(Number(time.substring(1)));
				}
				var def = radius+","+color+","+time;
				if (args.length >=6 ) {
					var command = args[5];
					var ctime = args[6];
					if (ctime.substring(0, 1) == '#') {
						ctime = $gameVariables.value(Number(ctime.substring(1)));
					}
					def = def + "," + command + "," + ctime;
				}
				Terrax_ABS_blast_x.push(x1);
				Terrax_ABS_blast_y.push(y1);
				Terrax_ABS_blast.push(def);
				Terrax_ABS_blast_duration.push(-1);
				Terrax_ABS_blast_fade.push(-1);
				Terrax_ABS_blast_grow.push(-1);
				Terrax_ABS_blast_mapid.push($gameMap.mapId());
			}
		}


	};

	Spriteset_Map.prototype.createLightmask = function() {
		this._lightmask = new Lightmask();
		this.addChild(this._lightmask);
	};
	
	function Lightmask() {
	    this.initialize.apply(this, arguments);
	}


	//OLD DEFINTION
	//Lightmask.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
	//NEW DEFINITION
	//Lightmask.prototype = Object.create(PIXI.Container.prototype);

	var pixitest = PIXI.VERSION.substring(0,2) == 'v2'?"PIXI.DisplayObjectContainer.prototype":"PIXI.Container.prototype";
	Lightmask.prototype = Object.create(eval(pixitest));

	Lightmask.prototype.constructor = Lightmask;
	
	Lightmask.prototype.initialize = function() {


		if (PIXI.VERSION.substring(0,2) == 'v2') {
			PIXI.DisplayObjectContainer.call(this);
		} else {
			PIXI.Container.call(this);
		}
		// OLD DEFINITION
		//PIXI.DisplayObjectContainer.call(this);
	    // NEW DEFINITION
		//PIXI.Container.call(this);

		this._width = 1000;
	    this._height = 600;
	    this._sprites = [];
	    this._createBitmap();
	};
	
	//Updates the Lightmask for each frame.
	
	Lightmask.prototype.update = function() {
		  	this._updateMask();
	};
	
	//@method _createBitmaps
	
	Lightmask.prototype._createBitmap = function() {
	    this._maskBitmap = new Bitmap(maxX+20,maxY);   // one big bitmap to fill the intire screen with black
	    var canvas = this._maskBitmap.canvas;             // a bit larger then setting to take care of screenshakes

	};

	function ReloadMapEvents() {
		//**********************fill up new map-array *************************
		event_note = [];
		event_id = [];
		event_x = [];
		event_y = [];
		event_dir = [];
		event_moving = [];
		event_stacknumber = [];
		event_eventcount = $gameMap.events().length;

		//Graphics.Debug('Reload','Reload map events ' + event_eventcount);

		for (var i = 0; i < event_eventcount; i++) {
			if ($gameMap.events()[i]) {
				if($gameMap.events()[i].event()) {
					var note = $gameMap.events()[i].event().note;

					var note_args = note.split(" ");
					var note_command = note_args.shift().toLowerCase();

					if (note_command == "light" || note_command == "fire" || note_command == "flashlight" || note_command == "daynight") {

						event_note.push(note);
						event_id.push($gameMap.events()[i]._eventId);
						event_x.push($gameMap.events()[i]._realX);
						event_y.push($gameMap.events()[i]._realY);
						event_dir.push($gameMap.events()[i]._direction);
						event_moving.push($gameMap.events()[i]._moveType || $gameMap.events()[i]._moveRouteForcing);
						event_stacknumber.push(i);
					}
					//Graphics.Debug('Reload movetype',$gameMap.events()[i]._moveRouteForcing)
					// *********************************** DAY NIGHT Setting **************************
					daynightset = false;
					var mapnote = $dataMap.note.toLowerCase();
					var searchnote = mapnote.search("daynight");
					if (searchnote >= 0 || note_command == "daynight") {
						daynightset = true;
					}
				}
			}
		}
	}

	function ReloadTagArea() {
		// *************************** TILE TAG LIGHTSOURCES *********

		// clear arrays
		tile_lights = [];
		tile_blocks = [];

		// refill arrays

		var tilearray = $gameVariables.GetTileArray();
		for (var i = 0; i < tilearray.length; i++) {

			var tilestr = tilearray[i];
			var tileargs = tilestr.split(";");
			var tile_type = tileargs[0];
			var tile_number = tileargs[1];
			var tile_on = tileargs[2];
			var tile_color = tileargs[3];
			var tile_radius = 0;
			var brightness = 0.0;
			var shape = 0;
			var xo1 = 0.0;
			var yo1 = 0.0;
			var xo2 = 0.0;
			var yo2 = 0.0;

			if (tile_type == 1 || tile_type == 2) {

				var b_arg = tileargs[4];
				if (typeof b_arg != 'undefined') {
					shape = b_arg;
				}
				b_arg = tileargs[5];
				if (typeof b_arg != 'undefined') {
					xo1 = b_arg;
				}
				b_arg = tileargs[6];
				if (typeof b_arg != 'undefined') {
					yo1 = b_arg;
				}
				b_arg = tileargs[7];
				if (typeof b_arg != 'undefined') {
					xo2 = b_arg;
				}
				b_arg = tileargs[8];
				if (typeof b_arg != 'undefined') {
					yo2 = b_arg;
				}


			} else {
				tile_radius = tileargs[4];
				var b_arg = tileargs[5];
				if (typeof b_arg != 'undefined') {
					var key = b_arg.substring(0, 1);
					if (key == 'b' || key == 'B') {
						brightness = Number(b_arg.substring(1)) / 100;
					}
				}
			}

			if (tile_on == 1) {

				if (tile_type >= 3) {
					// *************************** TILE TAG LIGHTSOURCES *********
					for (var y = 0; y < $dataMap.height; y++) {
						for (var x = 0; x < $dataMap.width; x++) {
							var tag = 0;
							if (tile_type == 3 || tile_type == 5 || tile_type == 7) {
								tag = $gameMap.terrainTag(x, y);
							}          // tile light
							if (tile_type == 4 || tile_type == 6 || tile_type == 8) {
								tag = $dataMap.data[(5 * $dataMap.height + y) * $dataMap.width + x];
							}  // region light
							if (tag == tile_number) {
								var tilecode = x+";"+y+";"+tile_type+";"+tile_radius+";"+tile_color+";"+brightness;
								tile_lights.push(tilecode);
								//Graphics.Debug('Tilecode',tilecode+" "+tile_lights.length);
								//Graphics.Debug('tile length',tile_lights.length);
							}
						}
					}
				}


				// *************************** REDRAW MAPTILES FOR ROOFS ETC *********
				if (tile_type == 1 || tile_type == 2) {
					for (var y = 0; y < $dataMap.height; y++) {
						for (var x = 0; x < $dataMap.width; x++) {
							//var tag = $gameMap.terrainTag(x,y);
							var tag = 0;
							if (tile_type == 1) {
								tag = $gameMap.terrainTag(x, y);
							}                  // tile block
							if (tile_type == 2) {
								tag = $dataMap.data[(5 * $dataMap.height + y) * $dataMap.width + x];
							}  // region block
							if (tag == tile_number) {
								var tilecode = x + ";" + y + ";" + shape + ";" + xo1 + ";" + yo1 + ";" + xo2 + ";" + yo2 + ";" + tile_color;
								tile_blocks.push(tilecode);
								//Graphics.Debug('Tilecode', tilecode + " " + tile_blocks.length);

							}
						}
					}
				}
			}

		}
		$gameVariables.SetLightTags(tile_lights);
		$gameVariables.SetBlockTags(tile_blocks);

	}

	/**
	 * @method _updateAllSprites
	 * @private
	 */
	Lightmask.prototype._updateMask = function() {

		StartTiming();

		// ****** DETECT MAP CHANGES ********
		var map_id = $gameMap.mapId();
		if (map_id != oldmap) {
			oldmap = map_id;

			// set mog-tints on map change
			if ($gameVariables.GetMog() == true) {
				var searchdaynight = "";
				if (typeof $dataMap.note != 'undefined') {
					searchdaynight = $dataMap.note.toLowerCase();
				}
				if (searchdaynight.search('mogtime') >= 0) {
					var new_phase = 0;
					if ($gameSwitches.value(21)) {	new_phase = 0; }
					if ($gameSwitches.value(22)) {	new_phase = 1; }
					if ($gameSwitches.value(23)) {	new_phase = 2; }
					if ($gameSwitches.value(24)) {	new_phase = 3; }
					if ($gameSwitches.value(25)) {	new_phase = 4; }
					if ($gameSwitches.value(26)) {	new_phase = 5; }
					moghunter_phase = new_phase;
					var newtint = '#000000';
					var mogtint = $gameVariables.GetMogTintArray();
					if (new_phase == 0) { newtint = mogtint[0]; }
					if (new_phase == 1) { newtint = mogtint[1]; }
					if (new_phase == 2) { newtint = mogtint[2]; }
					if (new_phase == 3) { newtint = mogtint[3]; }
					if (new_phase == 4) { newtint = mogtint[4]; }
					if (new_phase == 5) { newtint = mogtint[5]; }
					$gameVariables.SetTintTarget(newtint);
					$gameVariables.SetTint(newtint);
				} else {
					$gameVariables.SetTintTarget('#000000');
					$gameVariables.SetTint('#000000');
				}
			}


			// recalc tile and region tags.
			ReloadTagArea();

			//clear color cycle arrays
			for (var i = 0; i < 1000; i++) {
				colorcycle_count[i] = 0;
				colorcycle_timer[i] = 0;
			}

			ReloadMapEvents();  // reload map events on map chance

			if (reset_each_map == 'true') {
				// reset switches to false

				var lightarray_id = $gameVariables.GetLightArrayId();
				var lightarray_state = $gameVariables.GetLightArrayState();
				var lightarray_color = $gameVariables.GetLightArrayColor();

				for (var i = 0; i < $gameMap.events().length; i++) {
					if ($gameMap.events()[i]) {
						for (var j = 0; j < lightarray_id.length; j++) {
							if (lightarray_id[j] == lightid) {
								var mapid = $gameMap.mapId();
								var eventid = $gameMap.events()[i]._eventId;
								var key = [mapid, eventid, 'D'];
								$gameSelfSwitches.setValue(key, false);
							}
						}
					}
				}
				lightarray_id = [];
				lightarray_state = [];
				lightarray_color = [];
				$gameVariables.SetLightArrayId(lightarray_id);
				$gameVariables.SetLightArrayState(lightarray_state);
				$gameVariables.SetLightArrayColor(lightarray_color);
			}
		}

		// reload mapevents if event_data has chanced (deleted or spawned events/saves)
		if (event_eventcount != $gameMap.events().length) {
			ReloadMapEvents();
			//Graphics.Debug('EventSpawn', $gameMap.events().length);
		}

		// remove old sprites
		for (var i = 0; i < this._sprites.length; i++) {	  // remove all old sprites
			this._removeSprite();
		}

		if (options_lighting_on == true) {

			if ($gameVariables.GetStopScript() == false) {

				if ($gameVariables.GetScriptActive() == true && $gameMap.mapId() >= 0) {

					// moghunter timesystem compatibility

					var searchdaynight = "";
					if (typeof $dataMap.note != 'undefined') {
						searchdaynight = $dataMap.note.toLowerCase();
					}


					if ($gameVariables.GetMog() == true) {

						if (searchdaynight.search('mogtime') >= 0) {

							var debugline = "";
							var new_phase = 0;
							if ($gameSwitches.value(21)) {
								new_phase = 0;
								debugline = debugline + " SW21:DAWN "
							} //Dawn
							if ($gameSwitches.value(22)) {
								new_phase = 1;
								debugline = debugline + " SW22:RISE "
							} //Rise
							if ($gameSwitches.value(23)) {
								new_phase = 2;
								debugline = debugline + " SW23:DAY "
							} //Day
							if ($gameSwitches.value(24)) {
								new_phase = 3;
								debugline = debugline + " SW24:SUNSET "
							} //Set
							if ($gameSwitches.value(25)) {
								new_phase = 4;
								debugline = debugline + " SW25:DUSK "
							} //Dusk
							if ($gameSwitches.value(26)) {
								new_phase = 5;
								debugline = debugline + " SW26:NIGHT "
							} //Night

							if (debugline == "") {
								debugline = "No switches (21-26) active, Mog is probably not loaded"
							}

							if (new_phase != moghunter_phase) {
								moghunter_phase = new_phase;
								var newtint = '#000000';
								var mogtint = $gameVariables.GetMogTintArray();
								if (new_phase == 0) {
									newtint = mogtint[0];
								}
								if (new_phase == 1) {
									newtint = mogtint[1];
								}
								if (new_phase == 2) {
									newtint = mogtint[2];
								}
								if (new_phase == 3) {
									newtint = mogtint[3];
								}
								if (new_phase == 4) {
									newtint = mogtint[4];
								}
								if (new_phase == 5) {
									newtint = mogtint[5];
								}

								//Terrax_tint_target = newtint;
								//Terrax_tint_speed = 10;
								//$gameVariables.setTintValue(Terrax_tint_target);
								$gameVariables.SetTintTarget(newtint);
								$gameVariables.SetTintSpeed(10);

							}
							if (mogdebug) {
								var tinttarget = $gameVariables.GetTintTarget();
								debugline = debugline + " Tintcolor: " + tinttarget;
								Graphics.Debug('MogTimeSystem Debug', debugline);
							}
						}
					}

					event_reload_counter++;  // reload map events every 200 cycles just in case.
					if (event_reload_counter > 200){
						event_reload_counter = 0;
						ReloadMapEvents()
					}



					// are there lightsources on this map?
					var darkenscreen = false;

					if (searchdaynight.search('daynight') >= 0) {
						this._addSprite(-20, 0, this._maskBitmap); // daynight tag? yes.. then turn off the lights
						darkenscreen = true;
					} else {
						for (var i = 0; i < event_note.length; i++) {
							//if ($gameMap.events()[i]) {
								var note = event_note[i];
								var note_args = note.split(" ");
								var note_command = note_args.shift().toLowerCase();
								if (note_command == "light" || note_command == "fire" || note_command == "daynight" || note_command == "flashlight") {
									this._addSprite(-20, 0, this._maskBitmap); // light event? yes.. then turn off the lights
									darkenscreen = true;
									break;
								}
							//}
						}
					}


					if (darkenscreen == true) {


						// ******** GROW OR SHRINK GLOBE PLAYER *********

						var firstrun = $gameVariables.GetFirstRun();
						if (firstrun === true) {
							Terrax_tint_speed = 60;
							Terrax_tint_target = '#000000';
							terrax_tint_speed_old = 60;
							terrax_tint_target_old = '#000000';
							$gameVariables.SetFirstRun(false);
							player_radius = Number(parameters['玩家光源']);
							$gameVariables.SetRadius(player_radius);
							//Graphics.Debug('FIRSTRUN',player_radius);
						} else {
							player_radius = $gameVariables.GetRadius();
						}
						var lightgrow_value = player_radius;
						var lightgrow_target = $gameVariables.GetRadiusTarget();
						var lightgrow_speed = $gameVariables.GetRadiusSpeed();

						//Graphics.Debug('RADIUS',player_radius+' '+lightgrow_value+' '+lightgrow_target+' '+lightgrow_speed);

						if (lightgrow_value < lightgrow_target) {
							lightgrow_value = lightgrow_value + lightgrow_speed;
							if (lightgrow_value > lightgrow_target) {
								//other wise it can keep fliping back and forth between > and <
								lightgrow_value = lightgrow_target;
							}
							player_radius = lightgrow_value;
						}
						if (lightgrow_value > lightgrow_target) {
							lightgrow_value = lightgrow_value - lightgrow_speed;
							if (lightgrow_value < lightgrow_target) {
								//other wise it can keep fliping back and forth between > and <
								lightgrow_value = lightgrow_target;
							}
							player_radius = lightgrow_value;
						}

						$gameVariables.SetRadius(player_radius);
						$gameVariables.SetRadiusTarget(lightgrow_target);

						// ****** PLAYER LIGHTGLOBE ********

						var canvas = this._maskBitmap.canvas;
						var ctx = canvas.getContext("2d");
						this._maskBitmap.fillRect(0, 0, maxX + 20, maxY, '#000000');


						ctx.globalCompositeOperation = 'lighter';
						//Graphics.Debug('Lighter',player_radius';
						//	ctx.globalCompositeOperation = 'screen';
						//	Graphics.Debug('Screen',player_radius);

						var pw = $gameMap.tileWidth();
						var ph = $gameMap.tileHeight();
						var dx = $gameMap.displayX();
						var dy = $gameMap.displayY();
						var px = $gamePlayer._realX;
						var py = $gamePlayer._realY;
						var pd = $gamePlayer._direction;

						//Graphics.Debug('Screen',pw+" "+ph+" "+dx+" "+dy+" "+px+" "+py);


						var x1 = (pw / 2) + ( (px - dx) * pw);
						var y1 = (ph / 2) + ( (py - dy) * ph);
						var paralax = false;
						// paralax does something weird with coordinates.. recalc needed
						if (dx > $gamePlayer.x) {
							var xjump = $gameMap.width() - Math.floor(dx - px);
							x1 = (pw / 2) + (xjump * pw);
						}
						if (dy > $gamePlayer.y) {
							var yjump = $gameMap.height() - Math.floor(dy - py);
							y1 = (ph / 2) + (yjump * ph);
						}

						var playerflashlight = $gameVariables.GetFlashlight();
						var playercolor = $gameVariables.GetPlayerColor();
						var flashlightlength = $gameVariables.GetFlashlightLength();
						var flashlightwidth = $gameVariables.GetFlashlightWidth();
						var playerflicker = $gameVariables.GetFire();
						var playerbrightness = $gameVariables.GetPlayerBrightness();


						var iplayer_radius = Math.floor(player_radius);

						if (iplayer_radius > 0) {
							if (playerflashlight == true) {
								this._maskBitmap.radialgradientFillRect2(x1, y1, 20, iplayer_radius, playercolor, '#000000', pd, flashlightlength, flashlightwidth);
							}
							x1 = x1 + flashlightoffsetX;
							y1 = y1 + flashlightoffsetY;
							if (iplayer_radius < 100) {
								// dim the light a bit at lower lightradius for a less focused effect.
								var r = hexToRgb(playercolor).r;
								var g = hexToRgb(playercolor).g;
								var b = hexToRgb(playercolor).b;
								g = g - 50;
								r = r - 50;
								b = b - 50;
								if (g < 0) {
									g = 0;
								}
								if (r < 0) {
									r = 0;
								}
								if (b < 0) {
									b = 0;
								}
								var newcolor = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

								this._maskBitmap.radialgradientFillRect(x1, y1, 0, iplayer_radius, newcolor, '#000000', playerflicker, playerbrightness);
							} else {
								this._maskBitmap.radialgradientFillRect(x1, y1, 20, iplayer_radius, playercolor, '#000000', playerflicker, playerbrightness);
							}

						}


						// *********************************** DAY NIGHT CYCLE TIMER **************************

						var daynightspeed = $gameVariables.GetDaynightSpeed();

						if (daynightspeed > 0 && daynightspeed < 5000) {

							var datenow = new Date();
							var seconds = Math.floor(datenow.getTime() / 10);
							if (seconds > oldseconds) {

								var daynighttimer = $gameVariables.GetDaynightTimer();     // timer = minutes * speed
								var daynightcycle = $gameVariables.GetDaynightCycle();     // cycle = hours
								var daynighthoursinday = $gameVariables.GetDaynightHoursinDay();   // 24

								oldseconds = seconds;
								daynighttimer = daynighttimer + 1;
								var daynightminutes = Math.floor(daynighttimer / daynightspeed);
								var daynighttimeover = daynighttimer - (daynightspeed * daynightminutes);
								var daynightseconds = Math.floor(daynighttimeover / daynightspeed * 60);
								if (daynightdebug == true) {
									var daynightseconds2 = daynightseconds;
									if (daynightseconds < 10) {
										daynightseconds2 = '0' + daynightseconds;
									}
									var hourvalue ='-';
									var hourset = 'Not set';
									if (daynightsavehours>0) {
										hourvalue = $gameVariables.value(daynightsavehours);
										hourset = daynightsavehours
									}
									var minutevalue ='-';
									var minuteset = 'Not set';
									if (daynightsavemin>0) {
										minutevalue = $gameVariables.value(daynightsavemin);
										minuteset = daynightsavemin
									}
									var secondvalue ='-';
									var secondset = 'Not set';
									if (daynightsavesec>0) {
										secondvalue = $gameVariables.value(daynightsavesec);
										secondset = daynightsavesec
									}

									var minutecounter = $gameVariables.value(daynightsavemin);
									var secondcounter = $gameVariables.value(daynightsavesec);
									Graphics.Debug('Debug Daynight system', daynightcycle + ' ' + daynightminutes + ' ' + daynightseconds2+
									               '<br>' +'Hours  -> Variable: '+hourset+ '  Value: '+hourvalue+
									               '<br>' +'Minutes-> Variable: '+minuteset+ '  Value: '+minutevalue+
									               '<br>' +'Seconds-> Variable: '+secondset+ '  Value: '+secondvalue);

								}
								if (daynightsavemin > 0) {
									$gameVariables.setValue(daynightsavemin, daynightminutes);
								}
								if (daynightsavesec > 0) {
									$gameVariables.setValue(daynightsavesec, daynightseconds);
								}

								if (daynighttimer >= (daynightspeed * 60)) {

									daynightcycle = daynightcycle + 1;
									if (daynightcycle >= daynighthoursinday) {
										daynightcycle = 0;
									}
									if (daynightsavehours > 0) {
										$gameVariables.setValue(daynightsavehours, daynightcycle);
									}
									daynighttimer = 0;
								}
								$gameVariables.SetDaynightTimer(daynighttimer);     // timer = minutes * speed
								$gameVariables.SetDaynightCycle(daynightcycle);     // cycle = hours
							}
						}

						// EFFECTS AND QUASI ABS SUPPORT


						// SKILLS/MISSLES (effects without duration)

						for (var i = 0; i < Terrax_ABS_skill_x.length; i++) {
							var settings = Terrax_ABS_skill[i];
							if (settings) {
								if (settings != 'undefined') {
									var setstring = settings.toString();
									var lightset = setstring.split(",");
									//Graphics.Debug('Test',setstring+" "+lightset[0]+" "+lightset[1]);

									var px = Terrax_ABS_skill_x[i];
									var py = Terrax_ABS_skill_y[i];
									var x1 = px - (dx * pw);
									var y1 = py - (dy * ph);

									this._maskBitmap.radialgradientFillRect(x1, y1, 0, lightset[0], lightset[1], '#000000', false);
								}
							}
						}

						// clear arrays after draw
						Terrax_ABS_skill_x = [];
						Terrax_ABS_skill_y = [];
						Terrax_ABS_skill = [];

						// BLASTS (effect with duration)



						for (var i = 0; i < Terrax_ABS_blast_x.length; i++) {
							var settings = Terrax_ABS_blast[i];
							if (settings) {
								if (settings != 'undefined') {
									var setstring = settings.toString();

									// Settings : Lightset[]
									// 0. Radius
									// 1. Color
									// 2. Time in Frames
									// 3. Keyword (optional)   FADEIN FADEOUT FADEBOTH GROW SHRINK GROWSHRINK BIO
									// 4. Fade/Grow Speed in frames

									var lightset = setstring.split(",");

									if (Number(lightset[2]) > 0 && Terrax_ABS_blast_duration[i] == -1) {
										Terrax_ABS_blast_duration[i] = lightset[2]
									}

									var fcolor = lightset[1];
									var fradius = lightset[0];

									if (setstring.length > 2) {  // SPECIALS  FADE/GROW ETC.

										if (lightset[3] == 'FADEIN' || lightset[3] == 'FADEINOUT' || lightset[3] == 'BIO') {

											var fadelength = Number(lightset[4]);   // number of frames to fade in

											if (Terrax_ABS_blast_fade[i] == -1) {
												Terrax_ABS_blast_fade[i] = 0;
											}
											if (Terrax_ABS_blast_fade[i] < fadelength) {
												Terrax_ABS_blast_fade[i] = Terrax_ABS_blast_fade[i] + 1;

												var startcolor = "#000000";
												var targetcolor = lightset[1];
												var fadecount = Terrax_ABS_blast_fade[i];

												var r = hexToRgb(startcolor).r;
												var g = hexToRgb(startcolor).g;
												var b = hexToRgb(startcolor).b;

												var r2 = hexToRgb(targetcolor).r;
												var g2 = hexToRgb(targetcolor).g;
												var b2 = hexToRgb(targetcolor).b;

												var stepR = (r2 - r) / (fadelength);
												var stepG = (g2 - g) / (fadelength);
												var stepB = (b2 - b) / (fadelength);

												var r3 = Math.floor(r + (stepR * fadecount));
												var g3 = Math.floor(g + (stepG * fadecount));
												var b3 = Math.floor(b + (stepB * fadecount));
												if (r3 < 0) {
													r3 = 0
												}
												if (g3 < 0) {
													g3 = 0
												}
												if (b3 < 0) {
													b3 = 0
												}
												if (r3 > 255) {
													r3 = 255
												}
												if (g3 > 255) {
													g3 = 255
												}
												if (b3 > 255) {
													b3 = 255
												}
												fcolor = "#" + ((1 << 24) + (r3 << 16) + (g3 << 8) + b3).toString(16).slice(1);
												//Graphics.Debug('FADEIN COLOR', fcolor + " " + r + " " + r2 + " " + stepR + " " + r3);

												if (Terrax_ABS_blast_fade[i] == fadelength) {
													Terrax_ABS_blast_fade[i] = 100000;  // for fadeinout
												}
											}
										}

										if (lightset[3] == 'FADEOUT') {

											var fadelength = Number(lightset[4]);   // number of frames to fade out
											if (Terrax_ABS_blast_fade[i] == -1 && Terrax_ABS_blast_duration[i] < fadelength) {
												// start fading when blastduration equals fadelength
												Terrax_ABS_blast_fade[i] = 0;
											}
											if (Terrax_ABS_blast_fade[i] < fadelength && Terrax_ABS_blast_fade[i] >= 0) {
												Terrax_ABS_blast_fade[i] = Terrax_ABS_blast_fade[i] + 1;
												//Graphics.Debug('FADEOUT',Terrax_ABS_blast_fade[i]);
												var startcolor = lightset[1];
												var targetcolor = "#000000";
												var fadecount = Terrax_ABS_blast_fade[i];

												var r = hexToRgb(startcolor).r;
												var g = hexToRgb(startcolor).g;
												var b = hexToRgb(startcolor).b;

												var r2 = hexToRgb(targetcolor).r;
												var g2 = hexToRgb(targetcolor).g;
												var b2 = hexToRgb(targetcolor).b;

												var stepR = (r2 - r) / (fadelength);
												var stepG = (g2 - g) / (fadelength);
												var stepB = (b2 - b) / (fadelength);

												var r3 = Math.floor(r + (stepR * fadecount));
												var g3 = Math.floor(g + (stepG * fadecount));
												var b3 = Math.floor(b + (stepB * fadecount));
												if (r3 < 0) {
													r3 = 0
												}
												if (g3 < 0) {
													g3 = 0
												}
												if (b3 < 0) {
													b3 = 0
												}
												if (r3 > 255) {
													r3 = 255
												}
												if (g3 > 255) {
													g3 = 255
												}
												if (b3 > 255) {
													b3 = 255
												}
												fcolor = "#" + ((1 << 24) + (r3 << 16) + (g3 << 8) + b3).toString(16).slice(1);
												//Graphics.Debug('FADEIN COLOR', fcolor + " " + r + " " + r2 + " " + stepR + " " + r3);
											}
										}

										if (lightset[3] == 'FADEINOUT' || lightset[3] == 'BIO') {
											// fadeout only, fadein is handled by fadein
											var fadelength = Number(lightset[4]);   // number of frames to fade out
											if (Terrax_ABS_blast_fade[i] == 100000 && Terrax_ABS_blast_duration[i] < fadelength) {
												// start fading when blastduration equals fadelength
												Terrax_ABS_blast_fade[i] = 100001;
											}
											if (Terrax_ABS_blast_fade[i] - 100000 < fadelength && Terrax_ABS_blast_fade[i] > 100000) {
												Terrax_ABS_blast_fade[i] = Terrax_ABS_blast_fade[i] + 1;
												//Graphics.Debug('FADEOUT',Terrax_ABS_blast_fade[i]);
												var startcolor = lightset[1];
												var targetcolor = "#000000";
												var fadecount = Terrax_ABS_blast_fade[i] - 100000;

												var r = hexToRgb(startcolor).r;
												var g = hexToRgb(startcolor).g;
												var b = hexToRgb(startcolor).b;

												var r2 = hexToRgb(targetcolor).r;
												var g2 = hexToRgb(targetcolor).g;
												var b2 = hexToRgb(targetcolor).b;

												var stepR = (r2 - r) / (fadelength);
												var stepG = (g2 - g) / (fadelength);
												var stepB = (b2 - b) / (fadelength);

												var r3 = Math.floor(r + (stepR * fadecount));
												var g3 = Math.floor(g + (stepG * fadecount));
												var b3 = Math.floor(b + (stepB * fadecount));
												if (r3 < 0) {
													r3 = 0
												}
												if (g3 < 0) {
													g3 = 0
												}
												if (b3 < 0) {
													b3 = 0
												}
												if (r3 > 255) {
													r3 = 255
												}
												if (g3 > 255) {
													g3 = 255
												}
												if (b3 > 255) {
													b3 = 255
												}
												fcolor = "#" + ((1 << 24) + (r3 << 16) + (g3 << 8) + b3).toString(16).slice(1);
												//Graphics.Debug('FADEIN COLOR', fcolor + " " + r + " " + r2 + " " + stepR + " " + r3);
											}

										}

										if (lightset[3] == 'GROW' || lightset[3] == 'GROWSHRINK' || lightset[3] == 'BIO') {

											var growlength = Number(lightset[4]);   // number of frames to grow

											if (Terrax_ABS_blast_grow[i] == -1) {
												Terrax_ABS_blast_grow[i] = 0;
											}
											if (Terrax_ABS_blast_grow[i] < growlength) {

												if (lightset[3] == 'BIO') {
													Terrax_ABS_blast_grow[i] = Terrax_ABS_blast_grow[i] + 0.5;
												} else {
													Terrax_ABS_blast_grow[i] = Terrax_ABS_blast_grow[i] + 1;
												}

												var startradius = 0;
												var targetradius = lightset[0];
												var radiuscount = Terrax_ABS_blast_grow[i];

												var step = (targetradius - startradius) / (growlength);

												fradius = Math.floor(step * radiuscount);

											}
											if (Terrax_ABS_blast_grow[i] == growlength) {
												Terrax_ABS_blast_grow[i] = 100000;
											}
										}

										if (lightset[3] == 'SHRINK') {

											var shrinklength = Number(lightset[4]);   // number of frames to shrink

											if (Terrax_ABS_blast_grow[i] == -1 && Terrax_ABS_blast_duration[i] < shrinklength) {
												Terrax_ABS_blast_grow[i] = 0;
											}
											if (Terrax_ABS_blast_grow[i] < shrinklength && Terrax_ABS_blast_grow[i] >= 0) {
												Terrax_ABS_blast_grow[i] = Terrax_ABS_blast_grow[i] + 1;

												var startradius = lightset[0];
												var targetradius = 0;
												var radiuscount = Terrax_ABS_blast_grow[i];

												var step = (startradius - targetradius ) / (shrinklength);
												fradius = Number(lightset[0]) - Math.floor(step * radiuscount);

											}

										}

										if (lightset[3] == 'GROWSHRINK') {
											// GROW is handled in grow
											var shrinklength = Number(lightset[4]);   // number of frames to shrink

											//Graphics.Debug('GROWSHRINK',Terrax_ABS_blast_grow[i]);

											if (Terrax_ABS_blast_grow[i] == 100000 && Terrax_ABS_blast_duration[i] < shrinklength) {
												Terrax_ABS_blast_grow[i] = 100001;
											}
											if (Terrax_ABS_blast_grow[i] - 100000 < shrinklength && Terrax_ABS_blast_grow[i] > 100000) {
												Terrax_ABS_blast_grow[i] = Terrax_ABS_blast_grow[i] + 1;

												var startradius = lightset[0];
												var targetradius = 0;
												var radiuscount = Terrax_ABS_blast_grow[i] - 100000;

												var step = (startradius - targetradius ) / (shrinklength);
												fradius = Number(lightset[0]) - Math.floor(step * radiuscount);

											}
										}

									}


									if (Terrax_ABS_blast_duration[i] > 0) {
										Terrax_ABS_blast_duration[i]--;
										//Graphics.Debug('Test',i+" "+lightset[0]+" "+lightset[1]+" "+Terrax_ABS_blast_duration[i]);
										if (Terrax_ABS_blast_mapid[i] == $gameMap.mapId()) {
											var px = Terrax_ABS_blast_x[i];
											var py = Terrax_ABS_blast_y[i];

											var x1 = px - (dx * pw);
											var y1 = py - (dy * ph);

											// paralaxloop does something weird with coordinates.. recalc needed

											if ($dataMap.scrollType === 2 || $dataMap.scrollType === 3) {
												if (dx - 10 > px / pw) {
													var lxjump = $gameMap.width() - (dx - px / pw);
													x1 = (lxjump * pw);
												}
											}
											if ($dataMap.scrollType === 1 || $dataMap.scrollType === 3) {
												if (dy - 10 > py / ph) {
													var lyjump = $gameMap.height() - (dy - py / ph);
													y1 = (lyjump * ph);
												}
											}
											x1 = x1 + (pw / 2);
											y1 = y1 + (ph / 2);

											//Graphics.Debug('Test',dy+" "+py+" "+y1+" "+$gameMap.height()+" "+lyjump);
											this._maskBitmap.radialgradientFillRect(x1, y1, 0, fradius, fcolor, '#000000', false);
										}
									} else {
										Terrax_ABS_blast[i] = "DELETE";
									}
								}
							}
						}

						// remove all expired items (not done in previous loop because it cases flickering)
						for (var i = 0; i < Terrax_ABS_blast_x.length; i++) {
							var settings = Terrax_ABS_blast[i];
							if (settings) {
								if (settings != 'undefined') {
									var setstring = settings.toString();
									if (setstring == "DELETE") {
										Terrax_ABS_blast_x.splice(i, 1);
										Terrax_ABS_blast_y.splice(i, 1);
										Terrax_ABS_blast.splice(i, 1);
										Terrax_ABS_blast_duration.splice(i, 1);
										Terrax_ABS_blast_mapid.splice(i, 1);
										Terrax_ABS_blast_fade.splice(i, 1);
										Terrax_ABS_blast_grow.splice(i, 1);
									}
								}
							}
						}


						// ********** OTHER LIGHTSOURCES **************

						for (var i = 0; i < event_note.length; i++) {
							//if ($gameMap.events()[i]) {

								//var note = $gameMap.events()[i].event().note;
								//var evid = $gameMap.events()[i]._eventId;
								var note = event_note[i];
								var evid = event_id[i];

								var note_args = note.split(" ");
								var note_command = note_args.shift().toLowerCase();


								if (note_command == "light" || note_command == "fire" || note_command == "flashlight") {

									var objectflicker = false;
									if (note_command == "fire") {
										objectflicker = true;
									}

									var light_radius = 1;
									var flashlength = 8;
									var flashwidth = 12;
									if (note_command == "flashlight") {
										flashlength = Number(note_args.shift());
										flashwidth = Number(note_args.shift());
										if (flashlength == 0) {
											flashlightlength = 8
										}
										if (flashwidth == 0) {
											flashlightlength = 12
										}
									} else {
										light_radius = note_args.shift();
									}
									// light radius
									if (light_radius >= 0) {

										// light color
										var colorvalue = note_args.shift();

										// Cycle colors


										if (colorvalue == 'cycle' && evid < 1000) {

											var cyclecolor0 = note_args.shift();
											var cyclecount0 = Number(note_args.shift());
											var cyclecolor1 = note_args.shift();
											var cyclecount1 = Number(note_args.shift());
											var cyclecolor2 = '#000000';
											var cyclecount2 = 0;
											var cyclecolor3 = '#000000';
											var cyclecount3 = 0;

											var morecycle = note_args.shift();
											if (typeof morecycle != 'undefined') {
												if (morecycle.substring(0, 1) == "#") {
													cyclecolor2 = morecycle;
													cyclecount2 = Number(note_args.shift());
													morecycle = note_args.shift();
													if (typeof morecycle != 'undefined') {
														if (morecycle.substring(0, 1) == "#") {
															cyclecolor3 = morecycle;
															cyclecount3 = Number(note_args.shift());

														} else {
															note_args.unshift(morecycle);
														}
													}
												} else {
													note_args.unshift(morecycle);
												}
											}

											var switch0 = '0';
											var switch1 = '0';
											var switch2 = '0';
											var switch3 = '0';

											var switches = note_args.shift();
											if (typeof switches != 'undefined') {
												if (switches.length == 7) {
													if (switches.substring(0, 3) == "SS:") {
														switch0 = switches.substring(3, 4);
														switch1 = switches.substring(4, 5);
														switch2 = switches.substring(5, 6);
														switch3 = switches.substring(6, 7);
													} else {
														note_args.unshift(switches);
													}
												} else {
													note_args.unshift(switches);
												}
											}

											// set cycle color
											switch (colorcycle_count[evid]) {
												case 0:
													colorvalue = cyclecolor0;
													break;
												case 1:
													colorvalue = cyclecolor1;
													break;
												case 2:
													colorvalue = cyclecolor2;
													break;
												case 3:
													colorvalue = cyclecolor3;
													break;
												default:
													colorvalue = '#FFFFFF';
											}

											// cycle timing
											//var datenow = new Date();
											//var seconds = Math.floor(datenow.getTime() / 100);
											cyclecolor_counter = cyclecolor_counter + 1;

											if (cyclecolor_counter > 10) {
												cyclecolor_counter = 0;

												//reset all switches
												if (switch0 != '0') {
													key = [map_id, evid, switch0];
													$gameSelfSwitches.setValue(key, false);
												}
												if (switch1 != '0') {
													key = [map_id, evid, switch1];
													$gameSelfSwitches.setValue(key, false);
												}
												if (switch2 != '0') {
													key = [map_id, evid, switch2];
													$gameSelfSwitches.setValue(key, false);
												}
												if (switch3 != '0') {
													key = [map_id, evid, switch3];
													$gameSelfSwitches.setValue(key, false);
												}


												if (colorcycle_count[evid] == 0) {
													colorcycle_timer[evid]++;

													if (colorcycle_timer[evid] > cyclecount0) {
														colorcycle_count[evid] = 1;
														colorcycle_timer[evid] = 0;
														if (switch1 != '0') {
															key = [map_id, evid, switch1];
															$gameSelfSwitches.setValue(key, true);
														}
													} else {
														if (switch0 != '0') {
															key = [map_id, evid, switch0];
															$gameSelfSwitches.setValue(key, true);
														}
													}

												}
												if (colorcycle_count[evid] == 1) {
													colorcycle_timer[evid]++;
													if (colorcycle_timer[evid] > cyclecount1) {
														colorcycle_count[evid] = 2;
														colorcycle_timer[evid] = 0;
														if (switch2 != '0') {
															key = [map_id, evid, switch2];
															$gameSelfSwitches.setValue(key, true);
														}
													} else {
														if (switch1 != '0') {
															key = [map_id, evid, switch1];
															$gameSelfSwitches.setValue(key, true);
														}
													}
												}
												if (colorcycle_count[evid] == 2) {
													colorcycle_timer[evid]++;
													if (colorcycle_timer[evid] > cyclecount2) {
														colorcycle_count[evid] = 3;
														colorcycle_timer[evid] = 0;
														if (switch3 != '0') {
															key = [map_id, evid, switch3];
															$gameSelfSwitches.setValue(key, true);
														}
													} else {
														if (switch2 != '0') {
															key = [map_id, evid, switch2];
															$gameSelfSwitches.setValue(key, true);
														}
													}
												}
												if (colorcycle_count[evid] == 3) {
													colorcycle_timer[evid]++;
													if (colorcycle_timer[evid] > cyclecount3) {
														colorcycle_count[evid] = 0;
														colorcycle_timer[evid] = 0;
														if (switch0 != '0') {
															key = [map_id, evid, switch0];
															$gameSelfSwitches.setValue(key, true);
														}
													} else {
														if (switch3 != '0') {
															key = [map_id, evid, switch3];
															$gameSelfSwitches.setValue(key, true);
														}
													}
												}
												//Graphics.Debug('cycleswitch',switch0 + " "+ switch1+ " "+ switch2+ " "+ switch3);

											}

										} else {
											var isValidColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorvalue);
											if (!isValidColor) {
												colorvalue = '#FFFFFF'
											}
										}

										// brightness and direction

										var brightness = 0.0;
										var direction = 0;
										var next_arg = note_args.shift();

										if (typeof next_arg != 'undefined') {
											var key = next_arg.substring(0, 1);
											if (key == 'b' || key == 'B') {
												brightness = Number(next_arg.substring(1)) / 100;
												next_arg = note_args.shift();
												if (typeof next_arg != 'undefined') {
													key = next_arg.substring(0, 1);
												}
											}
											if (key == 'd' || key == 'D') {
												direction = next_arg.substring(1);
												next_arg = note_args.shift();
											}
										}

										// conditional lighting
										var lightid = 0;
										if (typeof next_arg != 'undefined') {
											lightid = next_arg;
										}

										var state = true;
										if (lightid > 0) {
											state = false;

											var lightarray_id = $gameVariables.GetLightArrayId();
											var lightarray_state = $gameVariables.GetLightArrayState();
											var lightarray_color = $gameVariables.GetLightArrayColor();

											for (var j = 0; j < lightarray_id.length; j++) {
												if (lightarray_id[j] == lightid) {
													// idfound = true;
													state = lightarray_state[j];

													var newcolor = lightarray_color[j];

													if (newcolor != 'defaultcolor') {
														colorvalue = newcolor;
													}

													//Graphics.Debug("lightarrays",lightarray_id.length+' '+lightarray_state.length+' '+lightarray_color.length )

													//var mapid = $gameMap.mapId();
													//var eventid = $gameMap.events()[i]._eventId;

													//Graphics.printError('test',mapid+' '+eventid);
													key = [map_id, evid , 'D'];
													if (state == true) {
														$gameSelfSwitches.setValue(key, true);
													} else {
														$gameSelfSwitches.setValue(key, false);
													}
												}
											}
										}

										// 失效开关
										if (killswitch == 'A' || killswitch == 'B' || killswitch == 'C' || killswitch == 'D') {
											key = [map_id, evid, killswitch];
											if ($gameSelfSwitches.value(key) == true) {
												state = false;
												//Graphics.Debug('Deathswitch',killswitch);
											}
										}



										// show light
										if (state == true) {

											var lpx = 0;
											var lpy = 0;
											var ldir = 0;
											if (event_moving[i] >0) {
												lpx = $gameMap.events()[event_stacknumber[i]]._realX;
												lpy = $gameMap.events()[event_stacknumber[i]]._realY;
												ldir = $gameMap.events()[event_stacknumber[i]]._direction;

											//	lpx = event_x[i];
											//	lpy = event_y[i];
											//	ldir = event_dir[i];

											} else {
												lpx = event_x[i];
												lpy = event_y[i];
												ldir = event_dir[i];
											}

											//var lpx = $gameMap.events()[i]._realX;
											//var lpy = $gameMap.events()[i]._realY;
											//var ldir = $gameMap.events()[i]._direction;

											// moving lightsources
											var flashlight = false;
											if (note_command == "flashlight") {
												flashlight = true;

												var walking = event_moving[i];
												if (walking == false) {
													var tldir = Number(note_args.shift());
													if (!isNaN(tldir)) {
														if (tldir < 0 || ldir >= 5) {
															ldir = 4
														}
														if (tldir == 1) {
															ldir = 8
														}
														if (tldir == 2) {
															ldir = 6
														}
														if (tldir == 3) {
															ldir = 2
														}
														if (tldir == 4) {
															ldir = 4
														}
													}
												}


											}

											//Graphics.Debug('ldir',ldir);

											var lx1 = (pw / 2) + ( (lpx - dx) * pw);
											var ly1 = (ph / 2) + ( (lpy - dy) * ph);
											// paralaxloop does something weird with coordinates.. recalc needed

											if ($dataMap.scrollType === 2 || $dataMap.scrollType === 3) {
												if (dx - 10 > lpx) {
													var lxjump = $gameMap.width() - (dx - lpx);
													lx1 = (pw / 2) + (lxjump * pw);
												}
											}
											if ($dataMap.scrollType === 1 || $dataMap.scrollType === 3) {
												if (dy - 10 > lpy) {
													var lyjump = $gameMap.height() - (dy - lpy);
													ly1 = (ph / 2) + (lyjump * ph);
												}
											}

											if (flashlight == true) {
												this._maskBitmap.radialgradientFillRect2(lx1, ly1, 0, light_radius, colorvalue, '#000000', ldir, flashlength, flashwidth);
											} else {
												this._maskBitmap.radialgradientFillRect(lx1, ly1, 0, light_radius, colorvalue, '#000000', objectflicker, brightness, direction);
											}

										}



									}
								}



							//}
						}



						// *************************** TILE TAG *********************
						//

						//var tilearray = $gameVariables.GetTileArray();

						//glow/colorfade
						var glowdatenow = new Date();
						var glowseconds = Math.floor(glowdatenow.getTime() / 100);

						if (glowseconds > glow_oldseconds) {
							//Graphics.Debug('GLOW',tileglow);
							glow_oldseconds = glowseconds;
							tileglow = tileglow + glow_dir;

							if (tileglow > 120) {
								glow_dir = -1;
							}
							if (tileglow < 1) {
								glow_dir = 1;
							}
						}

						tile_lights = $gameVariables.GetLightTags();
						tile_blocks = $gameVariables.GetBlockTags();

						//Graphics.Debug('tile length',tile_lights.length);
						for (var i = 0; i < tile_lights.length; i++) {
							var tilestr = tile_lights[i];

							var tileargs = tilestr.split(";");
							var x = tileargs[0];
							var y = tileargs[1];
							var tile_type = tileargs[2];
							var tile_radius = tileargs[3];
							var tile_color = tileargs[4];
							var brightness = tileargs[5];

							//Graphics.Debug('tile',x+" "+y+" "+tile_type+" "+tile_radius+" "+tile_color+" "+brightness);

							var x1 = (pw / 2) + (x - dx) * pw;
							var y1 = (ph / 2) + (y - dy) * ph;

							if ($dataMap.scrollType === 2 || $dataMap.scrollType === 3) {
								if (dx - 5 > x) {
									var lxjump = $gameMap.width() - (dx - x);
									x1 = (pw / 2) + (lxjump * pw);
								}
							}
							if ($dataMap.scrollType === 1 || $dataMap.scrollType === 3) {
								if (dy - 5 > y) {
									var lyjump = $gameMap.height() - (dy - y);
									y1 = (ph / 2) + (lyjump * ph);
								}
							}

							if (tile_type == 3 || tile_type == 4) {
								this._maskBitmap.radialgradientFillRect(x1, y1, 0, tile_radius, tile_color, '#000000', false, brightness); // Light
							} else if (tile_type == 5 || tile_type == 6) {
								this._maskBitmap.radialgradientFillRect(x1, y1, 0, tile_radius, tile_color, '#000000', true, brightness);  // Fire
							} else {

								//Graphics.Debug('Tiletype',tile_type);
								var r = hexToRgb(tile_color).r;
								var g = hexToRgb(tile_color).g;
								var b = hexToRgb(tile_color).b;


								r = Math.floor(r + (60 - tileglow));
								g = Math.floor(g + (60 - tileglow));
								b = Math.floor(b + (60 - tileglow));
								//Graphics.Debug('Tiletype',tileglow+' '+r+' '+g+' '+b);
								if (r < 0) {
									r = 0;
								}
								if (g < 0) {
									g = 0;
								}
								if (b < 0) {
									b = 0;
								}
								if (r > 255) {
									r = 255;
								}
								if (g > 255) {
									g = 255;
								}
								if (b > 255) {
									b = 255;
								}

								var newtile_color = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
								//Graphics.Debug('Tiletype',tileglow+' '+r+' '+g+' '+b+' '+newtile_color);
								this._maskBitmap.radialgradientFillRect(x1, y1, 0, tile_radius, newtile_color, '#000000', false, brightness);
							}


						}



						ctx.globalCompositeOperation = "multiply";
						for (var i = 0; i < tile_blocks.length; i++) {
							var tilestr = tile_blocks[i];
							var tileargs = tilestr.split(";");

							var x = tileargs[0];
							var y = tileargs[1];
							var shape = tileargs[2];
							var xo1 = tileargs[3];
							var yo1 = tileargs[4];
							var xo2 = tileargs[5];
							var yo2 = tileargs[6];
							var tile_color = tileargs[7];


							var x1 = (x - dx) * pw;
							var y1 = (y - dy) * ph;

							if ($dataMap.scrollType === 2 || $dataMap.scrollType === 3) {
								if (dx - 5 > x) {
									var lxjump = $gameMap.width() - (dx - x);
									x1 = (lxjump * pw);
								}
							}
							if ($dataMap.scrollType === 1 || $dataMap.scrollType === 3) {
								if (dy - 5 > y) {
									var lyjump = $gameMap.height() - (dy - y);
									y1 = (lyjump * ph);
								}
							}
							if (shape == 0) {
								this._maskBitmap.FillRect(x1, y1, pw, ph, tile_color);
							}
							if (shape == 1) {
								x1 = x1 + Number(xo1);
								y1 = y1 + Number(yo1);
								this._maskBitmap.FillRect(x1, y1, Number(xo2), Number(yo2), tile_color);
							}
							if (shape == 2) {
								x1 = x1 + Number(xo1);
								y1 = y1 + Number(yo1);
								//this._maskBitmap.FillRect(x1,y1,pw,ph,tile_color);
								this._maskBitmap.FillCircle(x1, y1, Number(xo2), Number(yo2), tile_color);
							}
						}
						ctx.globalCompositeOperation = 'lighter';


						// *********************************** DAY NIGHT CYCLE FILTER **************************

						if (daynightset == true) {

							var daynighttimer = $gameVariables.GetDaynightTimer();     // timer = minutes * speed
							var daynightcycle = $gameVariables.GetDaynightCycle();     // cycle = hours
							var daynighthoursinday = $gameVariables.GetDaynightHoursinDay();   // 24
							var daynightcolors = $gameVariables.GetDaynightColorArray();

							var color1 = daynightcolors[daynightcycle];

							if (daynightspeed > 0 && daynightspeed < 5000) {
								var nextcolor = daynightcycle + 1;
								if (nextcolor >= daynighthoursinday) {
									nextcolor = 0;
								}
								var color2 = daynightcolors[nextcolor];

								var r = hexToRgb(color1).r;
								var g = hexToRgb(color1).g;
								var b = hexToRgb(color1).b;

								var r2 = hexToRgb(color2).r;
								var g2 = hexToRgb(color2).g;
								var b2 = hexToRgb(color2).b;

								var stepR = (r2 - r) / (60 * daynightspeed);
								var stepG = (g2 - g) / (60 * daynightspeed);
								var stepB = (b2 - b) / (60 * daynightspeed);

								r = Math.floor(r + (stepR * daynighttimer));
								g = Math.floor(g + (stepG * daynighttimer));
								b = Math.floor(b + (stepB * daynighttimer));

							}
							color1 = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

							this._maskBitmap.FillRect(0, 0, maxX + 20, maxY, color1);
						}

						// *********************************** TINT **************************


						if (daynightset == false) {

							var tint_value = $gameVariables.GetTint();
							var tint_target = $gameVariables.GetTintTarget();
							var tint_speed = $gameVariables.GetTintSpeed();


							if (Terrax_tint_target != terrax_tint_target_old) {
								terrax_tint_target_old = Terrax_tint_target;
								tint_target = Terrax_tint_target;
								$gameVariables.SetTintTarget(tint_target);
							}
							if (Terrax_tint_speed != terrax_tint_speed_old) {
								terrax_tint_speed_old = Terrax_tint_speed;
								tint_speed = Terrax_tint_speed;
								$gameVariables.SetTintSpeed(tint_speed);
							}

							//Graphics.Debug('TINT',tint_value+' '+tint_target+' '+tint_speed);

							var tcolor = tint_value;
							if (tint_value != tint_target) {

								var tintdatenow = new Date();
								var tintseconds = Math.floor(tintdatenow.getTime() / 10);
								if (tintseconds > tint_oldseconds) {
									tint_oldseconds = tintseconds;
									tint_timer++;
								}

								var r = hexToRgb(tint_value).r;
								var g = hexToRgb(tint_value).g;
								var b = hexToRgb(tint_value).b;

								var r2 = hexToRgb(tint_target).r;
								var g2 = hexToRgb(tint_target).g;
								var b2 = hexToRgb(tint_target).b;

								var stepR = (r2 - r) / (60 * tint_speed);
								var stepG = (g2 - g) / (60 * tint_speed);
								var stepB = (b2 - b) / (60 * tint_speed);

								var r3 = Math.floor(r + (stepR * tint_timer));
								var g3 = Math.floor(g + (stepG * tint_timer));
								var b3 = Math.floor(b + (stepB * tint_timer));
								if (r3 < 0) {
									r3 = 0
								}
								if (g3 < 0) {
									g3 = 0
								}
								if (b3 < 0) {
									b3 = 0
								}
								if (r3 > 255) {
									r3 = 255
								}
								if (g3 > 255) {
									g3 = 255
								}
								if (b3 > 255) {
									b3 = 255
								}
								var reddone = false;
								var greendone = false;
								var bluedone = false;
								if (stepR >= 0 && r3 >= r2) {
									reddone = true;
								}
								if (stepR <= 0 && r3 <= r2) {
									reddone = true;
								}
								if (stepG >= 0 && g3 >= g2) {
									greendone = true;
								}
								if (stepG <= 0 && g3 <= g2) {
									greendone = true;
								}
								if (stepB >= 0 && b3 >= b2) {
									bluedone = true;
								}
								if (stepB <= 0 && b3 <= b2) {
									bluedone = true;
								}
								if (reddone == true && bluedone == true && greendone == true) {
									$gameVariables.SetTint(tint_target);
								}
								tcolor = "#" + ((1 << 24) + (r3 << 16) + (g3 << 8) + b3).toString(16).slice(1);
							} else {
								tint_timer = 0;
							}

							//Graphics.Debug('TINT',tint_value+' '+tint_target+' '+tint_speed+' '+tcolor);

							this._maskBitmap.FillRect(-20, 0, maxX + 20, maxY, tcolor);
						}

						// reset drawmode to normal
						ctx.globalCompositeOperation = 'source-over';

					}
				}
			}
		}
		StopTiming();
	};

	/**
	 * @method _addSprite
	 * @private
	 */
	Lightmask.prototype._addSprite = function(x1,y1,selectedbitmap) {
		
	    var sprite = new Sprite(this.viewport);
	    sprite.bitmap = selectedbitmap;
	    sprite.opacity = 255;
	    sprite.blendMode = 2;
	    sprite.x = x1;
	 	sprite.y = y1;
	    this._sprites.push(sprite);
	    this.addChild(sprite);
	    sprite.rotation = 0;
	    sprite.ax = 0;
	    sprite.ay = 0;
	 	sprite.opacity = 255;
	};
	
	/**
	 * @method _removeSprite
	 * @private
	 */
	Lightmask.prototype._removeSprite = function() {
	    this.removeChild(this._sprites.pop());
	};
	

	// *******************  NORMAL BOX SHAPE ***********************************
	
	Bitmap.prototype.FillRect = function(x1, y1, x2, y2, color1) {
		x1=x1+20;
		//x2=x2+20;
	    var context = this._context;
	    context.save();
	    context.fillStyle = color1;
	    context.fillRect(x1, y1, x2, y2);
	    context.restore();
	    this._setDirty();
	};
	
	// *******************  CIRCLE/OVAL SHAPE ***********************************
	// from http://scienceprimer.com/draw-oval-html5-canvas
	Bitmap.prototype.FillCircle = function(centerX, centerY, xradius, yradius, color1) {
		centerX=centerX+20;

	    var context = this._context;
	    context.save();
	    context.fillStyle = color1;
	   	context.beginPath();
	   	var rotation = 0;
	   	var start_angle = 0;
	   	var end_angle = 2 * Math.PI;
		for (var i = start_angle * Math.PI; i < end_angle * Math.PI; i += 0.01 ) {
    		xPos = centerX - (yradius * Math.sin(i)) * Math.sin(rotation * Math.PI) + (xradius * Math.cos(i)) * Math.cos(rotation * Math.PI);
    		yPos = centerY + (xradius * Math.cos(i)) * Math.sin(rotation * Math.PI) + (yradius * Math.sin(i)) * Math.cos(rotation * Math.PI);

    		if (i == 0) {
        		context.moveTo(xPos, yPos);
    		} else {
        		context.lineTo(xPos, yPos);
    		}
		}
		context.fill();
		context.closePath();
	    context.restore();
	    this._setDirty();
	};

	// *******************  NORMAL LIGHT SHAPE ***********************************
	// Fill gradient circle
	
	Bitmap.prototype.radialgradientFillRect = function(x1, y1, r1, r2, color1, color2, flicker, brightness, direction) {

		var isValidColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color1);
		if (!isValidColor) {
			color1 = '#000000'
		}
		var isValidColor2 = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color2);
		if (!isValidColor2) {
			color2 = '#000000'
		}

		x1=x1+20;

		// clipping
		var nx1 = Number(x1);
		var ny1 = Number(y1);
		var nr2 = Number(r2);

		var clip = false;

		if (nx1-nr2>maxX) {
			clip = true;
		}
		if (ny1-nr2>maxY) {
			clip = true;
		}
		if (nx1+nr2<0) {
			clip = true;
		}
		if (nx1+nr2<0) {
			clip = true;
		}

		//Graphics.Debug('Screen',startx+" "+starty+" "+endx+" "+endy+" "+nx1+" "+ny1+" "+nr2);

		if (clip == false) {

			if (!brightness) {
				brightness = 0.0;
			}
			if (!direction) {
				direction = 0;
			}
			var context = this._context;
			var grad;
			var wait = Math.floor((Math.random() * 8) + 1);
			if (flicker == true && wait == 1) {
				var flickerradiusshift = $gameVariables.GetFireRadius();
				var flickercolorshift = $gameVariables.GetFireColorshift();
				var gradrnd = Math.floor((Math.random() * flickerradiusshift) + 1);
				var colorrnd = Math.floor((Math.random() * flickercolorshift) - (flickercolorshift / 2));

				var r = hexToRgb(color1).r;
				var g = hexToRgb(color1).g;
				var b = hexToRgb(color1).b;
				g = g + colorrnd;
				if (g < 0) {
					g = 0;
				}
				if (g > 255) {
					g = 255;
				}
				color1 = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
				r2 = r2 - gradrnd;
				if (r2 < 0) r2 = 0;
			}

			grad = context.createRadialGradient(x1, y1, r1, x1, y1, r2);
			if (brightness) {
				grad.addColorStop(0, '#FFFFFF');
			}
			grad.addColorStop(brightness, color1);

			grad.addColorStop(1, color2);

			context.save();
			context.fillStyle = grad;
			direction = Number(direction);
			var pw = $gameMap.tileWidth() / 2;
			var ph = $gameMap.tileHeight() / 2;
			switch (direction) {
				case 0:
					context.fillRect(x1 - r2, y1 - r2, r2 * 2, r2 * 2);
					break;
				case 1:
					context.fillRect(x1 - r2, y1 - ph, r2 * 2, r2 * 2);
					break;
				case 2:
					context.fillRect(x1 - r2, y1 - r2, r2 * 1 + pw, r2 * 2);
					break;
				case 3:
					context.fillRect(x1 - r2, y1 - r2, r2 * 2, r2 * 1 + ph);
					break;
				case 4:
					context.fillRect(x1 - pw, y1 - r2, r2 * 2, r2 * 2);
					break;
			}


			// context.fillRect(x1-r2, y1-r2, r2*2, r2*2);
			context.restore();
			this._setDirty();
		}
	};
	
	// ********************************** FLASHLIGHT *************************************
	// Fill gradient Cone
	
	Bitmap.prototype.radialgradientFillRect2 = function(x1, y1, r1, r2, color1, color2, direction, flashlength, flashwidth) {
		x1=x1+20;

		var isValidColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color1);
		if (!isValidColor) {
			color1 = '#000000'
		}
		var isValidColor2 = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color2);
		if (!isValidColor2) {
			color2 = '#000000'
		}

	    var context = this._context;
	    var grad;	
	    
	    // smal dim glove around player
	   	context.save();
	    x1 = x1 + flashlightoffsetX;
	    y1 = y1 + flashlightoffsetY;
	     
	    r1 = 1;
	  	r2 = 40;
		grad = context.createRadialGradient(x1, y1, r1, x1, y1, r2);
		grad.addColorStop(0, '#999999');
		grad.addColorStop(1, color2);
	
		context.fillStyle = grad;
		context.fillRect(x1-r2, y1-r2, r2*2, r2*2);
	    
	    // flashlight
	    
		for (var cone = 0; cone < flashlength; cone++) {
			var flashlightdensity =  $gameVariables.GetFlashlightDensity();
		   	r1 = cone * flashlightdensity;
	  		r2 = cone * flashwidth;
	  		
	  		switch(direction) {
	    		case 6:
	    			x1 = x1 + cone*6;
	       	    	break;
	   			case 4:
	   				x1 = x1 - cone*6;
	       	    	break;
	   			case 2:
	   				y1 = y1 + cone*6;
	       	    	break;
	            case 8:
	            	y1 = y1 - cone*6;
	       	    	break;
			} 
	  		  		

		  	grad = context.createRadialGradient(x1, y1, r1, x1, y1, r2);
		    grad.addColorStop(0, color1);
		    grad.addColorStop(1, color2);
	
		    context.fillStyle = grad;
		    context.fillRect(x1-r2, y1-r2, r2*2, r2*2);
    	}
	    context.fillStyle = grad;
		context.fillRect(x1-r2, y1-r2, r2*2, r2*2);
		
	    context.restore();	    
	    this._setDirty();
	};
	
	
	function hexToRgb(hex) {
    	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    	return result ? {
        	r: parseInt(result[1], 16),
        	g: parseInt(result[2], 16),
        	b: parseInt(result[3], 16)
    	} : null;
	}


	Game_Variables.prototype.GetFirstRun = function() {
		if (typeof this._Terrax_Lighting_FirstRun == 'undefined') {
			this._Terrax_Lighting_FirstRun = true;
		}
		return this._Terrax_Lighting_FirstRun;
	};
	Game_Variables.prototype.SetFirstRun = function(value) {
		this._Terrax_Lighting_FirstRun = value;
	};
	Game_Variables.prototype.GetScriptActive = function() {
		if (typeof this._Terrax_Lighting_ScriptActive == 'undefined') {
			this._Terrax_Lighting_ScriptActive = true;
		}
		return this._Terrax_Lighting_ScriptActive;
	};
	Game_Variables.prototype.SetScriptActive = function(value) {
		this._Terrax_Lighting_ScriptActive = value;
	};
	Game_Variables.prototype.GetStopScript = function() {
		if (typeof this._Terrax_Lighting_StopScript == 'undefined') {
			this._Terrax_Lighting_StopScript = false;
		}
		return this._Terrax_Lighting_StopScript;
	};
	Game_Variables.prototype.SetStopScript = function(value) {
		this._Terrax_Lighting_StopScript = value;
	};

	Game_Variables.prototype.SetMog = function(value) {
		this._Terrax_Lighting_Mog = value;
	};
	Game_Variables.prototype.GetMog = function() {
		return this._Terrax_Lighting_Mog || false;
	};
	Game_Variables.prototype.SetMogTintArray = function(value) {
		this._Terrax_Lighting_MogTintArray = value;
	};
	Game_Variables.prototype.GetMogTintArray = function() {
		var default_MT = [ '#555555', '#FFEFD5', '#FFFFFF', '#EEE8AA', '#555555', '#111111' ];
		return this._Terrax_Lighting_MogTintArray || default_MT;
	};

	Game_Variables.prototype.SetTint = function(value) {
		this._Terrax_Tint_Value = value;
	};
	Game_Variables.prototype.GetTint = function() {
		return this._Terrax_Tint_Value || '#000000';
	};
	Game_Variables.prototype.SetTintTarget = function(value) {
		this._Terrax_TintTarget_Value = value;
	};
	Game_Variables.prototype.GetTintTarget = function() {
		return this._Terrax_TintTarget_Value || '#000000';
	};
	Game_Variables.prototype.SetTintSpeed = function(value) {
		this._Terrax_TintSpeed_Value = value;
	};
	Game_Variables.prototype.GetTintSpeed = function() {
		return this._Terrax_TintSpeed_Value || 60;
	};

	Game_Variables.prototype.SetFlashlight = function(value) {
		this._Terrax_Lighting_Flashlight = value;
	};
	Game_Variables.prototype.GetFlashlight = function() {
		return this._Terrax_Lighting_Flashlight || false;
	};
	Game_Variables.prototype.SetFlashlightDensity = function(value) {
		this._Terrax_Lighting_FlashlightDensity = value;
	};
	Game_Variables.prototype.GetFlashlightDensity = function() {
		return this._Terrax_Lighting_FlashlightDensity || 3;
	};
	Game_Variables.prototype.SetFlashlightLength = function(value) {
		this._Terrax_Lighting_FlashlightLength = value;
	};
	Game_Variables.prototype.GetFlashlightLength = function() {
		return this._Terrax_Lighting_FlashlightLength || 8;
	};
	Game_Variables.prototype.SetFlashlightWidth = function(value) {
		this._Terrax_Lighting_FlashlightWidth = value;
	};
	Game_Variables.prototype.GetFlashlightWidth = function() {
		return this._Terrax_Lighting_FlashlightWidth || 12;
	};

	Game_Variables.prototype.SetPlayerColor = function(value) {
		this._Terrax_Lighting_PlayerColor = value;
	};
	Game_Variables.prototype.GetPlayerColor = function() {
		return this._Terrax_Lighting_PlayerColor || '#FFFFFF';
	};
	Game_Variables.prototype.SetPlayerBrightness = function(value) {
		this._Terrax_Lighting_PlayerBrightness = value;
	};
	Game_Variables.prototype.GetPlayerBrightness = function(value) {
		this._Terrax_Lighting_PlayerBrightness = value || 0.0;
	};
	Game_Variables.prototype.SetRadius = function(value) {
		this._Terrax_Lighting_Radius = value;
	};
	Game_Variables.prototype.GetRadius = function() {
		//return this._Terrax_Lighting_Radius || 150;
		if (this._Terrax_Lighting_Radius === undefined) {
			return 150;
		}else {
			return this._Terrax_Lighting_Radius;
		}
	};
	Game_Variables.prototype.SetRadiusTarget = function(value) {
		this._Terrax_Lighting_RadiusTarget = value;
	};
	Game_Variables.prototype.GetRadiusTarget = function() {
		//return this._Terrax_Lighting_RadiusTarget || 150;
		if (this._Terrax_Lighting_RadiusTarget === undefined) {
			return 150;
		}else {
			return this._Terrax_Lighting_RadiusTarget;
		}
	};
	Game_Variables.prototype.SetRadiusSpeed = function(value) {
		this._Terrax_Lighting_RadiusSpeed = value;
	};
	Game_Variables.prototype.GetRadiusSpeed = function() {
		return this._Terrax_Lighting_RadiusSpeed || 0;
	};

	Game_Variables.prototype.SetDaynightColorArray = function(value) {
		this._Terrax_Lighting_DayNightColorArray = value;
	};
	Game_Variables.prototype.GetDaynightColorArray = function() {
		var default_color = [  '#000000', '#000000', '#000000', '#000000',
		  					    '#000000', '#000000', '#666666', '#AAAAAA',
		  						'#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
		  						'#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
		  						'#FFFFFF', '#FFFFFF', '#AAAAAA', '#666666',
		  						'#000000', '#000000', '#000000', '#000000' ];
		return this._Terrax_Lighting_DayNightColorArray || default_color;
	};
	Game_Variables.prototype.SetDaynightSpeed = function(value) {
		this._Terrax_Lighting_DaynightSpeed = value;
	};
	Game_Variables.prototype.GetDaynightSpeed = function() {
		return this._Terrax_Lighting_DaynightSpeed || 10;
	};
	Game_Variables.prototype.SetDaynightCycle = function(value) {
		this._Terrax_Lighting_DaynightCycle = value;
	};
	Game_Variables.prototype.GetDaynightCycle = function() {
		return this._Terrax_Lighting_DaynightCycle || 0;
	};
	Game_Variables.prototype.SetDaynightTimer = function(value) {
		this._Terrax_Lighting_DaynightTimer = value;
	};
	Game_Variables.prototype.GetDaynightTimer = function() {
		return this._Terrax_Lighting_DaynightTimer || 0;
	};
	Game_Variables.prototype.SetDaynightHoursinDay = function(value) {
		this._Terrax_Lighting_DaynightHoursinDay = value;
	};
	Game_Variables.prototype.GetDaynightHoursinDay = function() {
		return this._Terrax_Lighting_DaynightHoursinDay || 24;
	};

	Game_Variables.prototype.SetFireRadius = function(value) {
		this._Terrax_Lighting_FireRadius = value;
	};
	Game_Variables.prototype.GetFireRadius = function() {
		return this._Terrax_Lighting_FireRadius || 7;
	};
	Game_Variables.prototype.SetFireColorshift = function(value) {
		this._Terrax_Lighting_FireColorshift = value;
	};
	Game_Variables.prototype.GetFireColorshift = function() {
		return this._Terrax_Lighting_FireColorshift || 10;
	};
	Game_Variables.prototype.SetFire = function(value) {
		this._Terrax_Lighting_Fire = value;
	};
	Game_Variables.prototype.GetFire = function() {
		return this._Terrax_Lighting_Fire || false;
	};

	Game_Variables.prototype.SetLightArrayId = function(value) {
		this._Terrax_Lighting_LightArrayId = value;
	};
	Game_Variables.prototype.GetLightArrayId = function() {
		var default_LAI = [];
		return this._Terrax_Lighting_LightArrayId || default_LAI;
	};
	Game_Variables.prototype.SetLightArrayState = function(value) {
		this._Terrax_Lighting_LightArrayState = value;
	};
	Game_Variables.prototype.GetLightArrayState = function() {
		var default_LAS = [];
		return this._Terrax_Lighting_LightArrayState || default_LAS;
	};
	Game_Variables.prototype.SetLightArrayColor = function(value) {
		this._Terrax_Lighting_LightArrayColor = value;
	};
	Game_Variables.prototype.GetLightArrayColor = function() {
		var default_LAS = [];
		return this._Terrax_Lighting_LightArrayColor || default_LAS;
	};

	Game_Variables.prototype.SetTileArray = function(value) {
		this._Terrax_Lighting_TileArray = value;
	};
	Game_Variables.prototype.GetTileArray = function() {
		var default_TA = [];
		return this._Terrax_Lighting_TileArray || default_TA;
	};
	Game_Variables.prototype.SetLightTags = function(value) {
		this._Terrax_Lighting_LightTags = value;
	};
	Game_Variables.prototype.GetLightTags = function() {
		var default_TA = [];
		return this._Terrax_Lighting_LightTags || default_TA;
	};
	Game_Variables.prototype.SetBlockTags = function(value) {
		this._Terrax_Lighting_BlockTags = value;
	};
	Game_Variables.prototype.GetBlockTags = function() {
		var default_TA = [];
		return this._Terrax_Lighting_BlockTags || default_TA;
	};

	// dummy for compatiblity with push.
	function SaveLightingVariables() {
	}

	function StartTiming() {
		// Timing function for debugging
		var datenow = new Date();
		debugtimer = datenow.getTime();
	}

	function StopTiming() {
		// speedtest function
		if (speeddebug == true) {
			var datenow = new Date();
			var debugtimer2 = datenow.getTime();
			averagetime[averagetimecount] = debugtimer2 - debugtimer;
			averagetimecount++;
			var totalcount = 0;
			for (var y = 0; y < averagetime.length; y++) {
				totalcount = totalcount + averagetime[y];
			}
			if (averagetimecount > 500) {
				averagetimecount = 0;
				Graphics.Debug('Speedtest', totalcount / 500);
			}
		}
	}

	//****
	// Debug
	//****

	Graphics.Debug = function(name, message) {
    	if (this._errorPrinter) {
        	this._errorPrinter.innerHTML = this._makeErrorHtml(name, message);
    	}
	}


	//****
	// This function is overwritten from rpg_sprites.js
	//****

  /*
	要抱方法大腿，不要覆写 (*ˉ﹃ˉ) 。
  */
  /*
	Spriteset_Map.prototype.createLowerLayer = function() {
	    Spriteset_Base.prototype.createLowerLayer.call(this);
	    this.createParallax();
	    this.createTilemap();
	    this.createCharacters();
	    this.createShadow();
	    this.createDestination();
	    this.createLightmask();
	    this.createWeather();
	};
  */
  var _Spriteset_Map_createDestination = Spriteset_Map.prototype.createDestination;
  Spriteset_Map.prototype.createDestination = function() {
		_Spriteset_Map_createDestination.call(this);
		this.createLightmask();	//建立光源
  }

	// ALLIASED Move event location => reload map.

	var Alias_Game_Interpreter_command203 = Game_Interpreter.prototype.command203;
	Game_Interpreter.prototype.command203 = function() {
		Alias_Game_Interpreter_command203.call(this);
		ReloadMapEvents();
		return true;
	};


// ALIASED FROM RPG OBJECTS TO ADD LIGHTING TO CONFIG MENU

	ConfigManager.TxLighting = true;

	Object.defineProperty(ConfigManager, 'TxLighting', {
		get: function() {
			return options_lighting_on;
		},
		set: function(value) {
			options_lighting_on = value;
		},
		configurable: true
	});

	var Alias_ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		var config = Alias_ConfigManager_makeData.call(this);
		config.TxLighting = options_lighting_on;
		return config;
	};

	var Alias_ConfigManager_applyData = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
		Alias_ConfigManager_applyData.call(this,config);
		this.TxLighting = this.readFlag2(config, 'TxLighting');
	};

	var Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
		Window_Options_addGeneralOptions.call(this);
		if (add_to_options === "true") {
			this.addCommand(optiontext, 'TxLighting');
		}
	};

	ConfigManager.readFlag2 = function(config, name) {
		var value = config[name];
		if (value !== undefined) {
			return !!config[name];
		} else {
			return true;
		}
	};





})();

	
	