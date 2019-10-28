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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Scene;
}(PIXI.Container));
exports.Scene = Scene;
var StageManager = (function (_super) {
    __extends(StageManager, _super);
    function StageManager() {
        var _this = _super.call(this) || this;
        _this._rootContainer = new PIXI.Container();
        _this._scenes = {};
        _this._gameMask = new PIXI.Graphics().beginFill(0x000000, 0).drawRect(-1000, 0, 5000, 1414).endFill();
        _this._gameMask.name = "GameMask";
        _this._rootContainer = new PIXI.Container();
        _this._rootContainer.name = "RootContainer";
        _this._rootContainer.addChild(_this._gameMask);
        _this._rootContainer.mask = _this._gameMask;
        return _this;
    }
    StageManager.prototype.createScene = function (id, TScene) {
        if (this._scenes[id])
            return undefined;
        var scene = TScene;
        this._scenes[id] = scene;
        this._rootContainer.addChild(this._scenes[id]);
        return scene;
    };
    StageManager.prototype.goToScene = function (id, reset) {
        if (this._scenes[id]) {
            if (this._currentStage) {
                if (reset) {
                    this._currentStage.removeChildren();
                }
                else {
                    this._currentStage.visible = false;
                    this._scenes[id].visible = true;
                }
                this._currentStage.killScene();
            }
            this._currentStage = this._scenes[id];
            this._currentStage.awake();
            return true;
        }
        return false;
    };
    Object.defineProperty(StageManager.prototype, "scenes", {
        get: function () {
            return this._scenes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageManager.prototype, "root", {
        get: function () {
            return this._rootContainer;
        },
        enumerable: true,
        configurable: true
    });
    return StageManager;
}(PIXI.utils.EventEmitter));
exports.StageManager = StageManager;
//# sourceMappingURL=StageManager.js.map