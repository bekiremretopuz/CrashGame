"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignTopCenter = (function () {
    function AlignTopCenter() {
    }
    AlignTopCenter.prototype.align = function (width, height, containerWidth, containerHeight) {
        return {
            x: Math.round(containerWidth / 2 - width / 2),
            y: 0,
        };
    };
    return AlignTopCenter;
}());
exports.AlignTopCenter = AlignTopCenter;
//# sourceMappingURL=align-top-center.js.map