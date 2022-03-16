"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Stack(container) {
    var _this = this;
    if (container === void 0) { container = []; }
    var len = 0;
    var stack = [];
    this.size = function () {
        return len;
    };
    this.empty = function () {
        return len === 0;
    };
    this.clear = function () {
        len = 0;
        stack.length = 0;
    };
    this.push = function (element) {
        stack.push(element);
        ++len;
    };
    this.pop = function () {
        stack.pop();
        if (len > 0)
            --len;
    };
    this.top = function () {
        return stack[len - 1];
    };
    container.forEach(function (element) { return _this.push(element); });
    Object.freeze(this);
}
Object.freeze(Stack);
exports.default = Stack;
