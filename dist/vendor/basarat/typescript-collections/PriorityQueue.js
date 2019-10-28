"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("./util");
var Heap_1 = require("./Heap");
var PriorityQueue = (function () {
    function PriorityQueue(compareFunction) {
        this.heap = new Heap_1.default(util.reverseCompareFunction(compareFunction));
    }
    PriorityQueue.prototype.enqueue = function (element) {
        return this.heap.add(element);
    };
    PriorityQueue.prototype.add = function (element) {
        return this.heap.add(element);
    };
    PriorityQueue.prototype.dequeue = function () {
        if (this.heap.size() !== 0) {
            var el = this.heap.peek();
            this.heap.removeRoot();
            return el;
        }
        return undefined;
    };
    PriorityQueue.prototype.peek = function () {
        return this.heap.peek();
    };
    PriorityQueue.prototype.contains = function (element) {
        return this.heap.contains(element);
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this.heap.isEmpty();
    };
    PriorityQueue.prototype.size = function () {
        return this.heap.size();
    };
    PriorityQueue.prototype.clear = function () {
        this.heap.clear();
    };
    PriorityQueue.prototype.forEach = function (callback) {
        this.heap.forEach(callback);
    };
    return PriorityQueue;
}());
exports.default = PriorityQueue;
//# sourceMappingURL=PriorityQueue.js.map