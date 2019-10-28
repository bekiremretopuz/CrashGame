"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoaderStage_1 = require("./Scenes/LoaderStage");
var StageManager_1 = require("./Helper/StageManager");
var DisplayManager_1 = require("./Helper/DisplayManager");
var BaseGame_1 = require("./Scenes/BaseGame");
var Base;
(function (Base) {
    var EntryPoint = (function () {
        function EntryPoint(cdnUrl, canvasName) {
            this._isLoad = false;
            EntryPoint._instance = this;
            this._cdnUrl = cdnUrl;
            this._canvas = canvasName;
            PIXI.utils.skipHello();
            this._stageManager = new StageManager_1.StageManager();
            this._loader = new LoaderStage_1.LoaderStage(this._cdnUrl);
            this._stageManager.createScene("LoaderStage", this._loader);
            this._stageManager.goToScene("LoaderStage", true);
            this._loader.on("completeLoadAsset", this.completeLoadAsset, this);
        }
        EntryPoint.prototype.completeLoadAsset = function () {
            this.isLoad = true;
        };
        EntryPoint.prototype.attach = function () {
            this._displayManager = new DisplayManager_1.DisplayManager(this._stageManager.root);
            this._displayManager.create(this._canvas);
            clearInterval(this._c);
            this.stageManager.createScene("BaseGame", new BaseGame_1.BaseGame);
            this.stageManager.goToScene("BaseGame", true);
        };
        Object.defineProperty(EntryPoint.prototype, "resource", {
            get: function () {
                return this._loader.assetsLoader.loader;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntryPoint.prototype, "displayManager", {
            get: function () {
                return this._displayManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntryPoint.prototype, "stageManager", {
            get: function () {
                return this._stageManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntryPoint.prototype, "isLoad", {
            get: function () {
                return this._isLoad;
            },
            set: function (value) {
                if (value) {
                    this._c = setInterval(function () {
                        window.dispatchEvent(new Event('isLoad'));
                    }, 150);
                }
                this._isLoad = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EntryPoint, "instance", {
            get: function () {
                return EntryPoint._instance;
            },
            enumerable: true,
            configurable: true
        });
        return EntryPoint;
    }());
    Base.EntryPoint = EntryPoint;
})(Base = exports.Base || (exports.Base = {}));
//# sourceMappingURL=EntryPoint.js.map