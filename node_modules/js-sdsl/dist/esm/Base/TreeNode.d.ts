declare class TreeNode<T, K> {
    static TreeNodeColorType: {
        red: true;
        black: false;
    };
    color: boolean;
    key: T | undefined;
    value: K | undefined;
    parent: TreeNode<T, K> | undefined;
    brother: TreeNode<T, K> | undefined;
    leftChild: TreeNode<T, K> | undefined;
    rightChild: TreeNode<T, K> | undefined;
    constructor(key?: T, value?: K);
    rotateLeft(): TreeNode<T, K>;
    rotateRight(): TreeNode<T, K>;
    remove(): void;
}
export default TreeNode;
