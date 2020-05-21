//=============================================================================
// MOG_FakeLoadScreen.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Apresenta imagens aleatórias durante a cena de arquivos.
 * @author Moghunter
 *
 * @param File Name
 * @desc Definição do nome das imagens apresentadas.
 * @default Picture_
 *
 * @param Number of Pictures
 * @desc Definição do número de imagens aleatórias apresentadas.
 * @default 4
 *
 * @param Duration
 * @desc Definição da duração da cena.
 * @default 120
 *
 * @param Sound File
 * @desc Definição do nome do arquivo de som.
 * @default Magic4
 *
 * @param Sound Pitch
 * @desc Definição do Pitch do som.
 * @default 50
 * 
 * @param Gauge X-axis
 * @desc Definição X-axis do medidor.
 * @default 313
 *
 * @param Gauge Y-axis
 * @desc Definição Y-axis do medidor.
 * @default 551
 *
 * @param Word Animation
 * @desc Ativar animação da palavra de leitura.
 * @default true
 *
 * @param Word X-axis
 * @desc Definição X-axis da palavra de leitura.
 * @default 330
 *
 * @param Word Y-axis
 * @desc Definição Y-axis da palavra de leitura.
 * @default 520
 *
 * @help  
 * =============================================================================
 * +++ MOG - Fake Loading Screen (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Ativa uma cena de leitura onde é apresentado imagens aleatórias.
 * Essas imagens podem servir para apresentar tutoriais ou artworks do jogos.
 * 
 * =============================================================================
 * UTILIZAÇÃO
 * =============================================================================
 * As imagens do sistema deverão ser gravados na pasta.
 *
 * /img/fakeloadscreen/
 *
 * =============================================================================
 * As imagens serão selecionadas aleatóriamente, sendo necessário definir 
 * no parâmetro do plugin o número de imagens.
 *
 * As imagens deverão ser nomeadas da seguinte forma.
 *
 * Picture_ + INDEX.png
 *
 * Ex
 *
 * Picture_1.png
 * Picture_2.png
 * Picture_3.png
 * Picture_4.png   
 * ...
 *
 * =============================================================================
 * PLUGIN COMMAND
 * ============================================================================= 
 * Para ativar a cena através do evento use o plugin command abaixo.
 *
 * fakeloadbar : MODE : DURATION : PICTURE_NAME
 *
 * MODE           - 0 (Saving)  1 (Loading)
 * DURATION       - Duração da cena.
 * PICTURE_NAME   - Nome da Imagem, se definir o nome como "Random" será 
 *                  selecionado uma imagem aleatória
 *
 * ============================================================================= 
 * Para desativar temporariamente a cena de load use o código abaixo.
 *
 * fakeloadbar_disable_temp
 *
 * ============================================================================= 
 * Para ativar a cena de load use o código abaixo.
 *
 * fakeloadbar_enable
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_FakeLoadScreen = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_FakeLoadScreen');
    Moghunter.fakeLoad_FileName = String(Moghunter.parameters['File Name'] || "Picture_");
	Moghunter.fakeLoad_NumberOfPictures = Number(Moghunter.parameters['Number of Pictures'] || 3);
    Moghunter.fakeLoad_Duration = Number(Moghunter.parameters['Duration'] || 120);
	Moghunter.fakeLoad_MeterX = Number(Moghunter.parameters['Gauge X-axis'] || 313);
	Moghunter.fakeLoad_MeterY = Number(Moghunter.parameters['Gauge Y-axis'] || 551);
	Moghunter.fakeLoad_WordFloat = String(Moghunter.parameters['Word Animation'] || "true");
	Moghunter.fakeLoad_WordX = Number(Moghunter.parameters['Word X-axis'] || 330);
	Moghunter.fakeLoad_WordY = Number(Moghunter.parameters['Word Y-axis'] || 520);
	Moghunter.fakeLoad_SoundFile = String(Moghunter.parameters['Sound File'] || "Magic4");
	Moghunter.fakeLoad_SoundPitch = Number(Moghunter.parameters['Sound Pitch'] || 50);
	
//=============================================================================
// ** ImageManager
//=============================================================================

//==============================
// * Menus
//==============================
ImageManager.loadfakeload = function(filename) {
    return this.loadBitmap('img/fakeloadscreen/', filename, 0, true);
};
	
//=============================================================================
// ** Sound Manager
//=============================================================================	

//==============================
// * play Save
//==============================
SoundManager.playSave = function() {
};

//==============================
// * play Save 2
//==============================
SoundManager.playSave2 = function() {
    this.playSystemSound(5);
};

//==============================
// * Mog Play Sound
//==============================
SoundManager.mogPlaySound = function(fileName,pitch,volume){
   var se = {};
   se.name = fileName;
   se.pitch = pitch;
   se.volume = volume;
   AudioManager.playSe(se);
}; 

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_fakeload_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _mog_fakeload_pluginCommand.call(this,command, args)
	if (command === "fakeloadbar")  {
		if ($gameTemp._fakeloadEnabled) {
			var type = Math.min(Math.max(args[1],0),1);
			var duration = Math.min(Math.max(args[3],30),9999);
			$gameTemp._fakeload[1] = type;
			$gameTemp._fakeload[2] = duration;
			$gameTemp._fakeload[3] = null;
			if (args[5]) {$gameTemp._fakeload[3] = String(args[5])};
			SceneManager.push(SceneFakeLoadScreen)
			this.wait(10);
		};
	} else if (command === "fakeloadbar_disable_temp")  {	
		$gameTemp._fakeloadEnabled = false;
	} else if (command === "fakeloadbar_enable")  {		
		$gameTemp._fakeloadEnabled = true;
    };	
	return true;
};

