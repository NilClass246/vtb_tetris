//=============================================================================
// MOG_SceneMenu.js
//=============================================================================

/*:
 * @plugindesc (v1.2)[v1.8]  面板 - 全自定义主菜单
 * @author Moghunter  （Drill_up、拾贝猫翻译+优化）
 * 
 * @param ----杂项----
 * @desc
 *
 * @param 资源-整体布局
 * @parent ----杂项----
 * @desc 主菜单布局的图片资源。
 * @default 主菜单-布局
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-金钱数值
 * @parent ----杂项----
 * @desc 金钱数值的图片资源。
 * @default 主菜单-金钱数值
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 平移-金钱数值 X
 * @parent ----杂项----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 255
 *
 * @param 平移-金钱数值 Y
 * @parent ----杂项----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 580
 *
 * @param 平移-游戏时长数值 X
 * @parent ----杂项----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 510
 *
 * @param 平移-游戏时长数值 Y
 * @parent ----杂项----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 60
 *
 * @param 游戏时长字体大小
 * @parent ----杂项----
 * @type number
 * @min 1
 * @desc 游戏时长的字体大小。
 * @default 22
 *
 * @param 平移-所在地图名称 X
 * @parent ----杂项----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 545
 *
 * @param 平移-所在地图名称 Y
 * @parent ----杂项----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 570
 *
 * @param 地图名称字体大小
 * @parent ----杂项----
 * @type number
 * @min 1
 * @desc 地图名称的字体大小。
 * @default 24
 *
 * @param 是否显示魔法圈
 * @parent ----杂项----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 资源-魔法圈
 * @parent 是否显示魔法圈
 * @desc 魔法圈的图片资源。
 * @default 主菜单-魔法圈
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 平移-魔法圈 X
 * @parent 是否显示魔法圈
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 700
 *
 * @param 平移-魔法圈 Y
 * @parent 是否显示魔法圈
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 140
 *
 * @param 魔法圈旋转速度
 * @parent 是否显示魔法圈
 * @desc 正数逆时针，负数顺时针，单位 弧度/帧。(1秒60帧)
 * 6.28表示一圈，设置0.01表示大概10秒转一圈，设置0则不旋转。
 * @default 0.002
 *
 * @param ----角色面板组----
 * @default 
 *
 * @param 角色排布模式
 * @parent ----角色面板组----
 * @type boolean
 * @on 水平布局
 * @off 垂直布局
 * @desc true - 水平布局，false - 垂直布局
 * @default true
 *
 * @param 是否手动分配布局位置
 * @parent ----角色面板组----
 * @type boolean
 * @on 手动配置
 * @off 自适应
 * @desc true - 手动配置，false - 自适应
 * @default false
 *
 * @param 平移-角色面板组 X
 * @parent 是否手动分配布局位置
 * @desc  x轴方向平移，单位像素。0为贴在最左边。
 * @default 20
 *
 * @param 平移-角色面板组 Y
 * @parent 是否手动分配布局位置
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 220
 *
 * @param 角色面板组间距
 * @parent 是否手动分配布局位置
 * @desc 多个角色之间的窗口间距。如果为负数，则窗口反序。
 * @default 200
 *
 * @param 角色面板组W间距
 * @parent 是否手动分配布局位置
 * @desc 偶数个角色面板的垂直方向间距，单位像素。（可为负数）
 * @default 0
 *
 * @param ==固定角色面板==
 * @parent ----角色面板组----
 * @default 
 *
 * @param 固定角色面板位置 1
 * @parent ==固定角色面板==
 * @desc 固定第1个角色面板的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定角色面板位置 2
 * @parent ==固定角色面板==
 * @desc 固定第2个角色面板的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定角色面板位置 3
 * @parent ==固定角色面板==
 * @desc 固定第3个角色面板的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定角色面板位置 4
 * @parent ==固定角色面板==
 * @desc 固定第4个角色面板的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定角色面板位置 5
 * @parent ==固定角色面板==
 * @desc 固定第5个角色面板的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定角色面板位置 6
 * @parent ==固定角色面板==
 * @desc 固定第6个角色面板的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定角色面板位置 7
 * @parent ==固定角色面板==
 * @desc 固定第7个角色面板的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定角色面板位置 8
 * @parent ==固定角色面板==
 * @desc 固定第8个角色面板的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param ----按钮组----
 * @default 
 *
 * @param 按钮排布模式
 * @parent ----按钮组----
 * @type boolean
 * @on 水平排布
 * @off 垂直排布
 * @desc true - 水平排布，false - 垂直排布
 * @default true
 *
 * @param 平移-按钮组 X
 * @parent ----按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 210
 *
 * @param 平移-按钮组 Y
 * @parent ----按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 490
 *
 * @param 按钮组间距
 * @parent ----按钮组----
 * @desc 按钮之间的间距。单位像素。如果为负数，则反序排布。
 * @default 48
 *
 * @param 按钮组W间距
 * @parent ----按钮组----
 * @desc 偶数个按钮的垂直方向间距。单位像素。
 * 设置0则按钮组成一条直线。
 * @default 36
 *
 * @param 平移-按钮组起点 X
 * @parent ----按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。进入菜单时按钮所在的起点位置，而后按钮自己会移动到标准位置。
 * @default 0
 *
 * @param 平移-按钮组起点 Y
 * @parent ----按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。进入菜单时按钮所在的起点位置，而后按钮自己会移动到标准位置。
 * @default 490
 *
 * @param 是否显示按钮名
 * @parent ----按钮组----
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 平移-按钮名 X
 * @parent 是否显示按钮名
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 16
 *
 * @param 平移-按钮名 Y
 * @parent 是否显示按钮名
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 460
 *
 * @param 按钮名起点 X
 * @parent 是否显示按钮名
 * @desc 按钮名初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的x轴值，单位像素。（可为负数）
 * @default -100
 *
 * @param 按钮名起点 Y
 * @parent 是否显示按钮名
 * @desc 按钮名初始会出现在偏移的位置，然后滑动到原本的位置，这里设置的是偏移的y轴值，单位像素。（可为负数）
 * @default 0
 *
 * @param 按钮名字体大小
 * @parent 是否显示按钮名
 * @type number
 * @min 1
 * @desc 按钮名的字体大小。
 * @default 24
 *
 * @param 平移-激活的按钮 X
 * @parent ----按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。当你点击状态、技能等按钮时，需要选择指定角色。则按钮处于激活状态。
 * @default 151
 *
 * @param 平移-激活的按钮 Y
 * @parent ----按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。当你点击状态、技能等按钮时，需要选择指定角色。则按钮处于激活状态。
 * @default 455
 *
 * @param ==固定按钮==
 * @parent ----按钮组----
 * @default 
 *
 * @param 固定按钮位置 1
 * @parent ==固定按钮==
 * @desc 固定第1个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 2
 * @parent ==固定按钮==
 * @desc 固定第2个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 3
 * @parent ==固定按钮==
 * @desc 固定第3个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 4
 * @parent ==固定按钮==
 * @desc 固定第4个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 5
 * @parent ==固定按钮==
 * @desc 固定第5个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 6
 * @parent ==固定按钮==
 * @desc 固定第6个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 7
 * @parent ==固定按钮==
 * @desc 固定第7个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 8
 * @parent ==固定按钮==
 * @desc 固定第8个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 9
 * @parent ==固定按钮==
 * @desc 固定第9个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 10
 * @parent ==固定按钮==
 * @desc 固定第10个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 11
 * @parent ==固定按钮==
 * @desc 固定第11个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 12
 * @parent ==固定按钮==
 * @desc 固定第12个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 13
 * @parent ==固定按钮==
 * @desc 固定第13个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 14
 * @parent ==固定按钮==
 * @desc 固定第14个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 15
 * @parent ==固定按钮==
 * @desc 固定第15个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 16
 * @parent ==固定按钮==
 * @desc 固定第16个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 17
 * @parent ==固定按钮==
 * @desc 固定第17个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 18
 * @parent ==固定按钮==
 * @desc 固定第18个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 19
 * @parent ==固定按钮==
 * @desc 固定第19个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定按钮位置 20
 * @parent ==固定按钮==
 * @desc 固定第20个按钮的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 可选角色头像排布模式
 * @parent ----按钮组----
 * @type boolean
 * @on 水平排布
 * @off 垂直排布
 * @desc true - 水平排布，false - 垂直排布
 * @default true
 *
 * @param 平移-可选头像 X
 * @parent ----按钮组----
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 210
 *
 * @param 平移-可选头像 Y
 * @parent ----按钮组----
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 500
 *
 * @param 可选头像间距
 * @parent ----按钮组----
 * @desc 按钮之间的间距。单位像素。如果为负数，则反序排布。
 * @default 60
 *
 * @param 可选头像W间距
 * @parent ----按钮组----
 * @desc 偶数个按钮的垂直方向间距。单位像素。
 * 设置0则按钮组成一条直线。
 * @default 0
 *
 * @param ==固定可选头像==
 * @parent ----按钮组----
 * @default 
 *
 * @param 固定可选头像位置 1
 * @parent ==固定可选头像==
 * @desc 固定第1个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 2
 * @parent ==固定可选头像==
 * @desc 固定第2个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 3
 * @parent ==固定可选头像==
 * @desc 固定第3个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 4
 * @parent ==固定可选头像==
 * @desc 固定第4个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 5
 * @parent ==固定可选头像==
 * @desc 固定第5个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 6
 * @parent ==固定可选头像==
 * @desc 固定第6个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 7
 * @parent ==固定可选头像==
 * @desc 固定第7个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 8
 * @parent ==固定可选头像==
 * @desc 固定第8个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 9
 * @parent ==固定可选头像==
 * @desc 固定第9个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 10
 * @parent ==固定可选头像==
 * @desc 固定第10个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 11
 * @parent ==固定可选头像==
 * @desc 固定第11个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * @param 固定可选头像位置 12
 * @parent ==固定可选头像==
 * @desc 固定第12个可选头像的位置，填入 x,y 的坐标。
 * 例如：200,200（0,0为最左上角），不填则不固定位置。
 * @default 
 *
 * 
 * @param ----角色面板----
 * @desc
 *
 * @param 平移-角色面板 X
 * @parent ----角色面板----
 * @desc 以分配的适应点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-角色面板 Y
 * @parent ----角色面板----
 * @desc 以分配的适应点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-角色前视图 X
 * @parent ----角色面板----
 * @desc 以分配的适应点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 平移-角色前视图 Y
 * @parent ----角色面板----
 * @desc 以分配的适应点为基准，y轴方向平移，单位像素。（可为负数）
 * @default -120
 *
 * @param 资源-角色面板
 * @parent ----角色面板----
 * @desc 角色面板的图片资源。
 * @default 主菜单-角色面板
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-生命条
 * @parent ----角色面板----
 * @desc 生命条的图片资源。注意这里是固定流动的。流动速度非常快。
 * @default 主菜单-生命条
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-生命数值
 * @parent ----角色面板----
 * @desc 生命数值的图片资源。
 * @default 主菜单-生命数值
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 平移-生命条 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 50
 *
 * @param 平移-生命条 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 88
 *
 * @param 生命条角度
 * @parent ----角色面板----
 * @type number
 * @desc 生命条的角度，设置90为顺时针方向的90度，朝向下。
 * @default 0
 *
 * @param 平移-生命数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 87
 *
 * @param 平移-生命数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 73
 *
 * @param 平移-最大生命数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 147
 *
 * @param 平移-最大生命数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 83
 *
 * @param 资源-魔法条
 * @parent ----角色面板----
 * @desc 魔法条的图片资源。注意这里是固定流动的。流动速度非常快。
 * @default 主菜单-魔法条
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-魔法数值
 * @parent ----角色面板----
 * @desc 魔法数值的图片资源。
 * @default 主菜单-魔法数值
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 平移-魔法条 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 65
 *
 * @param 平移-魔法条 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 111
 *
 * @param 魔法条角度
 * @parent ----角色面板----
 * @type number
 * @desc 魔法条的角度，设置90为顺时针方向的90度，朝向下。
 * @default 0
 *
 * @param 平移-魔法数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 93
 *
 * @param 平移-魔法数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 96
 *
 * @param 平移-最大魔法数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 153
 *
 * @param 平移-最大魔法数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 106
 *
 * @param 资源-怒气条
 * @parent ----角色面板----
 * @desc 怒气条的图片资源。注意这里是固定流动的。流动速度非常快。
 * @default 主菜单-怒气条
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-怒气数值
 * @parent ----角色面板----
 * @desc 怒气数值的图片资源。
 * @default 主菜单-怒气数值
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 平移-怒气条 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 50
 *
 * @param 平移-怒气条 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 135
 *
 * @param 怒气条角度
 * @parent ----角色面板----
 * @type number
 * @desc 怒气条的角度，设置90为顺时针方向的90度，朝向下。
 * @default 0
 *
 * @param 平移-怒气数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 87
 *
 * @param 平移-怒气数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 120
 *
 * @param 平移-最大怒气数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 147
 *
 * @param 平移-最大怒气数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 130
 *
 * @param 资源-经验条
 * @parent ----角色面板----
 * @desc 经验条的图片资源。注意这里是固定流动的。流动速度非常快。
 * @default 主菜单-经验条
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-经验数值
 * @parent ----角色面板----
 * @desc 经验数值的图片资源。
 * @default 主菜单-经验数值
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 平移-经验条 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 65
 *
 * @param 平移-经验条 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 158
 *
 * @param 经验条角度
 * @parent ----角色面板----
 * @type number
 * @desc 经验条的角度，设置90为顺时针方向的90度，朝向下。
 * @default 0
 *
 * @param 平移-经验数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 93
 *
 * @param 平移-经验数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 143
 *
 * @param 平移-下一级数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 153
 *
 * @param 平移-下一级数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 153
 *
 * @param 资源-等级数值
 * @parent ----角色面板----
 * @desc 等级数值的图片资源。
 * @default 主菜单-等级数值
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 平移-等级数值 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 85
 *
 * @param 平移-等级数值 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 37
 *
 * @param 平移-状态图标 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 111
 *
 * @param 平移-状态图标 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 30
 *
 * @param 平移-角色名 X
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，x轴方向平移，单位像素。（可为负数）
 * @default 20
 *
 * @param 平移-角色名 Y
 * @parent ----角色面板----
 * @desc 以窗口的点为基准，y轴方向平移，单位像素。（可为负数）
 * @default 0
 *
 * @param 角色名字体大小
 * @parent ----角色面板----
 * @type number
 * @min 1
 * @desc 角色名的字体大小。
 * @default 22
 * 
 * @param ==角色前视图 1至20==
 * @parent ----角色面板----
 * @default 
 *
 * @param 角色前视图-1
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-2
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-3
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-4
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-5
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-6
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-7
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-8
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-9
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-10
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-11
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-12
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-13
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-14
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-15
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-16
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-17
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-18
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-19
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-20
 * @parent ==角色前视图 1至20==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 * 
 * @param ==角色前视图21至40==
 * @parent ----角色面板----
 * @default 
 *
 * @param 角色前视图-21
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-22
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-23
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-24
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-25
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-26
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-27
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-28
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-29
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-30
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-31
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-32
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-33
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-34
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-35
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-36
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-37
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-38
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-39
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-40
 * @parent ==角色前视图21至40==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 * 
 * @param ==角色前视图41至60==
 * @parent ----角色面板----
 * @default 
 *
 * @param 角色前视图-41
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-42
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-43
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-44
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-45
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-46
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-47
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-48
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-49
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-50
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-51
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-52
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-53
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-54
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-55
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-56
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-57
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-58
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-59
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色前视图-60
 * @parent ==角色前视图41至60==
 * @desc 角色前视图的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param ----按钮----
 * @default 
 *
 * @param 未选中按钮透明度
 * @parent ----按钮----
 * @type number
 * @min 1
 * @max 255
 * @desc 未选中的其它按钮默认的透明度。0为完全透明，255为完全不透明。(设置0会造成鼠标点不了，这里最低为1。)
 * @default 160
 *
 * @param 是否使用缩放效果
 * @parent ----按钮----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会来回缩放。
 * @default true
 *
 * @param 是否使用闪烁效果
 * @parent ----按钮----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会来回闪烁。
 * @default false
 *
 * @param 浮动偏移量
 * @parent ----按钮----
 * @type number
 * @min 1
 * @desc 使用左右或者上下浮动时，浮动偏移的位置量，单位像素。
 * @default 15
 *
 * @param 是否使用左右浮动
 * @parent ----按钮----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会左右浮动。
 * @default false
 *
 * @param 是否使用上下浮动
 * @parent ----按钮----
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用，当前选中的按钮，会上下浮动。
 * @default false
 *
 * @param 资源-默认按钮
 * @parent ----按钮----
 * @desc 默认按钮的图片资源。如果其他按钮为空，则使用默认按钮。
 * 如果你使用了自创的其他选项，在那个选项中将使用默认按钮。
 * @default btn_默认
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-道具按钮
 * @parent ----按钮----
 * @desc 道具按钮的图片资源。如果为空，则使用默认按钮。
 * @default btn_道具
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-技能按钮
 * @parent ----按钮----
 * @desc 技能按钮的图片资源。如果为空，则使用默认按钮。
 * @default btn_技能
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-装备按钮
 * @parent ----按钮----
 * @desc 装备按钮的图片资源。如果为空，则使用默认按钮。
 * @default btn_装备
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-状态按钮
 * @parent ----按钮----
 * @desc 状态按钮的图片资源。如果为空，则使用默认按钮。
 * @default btn_状态
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-队形按钮
 * @parent ----按钮----
 * @desc 队形按钮的图片资源。如果为空，则使用默认按钮。
 * @default btn_队形
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-选项按钮
 * @parent ----按钮----
 * @desc 选项按钮的图片资源。如果为空，则使用默认按钮。
 * @default btn_选项
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-保存按钮
 * @parent ----按钮----
 * @desc 保存按钮的图片资源。如果为空，则使用默认按钮。
 * @default btn_保存
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-游戏结束选择按钮
 * @parent ----按钮----
 * @desc 游戏结束选择按钮的图片资源。如果为空，则使用默认按钮。
 * @default btn_游戏结束
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-画廊按钮
 * @parent ----按钮----
 * @desc 画廊按钮的图片资源。如果为空，则使用默认按钮。
 * 前提是你使用了画廊插件MOG_PictureGallery.js。
 * @default btn_画廊
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 资源-音乐书按钮
 * @parent ----按钮----
 * @desc 音乐书按钮的图片资源。如果为空，则使用默认按钮。
 * 前提是你使用了音乐书插件MOG_Music_Book.js。
 * @default btn_音乐书
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param DEBUG-按钮关键字搜索
 * @parent ----按钮----
 * @type boolean
 * @on 开启
 * @off 关闭
 * @desc 如果你实在找不到关键字，但是有默认按钮显示了，你可以开启这个，进入主菜单，会按顺序显示所有按钮的关键字。
 * @default false
 * 
 * @param ==自定义按钮==
 * @parent ----按钮----
 * @desc
 *
 * @param 自定义关键字-1
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-1
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-2
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-2
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-3
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-3
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-4
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-4
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-5
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-5
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-6
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-6
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-7
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-7
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-8
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-8
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-9
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-9
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-10
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-10
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-11
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-11
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-12
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-12
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-13
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-13
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-14
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-14
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-15
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-15
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-16
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-16
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-17
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-17
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-18
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-18
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-19
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-19
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 * @param 自定义关键字-20
 * @parent ==自定义按钮==
 * @desc 如果你使用了特殊插件对菜单进行了命名，则填写此关键字。前缀为Button_，比如：Button_Synthesis。
 * @default 
 *
 * @param 自定义按钮-20
 * @parent ==自定义按钮==
 * @desc 自定义按钮的图片资源。如果为空，则使用默认按钮。
 * @default 
 * @require 1
 * @dir img/Menu__main/
 * @type file
 *
 *
 * @param 最大显示可选头像数
 * @parent ----按钮----
 * @type number
 * @min 2
 * @desc 当你点击状态、技能等按钮时，需要选择指定角色显示数量。
 * @default 5
 *
 * @param 资源-角色头像指针
 * @parent ----按钮----
 * @desc 角色头像指针的图片资源。
 * 当队伍人物数量超过显示数量时，出现指针。
 * @default 主菜单-角色头像指针
 * @require 1
 * @dir img/Menu__main/
 * @type file
 * 
 * @param ==角色头像 1至20==
 * @parent ----按钮----
 * @default 
 *
 * @param 角色头像-1
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-2
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-3
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-4
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-5
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-6
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-7
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-8
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-9
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-10
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-11
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-12
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-13
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-14
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-15
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-16
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-17
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-18
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-19
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-20
 * @parent ==角色头像 1至20==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 * 
 * @param ==角色头像21至40==
 * @parent ----按钮----
 * @default 
 *
 * @param 角色头像-21
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-22
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-23
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-24
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-25
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-26
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-27
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-28
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-29
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-30
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-31
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-32
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-33
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-34
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-35
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-36
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-37
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-38
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-39
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-40
 * @parent ==角色头像21至40==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 * 
 * @param ==角色头像41至60==
 * @parent ----按钮----
 * @default 
 *
 * @param 角色头像-41
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-42
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-43
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-44
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-45
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-46
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-47
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-48
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-49
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-50
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-51
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-52
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-53
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-54
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-55
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-56
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-57
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-58
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-59
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @param 角色头像-60
 * @parent ==角色头像41至60==
 * @desc 角色头像的图片资源。与角色编号对应。
 * @default 
 * @require 1
 * @dir img/Menu__actorFaces/
 * @type file
 *
 * @help  
 * =============================================================================
 * +++ MOG - Scene Menu (v1.2) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * 可完全自己定义的主菜单设置。
 * 更多详细介绍，去看看插件详细手册"关于全自定义主菜单（配置表）.docx"。
 * 【现已支持插件关联资源的打包、加密】
 *
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件可以单独使用，对主菜单的所有窗口进行美化控制。
 * 被扩展：
 *   - Drill_WindowMenuButton 控件-按钮窗口管理器
 *     通过该插件，你可以更灵活地添加/修改主菜单的按钮。
 *     （新按钮通过关键字配置按钮图片）
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：菜单界面。
 *   可以设置主菜单面板(界面)的内容。
 * 2.配置分五个部分，角色面板组、按钮组、角色面板、按钮、杂项数据。
 * 3.由于这里是主菜单，主菜单要求显示的数据最好健全。
 *   以下数据不建议隐藏：
 *     等级数值、角色名、
 *     生命数值、最大生命数值、
 *     魔法数值、最大魔法数值、
 *     状态图标、金钱数值、
 *     游戏时长数值、所在地图名称
 * （如果一定要隐藏，设置Y坐标1000以上，让玩家看不到就可以了。）
 *
 * -----------------------------------------------------------------------------
 * ----素材规则
 * 这里固定设置了生命条是流动的。
 * 流动生命条的长度是资源图片长度的三分之一。
 * 生命条的图片会分成3等份，第1份和第3份要一模一样，第2份是
 * 第1份和第3份的过渡。（其它条与生命条一样）
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__main （Menu后面有两个下划线）
 * 资源路径：img/Menu__actorFaces （Menu后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__main文件夹。
 * 先确保项目img文件夹下是否有Menu__actorFaces文件夹。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 资源-整体布局     （Menu__main文件夹）
 * 资源-金钱数值     （Menu__main文件夹）
 * 资源-魔法圈       （Menu__main文件夹）
 *                  
 * 资源-角色面板     （Menu__main文件夹）
 * 资源-生命条       （Menu__main文件夹）
 * 资源-生命数值     （Menu__main文件夹）
 * 资源-魔法条       （Menu__main文件夹）
 * 资源-魔法数值     （Menu__main文件夹）
 * 资源-怒气条       （Menu__main文件夹）
 * 资源-怒气数值     （Menu__main文件夹）
 * 资源-经验条       （Menu__main文件夹）
 * 资源-经验数值     （Menu__main文件夹）
 * 资源-等级数值     （Menu__main文件夹）
 *
 * 角色前视图-1      （Menu__actorFaces文件夹）
 * 角色前视图-2      （Menu__actorFaces文件夹）
 * 角色前视图-3      （Menu__actorFaces文件夹）
 * …………
 *
 * 资源-角色头像指针 （Menu__main文件夹）
 *
 * 角色头像-1        （Menu__actorFaces文件夹）
 * 角色头像-2        （Menu__actorFaces文件夹）
 * 角色头像-3        （Menu__actorFaces文件夹）
 * ………
 *
 * 资源-默认按钮     （Menu__main文件夹）
 * 资源-道具按钮     （Menu__main文件夹）
 * 资源-技能按钮     （Menu__main文件夹）
 * 资源-装备按钮     （Menu__main文件夹）
 * 资源-状态按钮     （Menu__main文件夹）
 * 资源-队形按钮     （Menu__main文件夹）
 * 资源-选项按钮     （Menu__main文件夹）
 * 资源-保存按钮     （Menu__main文件夹）
 * 资源-游戏结束选择按钮（Menu__main文件夹）
 * 资源-画廊按钮     （Menu__main文件夹）
 * 资源-音乐书按钮   （Menu__main文件夹）
 *
 * 自定义按钮-1      （Menu__main文件夹）
 * 自定义按钮-2      （Menu__main文件夹）
 * 自定义按钮-3      （Menu__main文件夹）
 * ………
 *
 * 1.框架资源都在Menu__main文件夹中。
 * 2.角色图标、头像资源都在Menu__actorFaces文件夹中。
 * 3.关于自定义菜单中的按钮，需要与你使用的插件名字设置相互匹配。
 *   比如：YEP_ItemSynthesis.js物品合成插件，这个菜单的命令关键字为Synthesis。
 *   那么填写Button_Synthesis关键字并配置按钮，即可修改物品合成插件的按钮。
 *
 * -----------------------------------------------------------------------------
 * ----界面与按钮关系表
 * 
 * 可设置   关键字            关系界面
 *  x       Menu             （主菜单界面） 
 *  √       Item             （道具界面） 
 *  √       Skill            （技能界面）
 *  √       Equip            （装备界面） 
 *  √       Status           （状态界面） 
 *  √       Formation        （队形界面） 
 *  √       Options          （选项界面） 
 *  √       Save             （保存界面） 
 *  x       Shop             （商店界面） 
 *  √       GameEnd          （游戏结束选择界面）
 *
 *  x       EnemyBook        （敌人图鉴界面）
 *  x       ItemBook         （道具图鉴界面）
 *  √       Picture_Gallery  （画廊界面）
 *  √       Music_Book       （音乐书界面）
 *  √       Fast_Travel      （世界地图界面）
 *
 *  √       Lagomoro_Mission （小优任务界面）
 *  √       Synthesis        （YEP物品合成界面）
 *  √       Quest            （YEP任务系统界面）
 *
 * 配置按钮关键字时，不要忘了加"Button_"前缀！
 *
 * 关于如何识别自定义关键字
 *     YEP有物品合成界面、任务系统界面等插件，这些界面不设置则都使用默认按钮。
 *     如果要指定按钮，那么一般查看yep的第一个设置参数名，比如：
 *     YEP物品合成第一个设置参数名是：Synthesis Command，那么关键字为Synthesis。
 *     YEP任务系统第一个设置参数名是：Quest Command，那么关键字为Quest。
 *
 * 如果你实在找不到按钮的关键字，你可以在 按钮窗口管理器 插件中，开启"关键字搜索"
 * 功能，进入主菜单时，会弹框显示所有的关键字。
 *
 * -----------------------------------------------------------------------------
 * ----关于Drill_up优化：
 * [v1.1]
 * 使得该插件支持关联资源的打包、加密。
 * 部署时勾选去除无关文件，本插件中相关的文件不会被去除。
 * [v1.2]
 * 大幅度修改了按钮的排布与设置。
 * 大幅度修改了角色面板的排布与设置。
 * 大幅度修改了文件关联的位置。（因为要支持加密）
 * 大幅度添加了窗口相关控制变量。
 * 添加了按钮的可以设置的三个效果。
 * [v1.3]
 * 添加了按钮关键字搜索功能。
 * [v1.4]
 * 添加了怒气、经验的显示，并且可以使得流动条有角度。
 * [v1.5]
 * 优化了鼠标点击效果。
 * [v1.6]
 * 添加了更多自定义按钮。
 * [v1.7]
 * 修改了插件分类。
 * [v1.8]
 * 修改了插件关联的资源文件夹。
 *
 */

 //
 //插件记录：
 //		代码复杂度★★★★
 //		能加功能就加，尽量别删改功能，这里的位置参数要花较长才能弄明白。
 //
 
