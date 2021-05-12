function solution(node) {
    const next = node.next;
    const prev = node.prev;
    node.next = prev;
    node.prev = next;
    if (next === null) {
        return node;
    }
    return solution(next);
}