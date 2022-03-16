var TreeNode = /** @class */ (function () {
    function TreeNode(key, value) {
        this.color = true;
        this.key = undefined;
        this.value = undefined;
        this.parent = undefined;
        this.brother = undefined;
        this.leftChild = undefined;
        this.rightChild = undefined;
        this.key = key;
        this.value = value;
    }
    TreeNode.prototype.rotateLeft = function () {
        var PP = this.parent;
        var PB = this.brother;
        var F = this.leftChild;
        var V = this.rightChild;
        if (!V)
            throw new Error("unknown error");
        var R = V.leftChild;
        var X = V.rightChild;
        if (PP) {
            if (PP.leftChild === this)
                PP.leftChild = V;
            else if (PP.rightChild === this)
                PP.rightChild = V;
        }
        V.parent = PP;
        V.brother = PB;
        V.leftChild = this;
        V.rightChild = X;
        if (PB)
            PB.brother = V;
        this.parent = V;
        this.brother = X;
        this.leftChild = F;
        this.rightChild = R;
        if (X) {
            X.parent = V;
            X.brother = this;
        }
        if (F) {
            F.parent = this;
            F.brother = R;
        }
        if (R) {
            R.parent = this;
            R.brother = F;
        }
        return V;
    };
    TreeNode.prototype.rotateRight = function () {
        var PP = this.parent;
        var PB = this.brother;
        var F = this.leftChild;
        if (!F)
            throw new Error("unknown error");
        var V = this.rightChild;
        var D = F.leftChild;
        var K = F.rightChild;
        if (PP) {
            if (PP.leftChild === this)
                PP.leftChild = F;
            else if (PP.rightChild === this)
                PP.rightChild = F;
        }
        F.parent = PP;
        F.brother = PB;
        F.leftChild = D;
        F.rightChild = this;
        if (PB)
            PB.brother = F;
        if (D) {
            D.parent = F;
            D.brother = this;
        }
        this.parent = F;
        this.brother = D;
        this.leftChild = K;
        this.rightChild = V;
        if (K) {
            K.parent = this;
            K.brother = V;
        }
        if (V) {
            V.parent = this;
            V.brother = K;
        }
        return F;
    };
    TreeNode.prototype.remove = function () {
        if (this.leftChild || this.rightChild)
            throw new Error("can only remove leaf node");
        if (this.parent) {
            if (this === this.parent.leftChild)
                this.parent.leftChild = undefined;
            else if (this === this.parent.rightChild)
                this.parent.rightChild = undefined;
        }
        if (this.brother)
            this.brother.brother = undefined;
        this.key = undefined;
        this.value = undefined;
        this.parent = undefined;
        this.brother = undefined;
    };
    TreeNode.TreeNodeColorType = {
        red: true,
        black: false
    };
    return TreeNode;
}());
Object.freeze(TreeNode);
export default TreeNode;