//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_SceneMenu = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_SceneMenu');
	Moghunter.scMenu_layoutStatusX = Number(Moghunter.parameters['平移-角色面板 X'] || 0);
	Moghunter.scMenu_layoutStatusY = Number(Moghunter.parameters['平移-角色面板 Y'] || 0);  
	/* （这里的角色面板中两个图片是分别移动的，越改配置越麻烦）
	Moghunter.scMenu_layoutStatus_slideX = Number(Moghunter.parameters['角色面板起点 X'] || 0);
	Moghunter.scMenu_layoutStatus_slideY = Number(Moghunter.parameters['角色面板起点 Y'] || 0);  
	Moghunter.scMenu_layoutStatus_slideTime = Number(Moghunter.parameters['角色面板移动时长'] || 0);  */
    Moghunter.scMenu_CharX = Number(Moghunter.parameters['平移-角色前视图 X'] || 20);
	Moghunter.scMenu_CharY = Number(Moghunter.parameters['平移-角色前视图 Y'] || 0);
	Moghunter.scMenu_HPMeterX = Number(Moghunter.parameters['平移-生命条 X'] || 50);
	Moghunter.scMenu_HPMeterY = Number(Moghunter.parameters['平移-生命条 Y'] || 88);
	Moghunter.scMenu_HPMeterAngle = Number(Moghunter.parameters['生命条角度'] || 0);
	Moghunter.scMenu_HPNumberX = Number(Moghunter.parameters['平移-生命数值 X'] || 87);
	Moghunter.scMenu_HPNumberY = Number(Moghunter.parameters['平移-生命数值 Y'] || 73);
	Moghunter.scMenu_HPNumber2X = Number(Moghunter.parameters['平移-最大生命数值 X'] || 147);
	Moghunter.scMenu_HPNumber2Y = Number(Moghunter.parameters['平移-最大生命数值 Y'] || 83);
	Moghunter.scMenu_MPMeterX = Number(Moghunter.parameters['平移-魔法条 X'] || 65);
	Moghunter.scMenu_MPMeterY = Number(Moghunter.parameters['平移-魔法条 Y'] || 111);	
	Moghunter.scMenu_MPMeterAngle = Number(Moghunter.parameters['魔法条角度'] || 0);
	Moghunter.scMenu_MPNumberX = Number(Moghunter.parameters['平移-魔法数值 X'] || 93);
	Moghunter.scMenu_MPNumberY = Number(Moghunter.parameters['平移-魔法数值 Y'] || 96);
	Moghunter.scMenu_MPNumber2X = Number(Moghunter.parameters['平移-最大魔法数值 X'] || 153);
	Moghunter.scMenu_MPNumber2Y = Number(Moghunter.parameters['平移-最大魔法数值 Y'] || 106);
	Moghunter.scMenu_TPMeterX = Number(Moghunter.parameters['平移-怒气条 X'] || 50);
	Moghunter.scMenu_TPMeterY = Number(Moghunter.parameters['平移-怒气条 Y'] || 135);	
	Moghunter.scMenu_TPMeterAngle = Number(Moghunter.parameters['怒气条角度'] || 0);
	Moghunter.scMenu_TPNumberX = Number(Moghunter.parameters['平移-怒气数值 X'] || 87);
	Moghunter.scMenu_TPNumberY = Number(Moghunter.parameters['平移-怒气数值 Y'] || 120);
	Moghunter.scMenu_TPNumber2X = Number(Moghunter.parameters['平移-最大怒气数值 X'] || 147);
	Moghunter.scMenu_TPNumber2Y = Number(Moghunter.parameters['平移-最大怒气数值 Y'] || 130);
	Moghunter.scMenu_EXPMeterX = Number(Moghunter.parameters['平移-经验条 X'] || 65);
	Moghunter.scMenu_EXPMeterY = Number(Moghunter.parameters['平移-经验条 Y'] || 158);	
	Moghunter.scMenu_EXPMeterAngle = Number(Moghunter.parameters['经验条角度'] || 0);
	Moghunter.scMenu_EXPNumberX = Number(Moghunter.parameters['平移-经验数值 X'] || 93);
	Moghunter.scMenu_EXPNumberY = Number(Moghunter.parameters['平移-经验数值 Y'] || 143);
	Moghunter.scMenu_EXPNumber2X = Number(Moghunter.parameters['平移-下一级数值 X'] || 153);
	Moghunter.scMenu_EXPNumber2Y = Number(Moghunter.parameters['平移-下一级数值 Y'] || 153);
	Moghunter.scMenu_LVNumberX = Number(Moghunter.parameters['平移-等级数值 X'] || 85);
	Moghunter.scMenu_LVNumberY = Number(Moghunter.parameters['平移-等级数值 Y'] || 37);
	Moghunter.scMenu_statesX = Number(Moghunter.parameters['平移-状态图标 X'] || 111);
	Moghunter.scMenu_statesY = Number(Moghunter.parameters['平移-状态图标 Y'] || 30);
	Moghunter.scMenu_NameX = Number(Moghunter.parameters['平移-角色名 X'] || 20);
	Moghunter.scMenu_NameY = Number(Moghunter.parameters['平移-角色名 Y'] || 0);
	Moghunter.scMenu_NameFontSize = Number(Moghunter.parameters['角色名字体大小'] || 20);
	Moghunter.scMenu_ComX = Number(Moghunter.parameters['平移-按钮组 X'] || 180);
	Moghunter.scMenu_ComY = Number(Moghunter.parameters['平移-按钮组 Y'] || 50);	
	Moghunter.scMenu_Com_startX = Number(Moghunter.parameters['平移-按钮组起点 X'] || 0);
	Moghunter.scMenu_Com_startY = Number(Moghunter.parameters['平移-按钮组起点 Y'] || 490);
	Moghunter.scMenu_Com_model = String(Moghunter.parameters['按钮排布模式'] || "true");
	Moghunter.scMenu_Com_space = Number(Moghunter.parameters['按钮组间距'] || 48);
	Moghunter.scMenu_Com_w_space = Number(Moghunter.parameters['按钮组W间距'] || 36);	
	Moghunter.scMenu_ComWX = Number(Moghunter.parameters['平移-激活的按钮 X'] || 40);
	Moghunter.scMenu_ComWY = Number(Moghunter.parameters['平移-激活的按钮 Y'] || 148);	
	Moghunter.scMenu_ComNameVisible = String(Moghunter.parameters['是否显示按钮名'] || "true");
	Moghunter.scMenu_ComNameX = Number(Moghunter.parameters['平移-按钮名 X'] || 40);
	Moghunter.scMenu_ComNameY = Number(Moghunter.parameters['平移-按钮名 Y'] || 96);
	Moghunter.scMenu_ComName_slideX = Number(Moghunter.parameters['按钮名起点 X'] || -100);
	Moghunter.scMenu_ComName_slideY = Number(Moghunter.parameters['按钮名起点 Y'] || 0);
	Moghunter.scMenu_ComNameFontSize = Number(Moghunter.parameters['按钮名字体大小'] || 22);
	Moghunter.scMenu_maxVisibleFaces = Number(Moghunter.parameters['最大显示可选头像数'] || 5);
	Moghunter.scMenu_FaceSelX = Number(Moghunter.parameters['平移-可选头像 X'] || 240);
	Moghunter.scMenu_FaceSelY = Number(Moghunter.parameters['平移-可选头像 Y'] || 128);
	Moghunter.scMenu_FaceSel_space = Number(Moghunter.parameters['可选头像间距'] || 60);
	Moghunter.scMenu_FaceSel_w_space = Number(Moghunter.parameters['可选头像W间距'] || 0);
	//Moghunter.scMenu_FaceSel_slideX = Number(Moghunter.parameters['平移-可选头像起点 X'] || 240);
	//Moghunter.scMenu_FaceSel_slideY = Number(Moghunter.parameters['平移-可选头像起点 Y'] || 128);
	Moghunter.scMenu_FaceSel_model = String(Moghunter.parameters['可选角色头像排布模式'] || "true");
    Moghunter.scMenu_GoldNumberX = Number(Moghunter.parameters['平移-金钱数值 X'] || 260);
	Moghunter.scMenu_GoldNumberY = Number(Moghunter.parameters['平移-金钱数值 Y'] || 580);
    Moghunter.scMenu_playTimeNumberX = Number(Moghunter.parameters['平移-游戏时长数值 X'] || 565);
	Moghunter.scMenu_playTimeNumberY = Number(Moghunter.parameters['平移-游戏时长数值 Y'] || 60);
	Moghunter.scMenu_playTimeNumberFontSize = Number(Moghunter.parameters['游戏时长字体大小'] || 24);	
    Moghunter.scMenu_locationX = Number(Moghunter.parameters['平移-所在地图名称 X'] || 450);
	Moghunter.scMenu_locationY = Number(Moghunter.parameters['平移-所在地图名称 Y'] || 575);
	Moghunter.scMenu_locationFontSize = Number(Moghunter.parameters['地图名称字体大小'] || 26);			
	Moghunter.scMenu_MagicCircleV = String(Moghunter.parameters['是否显示魔法圈'] || "true");	
    Moghunter.scMenu_MagicCircleX = Number(Moghunter.parameters['平移-魔法圈 X'] || 700);
	Moghunter.scMenu_MagicCircleY = Number(Moghunter.parameters['平移-魔法圈 Y'] || 140);
    Moghunter.scMenu_MagicCircleR = Number(Moghunter.parameters['魔法圈旋转速度'] || 0.001);
	
	Moghunter.scMenu_pos_lay_model = String(Moghunter.parameters['角色排布模式'] || "true");
	Moghunter.scMenu_pos_fix = String(Moghunter.parameters['是否手动分配布局位置'] || "false");	
    Moghunter.scMenu_pos_X = Number(Moghunter.parameters['平移-角色面板组 X'] || 0);
    Moghunter.scMenu_pos_Y = Number(Moghunter.parameters['平移-角色面板组 Y'] || 0);
    Moghunter.scMenu_pos_fix_space = Number(Moghunter.parameters['角色面板组间距'] || 100);
    Moghunter.scMenu_pos_fix_w_space = Number(Moghunter.parameters['角色面板组W间距'] || 0);
    Moghunter.scMenu_pos_fix_char_h = 1;
    Moghunter.scMenu_pos_fix_status_h = 1;
    Moghunter.scMenu_actor_custom_1 = String(Moghunter.parameters['固定角色面板位置 1'] || "");
    Moghunter.scMenu_actor_custom_2 = String(Moghunter.parameters['固定角色面板位置 2'] || "");
    Moghunter.scMenu_actor_custom_3 = String(Moghunter.parameters['固定角色面板位置 3'] || "");
    Moghunter.scMenu_actor_custom_4 = String(Moghunter.parameters['固定角色面板位置 4'] || "");
    Moghunter.scMenu_actor_custom_5 = String(Moghunter.parameters['固定角色面板位置 5'] || "");
    Moghunter.scMenu_actor_custom_6 = String(Moghunter.parameters['固定角色面板位置 6'] || "");
    Moghunter.scMenu_actor_custom_7 = String(Moghunter.parameters['固定角色面板位置 7'] || "");
    Moghunter.scMenu_actor_custom_8 = String(Moghunter.parameters['固定角色面板位置 8'] || "");
	
	Moghunter.src_main_Layout = String(Moghunter.parameters['资源-整体布局']);
	Moghunter.src_main_MagicCircle = String(Moghunter.parameters['资源-魔法圈']);
	Moghunter.src_main_LayoutStatus = String(Moghunter.parameters['资源-角色面板']);
	Moghunter.src_main_FaceArrow = String(Moghunter.parameters['资源-角色头像指针']);
	Moghunter.src_main_GoldNumber = String(Moghunter.parameters['资源-金钱数值']);
	Moghunter.src_main_HPMeter = String(Moghunter.parameters['资源-生命条']);
	Moghunter.src_main_HPNumber = String(Moghunter.parameters['资源-生命数值']);
	Moghunter.src_main_MPMeter = String(Moghunter.parameters['资源-魔法条']);
	Moghunter.src_main_MPNumber = String(Moghunter.parameters['资源-魔法数值']);
	Moghunter.src_main_TPMeter = String(Moghunter.parameters['资源-怒气条']);
	Moghunter.src_main_TPNumber = String(Moghunter.parameters['资源-怒气数值']);
	Moghunter.src_main_EXPMeter = String(Moghunter.parameters['资源-经验条']);
	Moghunter.src_main_EXPNumber = String(Moghunter.parameters['资源-经验数值']);
	Moghunter.src_main_LVNumber = String(Moghunter.parameters['资源-等级数值']);
	
	Moghunter.scMenu_btn_debug = String(Moghunter.parameters['DEBUG-按钮关键字搜索'] || "false") == "true";	
		
    Moghunter.scMenu_btn_unselect_opacity = Number(Moghunter.parameters['未选中按钮透明度'] || 160);
	Moghunter.scMenu_btn_a_zoom = String(Moghunter.parameters['是否使用缩放效果'] || "true") == "true";	
	Moghunter.scMenu_btn_a_flash = String(Moghunter.parameters['是否使用闪烁效果'] || "false") == "true";	
    Moghunter.scMenu_btn_a_float_var = Number(Moghunter.parameters['浮动偏移量'] || 15);
	Moghunter.scMenu_btn_a_float_lr = String(Moghunter.parameters['是否使用左右浮动'] || "false") == "true";	
	Moghunter.scMenu_btn_a_float_ud = String(Moghunter.parameters['是否使用上下浮动'] || "false") == "true";	
	Moghunter.src_btn_0 = String(Moghunter.parameters['资源-默认按钮']);
	Moghunter.src_btn_1 = String(Moghunter.parameters['资源-道具按钮']);
	Moghunter.src_btn_2 = String(Moghunter.parameters['资源-技能按钮']);
	Moghunter.src_btn_3 = String(Moghunter.parameters['资源-装备按钮']);
	Moghunter.src_btn_4 = String(Moghunter.parameters['资源-状态按钮']);
	Moghunter.src_btn_5 = String(Moghunter.parameters['资源-队形按钮']);
	Moghunter.src_btn_6 = String(Moghunter.parameters['资源-选项按钮']);
	Moghunter.src_btn_7 = String(Moghunter.parameters['资源-保存按钮']);
	Moghunter.src_btn_8 = String(Moghunter.parameters['资源-游戏结束选择按钮']);
	Moghunter.src_btn_9 = String(Moghunter.parameters['资源-画廊按钮']);
	Moghunter.src_btn_10 = String(Moghunter.parameters['资源-音乐书按钮']);
	
	Moghunter.scMenu_btn_custom_list_length = 20;
	Moghunter.scMenu_btn_custom_list = {};
	for (var i = 1; i <= Moghunter.scMenu_btn_custom_list_length ; i++ ) {
		Moghunter.scMenu_btn_custom_list[i] = Moghunter.parameters['固定按钮位置 ' + String(i) ];
	};
	Moghunter.scMenu_char_btn_custom_list_length = 12;
	Moghunter.scMenu_char_btn_custom_list = {};
	for (var i = 1; i <= Moghunter.scMenu_char_btn_custom_list_length ; i++ ) {
		Moghunter.scMenu_char_btn_custom_list[i] = Moghunter.parameters['固定可选头像位置 ' + String(i) ];
	};
	
	Moghunter.menu_btn_list_length = 20;
	Moghunter.menu_btn_list = {};
	Moghunter.menu_btn_key_list = {};
	for (var i = 1; i <= Moghunter.menu_btn_list_length ; i++ ) {
		Moghunter.menu_btn_key_list[i] = Moghunter.parameters['自定义关键字-' + String(i) ];
		Moghunter.menu_btn_list[i] = Moghunter.parameters['自定义按钮-' + String(i) ];
	};
	
	Moghunter.menu_btn_face_list_length = 60;
	Moghunter.menu_btn_face_list = {};
	for (var i = 1; i <= Moghunter.menu_btn_face_list_length ; i++ ) {
		Moghunter.menu_btn_face_list[i] = Moghunter.parameters['角色头像-' + String(i) ];
	};
	
	Moghunter.menu_act_list_length = 60;
	Moghunter.menu_act_list = {};
	for (var i = 1; i <= Moghunter.menu_act_list_length ; i++ ) {
		Moghunter.menu_act_list[i] = Moghunter.parameters['角色前视图-' + String(i) ];
	};
		
