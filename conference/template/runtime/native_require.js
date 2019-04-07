
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/particle/particle.js",
	"libs/wx.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/Container.js",
	"bin-debug/Background.js",
	"bin-debug/CONST.js",
	"bin-debug/ClickEffect.js",
	"bin-debug/Foreground.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ScrollController.js",
	"bin-debug/SoundDisplay.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/infos/Info1.js",
	"bin-debug/infos/Info2.js",
	"bin-debug/infos/InfoCommon.js",
	"bin-debug/pages/Page.js",
	"bin-debug/pages/Page1.js",
	"bin-debug/pages/Page2.js",
	"bin-debug/pages/Page3.js",
	"bin-debug/pages/Page4.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedHeight",
		contentWidth: 1080,
		contentHeight: 1920,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};