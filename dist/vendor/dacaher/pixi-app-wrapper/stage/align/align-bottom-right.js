"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignBottomRight = (function () {
    function AlignBottomRight() {
    }
    AlignBottomRight.prototype.align = function (width, height, containerWidth, containerHeight) {
        return {
            x: Math.round(containerWidth - width),
            y: Math.round(containerHeight - height),
        };
    };
    return AlignBottomRight;
}());
exports.AlignBottomRight = AlignBottomRight;
//# sourceMappingURL=align-bottom-right.js.map