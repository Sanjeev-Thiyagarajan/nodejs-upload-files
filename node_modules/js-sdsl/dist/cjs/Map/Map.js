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
var TreeNode_1 = require("../Base/TreeNode");
function Map(container, cmp) {
    var _this = this;
    if (container === void 0) { container = []; }
    cmp = cmp || (function (x, y) {
        if (x < y)
            return -1;
        if (x > y)
            return 1;
        return 0;
    });
    var len = 0;
    var root = new TreeNode_1.default();
    root.color = TreeNode_1.default.TreeNodeColorType.black;
    this.size = function () {
        return len;
    };
    this.empty = function () {
        return len === 0;
    };
    this.clear = function () {
        len = 0;
        root.key = root.value = undefined;
        root.leftChild = root.rightChild = root.brother = undefined;
    };
    var findSubTreeMinNode = function (curNode) {
        if (!curNode || curNode.key === undefined)
            throw new Error("unknown error");
        return curNode.leftChild ? findSubTreeMinNode(curNode.leftChild) : curNode;
    };
    var findSubTreeMaxNode = function (curNode) {
        if (!curNode || curNode.key === undefined)
            throw new Error("unknown error");
        return curNode.rightChild ? findSubTreeMaxNode(curNode.rightChild) : curNode;
    };
    this.front = function () {
        if (this.empty())
            return undefined;
        var minNode = findSubTreeMinNode(root);
        if (minNode.key === undefined || minNode.value === undefined)
            throw new Error("unknown error");
        return {
            key: minNode.key,
            value: minNode.value
        };
    };
    this.back = function () {
        if (this.empty())
            return undefined;
        var maxNode = findSubTreeMaxNode(root);
        if (maxNode.key === undefined || maxNode.value === undefined)
            throw new Error("unknown error");
        return {
            key: maxNode.key,
            value: maxNode.value
        };
    };
    this.forEach = function (callback) {
        var e_1, _a;
        var index = 0;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pair = _c.value;
                callback(pair, index++);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    this.getElementByPos = function (pos) {
        var e_2, _a;
        if (pos < 0 || pos >= this.size())
            throw new Error("pos must more than 0 and less than set's size");
        var index = 0;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var pair = _c.value;
                if (index === pos)
                    return pair;
                ++index;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        throw new Error("unknown Error");
    };
    var _lowerBound = function (curNode, key) {
        if (!curNode || curNode.key === undefined || curNode.value === undefined)
            return undefined;
        var cmpResult = cmp(curNode.key, key);
        if (cmpResult === 0)
            return { key: curNode.key, value: curNode.value };
        if (cmpResult < 0)
            return _lowerBound(curNode.rightChild, key);
        return _lowerBound(curNode.leftChild, key) || {
            key: curNode.key,
            value: curNode.value
        };
    };
    this.lowerBound = function (key) {
        return _lowerBound(root, key);
    };
    var _upperBound = function (curNode, key) {
        if (!curNode || curNode.key === undefined || curNode.value === undefined)
            return undefined;
        var cmpResult = cmp(curNode.key, key);
        if (cmpResult <= 0)
            return _upperBound(curNode.rightChild, key);
        return _upperBound(curNode.leftChild, key) || {
            key: curNode.key,
            value: curNode.value
        };
    };
    this.upperBound = function (key) {
        return _upperBound(root, key);
    };
    var _reverseLowerBound = function (curNode, key) {
        if (!curNode || curNode.key === undefined || curNode.value === undefined)
            return undefined;
        var cmpResult = cmp(curNode.key, key);
        if (cmpResult === 0)
            return { key: curNode.key, value: curNode.value };
        if (cmpResult > 0)
            return _reverseLowerBound(curNode.leftChild, key);
        return _reverseLowerBound(curNode.rightChild, key) || {
            key: curNode.key,
            value: curNode.value
        };
    };
    this.reverseLowerBound = function (key) {
        return _reverseLowerBound(root, key);
    };
    var _reverseUpperBound = function (curNode, key) {
        if (!curNode || curNode.key === undefined || curNode.value === undefined)
            return undefined;
        var cmpResult = cmp(curNode.key, key);
        if (cmpResult >= 0)
            return _reverseUpperBound(curNode.leftChild, key);
        return _reverseUpperBound(curNode.rightChild, key) || {
            key: curNode.key,
            value: curNode.value
        };
    };
    this.reverseUpperBound = function (key) {
        return _reverseUpperBound(root, key);
    };
    var eraseNodeSelfBalance = function (curNode) {
        var parentNode = curNode.parent;
        if (!parentNode) {
            if (curNode === root)
                return;
            throw new Error("unknown error");
        }
        if (curNode.color === TreeNode_1.default.TreeNodeColorType.red) {
            curNode.color = TreeNode_1.default.TreeNodeColorType.black;
            return;
        }
        var brotherNode = curNode.brother;
        if (!brotherNode)
            throw new Error("unknown error");
        if (curNode === parentNode.leftChild) {
            if (brotherNode.color === TreeNode_1.default.TreeNodeColorType.red) {
                brotherNode.color = TreeNode_1.default.TreeNodeColorType.black;
                parentNode.color = TreeNode_1.default.TreeNodeColorType.red;
                var newRoot = parentNode.rotateLeft();
                if (root === parentNode)
                    root = newRoot;
                eraseNodeSelfBalance(curNode);
            }
            else if (brotherNode.color === TreeNode_1.default.TreeNodeColorType.black) {
                if (brotherNode.rightChild && brotherNode.rightChild.color === TreeNode_1.default.TreeNodeColorType.red) {
                    brotherNode.color = parentNode.color;
                    parentNode.color = TreeNode_1.default.TreeNodeColorType.black;
                    if (brotherNode.rightChild)
                        brotherNode.rightChild.color = TreeNode_1.default.TreeNodeColorType.black;
                    var newRoot = parentNode.rotateLeft();
                    if (root === parentNode)
                        root = newRoot;
                    curNode.color = TreeNode_1.default.TreeNodeColorType.black;
                }
                else if ((!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode_1.default.TreeNodeColorType.black) && brotherNode.leftChild && brotherNode.leftChild.color === TreeNode_1.default.TreeNodeColorType.red) {
                    brotherNode.color = TreeNode_1.default.TreeNodeColorType.red;
                    if (brotherNode.leftChild)
                        brotherNode.leftChild.color = TreeNode_1.default.TreeNodeColorType.black;
                    var newRoot = brotherNode.rotateRight();
                    if (root === brotherNode)
                        root = newRoot;
                    eraseNodeSelfBalance(curNode);
                }
                else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode_1.default.TreeNodeColorType.black) && (!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode_1.default.TreeNodeColorType.black)) {
                    brotherNode.color = TreeNode_1.default.TreeNodeColorType.red;
                    eraseNodeSelfBalance(parentNode);
                }
            }
        }
        else if (curNode === parentNode.rightChild) {
            if (brotherNode.color === TreeNode_1.default.TreeNodeColorType.red) {
                brotherNode.color = TreeNode_1.default.TreeNodeColorType.black;
                parentNode.color = TreeNode_1.default.TreeNodeColorType.red;
                var newRoot = parentNode.rotateRight();
                if (root === parentNode)
                    root = newRoot;
                eraseNodeSelfBalance(curNode);
            }
            else if (brotherNode.color === TreeNode_1.default.TreeNodeColorType.black) {
                if (brotherNode.leftChild && brotherNode.leftChild.color === TreeNode_1.default.TreeNodeColorType.red) {
                    brotherNode.color = parentNode.color;
                    parentNode.color = TreeNode_1.default.TreeNodeColorType.black;
                    if (brotherNode.leftChild)
                        brotherNode.leftChild.color = TreeNode_1.default.TreeNodeColorType.black;
                    var newRoot = parentNode.rotateRight();
                    if (root === parentNode)
                        root = newRoot;
                    curNode.color = TreeNode_1.default.TreeNodeColorType.black;
                }
                else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode_1.default.TreeNodeColorType.black) && brotherNode.rightChild && brotherNode.rightChild.color === TreeNode_1.default.TreeNodeColorType.red) {
                    brotherNode.color = TreeNode_1.default.TreeNodeColorType.red;
                    if (brotherNode.rightChild)
                        brotherNode.rightChild.color = TreeNode_1.default.TreeNodeColorType.black;
                    var newRoot = brotherNode.rotateLeft();
                    if (root === brotherNode)
                        root = newRoot;
                    eraseNodeSelfBalance(curNode);
                }
                else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode_1.default.TreeNodeColorType.black) && (!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode_1.default.TreeNodeColorType.black)) {
                    brotherNode.color = TreeNode_1.default.TreeNodeColorType.red;
                    eraseNodeSelfBalance(parentNode);
                }
            }
        }
    };
    var eraseNode = function (curNode) {
        var swapNode = curNode;
        while (swapNode.leftChild || swapNode.rightChild) {
            if (swapNode.rightChild) {
                swapNode = findSubTreeMinNode(swapNode.rightChild);
                var tmpKey = curNode.key;
                curNode.key = swapNode.key;
                swapNode.key = tmpKey;
                var tmpValue = curNode.value;
                curNode.value = swapNode.value;
                swapNode.value = tmpValue;
                curNode = swapNode;
            }
            if (swapNode.leftChild) {
                swapNode = findSubTreeMaxNode(swapNode.leftChild);
                var tmpKey = curNode.key;
                curNode.key = swapNode.key;
                swapNode.key = tmpKey;
                var tmpValue = curNode.value;
                curNode.value = swapNode.value;
                swapNode.value = tmpValue;
                curNode = swapNode;
            }
        }
        eraseNodeSelfBalance(swapNode);
        if (swapNode)
            swapNode.remove();
        --len;
        root.color = TreeNode_1.default.TreeNodeColorType.black;
    };
    var inOrderTraversal = function (curNode, callback) {
        if (!curNode || curNode.key === undefined)
            return false;
        var ifReturn = inOrderTraversal(curNode.leftChild, callback);
        if (ifReturn)
            return true;
        if (callback(curNode))
            return true;
        return inOrderTraversal(curNode.rightChild, callback);
    };
    this.eraseElementByPos = function (pos) {
        if (pos < 0 || pos >= len)
            throw new Error("pos must more than 0 and less than set's size");
        var index = 0;
        inOrderTraversal(root, function (curNode) {
            if (pos === index) {
                eraseNode(curNode);
                return true;
            }
            ++index;
            return false;
        });
    };
    this.eraseElementByKey = function (key) {
        if (this.empty())
            return;
        var curNode = findElementPos(root, key);
        if (curNode === undefined || curNode.key === undefined || cmp(curNode.key, key) !== 0)
            return;
        eraseNode(curNode);
    };
    var findInsertPos = function (curNode, element) {
        if (!curNode || curNode.key === undefined)
            throw new Error("unknown error");
        var cmpResult = cmp(element, curNode.key);
        if (cmpResult < 0) {
            if (!curNode.leftChild) {
                curNode.leftChild = new TreeNode_1.default();
                curNode.leftChild.parent = curNode;
                curNode.leftChild.brother = curNode.rightChild;
                if (curNode.rightChild)
                    curNode.rightChild.brother = curNode.leftChild;
                return curNode.leftChild;
            }
            return findInsertPos(curNode.leftChild, element);
        }
        else if (cmpResult > 0) {
            if (!curNode.rightChild) {
                curNode.rightChild = new TreeNode_1.default();
                curNode.rightChild.parent = curNode;
                curNode.rightChild.brother = curNode.leftChild;
                if (curNode.leftChild)
                    curNode.leftChild.brother = curNode.rightChild;
                return curNode.rightChild;
            }
            return findInsertPos(curNode.rightChild, element);
        }
        return curNode;
    };
    var insertNodeSelfBalance = function (curNode) {
        var parentNode = curNode.parent;
        if (!parentNode) {
            if (curNode === root)
                return;
            throw new Error("unknown error");
        }
        if (parentNode.color === TreeNode_1.default.TreeNodeColorType.black)
            return;
        if (parentNode.color === TreeNode_1.default.TreeNodeColorType.red) {
            var uncleNode = parentNode.brother;
            var grandParent = parentNode.parent;
            if (!grandParent)
                throw new Error("unknown error");
            if (uncleNode && uncleNode.color === TreeNode_1.default.TreeNodeColorType.red) {
                uncleNode.color = parentNode.color = TreeNode_1.default.TreeNodeColorType.black;
                grandParent.color = TreeNode_1.default.TreeNodeColorType.red;
                insertNodeSelfBalance(grandParent);
            }
            else if (!uncleNode || uncleNode.color === TreeNode_1.default.TreeNodeColorType.black) {
                if (parentNode === grandParent.leftChild) {
                    if (curNode === parentNode.leftChild) {
                        parentNode.color = TreeNode_1.default.TreeNodeColorType.black;
                        grandParent.color = TreeNode_1.default.TreeNodeColorType.red;
                        var newRoot = grandParent.rotateRight();
                        if (grandParent === root)
                            root = newRoot;
                    }
                    else if (curNode === parentNode.rightChild) {
                        var newRoot = parentNode.rotateLeft();
                        if (grandParent === root)
                            root = newRoot;
                        insertNodeSelfBalance(parentNode);
                    }
                }
                else if (parentNode === grandParent.rightChild) {
                    if (curNode === parentNode.leftChild) {
                        var newRoot = parentNode.rotateRight();
                        if (grandParent === root)
                            root = newRoot;
                        insertNodeSelfBalance(parentNode);
                    }
                    else if (curNode === parentNode.rightChild) {
                        parentNode.color = TreeNode_1.default.TreeNodeColorType.black;
                        grandParent.color = TreeNode_1.default.TreeNodeColorType.red;
                        var newRoot = grandParent.rotateLeft();
                        if (grandParent === root)
                            root = newRoot;
                    }
                }
            }
        }
    };
    this.setElement = function (key, value) {
        if (key === null || key === undefined) {
            throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
        }
        if (value === null || value === undefined) {
            this.eraseElementByKey(key);
            return;
        }
        if (this.empty()) {
            ++len;
            root.key = key;
            root.value = value;
            root.color = TreeNode_1.default.TreeNodeColorType.black;
            return;
        }
        var curNode = findInsertPos(root, key);
        if (curNode.key !== undefined && cmp(curNode.key, key) === 0) {
            curNode.value = value;
            return;
        }
        ++len;
        curNode.key = key;
        curNode.value = value;
        insertNodeSelfBalance(curNode);
        root.color = TreeNode_1.default.TreeNodeColorType.black;
    };
    var findElementPos = function (curNode, element) {
        if (!curNode || curNode.key === undefined)
            return undefined;
        var cmpResult = cmp(element, curNode.key);
        if (cmpResult < 0)
            return findElementPos(curNode.leftChild, element);
        else if (cmpResult > 0)
            return findElementPos(curNode.rightChild, element);
        return curNode;
    };
    this.find = function (element) {
        return !!findElementPos(root, element);
    };
    this.getElementByKey = function (element) {
        var curNode = findElementPos(root, element);
        if ((curNode === null || curNode === void 0 ? void 0 : curNode.key) === undefined || (curNode === null || curNode === void 0 ? void 0 : curNode.value) === undefined)
            throw new Error("unknown error");
        return curNode.value;
    };
    // waiting for optimization, this is O(mlog(n+m)) algorithm now, but we expect it to be O(mlog(n/m+1)).
    // (https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Set_operations_and_bulk_operations)
    this.union = function (other) {
        var _this = this;
        other.forEach(function (_a) {
            var key = _a.key, value = _a.value;
            return _this.setElement(key, value);
        });
    };
    this.getHeight = function () {
        if (this.empty())
            return 0;
        var traversal = function (curNode) {
            if (!curNode)
                return 1;
            return Math.max(traversal(curNode.leftChild), traversal(curNode.rightChild)) + 1;
        };
        return traversal(root);
    };
    var iterationFunc = function (curNode) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!curNode || curNode.key === undefined || curNode.value === undefined)
                        return [2 /*return*/];
                    return [5 /*yield**/, __values(iterationFunc(curNode.leftChild))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, { key: curNode.key, value: curNode.value }];
                case 2:
                    _a.sent();
                    return [5 /*yield**/, __values(iterationFunc(curNode.rightChild))];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
    this[Symbol.iterator] = function () {
        return iterationFunc(root);
    };
    container.forEach(function (_a) {
        var key = _a.key, value = _a.value;
        return _this.setElement(key, value);
    });
    Object.freeze(this);
}
Object.freeze(Map);
exports.default = Map;
