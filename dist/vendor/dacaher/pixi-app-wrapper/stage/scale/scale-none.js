"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScaleNone = (function () {
    function ScaleNone() {
    }
    ScaleNone.prototype.scale = function (initialWidth, initialHeight, finalWidth, finalHeight) {
        return {
            scaleX: 1,
            scaleY: 1,
        };
    };
    return ScaleNone;
}());
exports.ScaleNone = ScaleNone;
//# sourceMappingURL=scale-none.js.map