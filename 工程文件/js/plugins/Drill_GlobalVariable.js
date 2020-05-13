//=============================================================================
// Drill_GlobalVariable.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        系统 - 跨存档的变量
 * @author Drill_up
 * 
 * @param 跨存档的开关
 * @type switch[]
 * @desc 设置指定的开关能够跨存档存储。
 * @default ["0"]
 * 
 * @param 跨存档的变量
 * @type variable[]
 * @desc 设置指定的变量能够跨存档存储。
 * @default ["22"]
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GlobalVariable +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以设置某个变量完全跨存档，存档A触发的开关，在存档B以及
 * 所有存档都会生效。
 * 具体说明，去看看"全局存储"。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面、菜单界面。
 *   作用于整个游戏，包括存档。
 * 2.你可以设置整个游戏中只有一次的奖励。
 * 3.你可以将游戏做成metagame，给玩家造成心理阴影。
 * 4.请一定要谨慎设置变量，逻辑整理清楚后设置，不然你的剧情线
 *   会被搅得一团糟。
 *
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   单次执行
 * 时间复杂度： o(n) 单次
 * 测试方法：   修改变量值时，强制执行10000次。
 * 测试结果：   执行10000次，消耗为：【2.61ms】
 * 
 * 1.消耗性能太小，检测工具可能得不到更精确的值。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.性能测试是在加了 全局存储性能优化[扩展] 插件为前提进行的。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		无
//		临时全局变量	DrillUp.global_var_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	DrillUp.global_var_switch
//						DrillUp.global_var_variable
//		覆盖重写方法	无
//
//插件记录：
//		★大体框架与功能如下：
//			全局变量：
//				->变量控制
//				->开关控制
//
//		★必要注意事项：
//			暂无
//
//		★其它说明细节：
//			1.插件附着在 .setValue 方法上。只要setValue，就存储全局变量。
//
//		★存在的问题：
//			暂无
//
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GlobalVariable = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_GlobalVariable');
	if(DrillUp.parameters['跨存档的开关'] != "" ){
		DrillUp.global_var_switch_id = JSON.parse(DrillUp.parameters['跨存档的开关']);
	}else{
		DrillUp.global_var_switch_id = [];
	}
	if(DrillUp.parameters['跨存档的变量'] != "" ){
		DrillUp.global_var_variable_id = JSON.parse(DrillUp.parameters['跨存档的变量']);
	}else{
		DrillUp.global_var_variable_id = [];
	}
	
//=============================================================================
// ** 全局读取
//=============================================================================
	var _drill_global = DataManager.loadGlobalInfo();
	//alert(JSON.stringify(_drill_global));
	if( !DrillUp.global_var_switch ){	//游戏没关情况
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_var_switch"] ){		//游戏关闭后，重开读取global中的配置
			DrillUp.global_var_switch = _drill_global[0]["_global_var_switch"];
		}else{
			DrillUp.global_var_switch = [];
		}
	}
	if( !DrillUp.global_var_variable ){	
		if( _drill_global && _drill_global[0] && _drill_global[0]["_global_var_variable"] ){
			DrillUp.global_var_variable = _drill_global[0]["_global_var_variable"];
		}else{
			DrillUp.global_var_variable = [];
		}
	}
	
//=============================================================================
// ** 全局存储
//=============================================================================
var _drill_Game_Variables_saveGlobal = DataManager.saveGlobalInfo;
DataManager.saveGlobalInfo = function(info) {	//第0个存档为全局存档
	if(!info[0]){info[0] = []};
	info[0]["_global_var_switch"] = DrillUp.global_var_switch;
	info[0]["_global_var_variable"] = DrillUp.global_var_variable;
	_drill_Game_Variables_saveGlobal.call(this,info);
};
DataManager.forceSaveGlobalInfo = function() {		//强制存储（任何改变的全局变量的地方都需要调用该方法）
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// ** 读取地图赋值
//=============================================================================
var _drill_Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _drill_Game_Map_initialize.call(this);
	for(var i = 0; i< DrillUp.global_var_variable_id.length ;i++ ){
		var v_id = Number(DrillUp.global_var_variable_id[i]);
		$gameVariables._data[v_id] = DrillUp.global_var_variable[v_id];
	}
	for(var i = 0; i< DrillUp.global_var_switch_id.length ;i++ ){
		var v_id = Number(DrillUp.global_var_switch_id[i]);
		$gameSwitches._data[v_id] = DrillUp.global_var_switch[v_id];
	}
};
//=============================================================================
// ** 读取存档赋值
//=============================================================================
var _drill_Game_Variables_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	_drill_Game_Variables_extractSaveContents.call(this,contents);
	for(var i = 0; i< DrillUp.global_var_variable_id.length ;i++ ){
		var v_id = Number(DrillUp.global_var_variable_id[i]);
		$gameVariables._data[v_id] = DrillUp.global_var_variable[v_id];
	}
	for(var i = 0; i< DrillUp.global_var_switch_id.length ;i++ ){
		var v_id = Number(DrillUp.global_var_switch_id[i]);
		$gameSwitches._data[v_id] = DrillUp.global_var_switch[v_id];
	}
}
//=============================================================================
// ** 开关控制
//=============================================================================
var _drill_Game_Switches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
    _drill_Game_Switches_setValue.call(this,switchId, value);
	for(var i=0; i< DrillUp.global_var_switch_id.length ;i++ ){
		if( DrillUp.global_var_switch_id[i] == switchId ){
			DrillUp.global_var_switch[switchId] = value;
			
			DataManager.forceSaveGlobalInfo();	//值变化后，立即保存
			break;
		}
	}
};

//=============================================================================
// ** 变量控制
//=============================================================================
var _drill_Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function(switchId, value) {
    _drill_Game_Variables_setValue.call(this,switchId, value);
	for(var i=0; i< DrillUp.global_var_variable_id.length ;i++ ){
		if( DrillUp.global_var_variable_id[i] == switchId ){
			DrillUp.global_var_variable[switchId] = value;
			
			DataManager.forceSaveGlobalInfo();	//值变化后，立即保存
			break;
		}
	}
};

