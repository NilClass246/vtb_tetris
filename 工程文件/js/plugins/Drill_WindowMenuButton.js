//=============================================================================
// Drill_WindowMenuButton.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        控件 - 按钮窗口管理器
 * @author Drill_up
 * 
 * @help  
 * =============================================================================
 * +++ Drill_WindowMenuButton +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 针对主菜单的按钮窗口进行控制的插件，你可以控制按钮或者添加新按钮。
 * ★★必须放在 所有主菜单界面插件 的后面★★
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，它只针对 主菜单按钮窗口 的按钮 进行控制。
 * 作用于：
 *   - MOG_SceneMenu 面板-全自定义主菜单
 *     与目标插件通过关键字相互联系，可以控制其顺序与显示。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面
 *   只针对 主菜单按钮窗口 的按钮 进行控制。
 * 2.关键字是识别一切按钮的关键，只要你知道按钮关键字，你就可以控制主菜单中
 *   任何按钮的显示与隐藏。
 * 3.DEBUG-显示状态列表可以看到所有按钮的状态，进入主菜单时弹出。
 *   （状态中如果显示"未找到"，说明你的关键字错误，或者按钮没添加到菜单中。）
 * 4.你可以直接自己定义新的按钮关键字，并绑定公共事件。但是必须确保关键字独一无二。
 *   全自定义主菜单中设置的按钮与关键字，将与你的新按钮对应上。
 * 5.在菜单界面中，游戏是处于暂停状态的，因此你在不离开菜单的情况下，只能执行脚本
 *   和插件指令。公共事件需要切出菜单来执行。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 隐藏按钮
 * 你可以通过插件指令控制任何按钮的显示情况。
 *
 * 插件指令（道具按钮）：>主菜单按钮 : Item : 隐藏
 * 插件指令（技能按钮）：>主菜单按钮 : Skill : 隐藏
 * 插件指令（装备按钮）：>主菜单按钮 : Equip : 隐藏
 * 插件指令（状态按钮）：>主菜单按钮 : Status : 隐藏
 * 插件指令（队形按钮）：>主菜单按钮 : Formation : 隐藏
 * 插件指令（选项按钮）：>主菜单按钮 : Options : 隐藏
 * 插件指令（保存按钮）：>主菜单按钮 : Save : 隐藏
 * 插件指令（游戏结束按钮）：>主菜单按钮 : GameEnd : 隐藏
 *
 * 上面所示的中间的参数为系统设置的按钮的关键字。
 * 其他插件关键字也可以起效，
 * 比如全自定义信息面板A的关键字为Selfplate_A。那么：
 * 
 * 插件指令（面板A按钮）：>主菜单按钮 : Selfplate_A : 隐藏
 * 插件指令（面板A按钮）：>主菜单按钮 : Selfplate_A : 显示
 *
 * 关键字适用于任何 加入菜单 的按钮。
 * 注意，必须是加入菜单的按钮，按钮都没加入菜单，是显示不出来的。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 按钮顺序
 * 按钮中优先级高的排前面，优先级低的排后面。（与图片层级一样）
 * 优先级相同的，菜单插件添加的按钮根据插件顺序排，该插件添加的按钮按照配置顺序排。
 * 
 * 插件指令：>主菜单按钮 : Item : 优先级 : 20
 * 插件指令：>主菜单按钮 : Skill : 优先级 : 20
 * 插件指令：>主菜单按钮 : Equip : 优先级 : 20
 * 插件指令：>主菜单按钮 : Status : 优先级 : 20
 * 插件指令：>主菜单按钮 : Formation : 优先级 : 20
 * 插件指令：>主菜单按钮 : Options : 优先级 : 20
 * 插件指令：>主菜单按钮 : Save : 优先级 : 20
 * 插件指令：>主菜单按钮 : GameEnd : 优先级 : 20
 *
 * 上面所示的中间的参数为系统设置的按钮的关键字。
 * 其他插件关键字同样也可以起效。
 * 
 * 插件指令（面板A按钮）：>主菜单按钮 : Selfplate_A : 优先级 : 20
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了内部结构。
 *
 * @param DEBUG-显示状态列表
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc true - 开启，false - 关闭，进入菜单，将弹出各按钮的全部状态列表信息。
 * @default false
 *
 * @param ----按钮显示----
 * @default 
 *
 * @param 是否显示道具按钮
 * @parent ----按钮显示----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示技能按钮
 * @parent ----按钮显示----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示装备按钮
 * @parent ----按钮显示----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示状态按钮
 * @parent ----按钮显示----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示队形按钮
 * @parent ----按钮显示----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示选项按钮
 * @parent ----按钮显示----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。系统按钮，一般都需要显示。
 * @default true
 *
 * @param 是否显示保存按钮
 * @parent ----按钮显示----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 能对已添加的按钮进行显示/隐藏。注意，数据库>系统>菜单指令 的勾选控制的是"是否添加"。
 * @default true
 *
 * @param 是否显示游戏结束按钮
 * @parent ----按钮显示----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示。系统按钮，一般都需要显示。
 * @default true
 *
 *
 * @param ----按钮顺序----
 * @default 
 *
 * @param 按钮默认优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 其它菜单插件新加的按钮所处的默认优先级，你可以后期通过插件指令调整优先级。
 * @default 40
 *
 * @param 道具按钮优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 道具按钮的优先级。优先级高的按钮靠前。
 * @default 100
 *
 * @param 技能按钮优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 技能按钮的优先级。优先级高的按钮靠前。
 * @default 99
 *
 * @param 装备按钮优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 装备按钮的优先级。优先级高的按钮靠前。
 * @default 98
 *
 * @param 状态按钮优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 状态按钮的优先级。优先级高的按钮靠前。
 * @default 97
 *
 * @param 队形按钮优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 队形按钮的优先级。优先级高的按钮靠前。
 * @default 96
 *
 * @param 选项按钮优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 选项按钮的优先级。优先级高的按钮靠前。
 * @default 3
 *
 * @param 保存按钮优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 保存按钮的优先级。优先级高的按钮靠前。
 * @default 2
 *
 * @param 游戏结束按钮优先级
 * @parent ----按钮顺序----
 * @type number
 * @min 0
 * @desc 游戏结束按钮的优先级。优先级高的按钮靠前。
 * @default 1
 *
 *
 * @param ----新增按钮----
 * @default 
 *
 * @param 菜单按钮-1
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-2
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-3
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-4
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-5
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-6
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-7
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-8
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-9
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-10
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-11
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-12
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-13
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-14
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-15
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-16
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-17
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-18
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-19
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * @param 菜单按钮-20
 * @parent ----新增按钮----
 * @type struct<MenuBtn>
 * @desc 添加新的菜单按钮，并绑定一个指定的公共事件。
 * @default 
 *
 * 
 */