//=============================================================================
// ** Game_Temp
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_fakeload_gtemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _mog_fakeload_gtemp_initialize.call(this);
	this._fakeload = [false,0,Moghunter.fakeLoad_Duration,null];
	this._fakeloadEnabled = true;
};

//=============================================================================
// ** Scene Save
//=============================================================================	

//==============================
// * initialize
//==============================
var _mog_fakeload_ss_initialize = Scene_Save.prototype.initialize;
Scene_Save.prototype.initialize = function() {
    _mog_fakeload_ss_initialize.call(this);
	this._fileSaved = false;
};

//==============================
// * on Save File OK
//==============================
Scene_Save.prototype.onSavefileOk = function() {
    Scene_File.prototype.onSavefileOk.call(this);
    $gameSystem.onBeforeSave();
    if (DataManager.saveGame(this.savefileId())) {
		this._fileSaved = true;
        this.onSaveSuccess();
    } else {
		this._fileSaved = false;
        this.onSaveFailure();
    }
};

//==============================
// * popScene
//==============================
Scene_Save.prototype.popScene = function() {
	if (this._fileSaved) {
		if ($gameTemp._fakeloadEnabled) {
			$gameTemp._fakeload[1] = 0;
			$gameTemp._fakeload[3] = null;
			SceneManager.goto(SceneFakeLoadScreen);
			SoundManager.playSave();
			
		} else {
			SoundManager.playSave();
			this.popScene();
		};
	} else {
		SceneManager.pop();
	};		
};

//=============================================================================
// ** Scene Load
//=============================================================================	

//==============================
// * on Load Sucess
//==============================
Scene_Load.prototype.onLoadSuccess = function() {
	if ($gameTemp._fakeloadEnabled) {
		this.reloadMapIfUpdated();
		$gameTemp._fakeload[1] = 2;
		$gameTemp._fakeload[3] = null;
		SceneManager.goto(SceneFakeLoadScreen);
	} else {
		SoundManager.playLoad();
		this.fadeOutAll();
		this.reloadMapIfUpdated();
		SceneManager.goto(Scene_Map);
		this._loadSuccess = true;
	};
};

//=============================================================================
// ** Scene Fake Load Screen
//=============================================================================	
function SceneFakeLoadScreen() {
    this.initialize.apply(this, arguments);
};

SceneFakeLoadScreen.prototype = Object.create(Scene_MenuBase.prototype);
SceneFakeLoadScreen.prototype.constructor = SceneFakeLoadScreen;

//==============================
// * Initialize
//==============================
SceneFakeLoadScreen.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this._type = $gameTemp._fakeload[1];
    this._duration = [0,$gameTemp._fakeload[2],false];
};

//==============================
// * Create
//==============================
SceneFakeLoadScreen.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this._field = new Sprite();
	this.addChild(this._field);
	this.loadPictures();
    this.creteRandomBackground();
	this.createLayout();
	this.createMeter();
	this.createWord();
	SoundManager.mogPlaySound(Moghunter.fakeLoad_SoundFile,Moghunter.fakeLoad_SoundPitch,100);
};

//==============================
// * Load Pictures
//==============================
SceneFakeLoadScreen.prototype.loadPictures = function() {
	this._pictures = [];
	if (this.needSetPicture()) {
	    var fileName = String($gameTemp._fakeload[3]);
	    this._pictures.push(ImageManager.loadfakeload(fileName.toLowerCase()));
    } else {
		for (var i = 0; i < Moghunter.fakeLoad_NumberOfPictures; i++) {
			 var fileName = String(Moghunter.fakeLoad_FileName + (i + 1))
			 this._pictures.push(ImageManager.loadfakeload(fileName));	
		};
    };
};

