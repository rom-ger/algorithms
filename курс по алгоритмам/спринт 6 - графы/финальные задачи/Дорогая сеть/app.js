// ID - 50986991

/**
 * Принцип работы алогритма:
 * Задача решена с помощью алгоритма Пима
 * 1. Берётся любая вершина графа.
 * 2. Рассмотриваются все рёбра, исходящие из этой вершины. Берётся ребро с максимальным весом и добавляется в остов ребро и вершину, в которую оно входило.
 * 3. Добавляются ко множеству потенциально добавляемых рёбер все, которые исходят из новой вершины и входят в вершины, ещё не включённые в остов.
 * 4. Повторяются пункты 2 и 3 до тех пор, пока в остовном дереве не будет nn вершин и, соответственно, n-1 рёбер.
 * 
 * Временная сложность:
 * Алгоритму требуется число шагов, пропорциональное количеству вершин. На каждом шаге ищется максимальное по весу ребро. На поиск максимального ребра требуется в худшем случае перебрать все рёбра. В итоге сложность алгоритма будет O(∣V∣⋅∣E∣).
 * Так как рёбра мы храним в куче с поддержанием максимума, то выбирать ребро с максимальным весом будет легко.
 * Благодаря приоритетной очереди сложность алгоритма Прима стала O(∣E∣⋅log∣V∣), где |E| — количество рёбер в графе, а |V| — количество вершин.
 * 
 * Пространственная сложность:
 * В памяти мы храним:
 * Списки смежности - O(∣E∣+∣V∣)
 * Множество вершин, уже добавленных в остов - O(∣V1∣)
 * Множество вершин, ещё не добавленных в остов - O(∣V2∣)
 * O(∣V1∣) + O(∣V2∣) = O(∣V∣)
 * Рёбра, исходящие их остовного дерева - O(∣E∣)
 * 
 * в сумме получаем: O(∣E∣+∣V∣) + O(∣V∣) + O(∣E∣) = O(∣E∣+∣V∣) * 2 = O(∣E∣+∣V∣)
 */




/**
 * Класс для хранения информации о ребре
 * value - номер вершины - конец ребра
 * weight - вес ребра
 */
class LinkedListItem {
    constructor(value, weight) {
        this.value = value;
        this.weight = weight;
        this.next = null;
    }
}

/**
 * Связный список, с помощью него будем хранить информацию о всех рёбрах, исходящих из запрашиваемого
 */
class LinkedList {
    constructor(headValue, headWeight) {
        this.head = new LinkedListItem(headValue, headWeight);
        this.size = 1;
        this.last = this.head;
    }

    push(value, weight) {
        let newElement = new LinkedListItem(value, weight);
        let last = this.last;
        last.next = newElement;
        this.last = newElement;
        this.size++;
    }
}

// функция для сравнения двух рёбер, возвращает -1, если первое тяжелее второго, иначе вернёт 1
function comparator(item1, item2) {
    if (item1 && !item2) {
        return -1;
    }
    if (item2 && !item1) {
        return 1;
    }
    return item2.weight - item1.weight < 0 ? -1 : 1;
}

/**
 * Реализация кучи из прошлого спринта. Для хранения рёбер, исходящих из остовного дерева.
 * Используем кучу, чтобы быстро находить максимально тяжёлое ребро
 */
class Heap {
    constructor() {
        this.data = [null];
    }

    add(item) {
        this.data.push(item);
        this.stiffUp(this.data.length - 1);
    }

    remove(index) {
        if (this.data.length === 2) {
            this.data = [null];
            return;
        }
        if (index === this.data.length === 1) {
            this.data.splice(index, 1);
            return;
        }
        if (this.data.length - 1 < index*2) {
            this.data[index] = undefined;
            return;
        }
        this.data[index] = this.data[this.data.length - 1];
        this.data.splice(this.data.length - 1, 1);
        this.stiffDown(index);
    }

    swap(index1, index2) {
        let temp = this.data[index1];
        this.data[index1] = this.data[index2];
        this.data[index2] = temp;
    }

