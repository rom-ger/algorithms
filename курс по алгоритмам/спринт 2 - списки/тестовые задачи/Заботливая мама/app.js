function solution(head, elem, index = null) {
    if (head.value === elem) {
        return index || 0;
    }
    if (head.next === null) {
        return -1;
    }
    return solution(head.next, elem, index ? index + 1 : 1);
}