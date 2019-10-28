"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dom = (function () {
    function Dom() {
    }
    Dom.getElementOrBody = function (elementId) {
        var element = document.getElementById(elementId);
        if (element !== null) {
            return element;
        }
        else {
            return document.body;
        }
    };
    Dom.getElementOrCreateNew = function (elementId, tagName, container) {
        var element = document.getElementById(elementId);
        if (element === null) {
            element = document.createElement(tagName);
            element.id = elementId;
            container = container ? container : document.body;
            container.appendChild(element);
        }
        return element;
    };
    return Dom;
}());
exports.Dom = Dom;
//# sourceMappingURL=dom.js.map