// ID - 49230291

/**
 * Принцип работы алогритма:
 * Так как исходный массив уже отсортирован - наша главная задача найти индекс элемента, который в исходном массиве был первым
 * Это сделать не сложно, используя бинарный поиск, нам надо найти элемент который меньше следующего
 * Найдя такой элемент не составляет труда ещё раз пройтись по массиву бинарным поиском и найти требуемый в условии задачи элемент
 * 
 * Временная сложность:
 * Наш алогоритм состоит из двух бинарных поисков. Временная сложность бинарного поиска - O(log(n)), соответственно сложность всего алгоритма тоже O(log(n))
 * 
 * Пространственная сложность:
 * Основные затраты памяти - хранение входного массива. Сложность O(n)
 */

const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');

let result = -1;
let data = [];
const dex = 10;
let n = 0;
let k = 0;

/**
 * Читаем из файла
 */
function readInput() {
    fileContent.split('\n').forEach((line, index) => {
        if (index === 0) {
            n = parseInt(line, dex);
        }
        if (index === 1) {
            k = parseInt(line, dex);
        }
        if (index === 2) {
            data = line.split(' ').filter((el, i) => i < n).map((el, i) => parseInt(el, dex));
        }
    });
}

/**
 * Ищем стартовый элемент изначального массива
 */
function findStart(array, l, r) {
    if (r - l < 1) {
        return -1;
    }
    if (r - l === 1) {
        return array[l] > array[r] ? l + 1 : -1;
    }
    let middle = Math.floor((r + l) / 2);
    if (array[middle] > array[middle + 1]) {
        return middle + 1;
    }
    let result = -1;
    if (array[l] > array[middle]) {
        result = findStart(array, l, middle);
    } else {
        result = findStart(array, middle, r);
    }
    return result;
}


/**
 * Ищем нужный элемент
 */
function findElement(array, l, r, element) {
    if (r - l === 0) {
        return array[l] === element ? l : -1;
    }
    if (r - l === 1) {
        if (array[l] === element) {
            return l;
        }
        if (array[r] === element) {
            return r;
        }
        return -1;
    }
    let middle = Math.floor((r + l) / 2);
    if (array[middle] === element) {
        if (array[l] === element) {
            return findElement(array, l, middle, element);
        }
        return middle;
    }
    if (array[middle] > element) {
        return findElement(array, l, middle, element);
    }
    return findElement(array, middle, r, element);
}

/**
 * Запускаем алгоритм
 */
function run() {
    let findIndex = findStart(data, 0, data.length - 1);
    if (findIndex === -1) {
        findIndex = 0;
    }
    console.log(findIndex);
    result = -1;
    if (k >= data[findIndex] && k <= data[data.length - 1]) {
        result = findElement(data, findIndex, data.length - 1, k);
    }
    if (findIndex !== 0 && k >= data[0] && k <= data[findIndex - 1]) {
        result = findElement(data, 0, findIndex - 1, k);
    }
}

readInput();
run();

fs.writeFileSync('output.txt', result);