BloodTemps = {}
BloodTemps.BBx = 0;

function callBlackBlood() {
    if (!BloodTemps.BBUpdater) {
        BloodTemps.BBUpdater = new BlakcBloodUpdater
        SceneManager._scene.addChild(BloodTemps.BBUpdater);
    }
}

function BlakcBloodUpdater() {
    this.initialize.apply(this, arguments);
}

BlakcBloodUpdater.prototype = Object.create(Sprite.prototype);
BlakcBloodUpdater.prototype.constructor = BlakcBloodUpdater;

BlakcBloodUpdater.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);

    this.BlackBloodThread = new Worker('js/plugins/BlackBlood.js');
    this.BB = new Sprite();
    this.BB.bitmap = ImageManager.loadPicture('theBox');
    this.addChild(this.BB);
    this.BlackBloodThread.onmessage = function (event) {
        BloodTemps.BBx = Number(event.data)
    }
    this.BlackBloodThread.postMessage(['start'])
}

BlakcBloodUpdater.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.BlackBloodThread.postMessage(['loop'])
    this.BB.x = BloodTemps.BBx;
}

BlakcBloodUpdater.prototype.close = function () {
    this.BlackBloodThread.terminate();
    this.destroy();
}