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
var gsap_1 = require("gsap");
var Dimmer = (function (_super) {
    __extends(Dimmer, _super);
    function Dimmer() {
        var _this = _super.call(this) || this;
        _this._dimmerContainer = new PIXI.Container();
        _this.init();
        return _this;
    }
    Dimmer.prototype.init = function () {
        var mask = new PIXI.Graphics().beginFill(0xffffff, 0.85).drawCircle(0, 0, 800).endFill();
        this._mask = new PIXI.Sprite(mask.generateCanvasTexture());
        this._mask.position.set(961, 713);
        this._mask.scale.set(0.01, 0.01);
        this._mask.anchor.set(0.5, 0.5);
        this._mask.name = "GameMask";
        this._dimmerContainer.addChild(this._mask);
        this._mask.visible = false;
        this._whiteMask = new PIXI.Graphics().beginFill(0x000000, 0).drawCircle(960, 712, 180).endFill();
        this._whiteMask.name = "whiteMask";
        this._dimmerContainer.addChild(this._whiteMask);
        this._timeText = new PIXI.Text("5", {
            fontFamily: "Dot Spot",
            fontSize: 300,
            fill: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 7
        });
        this._timeText.position.set(960, 200);
        this._timeText.anchor.set(0.5, 0.5);
        this._timeText.name = "TimeText";
        this._dimmerContainer.addChild(this._timeText);
        this.maskAnimation();
    };
    Dimmer.prototype.maskAnimation = function () {
        var _this = this;
        gsap_1.TweenLite.to(this._mask.scale, 0.65, {
            x: 1, y: 1,
            onStart: function () {
                _this._mask.alpha = 0.4;
                _this._mask.scale.set(0.01, 0.01);
            }
        });
        gsap_1.TweenLite.to(this._mask, 0.65, {
            alpha: 0, onComplete: function () {
                var duration = Math.floor(Math.random() * 10 + 5);
                setTimeout(function () {
                    _this.maskAnimation();
                }, duration * 1000);
            }
        });
    };
    Dimmer.prototype.resolveDimmer = function (isShow) {
        var _this = this;
        switch (isShow) {
            case true:
                gsap_1.TweenLite.to(this._dimmerContainer, 0.25, {
                    alpha: 0.8,
                    onStart: function () {
                        _this.setTimeText(5);
                        _this.time = 5;
                        _this.emit("dimmeraction", "dimmer", true);
                    }
                });
                break;
            case false:
                gsap_1.TweenLite.to(this._dimmerContainer, 0.25, {
                    alpha: 0,
                    onStart: function () {
                    }
                });
                break;
        }
    };
    Dimmer.prototype.closeDimmer = function () {
        this._dimmerContainer.alpha = 0;
        this.emit("dimmeraction", "dimmer", false);
    };
    Dimmer.prototype.resolveTiming = function (value) {
        var _this = this;
        this.maskAnimation();
        if (value == 4) {
            this.emit("dimmeraction", "startGame");
        }
        if (value == 5) {
            this.emit("dimmeraction", "timestart");
        }
        gsap_1.TweenLite.to(this._timeText.scale, 0.125, {
            x: 1, y: 1, onComplete: function () {
                gsap_1.TweenLite.to(_this._timeText.scale, 0.125, {
                    x: 1.5, y: 1.5, onComplete: function () {
                        if (value.toFixed() == 0) {
                            _this.closeDimmer();
                            _this.emit("dimmeraction", "timezero");
                        }
                    }
                });
            }
        });
    };
    Object.defineProperty(Dimmer.prototype, "dimmerContainer", {
        get: function () {
            return this._dimmerContainer;
        },
        enumerable: true,
        configurable: true
    });
    Dimmer.prototype.setTimeText = function (value) {
        this._timeText.text = value + "";
        this.time = value;
    };
    Object.defineProperty(Dimmer.prototype, "time", {
        get: function () {
            return this._time;
        },
        set: function (value) {
            if (this._time != value) {
                this._time = value;
                this.resolveTiming(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dimmer.prototype, "mask", {
        get: function () {
            return this._mask;
        },
        enumerable: true,
        configurable: true
    });
    return Dimmer;
}(PIXI.utils.EventEmitter));
exports.Dimmer = Dimmer;
//# sourceMappingURL=Dimmer.js.map