"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignMiddleLeft = (function () {
    function AlignMiddleLeft() {
    }
    AlignMiddleLeft.prototype.align = function (width, height, containerWidth, containerHeight) {
        return {
            x: 0,
            y: Math.round(containerHeight / 2 - height / 2),
        };
    };
    return AlignMiddleLeft;
}());
exports.AlignMiddleLeft = AlignMiddleLeft;
//# sourceMappingURL=align-middle-left.js.map