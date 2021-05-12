function Solution(node) {
    if (node.left === null && node.right === null) {
        return true;
    }
    if (node.left !== null && node.left.value >= node.value) {
        return false;
    }
    if (node.right !== null && node.right.value <= node.value) {
        return false;
    }
    if (node.left !== null && !Solution(node.left)) {
        return false;
    }
    if (node.right !== null && !Solution(node.right)) {
        return false;
    }
    return true;
}