function solution(node, max = 0) {
    const tempMax = node.value > max ? node.value : max;
    if (!node.left && !node.right) {
        return tempMax;
    }
    const leftMax = node.left ? solution(node.left, tempMax) : tempMax;
    const rightMax = node.right ? solution(node.right, tempMax) : tempMax;
    return Math.max(tempMax, leftMax, rightMax);
}