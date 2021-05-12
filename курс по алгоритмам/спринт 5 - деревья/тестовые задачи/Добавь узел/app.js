function insert(node, key, head = null) { 
    let _head = head || node;
    if (key < node.value) {
        if (node.left === null) {
            let newElement = {
                value: key,
                left: null,
                right: null,
            };
            node.left = newElement;
            return _head;
        } else {
            return insert(node.left, key, _head);
        }
    } else {
        if (node.right === null) {
            let newElement = {
                value: key,
                left: null,
                right: null,
            };
            node.right = newElement;
            return _head;
        } else {
            return insert(node.right, key, _head);
        }
    }
}