//=============================================================================
// ** ImageManager
//=============================================================================
ImageManager.loadMenusMain = function(filename) {
    return this.loadBitmap('img/Menu__main/', filename, 0, true);
};
ImageManager.loadMenusMainCommands = function(filename) {
    return this.loadBitmap('img/Menu__main/', filename, 0, true);
};		
ImageManager.loadMenusActorFace = function(filename) {
    return this.loadBitmap('img/Menu__actorFaces/', filename, 0, true);
};
		
//=============================================================================
// ** Scene Menu
//=============================================================================
var _mog_scmenu_create = Scene_Menu.prototype.create;
Scene_Menu.prototype.create = function() {
	_mog_scmenu_create.call(this);
	this.loadBitmapsMain();
	this.createField();
	this.createMonogatari(); 
};

//==============================
// * loadBitmapsMain
//==============================	
Scene_Menu.prototype.loadBitmapsMain = function() {
	this._facesBitmaps = []
	for (var i = 0; i < $gameParty.members().length; i++) {
		 this._facesBitmaps[i] = ImageManager.loadMenusActorFace(Moghunter.menu_btn_face_list[$gameParty.members()[i]._actorId] );
	};
	this._comBitmaps = []
	this._comList = this._commandWindow._list;
    for (var i = 0; i < this._comList.length; i++) {
		var temp_name = "button_"+this._comList[i].symbol.toLowerCase();
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_0 );
		if(Moghunter.scMenu_btn_debug){alert("第"+String(i+1)+"个按钮："+temp_name);}
		
		if( temp_name === "button_item" && Moghunter.src_btn_1 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_1 );
		}else if( temp_name === "button_skill" && Moghunter.src_btn_2 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_2);
		}else if( temp_name === "button_equip" && Moghunter.src_btn_3 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_3 );
		}else if( temp_name === "button_status" && Moghunter.src_btn_4 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_4 );
		}else if( temp_name === "button_formation" && Moghunter.src_btn_5 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_5 );
		}else if( temp_name === "button_options" && Moghunter.src_btn_6 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_6 );
		}else if( temp_name === "button_save" && Moghunter.src_btn_7 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_7 );
		}else if( temp_name === "button_gameend" && Moghunter.src_btn_8 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_8 );
		}else if( temp_name === "button_picture_gallery" && Moghunter.src_btn_9 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_9 );
		}else if( temp_name === "button_music_book" && Moghunter.src_btn_10 != "" ){
		this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.src_btn_10 );
		}else{
			for (var j = 1; j <= Moghunter.menu_btn_list_length ; j++) {
				if( temp_name === Moghunter.menu_btn_key_list[j].toLowerCase() && Moghunter.menu_btn_list[j] != "" ){
					this._comBitmaps[i] = ImageManager.loadMenusMainCommands( Moghunter.menu_btn_list[j] );
				}
			};
		}
    };
	this._arrowImg = ImageManager.loadMenusMainCommands(Moghunter.src_main_FaceArrow);
	this._goldImg = ImageManager.loadMenusMain(Moghunter.src_main_GoldNumber);
};

