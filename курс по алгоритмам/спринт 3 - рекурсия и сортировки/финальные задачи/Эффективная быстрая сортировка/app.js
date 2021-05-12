// ID - 49135995

/**
 * Принцип работы алогритма:
 * Принцип работы алгоритма описан в условии задачи
 * 
 * Временная сложность:
 * Как и обычная быстрая сортировка эта расходует O(nLog(n)) времени
 * 
 * Пространственная сложность:
 * Основные затраты памяти - хранение входных данных, дополнительной памяти не требуется. Сложность O(n)
 */

const fs = require('fs');

let data = [];
const dex = 10;
let n = 0;

/**
 * Читаем из файла
 */
function readInput(fileName) {
    let fileContent = fs.readFileSync(fileName, 'utf8');
    fileContent.split('\n').forEach((line, index) => {
        if (index === 0) {
            n = parseInt(line, dex);
        }
        if (index > 0 && index < n + 1) {
            let d = line.split(' ');
            data.push({
                name: d[0],
                p: parseInt(d[1], dex),
                f: parseInt(d[2], dex),
            });
        }
    });
}

/**
 * Решаем, кто из пары победил
 */
function isFirstWin(first, second) {
    if (first.p > second.p) {
        return true;
    }
    if (first.p < second.p) {
        return false;
    }
    if (first.f < second.f) {
        return true;
    }
    if (first.f > second.f) {
        return false;
    }
    return first.name < second.name;
}

/**
 * Рекурсивная функция быстрой сортировки
 */
function qSort(array, left, right) {
    if (left >= right) {
        return;
    }
    let pivot = array[Math.floor((right + left) / 2)];
    let lIndex = left;
    let rIndex = right;
    let swap = null;
    while (lIndex < rIndex) {
        while(isFirstWin(array[lIndex], pivot)) {
            lIndex++;
        }
        while(isFirstWin(pivot, array[rIndex])) {
            rIndex--;
        }
        if (lIndex <= rIndex) {
            swap = array[rIndex];
            array[rIndex] = array[lIndex];
            array[lIndex] = swap;
            lIndex++;
            rIndex--;
        }
    }
    qSort(array, left, rIndex);
    qSort(array, lIndex, right);
}

/**
 * Запускаем алгоритм
 */
function run() {
    qSort(data, 0, data.length - 1);
}

readInput('input.txt');
run();

fs.writeFileSync('output.txt', data.map(el => el.name).join('\n'));