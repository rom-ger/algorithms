// ID - 50473346

/**
 * Принцип работы алогритма:
 * Алгоритм основан на хранении данных в виде бинарной куче
 * 
 * Временная сложность:
 * В правильно реализованной бинарной куче, операции добавления и удаления элементов имеют логарифмическую сложность
 * Так как максимум, что нам потребуется - пройтись по дереву от листка до вершины, соответственно максимальная временная сложность добавления или удаления элемента O(log N)
 * Для реализации сортировки нам надо вставить все элементы в кучу, а потом извлечь все элементы из кучи, итого временная сложность O(N * log N)
 * 
 * Пространственная сложность:
 * Мы тратим память только на хренение всех пришедших объекто в в массиве - сложность O(N)
 */


const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

let count = 0;
let dex = 10;
let result = '';

// функция для сравнения двух участников, возвращает -1, если первый выиграл второго, иначе вернёт 1
function comparator(item1, item2) {
    if (item1 && !item2) {
        return -1;
    }
    if (item2 && !item1) {
        return 1;
    }
    if (item1.p !== item2.p) {
        return item2.p - item1.p < 0 ? -1 : 1;
    }
    if (item1.f !== item2.f) {
        return item1.f - item2.f < 0 ? -1 : 1;
    }
    return item1.login < item2.login ? -1 : 1;
}

class Heap {
    constructor() {
        this.data = [null];
    }

    add(item) {
        // добавим элемент в конец массива
        this.data.push(item);
        // начнём просеивание вверх
        this.stiffUp(this.data.length - 1);
    }

    remove(index) {
        // если в куче всего один элемент, просто удалим его
        if (this.data.length === 2) {
            this.data = [null];
            return;
        }
        // если удаляемый элемент последний в массиве, просто удалим его
        if (index === this.data.length === 1) {
            this.data.splice(index, 1);
            return;
        }
        // если у удаляемого элемента нет потомков, просто удалим его
        if (this.data.length - 1 < index*2) {
            this.data[index] = undefined;
            return;
        }
        // заменяем удаляемый элемент, последним элементом массива
        this.data[index] = this.data[this.data.length - 1];
        // удаляем последний элемент массива
        this.data.splice(this.data.length - 1, 1);
        // начнём просеивание вверх
        this.stiffDown(index);
    }

    // поменять местами два элемента массива
    swap(index1, index2) {
        let temp = this.data[index1];
        this.data[index1] = this.data[index2];
        this.data[index2] = temp;
    }

    stiffUp(currentIndex) {
        // если это вершина кучи, то завершаем просеивание
        if (currentIndex === 1) {
            return;
        }
        // находим индекс родителя
        let parentIndex = Math.floor(currentIndex / 2);
        // если родитель круче этого элемента, то завершаем просеивание
        if (comparator(this.data[parentIndex], this.data[currentIndex]) < 1) {
            return;
        }
        // меняем элемен местами с его родителем
        this.swap(parentIndex, currentIndex);
        // продолжаем просеивание
        this.stiffUp(parentIndex);
    }

    stiffDown(currentIndex) {
        // находим индексы и элементы потомков текущего элемента
        let leftChildIndex = currentIndex * 2;
        let rightChildIndex = currentIndex * 2 + 1;
        let leftChild = this.data[leftChildIndex];
        let rightChild = this.data[rightChildIndex];
        // если вдруг потомков нет, то завершаем просеивание
        if (!leftChild && !rightChild) {
            return;
        }
        // проверяем, кто из этой троицы приоритетней
        let leftPriority = comparator(this.data[currentIndex], leftChild);
        let rightPriority = comparator(this.data[currentIndex], rightChild);
        // если проверяемый элемент приоритетнее своих потомков, то завершаем просеивание
        if (leftPriority === -1 && rightPriority === -1) {
            return;
        }
        if (leftPriority === -1 && rightPriority !== -1) {
            this.swap(rightChildIndex, currentIndex);
            this.stiffDown(rightChildIndex);
            return;
        }
        if (leftPriority !== -1 && rightPriority === -1) {
            this.swap(leftChildIndex, currentIndex);
            this.stiffDown(leftChildIndex);
            return;
        }
        let isLeftStiff = comparator(leftChild, rightChild);
        if (isLeftStiff === -1) {
            this.swap(leftChildIndex, currentIndex);
            this.stiffDown(leftChildIndex);
        } else {
            this.swap(rightChildIndex, currentIndex);
            this.stiffDown(rightChildIndex);
        }
    }
}

const heap = new Heap();

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count = parseInt(line, dex);
    }
    if (index > 0 && index <= count) {
        let personData = line.split(' ');
        heap.add({
            login: personData[0],
            p: parseInt(personData[1], dex),
            f: parseInt(personData[2], dex),
        });
    }
});

while(heap.data.length > 1) {
    result = `${result}${result ? '\n' : ''}${heap.data[1].login}`;
    heap.remove(1);
}


fs.writeFileSync('output.txt', result);