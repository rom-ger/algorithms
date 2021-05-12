// ID - 50479268

/**
 * Принцип работы алогритма:
 * Алгоритм основан статье из теории "Двоичные деревья поиска. Удаление", дублировать описание очень долго)
 * 
 * Временная сложность:
 * Чтобы удалить элемент нам надо его сначала найти, а потом удалить, заменив его другим элементом из этого дерева
 * Поиск элемента имеет временную сложность O (h), где h - высота дерева, поиск элемента на замену тоже занимает O(h) времени
 * Так что общая временная сложность прямо зависит от высоты дерева - O(h)
 * 
 * Пространственная сложность:
 * Память расходуется только на хранение данных в объектах, ссылающихся друг на друга, пространственная сложность - O(n)
 */

/**
 * Рекурсивно ищем элемент по ключу и возвращаем его и его родителя, если не нашли, то возвращаем null
 */
function findElementRecursive(node, parentNode, key) {
    if (node === null) {
        return null;
    }
    if (node !== null && node.value === key) {
        return {node, parentNode};
    }
    if (node.value < key && node.right !== null) {
        return findElementRecursive(node.right, node, key);
    }
    if (node.value > key && node.left !== null) {
        return findElementRecursive(node.left, node, key);
    }
    return null;
}

/**
 * Рекурсивно ищем самый правый элемент в поддереве и возвращаем его и его родителя, если не нашли, то возвращаем null
 */
function findMaxRightChild(node, parentNode) {
    if (node === null) {
        return null;
    }
    if (node !== null && node.right !== null) {
        return findMaxRightChild(node.right, node);
    }
    if (node !== null && node.right === null) {
        return {node, parentNode};
    }
}

/**
 * Рекурсивно ищем самый левый элемент в поддереве и возвращаем его и его родителя, если не нашли, то возвращаем null
 */
function findMaxLeftChild(node, parentNode) {
    if (node === null) {
        return null;
    }
    if (node !== null && node.left !== null) {
        return findMaxLeftChild(node.left, node);
    }
    if (node !== null && node.left === null) {
        return {node, parentNode};
    }
}

function remove(node, key) { 
    // ищем элемент
    let resultFind = findElementRecursive(node, null, key);
    // если не нашли, возвращаем текущий корень
    if (resultFind === null) {
        return node;
    }
    let parentElement = resultFind.parentNode;
    let findElement = resultFind.node;
    // если это единственный элемент в дереве, то дерево удаляется, возвращаем null
    if (parentElement === null && findElement.left === null && findElement.right === null) {
        return null;
    }
    // если у элемента нет потомков, то просто удаляем ссылку на него у его родителя
    if (findElement.left === null && findElement.right === null) {
        if (parentElement.left !== null && parentElement.left.value === findElement.value) {
            parentElement.left = null;
        }
        if (parentElement.right !== null && parentElement.right.value === findElement.value) {
            parentElement.right = null;
        }
        return node;
    }
    // находим подходящий элемент для замены в поддеревьях найденого элемента
    let resultFindChild = null;
    if (findElement.left !== null) {
        resultFindChild = findMaxRightChild(findElement.left, findElement);
    } else {
        resultFindChild = findMaxLeftChild(findElement.right, findElement);
    }
    let maxChild = resultFindChild.node;
    let maxChildParent = resultFindChild.parentNode;
    // если найденный потомок не является прямым потомком найденного элемента, то всех детей потомка поручаем его родителю
    if (maxChildParent.value !== findElement.value) {
        if (maxChild.left !== null) {
            if (maxChildParent.left !== null && maxChildParent.left.value === maxChild.value) {
                maxChildParent.left = maxChild.left;
            }
            if (maxChildParent.right !== null && maxChildParent.right.value === maxChild.value) {
                maxChildParent.right = maxChild.left;
            }
        }
        if (maxChild.right !== null) {
            if (maxChildParent.left !== null && maxChildParent.left.value === maxChild.value) {
                maxChildParent.left = maxChild.right;
            }
            if (maxChildParent.right !== null && maxChildParent.right.value === maxChild.value) {
                maxChildParent.right = maxChild.right;
            }
        }
        if (maxChild.left === null && maxChild.right === null) {
            if (maxChildParent.left !== null && maxChildParent.left.value === maxChild.value) {
                maxChildParent.left = null;
            }
            if (maxChildParent.right !== null && maxChildParent.right.value === maxChild.value) {
                maxChildParent.right = null;
            }
        }
    }
    // найденому потомку присваеваем левого потомка найденного элемента (только если это не он сам)
    if (findElement.left === null || findElement.left !== null && findElement.left.value !== maxChild.value) {
        maxChild.left = findElement.left;
    }
    // найденому потомку присваеваем правого потомка найденного элемента (только если это не он сам)
    if (findElement.right === null || findElement.right !== null && findElement.right.value !== maxChild.value) {
        maxChild.right = findElement.right;
    }
    // если у найденного элемента нет родителя, значит найденный потомок становится новым корнем дерева, возвращаем его
    if (parentElement === null) {
        return maxChild;
    }
    // родителю найденного элемента указываем на найденного потомка
    if (parentElement.left && parentElement.left.value === findElement.value) {
        parentElement.left = maxChild;
    }
    if (parentElement.right && parentElement.right.value === findElement.value) {
        parentElement.right = maxChild;
    }
    // возвращаем прежний корень
    return node;
}