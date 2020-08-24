//=============================================================================
// Drill_MenuBackground.js
//=============================================================================

/*:
 * @plugindesc [v1.3]        主菜单 - 多层菜单背景
 * @author Drill_up
 *
 * @help
 * =============================================================================
 * +++ Drill_MenuBackground +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 你可以在任意菜单中放置一个或者多个背景，只要关键字对上。
 * 要了解更详细的组合方法，去看看"多层组合背景,粒子,魔法圈,gif,视频.docx"。
 * ★★必须放在 各菜单界面、菜单插件 的前面★★
 * ★★自带背景的菜单插件可能不起作用，因为那个插件自己设置了底图★★
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以放置在菜单前面层或者菜单后面层。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__layer （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__layer文件夹！
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-默认背景
 *
 * 背景1 资源-背景
 * 背景2 资源-背景
 * 背景3 资源-背景
 * ……
 *
 * 所有素材都放在Menu__layer文件夹下。
 * 你可以在同一个菜单里面加入非常多的不同种类的背景。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制菜单背景的显示情况：
 * 
 * 插件指令：>菜单背景 : A : 显示
 * 插件指令：>菜单背景 : A : 隐藏
 * 插件指令：>菜单背景 : A : 设为默认
 *
 * 参数A：背景编号
 *        显示隐藏对应配置的编号。
 *
 * 示例：
 * 插件指令：>菜单背景 : 1 : 显示
 * 插件指令：>菜单背景 : 10 : 显示
 * （示例中切换为蓝色背景）
 * 插件指令：>菜单背景 : 1 : 设为默认
 * （设置默认的背景完全遵从1的背景配置）
 * 插件指令：>菜单背景 : 0 : 设为默认
 * （重置默认的背景）
 *
 * -----------------------------------------------------------------------------
 * ----界面与背景关系表
 * 
 * 可设置   关键字            关系界面
 *  √       Menu             （主菜单界面） 
 *  √       Item             （道具界面） 
 *  √       Skill            （技能界面）
 *  √       Equip            （装备界面） 
 *  √       Status           （状态界面） 
 *  √       Formation        （队形界面） 
 *  √       Options          （选项界面） 
 *  √       Save             （保存界面） 
 *  √       Shop             （商店界面） 
 *  √       GameEnd          （游戏结束选择界面）
 *
 *  √       EnemyBook        （敌人图鉴界面）
 *  √       ItemBook         （道具图鉴界面）
 *  √       Picture_Gallery  （画廊界面）
 *  x       Music_Book       （音乐书界面）
 *  x       Fast_Travel      （世界地图界面）
 *  x       CharSelect       （角色选择界面）
 *
 *  √       Selfplate_A      （全自定义信息面板A）
 *  √       Lagomoro_Mission （小优任务界面）
 *  √       Synthesis        （YEP物品合成界面）
 *  √       Quest            （YEP任务系统界面）
 *
 * 配置背景关键字时，不要忘了加"Scene_"前缀！
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 使得你可以通过插件指令控制菜单背景的显示。
 * [v1.2]
 * 规范了插件指令设置。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 *
 *
 * @param 底图设置
 * @type boolean
 * @on 地图画面
 * @off 全黑
 * @desc true - 地图画面，false - 全黑。进入菜单后，看到的是当前地图的图片。你也可以设置成全黑。
 * @default false
 *
 * @param ---默认背景---
 * @default
 *
 * @param 资源-默认背景
 * @parent ---默认背景---
 * @desc 默认背景的图片资源。
 * @default 背景-默认背景
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 平移-默认背景 X
 * @parent ---默认背景---
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-默认背景 Y
 * @parent ---默认背景---
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 默认透明度
 * @parent ---默认背景---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 默认混合模式
 * @parent ---默认背景---
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 默认背景X速度
 * @parent ---默认背景---
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 默认背景Y速度
 * @parent ---默认背景---
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 *
 * @param ---背景组 1至20---
 * @default
 *
 * @param 背景-1
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-2
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-3
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-4
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-5
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-6
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-7
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-8
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-9
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-10
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-11
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-12
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-13
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-14
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-15
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-16
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-17
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-18
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-19
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-20
 * @parent ---背景组 1至20---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组21至40---
 * @default
 *
 * @param 背景-21
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-22
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-23
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-24
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-25
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-26
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-27
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-28
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-29
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-30
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-31
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-32
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-33
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-34
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-35
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-36
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-37
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-38
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-39
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-40
 * @parent ---背景组21至40---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组41至60---
 * @default
 *
 * @param 背景-41
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-42
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-43
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-44
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-45
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-46
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-47
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-48
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-49
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-50
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-51
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-52
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-53
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-54
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-55
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-56
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-57
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-58
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-59
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-60
 * @parent ---背景组41至60---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param ---背景组61至80---
 * @default
 *
 * @param 背景-61
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-62
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-63
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-64
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-65
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-66
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-67
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-68
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-69
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-70
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-71
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-72
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-73
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-74
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-75
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-76
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-77
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-78
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-79
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 *
 * @param 背景-80
 * @parent ---背景组61至80---
 * @type struct<MenuBackground>
 * @desc 背景的详细配置信息。
 * @default 
 */
