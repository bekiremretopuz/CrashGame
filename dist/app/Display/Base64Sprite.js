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
var Base64Sprite = (function (_super) {
    __extends(Base64Sprite, _super);
    function Base64Sprite(frame, position) {
        var _this = _super.call(this, PIXI.Texture.from(frame)) || this;
        _this._frame = frame;
        var image = new Image();
        image.src = _this._frame;
        var baseTexture = new PIXI.BaseTexture(image);
        var texture = new PIXI.Texture(baseTexture);
        _this._sprite = new PIXI.Sprite(texture);
        _this.position.set(position.x, position.y);
        return _this;
    }
    Object.defineProperty(Base64Sprite.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base64Sprite.prototype, "frame", {
        get: function () {
            return this._frame;
        },
        enumerable: true,
        configurable: true
    });
    return Base64Sprite;
}(PIXI.Sprite));
exports.Base64Sprite = Base64Sprite;
//# sourceMappingURL=Base64Sprite.js.map