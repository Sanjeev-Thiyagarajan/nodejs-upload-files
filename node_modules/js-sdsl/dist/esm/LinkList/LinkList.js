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
var LinkNode = /** @class */ (function () {
    function LinkNode(element) {
        this.value = undefined;
        this.pre = undefined;
        this.next = undefined;
        this.value = element;
    }
    return LinkNode;
}());
function LinkList(container) {
    var _this = this;
    if (container === void 0) { container = []; }
    var len = 0;
    var head = undefined;
    var tail = undefined;
    this.size = function () {
        return len;
    };
    this.empty = function () {
        return len === 0;
    };
    this.clear = function () {
        head = tail = undefined;
        len = 0;
    };
    this.front = function () {
        return head === null || head === void 0 ? void 0 : head.value;
    };
    this.back = function () {
        return tail === null || tail === void 0 ? void 0 : tail.value;
    };
    this.forEach = function (callback) {
        var curNode = head;
        var index = 0;
        while (curNode) {
            if (curNode.value === undefined)
                throw new Error("unknown error");
            callback(curNode.value, index++);
            curNode = curNode.next;
        }
    };
    this.getElementByPos = function (pos) {
        if (pos < 0 || pos >= len)
            throw new Error("pos must more then 0 and less then the list length");
        var curNode = head;
        while (pos--) {
            if (!curNode)
                break;
            curNode = curNode.next;
        }
        if (!curNode || curNode.value === undefined)
            throw new Error("unknown error");
        return curNode.value;
    };
    this.eraseElementByPos = function (pos) {
        if (pos < 0 || pos >= len)
            throw new Error("erase pos must more then 0 and less then the list length");
        if (pos === 0)
            this.popFront();
        else if (pos === len - 1)
            this.popBack();
        else {
            var curNode = head;
            while (pos--) {
                if (!(curNode === null || curNode === void 0 ? void 0 : curNode.next))
                    throw new Error("unknown error");
                curNode = curNode.next;
            }
            if (!curNode || !curNode.pre || !curNode.next) {
                throw new Error("unknown error");
            }
            var pre = curNode.pre;
            var next = curNode.next;
            next.pre = pre;
            pre.next = next;
            if (len > 0)
                --len;
        }
    };
    this.eraseElementByValue = function (value) {
        while (head && head.value === value)
            this.popFront();
        while (tail && tail.value === value)
            this.popBack();
        if (!head)
            return;
        var curNode = head;
        while (curNode) {
            if (curNode.value === value) {
                var pre = curNode.pre;
                var next = curNode.next;
                if (next)
                    next.pre = pre;
                if (pre)
                    pre.next = next;
                if (len > 0)
                    --len;
            }
            curNode = curNode.next;
        }
    };
    this.pushBack = function (element) {
        if (element === null || element === undefined) {
            throw new Error("you can't push null or undefined here");
        }
        ++len;
        var newTail = new LinkNode(element);
        if (!tail) {
            head = tail = newTail;
        }
        else {
            tail.next = newTail;
            newTail.pre = tail;
            tail = newTail;
        }
    };
    this.popBack = function () {
        if (!tail)
            return;
        if (len > 0)
            --len;
        if (!tail)
            return;
        if (head === tail) {
            head = tail = undefined;
        }
        else {
            tail = tail.pre;
            if (tail)
                tail.next = undefined;
        }
    };
    this.setElementByPos = function (pos, element) {
        if (element === null || element === undefined) {
            throw new Error("you can't set null or undefined here");
        }
        if (pos < 0 || pos >= len)
            throw new Error("pos must more then 0 and less then the list length");
        var curNode = head;
        while (pos--) {
            if (!curNode)
                throw new Error("unknown error");
            curNode = curNode.next;
        }
        if (curNode)
            curNode.value = element;
    };
    /**
     * @param {number} pos insert element before pos, should in [0, list.size]
     * @param {any} element the element you want to insert
     * @param {number} [num = 1] the nums you want to insert
     */
    this.insert = function (pos, element, num) {
        if (num === void 0) { num = 1; }
        if (element === null || element === undefined) {
            throw new Error("you can't insert null or undefined here");
        }
        if (pos < 0 || pos > len)
            throw new Error("insert pos must more then 0 and less then or equal to the list length");
        if (num < 0)
            throw new Error("insert size must more than 0");
        if (pos === 0) {
            while (num--)
                this.pushFront(element);
        }
        else if (pos === len) {
            while (num--)
                this.pushBack(element);
        }
        else {
            var curNode = head;
            for (var i = 1; i < pos; ++i) {
                if (!(curNode === null || curNode === void 0 ? void 0 : curNode.next))
                    throw new Error("unknown error");
                curNode = curNode === null || curNode === void 0 ? void 0 : curNode.next;
            }
            if (!curNode) {
                throw new Error("unknown error");
            }
            var next = curNode.next;
            len += num;
            while (num--) {
                curNode.next = new LinkNode(element);
                curNode.next.pre = curNode;
                curNode = curNode.next;
            }
            curNode.next = next;
            if (next)
                next.pre = curNode;
        }
    };
    this.find = function (element) {
        var curNode = head;
        while (curNode) {
            if (curNode.value === element)
                return true;
            curNode = curNode.next;
        }
        return false;
    };
    this.reverse = function () {
        var pHead = head;
        var pTail = tail;
        var cnt = 0;
        while (pHead && pTail && cnt * 2 < len) {
            var tmp = pHead.value;
            pHead.value = pTail.value;
            pTail.value = tmp;
            pHead = pHead.next;
            pTail = pTail.pre;
            ++cnt;
        }
    };
    this.unique = function () {
        var curNode = head;
        while (curNode) {
            var tmpNode = curNode;
            while (tmpNode && tmpNode.next && tmpNode.value === tmpNode.next.value) {
                tmpNode = tmpNode.next;
                if (len > 0)
                    --len;
            }
            curNode.next = tmpNode.next;
            if (curNode.next)
                curNode.next.pre = curNode;
            curNode = curNode.next;
        }
    };
    this.sort = function (cmp) {
        var arr = [];
        this.forEach(function (element) {
            arr.push(element);
        });
        arr.sort(cmp);
        var curNode = head;
        arr.forEach(function (element) {
            if (curNode) {
                curNode.value = element;
                curNode = curNode.next;
            }
        });
    };
    this.pushFront = function (element) {
        if (element === null || element === undefined) {
            throw new Error("you can't push null or undefined here");
        }
        ++len;
        var newHead = new LinkNode(element);
        if (!head) {
            head = tail = newHead;
        }
        else {
            newHead.next = head;
            head.pre = newHead;
            head = newHead;
        }
    };
    this.popFront = function () {
        if (!head)
            return;
        if (len > 0)
            --len;
        if (!head)
            return;
        if (head === tail) {
            head = tail = undefined;
        }
        else {
            head = head.next;
            if (head)
                head.pre = undefined;
        }
    };
    /**
     * merge two sorted lists
     * @param list other list
     */
    this.merge = function (list) {
        var _this = this;
        var curNode = head;
        list.forEach(function (element) {
            while (curNode && curNode.value !== undefined && curNode.value <= element) {
                curNode = curNode.next;
            }
            if (curNode === undefined) {
                _this.pushBack(element);
                curNode = tail;
            }
            else if (curNode === head) {
                _this.pushFront(element);
                curNode = head;
            }
            else {
                ++len;
                var pre = curNode.pre;
                if (pre) {
                    pre.next = new LinkNode(element);
                    pre.next.pre = pre;
                    pre.next.next = curNode;
                    if (curNode)
                        curNode.pre = pre.next;
                }
            }
        });
    };
    this[Symbol.iterator] = function () {
        return (function () {
            var curNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        curNode = head;
                        _a.label = 1;
                    case 1:
                        if (!(curNode !== undefined)) return [3 /*break*/, 3];
                        if (!curNode.value)
                            throw new Error("unknown error");
                        return [4 /*yield*/, curNode.value];
                    case 2:
                        _a.sent();
                        curNode = curNode.next;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        })();
    };
    container.forEach(function (element) { return _this.pushBack(element); });
    Object.freeze(this);
}
Object.freeze(LinkList);
export default LinkList;