//==============================
// * needSetPicture
//==============================
SceneFakeLoadScreen.prototype.needSetPicture = function() {
   if (!$gameTemp._fakeload[3]) {return false};
   if ($gameTemp._fakeload[3] === "") {return false};
   if ($gameTemp._fakeload[3].toLowerCase() == "random") {return false};
   return true;
};   
   
//==============================
// * set Bitmap
//==============================
SceneFakeLoadScreen.prototype.setBitmap = function() {
   if (this.needSetPicture()) {return this._pictures[0]};
   var r = Math.randomInt(Moghunter.fakeLoad_NumberOfPictures);
   return this._pictures[r];
};

//==============================
// * create Word
//==============================
SceneFakeLoadScreen.prototype.createWord = function() {
    this._word = new Sprite(ImageManager.loadfakeload("Word"));
	this._word.visible = false;
	this._word.x = Moghunter.fakeLoad_WordX;
	this._word.y = Moghunter.fakeLoad_WordY;
	this._wordData = [0,0,false,0,false];
	this._wordData[4] = String(Moghunter.fakeLoad_WordFloat) === "true" ? true : false;
	this._field.addChild(this._word);
};

//==============================
// * update Word
//==============================
SceneFakeLoadScreen.prototype.updateWord = function() {
	if (!this._wordData[2]) {this.refreshWord()};
	if (this._wordData[4]) {this.updateWordFloatEffect()};
	this._word.x = Moghunter.fakeLoad_WordX;
	this._word.y = Moghunter.fakeLoad_WordY + this._wordData[1];	
};

//==============================
// * refresh Word
//==============================
SceneFakeLoadScreen.prototype.refreshWord = function() {
	this._wordData[2] = true;
	this._word.visible = true;
    var ty = this._type > 0 ? 0 : 1;
	var cw = this._word.bitmap.width;
	var ch = this._word.bitmap.height / 2;
	this._word.setFrame(0,ty * ch,cw,ch);
};

//==============================
// * update Word Float Effect
//==============================
SceneFakeLoadScreen.prototype.updateWordFloatEffect = function() {
	this._wordData[3]++;
	if (this._wordData[3] < 2) {return};
	this._wordData[3] = 0;
    this._wordData[0]++;
	if (this._wordData[0] < 10) {
		this._wordData[1]++;
	} else if (this._wordData[0] < 20) {	
		this._wordData[1]--;
	} else {
		this._wordData[0] = 0;
		this._wordData[1] = 0;
	};
};

//==============================
// * Create Random Background
//==============================
SceneFakeLoadScreen.prototype.creteRandomBackground = function() {
     this._background = new Sprite(this.setBitmap());
	 this._field.addChild(this._background);
};

//==============================
// * Create Layout
//==============================
SceneFakeLoadScreen.prototype.createLayout = function() {
     this._layout = new Sprite(ImageManager.loadfakeload("Layout"));
	 this._field.addChild(this._layout);
};

//==============================
// * Create Meter
//==============================
SceneFakeLoadScreen.prototype.createMeter = function() {
     this._meter = new Sprite(ImageManager.loadfakeload("Meter"));
	 this._meter.x = Moghunter.fakeLoad_MeterX;
	 this._meter.y = Moghunter.fakeLoad_MeterY;
	 this._meter.visible = false;
	 this._field.addChild(this._meter);
};

//==============================
// * Create Meter
//==============================
SceneFakeLoadScreen.prototype.updateMeter = function() {
     this._duration[0]++;
	 var cw = this._meter.bitmap.width;
	 var ch = this._meter.bitmap.height;
	 var rate = this._duration[0] * cw / this._duration[1];
	 this._meter.setFrame(0,0,rate,ch);
	 this._meter.visible = true;
	 if (this._duration[0] >= this._duration[1]) {this._duration[2] = true};
};

//==============================
// * End Load Scene
//==============================
SceneFakeLoadScreen.prototype.endLoadScene = function() {
	 AudioManager.stopSe(); 
	 if (this._type === 0) {
	     SoundManager.playSave2();
		 SceneManager.pop();
	 } else if (this._type === 1) {
	     SoundManager.playLoad();
		 SceneManager.pop();
	 } else if (this._type === 2) {
	     SoundManager.playLoad();
		 SceneManager.goto(Scene_Map);
		 $gameSystem.onAfterLoad();
	 } else {
		 SceneManager.pop();
	 };
};

//==============================
// * Update Fade End
//==============================
SceneFakeLoadScreen.prototype.updateFadeEnd = function() {
      this._field.opacity -= 10;
	  if (this._field.opacity <= 0) {this.endLoadScene()};
};

//==============================
// * Update
//==============================
SceneFakeLoadScreen.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if (this._meter.bitmap.isReady()) {this.updateMeter()};
	if (this._word.bitmap.isReady()) {this.updateWord()};
	if (this._duration[2]) {this.updateFadeEnd()};
};