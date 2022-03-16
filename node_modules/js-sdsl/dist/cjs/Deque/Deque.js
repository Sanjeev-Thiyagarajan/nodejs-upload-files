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
Object.defineProperty(exports, "__esModule", { value: true });
Deque.sigma = 3; // growth factor
Deque.bucketSize = 5000;
function Deque(container) {
    var _this = this;
    if (container === void 0) { container = []; }
    var map = [];
    var first = 0;
    var curFirst = 0;
    var last = 0;
    var curLast = 0;
    var bucketNum = 0;
    var len = 0;
    this.size = function () {
        return len;
    };
    this.empty = function () {
        return len === 0;
    };
    this.clear = function () {
        first = last = curFirst = curLast = bucketNum = len = 0;
        reAllocate.call(this, Deque.bucketSize);
        len = 0;
    };
    this.front = function () {
        return map[first][curFirst];
    };
    this.back = function () {
        return map[last][curLast];
    };
    this.forEach = function (callback) {
        if (this.empty())
            return;
        var index = 0;
        if (first === last) {
            for (var i = curFirst; i <= curLast; ++i) {
                callback(map[first][i], index++);
            }
            return;
        }
        for (var i = curFirst; i < Deque.bucketSize; ++i) {
            callback(map[first][i], index++);
        }
        for (var i = first + 1; i < last; ++i) {
            for (var j = 0; j < Deque.bucketSize; ++j) {
                callback(map[i][j], index++);
            }
        }
        for (var i = 0; i <= curLast; ++i) {
            callback(map[last][i], index++);
        }
    };
    var getElementIndex = function (pos) {
        var curFirstIndex = first * Deque.bucketSize + curFirst;
        var curNodeIndex = curFirstIndex + pos;
        var curLastIndex = last * Deque.bucketSize + curLast;
        if (curNodeIndex < curFirstIndex || curNodeIndex > curLastIndex)
            throw new Error("pos should more than 0 and less than queue's size");
        var curNodeBucketIndex = Math.floor(curNodeIndex / Deque.bucketSize);
        var curNodePointerIndex = curNodeIndex % Deque.bucketSize;
        return { curNodeBucketIndex: curNodeBucketIndex, curNodePointerIndex: curNodePointerIndex };
    };
    /**
     * @param pos index from 0 to size - 1
     */
    this.getElementByPos = function (pos) {
        var _a = getElementIndex(pos), curNodeBucketIndex = _a.curNodeBucketIndex, curNodePointerIndex = _a.curNodePointerIndex;
        return map[curNodeBucketIndex][curNodePointerIndex];
    };
    this.eraseElementByPos = function (pos) {
        var _this = this;
        if (pos < 0 || pos > len)
            throw new Error("pos should more than 0 and less than queue's size");
        if (pos === 0)
            this.popFront();
        else if (pos === this.size())
            this.popBack();
        else {
            var arr = [];
            for (var i = pos + 1; i < len; ++i) {
                arr.push(this.getElementByPos(i));
            }
            this.cut(pos);
            this.popBack();
            arr.forEach(function (element) { return _this.pushBack(element); });
        }
    };
    this.eraseElementByValue = function (value) {
        if (this.empty())
            return;
        var arr = [];
        this.forEach(function (element) {
            if (element !== value) {
                arr.push(element);
            }
        });
        var _len = arr.length;
        for (var i = 0; i < _len; ++i)
            this.setElementByPos(i, arr[i]);
        this.cut(_len - 1);
    };
    var reAllocate = function (originalSize) {
        var newMap = [];
        var needSize = originalSize * Deque.sigma;
        var newBucketNum = Math.max(Math.ceil(needSize / Deque.bucketSize), 2);
        for (var i = 0; i < newBucketNum; ++i) {
            newMap.push(new Array(Deque.bucketSize));
        }
        var needBucketNum = Math.ceil(originalSize / Deque.bucketSize);
        var newFirst = Math.floor(newBucketNum / 2) - Math.floor(needBucketNum / 2);
        var newLast = newFirst, newCurLast = 0;
        if (this.size()) {
            for (var i = 0; i < needBucketNum; ++i) {
                for (var j = 0; j < Deque.bucketSize; ++j) {
                    newMap[newFirst + i][j] = this.front();
                    this.popFront();
                    if (this.empty()) {
                        newLast = newFirst + i;
                        newCurLast = j;
                        break;
                    }
                }
                if (this.empty())
                    break;
            }
        }
        map = newMap;
        first = newFirst;
        curFirst = 0;
        last = newLast;
        curLast = newCurLast;
        bucketNum = newBucketNum;
        len = originalSize;
    };
    this.pushBack = function (element) {
        if (!this.empty()) {
            if (last === bucketNum - 1 && curLast === Deque.bucketSize - 1) {
                reAllocate.call(this, this.size());
            }
            if (curLast < Deque.bucketSize - 1) {
                ++curLast;
            }
            else if (last < bucketNum - 1) {
                ++last;
                curLast = 0;
            }
        }
        ++len;
        map[last][curLast] = element;
    };
    this.popBack = function () {
        if (this.empty())
            return;
        if (this.size() !== 1) {
            if (curLast > 0) {
                --curLast;
            }
            else if (first < last) {
                --last;
                curLast = Deque.bucketSize - 1;
            }
        }
        if (len > 0)
            --len;
    };
    this.setElementByPos = function (pos, element) {
        var _a = getElementIndex(pos), curNodeBucketIndex = _a.curNodeBucketIndex, curNodePointerIndex = _a.curNodePointerIndex;
        map[curNodeBucketIndex][curNodePointerIndex] = element;
    };
    /**
     * @param {number} pos insert element before pos, should in [0, queue.size]
     * @param {any} element the element you want to insert
     * @param {number} [num = 1] the nums you want to insert
     */
    this.insert = function (pos, element, num) {
        var _this = this;
        if (num === void 0) { num = 1; }
        if (pos === 0) {
            while (num--)
                this.pushFront(element);
        }
        else if (pos === this.size()) {
            while (num--)
                this.pushBack(element);
        }
        else {
            var arr = [];
            for (var i = pos; i < len; ++i) {
                arr.push(this.getElementByPos(i));
            }
            this.cut(pos - 1);
            for (var i = 0; i < num; ++i)
                this.pushBack(element);
            arr.forEach(function (element) { return _this.pushBack(element); });
        }
    };
    this.find = function (element) {
        if (first === last) {
            for (var i = curFirst; i <= curLast; ++i) {
                if (map[first][i] === element)
                    return true;
            }
            return false;
        }
        for (var i = curFirst; i < Deque.bucketSize; ++i) {
            if (map[first][i] === element)
                return true;
        }
        for (var i = first + 1; i < last; ++i) {
            for (var j = 0; j < Deque.bucketSize; ++j) {
                if (map[i][j] === element)
                    return true;
            }
        }
        for (var i = 0; i <= curLast; ++i) {
            if (map[last][i] === element)
                return true;
        }
        return false;
    };
    this.reverse = function () {
        var l = 0, r = len - 1;
        while (l < r) {
            var tmp = this.getElementByPos(l);
            this.setElementByPos(l, this.getElementByPos(r));
            this.setElementByPos(r, tmp);
            ++l;
            --r;
        }
    };
    this.unique = function () {
        if (this.empty())
            return;
        var arr = [];
        var pre = this.front();
        this.forEach(function (element, index) {
            if (index === 0 || element !== pre) {
                arr.push(element);
                pre = element;
            }
        });
        for (var i = 0; i < len; ++i) {
            this.setElementByPos(i, arr[i]);
        }
        this.cut(arr.length - 1);
    };
    this.sort = function (cmp) {
        var arr = [];
        this.forEach(function (element) {
            arr.push(element);
        });
        arr.sort(cmp);
        for (var i = 0; i < len; ++i)
            this.setElementByPos(i, arr[i]);
    };
    this.pushFront = function (element) {
        if (!this.empty()) {
            if (first === 0 && curFirst === 0) {
                reAllocate.call(this, this.size());
            }
            if (curFirst > 0) {
                --curFirst;
            }
            else if (first > 0) {
                --first;
                curFirst = Deque.bucketSize - 1;
            }
        }
        ++len;
        map[first][curFirst] = element;
    };
    this.popFront = function () {
        if (this.empty())
            return;
        if (this.size() !== 1) {
            if (curFirst < Deque.bucketSize - 1) {
                ++curFirst;
            }
            else if (first < last) {
                ++first;
                curFirst = 0;
            }
        }
        if (len > 0)
            --len;
    };
    /**
     * reduces memory usage by freeing unused memory
     */
    this.shrinkToFit = function () {
        var _this = this;
        var arr = [];
        this.forEach(function (element) {
            arr.push(element);
        });
        var _len = arr.length;
        map = [];
        var bucketNum = Math.ceil(_len / Deque.bucketSize);
        for (var i = 0; i < bucketNum; ++i) {
            map.push(new Array(Deque.bucketSize));
        }
        this.clear();
        arr.forEach(function (element) { return _this.pushBack(element); });
    };
    /**
     * @param pos cut elements after pos
     */
    this.cut = function (pos) {
        if (pos < 0) {
            this.clear();
            return;
        }
        var _a = getElementIndex(pos), curNodeBucketIndex = _a.curNodeBucketIndex, curNodePointerIndex = _a.curNodePointerIndex;
        last = curNodeBucketIndex;
        curLast = curNodePointerIndex;
        len = pos + 1;
    };
    this[Symbol.iterator] = function () {
        return (function () {
            var i, i, i, j, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (len === 0)
                            return [2 /*return*/];
                        if (!(first === last)) return [3 /*break*/, 5];
                        i = curFirst;
                        _a.label = 1;
                    case 1:
                        if (!(i <= curLast)) return [3 /*break*/, 4];
                        return [4 /*yield*/, map[first][i]];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                    case 5:
                        i = curFirst;
                        _a.label = 6;
                    case 6:
                        if (!(i < Deque.bucketSize)) return [3 /*break*/, 9];
                        return [4 /*yield*/, map[first][i]];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        ++i;
                        return [3 /*break*/, 6];
                    case 9:
                        i = first + 1;
                        _a.label = 10;
                    case 10:
                        if (!(i < last)) return [3 /*break*/, 15];
                        j = 0;
                        _a.label = 11;
                    case 11:
                        if (!(j < Deque.bucketSize)) return [3 /*break*/, 14];
                        return [4 /*yield*/, map[i][j]];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        ++j;
                        return [3 /*break*/, 11];
                    case 14:
                        ++i;
                        return [3 /*break*/, 10];
                    case 15:
                        i = 0;
                        _a.label = 16;
                    case 16:
                        if (!(i <= curLast)) return [3 /*break*/, 19];
                        return [4 /*yield*/, map[last][i]];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18:
                        ++i;
                        return [3 /*break*/, 16];
                    case 19: return [2 /*return*/];
                }
            });
        })();
    };
    (function () {
        var _len = Deque.bucketSize;
        if (container.size) {
            _len = container.size();
        }
        else if (container.length) {
            _len = container.length;
        }
        var needSize = _len * Deque.sigma;
        bucketNum = Math.ceil(needSize / Deque.bucketSize);
        bucketNum = Math.max(bucketNum, 3);
        for (var i = 0; i < bucketNum; ++i) {
            map.push(new Array(Deque.bucketSize));
        }
        var needBucketNum = Math.ceil(_len / Deque.bucketSize);
        first = Math.floor(bucketNum / 2) - Math.floor(needBucketNum / 2);
        last = first;
        container.forEach(function (element) { return _this.pushBack(element); });
    })();
    Object.freeze(this);
}
Object.freeze(Deque);
exports.default = Deque;
