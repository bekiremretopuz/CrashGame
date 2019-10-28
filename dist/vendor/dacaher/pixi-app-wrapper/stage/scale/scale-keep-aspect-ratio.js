"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScaleKeepAspectRatio = (function () {
    function ScaleKeepAspectRatio() {
    }
    ScaleKeepAspectRatio.prototype.scale = function (initialWidth, initialHeight, finalWidth, finalHeight) {
        var scale = Math.min(finalWidth / initialWidth, finalHeight / initialHeight);
        return { scaleX: scale, scaleY: scale };
    };
    return ScaleKeepAspectRatio;
}());
exports.ScaleKeepAspectRatio = ScaleKeepAspectRatio;
//# sourceMappingURL=scale-keep-aspect-ratio.js.map