/*~struct~MenuBtn:
 * 
 * @param 标记
 * @desc 用于区分你设置的颜色的说明注释，脚本中不起作用。
 * @default ==新的按钮==
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 按钮名称
 * @desc 新增的按钮的名称。
 * @default 新按钮
 *
 * @param 按钮关键字
 * @desc 你需要设置一个给主菜单去识别的关键字。注意，关键字必须独一无二。
 * @default KeyWord_1
 *
 * @param 按钮优先级
 * @type number
 * @min 0
 * @desc 新增的按钮的顺序优先级。
 * @default 40
 *
 * @param 执行的插件指令
 * @type text[]
 * @desc 按钮按下后执行的插件指令集合，根据配置先后来执行插件指令。（主菜单自身的插件指令可能不会立即生效）
 * @default []
 *
 * @param 执行的脚本
 * @type note
 * @desc 按钮按下后执行的脚本。
 * @default ""
 *
 * @param 是否执行公共事件
 * @type boolean
 * @on 执行
 * @off 不执行
 * @desc true - 执行，false - 不执行。执行公共事件会必然离开菜单界面，因为菜单界面中游戏是暂停状态。
 * @default false
 * 
 * @param 执行的公共事件
 * @parent 是否执行公共事件
 * @type common_event
 * @desc 按钮按下后执行的公共事件。执行公共事件会必然离开菜单界面，因为菜单界面中游戏是暂停状态。
 * @default 0
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		WMB（Window_Menu_Button）
//		临时全局变量	DrillUp.g_WMB_xxx
//		临时局部变量	this._drill_WMB_xxx
//		存储数据变量	$gameSystem._drill_WMB_xxx
//		全局存储变量	无
//		覆盖重写方法	Window_MenuCommand.prototype.callHandler
//
//插件记录：
//		★大体框架与功能如下：
//			窗口按钮管理器：
//				->拦截器
//				->callHandler 绑定传值
//				->debug寻找可用按钮
//
//		★必要注意事项：
//			1.	this._drill_WMB_maps 拦截器的条件，
//				this._drill_WMB_intercepter 拦截器拦截的内容列表。
//				this._debug_list 二者的并集，用于显示给用户看管理器信息。
//				this._debug_Rlist 
//
//		★其它说明细节：
//			1.插件在所有菜单插件最后，作为一个拦截器，过滤显示的插件。
//			2.新增的按钮不做存储，直接在临时全局中使用。（因为没有其他特殊参数，相当于硬编码加按钮）
//
//		★存在的问题：
//			暂无
//
//	
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_WindowMenuButton = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_WindowMenuButton');
	
    DrillUp.g_WMB_debug = String(DrillUp.parameters['DEBUG-显示状态列表'] || "false") === "true";
	
    DrillUp.g_WMB_btn_item_visible = String(DrillUp.parameters['是否显示道具按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_skill_visible = String(DrillUp.parameters['是否显示技能按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_equip_visible = String(DrillUp.parameters['是否显示装备按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_status_visible = String(DrillUp.parameters['是否显示状态按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_formation_visible = String(DrillUp.parameters['是否显示队形按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_options_visible = String(DrillUp.parameters['是否显示选项按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_save_visible = String(DrillUp.parameters['是否显示保存按钮'] || "true") === "true";
    DrillUp.g_WMB_btn_gameEnd_visible = String(DrillUp.parameters['是否显示游戏结束按钮'] || "true") === "true";

    DrillUp.g_WMB_btn_default_zIndex = Number(DrillUp.parameters['按钮默认优先级'] || 40) ;
    DrillUp.g_WMB_btn_item_zIndex = Number(DrillUp.parameters['道具按钮优先级'] || 100) ;
    DrillUp.g_WMB_btn_skill_zIndex = Number(DrillUp.parameters['技能按钮优先级'] || 99) ;
    DrillUp.g_WMB_btn_equip_zIndex = Number(DrillUp.parameters['装备按钮优先级'] || 98) ;
    DrillUp.g_WMB_btn_status_zIndex = Number(DrillUp.parameters['状态按钮优先级'] || 97) ;
    DrillUp.g_WMB_btn_formation_zIndex = Number(DrillUp.parameters['队形按钮优先级'] || 96) ;
    DrillUp.g_WMB_btn_options_zIndex = Number(DrillUp.parameters['选项按钮优先级'] || 3) ;
    DrillUp.g_WMB_btn_save_zIndex = Number(DrillUp.parameters['保存按钮优先级'] || 2) ;
    DrillUp.g_WMB_btn_gameEnd_zIndex = Number(DrillUp.parameters['游戏结束按钮优先级'] || 1) ;
	
	DrillUp.g_WMB_btns_length = 20;
	DrillUp.g_WMB_btns = [];
	for (var i = 0; i < DrillUp.g_WMB_btns_length ; i++ ) {
		if( DrillUp.parameters['菜单按钮-' + String(i+1) ] != "" ){
			DrillUp.g_WMB_btns[i] = JSON.parse(DrillUp.parameters['菜单按钮-' + String(i+1)] );
			DrillUp.g_WMB_btns[i]['visible'] = String(DrillUp.g_WMB_btns[i]["是否初始显示"] || "true") == "true";
			DrillUp.g_WMB_btns[i]['btn_name'] = String(DrillUp.g_WMB_btns[i]["按钮名称"]);
			DrillUp.g_WMB_btns[i]['btn_key'] = String(DrillUp.g_WMB_btns[i]["按钮关键字"]);
			DrillUp.g_WMB_btns[i]['zIndex'] = Number(DrillUp.g_WMB_btns[i]["按钮优先级"]);
			DrillUp.g_WMB_btns[i]['command'] = JSON.parse(DrillUp.g_WMB_btns[i]["执行的插件指令"]);
			DrillUp.g_WMB_btns[i]['script'] = String(DrillUp.g_WMB_btns[i]["执行的脚本"]);
			DrillUp.g_WMB_btns[i]['do_commonevents'] = String(DrillUp.g_WMB_btns[i]["是否执行公共事件"] || "false") == "true";
			DrillUp.g_WMB_btns[i]['commonevents'] = Number(DrillUp.g_WMB_btns[i]["执行的公共事件"]);
		}else{
			DrillUp.g_WMB_btns[i] = "";
		}
	};
	
//=============================================================================
// * 插件指令
//=============================================================================
var _drill_WMB_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_WMB_pluginCommand.call(this, command, args);
	if (command === '>主菜单按钮') {
		if(args.length == 4){
			var temp1 = String(args[1]);
			var type = String(args[3]);
			if (type === '显示') {
				$gameSystem.drill_WMB_mapSetAttr(temp1,"visible",true);
			}
			if (type === '隐藏') {
				$gameSystem.drill_WMB_mapSetAttr(temp1,"visible",false);
			}
		}
	}
	if (command === '>主菜单按钮') {
		if(args.length == 6){
			var temp1 = String(args[1]);
			var temp2 = String(args[5]);
			var type = String(args[3]);
			if (type === '优先级') {
				$gameSystem.drill_WMB_mapSetAttr(temp1,"zIndex",temp2);
			}
		}
	}
};
//=============================================================================
// ** 拦截器条件
//=============================================================================
//==============================
// * 拦截器条件初始化
//==============================
var _drill_WMB_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_WMB_initialize.call(this);
	this._drill_WMB_maps = [];
	this._drill_WMB_maps.push({"key":"item" ,"zIndex":DrillUp.g_WMB_btn_item_zIndex,"visible":DrillUp.g_WMB_btn_item_visible });
	this._drill_WMB_maps.push({"key":"skill","zIndex":DrillUp.g_WMB_btn_skill_zIndex,"visible":DrillUp.g_WMB_btn_skill_visible });
	this._drill_WMB_maps.push({"key":"equip" ,"zIndex":DrillUp.g_WMB_btn_equip_zIndex,"visible":DrillUp.g_WMB_btn_equip_visible });
	this._drill_WMB_maps.push({"key":"status" ,"zIndex":DrillUp.g_WMB_btn_status_zIndex,"visible":DrillUp.g_WMB_btn_status_visible });
	this._drill_WMB_maps.push({"key":"formation","zIndex":DrillUp.g_WMB_btn_formation_zIndex ,"visible":DrillUp.g_WMB_btn_formation_visible });
	this._drill_WMB_maps.push({"key":"options","zIndex":DrillUp.g_WMB_btn_options_zIndex,"visible":DrillUp.g_WMB_btn_options_visible });
	this._drill_WMB_maps.push({"key":"save" ,"zIndex":DrillUp.g_WMB_btn_save_zIndex,"visible":DrillUp.g_WMB_btn_save_visible });
	this._drill_WMB_maps.push({"key":"gameEnd" ,"zIndex":DrillUp.g_WMB_btn_gameEnd_zIndex,"visible":DrillUp.g_WMB_btn_gameEnd_visible });
	for(var i = 0;i< DrillUp.g_WMB_btns_length; i++){
		if( DrillUp.g_WMB_btns[i] !="" ){
			this._drill_WMB_maps.push({
				"key":DrillUp.g_WMB_btns[i]['btn_key'],
				"zIndex":DrillUp.g_WMB_btns[i]['zIndex'],
				"visible":DrillUp.g_WMB_btns[i]['visible']
			});
		}
	}
	//alert(JSON.stringify(this._drill_WMB_maps));
};
//==============================
// * 加入/修改 拦截器条件的属性
//==============================
Game_System.prototype.drill_WMB_mapSetAttr = function(key,attr_name,attr_val) {
	
	var map = null;
	for(var j = 0; j < this._drill_WMB_maps.length ;j++ ){
		var temp_m = this._drill_WMB_maps[j];
		if( temp_m['key'] == key ){
			map = temp_m;
		}
	}
	if( map == null ){
		map = {"key":key,"zIndex":DrillUp.g_WMB_btn_default_zIndex,"visible":true };
		this._drill_WMB_maps.push( map );
	}
	
	map[attr_name] = attr_val;
};

//=============================================================================
// ** 主菜单按钮窗口
//=============================================================================
//==============================
// * 按钮排序
//==============================
Window_MenuCommand.prototype.drill_WMB_btn_sortByZIndex = function() {
   this._list.sort(function(a, b){return b.zIndex-a.zIndex});	//比较器
};
//==============================
// * 按钮拦截（根据条件拦截按钮）
//==============================
var _drill_WMB_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function() {
	_drill_WMB_makeCommandList.call(this);
	this._debug_list = [];
	this._debug_Rlist = [];
	for(var i = 0; i < $gameSystem._drill_WMB_maps.length ;i++ ){
		this._debug_list[i] = {};
		this._debug_list[i]['connected'] = false;		//DEBUG-默认全未连接
	}
	
	this._drill_WMB_intercepter = this._list;
	this._list = [];
	for(var i = 0; i < this._drill_WMB_intercepter.length ;i++ ){
		var temp_i = this._drill_WMB_intercepter[i];
		var pushed = false;
		for(var j = 0; j < $gameSystem._drill_WMB_maps.length ;j++ ){
			var temp_m = $gameSystem._drill_WMB_maps[j];
			
			if( temp_i['symbol'].toLowerCase() == temp_m['key'].toLowerCase() ){
				if( temp_m['visible'] ){	//显示的push，隐藏的跳过push
					var temp = {};
					temp = temp_i;
					temp['zIndex'] = temp_m['zIndex'];
					this._list.push(temp);
				}
				pushed = true;
				this._debug_list[j]['name'] = temp_i['name'];
				this._debug_list[j]['connected'] = true;	//DEBUG-确认建立连接
			}
			this._debug_list[j]['zIndex'] = temp_m['zIndex'];
			this._debug_list[j]['visible'] = temp_m['visible'];
			this._debug_list[j]['symbol'] = temp_m['key'];
		}
		if( !pushed ){	//未纳入拦截器的，顺序默认，并放行
			var temp = {};
			temp = temp_i;
			temp['zIndex'] = DrillUp.g_WMB_btn_default_zIndex;
			this._list.push(temp);
			
			var temp_back = JSON.parse(JSON.stringify( temp ));	//DEBUG-拦截器中放行的新按钮，捕获
			temp_back['visible'] = true;
			temp_back['connected'] = true;
			this._debug_Rlist.push(temp_back);
			
		}
	}
	//alert(JSON.stringify(this._drill_WMB_intercepter));
	this.drill_WMB_btn_sortByZIndex();
	
	if(DrillUp.g_WMB_debug){
		for(var i = 0; i< this._debug_Rlist.length ;i++){ this._debug_list.push(this._debug_Rlist[i]); }
		this.drill_WMB_btn_printDEBUG(this._debug_list);
	}
};

//==============================
// * 管理器信息（拦截器条件 与 按钮集 的并集）
//==============================
Window_MenuCommand.prototype.drill_WMB_btn_printDEBUG = function(debug_list) {
	debug_list.sort(function(a, b){return b.zIndex-a.zIndex});	//排序
	var str = "以下为按钮的状态列表：\n";
	for(var i = 0; i< debug_list.length; i++){
		var d = debug_list[i];
		str += ">关键字:" + d["symbol"] + "，";
		if( d["name"] == undefined ){
			str += "名字:未找到，";
		}else{
			str += "名字:" + d["name"] + "，";
		}
		str += "状态:" + (d["connected"] ? "存在" : "未找到") + "，";
		if(d["connected"]){
			str += "" + (d["visible"] ? "显示中" : "隐藏中") + "，";
		}
		str += "\n";
	}
	alert(str);
};


//=============================================================================
// ** 添加按钮
//=============================================================================
//==============================
// * 方法绑定
//==============================
var _drill_WMB_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_drill_WMB_createCommandWindow.call(this);
	for(var i = 0; i< DrillUp.g_WMB_btns.length ;i++){
		var temp_btn = DrillUp.g_WMB_btns[i];
		if( temp_btn != "" ){
			this._commandWindow.setHandler( temp_btn['btn_key'], this.drill_WMB_method_call.bind(this));
		}
	}
	
};
//==============================
// * 绑定的方法传值
//==============================
Window_MenuCommand.prototype.callHandler = function(symbol) {
    if (this.isHandled(symbol)) {
        this._handlers[symbol](symbol);		//让handler传一个值进去。
    }
};
//==============================
// * 绑定方法的操作
//==============================
Scene_Menu.prototype.drill_WMB_method_call = function( key ) {
	
	for(var i = 0; i< DrillUp.g_WMB_btns.length ;i++){
		var temp_btn = DrillUp.g_WMB_btns[i];
		if(temp_btn['btn_key'] == key){
			if( temp_btn['command'] ){
				var gameInterpreter = new Game_Interpreter();			//执行插件指令
				for(var j = 0; j< temp_btn['command'].length ;j++){
					var t_args = String(temp_btn['command'][j]).split(" ");
					var t_command = t_args.shift();
					gameInterpreter.pluginCommand( t_command, t_args);
				}
			}
			
			if(temp_btn['script'] != ""){		//执行脚本
				eval(JSON.parse(temp_btn['script']));
			}
			
			if( temp_btn['do_commonevents'] ){	//执行公共事件（切出当前所有菜单Scene）
				if(SceneManager._stack.length > 0){ SceneManager.pop(); }	
				if(SceneManager._stack.length > 0){ SceneManager.pop(); }	
				if(SceneManager._stack.length > 0){ SceneManager.pop(); }	
				$gameTemp.reserveCommonEvent( temp_btn['commonevents'] );
			}
		}
	}
}

//==============================
// * 添加显示的按钮
//==============================
var _drill_WMB_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_drill_WMB_addOriginalCommands.call(this);
	for(var i = 0; i< DrillUp.g_WMB_btns.length ;i++){
		var temp_btn = DrillUp.g_WMB_btns[i];
		if( temp_btn != "" ){
			this.addCommand( temp_btn['btn_name'], temp_btn['btn_key'], true);
		}
	}
};


