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
var pixi_app_wrapper_1 = require("pixi-app-wrapper");
var DisplayManager = (function (_super) {
    __extends(DisplayManager, _super);
    function DisplayManager(rootContainer) {
        var _this = _super.call(this) || this;
        _this._orientation = false;
        _this._clientWidth = 0;
        _this._clientHeight = 0;
        _this._scaleX = 1;
        _this._rootContainer = rootContainer;
        return _this;
    }
    DisplayManager.prototype.create = function (canvasName) {
        var canvas = pixi_app_wrapper_1.Dom.getElementOrCreateNew(canvasName, "canvas", document.getElementById("app-root"));
        var appOptions = {
            width: 2686,
            height: 1414,
            scale: "keep-aspect-ratio",
            align: "top-center",
            resolution: window.devicePixelRatio || 1,
            antialias: true,
            roundPixels: true,
            transparent: false,
            backgroundColor: 0x000000,
            view: canvas,
            showFPS: true,
            showMediaInfo: false,
            changeOrientation: true,
        };
        this._app = new pixi_app_wrapper_1.PixiAppWrapper(appOptions);
        this._app.on(pixi_app_wrapper_1.pixiAppWrapperEvent.RESIZE_END, this.onResizeEnd.bind(this));
        this.onResizeEnd.bind(this);
        this._app.stage.addChild(this._rootContainer);
    };
    DisplayManager.prototype.resolveFpsMeterVisibility = function (isShow) {
        switch (isShow) {
            case true:
                this._app.fps.show();
                break;
            case false:
                this._app.fps.hide();
                break;
        }
    };
    DisplayManager.prototype.onResizeEnd = function (args) {
        this.emit("resize", args.stage.size.width, args.stage.size.height);
        this.clientWidth = args.stage.size.width;
        this.scaleX = args.stage.scale.x;
        this.clientHeight = args.stage.size.height;
        if (window.innerHeight > window.innerWidth) {
            this.orientation = false;
            this.emit("orientationchanged", false);
        }
        else {
            this.orientation = true;
            this.emit("orientationchanged", true);
        }
    };
    Object.defineProperty(DisplayManager.prototype, "stageContainer", {
        get: function () {
            return this._app.stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayManager.prototype, "scaleX", {
        get: function () {
            return this._scaleX;
        },
        set: function (value) {
            this._scaleX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayManager.prototype, "orientation", {
        get: function () {
            return this._orientation;
        },
        set: function (value) {
            this._orientation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayManager.prototype, "clientWidth", {
        get: function () {
            return this._clientWidth;
        },
        set: function (value) {
            this._clientWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayManager.prototype, "clientHeight", {
        get: function () {
            return this._clientHeight;
        },
        set: function (value) {
            this._clientHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DisplayManager.prototype, "ticker", {
        get: function () {
            return this._app.ticker;
        },
        enumerable: true,
        configurable: true
    });
    return DisplayManager;
}(PIXI.utils.EventEmitter));
exports.DisplayManager = DisplayManager;
//# sourceMappingURL=DisplayManager.js.map