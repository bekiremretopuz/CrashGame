"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignMiddleRight = (function () {
    function AlignMiddleRight() {
    }
    AlignMiddleRight.prototype.align = function (width, height, containerWidth, containerHeight) {
        return {
            x: Math.round(containerWidth - width),
            y: Math.round(containerHeight / 2 - height / 2),
        };
    };
    return AlignMiddleRight;
}());
exports.AlignMiddleRight = AlignMiddleRight;
//# sourceMappingURL=align-middle-right.js.map