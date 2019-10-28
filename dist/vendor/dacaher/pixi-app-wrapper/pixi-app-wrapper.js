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
var EventEmitter = require("eventemitter3");
require("fpsmeter");
var pixi_app_wrapper_1 = require("pixi-app-wrapper");
require("pixi-layers");
var PIXI = require("pixi.js");
var screenfull = require("screenfull");
var media_info_viewer_1 = require("./info/media-info-viewer");
var align_bottom_center_1 = require("./stage/align/align-bottom-center");
var align_bottom_left_1 = require("./stage/align/align-bottom-left");
var align_bottom_right_1 = require("./stage/align/align-bottom-right");
var align_middle_1 = require("./stage/align/align-middle");
var align_middle_left_1 = require("./stage/align/align-middle-left");
var align_middle_right_1 = require("./stage/align/align-middle-right");
var align_top_center_1 = require("./stage/align/align-top-center");
var align_top_left_1 = require("./stage/align/align-top-left");
var align_top_right_1 = require("./stage/align/align-top-right");
var scale_full_size_1 = require("./stage/scale/scale-full-size");
var scale_keep_aspect_ratio_1 = require("./stage/scale/scale-keep-aspect-ratio");
var scale_none_1 = require("./stage/scale/scale-none");
var PixiAppWrapper = (function (_super) {
    __extends(PixiAppWrapper, _super);
    function PixiAppWrapper(options) {
        var _this = _super.call(this) || this;
        _this.defaultScaleMethod = "none";
        _this.defaultAlignMethod = "top-left";
        _this.defaultOptions = {
            width: 2686,
            height: 1414,
            scale: _this.defaultScaleMethod,
            align: _this.defaultAlignMethod,
            showFPS: false,
            showMediaInfo: false,
        };
        _this.fpsmeterOptions = {
            theme: "transparent",
            heat: 1,
            graph: 1,
            history: 20,
            zIndex: 100,
        };
        if (!options) {
            options = _this.defaultOptions;
        }
        _this.resizing = false;
        _this.mediaInfoViewer = new media_info_viewer_1.MediaInfoViewer();
        _this.app = new PIXI.Application(options);
        _this.app.stage = new PIXI.display.Stage();
        _this.configure(options);
        _this.appOptions = options;
        _this.ticker.add(_this.resize.bind(_this));
        return _this;
    }
    PixiAppWrapper.toggleFulscreen = function (element) {
        var target = element ? element : document.documentElement;
        if (screenfull.enabled) {
            screenfull.toggle(target);
        }
    };
    Object.defineProperty(PixiAppWrapper.prototype, "initialHeight", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAppWrapper.prototype, "initialWidth", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAppWrapper.prototype, "stage", {
        get: function () {
            return this.app.stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAppWrapper.prototype, "ticker", {
        get: function () {
            return this.app.ticker;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAppWrapper.prototype, "renderer", {
        get: function () {
            return this.app.renderer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAppWrapper.prototype, "screen", {
        get: function () {
            return this.app.screen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiAppWrapper.prototype, "view", {
        get: function () {
            return this.app.view;
        },
        enumerable: true,
        configurable: true
    });
    PixiAppWrapper.prototype.getMediaInfo = function () {
        return {
            display: {
                screen: {
                    width: this.screen.width,
                    height: this.screen.height,
                },
                view: {
                    width: this.view.clientWidth,
                    height: this.view.clientHeight,
                },
                stage: {
                    x: this.stage.x,
                    y: this.stage.y,
                    initialWidth: this.initialWidth,
                    initialHeight: this.initialHeight,
                    currentWidth: Math.ceil(this.initialWidth * this.stage.scale.x),
                    currentHeight: Math.ceil(this.initialHeight * this.stage.scale.y),
                    scaleX: this.stage.scale.x.toFixed(2),
                    scaleY: this.stage.scale.y.toFixed(2),
                    scaling: this.appOptions.scale ? this.appOptions.scale.valueOf() : this.defaultScaleMethod,
                    alignment: this.appOptions.align ? this.appOptions.align.valueOf() : this.defaultAlignMethod,
                    orientation: this.landscape ? "landscape" : "portrait",
                },
            },
        };
    };
    PixiAppWrapper.prototype.configure = function (options) {
        this.width = options.width;
        this.height = options.height;
        this.landscape = (this.width >= this.height);
        switch (options.align) {
            case "top-center":
                this.alignStrategy = new align_top_center_1.AlignTopCenter();
                break;
            case "top-right":
                this.alignStrategy = new align_top_right_1.AlignTopRight();
                break;
            case "middle-left":
                this.alignStrategy = new align_middle_left_1.AlignMiddleLeft();
                break;
            case "middle":
                this.alignStrategy = new align_middle_1.AlignMiddle();
                break;
            case "middle-right":
                this.alignStrategy = new align_middle_right_1.AlignMiddleRight();
                break;
            case "bottom-left":
                this.alignStrategy = new align_bottom_left_1.AlignBottomLeft();
                break;
            case "bottom-center":
                this.alignStrategy = new align_bottom_center_1.AlignBottomCenter();
                break;
            case "bottom-right":
                this.alignStrategy = new align_bottom_right_1.AlignBottomRight();
                break;
            default:
                this.alignStrategy = new align_top_left_1.AlignTopLeft();
                break;
        }
        switch (options.scale) {
            case "keep-aspect-ratio":
                this.scaleStrategy = new scale_keep_aspect_ratio_1.ScaleKeepAspectRatio();
                break;
            case "full-size":
                this.scaleStrategy = new scale_full_size_1.ScaleFullSize();
                break;
            default:
                this.scaleStrategy = new scale_none_1.ScaleNone();
                break;
        }
        if (options.showFPS) {
            this.createFPSmeter();
        }
        if (!options.showMediaInfo) {
            this.mediaInfoViewer.hide();
        }
        if (!options.view) {
            document.body.appendChild(this.app.view);
        }
    };
    PixiAppWrapper.prototype.createFPSmeter = function () {
        this.fpsmeter = new FPSMeter(pixi_app_wrapper_1.Dom.getElementOrBody("fps-meter"), this.fpsmeterOptions);
        this.ticker.add(this.fpsmeter.tick);
        this.fpsmeter.hide();
    };
    PixiAppWrapper.prototype.resize = function () {
        var multiplier = this.renderer.options.resolution || 1;
        var width = Math.floor(this.view.clientWidth * multiplier);
        var height = Math.floor(this.view.clientHeight * multiplier);
        if (!this.resizing && (this.view.width !== width || this.view.height !== height)) {
            this.resizing = true;
            this.emit(pixi_app_wrapper_1.pixiAppWrapperEvent.RESIZE_START);
            this.renderer.resize(this.view.clientWidth, this.view.clientHeight);
            var orientationChanged = this.orientate();
            this.scale();
            this.align();
            this.mediaInfoViewer.update(this.getMediaInfo());
            this.resizing = false;
            this.emit(pixi_app_wrapper_1.pixiAppWrapperEvent.RESIZE_END, {
                stage: {
                    position: {
                        x: this.stage.position.x,
                        y: this.stage.position.y,
                    },
                    client: {
                        currentWidth: this.view.clientWidth,
                        currentHeight: this.view.clientHeight,
                    },
                    scale: {
                        x: this.stage.scale.x,
                        y: this.stage.scale.y,
                    },
                    size: {
                        width: this.initialWidth * this.stage.scale.x,
                        height: this.initialHeight * this.stage.scale.y,
                    },
                    orientation: {
                        landscape: this.landscape,
                        changed: orientationChanged,
                    },
                },
                view: {
                    width: this.view.width,
                    height: this.view.height,
                },
            });
        }
    };
    PixiAppWrapper.prototype.orientate = function () {
        var changed = false;
        if (this.appOptions.changeOrientation) {
            if (this.landscape && this.view.clientHeight > this.view.clientWidth) {
                changed = true;
                this.landscape = false;
            }
            else if (!this.landscape && this.view.clientWidth > this.view.clientHeight) {
                changed = true;
                this.landscape = true;
            }
        }
        return changed;
    };
    PixiAppWrapper.prototype.swapSize = function () {
        var tempW = this.width;
        this.width = this.height;
        this.height = tempW;
    };
    PixiAppWrapper.prototype.scale = function () {
        var _a = this.scaleStrategy.scale(this.initialWidth, this.initialHeight, this.view.clientWidth, this.view.clientHeight), scaleX = _a.scaleX, scaleY = _a.scaleY;
        this.stage.scale.set(scaleX, scaleY);
    };
    PixiAppWrapper.prototype.align = function () {
        var _a = this.alignStrategy.align(this.initialWidth * this.stage.scale.x, this.initialHeight * this.stage.scale.y, this.view.clientWidth, this.view.clientHeight), x = _a.x, y = _a.y;
        this.stage.position.set(x, y);
    };
    Object.defineProperty(PixiAppWrapper.prototype, "fps", {
        get: function () {
            return this.fpsmeter;
        },
        enumerable: true,
        configurable: true
    });
    return PixiAppWrapper;
}(EventEmitter));
exports.PixiAppWrapper = PixiAppWrapper;
//# sourceMappingURL=pixi-app-wrapper.js.map