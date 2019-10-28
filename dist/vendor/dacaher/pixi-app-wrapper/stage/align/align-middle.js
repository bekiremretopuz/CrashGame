"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlignMiddle = (function () {
    function AlignMiddle() {
    }
    AlignMiddle.prototype.align = function (width, height, containerWidth, containerHeight) {
        return {
            x: Math.round(containerWidth / 2 - width / 2),
            y: Math.round(containerHeight / 2 - height / 2),
        };
    };
    return AlignMiddle;
}());
exports.AlignMiddle = AlignMiddle;
//# sourceMappingURL=align-middle.js.map