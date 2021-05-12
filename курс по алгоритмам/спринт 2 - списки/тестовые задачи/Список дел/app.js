function solution(node) {
    if (!node) {
        return;
    }
    process.stdout.write(`${node.value}\n`);
    if (node.next) {
        solution(node.next);
    }
}