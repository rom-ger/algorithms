function Solution(node) {
    let sum = 0;
    function go(node, path = null) {
        let _path = path;
        if (_path === null) {
            _path = `${node.value}`;
        } else {
            _path = `${_path}${node.value}`;
        }
        if (node.left !== null) {
            go(node.left, _path);
        }
        if (node.right !== null) {
            go(node.right, _path);
        }
        if (node.left === null && node.right === null) {
            sum = sum + parseInt(_path);
        }
    }
    go(node);
    return sum;
}