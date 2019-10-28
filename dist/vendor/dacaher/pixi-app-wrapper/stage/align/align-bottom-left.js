"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignBottomLeft = (function () {
    function AlignBottomLeft() {
    }
    AlignBottomLeft.prototype.align = function (width, height, containerWidth, containerHeight) {
        return {
            x: 0,
            y: Math.round(containerHeight - height),
        };
    };
    return AlignBottomLeft;
}());
exports.AlignBottomLeft = AlignBottomLeft;
//# sourceMappingURL=align-bottom-left.js.map