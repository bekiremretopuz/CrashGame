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
var eventemitter3_1 = require("eventemitter3");
var PriorityQueue_1 = require("typescript-collections/PriorityQueue");
require("howler");
var PixiAssetsLoader = (function (_super) {
    __extends(PixiAssetsLoader, _super);
    function PixiAssetsLoader(pixiLoader) {
        var _this = _super.call(this) || this;
        _this.loader = pixiLoader ? pixiLoader : PIXI.loader;
        _this.loader.onProgress.add(_this.onGenericAssetProgress.bind(_this));
        _this.loader.onError.add(_this.onGenericAssetError.bind(_this));
        _this.loader.onLoad.add(_this.onGenericAssetLoad.bind(_this));
        _this.assetsQueue = new PriorityQueue_1.default(function (a, b) { return a.priority - b.priority; });
        _this.initLoadingQueue();
        return _this;
    }
    PixiAssetsLoader.prototype.isLoading = function () {
        return Object.keys(this.assetsLoading).length > 0;
    };
    PixiAssetsLoader.prototype.addAsset = function (asset) {
        this.assetsQueue.enqueue(asset);
        return this;
    };
    PixiAssetsLoader.prototype.addAssets = function (assets) {
        var _this = this;
        assets.forEach(function (asset) { return _this.addAsset(asset); });
        return this;
    };
    PixiAssetsLoader.prototype.load = function () {
        if (!this.isLoading()) {
            this.loadNextPriorityGroup();
        }
        return this;
    };
    PixiAssetsLoader.prototype.reset = function () {
        this.assetsQueue.clear();
        this.initLoadingQueue();
        this.loader.reset();
        return this;
    };
    PixiAssetsLoader.prototype.initLoadingQueue = function () {
        this.assetsLoading = {};
        this.currentPriorityLoading = null;
        this.genericAssetsToLoad = 0;
        this.genericAssetsRemaining = 0;
        this.soundAssetsToLoad = 0;
        this.soundAssetsRemaining = 0;
        this.progressPercents = { generic: 0, sound: 0, total: 0 };
    };
    PixiAssetsLoader.prototype.onGenericAssetProgress = function (loader, resource) {
        var innerIncrement = loader.progress - this.progressPercents.generic;
        this.progressPercents.generic = loader.progress;
        var totalIncrement = innerIncrement * this.genericAssetsToLoad / Object.keys(this.assetsLoading).length;
        this.progressPercents.total += totalIncrement;
        this.emit(PixiAssetsLoader.PRIORITY_GROUP_PROGRESS, {
            priority: this.currentPriorityLoading,
            progress: this.progressPercents.total,
        });
    };
    PixiAssetsLoader.prototype.onGenericAssetError = function (error, loader, resource) {
        var loadAsset = this.assetsLoading[resource.name];
        if (loadAsset) {
            loadAsset.loaded = false;
            loadAsset.error = error;
            this.emit(PixiAssetsLoader.ASSET_ERROR, loadAsset);
        }
    };
    PixiAssetsLoader.prototype.onGenericAssetLoad = function (loader, resource) {
        var loadAsset = this.assetsLoading[resource.name];
        if (loadAsset) {
            loadAsset.loaded = true;
            loadAsset.error = null;
            this.emit(PixiAssetsLoader.ASSET_LOADED, loadAsset);
        }
    };
    PixiAssetsLoader.prototype.onAllGenericAssetsComplete = function () {
        this.genericAssetsRemaining = 0;
        this.checkAllAssetsLoaded();
    };
    PixiAssetsLoader.prototype.onSoundAssetProgress = function () {
        this.soundAssetsRemaining--;
        var innerPercent = (this.soundAssetsToLoad - this.soundAssetsRemaining) * 100 / this.soundAssetsToLoad;
        var innerIncrement = innerPercent - this.progressPercents.sound;
        this.progressPercents.sound = innerPercent;
        var totalIncrement = innerIncrement * this.soundAssetsToLoad / Object.keys(this.assetsLoading).length;
        this.progressPercents.total += totalIncrement;
        this.emit(PixiAssetsLoader.PRIORITY_GROUP_PROGRESS, {
            priority: this.currentPriorityLoading,
            progress: this.progressPercents.total,
        });
    };
    PixiAssetsLoader.prototype.onSoundAssetError = function (asset, error) {
        this.onSoundAssetProgress();
        var loadAsset = this.assetsLoading[asset.id];
        if (loadAsset) {
            loadAsset.loaded = false;
            loadAsset.error = error;
            this.emit(PixiAssetsLoader.ASSET_ERROR, loadAsset);
        }
        if (this.soundAssetsRemaining <= 0) {
            this.checkAllAssetsLoaded();
        }
    };
    PixiAssetsLoader.prototype.onSoundAssetLoad = function (asset) {
        this.onSoundAssetProgress();
        var loadAsset = this.assetsLoading[asset.id];
        if (loadAsset) {
            loadAsset.loaded = true;
            loadAsset.error = null;
            this.emit(PixiAssetsLoader.ASSET_LOADED, loadAsset);
        }
        if (this.soundAssetsRemaining <= 0) {
            this.checkAllAssetsLoaded();
        }
    };
    PixiAssetsLoader.prototype.loadNextPriorityGroup = function () {
        this.initLoadingQueue();
        var asset = this.assetsQueue.peek();
        if (asset) {
            this.currentPriorityLoading = asset.priority;
            this.loadPriorityGroup();
        }
        else {
            this.emit(PixiAssetsLoader.ALL_ASSETS_LOADED);
        }
    };
    PixiAssetsLoader.prototype.loadPriorityGroup = function () {
        while (this.assetsQueue.peek() && this.assetsQueue.peek().priority === this.currentPriorityLoading) {
            var asset = this.assetsQueue.dequeue();
            this.assetsLoading[asset.id] = {
                asset: asset,
                loaded: false,
                error: null,
            };
        }
        this.startLoadingAssets();
    };
    PixiAssetsLoader.prototype.startLoadingAssets = function () {
        var _this = this;
        var loadAssets = Object.keys(this.assetsLoading).map(function (key) { return _this.assetsLoading[key]; });
        loadAssets.forEach(function (loadAsset) {
            if (loadAsset.asset.autoplay !== undefined) {
                _this.soundAssetsToLoad++;
                _this.soundAssetsRemaining++;
                _this.loadSoundAsset(loadAsset.asset);
            }
            else {
                _this.genericAssetsToLoad++;
                _this.addGenericAsset(loadAsset.asset);
            }
        });
        this.genericAssetsRemaining = this.genericAssetsToLoad;
        this.loadGenericAssets();
    };
    PixiAssetsLoader.prototype.loadSoundAsset = function (asset) {
        var _this = this;
        asset.howl = new Howl({
            src: [asset.url],
            autoplay: asset.autoplay,
            loop: asset.loop || false,
            volume: asset.volume || 1,
            mute: asset.mute || false,
            rate: asset.rate || 1,
            html5: asset.html5 || false,
            onload: this.onSoundAssetLoad.bind(this, asset),
            onloaderror: function (soundId, error) {
                var loadError = error instanceof Error ? error : new Error("Error loading sound " + asset.id);
                _this.onSoundAssetError(asset, loadError);
            },
        });
    };
    PixiAssetsLoader.prototype.addGenericAsset = function (asset) {
        this.loader.add(asset.id, asset.url);
    };
    PixiAssetsLoader.prototype.loadGenericAssets = function () {
        if (this.genericAssetsToLoad > 0) {
            this.loader.load(this.onAllGenericAssetsComplete.bind(this));
        }
        else {
            this.checkAllAssetsLoaded();
        }
    };
    PixiAssetsLoader.prototype.checkAllAssetsLoaded = function () {
        var _this = this;
        if (this.genericAssetsRemaining + this.soundAssetsRemaining <= 0) {
            this.emit(PixiAssetsLoader.PRIORITY_GROUP_LOADED, {
                priority: this.currentPriorityLoading,
                assets: Object.keys(this.assetsLoading).map(function (key) { return _this.assetsLoading[key]; }).filter(function (loadAsset) { return loadAsset.loaded; }),
            });
            this.loadNextPriorityGroup();
        }
    };
    PixiAssetsLoader.ASSET_LOADED = "AssetsLoader.ASSET_LOADED";
    PixiAssetsLoader.ASSET_ERROR = "AssetsLoader.ASSET_ERROR";
    PixiAssetsLoader.PRIORITY_GROUP_LOADED = "AssetsLoader.PRIORITY_GROUP_LOADED";
    PixiAssetsLoader.PRIORITY_GROUP_PROGRESS = "AssetsLoader.PRIORITY_GROUP_PROGRESS";
    PixiAssetsLoader.ALL_ASSETS_LOADED = "AssetsLoader.ALL_ASSETS_LOADED";
    return PixiAssetsLoader;
}(eventemitter3_1.EventEmitter));
exports.PixiAssetsLoader = PixiAssetsLoader;
//# sourceMappingURL=pixi-assets-loader.js.map