//==============================
// * Create Field
//==============================	
Scene_Menu.prototype.createField = function() {
     this._field = new Sprite();
	 this.addChild(this._field);
};

//==============================
// * Create Monogatari
//==============================	
Scene_Menu.prototype.createMonogatari = function() {
	 if (String(Moghunter.scMenu_MagicCircleV) === "true") {this.createMagicCircle()};
	 this.createCharacters();
	 this.createLayout();
     this.createCharStatus();
	 this.createCommands();
	 this.createCommandName();
	 this.createPlayTime();
	 this.createLocation();
};
//==============================
// * Create After
//==============================	
Scene_Menu.prototype.createAfter = function() {
	 this.createSelection();
	 this.createFaceArrow();
	 this.createGold();
};

//==============================
// * create Gold Number
//==============================
Scene_Menu.prototype.createGold = function() {
    this._gold_number = [];
	this._GoldData = [this._goldImg.width / 10,this._goldImg.height]
	var x = Moghunter.scMenu_GoldNumberX;
	var y = Moghunter.scMenu_GoldNumberY;
	for (var i = 0; i < 16; i++) {
		 this._gold_number[i] = new Sprite(this._goldImg);
		 this._gold_number[i].visible = false;
		 this._gold_number[i].opacity = 255;
		 this._gold_number[i].x = x ;
		 this._gold_number[i].y = y ;
		 this._field.addChild(this._gold_number[i]);		 
	};	
	this.refresh_number(this._gold_number,$gameParty.gold(),this._GoldData,x)
};

//==============================
// * create Magic Circle
//==============================
Scene_Menu.prototype.createMagicCircle = function() {
     this._magicCircle = new Sprite(ImageManager.loadMenusMain(Moghunter.src_main_MagicCircle));
	 this._magicCircle.anchor.x = 0.5;
	 this._magicCircle.anchor.y = 0.5;
	 this._magicCircle.x = Moghunter.scMenu_MagicCircleX;
	 this._magicCircle.y = Moghunter.scMenu_MagicCircleY;
	 this._field.addChild(this._magicCircle);
};

//==============================
// * create Magic Circle
//==============================
Scene_Menu.prototype.updateMagicCircle = function() {
     this._magicCircle.rotation +=Moghunter.scMenu_MagicCircleR;
};

//==============================
// * play Time Sec
//==============================
Scene_Menu.prototype.playTimeSec = function() {
    return $gameSystem.playtime()  % 60;
};

//==============================
// * create Play Time
//==============================
Scene_Menu.prototype.createPlayTime = function() {
    this._playTime = new Sprite(new Bitmap(200,32));
	this._playTime.x = Moghunter.scMenu_playTimeNumberX;
	this._playTime.y = Moghunter.scMenu_playTimeNumberY;
	this._playTime.bitmap.fontSize = Moghunter.scMenu_playTimeNumberFontSize;
	this._field.addChild(this._playTime);
	this._playTimeSec = this.playTimeSec();
	this.refreshTime();
};

//==============================
// * refresh Time
//==============================
Scene_Menu.prototype.refreshTime = function() {
	this._playTime.bitmap.clear();
	this._playTimeSec = this.playTimeSec();
	this._playTime.bitmap.drawText($gameSystem.playtimeText(),0,0,200,32,"right");
};

//==============================
// * update Time
//==============================
Scene_Menu.prototype.updateTime = function() {
	if (this._playTimeSec != this.playTimeSec()) {this.refreshTime()};
};
   
//==============================
// * create Location
//==============================
Scene_Menu.prototype.createLocation = function() {
    this._location = new Sprite(new Bitmap(260,32));
	this._location.x = Moghunter.scMenu_locationX;
	this._location.y = Moghunter.scMenu_locationY;
	this._location.bitmap.fontSize = Moghunter.scMenu_locationFontSize;
	var mapName = $gameMap.displayName();
	this._location.bitmap.drawText(mapName,0,0,260,32,"center");
	this._field.addChild(this._location);
};   
   
//==============================
// * Refresh Number
//==============================
Scene_Menu.prototype.refresh_number = function(sprites,value,img_data,x) {
    numbers = Math.abs(value).toString().split("");  
   	for (var i = 0; i < sprites.length ; i++) {
	   sprites[i].visible = false;
	   if (i < numbers.length) {
		   var n = Number(numbers[i]);
		   sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
		   var nx = -(img_data[0] * i) + (img_data[0] *  numbers.length);
		   sprites[i].x = x - nx;
		   sprites[i].visible = true;
	   } else {
		  var n = 0;
		  sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
		  var nx = -(img_data[0] * i) + (img_data[0] *  (sprites.length + numbers.length));
		  sprites[i].x = x - nx;
	   };
    };
};
//==============================
// * maxMembers
//==============================	
Scene_Menu.prototype.maxMembers = function() {
     return Math.min(Math.max($gameParty.members().length,0),$gameParty.maxBattleMembers());
};

//==============================
// * Create Characters
//==============================	
Scene_Menu.prototype.createCharacters = function() {
	 this._characters = [];
	 for (var i = 0; i < this.maxMembers(); i++) {	   
           this._characters[i] = new MBustMenu(i,$gameParty.members()[i],this.maxMembers());
		   this._field.addChild(this._characters[i]);
	 };
};

//==============================
// * Create Char Status
//==============================	
Scene_Menu.prototype.createCharStatus = function() {
	 this._charStatus = [];
	 for (var i = 0; i < this.maxMembers(); i++) {	   
           this._charStatus[i] = new MCharStatus(i,$gameParty.members()[i],this.maxMembers());
		   this._field.addChild(this._charStatus[i]);
	 };
};

//==============================
// * Update
//==============================	
var _mog_smenu_update = Scene_Menu.prototype.createGoldWindow;
Scene_Menu.prototype.createGoldWindow = function() {
	_mog_smenu_update.call(this);
    if (this._goldWindow) {this._goldWindow.visible = false};
};	
	
	
//==============================
// * create Layout
//==============================
Scene_Menu.prototype.createLayout = function() {
     this._layout = new Sprite(ImageManager.loadMenusMain(Moghunter.src_main_Layout));
	 this._field.addChild(this._layout);
};
	
//==============================
// * create Commands
//==============================	
Scene_Menu.prototype.createCommands = function() {
     this._commands = [];
	 this._compos = [];
	 this._comzoom = [];
	 this._comflash = [];
	 this._comfloat_lr = [];
	 this._comfloat_ud = [];
	 var h = 0
	 this._comField = new Sprite();
	 this._field.addChild(this._comField);
	 for (var i = 0; i < this._comList.length; i++) {
		 this._commands[i] = new Sprite(this._comBitmaps[i]);
		 this._commands[i].anchor.x = 0.5;
		 this._commands[i].anchor.y = 0.5;
		 this._commands[i].x = Moghunter.scMenu_Com_startX;
		 this._commands[i].y = Moghunter.scMenu_Com_startY;
		 this._commands[i].opacity = 255;
		 if( Moghunter.scMenu_Com_model === "true" ){
			this._compos[i] = [Moghunter.scMenu_ComX + (Moghunter.scMenu_Com_space * i),Moghunter.scMenu_ComY + (Moghunter.scMenu_Com_w_space * h)];
		 }else{
			this._compos[i] = [Moghunter.scMenu_ComX + (Moghunter.scMenu_Com_w_space * h),Moghunter.scMenu_ComY + (Moghunter.scMenu_Com_space * i)];
		 }
		 for(var j = 1;j <= Moghunter.scMenu_btn_custom_list_length; j++){
			if( i == j-1 && Moghunter.scMenu_btn_custom_list[j] != ""){
				var temp = Moghunter.scMenu_btn_custom_list[j].split(',');
				this._compos[i] = [ Number(temp[0]),Number(temp[1]) ];
			} 
		 }
		 this._comzoom[i] = 0;
	     this._comField.addChild(this._commands[i]);
		 h = h === 0 ? 1 : 0;
	};	 
};

