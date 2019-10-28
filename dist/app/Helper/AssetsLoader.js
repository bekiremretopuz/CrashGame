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
var pixi_assets_loader_1 = require("pixi-assets-loader");
var EntryPoint_1 = require("app/EntryPoint");
var AssetsLoader = (function (_super) {
    __extends(AssetsLoader, _super);
    function AssetsLoader(cdnUrl) {
        var _this = _super.call(this) || this;
        _this._assetsCount = {};
        _this._cdnUrl = cdnUrl;
        _this._game = EntryPoint_1.Base.EntryPoint.instance;
        _this.loadAssets();
        return _this;
    }
    AssetsLoader.prototype.loadAssets = function () {
        var _this = this;
        var assets = [
            { id: "background", url: this._cdnUrl + "/" + "assets/gfx/bg.jpg", priority: pixi_assets_loader_1.AssetPriority.HIGHEST, type: "texture" },
            { id: "shadow", url: this._cdnUrl + "/" + "assets/gfx/shadow.png", priority: pixi_assets_loader_1.AssetPriority.HIGHEST, type: "texture" },
            { id: "smoke", url: this._cdnUrl + "/" + "assets/gfx/smoke_anim.json", priority: pixi_assets_loader_1.AssetPriority.HIGHEST, type: "atlas" },
            { id: "asset", url: this._cdnUrl + "/" + "assets/gfx/asset-0.json", priority: pixi_assets_loader_1.AssetPriority.HIGHEST, type: "atlas" },
            { id: "character", url: this._cdnUrl + "/" + "assets/gfx/character.json", priority: pixi_assets_loader_1.AssetPriority.HIGHEST, type: "animation" },
            { id: "char_front", url: this._cdnUrl + "/" + "assets/gfx/char_front.json", priority: pixi_assets_loader_1.AssetPriority.HIGHEST, type: "atlas" },
        ];
        assets.forEach(function (asset) {
            if (!_this._assetsCount[asset.priority]) {
                _this._assetsCount[asset.priority] = { total: 1, progress: 0 };
            }
            else {
                _this._assetsCount[asset.priority].total++;
            }
        });
        this._loadingProgress = 0;
        this._totalAssets = assets.length;
        this._loader = new pixi_assets_loader_1.PixiAssetsLoader();
        this._loader.on(pixi_assets_loader_1.PixiAssetsLoader.PRIORITY_GROUP_LOADED, this.onAssetsLoaded.bind(this));
        this._loader.on(pixi_assets_loader_1.PixiAssetsLoader.PRIORITY_GROUP_PROGRESS, this.onAssetsProgress.bind(this));
        this._loader.on(pixi_assets_loader_1.PixiAssetsLoader.ASSET_ERROR, this.onAssetsError.bind(this));
        this._loader.on(pixi_assets_loader_1.PixiAssetsLoader.ALL_ASSETS_LOADED, this.onAllAssetsLoaded.bind(this));
        this._loader.addAssets(assets).load();
    };
    AssetsLoader.prototype.onAssetsProgress = function (args) {
        var percentFactor = this._assetsCount[args.priority].total / this._totalAssets;
        this._loadingProgress += (args.progress - this._assetsCount[args.priority].progress) * percentFactor;
        this._assetsCount[args.priority].progress = args.progress;
    };
    AssetsLoader.prototype.onAssetsError = function (args) {
        this.emit("assetLoadfailed");
    };
    AssetsLoader.prototype.onAllAssetsLoaded = function () {
        var _this = this;
        WebFont.load({
            custom: {
                families: ["Dot Spot"],
                urls: [this._cdnUrl + 'assets/fonts/stylesheet.css']
            },
            active: function (familyName, fwd) {
                _this.emit("completeLoadAsset");
            }
        });
    };
    AssetsLoader.prototype.onAssetsLoaded = function (args) {
        var _this = this;
        args.assets.forEach(function (loadAsset) {
            _this.createViewsByPriority(args.priority);
        });
    };
    AssetsLoader.prototype.createViewsByPriority = function (priority) {
        switch (priority) {
            case pixi_assets_loader_1.AssetPriority.HIGHEST:
                this.emit("completeLoadHighAsset");
                break;
            case pixi_assets_loader_1.AssetPriority.NORMAL:
                this.emit("completeLoadNormalAsset");
                break;
            case pixi_assets_loader_1.AssetPriority.LOW:
                this.emit("completeLoadLowAsset");
                break;
        }
    };
    Object.defineProperty(AssetsLoader.prototype, "loader", {
        get: function () {
            return this._loader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetsLoader.prototype, "loadingProgress", {
        get: function () {
            return this._loadingProgress;
        },
        enumerable: true,
        configurable: true
    });
    return AssetsLoader;
}(PIXI.utils.EventEmitter));
exports.AssetsLoader = AssetsLoader;
//# sourceMappingURL=AssetsLoader.js.map