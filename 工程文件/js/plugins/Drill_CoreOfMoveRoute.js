//=============================================================================
// Drill_CoreOfMoveRoute.js
//=============================================================================

/*:
 * @plugindesc [v1.1]        物体 - 移动路线核心
 * @author Drill_up
 *
 *
 * @param 事件页变化时是否保持移动路线
 * @type boolean
 * @on 保持
 * @off 重置
 * @desc 当事件页从1切换到2，再切换回1，如果不保持，移动路线会被重置。
 * @default true
 *
 * @param 接近到重叠位置时是否停下
 * @type boolean
 * @on 停下
 * @off 随机移动
 * @desc 使用接近玩家/接近事件时，如果已经在目标位置下并且重叠，该事件停下。
 * @default true
 *
 * @param 接近/远离时是否随机
 * @type boolean
 * @on 随机
 * @off 固定
 * @desc 当接近/远离有两种方向选择时，事件会随机选择一个方向移动。
 * @default true
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_CoreOfMoveRoute +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件用于防止部分错误的路线指令拖慢游戏速度。
 * 以及提供一些特别的路线指令设置。
 * ★★必须放在所有 物体类型 插件的最前面★★
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   作用于事件、事件指令的移动路线设置。
 * 2."保持移动路线"是指事件 自主移动 > 移动路线 的设置中。
 *   事件页切换不会重置移动路线。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件
 * 以下为移动路线脚本快速指令，以及一些新加的功能指令：
 *
 * 移动路线脚本：>上移n步
 * 移动路线脚本：>下移n步
 * 移动路线脚本：>左移n步
 * 移动路线脚本：>右移n步
 * 移动路线脚本：>左下移n步
 * 移动路线脚本：>左上移n步
 * 移动路线脚本：>右下移n步
 * 移动路线脚本：>右上移n步
 * 移动路线脚本：>前进n步
 * 移动路线脚本：>后退n步
 * 
 * 移动路线脚本：>随机移动
 * 移动路线脚本：>随机移动n步
 * 移动路线脚本：>随机移动(只横向)
 * 移动路线脚本：>随机移动(只纵向)
 * 
 * 移动路线脚本：>接近玩家
 * 移动路线脚本：>远离玩家
 * 移动路线脚本：>接近玩家n步
 * 移动路线脚本：>远离玩家n步
 * 移动路线脚本：>接近玩家(只横向)
 * 移动路线脚本：>远离玩家(只横向)
 * 移动路线脚本：>接近玩家(只纵向)
 * 移动路线脚本：>远离玩家(只纵向)
 * 
 * 移动路线脚本：>接近事件[10]
 * 移动路线脚本：>远离事件[10]
 * 移动路线脚本：>接近事件[10]n步
 * 移动路线脚本：>远离事件[10]n步
 * 移动路线脚本：>接近事件[10](只横向)
 * 移动路线脚本：>远离事件[10](只横向)
 * 移动路线脚本：>接近事件[10](只纵向)
 * 移动路线脚本：>远离事件[10](只纵向)
 * 移动路线脚本：>接近事件变量[10]
 * 移动路线脚本：>远离事件变量[10]
 * 移动路线脚本：>接近事件变量[10]n步
 * 移动路线脚本：>远离事件变量[10]n步
 * 移动路线脚本：>接近事件变量[10](只横向)
 * 移动路线脚本：>远离事件变量[10](只横向)
 * 移动路线脚本：>接近事件变量[10](只纵向)
 * 移动路线脚本：>远离事件变量[10](只纵向)
 * 
 * 移动路线脚本：>接近鼠标
 * 移动路线脚本：>远离鼠标
 * 移动路线脚本：>接近鼠标n步
 * 移动路线脚本：>远离鼠标n步
 * 移动路线脚本：>接近鼠标(只横向)
 * 移动路线脚本：>远离鼠标(只横向)
 * 移动路线脚本：>接近鼠标(只纵向)
 * 移动路线脚本：>远离鼠标(只纵向)
 * 
 * 1."接近事件"后的数字，表示事件id。
 *   "接近事件变量"后的数字，表示变量的值对应的事件id。
 * 2.只横向/只纵向一般用于不封路却专门拦住玩家的事件。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 保持距离
 * 你可以设置事件之间保持某个距离值。
 * 
 * 移动路线脚本：>与玩家保持距离4
 * 移动路线脚本：>与玩家保持距离5
 * 移动路线脚本：>与鼠标保持距离4
 * 移动路线脚本：>与鼠标保持距离5
 * 移动路线脚本：>与事件[10]保持距离4
 * 移动路线脚本：>与事件[10]保持距离5
 * 移动路线脚本：>与事件变量[10]保持距离4
 * 移动路线脚本：>与事件变量[10]保持距离5
 * 
 * 1.距离范围为菱形区域，距离值为保持的菱形区域的距离大小。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 特殊指令
 * 你可以设置移动路线的特殊指令：
 * 
 * 移动路线脚本：>>上一条指令再执行n次
 * 
 * 1.注意，由于指令特殊需要区分开，这里前缀为两个">"。
 *   原指令和指令再执行n次，一共执行了n+1次。
 * 2.如果没有上一条指令，或者上一条指令就是该指令，则没有任何效果。
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
 * 工作类型：   持续执行
 * 时间复杂度： o(n)*o(事件移动路线) 每帧
 * 测试方法：   去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【15.75ms】
 *              100个事件的地图中，平均消耗为：【13.53ms】
 *               50个事件的地图中，平均消耗为：【13.49ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多了解插件性能，可以去看看"关于插件性能.docx"。
 * 2.该插件并不消耗多少性能，因为只提供单一的快捷路线脚本功能。
 * 
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 优化了错误处理。
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		COMR (Core_Of_Move_Route)
//		临时全局变量	DrillUp.g_COMR_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(n)*o(事件移动路线) 每帧
//		性能测试因素	125个事件
//		性能测试消耗	15.75ms
//		最坏情况		无
//		备注			整个插件几乎没有循环，都是原生设置上扩展。
//						不知道会不会增加其他插件的负担。
//		
//
//插件记录：
//		★大体框架与功能如下：
//			移动路线核心：
//				->阻止错误的脚本
//				->保持事件页的移动路线变化
//				->移动n步
//				->接近鼠标、接近(只横向)
//				->保持距离
//				->记录/执行上一条路线指令
//
//		★必要注意事项：
//			1.initMembers函数中，this.event()未加载完全，还没有值。
//
//		★其它说明细节：
//			1.事件每移动成功一次，会调一次processMoveCommand。
//			  如果未设置跳过，被卡住后，每帧都会调processMoveCommand。
//			2.注意匹配顺序，">接近玩家n步" 要放在 ">接近玩家" 前面。
//
//		★存在的问题：
//			暂无
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_CoreOfMoveRoute = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_CoreOfMoveRoute');
	
    DrillUp.g_COMR_towardStop = String(DrillUp.parameters['接近到重叠位置时是否停下'] || "true") === "true";
    DrillUp.g_COMR_towardRandom = String(DrillUp.parameters['接近/远离时是否随机'] || "true") === "true";
    DrillUp.g_COMR_remainRoute = String(DrillUp.parameters['事件页变化时是否保持移动路线'] || "true") === "true";
	
	DrillUp.g_COMR_errorMsgTank = [];

//=============================================================================
// ** 脚本拦截
//=============================================================================
var _drill_COMR_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
    var params = command.parameters;
	if( command.code == Game_Character.ROUTE_SCRIPT ){		//阻止">xxx"和"没有括号的函数"
		var temp_script = params[0];
		if( temp_script.substr(0,1) == ">" ){
			var message = "【物体-移动路线核心】不能识别指令：\""+ temp_script +"\"";
			if( DrillUp.g_COMR_errorMsgTank.indexOf(message) == -1 ){
				DrillUp.g_COMR_errorMsgTank.push(message);
				console.log("%c"+message, "color:#f67; font-size:14px;");
			}
			return; 
		}
		if( temp_script.indexOf("=") == -1 && ( temp_script.indexOf("(") == -1 || temp_script.indexOf(")") == -1 ) ){
			var message = "【物体-移动路线核心】不能识别指令：\""+ temp_script +"\"";
			if( DrillUp.g_COMR_errorMsgTank.indexOf(message) == -1 ){
				DrillUp.g_COMR_errorMsgTank.push(message);
				console.log("%c"+message, "color:#f67; font-size:14px;");
			}
			return; 
		}
	}
	_drill_COMR_processMoveCommand.call(this,command);
}

//=============================================================================
// ** 路线保持
//=============================================================================
//==============================
// * 事件 - 初始化
//==============================
Game_Event.prototype.drill_COMR_mrsInit = function() {
	if( this._drill_COMR_mrs !== undefined ){ return }
	this._drill_COMR_mrs = [];
	
	var ev_data = this.event();
	if( ev_data ){
		var pages = ev_data.pages;
		for (var i = 0; i < pages.length; i++) {
			var page = pages[i];
			var mr = {};
			mr._index = 0;
			this._drill_COMR_mrs[i] = mr;
		}
	}
}
//==============================
// * 事件 - 刷新事件页
//==============================
var _drill_COMR_ev_refresh = Game_Event.prototype.refresh;
Game_Event.prototype.refresh = function() {
	this.drill_COMR_mrsInit();
	this.drill_COMR_last_page = this._pageIndex;
	this.drill_COMR_last_mIndex = this._moveRouteIndex;
	
	_drill_COMR_ev_refresh.call(this);
	
	this.drill_COMR_mrsChangeIndex();
}
//==============================
// * 事件 - 变化路线索引
//==============================
Game_Event.prototype.drill_COMR_mrsChangeIndex = function() {
	if( DrillUp.g_COMR_remainRoute != true ){ return }
	
	var old_page = this.drill_COMR_last_page;
	var new_page = this._erased ? -1 : this.findProperPageIndex();
	if( new_page < 0 ){ return; }
	if( old_page < 0 ){ return; }
	if( old_page === new_page ){ return; }
	
	this._drill_COMR_mrs[ old_page ]._index = this.drill_COMR_last_mIndex;	//存储旧移动路线的顺序
	var new_mIndex = this._drill_COMR_mrs[ new_page ]._index || 0;
	if( new_mIndex < this._moveRoute.list.length ){
		this._moveRouteIndex = new_mIndex;
	}
}

//=============================================================================
// ** 脚本转义
//=============================================================================
//==============================
// * 路线 - 事件默认路线
//==============================
var _drill_COMR_setMoveRoute = Game_Character.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function( moveRoute ) {
	moveRoute.list = this.drill_COMR_scriptTransform(moveRoute.list);
	_drill_COMR_setMoveRoute.call(this, moveRoute);
};
//==============================
// * 路线 - 函数设置路线
//==============================
var _drill_COMR_forceMoveRoute = Game_Character.prototype.forceMoveRoute;
Game_Character.prototype.forceMoveRoute = function(moveRoute) {
	moveRoute.list = this.drill_COMR_scriptTransform(moveRoute.list);
	_drill_COMR_forceMoveRoute.call(this, moveRoute);
};
//==============================
// * 路线 - 修改路线内容
//==============================
Game_Character.prototype.drill_COMR_scriptTransform = function(route_list) {
	var r_list = [];
	
	// >特殊指令 - 上一个脚本执行N次
	var last_route = null;
	var route_list_ex = [];
	for(var k=0; k<route_list.length; k++){
		var temp_route = route_list[k];
		if (temp_route.code === 45) {		//脚本
			var temp_script = temp_route.parameters[0];
			if (temp_script.match( /^>>上一条指令再执行(\d+)次/ )) {
				if( last_route != null ){
					for (var i=0; i < Number(RegExp.$1); i++){
						route_list_ex.push(last_route);
					}
				}
			}else{
				route_list_ex.push(temp_route);
			}
		}else{
			route_list_ex.push(temp_route);
		}
		last_route = temp_route;
	}
	// >普通指令
	for(var k=0; k < route_list_ex.length; k++){
		var temp_route = route_list_ex[k];
		if (temp_route.code === 45) {		//脚本
			var temp_script = temp_route.parameters[0];
			if (temp_script.match( /^(下移|>下移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:1});
				}
			} else if (temp_script.match( /^(左移|>左移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:2});
				}
			} else if (temp_script.match( /^(右移|>右移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:3});
				}
			} else if (temp_script.match( /^(上移|>上移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:4});
				}
			} else if (temp_script.match( /^(左下移|>左下移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:5});
				}
			} else if (temp_script.match( /^(右下移|>右下移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:6});
				}
			} else if (temp_script.match( /^(右上移|>右上移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:7});
				}
			} else if (temp_script.match( /^(左上移|>左上移)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:8});
				}
			} else if (temp_script.match( /^(前进|>前进)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:12});
				}
			} else if (temp_script.match( /^(后退|>后退)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:13});
				}
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(随机移动|>随机移动)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:9});
				}
			} else if (temp_script.match( /^(随机移动\(只横向\)|>随机移动\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveRandom_X();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(随机移动\(只纵向\)|>随机移动\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveRandom_Y();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(随机移动|>随机移动)/ )) {	
				r_list.push({code:9});
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近玩家|>接近玩家)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:10});
				}
			} else if (temp_script.match( /^(接近玩家\(只横向\)|>接近玩家\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_X($gamePlayer);";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近玩家\(只纵向\)|>接近玩家\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_Y($gamePlayer);";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近玩家|>接近玩家)/ )) {
				r_list.push({code:10});
			} else if (temp_script.match( /^(远离玩家|>远离玩家)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					r_list.push({code:11});
				}
			} else if (temp_script.match( /^(远离玩家\(只横向\)|>远离玩家\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_X($gamePlayer);";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离玩家\(只纵向\)|>远离玩家\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_Y($gamePlayer);";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离玩家|>远离玩家)/ )) {
				r_list.push({code:11});
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近事件|>接近事件)\[(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$3); i++){
					var _script = "this.moveTowardCharacter($gameMap.event("+Number(RegExp.$2)+"));";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(接近事件|>接近事件)\[(\d+)\]\(只横向\)/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_X($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近事件|>接近事件)\[(\d+)\]\(只纵向\)/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_Y($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近事件|>接近事件)\[(\d+)\]/ )) {
				var _script = "this.moveTowardCharacter($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件|>远离事件)\[(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$3); i++){
					var _script = "this.moveAwayFromCharacter($gameMap.event("+Number(RegExp.$2)+"));";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(远离事件|>远离事件)\[(\d+)\]\(只横向\)/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_X($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件|>远离事件)\[(\d+)\]\(只纵向\)/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_Y($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件|>远离事件)\[(\d+)\]/ )) {
				var _script = "this.moveAwayFromCharacter($gameMap.event("+Number(RegExp.$2)+"));";
				r_list.push({code:45,parameters:[_script] });
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近事件变量|>接近事件变量)\[(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$3); i++){
					var _script = "this.moveTowardCharacter($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(接近事件变量|>接近事件变量)\[(\d+)\]\(只横向\)/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_X($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近事件变量|>接近事件变量)\[(\d+)\]\(只纵向\)/ )) {
				var _script = "this.drill_COMR_moveTowardCharacter_Y($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近事件变量|>接近事件变量)\[(\d+)\]/ )) {
				var _script = "this.moveTowardCharacter($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件变量|>远离事件变量)\[(\d+)\](\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$3); i++){
					var _script = "this.moveAwayFromCharacter($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(远离事件变量|>远离事件变量)\[(\d+)\]\(只横向\)/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_X($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件变量|>远离事件变量)\[(\d+)\]\(只纵向\)/ )) {
				var _script = "this.drill_COMR_moveAwayCharacter_Y($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离事件变量|>远离事件变量)\[(\d+)\]/ )) {
				var _script = "this.moveAwayFromCharacter($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")));";
				r_list.push({code:45,parameters:[_script] });
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(接近鼠标|>接近鼠标)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveTowardMouse();";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(接近鼠标\(只横向\)|>接近鼠标\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveTowardMouse_X();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近鼠标\(只纵向\)|>接近鼠标\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveTowardMouse_Y();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(接近鼠标|>接近鼠标)/ )) {
				var _script = "this.drill_COMR_moveTowardMouse();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离鼠标|>远离鼠标)(\d+)步/ )) {
				for (var i=0; i < Number(RegExp.$2); i++){
					var _script = "this.drill_COMR_moveAwayMouse();";
					r_list.push({code:45,parameters:[_script] });
				}
			} else if (temp_script.match( /^(远离鼠标\(只横向\)|>远离鼠标\(只横向\))/ )) {
				var _script = "this.drill_COMR_moveAwayMouse_X();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离鼠标\(只纵向\)|>远离鼠标\(只纵向\))/ )) {
				var _script = "this.drill_COMR_moveAwayMouse_Y();";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(远离鼠标|>远离鼠标)/ )) {
				var _script = "this.drill_COMR_moveAwayMouse();";
				r_list.push({code:45,parameters:[_script] });
			//-----------------------------------------------------------------------------
			
			
			//-----------------------------------------------------------------------------
			} else if (temp_script.match( /^(与玩家保持距离|>与玩家保持距离)(\d+)/ )) {
				var _script = "this.drill_COMR_keepDistance($gamePlayer,"+Number(RegExp.$2)+");";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(与鼠标保持距离|>与鼠标保持距离)(\d+)/ )) {
				var _script = "this.drill_COMR_mouseKeepDistance("+Number(RegExp.$2)+");";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(与事件|>与事件)\[(\d+)\]保持距离(\d+)/ )) {
				var _script = "this.drill_COMR_keepDistance($gameMap.event("+Number(RegExp.$2)+"),"+Number(RegExp.$3)+");";
				r_list.push({code:45,parameters:[_script] });
			} else if (temp_script.match( /^(与事件变量|>与事件变量)\[(\d+)\]保持距离(\d+)(\d+)/ )) {
				var _script = "this.drill_COMR_keepDistance($gameMap.event($gameVariables.value("+Number(RegExp.$2)+")),"+Number(RegExp.$3)+");";
				r_list.push({code:45,parameters:[_script] });
			
			//-----------------------------------------------------------------------------
			} else {
				r_list.push(temp_route);
			}
		} else {
			r_list.push(temp_route);
		}
	}
	return r_list;
};

//=============================================================================
// * 接近/远离
//=============================================================================
//==============================
// * 路线动作 - 接近（修正）
//==============================
var _drill_COMR_moveTowardCharacter = Game_Character.prototype.moveTowardCharacter;
Game_Character.prototype.moveTowardCharacter = function(character) {
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		if( DrillUp.g_COMR_towardStop ){
			return;
		}else{
			this.moveRandom();
			return;
		}
	}
	if( DrillUp.g_COMR_towardRandom ){
		if( sx != 0 && sy != 0 ){
			if ( !this.canPass(this.x, this.y, sx > 0 ? 4 : 6) && !this.canPass(this.x, this.y, sy > 0 ? 8 : 2) ) {
				return;
			}
			if( Math.randomInt(2) == 0 ){
				this.moveStraight(sx > 0 ? 4 : 6);
				if (!this.isMovementSucceeded() && sy !== 0) {
					this.moveStraight(sy > 0 ? 8 : 2);
				}
			}else{
				this.moveStraight(sy > 0 ? 8 : 2);
				if (!this.isMovementSucceeded() && sx !== 0) {
					this.moveStraight(sx > 0 ? 4 : 6);
				}
			}
			return;
		}
	}
	_drill_COMR_moveTowardCharacter.call(this,character);
}
//==============================
// * 路线动作 - 接近（只X/只Y）
//==============================
Game_Character.prototype.drill_COMR_moveTowardCharacter_X = function(character) {
    var sx = this.deltaXFrom(character.x);
	if( sx == 0 ){
		this.turnTowardCharacter(character);
	}else{
		this.moveStraight(sx > 0 ? 4 : 6);
	}
};
Game_Character.prototype.drill_COMR_moveTowardCharacter_Y = function(character) {
    var sy = this.deltaYFrom(character.y);
	if( sy == 0 ){
		this.turnTowardCharacter(character);
	}else{
		this.moveStraight(sy > 0 ? 8 : 2);
	}
}
//==============================
// * 路线动作 - 远离（修正）
//==============================
var _drill_COMR_moveAwayFromCharacter = Game_Character.prototype.moveAwayFromCharacter;
Game_Character.prototype.moveAwayFromCharacter = function(character) {
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		this.moveRandom();
		return;
	}
	if( DrillUp.g_COMR_towardRandom ){
		if( sx != 0 && sy != 0 ){
			if ( !this.canPass(this.x, this.y, sx > 0 ? 6 : 4) && !this.canPass(this.x, this.y, sy > 0 ? 2 : 8) ) {
				return;
			}
			if( Math.randomInt(2) == 0 ){
				this.moveStraight(sx > 0 ? 6 : 4);
				if (!this.isMovementSucceeded() && sy !== 0) {
					this.moveStraight(sy > 0 ? 2 : 8);
				}
			}else{
				this.moveStraight(sy > 0 ? 2 : 8);
				if (!this.isMovementSucceeded() && sx !== 0) {
					this.moveStraight(sx > 0 ? 6 : 4);
				}
			}
			return;
		}
	}
	_drill_COMR_moveAwayFromCharacter.call(this,character);
}
//==============================
// * 路线动作 - 远离（只X/只Y）
//==============================
Game_Character.prototype.drill_COMR_moveAwayCharacter_X = function(character) {
    var sx = this.deltaXFrom(character.x);
	this.moveStraight(sx > 0 ? 6 : 4);
};
Game_Character.prototype.drill_COMR_moveAwayCharacter_Y = function(character) {
    var sy = this.deltaYFrom(character.y);
	this.moveStraight(sy > 0 ? 2 : 8);
}

//==============================
// * 路线动作 - 随机（只X/只Y）
//==============================
Game_Character.prototype.drill_COMR_moveRandom_X = function() {
    var d = 4 + Math.randomInt(2) * 2;
    if (this.canPass(this.x, this.y, d)) {
        this.moveStraight(d);
    }
};
Game_Character.prototype.drill_COMR_moveRandom_Y = function() {
    var d = 2 + Math.randomInt(2) * 6;
    if (this.canPass(this.x, this.y, d)) {
        this.moveStraight(d);
    }
};

//==============================
// * 路线动作 - 鼠标接近
//==============================
Game_Character.prototype.drill_COMR_moveTowardMouse = function() {
	var m = {}
	m.x = Math.floor( $gameMap._displayX + _drill_mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + _drill_mouse_y / $gameMap.tileHeight() );
	this.moveTowardCharacter(m);
}
Game_Character.prototype.drill_COMR_moveTowardMouse_X = function() {
	var m = {}
	m.x = Math.floor( $gameMap._displayX + _drill_mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + _drill_mouse_y / $gameMap.tileHeight() );
	this.drill_COMR_moveTowardCharacter_X(m);
}
Game_Character.prototype.drill_COMR_moveTowardMouse_Y = function() {
	var m = {}
	m.x = Math.floor( $gameMap._displayX + _drill_mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + _drill_mouse_y / $gameMap.tileHeight() );
	this.drill_COMR_moveTowardCharacter_Y(m);
}
//==============================
// * 路线动作 - 鼠标远离
//==============================
Game_Character.prototype.drill_COMR_moveAwayMouse = function() {
	var m = {}
	m.x = Math.floor( $gameMap._displayX + _drill_mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + _drill_mouse_y / $gameMap.tileHeight() );
	this.moveAwayFromCharacter(m);
}
Game_Character.prototype.drill_COMR_moveAwayMouse_X = function() {
	var m = {}
	m.x = Math.floor( $gameMap._displayX + _drill_mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + _drill_mouse_y / $gameMap.tileHeight() );
	this.drill_COMR_moveAwayCharacter_X(m);
}
Game_Character.prototype.drill_COMR_moveAwayMouse_Y = function() {
	var m = {}
	m.x = Math.floor( $gameMap._displayX + _drill_mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + _drill_mouse_y / $gameMap.tileHeight() );
	this.drill_COMR_moveAwayCharacter_Y(m);
}

//=============================================================================
// ** 保持距离
//=============================================================================
//==============================
// * 路线动作 - 保持距离
//==============================
Game_Character.prototype.drill_COMR_keepDistance = function(character, distance) {
	var sx = this.deltaXFrom(character.x);
	var sy = this.deltaYFrom(character.y);
	if( sx == 0 && sy == 0 ){
		this.moveRandom();
	}
	if( Math.abs(sx) + Math.abs(sy) == distance ){
		this.turnTowardCharacter(character);
	}
	if( Math.abs(sx) + Math.abs(sy) > distance ){
		this.moveTowardCharacter(character);
	}
	if( Math.abs(sx) + Math.abs(sy) < distance ){
		this.moveAwayFromCharacter(character);
	}
}
//==============================
// * 路线动作 - 鼠标保持距离
//==============================
Game_Character.prototype.drill_COMR_mouseKeepDistance = function(distance) {
	var m = {}
	m.x = Math.floor( $gameMap._displayX + _drill_mouse_x / $gameMap.tileWidth() );
	m.y = Math.floor( $gameMap._displayY + _drill_mouse_y / $gameMap.tileHeight() );
	this.drill_COMR_keepDistance(m,distance);
}


//=============================================================================
// ** 鼠标 - 实时获取 鼠标位置
//=============================================================================
if( typeof(_drill_mouse_getCurPos) == "undefined" ){	//防止重复定义

	var _drill_mouse_getCurPos = TouchInput._onMouseMove;
	var _drill_mouse_x = 0;
	var _drill_mouse_y = 0;
	TouchInput._onMouseMove = function(event) {		//鼠标位置
		_drill_mouse_getCurPos.call(this,event);
		
        _drill_mouse_x = Graphics.pageToCanvasX(event.pageX);
        _drill_mouse_y = Graphics.pageToCanvasY(event.pageY);
	};
}
if( typeof(_drill_touchPad_getCurPos) == "undefined" ){	//防止重复定义
	
	var _drill_touchPad_getCurPos = TouchInput._onTouchMove;
	TouchInput._onTouchMove = function(event) {
		_drill_touchPad_getCurPos.call(this,event);	//触屏位置
			
		if(event.changedTouches && event.changedTouches[0]){
			var touch = event.changedTouches[0];
			_drill_mouse_x = Graphics.pageToCanvasX(touch.pageX);
			_drill_mouse_y = Graphics.pageToCanvasY(touch.pageY);
		}
	};
}