//==============================
// * update Commands
//==============================
Scene_Menu.prototype.updateCommands = function() {
	// this.updateComField();
     for (var i = 0; i < this._commands.length; i++) {
		  if (this.isComEnabled(i)) {	//按钮激活状态
		       var nx = this._statusWindow.active ? Moghunter.scMenu_ComWX : this._compos[i][0];
			   var ny = this._statusWindow.active ? Moghunter.scMenu_ComWY : this._compos[i][1];	
				if( Moghunter.scMenu_btn_a_zoom && !this._statusWindow.active ){	//按钮缩放
					if (this._comzoom[i] === 0 ) {
					   this._commands[i].scale.x += 0.01;
					   
					   if (this._commands[i].scale.x >= 1.30) {
						   this._commands[i].scale.x = 1.30;
						   this._comzoom[i] = 1;
					   };
					} else {
					   this._commands[i].scale.x -= 0.01;
					   if (this._commands[i].scale.x <= 1.00) {
						   this._commands[i].scale.x = 1.00;
						   this._comzoom[i] = 0;
					   };			   
					};
				}
				if( this._commandWindow.isCurrentItemEnabled()){	//按钮闪烁
					if( Moghunter.scMenu_btn_a_flash && !this._statusWindow.active ){
						if (this._comflash[i] === 0 ) {
							this._commands[i].opacity += 10;
							if (this._commands[i].opacity >= 255) {
								this._commands[i].opacity = 255;
								this._comflash[i] = 1;
							};
						} else {
							this._commands[i].opacity -= 10;
							if (this._commands[i].opacity <= 30) {
								this._commands[i].opacity = 30;
								this._comflash[i] = 0;
							};				 
						};
					}else{
						this._commands[i].opacity += 20;
					}
				}else{
					this._commands[i].opacity += 20;
				}
				if( Moghunter.scMenu_btn_a_float_lr && !this._statusWindow.active ){	//按钮左右
					if (this._comfloat_lr[i] === -1 ) {
						nx = this._compos[i][0] + Moghunter.scMenu_btn_a_float_var;
						if (this._commands[i].x >= nx - 1 ) {
							this._comfloat_lr[i] = 1;
						};
					}else{
						nx = this._compos[i][0] - Moghunter.scMenu_btn_a_float_var;
						if (this._commands[i].x <= nx + 1 ) {
							this._comfloat_lr[i] = -1;
						};
					}
				}
				if( Moghunter.scMenu_btn_a_float_ud && !this._statusWindow.active ){	//按钮上下
					if (this._comfloat_ud[i] === -1 ) {
						ny = this._compos[i][1] + Moghunter.scMenu_btn_a_float_var;
						if (this._commands[i].y >= ny - 1 ) {
							this._comfloat_ud[i] = 1;
						};
					}else{
						ny = this._compos[i][1] - Moghunter.scMenu_btn_a_float_var;
						if (this._commands[i].y <= ny + 1 ) {
							this._comfloat_ud[i] = -1;
						};
					}
				}
				if(Moghunter.scMenu_btn_a_float_lr || Moghunter.scMenu_btn_a_float_ud ){
				  this._commands[i].x = this.commandMoveTo(this._commands[i].x,nx,(Moghunter.scMenu_btn_a_float_var/11));
				  this._commands[i].y = this.commandMoveTo(this._commands[i].y,ny,(Moghunter.scMenu_btn_a_float_var/11));
				}else{
				  this._commands[i].x = this.commandMoveTo(this._commands[i].x,nx);
				  this._commands[i].y = this.commandMoveTo(this._commands[i].y,ny);
				}
		  } else { 	//回到按钮未激活状态
		       var nx = this._compos[i][0];
			   var ny = this._compos[i][1];
  			   if (this._commands[i].opacity > Moghunter.scMenu_btn_unselect_opacity || this._statusWindow.active) {
				   this._commands[i].opacity -= 10
				   if (this._commands[i].opacity < Moghunter.scMenu_btn_unselect_opacity && !this._statusWindow.active) {this._commands[i].opacity = Moghunter.scMenu_btn_unselect_opacity}  
			    };
			   if (!this._statusWindow.active && this._commands[i].opacity < Moghunter.scMenu_btn_unselect_opacity) {
				   this._commands[i].opacity += 10;
				   if (this._commands[i].opacity > Moghunter.scMenu_btn_unselect_opacity) {this._commands[i].opacity = Moghunter.scMenu_btn_unselect_opacity}  
			   };
			   if (this._commands[i].scale.x > 1.00) {this._commands[i].scale.x -= 0.01};
			   this._comzoom[i] = 0;
			   this._comflash[i] = 0;
			   this._comfloat_lr[i] = 0;
			   this._comfloat_ud[i] = 0;
			  this._commands[i].x = this.commandMoveTo(this._commands[i].x,nx);
			  this._commands[i].y = this.commandMoveTo(this._commands[i].y,ny);
		  }; 		  
		  this._commands[i].scale.y = this._commands[i].scale.x;
	 };
};
 
 //==============================
// * update Com Field
//==============================
Scene_Menu.prototype.updateComField = function() {
   if (!this._statusWindow.active) {
        this._comField.opacity += 15
	    if (this._comField.y < 0) {
		    this._comField.y += 3;
			if (this._comField.y > 0 ) {this._comField.y = 0}  
	    }
   } else {
	   this._comField.opacity -= 15
	   if (this._comField.y > -50) {
		    this._comField.y -= 3;
			if (this._comField.y < -50 ) {this._comField.y = -50}  
	   };
   };
};
	  
//==============================
// * is Com Enabled
//==============================
Scene_Menu.prototype.isComEnabled = function(index) {
	  if (index != this._commandWindow._index) {return false};
	  return true;
};
	
//==============================
// * Command Move To
//==============================
Scene_Menu.prototype.commandMoveTo = function(value,real_value) {
	if (value == real_value) {return value};
	var dnspeed = 3 + (Math.abs(value - real_value) / 20);
	var slowspeed = arguments[2] ? arguments[2] : 0; //捕获第三个参数，没有就用默认值 
	if(slowspeed != 0){
		if( Math.abs(value-real_value) < Moghunter.scMenu_btn_a_float_var*2 ){
			dnspeed = slowspeed;
		}
	}
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return value;
};	

//==============================
// * create Command Name
//==============================
Scene_Menu.prototype.createCommandName = function() {
	this._commandName = new Sprite(new Bitmap(100,32));
	this._commandName.bitmap.fontSize = Moghunter.scMenu_ComNameFontSize;
	this._commandNameIndex = -2;
	this._commandNameIndex2 = -2;
	this._field.addChild(this._commandName);
	this._commandName.visible = String(Moghunter.scMenu_ComNameVisible) === "true" ? true : false;
};

//==============================
// * update Command Name
//==============================
Scene_Menu.prototype.updateCommandName = function() {
	if (this._statusWindow.active) {
		if (this._commandNameIndex2 != this._statusWindow._index) {this.refreshActorName()};
	} else {
        if (this._commandNameIndex != this._commandWindow._index) {this.refreshCommandName()};
	};
	this._commandName.x = this.commandMoveTo(this._commandName.x,Moghunter.scMenu_ComNameX);
	this._commandName.y = this.commandMoveTo(this._commandName.y,Moghunter.scMenu_ComNameY);	
	this._commandName.opacity += 10;
};
	
//==============================
// * refresh Command Name
//==============================
Scene_Menu.prototype.refreshCommandName = function() {
	this._commandNameIndex = this._commandWindow._index;
	this._commandNameIndex2 = -2;
	this._commandName.bitmap.clear();
	this._commandName.bitmap.drawText(this._comList[this._commandNameIndex].name,0,0,100,32,"center")
	this._commandName.x = Moghunter.scMenu_ComNameX + Moghunter.scMenu_ComName_slideX;
	this._commandName.y = Moghunter.scMenu_ComNameY + Moghunter.scMenu_ComName_slideY;
	this._commandName.opacity = 0;
};

//==============================
// * refresh Actor Name
//==============================
Scene_Menu.prototype.refreshActorName = function() {
	this._commandNameIndex = -2;
	this._commandNameIndex2 = this._statusWindow._index;
	this._commandName.bitmap.clear();
	var actor = $gameParty.members()[this._statusWindow._index]
	if (!actor) {return}
	this._commandName.bitmap.drawText(actor.name(),0,0,100,32,"center")
	this._commandName.x = Moghunter.scMenu_ComNameX + Moghunter.scMenu_ComName_slideX;
	this._commandName.y = Moghunter.scMenu_ComNameY + Moghunter.scMenu_ComName_slideY;
	this._commandName.opacity = 0;
};

//==============================
// * create Selection
//==============================
Scene_Menu.prototype.createSelection = function() {
    this._selection = [];
	this._selectionPos = [];
	this._selzoom = [];
	this._selflash = [];
	this._selfloat_lr = [];
	this._selfloat_ud = [];
	this._selMax = Math.min(Math.max(Moghunter.scMenu_maxVisibleFaces,2),999);
	this._selField = new Sprite();
	this._field.addChild(this._selField);	
	this._selField.opacity = 0;
	this._selField.x = 50;
	for (var i = 0; i < $gameParty.members().length; i++) {
		 this._selection[i] = new Sprite(this._facesBitmaps[i]);
		 if( Moghunter.scMenu_FaceSel_model === "true" ){
			this._selectionPos[i] = [
			Moghunter.scMenu_FaceSelX + ((Moghunter.scMenu_FaceSel_space) * i),
			Moghunter.scMenu_FaceSelY + ((Moghunter.scMenu_FaceSel_w_space) * (i%2))
			];
		 }else{
			this._selectionPos[i] = [
			Moghunter.scMenu_FaceSelX + ((Moghunter.scMenu_FaceSel_w_space) * (i%2)),
			Moghunter.scMenu_FaceSelY+ ((Moghunter.scMenu_FaceSel_space) * i)
			];
		 }
		 for(var j = 1;j <= Moghunter.scMenu_char_btn_custom_list_length; j++){
			if( i == j-1 && Moghunter.scMenu_char_btn_custom_list[j] != ""){
				var temp = Moghunter.scMenu_char_btn_custom_list[j].split(',');
				this._selectionPos[i] = [ Number(temp[0]),Number(temp[1]) ];
			} 
		 }
		 this._selection[i].anchor.x = 0.5;
		 this._selection[i].anchor.y = 0.5;
		 this._selection[i].opacity = 160;
		 this._selection[i].vsb = false;
		 this._selection[i].x = this._selectionPos[i][0];
		 this._selection[i].y = this._selectionPos[i][1];
		 this._selField.addChild(this._selection[i]);	//可选头像起点是画在一个隐形面板上，然后隐形面板移动到目标位置（单个头像无法控制移动）
	};
};	
	
//==============================
// * update Selection
//==============================
Scene_Menu.prototype.updateSelection = function() {
	if (this._statusWindow.active) {
		this._selField.opacity += 15;
		if (this._selField.x > 0) {this._selField.x -= 4
		    if (this._selField.x < 0) {this._selField.x = 0};
		};
	} else {
		if (this._selField.x < 50) {this._selField.x += 4
		    if (this._selField.x > 50) {this._selField.x = 50};	//可选头像组整体移动
		};		
		this._selField.opacity -= 15;
	}
	for (var i = 0; i < this._selection.length; i++) {
		 if (this._statusWindow._index < this._selMax) {
		     var nindex = 0
			 if (i > this._selMax) {
				 this._selection[i].vsb = false;
			 } else {
				 this._selection[i].vsb = true;
			 };
		 } else {
			 var ni = this._statusWindow._index - this._selMax
			 var nindex = ((4 + this._facesBitmaps[i].width) * (ni));
			 if (i < ni || i > ni + this._selMax) {
				 this._selection[i].vsb = false;
			 } else {this._selection[i].vsb = true;
			 }
		 };
		 if (i === this._statusWindow._index) {//头像激活状态
			if( Moghunter.scMenu_btn_a_zoom ){//头像缩放
				 if (this._selzoom[i] === 0 ) {
					 this._selection[i].scale.x += 0.015;
					 if (this._selection[i].scale.x > 1.30) {
						 this._selection[i].scale.x = 1.30;
						 this._selzoom[i] = 1;
					 };
				 } else {
					 this._selection[i].scale.x -= 0.015;
					 if (this._selection[i].scale.x < 1.00) {
						 this._selection[i].scale.x = 1.00;
						 this._selzoom[i] = 0;
					 };				 
				 };
			} 
			if( Moghunter.scMenu_btn_a_flash ){//头像闪烁
				if (this._selflash[i] === 0 ) {
					this._selection[i].opacity += 10;
					if (this._selection[i].opacity >= 255) {
						this._selection[i].opacity = 255;
						this._selflash[i] = 1;
					};
				} else {
					this._selection[i].opacity -= 10;
					if (this._selection[i].opacity <= 30) {
						this._selection[i].opacity = 30;
						this._selflash[i] = 0;
					};				 
				};
			}else{
				this._selection[i].opacity += 15;
			}
			if( Moghunter.scMenu_btn_a_float_lr ){//头像左右
				if (this._selfloat_lr[i] === -1 ) {
					this._selection[i].x += (Moghunter.scMenu_btn_a_float_var/10);
					if (this._selection[i].x >= this._selectionPos[i][0]+Moghunter.scMenu_btn_a_float_var) {
						this._selfloat_lr[i] = 1;
					};
				} else {
					this._selection[i].x -= (Moghunter.scMenu_btn_a_float_var/10);
					if (this._selection[i].x <= this._selectionPos[i][0]-Moghunter.scMenu_btn_a_float_var) {
						this._selfloat_lr[i] = -1;
					};				 
				};
			}
			if( Moghunter.scMenu_btn_a_float_ud ){//头像上下
				if (this._selfloat_ud[i] === -1 ) {
					this._selection[i].y += (Moghunter.scMenu_btn_a_float_var/10);
					if (this._selection[i].y >= this._selectionPos[i][1]+Moghunter.scMenu_btn_a_float_var) {
						this._selfloat_ud[i] = 1;
					};
				} else {
					this._selection[i].y -= (Moghunter.scMenu_btn_a_float_var/10);
					if (this._selection[i].y <= this._selectionPos[i][1]-Moghunter.scMenu_btn_a_float_var) {
						this._selfloat_ud[i] = -1;
					};				 
				};
			}
		 } else {	//回到头像未激活状态
			if (!this._selection[i].vsb) { 
			   this._selection[i].opacity -= 15;
			} else {
				if (this._selection[i].opacity < Moghunter.scMenu_btn_unselect_opacity) {
					this._selection[i].opacity += 15;
					if (this._selection[i].opacity > Moghunter.scMenu_btn_unselect_opacity) {this._selection[i].opacity = Moghunter.scMenu_btn_unselect_opacity};
				};
				if (this._selection[i].opacity > Moghunter.scMenu_btn_unselect_opacity) {
					this._selection[i].opacity -= 15;
					if (this._selection[i].opacity < Moghunter.scMenu_btn_unselect_opacity) {this._selection[i].opacity = Moghunter.scMenu_btn_unselect_opacity};
				};	
		    }/* else {
				if (this._selection[i].opacity > 160) {this._selection[i].opacity -= 10
				if (this._selection[i].opacity < 160) {this._selection[i].opacity = 160};
				};
		    };*/
			this._selzoom[i] = 0;
			this._selflash[i] = 0;
			this._selfloat_lr[i] = 0;
			this._selfloat_ud[i] = 0;
			this._selection[i].scale.x -= 0.01;
			if (this._selection[i].scale.x < 1.00) {this._selection[i].scale.x = 1.00}			         
			if (this._selection[i].x < this._selectionPos[i][0]){ this._selection[i].x += 0.3;}
			if (this._selection[i].x > this._selectionPos[i][0]){ this._selection[i].x -= 0.3;}
			if (this._selection[i].y < this._selectionPos[i][1]){ this._selection[i].y += 0.3;}
			if (this._selection[i].y > this._selectionPos[i][1]){ this._selection[i].y -= 0.3;}
		 }
         //var nx = this._selectionPos[i][0] - nindex;
         //var ny = this._selectionPos[i][1];
		 //this._selection[i].x = this.commandMoveTo(this._selection[i].x,nx);
		 //this._selection[i].y = this.commandMoveTo(this._selection[i].y,ny); 		
		 this._selection[i].scale.y = this._selection[i].scale.x;
	};
	this.updateArrow();
};	
	