    stiffUp(currentIndex) {
        if (currentIndex === 1) {
            return;
        }
        let parentIndex = Math.floor(currentIndex / 2);
        if (comparator(this.data[parentIndex], this.data[currentIndex]) < 1) {
            return;
        }
        this.swap(parentIndex, currentIndex);
        this.stiffUp(parentIndex);
    }

    stiffDown(currentIndex) {
        let leftChildIndex = currentIndex * 2;
        let rightChildIndex = currentIndex * 2 + 1;
        let leftChild = this.data[leftChildIndex];
        let rightChild = this.data[rightChildIndex];
        if (!leftChild && !rightChild) {
            return;
        }
        let leftPriority = comparator(this.data[currentIndex], leftChild);
        let rightPriority = comparator(this.data[currentIndex], rightChild);
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

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
// кол-во вершин
let countV = 0;
// кол-во рёбер
let countE = 0;
// массив списков смежности
let data = new Array();

let result = '';
// вес максимального остова
let maxWeight = 0;
// Множество вершин, уже добавленных в остов
let added = new Set();
// Множество вершин, ещё не добавленных в остов
let notAdded = new Set();
// Рёбра, исходящие их остовного дерева
let edges = new Heap();

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        let array = line.split(' ');
        countV = parseInt(array[0], dex);
        countE = parseInt(array[1], dex);
        data = new Array(countV + 1);
    }
    if (index > 0 && index <= countE) {
        let array = line.split(' ');
        let v1 = parseInt(array[0], dex);
        let v2 = parseInt(array[1], dex);
        let w = parseInt(array[2], dex);
        // добавляем в списки смежности информацию о ребре (так как граф не направленный, то надо добавить два ребра, туда и обратно)
        let list = data[v1];
        if (!list) {
            list = new LinkedList(v2, w);
            data[v1] = list;
        } else {
            list.push(v2, w);
        }
        list = data[v2];
        if (!list) {
            list = new LinkedList(v1, w);
            data[v2] = list;
        } else {
            list.push(v1, w);
        }
    }
});

// функция добавления вершины в остов и добавления её рёбер в кучу
function addVertex(v) {
    // добавляем вершину в добавленные
    added.add(v);
    // убираем вершниу из не добавленных
    notAdded.delete(v);
    // ищем список смежности для этой вершины
    let list = data[v];
    if (!list) {
        return;
    }
    let element = list.head;
    // пройдёмся по всем рёбрам выходящим из этой вершины
    while(element) {
        // если смежную вершниу ещё не добавляли в остов, то добавим её в кучу
        if (notAdded.has(element.value)) {
            edges.add({v1: v, v2: element.value, weight: element.weight});
        }
        element = element.next;
    }
}

// получаем максимальное ребро из кучи
function extractMaximum() {
    max = {...edges.data[1]};
    edges.remove(1);
    return max;
}

function findMST() {
    // добавляем все вершины в недобавленные
    for (let i = 1; i <= countV; i++) {
        notAdded.add(i);
    }
    // обрабатываем первую вершину из графа
    addVertex(1);
    // пока ещё есть недобавленные вершины и в куче рёбер ещё что-то есть
    while(notAdded.size && edges.data.length - 1) {
        // ищем максимальное по весу ребро в куче
        let element = extractMaximum();
        // если нашли и вершина, в которую идёт это ребро ещё не добавлена в остов
        if (element && notAdded.has(element.v2)) {
            // берём вес этого ребра и добавляем его к результату
            maxWeight = maxWeight + element.weight;
            // далее идём обрабатывать вершину, в которую идёт это ребро
            addVertex(element.v2);
        }
    }
    // если у нас остались недобавленные вершины, значит граф несвязный, значит мы не можем найти остов
    if (notAdded.size) {
        result = 'Oops! I did it again';
    } else {
        result = maxWeight;
    }
}

findMST();

fs.writeFileSync('output.txt', result);
