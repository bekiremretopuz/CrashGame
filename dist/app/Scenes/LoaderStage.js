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
var StageManager_1 = require("app/Helper/StageManager");
var AssetsLoader_1 = require("app/Helper/AssetsLoader");
var EntryPoint_1 = require("app/EntryPoint");
var Base64Sprite_1 = require("app/Display/Base64Sprite");
var Helper_1 = require("app/Helper");
var LoaderStage = (function (_super) {
    __extends(LoaderStage, _super);
    function LoaderStage(cdnUrl) {
        var _this = _super.call(this) || this;
        _this._cdnUrl = cdnUrl;
        _this._game = EntryPoint_1.Base.EntryPoint.instance;
        return _this;
    }
    LoaderStage.prototype.awake = function () {
        this.visible = false;
        this._backgroundImageDefault = new PIXI.Graphics().beginFill(0xffffff, 0.65).drawRect(0, 0, 1920, 1414).endFill();
        this._backgroundImageDefault.name = "BackgroundImageDef";
        this.addChild(this._backgroundImageDefault);
        this._loadingSprite = new Base64Sprite_1.Base64Sprite(Helper_1.loadingSprite, { x: 960, y: 707 });
        this._loadingSprite.anchor.set(0.5, 0.5);
        this._loadingSprite.name = "LoadingSprite";
        this.addChild(this._loadingSprite);
        this._assetLoader = new AssetsLoader_1.AssetsLoader(this._cdnUrl);
        this._assetLoader.on("completeLoadHighAsset", this.loadingAnimation, this);
        this._assetLoader.on("completeLoadAsset", this.completeLoadAsset, this);
    };
    LoaderStage.prototype.completeLoadAsset = function () {
        this.emit("completeLoadAsset");
    };
    LoaderStage.prototype.loadingAnimation = function () {
        var loadingAnimation = gsap_1.TweenMax.to(this._loadingSprite, 0.01, {
            rotation: 360, yoyo: true, ease: gsap_1.Power0.easeNone, repeat: -1,
            onUpdate: function () {
            }
        });
    };
    Object.defineProperty(LoaderStage.prototype, "assetsLoader", {
        get: function () {
            return this._assetLoader;
        },
        enumerable: true,
        configurable: true
    });
    LoaderStage.prototype.killScene = function () {
    };
    return LoaderStage;
}(StageManager_1.Scene));
exports.LoaderStage = LoaderStage;
//# sourceMappingURL=LoaderStage.js.map