//==============================
// * create Face Arrow
//==============================
Scene_Menu.prototype.createFaceArrow = function() {
	  this._arrow = [];
	  this._arrowPos = [];
	  this._arrowAni = [0,0];
	  for (var i = 0; i < 2; i++) {
		   this._arrow[i] = new Sprite(this._arrowImg);
		   if (i === 1) {this._arrow[i].scale.x = -1.00
		       this._arrowPos[i] = [this._selection[0].x + (4 + (this._arrowImg.width * 2)) + ((4 + this._facesBitmaps[0].width) * this._selMax),Moghunter.scMenu_FaceSelY]
		   } else {
			   this._arrowPos[i] = [this._selection[0].x - (4 + (this._arrowImg.width * 2)),Moghunter.scMenu_FaceSelY] 
		   };
		   this._arrow[i].anchor.x = 0.5;
		   this._arrow[i].anchor.y = 0.5;
		   this._arrow[i].x = this._arrowPos[i][0];
		   this._arrow[i].y = this._arrowPos[i][1];
		   this._selField.addChild(this._arrow[i]);
	  };
};

//==============================
// * update Arrow
//==============================
Scene_Menu.prototype.updateArrow = function() {
	this.updateArrowAni()
    for (var i = 0; i < this._arrow.length; i++) {
		 if (i === 0) {
		    var nx = this._arrowPos[i][0] - this._arrowAni[1];
			this._arrow[i].visible = this.isArrow1Visible();
		 } else {
			var nx = this._arrowPos[i][0] + this._arrowAni[1]; 
			this._arrow[i].visible = this.isArrow2Visible();
		 };
		 var ny = this._arrowPos[i][1]; 
		 this._arrow[i].x = this.commandMoveTo(this._arrow[i].x,nx);
		 this._arrow[i].y = this.commandMoveTo(this._arrow[i].y,ny);		
	};
};

//==============================
// * is Arrow1 Visible
//==============================
Scene_Menu.prototype.isArrow1Visible = function() {
	if (this._statusWindow._index <= this._selMax) {return false};
	return true;
};

//==============================
// * is Arrow2 Visible
//==============================
Scene_Menu.prototype.isArrow2Visible = function() {
	if (this._statusWindow._index >= this._selection.length - 1) {return false};
	if ($gameParty.members().length < this._selMax + 2 ) {return false};
	return true;
};

//==============================
// * update Arrow Ani
//==============================
Scene_Menu.prototype.updateArrowAni = function() {
	this._arrowAni[0]++;
	if (this._arrowAni[0] < 20) {
		this._arrowAni[1] ++;
	} else if (this._arrowAni[0] < 40) {
	    this._arrowAni[1] --;
	} else {
		this._arrowAni[1] = 0;
		this._arrowAni[0] = 0;
	};
};

//==============================
// * check Touch On Sprites
//==============================
Scene_Menu.prototype.checkTouchOnSprites = function() {
     if (this._statusWindow.active) {
		 this.checkTouchSelection();
	 } else {
		 this.checkTouchCommand();
	 };
};

//==============================
// * checkTouchSelection
//==============================
Scene_Menu.prototype.checkTouchSelection = function() {
     for (var i = 0; i < this._selection.length; i++) {
		  if (this.isOnSprite(this._selection[i])) {this.setTouchSelection(i)};
	 };
     for (var i = 0; i < this._arrow.length; i++) {
		  if (this.isOnSprite(this._arrow[i])) {this.setTouchArrow(i)};
	 };
};

//==============================
// * set Touch Arrow
//==============================
Scene_Menu.prototype.setTouchArrow = function(index) {
	 SoundManager.playCursor();
     if (index === 0) {
		  this._statusWindow.cursorUp();
	 } else {
		  this._statusWindow.cursorDown();
	 };
};

//==============================
// * set Touch Selection
//==============================
Scene_Menu.prototype.setTouchSelection = function(index) {
	if(index != this._statusWindow._index ){
		this._statusWindow.select(index);
        SoundManager.playCursor();
	}else{
		this._statusWindow.processOk();
	}
};

//==============================
// * checkTouchCommand
//==============================
Scene_Menu.prototype.checkTouchCommand = function() {
    for (var i = 0; i < this._commands.length; i++) {
		if (this.isOnSprite(this._commands[i])) {this.setTouchCommand(i)};
	};
};

//==============================
// * set Touch Command
//==============================
Scene_Menu.prototype.setTouchCommand = function(index) {
	if(index != this._commandWindow._index ){
		this._commandWindow.select(index);
        SoundManager.playCursor();
	}else{
		this._commandWindow.processOk();
	}
};

//==============================
// * on Sprite
//==============================
Scene_Menu.prototype.isOnSprite = function(sprite) {
	 var cw = sprite.bitmap.width / 2;
	 var ch = sprite.bitmap.height / 2;
	 if (sprite.visible === false) {return false};
	 if (sprite.opacity === 0) {return false};
	 if (TouchInput.x < sprite.x - cw) {return false};
	 if (TouchInput.x > sprite.x + cw) {return false};
	 if (TouchInput.y < sprite.y - ch) {return false};
	 if (TouchInput.y > sprite.y + ch) {return false};
	 return true;	
};

//==============================
// * update Touch Screen
//==============================
Scene_Menu.prototype.updateTouchScreen = function() {
    if (TouchInput.isTriggered()) {this.checkTouchOnSprites()};
};

//==============================
// * update Window Status
//==============================
Scene_Menu.prototype.updateWindowStatus = function() {
     this._statusWindow.visible = false;
	 this._statusWindow.x = - this._statusWindow.width;
	 this._statusWindow.updateScrollRoll();
};
	
//==============================
// * update
//==============================
var _mog_mono_scmenu_update = Scene_Menu.prototype.update;
Scene_Menu.prototype.update = function() {
    _mog_mono_scmenu_update.call(this)
	if (this._commands) {this.updateCommands()};
	if (this._commandName) {this.updateCommandName()};
	if (!this._selection && this._facesBitmaps && this._facesBitmaps[0].isReady()) {this.createAfter()};
	if (this._selection) {this.updateSelection()};
	if (this._playTime) {this.updateTime()};
	if (this._magicCircle) {this.updateMagicCircle()};
	this.updateWindowStatus();
	this.updateTouchScreen();
};
	
//=============================================================================
// * MBustMenu
//=============================================================================
function MBustMenu() {
    this.initialize.apply(this, arguments);
};

MBustMenu.prototype = Object.create(Sprite.prototype);
MBustMenu.prototype.constructor = MBustMenu;

//==============================
// * Initialize
//==============================
MBustMenu.prototype.initialize = function(index,actor,maxmembers) {
    Sprite.prototype.initialize.call(this);	
    this._index = index;
	this._actor = actor;
	this._maxMembers = maxmembers
	this.createCharaters();
};
	
//==============================
// * Pos X
//==============================
MBustMenu.prototype.posX = function() {
	var space = Math.floor((Graphics.boxWidth - 32) / this._maxMembers);
    return -80 + (space / 2) + (space * this._index);
};
MBustMenu.prototype.posY = function() {
	var space = Math.floor((Graphics.boxHeight - 32) / this._maxMembers);
    return -80 + (space / 2) + (space * this._index);
};

//==============================
// * create Characters
//==============================
MBustMenu.prototype.createCharaters = function() {
     this._char = new Sprite(ImageManager.loadMenusActorFace(Moghunter.menu_act_list[this._actor._actorId]));
	 //this._char.anchor.x = 0.5;
	 //this._char.anchor.y = 1.0;
	 Moghunter.scMenu_pos_fix_char_h = Moghunter.scMenu_pos_fix_char_h === 0 ? 1 : 0;
	 if( Moghunter.scMenu_pos_lay_model === "true" ){
		 if( Moghunter.scMenu_pos_fix === "true" ){
			this._char.x = Moghunter.scMenu_pos_X + this._index * Moghunter.scMenu_pos_fix_space ;
		 }else{
			this._char.x = this.posX() ;	//水平排布+自适应 x
		 }
		 if( Moghunter.scMenu_pos_fix === "true" ){
			this._char.y = Moghunter.scMenu_pos_Y ;
			this._char.y += Moghunter.scMenu_pos_fix_char_h * Moghunter.scMenu_pos_fix_w_space ;
		 }else{
			this._char.y = Graphics.boxHeight/2 -100 ; //水平排布+自适应 y
		 }
	 }else{
		 if( Moghunter.scMenu_pos_fix === "true" ){
			this._char.x = Moghunter.scMenu_pos_X ;
			this._char.x += Moghunter.scMenu_pos_fix_char_h * Moghunter.scMenu_pos_fix_w_space ;
		 }else{
			this._char.x = Graphics.boxWidth/2 - 100 ;//垂直排布+自适应 x
		 }
		 if( Moghunter.scMenu_pos_fix === "true" ){
			this._char.y = Moghunter.scMenu_pos_Y + this._index * Moghunter.scMenu_pos_fix_space;
		 }else{
			this._char.y = this.posY(); //垂直排布+自适应 y
		 }
	 }
	 //固定位置
	 if(this._index==0 && Moghunter.scMenu_actor_custom_1 != ""){
		var temp = Moghunter.scMenu_actor_custom_1.split(',');
		this._char.x = Number(temp[0]);
		this._char.y = Number(temp[1]);
	 }
	 if(this._index==1 && Moghunter.scMenu_actor_custom_2 != ""){
		var temp = Moghunter.scMenu_actor_custom_2.split(',');
		this._char.x = Number(temp[0]);
		this._char.y = Number(temp[1]);
	 }
	 if(this._index==2 && Moghunter.scMenu_actor_custom_3 != ""){
		var temp = Moghunter.scMenu_actor_custom_3.split(',');
		this._char.x = Number(temp[0]);
		this._char.y = Number(temp[1]);
	 }
	 if(this._index==3 && Moghunter.scMenu_actor_custom_4 != ""){
		var temp = Moghunter.scMenu_actor_custom_4.split(',');
		this._char.x = Number(temp[0]);
		this._char.y = Number(temp[1]);
	 }
	 if(this._index==4 && Moghunter.scMenu_actor_custom_5 != ""){
		var temp = Moghunter.scMenu_actor_custom_5.split(',');
		this._char.x = Number(temp[0]);
		this._char.y = Number(temp[1]);
	 }
	 if(this._index==5 && Moghunter.scMenu_actor_custom_6 != ""){
		var temp = Moghunter.scMenu_actor_custom_6.split(',');
		this._char.x = Number(temp[0]);
		this._char.y = Number(temp[1]);
	 }
	 if(this._index==6 && Moghunter.scMenu_actor_custom_7 != ""){
		var temp = Moghunter.scMenu_actor_custom_7.split(',');
		this._char.x = Number(temp[0]);
		this._char.y = Number(temp[1]);
	 }
	 if(this._index==7 && Moghunter.scMenu_actor_custom_8 != ""){
		var temp = Moghunter.scMenu_actor_custom_8.split(',');
		this._char.x = Number(temp[0]);
		this._char.y = Number(temp[1]);
	 }
	 this._char.x += Moghunter.scMenu_CharX;
	 this._char.y += Moghunter.scMenu_CharY;
	 this._orgX  = this._char.x;
	 this._char.x -= 50;
	 this._wait = 5 + 10 * this._index;
	 this._char.opacity = 0;
	 this.addChild(this._char);
};	

//==============================
// * Update
//==============================
MBustMenu.prototype.update = function() {
    Sprite.prototype.update.call(this);	
    if (this._wait > 0) {this._wait--; return};
	this._char.opacity += 10;
	if (this._char.x < this._orgX) {
		this._char.x += 2;
		if (this._char.x > this._orgX) {this._char.x = this._orgX};
	};
};
	
//=============================================================================
// * MCharStatus
//=============================================================================
function MCharStatus() {
    this.initialize.apply(this, arguments);
};

MCharStatus.prototype = Object.create(Sprite.prototype);
MCharStatus.prototype.constructor = MCharStatus;

//==============================
// * Initialize
//==============================
MCharStatus.prototype.initialize = function(index,actor,maxmembers) {
    Sprite.prototype.initialize.call(this);	
    this._index = index;
	this._actor = actor;
	this._maxMembers = maxmembers;
	this.x = 50;
	this._wait = 5 + 5 * this._index;
	this.opacity = 0;
	this.loadBitmaps();
};
	
