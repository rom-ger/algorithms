function solution(node, idx, head = null) {
    if (!idx) {
        return node.next;
    }
    if (idx === 1) {
        node.next = node.next ? node.next.next : null;
        return head;
    }
    return solution(node.next, idx - 1, head ? head : node);
}