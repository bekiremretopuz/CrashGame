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
require("pixi-spine");
var Spine = (function (_super) {
    __extends(Spine, _super);
    function Spine(spine, position, anchor, animationName) {
        var _this = _super.call(this, spine.spineData) || this;
        _this._animationName = [];
        _this._animationName = animationName.name;
        _this.state.timeScale = 1;
        _this.position.set(position.x, position.y);
        return _this;
    }
    Spine.prototype.reversePlayAnimation = function (animationName, loop) {
    };
    Spine.prototype.playAnimation = function (animationName, timeScale, loop) {
        this.state.timeScale = timeScale;
        this.state.setAnimation(0, animationName, loop);
    };
    Spine.prototype.setMixAll = function (duration) {
        for (var i = 0; i < this.animationName.length; i++) {
            this.stateData.setMix(this.animationName()[i], this.animationName()[i++], duration);
        }
    };
    Spine.prototype.setMix = function (fromName, toName, duration) {
        this.stateData.setMix(fromName, toName, duration);
    };
    Spine.prototype.animationName = function () {
        return this._animationName;
    };
    Spine.prototype.trackLast = function () {
        return this.state.tracks[0].trackLast;
    };
    return Spine;
}(PIXI.spine.Spine));
exports.Spine = Spine;
//# sourceMappingURL=Spine.js.map