//==============================
// * loadBitmaps
//==============================
MCharStatus.prototype.loadBitmaps = function() {
   this._layoutImg = ImageManager.loadMenusMain(Moghunter.src_main_LayoutStatus);
   this._numberImg = ImageManager.loadMenusMain(Moghunter.src_main_HPNumber);
   this._numberImg2 = ImageManager.loadMenusMain(Moghunter.src_main_MPNumber);
   this._numberImg3 = ImageManager.loadMenusMain(Moghunter.src_main_LVNumber);
   this._numberImg4 = ImageManager.loadMenusMain(Moghunter.src_main_EXPNumber);
   this._numberImg5 = ImageManager.loadMenusMain(Moghunter.src_main_TPNumber);
   this._HPMeterImg = ImageManager.loadMenusMain(Moghunter.src_main_HPMeter);
   this._MPMeterImg = ImageManager.loadMenusMain(Moghunter.src_main_MPMeter);
   this._TPMeterImg = ImageManager.loadMenusMain(Moghunter.src_main_TPMeter);
   this._EXPMeterImg = ImageManager.loadMenusMain(Moghunter.src_main_EXPMeter);
   this._state_img = ImageManager.loadSystem("IconSet");
};	
		
//==============================
// * Pos X
//==============================
MCharStatus.prototype.posX = function() {
	var space = Math.floor((Graphics.boxWidth - 32) / this._maxMembers);
    return -80 + (space / 2) + (space * this._index);
};
MCharStatus.prototype.posY = function() {
	var space = Math.floor((Graphics.boxHeight - 32) / this._maxMembers);
    return -80 + (space / 2) + (space * this._index);
};

//==============================
// * create Sprites
//==============================
MCharStatus.prototype.createSprites = function() {
	this.createLayoutStatus();
	this.createHPMeter();
	this.createMPMeter();
	this.createTPMeter();
	this.createEXPMeter();
	this.createHPNumber();
    this.createHPNumber2();
	this.createMPNumber();
    this.createMPNumber2();	
	this.createTPNumber();
    this.createTPNumber2();	
	this.createEXPNumber();
	this.createEXPNumber2();
	this.createLVNumber();
	this.createStates();
	this.createName();
};	

//==============================
// * Create Name
//==============================
MCharStatus.prototype.createName = function() {
	this._name = new Sprite(new Bitmap(120,32));
	this._name.x = this._layout.x + Moghunter.scMenu_NameX;
	this._name.y = this._layout.y + Moghunter.scMenu_NameY;
	this._name.bitmap.fontSize = Moghunter.scMenu_NameFontSize;
	this._name.bitmap.drawText(this._actor.name(),0,0,120,32,"center");
	this.addChild(this._name);
	
};
	
//==============================
// * Create States
//==============================
MCharStatus.prototype.createStates = function() {
	this._states_data = [0,0,0];
	this._state_icon = new Sprite(this._state_img);
	this._state_icon.x = this._layout.x + Moghunter.scMenu_statesX;
	this._state_icon.y = this._layout.y + Moghunter.scMenu_statesY;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states();	
};
	
//==============================
// * Create States
//==============================
MCharStatus.prototype.refresh_states = function() {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._actor.allIcons().length == 0) {this._states_data[1] = 0;return};
       if (this._actor.allIcons()[this._states_data[1]]) {	
		this._states_data[0] = this._actor.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
	   };
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._actor.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Update States
//==============================
MCharStatus.prototype.update_states = function() {
	this._states_data[2] += 1;
	if (this.need_refresh_states()) {this.refresh_states();};
};	
	
//==============================
// * Need Refresh States
//==============================
MCharStatus.prototype.need_refresh_states = function() {
	if (this._states_data[2] > 60) {return true};
	return false;
};	
	
//==============================
// * create HP Meter
//==============================
MCharStatus.prototype.createHPMeter = function() {
    this._hpMeter = new Sprite(this._HPMeterImg);
	this._hpMeterData = [this._HPMeterImg.width / 3,this._HPMeterImg.height,0,0];
	this._hpMeterData[2] = this._hpMeterData[0] * 2;
	this._hpMeterData[3] = Math.randomInt(this._hpMeterData[2])
	this._hpMeter.x = this._layout.x + Moghunter.scMenu_HPMeterX;
	this._hpMeter.y = this._layout.y + Moghunter.scMenu_HPMeterY;
	this._hpMeter.rotation = Math.PI * ( Moghunter.scMenu_HPMeterAngle / 180 );
	this.updateMeter(this._hpMeter,this._hpMeterData,this._actor.hp,this._actor.mhp);
	this.addChild(this._hpMeter);
};
  
//==============================
// * create MP Meter
//==============================
MCharStatus.prototype.createMPMeter = function() {
    this._mpMeter = new Sprite(this._MPMeterImg);
	this._mpMeterData = [this._MPMeterImg.width / 3,this._MPMeterImg.height,0,0];
	this._mpMeterData[2] = this._mpMeterData[0] * 2;
	this._mpMeterData[3] = Math.randomInt(this._mpMeterData[2])
	this._mpMeter.x = this._layout.x + Moghunter.scMenu_MPMeterX;
	this._mpMeter.y = this._layout.y + Moghunter.scMenu_MPMeterY;
	this._mpMeter.rotation = Math.PI * ( Moghunter.scMenu_MPMeterAngle / 180 );
	this.updateMeter(this._mpMeter,this._mpMeterData,this._actor.mp,this._actor.mmp);
	this.addChild(this._mpMeter);
};  
  
//==============================
// * create TP Meter
//==============================
MCharStatus.prototype.createTPMeter = function() {
    this._tpMeter = new Sprite(this._TPMeterImg);
	this._tpMeterData = [this._TPMeterImg.width / 3,this._TPMeterImg.height,0,0];
	this._tpMeterData[2] = this._tpMeterData[0] * 2;
	this._tpMeterData[3] = Math.randomInt(this._tpMeterData[2])
	this._tpMeter.x = this._layout.x + Moghunter.scMenu_TPMeterX;
	this._tpMeter.y = this._layout.y + Moghunter.scMenu_TPMeterY;
	this._tpMeter.rotation = Math.PI * ( Moghunter.scMenu_TPMeterAngle / 180 );
	this.updateMeter(this._tpMeter,this._tpMeterData,this._actor.tp,this._actor.maxTp());
	this.addChild(this._tpMeter);
};  
  
//==============================
// * create EXP Meter
//==============================
MCharStatus.prototype.createEXPMeter = function() {
    this._expMeter = new Sprite(this._EXPMeterImg);
	this._expMeterData = [this._EXPMeterImg.width / 3,this._EXPMeterImg.height,0,0];
	this._expMeterData[2] = this._expMeterData[0] * 2;
	this._expMeterData[3] = Math.randomInt(this._expMeterData[2])
	this._expMeter.x = this._layout.x + Moghunter.scMenu_EXPMeterX;
	this._expMeter.y = this._layout.y + Moghunter.scMenu_EXPMeterY;
	this._expMeter.rotation = Math.PI * ( Moghunter.scMenu_EXPMeterAngle / 180 );
	this.updateMeter(this._expMeter,this._expMeterData,this._actor.current_exp_r(),this._actor.nextLevelExp_r());
	this.addChild(this._expMeter);
};  

//==============================
// * Game Actor - Current EXP R
//==============================
Game_Actor.prototype.current_exp_r = function() {
    return this.nextLevelExp() - this.nextRequiredExp() - this.expForLevel(this._level);
};

//==============================
// * Game Actor - Next Level EXP R
//==============================
Game_Actor.prototype.nextLevelExp_r = function() {
    return this.expForLevel(this._level + 1) - this.expForLevel(this._level) ;
};
  
//==============================
// * update Meter
//==============================
MCharStatus.prototype.updateMeter = function(sprite,data,v1,v2) {
	 var cw = data[0] * v1 / v2;
     sprite.setFrame(data[3],0,cw,data[1]);
	 data[3] += 4;
	 if (data[3] > data[2]) {data[3] = 0};
};		
	
//==============================
// * create HP Number
//==============================
MCharStatus.prototype.createHPNumber = function() {
    this._hp_number = [];
	this._NumberData = [this._numberImg.width / 10,this._numberImg.height]
	var x = this._layout.x + Moghunter.scMenu_HPNumberX;
	var y = this._layout.y + Moghunter.scMenu_HPNumberY;
	for (var i = 0; i < 16; i++) {
		 this._hp_number[i] = new Sprite(this._numberImg);
		 this._hp_number[i].visible = false;
		 this._hp_number[i].opacity = 255;
		 this._hp_number[i].x = x ;
		 this._hp_number[i].y = y ;
		 this.addChild(this._hp_number[i]);		 
	};	
	this.refresh_number(this._hp_number,this._actor.hp,this._NumberData,x)
};	
	
//==============================
// * create HP Number2
//==============================
MCharStatus.prototype.createHPNumber2 = function() {
    this._hp_number2 = [];
	var x = this._layout.x + Moghunter.scMenu_HPNumber2X;
	var y = this._layout.y + Moghunter.scMenu_HPNumber2Y;
	for (var i = 0; i < 16; i++) {
		 this._hp_number2[i] = new Sprite(this._numberImg);
		 this._hp_number2[i].visible = false;
		 this._hp_number2[i].opacity = 255;
		 this._hp_number2[i].x = x ;
		 this._hp_number2[i].y = y ;
		 this.addChild(this._hp_number2[i]);		 
	};	
	this.refresh_number(this._hp_number2,this._actor.mhp,this._NumberData,x)
};	
	
//==============================
// * create MP Number
//==============================
MCharStatus.prototype.createMPNumber = function() {
    this._mp_number = [];
	this._NumberData2 = [this._numberImg2.width / 10,this._numberImg2.height]
	var x = this._layout.x + Moghunter.scMenu_MPNumberX;
	var y = this._layout.y + Moghunter.scMenu_MPNumberY;
	for (var i = 0; i < 16; i++) {
		 this._mp_number[i] = new Sprite(this._numberImg2);
		 this._mp_number[i].visible = false;
		 this._mp_number[i].opacity = 255;
		 this._mp_number[i].x = x ;
		 this._mp_number[i].y = y ;
		 this.addChild(this._mp_number[i]);		 
	};	
	this.refresh_number(this._mp_number,this._actor.mp,this._NumberData2,x)
};	
	
//==============================
// * create MP Number2
//==============================
MCharStatus.prototype.createMPNumber2 = function() {
    this._mp_number2 = [];
	var x = this._layout.x + Moghunter.scMenu_MPNumber2X;
	var y = this._layout.y + Moghunter.scMenu_MPNumber2Y;
	for (var i = 0; i < 16; i++) {
		 this._mp_number2[i] = new Sprite(this._numberImg2);
		 this._mp_number2[i].visible = false;
		 this._mp_number2[i].opacity = 255;
		 this._mp_number2[i].x = x ;
		 this._mp_number2[i].y = y ;
		 this.addChild(this._mp_number2[i]);		 
	};	
	this.refresh_number(this._mp_number2,this._actor.mmp,this._NumberData2,x)
};
	
//==============================
// * create TP Number
//==============================
MCharStatus.prototype.createTPNumber = function() {
    this._tp_number = [];
	this._NumberData5 = [this._numberImg5.width / 10,this._numberImg5.height]
	var x = this._layout.x + Moghunter.scMenu_TPNumberX;
	var y = this._layout.y + Moghunter.scMenu_TPNumberY;
	for (var i = 0; i < 16; i++) {
		 this._tp_number[i] = new Sprite(this._numberImg5);
		 this._tp_number[i].visible = false;
		 this._tp_number[i].opacity = 255;
		 this._tp_number[i].x = x ;
		 this._tp_number[i].y = y ;
		 this.addChild(this._tp_number[i]);		 
	};	
	this.refresh_number(this._tp_number,this._actor.tp,this._NumberData5,x)
};	
	
//==============================
// * create TP Number2
//==============================
MCharStatus.prototype.createTPNumber2 = function() {
    this._tp_number2 = [];
	var x = this._layout.x + Moghunter.scMenu_TPNumber2X;
	var y = this._layout.y + Moghunter.scMenu_TPNumber2Y;
	for (var i = 0; i < 16; i++) {
		 this._tp_number2[i] = new Sprite(this._numberImg5);
		 this._tp_number2[i].visible = false;
		 this._tp_number2[i].opacity = 255;
		 this._tp_number2[i].x = x ;
		 this._tp_number2[i].y = y ;
		 this.addChild(this._tp_number2[i]);		 
	};	
	this.refresh_number(this._tp_number2,this._actor.maxTp(),this._NumberData5,x)
};
	
//==============================
// * create EXP Number
//==============================
MCharStatus.prototype.createEXPNumber = function() {
    this._exp_number = [];
	this._NumberData4 = [this._numberImg4.width / 10,this._numberImg4.height]
	var x = this._layout.x + Moghunter.scMenu_EXPNumberX;
	var y = this._layout.y + Moghunter.scMenu_EXPNumberY;
	for (var i = 0; i < 16; i++) {
		 this._exp_number[i] = new Sprite(this._numberImg4);
		 this._exp_number[i].visible = false;
		 this._exp_number[i].opacity = 255;
		 this._exp_number[i].x = x ;
		 this._exp_number[i].y = y ;
		 this.addChild(this._exp_number[i]);		 
	};	
	this.refresh_number(this._exp_number,this._actor.current_exp_r(),this._NumberData4,x)
};	
	
//==============================
// * create EXP Number2
//==============================
MCharStatus.prototype.createEXPNumber2 = function() {
    this._exp_number2 = [];
	var x = this._layout.x + Moghunter.scMenu_EXPNumber2X;
	var y = this._layout.y + Moghunter.scMenu_EXPNumber2Y;
	for (var i = 0; i < 16; i++) {
		 this._exp_number2[i] = new Sprite(this._numberImg4);
		 this._exp_number2[i].visible = false;
		 this._exp_number2[i].opacity = 255;
		 this._exp_number2[i].x = x ;
		 this._exp_number2[i].y = y ;
		 this.addChild(this._exp_number2[i]);		 
	};	
	this.refresh_number(this._exp_number2,this._actor.nextLevelExp_r(),this._NumberData4,x)
};

//==============================
// * create LV Number
//==============================
MCharStatus.prototype.createLVNumber = function() {
    this._lv_number = [];
	this._NumberData3 = [this._numberImg3.width / 10,this._numberImg3.height]
	var x = this._layout.x + Moghunter.scMenu_LVNumberX;
	var y = this._layout.y + Moghunter.scMenu_LVNumberY;
	for (var i = 0; i < 16; i++) {
		 this._lv_number[i] = new Sprite(this._numberImg3);
		 this._lv_number[i].visible = false;
		 this._lv_number[i].opacity = 255;
		 this._lv_number[i].x = x ;
		 this._lv_number[i].y = y ;
		 this.addChild(this._lv_number[i]);		 
	};	
	this.refresh_number(this._lv_number,this._actor.level,this._NumberData3,x)
};	

