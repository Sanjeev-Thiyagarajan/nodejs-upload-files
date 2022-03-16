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
var Set_1 = require("../Set/Set");
var LinkList_1 = require("../LinkList/LinkList");
HashSet.initSize = (1 << 4);
HashSet.maxSize = (1 << 30);
HashSet.sigma = 0.75; // default load factor
HashSet.treeifyThreshold = 8;
HashSet.untreeifyThreshold = 6;
HashSet.minTreeifySize = 64;
/**
 * Note that resize is a time-consuming operation, please try to determine the number of buckets before use.
 * @param container Initialize the container
 * @param initBucketNum Initialize the bucket num
 * @param hashFunc Function to map elements to numbers
 * @constructor
 */
function HashSet(container, initBucketNum, hashFunc) {
    var _this = this;
    if (container === void 0) { container = []; }
    if (initBucketNum === void 0) { initBucketNum = HashSet.initSize; }
    hashFunc = hashFunc || (function (x) {
        var hashCode = 0;
        var str = '';
        if (typeof x === "number") {
            hashCode = Math.floor(x);
            hashCode = ((hashCode << 5) - hashCode);
            hashCode = hashCode & hashCode;
        }
        else {
            if (typeof x !== "string") {
                str = JSON.stringify(x);
            }
            else
                str = x;
            for (var i = 0; i < str.length; i++) {
                var character = str.charCodeAt(i);
                hashCode = ((hashCode << 5) - hashCode) + character;
                hashCode = hashCode & hashCode;
            }
        }
        hashCode ^= (hashCode >>> 16);
        return hashCode;
    });
    if ((initBucketNum & (initBucketNum - 1)) !== 0) {
        throw new Error("initBucketNum must be 2 to the power of n");
    }
    var len = 0;
    var hashTable = [];
    var bucketNum = Math.max(HashSet.initSize, Math.min(HashSet.maxSize, initBucketNum));
    this.size = function () {
        return len;
    };
    this.empty = function () {
        return len === 0;
    };
    this.clear = function () {
        len = 0;
        bucketNum = initBucketNum;
        hashTable = [];
    };
    this.forEach = function (callback) {
        var index = 0;
        hashTable.forEach(function (container) {
            container.forEach(function (element) {
                callback(element, index++);
            });
        });
    };
    var reAllocate = function (originalBucketNum) {
        if (originalBucketNum >= HashSet.maxSize)
            return;
        bucketNum = originalBucketNum * 2;
        var newHashTable = [];
        hashTable.forEach(function (container, index) {
            if (container.empty())
                return;
            if (container instanceof LinkList_1.default && container.size() === 1) {
                var element = container.front();
                if (element === undefined)
                    throw new Error("unknown error");
                newHashTable[hashFunc(element) & (bucketNum - 1)] = new LinkList_1.default([element]);
            }
            else if (container instanceof Set_1.default) {
                var lowList_1 = new LinkList_1.default();
                var highList_1 = new LinkList_1.default();
                container.forEach(function (element) {
                    var hashCode = hashFunc(element);
                    if ((hashCode & originalBucketNum) === 0) {
                        lowList_1.pushBack(element);
                    }
                    else
                        highList_1.pushBack(element);
                });
                if (lowList_1.size() > HashSet.untreeifyThreshold)
                    newHashTable[index] = new Set_1.default(lowList_1);
                else if (lowList_1.size())
                    newHashTable[index] = lowList_1;
                if (highList_1.size() > HashSet.untreeifyThreshold)
                    newHashTable[index + originalBucketNum] = new Set_1.default(highList_1);
                else if (highList_1.size())
                    newHashTable[index + originalBucketNum] = highList_1;
            }
            else {
                var lowList_2 = new LinkList_1.default();
                var highList_2 = new LinkList_1.default();
                container.forEach(function (element) {
                    var hashCode = hashFunc(element);
                    if ((hashCode & originalBucketNum) === 0) {
                        lowList_2.pushBack(element);
                    }
                    else
                        highList_2.pushBack(element);
                });
                if (lowList_2.size())
                    newHashTable[index] = lowList_2;
                if (highList_2.size())
                    newHashTable[index + originalBucketNum] = highList_2;
            }
            hashTable[index].clear();
        });
        hashTable = newHashTable;
    };
    this.insert = function (element) {
        if (element === null || element === undefined) {
            throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
        }
        var index = hashFunc(element) & (bucketNum - 1);
        if (!hashTable[index]) {
            hashTable[index] = new LinkList_1.default([element]);
            ++len;
        }
        else {
            var preSize = hashTable[index].size();
            if (hashTable[index] instanceof LinkList_1.default) {
                if (hashTable[index].find(element))
                    return;
                hashTable[index].pushBack(element);
                if (hashTable[index].size() >= HashSet.treeifyThreshold) {
                    hashTable[index] = new Set_1.default(hashTable[index]);
                }
            }
            else
                hashTable[index].insert(element);
            var curSize = hashTable[index].size();
            len += curSize - preSize;
        }
        if (len > bucketNum * HashSet.sigma) {
            reAllocate.call(this, bucketNum);
        }
    };
    this.eraseElementByValue = function (element) {
        var index = hashFunc(element) & (bucketNum - 1);
        if (!hashTable[index])
            return;
        var preSize = hashTable[index].size();
        hashTable[index].eraseElementByValue(element);
        if (hashTable[index] instanceof Set_1.default) {
            if (hashTable[index].size() <= HashSet.untreeifyThreshold) {
                hashTable[index] = new LinkList_1.default(hashTable[index]);
            }
        }
        var curSize = hashTable[index].size();
        len += curSize - preSize;
    };
    this.find = function (element) {
        var index = hashFunc(element) & (bucketNum - 1);
        if (!hashTable[index])
            return false;
        return hashTable[index].find(element);
    };
    this[Symbol.iterator] = function () {
        return (function () {
            var index, _a, _b, element, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        index = 0;
                        _d.label = 1;
                    case 1:
                        if (!(index < bucketNum)) return [3 /*break*/, 10];
                        while (index < bucketNum && !hashTable[index])
                            ++index;
                        if (index >= bucketNum)
                            return [3 /*break*/, 10];
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 9]);
                        _a = (e_1 = void 0, __values(hashTable[index])), _b = _a.next();
                        _d.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        element = _b.value;
                        return [4 /*yield*/, element];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        ++index;
                        return [3 /*break*/, 1];
                    case 10: return [2 /*return*/];
                }
            });
        })();
    };
    container.forEach(function (element) { return _this.insert(element); });
    Object.freeze(this);
}
Object.freeze(HashSet);
exports.default = HashSet;
