"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkList_1 = require("../LinkList/LinkList");
function Queue(container) {
    if (container === void 0) { container = []; }
    var queue = new LinkList_1.default(container);
    this.size = function () {
        return queue.size();
    };
    this.empty = function () {
        return queue.empty();
    };
    this.clear = function () {
        queue.clear();
    };
    this.push = function (element) {
        queue.pushBack(element);
    };
    this.pop = function () {
        queue.popFront();
    };
    this.front = function () {
        return queue.front();
    };
    Object.freeze(this);
}
Object.freeze(Queue);
exports.default = Queue;
