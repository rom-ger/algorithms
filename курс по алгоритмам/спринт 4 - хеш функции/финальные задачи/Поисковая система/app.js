// ID - 49640545

/**
 * Принцип работы алогритма:
 * При чтении из файла документов, формируем словарь вида {[слово]: {[индексДокумента1]: кол-воУпоминаний, [индексДокумента2]: кол-воУпоминаний}}
 * Дальше при чтении из файла запросов, формируем из каждого уникальной набор слов и каждым словом из запроса проходимся по словарю, таким образом, пройдя все слова из запроса мы за один раз узнаём релевантность каждого документа для этого запроса
 * 
 * n - кол-во документов
 * a - кол-во слов в документах
 * m - кол-во запросов
 * b - кол-во слов в запросе
 * 
 * Временная сложность:
 * 1. Проходим по каждому слову в каждом документе, записываем его в словарь O(a)
 * 2. Проходим по каждому запросу, в нём проходим по каждому слову и узнаём сколько раз он встречается в каждом документе O(b)
 * 3. В каждом запросе проходим по массиву релевантности (длинны n) и формируем итоговую релевантность документов O(n*m)
 * Итоговая сложность - линейная - O(a + b + n*m)
 * 
 * Пространственная сложность:
 * Самый большой кусок памяти выделяется под словарь слов в документах O(a)
 * Так же для каждого запроса формируется массив релевантности relevationsDocuments, это ещё O(n)
 * Остальные затраты памяти незначительны, итого сложность - линейная - O(a + n)
 */

const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const dex = 10;
let countDocuments = 0;
let countQuery = 0;
let result = '';
// здесь храним словарь слов из документов
let documentsCountsWords = {};

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        countDocuments = parseInt(line, dex);
    }
    if (index > 0 && index <= countDocuments) {
        let words = line.split(' ');
        // каждое слово из документа добавляем в словарь
        words.forEach(word => {
            if (documentsCountsWords[word] === undefined) {
                documentsCountsWords[word] = {
                    [index]: 1,
                }
            } else {
                documentsCountsWords[word][index] = documentsCountsWords[word][index] === undefined ? 1 : documentsCountsWords[word][index]+1;
            }
        });
    }
    if (index === countDocuments + 1) {
        countQuery = parseInt(line, dex);
    }
    if (index > countDocuments + 1 && index <= countDocuments + countQuery + 1) {
        // для каждого запроса, формируем уникальный set слов и отправляем в считалку
        countRelevationDocumentsForWords(Array.from(new Set(line.split(' '))))
    }
});

/**
 * Функция, которая по набору слов, определяем релевантные документы
 */
function countRelevationDocumentsForWords(queryWords) {
    let resultRelevation = [];
    // здесь будем хранить релевантности всех документов для этого запроса
    let relevationsDocuments = new Array(countDocuments).fill(0);
    queryWords.forEach(word => {
        // пытаемся найти слово из запроса в словаре
        let find = documentsCountsWords[word];
        if (find) {
            // если слово есть в словаре, то для каждого документа, где оно встречается увеличиваем релевантность
            Object.keys(find).forEach(indexDocument => {
                relevationsDocuments[indexDocument - 1] = relevationsDocuments[indexDocument - 1] === undefined ? find[indexDocument] : find[indexDocument] + relevationsDocuments[indexDocument - 1];
            })
        }
    });
    // после прогона всех слов, формируем итоговые данные про релевантность всех документов
    relevationsDocuments.forEach((relevation, indexDocument) => {
        if (relevation) {
            resultRelevation.push({
                index: indexDocument+1,
                relevation,
            });
        }
    });
    // сортируем по заданным правилам
    resultRelevation.sort((a, b) => {
        if (a.relevation === b.relevation) {
            return a.index - b.index;
        }
        return b.relevation - a.relevation;
    });
    // оставляем только первые пять документов и добавляем в вывод
    result = `${result}${result ? '\n' : ''}${resultRelevation.length ? resultRelevation.slice(0, 5).map(el => el.index).join(' ') : ''}`;
}

fs.writeFileSync('output.txt', result);