//==============================
// * Refresh Number
//==============================
MCharStatus.prototype.refresh_number = function(sprites,value,img_data,x) {
	//if (value > 99999) {value = 99999};
    numbers = Math.abs(value).toString().split("");  
   	for (var i = 0; i < sprites.length ; i++) {
	   sprites[i].visible = false;
	   if (i < numbers.length) {
		   var n = Number(numbers[i]);
		   sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
		   var nx = -(img_data[0] * i) + (img_data[0] *  numbers.length);
		   sprites[i].x = x - nx;
		   sprites[i].visible = true;
	   } else {
		  var n = 0;
		  sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
		  var nx = -(img_data[0] * i) + (img_data[0] *  (sprites.length + numbers.length));
		  sprites[i].x = x - nx;
	   };
    };
};

//==============================
// * create Layout Status
//==============================
MCharStatus.prototype.createLayoutStatus = function() {
     this._layout = new Sprite(this._layoutImg);
	 Moghunter.scMenu_pos_fix_status_h = Moghunter.scMenu_pos_fix_status_h === 0 ? 1 : 0;
	 if( Moghunter.scMenu_pos_lay_model ==="true" ){
		 if( Moghunter.scMenu_pos_fix ==="true" ){
			this._layout.x = Moghunter.scMenu_pos_X + this._index * Moghunter.scMenu_pos_fix_space ;
		 }else{
			this._layout.x = this.posX() ;
		 }
		 if( Moghunter.scMenu_pos_fix ==="true" ){
			this._layout.y = Moghunter.scMenu_pos_Y ;
			this._layout.y += Moghunter.scMenu_pos_fix_status_h * Moghunter.scMenu_pos_fix_w_space ;
		 }else{
			this._layout.y = Graphics.boxHeight/2 -100  ;
		 }
	 }else{
		 if( Moghunter.scMenu_pos_fix ==="true" ){
			this._layout.x = Moghunter.scMenu_pos_X;
			this._layout.x += Moghunter.scMenu_pos_fix_status_h * Moghunter.scMenu_pos_fix_w_space ;
		 }else{
			this._layout.x = Graphics.boxWidth /2 -100  ; 
		 }
		 if( Moghunter.scMenu_pos_fix ==="true" ){
			this._layout.y = Moghunter.scMenu_pos_Y + this._index * Moghunter.scMenu_pos_fix_space ;
		 }else{
			this._layout.y = this.posY();
		 }
	 }
	 //固定位置
	 if(this._index==0 && Moghunter.scMenu_actor_custom_1 != ""){
		var temp = Moghunter.scMenu_actor_custom_1.split(',');
		this._layout.x = Number(temp[0]);
		this._layout.y = Number(temp[1]);
	 }
	 if(this._index==1 && Moghunter.scMenu_actor_custom_2 != ""){
		var temp = Moghunter.scMenu_actor_custom_2.split(',');
		this._layout.x = Number(temp[0]);
		this._layout.y = Number(temp[1]);
	 }
	 if(this._index==2 && Moghunter.scMenu_actor_custom_3 != ""){
		var temp = Moghunter.scMenu_actor_custom_3.split(',');
		this._layout.x = Number(temp[0]);
		this._layout.y = Number(temp[1]);
	 }
	 if(this._index==3 && Moghunter.scMenu_actor_custom_4 != ""){
		var temp = Moghunter.scMenu_actor_custom_4.split(',');
		this._layout.x = Number(temp[0]);
		this._layout.y = Number(temp[1]);
	 }
	this._layout.x += Moghunter.scMenu_layoutStatusX;
	this._layout.y += Moghunter.scMenu_layoutStatusY;
	this.addChild(this._layout);
};	

//==============================
// * Update
//==============================
MCharStatus.prototype.update = function() {
    Sprite.prototype.update.call(this);	
	if (!this._actor) {return}
    if (!this._hp_number) {
        if (this._numberImg.isReady()) {this.createSprites();
		} else {
		return
		};
	};
	if (this._hpMeter) {this.updateMeter(this._hpMeter,this._hpMeterData,this._actor.hp,this._actor.mhp)};
	if (this._mpMeter) {this.updateMeter(this._mpMeter,this._mpMeterData,this._actor.mp,this._actor.mmp)};
	if (this._tpMeter) {this.updateMeter(this._tpMeter,this._tpMeterData,this._actor.tp,this._actor.maxTp())};
	if (this._expMeter) {this.updateMeter(this._expMeter,this._expMeterData,this._actor.current_exp_r(),this._actor.nextLevelExp_r())};
	if (this._state_icon) {this.update_states()};
	if (this._wait > 0) {this._wait--;return}
	this.opacity += 10;
	if (this.x > 0) {this.x -= 2;
	   if (this.x < 0) {this.x = 0};
	}
};
	
//=============================================================================
// ** Window Menu Command
//=============================================================================

//==============================
// * Update
//==============================
var _mog_menu_wMenuCom_update = Window_MenuCommand.prototype.update;
Window_MenuCommand.prototype.update = function() {
	_mog_menu_wMenuCom_update.call(this);
	this.visible = false;
	this.x = -this.width;
	this.updateScrollRoll();
};

//==============================
// * process Cursor Move
//==============================
Window_MenuCommand.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (Input.isRepeated('down') || Input.isRepeated('right')) {
			if( lastIndex == this.maxRows()-1 ){	//循环选择
				this.select(0);
			}else{
				this.cursorDown();
			}
        };
        if (Input.isRepeated('up') || Input.isRepeated('left')) {
			if( lastIndex == 0 ){
				this.select(this.maxRows()-1);
			}else{
				this.cursorUp();
			}
        };
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        };
    };
};
	
//==============================
// * update SCroll Roll
//==============================
Window_MenuCommand.prototype.updateScrollRoll = function() {
    if (this.isOpenAndActive() && this.maxItems() > 0) {
		var srow = this.maxTopRow() === 0 ? 1 : this.maxCols();
        var threshold = 20;
		var idx = this._index;
        if (TouchInput.wheelY >= threshold) {
            this._index += srow;
			if (this._index > (this.maxItems() - 1)) {this._index = this.maxItems() - 1};
			this.select(this._index);
			if (idx != this._index) {SoundManager.playCursor()};
        };
        if (TouchInput.wheelY <= -threshold) {
            this._index -= srow;
			if (this._index < 0) {this._index = 0};
			this.select(this._index);
			if (idx != this._index) {SoundManager.playCursor()};
        };
    };
};	
	
//=============================================================================
// ** Window MenuStatus
//=============================================================================

//==============================
// * process Cursor Move
//==============================
Window_MenuStatus.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (Input.isRepeated('down') || Input.isRepeated('right')) {
            this.cursorDown();
        };
        if (Input.isRepeated('up') || Input.isRepeated('left')) {
            this.cursorUp();
        };
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        };
    };
};

//==============================
// * update SCroll Roll
//==============================
Window_MenuStatus.prototype.updateScrollRoll = function() {
    if (this.isOpenAndActive() && this.maxItems() > 0) {
		var srow = this.maxTopRow() === 0 ? 1 : this.maxCols();
        var threshold = 20;
		var idx = this._index;
        if (TouchInput.wheelY >= threshold) {
            this._index += srow;
			if (this._index > (this.maxItems() - 1)) {this._index = this.maxItems() - 1};
			this.select(this._index);
			if (idx != this._index) {SoundManager.playCursor()};
        };
        if (TouchInput.wheelY <= -threshold) {
            this._index -= srow;
			if (this._index < 0) {this._index = 0};
			this.select(this._index);
			if (idx != this._index) {SoundManager.playCursor()};
        };
    };
};


//=============================================================================
// ** Scene Menu
//=============================================================================

//==============================
// * Command Formation
//==============================
Scene_Menu.prototype.commandFormation = function() {
      SceneManager.push(Scene_Party);
};

//=============================================================================
// ** Scene Party
//=============================================================================

function Scene_Party() {
    this.initialize.apply(this, arguments);
}

Scene_Party.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Party.prototype.constructor = Scene_Party;

//==============================
// * Initialize
//==============================
Scene_Party.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

//==============================
// * Create
//==============================
Scene_Party.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createLayout();
	this.createStatusWindow();
};

//==============================
// * Create Layout
//==============================
Scene_Party.prototype.createLayout = function() {
 
};


//==============================
// * Create Status Window
//==============================
Scene_Party.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_MenuStatusM(0, 0);
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onFormationOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
    this.addWindow(this._statusWindow);
};

//==============================
// * on Formation OK
//==============================
Scene_Party.prototype.onFormationOk = function() {
    var index = this._statusWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
};

//==============================
// * on Formation Cancel
//==============================
Scene_Party.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
         this._statusWindow.activate();
    } else {
        SceneManager.pop()
    }
};

//==============================
// * update
//==============================
Scene_Party.prototype.update = function() {
     Scene_MenuBase.prototype.update.call(this);
	 this._statusWindow.opacity = 0;
};
//=============================================================================
// ** Window MenuStatusM
//=============================================================================

function Window_MenuStatusM() {
    this.initialize.apply(this, arguments);
}

Window_MenuStatusM.prototype = Object.create(Window_Selectable.prototype);
Window_MenuStatusM.prototype.constructor = Window_MenuStatusM;

//==============================
// * Initialize
//==============================
Window_MenuStatusM.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._formationMode = false;
    this._pendingIndex = -1;
    this.loadImages();
    this.refresh();
	this.select(0);
};

//==============================
// * windowWidth
//==============================
Window_MenuStatusM.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

//==============================
// * Window Height
//==============================
Window_MenuStatusM.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};

//==============================
// * maxItems
//==============================
Window_MenuStatusM.prototype.maxItems = function() {
    return $gameParty.size();
};

//==============================
// * item Height
//==============================
Window_MenuStatusM.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

//==============================
// * num Visible Rows
//==============================
Window_MenuStatusM.prototype.numVisibleRows = function() {
    return 4;
};

//==============================
// * loadImages
//==============================
Window_MenuStatusM.prototype.loadImages = function() {
    $gameParty.members().forEach(function(actor) {
        ImageManager.loadFace(actor.faceName());
    }, this);
};

//==============================
// * drawItem
//==============================
Window_MenuStatusM.prototype.drawItem = function(index) {
    this.contents.fontSize = 20;
	this.drawItemBackground(index)
    this.drawItemImage(index);
    this.drawItemStatus(index);
};

//==============================
// * drawItemBackground
//==============================
Window_MenuStatusM.prototype.drawItemBackground = function(index) {
    if (index === this._pendingIndex) {
        var rect = this.itemRect(index);
        var color = this.pendingColor();
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.changePaintOpacity(true);
    };
};

//==============================
// * drawItemImage
//==============================
Window_MenuStatusM.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, 144, rect.height - 2);
    this.changePaintOpacity(true);
};

//==============================
// * drawItemStatus
//==============================
Window_MenuStatusM.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
	this.changeTextColor(this.systemColor());
	this.drawText("LV",x,y + 32 * 1,64,"left")
	this.drawText("HP",x,y + 32 * 2,64,"left")
	this.drawText("MP",x,y + 32 * 3,80)
	this.drawText("Atk",x + 130,y + 32 * 1,64,"left")
	this.drawText("Def",x + 130,y + 32 * 2,64,"left")
	this.drawText("Mat",x + 130,y + 32 * 3,80)
	this.drawText("Mdf",x + 260,y + 32 * 1,64,"left")
	this.drawText("Agi",x + 260,y + 32 * 2,64,"left")
	this.drawText("Luk",x + 260,y + 32 * 3,80)
	this.changeTextColor(this.normalColor());
	this.drawText(actor.name(),x,y)
	this.drawText(actor.level,x,y + 32 * 1,80,"right")	
	this.drawText(actor.mhp,x,y + 32 * 2,80,"right")
	this.drawText(actor.mmp,x,y + 32 * 3,80,"right")
	this.drawText(actor.atk ,x + 130,y + 32 * 1,80,"right")	
	this.drawText(actor.def,x+ 130,y + 32 * 2,80,"right")
	this.drawText(actor.mat,x + 130,y + 32 * 3,80,"right")	
	this.drawText(actor.mdf ,x + 260,y + 32 * 1,80,"right")	
	this.drawText(actor.agi,x+ 260,y + 32 * 2,80,"right")
	this.drawText(actor.luk,x + 260,y + 32 * 3,80,"right")		
};

//==============================
// * processOK
//==============================
Window_MenuStatusM.prototype.processOk = function() {
    Window_Selectable.prototype.processOk.call(this);
    $gameParty.setMenuActor($gameParty.members()[this.index()]);
};

//==============================
// * Is Current Item Enabled
//==============================
Window_MenuStatusM.prototype.isCurrentItemEnabled = function() {
    if (this._formationMode) {
        var actor = $gameParty.members()[this.index()];
        return actor && actor.isFormationChangeOk();
    } else {
        return true;
    }
};

//==============================
// * selectLast
//==============================
Window_MenuStatusM.prototype.selectLast = function() {
	this.select(0);
};

//==============================
// * Formation Mode
//==============================
Window_MenuStatusM.prototype.formationMode = function() {
    return this._formationMode;
};

//==============================
// * set Formation Mode
//==============================
Window_MenuStatusM.prototype.setFormationMode = function(formationMode) {
    this._formationMode = formationMode;
};

//==============================
// * pending Index
//==============================
Window_MenuStatusM.prototype.pendingIndex = function() {
    return this._pendingIndex;
};

//==============================
// * set Pending Index
//==============================
Window_MenuStatusM.prototype.setPendingIndex = function(index) {
    var lastPendingIndex = this._pendingIndex;
    this._pendingIndex = index;
    this.redrawItem(this._pendingIndex);
    this.redrawItem(lastPendingIndex);
};

if (Imported.MOG_TimeSystem) {
	//==============================
	// * create Time Status
	//==============================
	Scene_Menu.prototype.createTimeStatus = function() {
	   $gameSystem._refresh_window_time = false;	
	};
}