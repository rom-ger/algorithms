function printRange(root, left, right) {
    function go(node) {
        if (node.left !== null) {
            go(node.left);
        }
        if (node.value >= left && node.value <= right) {
            console.log(node.value);
        }
        if (node.right !== null) {
            go(node.right);
        }
    }
    go(root);
}