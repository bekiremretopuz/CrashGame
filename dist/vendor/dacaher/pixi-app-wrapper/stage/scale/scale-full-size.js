"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScaleFullSize = (function () {
    function ScaleFullSize() {
    }
    ScaleFullSize.prototype.scale = function (initialWidth, initialHeight, finalWidth, finalHeight) {
        return {
            scaleX: finalWidth / initialWidth,
            scaleY: finalHeight / initialHeight,
        };
    };
    return ScaleFullSize;
}());
exports.ScaleFullSize = ScaleFullSize;
//# sourceMappingURL=scale-full-size.js.map