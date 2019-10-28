"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignTopRight = (function () {
    function AlignTopRight() {
    }
    AlignTopRight.prototype.align = function (width, height, containerWidth, containerHeight) {
        return {
            x: Math.round(containerWidth - width),
            y: 0,
        };
    };
    return AlignTopRight;
}());
exports.AlignTopRight = AlignTopRight;
//# sourceMappingURL=align-top-right.js.map