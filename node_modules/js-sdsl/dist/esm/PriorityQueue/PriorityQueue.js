/**
 * @param container
 * @param cmp default cmp will generate a max heap
 * @constructor
 */
function PriorityQueue(container, cmp) {
    if (container === void 0) { container = []; }
    cmp = cmp || (function (x, y) {
        if (x > y)
            return -1;
        if (x < y)
            return 1;
        return 0;
    });
    var priorityQueue = [];
    container.forEach(function (element) { return priorityQueue.push(element); });
    var len = priorityQueue.length;
    var swap = function (x, y) {
        if (x < 0 || x >= len)
            throw new Error("unknown error");
        if (y < 0 || y >= len)
            throw new Error("unknown error");
        var tmp = priorityQueue[x];
        priorityQueue[x] = priorityQueue[y];
        priorityQueue[y] = tmp;
    };
    var adjust = function (parent) {
        if (parent < 0 || parent >= len)
            throw new Error("unknown error");
        var leftChild = parent * 2 + 1;
        var rightChild = parent * 2 + 2;
        if (leftChild < len && cmp(priorityQueue[parent], priorityQueue[leftChild]) > 0)
            swap(parent, leftChild);
        if (rightChild < len && cmp(priorityQueue[parent], priorityQueue[rightChild]) > 0)
            swap(parent, rightChild);
    };
    (function () {
        for (var parent_1 = Math.floor((len - 1) / 2); parent_1 >= 0; --parent_1) {
            var curParent = parent_1;
            var curChild = curParent * 2 + 1;
            while (curChild < len) {
                var leftChild = curChild;
                var rightChild = leftChild + 1;
                var minChild = leftChild;
                if (rightChild < len && cmp(priorityQueue[leftChild], priorityQueue[rightChild]) > 0)
                    minChild = rightChild;
                if (cmp(priorityQueue[curParent], priorityQueue[minChild]) <= 0)
                    break;
                swap(curParent, minChild);
                curParent = minChild;
                curChild = curParent * 2 + 1;
            }
        }
    })();
    this.size = function () {
        return len;
    };
    this.empty = function () {
        return len === 0;
    };
    this.clear = function () {
        len = 0;
        priorityQueue.length = 0;
    };
    this.push = function (element) {
        priorityQueue.push(element);
        ++len;
        if (len === 1)
            return;
        var curNode = len - 1;
        while (curNode > 0) {
            var parent_2 = Math.floor((curNode - 1) / 2);
            if (cmp(priorityQueue[parent_2], element) <= 0)
                break;
            adjust(parent_2);
            curNode = parent_2;
        }
    };
    this.pop = function () {
        if (this.empty())
            return;
        if (this.size() === 1) {
            --len;
            return;
        }
        var last = priorityQueue[len - 1];
        --len;
        var parent = 0;
        while (parent < this.size()) {
            var leftChild = parent * 2 + 1;
            var rightChild = parent * 2 + 2;
            if (leftChild >= this.size())
                break;
            var minChild = leftChild;
            if (rightChild < this.size() && cmp(priorityQueue[leftChild], priorityQueue[rightChild]) > 0)
                minChild = rightChild;
            if (cmp(priorityQueue[minChild], last) >= 0)
                break;
            priorityQueue[parent] = priorityQueue[minChild];
            parent = minChild;
        }
        priorityQueue[parent] = last;
    };
    this.top = function () {
        return priorityQueue[0];
    };
    Object.freeze(this);
}
Object.freeze(PriorityQueue);
export default PriorityQueue;
