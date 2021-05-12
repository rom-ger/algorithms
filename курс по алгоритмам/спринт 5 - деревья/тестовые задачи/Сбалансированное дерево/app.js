function Solution(root) {
    function checkHeight(node, nodeHeight = 0) {
        let height = nodeHeight + 1;
        if (node.left === null && node.right === null) {
            return height;
        }
        let leftTreeHeight = node.left !== null ? checkHeight(node.left, height) : height;
        let rightTreeHeight = node.right !== null ? checkHeight(node.right, height) : height;
        if (leftTreeHeight === null || rightTreeHeight === null) {
            return null;
        }
        if (rightTreeHeight === null || leftTreeHeight === null) {
            return null;
        }
        if (Math.abs(leftTreeHeight - rightTreeHeight) < 2) {
            return Math.max(leftTreeHeight, rightTreeHeight);
        }
        return null;
    }
    if (root.left !== null && root.right === null) {
        return checkHeight(root.left) <= 1;
    }
    if (root.right !== null && root.left === null) {
        return checkHeight(root.right) <= 1;
    }
    return checkHeight(root) !== null;
}