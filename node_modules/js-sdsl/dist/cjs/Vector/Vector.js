"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
function Vector(container) {
    var _this = this;
    if (container === void 0) { container = []; }
    var len = 0;
    var vector = [];
    this.size = function () {
        return len;
    };
    this.empty = function () {
        return len === 0;
    };
    this.clear = function () {
        len = 0;
        vector.length = 0;
    };
    this.front = function () {
        if (this.empty())
            return undefined;
        return vector[0];
    };
    this.back = function () {
        if (this.empty())
            return undefined;
        return vector[len - 1];
    };
    this.forEach = function (callback) {
        vector.forEach(callback);
    };
    this.getElementByPos = function (pos) {
        if (pos < 0 || pos >= len)
            throw new Error("pos must more than 0 and less than vector's size");
        return vector[pos];
    };
    this.eraseElementByPos = function (pos) {
        if (pos < 0 || pos >= len)
            throw new Error("pos must more than 0 and less than vector's size");
        for (var i = pos; i < len - 1; ++i)
            vector[i] = vector[i + 1];
        this.popBack();
    };
    this.eraseElementByValue = function (value) {
        var newArr = [];
        this.forEach(function (element) {
            if (element !== value)
                newArr.push(element);
        });
        newArr.forEach(function (element, index) {
            vector[index] = element;
        });
        var newLen = newArr.length;
        while (len > newLen)
            this.popBack();
    };
    this.pushBack = function (element) {
        vector.push(element);
        ++len;
    };
    this.popBack = function () {
        vector.pop();
        if (len > 0)
            --len;
    };
    this.setElementByPos = function (pos, element) {
        if (pos < 0 || pos >= len)
            throw new Error("pos must more than 0 and less than vector's size");
        vector[pos] = element;
    };
    this.insert = function (pos, element, num) {
        if (num === void 0) { num = 1; }
        if (pos < 0 || pos > len)
            throw new Error("pos must more than 0 and less than or equal to vector's size");
        vector.splice.apply(vector, __spreadArray([pos, 0], __read(new Array(num).fill(element)), false));
        len += num;
    };
    this.find = function (element) {
        return vector.includes(element);
    };
    this.reverse = function () {
        vector.reverse();
    };
    this.unique = function () {
        var pre;
        var newArr = [];
        this.forEach(function (element, index) {
            if (index === 0 || element !== pre) {
                newArr.push(element);
                pre = element;
            }
        });
        newArr.forEach(function (element, index) {
            vector[index] = element;
        });
        var newLen = newArr.length;
        while (len > newLen)
            this.popBack();
    };
    this.sort = function (cmp) {
        vector.sort(cmp);
    };
    this[Symbol.iterator] = function () {
        return (function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [5 /*yield**/, __values(vector)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        })();
    };
    container.forEach(function (element) { return _this.pushBack(element); });
    Object.freeze(this);
}
Object.freeze(Vector);
exports.default = Vector;
