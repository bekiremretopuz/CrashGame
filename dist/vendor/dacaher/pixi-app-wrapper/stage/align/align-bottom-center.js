"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignBottomCenter = (function () {
    function AlignBottomCenter() {
    }
    AlignBottomCenter.prototype.align = function (width, height, containerWidth, containerHeight) {
        return {
            x: Math.round(containerWidth / 2 - width / 2),
            y: Math.round(containerHeight - height),
        };
    };
    return AlignBottomCenter;
}());
exports.AlignBottomCenter = AlignBottomCenter;
//# sourceMappingURL=align-bottom-center.js.map