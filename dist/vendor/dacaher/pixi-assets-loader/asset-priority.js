"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssetPriority = (function () {
    function AssetPriority() {
    }
    AssetPriority.getPriority = function (priority) {
        if (priority >= AssetPriority.HIGHEST) {
            return AssetPriority.HIGHEST;
        }
        else if (priority >= AssetPriority.HIGH) {
            return AssetPriority.HIGH;
        }
        else if (priority >= AssetPriority.NORMAL) {
            return AssetPriority.NORMAL;
        }
        else if (priority >= AssetPriority.LOW) {
            return AssetPriority.LOW;
        }
        else {
            return AssetPriority.LOWEST;
        }
    };
    AssetPriority.HIGHEST = 100;
    AssetPriority.HIGH = 75;
    AssetPriority.NORMAL = 50;
    AssetPriority.LOW = 25;
    AssetPriority.LOWEST = 0;
    return AssetPriority;
}());
exports.AssetPriority = AssetPriority;
//# sourceMappingURL=asset-priority.js.map