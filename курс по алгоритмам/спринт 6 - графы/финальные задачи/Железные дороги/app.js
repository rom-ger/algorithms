// ID - 51168870

/**
 * Принцип работы алогритма:
 * Решение состоит в том, что я строю ориентированный граф, где пути типа R - это пути от меньшего номера к большему, а пути типа B - от большего к меньшему
 * В таком графе, чтобы понять, оптимальные ли это пути, надо попытаться найти цикл, если цикл не найден, то пути оптимальные
 * 
 * Временная сложность:
 * Занести каждое ребро в память - O(∣E∣)
 * Обход DFS - Алгоритм обрабатывает все вершины и проходит по всем спискам смежности. Это эквивалентно тому, чтобы пройти по каждому ребру по одному разу, что займёт O(∣E∣). Получим, что итоговая сложность алгоритма O(∣E∣+∣V∣).
 * Получаем итоговую временную сложность O(∣E∣+∣V∣)
 * 
 * Пространственная сложность:
 * В памяти мы храним:
 * Списки смежности - O(∣E∣+∣V∣)
 * Массив цветов - O(∣V∣)
 * 
 * в сумме получаем: O(∣E∣+∣V∣)
 */


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let countV = 0;
// списки смежности
let data = new Array();
// массив цветов
let color = new Array();

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        countV = parseInt(array[0], dex);
        data = new Array(countV + 1);
        // изначально все цвета = 0
        color = new Array(countV + 1).fill(0);
    }
    if (index > 0 && index < countV) {
        for (let i = 0; i < line.length; i++) {
            // в зависимости от типа ребра, заносим информацию о нём в списки смежности
            if (line[i] === 'R') {
                let list = data[index];
                if (!list) {
                    list = [index + i + 1];
                    data[index] = list;
                } else {
                    list.push(index + i + 1);
                }
            } else {
                let list = data[index + i + 1];
                if (!list) {
                    list = [index];
                    data[index + i + 1] = list;
                } else {
                    list.push(index);
                }
            }
        }
    }
});

// по-умолчанию считаем, что пути оптимальные
let allTrue = true;

// запуск обхода в глубину из заданной вершины
function DFS(index) {
    // реализация на стэке, без рекурсии
    let stack = [];
    stack.push({v: index, stage: 0});
    while(stack.length && allTrue) {
        const {v, stage} = stack.pop();
        if (stage === 0) {
            stack.push({v: v, stage: 1});
            color[v] = 1;
            let list = data[v];
            if (list) {
                list.forEach(element => {
                    if (color[element] === 1) {
                        // если встречаем серую вершину, закругляемся и уходим отсюда, пути не оптимальные
                        allTrue = false;
                    } else if (color[element] === 0) {
                        stack.push({v: element, stage: 0});
                    }
                });
            }
        } else {
            color[v] = 2;
        }
    }
}

// запускаем обход в глубину из каждой белой вершины
for (let i = 1; i < color.length; i++) {
    if (color[i] === 0 && allTrue) {
        DFS(i);
    }
}


fs.writeFileSync('output.txt', allTrue ? 'YES' : 'NO');
