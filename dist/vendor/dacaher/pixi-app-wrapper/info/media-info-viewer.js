"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pixi_app_wrapper_1 = require("pixi-app-wrapper");
require("../util/math");
var MediaInfoViewer = (function () {
    function MediaInfoViewer() {
        this.createContainer();
    }
    MediaInfoViewer.prototype.update = function (newData) {
        this.data = newData;
        this.textContainer.innerHTML = this.getText();
    };
    MediaInfoViewer.prototype.show = function () {
        this.rootContainer.className = this.rootContainer.className.replace("hidden", "").trim();
    };
    MediaInfoViewer.prototype.hide = function () {
        this.show();
        this.rootContainer.className += " hidden";
    };
    MediaInfoViewer.prototype.createContainer = function () {
        this.rootContainer = pixi_app_wrapper_1.Dom.getElementOrCreateNew("media-info", "div");
        this.rootContainer.className = "media-info";
        var closeBtn = document.createElement("button");
        closeBtn.innerHTML = "[x]";
        closeBtn.className = "media-info-close-button button";
        closeBtn.title = "close";
        closeBtn.onclick = this.hide.bind(this);
        this.rootContainer.appendChild(closeBtn);
        this.textContainer = document.createElement("div");
        this.rootContainer.appendChild(this.textContainer);
    };
    MediaInfoViewer.prototype.getText = function () {
        var stageInitialGCD = Math.gcd(this.data.display.stage.initialWidth, this.data.display.stage.initialHeight);
        return "" +
            "<div>[devicePixelRatio]</div>" +
            ("<div>" + window.devicePixelRatio + "</div>") +
            "<div>[window.inner]</div>" +
            ("<div>" + window.innerWidth + "x" + window.innerHeight + "</div>") +
            "<div>[app.screen]</div>" +
            ("<div>" + this.data.display.screen.width + "x" + this.data.display.screen.height + "</div>") +
            "<div>[app.view]</div>" +
            ("<div>" + this.data.display.view.width + "x" + this.data.display.view.height + "</div>") +
            "<div>[app.stage]</div>" +
            ("<div>position (" + this.data.display.stage.x + ", " + this.data.display.stage.y + ")</div>") +
            ("<div>initial " + this.data.display.stage.initialWidth + "x" + this.data.display.stage.initialHeight + " " + this.data.display.stage.initialWidth / stageInitialGCD + ":" + this.data.display.stage.initialHeight / stageInitialGCD + "</div>") +
            ("<div>current " + this.data.display.stage.currentWidth + "x" + this.data.display.stage.currentHeight + "</div>") +
            ("<div>scale (" + this.data.display.stage.scaleX + ", " + this.data.display.stage.scaleY + ")</div>") +
            ("<div>scaling " + this.data.display.stage.scaling + "</div>") +
            ("<div>alignment " + this.data.display.stage.alignment + "</div>") +
            ("<div>orientation " + this.data.display.stage.orientation + "</div>");
    };
    return MediaInfoViewer;
}());
exports.MediaInfoViewer = MediaInfoViewer;
//# sourceMappingURL=media-info-viewer.js.map