/*~struct~MenuBackground:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的菜单背景==
 *
 * @param 所属菜单
 * @type select
 * @option 主菜单
 * @value 主菜单
 * @option 道具
 * @value 道具
 * @option 技能
 * @value 技能
 * @option 装备
 * @value 装备
 * @option 状态
 * @value 状态
 * @option 队形
 * @value 队形
 * @option 选项
 * @value 选项
 * @option 保存
 * @value 保存
 * @option 商店
 * @value 商店
 * @option 游戏结束
 * @value 游戏结束
 * @option 敌人图鉴
 * @value 敌人图鉴
 * @option 道具图鉴
 * @value 道具图鉴
 * @option 画廊
 * @value 画廊
 * @option 自定义
 * @value 自定义
 * @desc 将背景放在指定的菜单。如果为自定义，那么要填写自定义关键字。
 * @default 主菜单
 * 
 * @param 自定义关键字
 * @parent 所属菜单
 * @desc 设置所属菜单为自定义时，将根据此关键字找到对应的菜单。前缀为Scene_，比如：Scene_Synthesis。
 * @default 
 *
 * @param 初始是否显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-背景
 * @desc 背景的图片资源。
 * @default 背景-默认背景
 * @require 1
 * @dir img/Menu__layer/
 * @type file
 *
 * @param 平移-背景 X
 * @desc x轴方向平移，单位像素。0为贴在最左边。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 平移-背景 Y
 * @desc x轴方向平移，单位像素。0为贴在最上面。这里用来表示进入菜单时图片的初始位置。
 * @default 0
 *
 * @param 透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @type number
 * @min 0
 * @max 16
 * @desc pixi的渲染混合模式。0-普通,1-叠加。其他更详细相关介绍，去看看"pixi的渲染混合模式"。
 * @default 0
 *
 * @param 背景X速度
 * @desc 背景按x轴方向循环移动的速度。正数向左，负数向右。（可为小数）
 * @default 0
 *
 * @param 背景Y速度
 * @desc 背景按y轴方向循环移动的速度。正数向上，负数向下。（可为小数）
 * @default 0
 *
 * @param 菜单层级
 * @type select
 * @option 在菜单后面
 * @value 0
 * @option 在菜单前面
 * @value 1
 * @desc 背景所属的菜单层级。
 * @default 0
 *
 * @param 图片层级
 * @type number
 * @min 0
 * @desc 背景在同一个菜单，并且在菜单层级下，先后排序的位置，0表示最后面。
 * @default 0
 * 
 *
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		临时全局变量	DrillUp.xxx
//		临时局部变量	this._drill_xxx
//		存储数据变量	$gameSystem._drill_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//插件记录：
//		插件结构并不复杂，但是坑多，需要理清楚下面变量的关系：
//			DrillUp.menu_backgrounds		获取的值（80个）
//			this._drill_sprite_backgrounds_data	符合的值（小于80个，不要将数组二者混合使用）
//			this._drill_sprite_backgrounds		符合的图片（小于80个）
//			temp_sprite			临时图片
//			temp_sprite_data	临时的值

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_MenuBackground = true;
　　var DrillUp = DrillUp || {}; 

	DrillUp.parameters = PluginManager.parameters('Drill_MenuBackground');
	DrillUp.menu_backgrounds_bottom_visible = String(DrillUp.parameters['底图设置'] || "true") === "true";	
	
	DrillUp.menu_backgrounds_def = [];
	DrillUp.menu_backgrounds_def['src_img'] = String(DrillUp.parameters["资源-默认背景"]);
	DrillUp.menu_backgrounds_def['x'] = Number(DrillUp.parameters["平移-默认背景 X"] || 0);
	DrillUp.menu_backgrounds_def['y'] = Number(DrillUp.parameters["平移-默认背景 Y"] || 0);
	DrillUp.menu_backgrounds_def['opacity'] = Number(DrillUp.parameters["默认透明度"] || 255);
	DrillUp.menu_backgrounds_def['blendMode'] = Number(DrillUp.parameters["默认混合模式"] || 0);
	DrillUp.menu_backgrounds_def['x_speed'] = Number(DrillUp.parameters["默认背景X速度"] || 0);
	DrillUp.menu_backgrounds_def['y_speed'] = Number(DrillUp.parameters["默认背景Y速度"] || 0);
	
	DrillUp.menu_backgrounds_max = 80;
	DrillUp.menu_backgrounds = [];
	
	for (var i = 0; i < DrillUp.menu_backgrounds_max; i++) {
		if( DrillUp.parameters['背景-' + String(i+1) ] != "" ){
			DrillUp.menu_backgrounds[i] = JSON.parse(DrillUp.parameters['背景-' + String(i+1) ]);
			DrillUp.menu_backgrounds[i]['visible'] = String(DrillUp.menu_backgrounds[i]["初始是否显示"] || "true") == "true";
			DrillUp.menu_backgrounds[i]['menu'] = DrillUp.menu_backgrounds[i]["所属菜单"];
			DrillUp.menu_backgrounds[i]['menu_key'] = DrillUp.menu_backgrounds[i]["自定义关键字"];
			DrillUp.menu_backgrounds[i]['src_img'] = String(DrillUp.menu_backgrounds[i]["资源-背景"]);
			DrillUp.menu_backgrounds[i]['x'] = Number(DrillUp.menu_backgrounds[i]["平移-背景 X"]);
			DrillUp.menu_backgrounds[i]['y'] = Number(DrillUp.menu_backgrounds[i]["平移-背景 Y"]);
			DrillUp.menu_backgrounds[i]['opacity'] = Number(DrillUp.menu_backgrounds[i]["透明度"]);
			DrillUp.menu_backgrounds[i]['blendMode'] = Number(DrillUp.menu_backgrounds[i]["混合模式"]);
			DrillUp.menu_backgrounds[i]['x_speed'] = Number(DrillUp.menu_backgrounds[i]["背景X速度"]);
			DrillUp.menu_backgrounds[i]['y_speed'] = Number(DrillUp.menu_backgrounds[i]["背景Y速度"]);
			DrillUp.menu_backgrounds[i]['menu_index'] = Number(DrillUp.menu_backgrounds[i]["菜单层级"]);
			DrillUp.menu_backgrounds[i]['zIndex'] = Number(DrillUp.menu_backgrounds[i]["图片层级"]);
		}else{
			DrillUp.menu_backgrounds[i] = [];
		}
	}
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MenuLayer = function(filename) {
    return this.loadBitmap('img/Menu__layer/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_menu_backgrounds_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_menu_backgrounds_pluginCommand.call(this, command, args);
	if (command === '>菜单背景') {
		if(args.length == 4){
			var temp1 = Number(args[1]) - 1;
			var type = String(args[3]);
			if (type === '显示') {
				if( !$gameSystem._drill_sprite_backgrounds_visible ){$gameSystem.drill_backgroundVisibleInit();}
				$gameSystem._drill_sprite_backgrounds_visible[temp1] = true;
			}
			if (type === '隐藏') {
				if( !$gameSystem._drill_sprite_backgrounds_visible ){$gameSystem.drill_backgroundVisibleInit();}
				$gameSystem._drill_sprite_backgrounds_visible[temp1] = false;
			}
			if (type === '设为默认') {
				$gameSystem._drill_default_background = temp1 +1;
			}
		}
	}
};

//=============================================================================
// ** 从 Scene_MenuBase 中进行背景追加
//=============================================================================

var _drill_menu_background_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
	SceneManager._drill_menu_background = false;	
   	this._drill_sprite_backgrounds = [];							//注意，该数组与DrillUp.menu_backgrounds数组的下标不同步，要使用data
   	this._drill_sprite_backgrounds_data = [];
	if( !$gameSystem._drill_sprite_backgrounds_visible ){$gameSystem.drill_backgroundVisibleInit();}
	if( !$gameSystem._drill_default_background ){ $gameSystem._drill_default_background = 0;}
	_drill_menu_background_createBackground.call(this);		//与背景一同创建
	
	if (this._backgroundSprite && !DrillUp.menu_backgrounds_bottom_visible ) {	//底图
		this._backgroundSprite.bitmap = null;
	};

};

var _drill_menu_background_terminate = Scene_MenuBase.prototype.terminate;
Scene_MenuBase.prototype.terminate = function() {
	_drill_menu_background_terminate.call(this);			//设置需要下次重新创建
	SceneManager._drill_menu_background = false;
};

Game_System.prototype.drill_backgroundVisibleInit = function() {	//显示数据初始化
	$gameSystem._drill_sprite_backgrounds_visible = [];
	for(var i = 0; i< DrillUp.menu_backgrounds.length ;i++){
		$gameSystem._drill_sprite_backgrounds_visible[i] = DrillUp.menu_backgrounds[i]['visible'];
	}
};

//==============================
// ** 层级排序
//==============================
Scene_MenuBase.prototype.drill_sortByZIndex = function() {
   this._backgroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});	//比较器
   this._foregroundSprite.children.sort(function(a, b){return a.zIndex-b.zIndex});
};

//==============================
// * 创建背景
//==============================
Scene_MenuBase.prototype.drill_createBackgrounds = function() {	
	SceneManager._drill_menu_background = true;
	
	if(!this._drill_sprite_backgrounds){
		this._drill_sprite_backgrounds = [];		//防止某些覆写的菜单报错
		this._drill_sprite_backgrounds_data = [];
	}
	if( !this._backgroundSprite ){		//菜单后面层
		this._backgroundSprite = new Sprite();
	}
	if( !this._foregroundSprite ){		//菜单前面层
		this._foregroundSprite = new Sprite();
		this.addChild(this._foregroundSprite);
	}
	
	for (var i = 0; i < DrillUp.menu_backgrounds.length; i++) {
		if( this.drill_checkBackgrounds(i) ){
			var temp_sprite_data = JSON.parse(JSON.stringify( DrillUp.menu_backgrounds[i] ));	//拷贝object（杜绝引用造成的修改）
			var temp_sprite = new TilingSprite(ImageManager.load_MenuLayer(temp_sprite_data['src_img']));	//TilingSprite平铺图层
			temp_sprite.move(0, 0, Graphics.width, Graphics.height);
			temp_sprite.origin.x = temp_sprite_data['x'];
			temp_sprite.origin.y = temp_sprite_data['y'];
			temp_sprite.opacity = temp_sprite_data['opacity'];
			temp_sprite.blendMode = temp_sprite_data['blendMode'];
			temp_sprite.zIndex = temp_sprite_data['zIndex'];
			temp_sprite.visible = $gameSystem._drill_sprite_backgrounds_visible[i];
			
			this._drill_sprite_backgrounds.push(temp_sprite);
			this._drill_sprite_backgrounds_data.push(temp_sprite_data);
			if( temp_sprite_data['menu_index'] == 0 ){
				this._backgroundSprite.addChild(temp_sprite);
			}else{
				this._foregroundSprite.addChild(temp_sprite);
			}
		}
	}
	if( !$gameSystem._drill_default_background ){ $gameSystem._drill_default_background = 0;}
	if(this._drill_sprite_backgrounds.length == 0 ){	//默认背景，0菜单层级，0图片层级（需要重新配一个json结构）
		var temp_sprite_data = [];
		temp_sprite_data['zIndex'] = 0;
		
		if( $gameSystem._drill_default_background == 0 ){
			temp_sprite_data['src_img'] = DrillUp.menu_backgrounds_def['src_img'];
			temp_sprite_data['x'] = DrillUp.menu_backgrounds_def['x'];
			temp_sprite_data['y'] = DrillUp.menu_backgrounds_def['y'];
			temp_sprite_data['opacity'] = DrillUp.menu_backgrounds_def['opacity'];
			temp_sprite_data['blendMode'] = DrillUp.menu_backgrounds_def['blendMode'];
			temp_sprite_data['x_speed'] = DrillUp.menu_backgrounds_def['x_speed'];
			temp_sprite_data['y_speed'] = DrillUp.menu_backgrounds_def['y_speed'];
		}else{
			var id = $gameSystem._drill_default_background - 1;
			var temp_sprite_data_2 = JSON.parse(JSON.stringify( DrillUp.menu_backgrounds[id] ));	//拷贝object（杜绝引用造成的修改）
			
			temp_sprite_data['src_img'] = temp_sprite_data_2['src_img'];
			temp_sprite_data['x'] = temp_sprite_data_2['x'];
			temp_sprite_data['y'] = temp_sprite_data_2['y'];
			temp_sprite_data['opacity'] = temp_sprite_data_2['opacity'];
			temp_sprite_data['blendMode'] = temp_sprite_data_2['blendMode'];
			temp_sprite_data['x_speed'] = temp_sprite_data_2['x_speed'];
			temp_sprite_data['y_speed'] = temp_sprite_data_2['y_speed'];
		}
		
		var temp_sprite = new TilingSprite(ImageManager.load_MenuLayer(temp_sprite_data['src_img']));
		temp_sprite.move(0, 0, Graphics.width, Graphics.height);
		temp_sprite.origin.x = temp_sprite_data['x']
		temp_sprite.origin.y = temp_sprite_data['y'];
		temp_sprite.opacity = temp_sprite_data['opacity'];
		temp_sprite.blendMode = temp_sprite_data['blendMode'];
		temp_sprite.zIndex = temp_sprite_data['zIndex'];
		
		this._drill_sprite_backgrounds.push(temp_sprite);
		this._drill_sprite_backgrounds_data.push(temp_sprite_data);
		this._backgroundSprite.addChild(temp_sprite);
	}
    this.drill_sortByZIndex();
};

//==============================
// * 检查背景所在菜单
//==============================
Scene_MenuBase.prototype.drill_checkBackgrounds = function(i) {
	var temp_sprite_data = DrillUp.menu_backgrounds[i] ; 	//注意，执行该方法，是在DrillUp.menu_backgrounds中遍历
	if ( temp_sprite_data === undefined || temp_sprite_data.length == 0  ) {
		return false;
	}
	if( SceneManager._scene.constructor.name === "Scene_Menu" && temp_sprite_data['menu'] == "主菜单" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Item" && temp_sprite_data['menu'] == "道具" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Skill" && temp_sprite_data['menu'] == "技能" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Equip" && temp_sprite_data['menu'] == "装备" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Status" && temp_sprite_data['menu'] == "状态" ){
		return true;
	}else if( (SceneManager._scene.constructor.name === "Scene_Party"||SceneManager._scene.constructor.name === "Scene_Formation") && temp_sprite_data['menu'] == "队形"  ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Options" && temp_sprite_data['menu'] == "选项" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Save" && temp_sprite_data['menu'] == "保存" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Shop" && temp_sprite_data['menu'] == "商店" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_GameEnd" && temp_sprite_data['menu'] == "游戏结束" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_EnemyBook" && temp_sprite_data['menu'] == "敌人图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_ItemBook" && temp_sprite_data['menu'] == "物品图鉴" ){
		return true;
	}else if( SceneManager._scene.constructor.name === "Scene_Picture_Gallery" && temp_sprite_data['menu'] == "画廊" ){
		return true;
	}else{
		if( SceneManager._scene.constructor.name === temp_sprite_data['menu_key'] ){
			return true;
		}
	}
	return false;
};

//==============================
// * 刷新背景
//==============================
var _drill_menu_background_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
	_drill_menu_background_update.call(this);
	
	if ( SceneManager.isCurrentSceneStarted() && !SceneManager._drill_menu_background ) {
		this.drill_createBackgrounds();				//创建，进入界面后只执行一次
	}
	if (SceneManager._drill_menu_background) {this.drill_updateBackgrounds()};
};

Scene_MenuBase.prototype.drill_updateBackgrounds = function() {
	for (var i = 0; i < this._drill_sprite_backgrounds.length; i++) {
		this._drill_sprite_backgrounds[i].origin.x += this._drill_sprite_backgrounds_data[i]['x_speed'];
		this._drill_sprite_backgrounds[i].origin.y += this._drill_sprite_backgrounds_data[i]['y_speed'];
	};
};


