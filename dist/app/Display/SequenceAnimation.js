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
var SequenceAnimation = (function (_super) {
    __extends(SequenceAnimation, _super);
    function SequenceAnimation(frame, length, position) {
        var _this = _super.call(this, SequenceAnimation.generateTextures(frame, length)) || this;
        _this.position.set(position.x, position.y);
        return _this;
    }
    SequenceAnimation.generateTextures = function (frame, length) {
        var textures = [];
        for (var i = 0; i < length; i++) {
            var texture = PIXI.Texture.from(frame + (i + 1 + ".png"));
            textures.push(texture);
        }
        return textures;
    };
    SequenceAnimation.setAnimation = function (currentFrame) {
        this.setAnimation(currentFrame);
    };
    return SequenceAnimation;
}(PIXI.extras.AnimatedSprite));
exports.SequenceAnimation = SequenceAnimation;
//# sourceMappingURL=SequenceAnimation.js.map