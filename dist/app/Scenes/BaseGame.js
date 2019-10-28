"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var StageManager_1 = require("app/Helper/StageManager");
var Animations_1 = require("app/View/Animations");
var Dimmer_1 = require("app/View/Dimmer");
var EntryPoint_1 = require("app/EntryPoint");
var gsap_1 = require("gsap");
var BaseGame = (function (_super) {
    __extends(BaseGame, _super);
    function BaseGame() {
        var _this = _super.call(this) || this;
        _this._game = EntryPoint_1.Base.EntryPoint.instance;
        console.log("%cCurrent GameClient Version: 1.0.21", 'background: #222; color: #bada55');
        return _this;
    }
    BaseGame.prototype.awake = function () {
        this.position.x = 380;
        this._backgroundImageDefault = new PIXI.Sprite(PIXI.Texture.from("background"));
        this._backgroundImageDefault.anchor.set(0.5, 0.5);
        this._backgroundImageDefault.position.set(960, 707);
        this._backgroundImageDefault.name = "BackgroundImage";
        this.addChild(this._backgroundImageDefault);
        this._animations = new Animations_1.Animations();
        this.addChild(this._animations);
        this._shadow = new PIXI.Sprite(PIXI.Texture.from("shadow"));
        this._shadow.anchor.set(0.5, 0.5);
        this._shadow.scale.set(-5.5, 1.2);
        this._shadow.position.set(-253, 680);
        this._shadow.name = "Shadow";
        this.addChild(this._shadow);
        this._shadow1 = new PIXI.Sprite(PIXI.Texture.from("shadow"));
        this._shadow1.anchor.set(0.5, 0.5);
        this._shadow1.scale.set(5.5, 1.2);
        this._shadow1.position.set(2180, 680);
        this._shadow1.name = "Shadow1";
        this.addChild(this._shadow1);
        this._dimmer = new Dimmer_1.Dimmer();
        this.addChild(this._dimmer.dimmerContainer);
        this._dimmer.closeDimmer();
        this.initEvents();
    };
    BaseGame.prototype.initEvents = function () {
        this._animations.on("animationstatus", this.onAnimationStatus, this);
        this._dimmer.on("dimmeraction", this.onAnimationStatus, this);
    };
    BaseGame.prototype.onAnimationStatus = function (action, value) {
        var _this = this;
        switch (action) {
            case "crashed":
                switch (value) {
                    case true:
                        this._dimmer.resolveDimmer(true);
                        break;
                    case false:
                        this._dimmer.resolveDimmer(false);
                        break;
                }
                break;
            case "dimmer":
                switch (value) {
                    case true:
                        this._animations.multiplierText.visible = false;
                        break;
                    case false:
                        this._animations.multiplierText.visible = true;
                        break;
                }
                break;
            case "startGame":
                this._animations.finishIdlePreparing();
                break;
            case "timestart":
                gsap_1.TweenLite.to(this._animations.banner.scale, 0.4, {
                    y: 4, onComplete: function () {
                        gsap_1.TweenLite.to(_this._animations.banner.scale, 0.15, { y: 3.6 });
                    }
                });
                break;
            case "timezero":
                gsap_1.TweenLite.to(this._animations.banner.scale, 0.4, { y: 1.75 });
                break;
        }
    };
    BaseGame.prototype.killScene = function () {
    };
    Object.defineProperty(BaseGame.prototype, "animationController", {
        get: function () {
            return this._animations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseGame.prototype, "dimmer", {
        get: function () {
            return this._dimmer;
        },
        enumerable: true,
        configurable: true
    });
    return BaseGame;
}(StageManager_1.Scene));
exports.BaseGame = BaseGame;
//# sourceMappingURL=BaseGame.js.map