const { getResults, test } = require('./utils/test');
const { numericWord, numericWordWithPostfix, RubDict, GrammDict } = require('./dist');

const numericWordDefaultTestTitle = 'Результат для числа $1:';

const numericWordDefaultBlock = 'Тестирование `numericWord` со словарём по умолчанию:';
const numericWordGrammBlock = 'Тестирование `numericWordWithPostfix` со словарём единиц массы(число - количество граммов):';
const numericWordGrammBlockWithCentnerBlock = 'Тестирование `numericWordWithPostfix` с модифицированным словарём единиц массы с добавлением центнеров в пятом разряде(10 000 граммов - 1 центнер):';

test(
    numericWordDefaultBlock,
    numericWordDefaultTestTitle,
    'ноль',
    numericWord,
    0
);
test(
    numericWordDefaultBlock,
    numericWordDefaultTestTitle,
    'сто двадцать три',
    numericWord,
    123
);
test(
    numericWordDefaultBlock,
    numericWordDefaultTestTitle,
    'двадцать три тысячи сто двадцать три',
    numericWord,
    23123
);
test(
    numericWordDefaultBlock,
    numericWordDefaultTestTitle,
    'пять тысяч',
    numericWord,
    5000
);
test(
    numericWordDefaultBlock,
    numericWordDefaultTestTitle,
    'сто тринадцать тысяч восемьдесят семь',
    numericWord,
    113087
);
test(
    numericWordDefaultBlock,
    numericWordDefaultTestTitle,
    'два миллиона пятьсот тысяч пятьсот восемьдесят семь',
    numericWord,
    2500587
);

test(
    numericWordGrammBlock,
    numericWordDefaultTestTitle,
    'четыре тысячи триста тридцать две тонны пятьсот два килограмма пятьсот восемьдесят два грамма',
    numericWordWithPostfix,
    4332502582,
    GrammDict
);
test(
    numericWordGrammBlock,
    numericWordDefaultTestTitle,
    'ноль граммов',
    numericWordWithPostfix,
    0,
    GrammDict
);
test(
    numericWordGrammBlock,
    numericWordDefaultTestTitle,
    'две тонны пятьдесят два грамма',
    numericWordWithPostfix,
    2000052,
    GrammDict
);


test(
    numericWordGrammBlockWithCentnerBlock,
    numericWordDefaultTestTitle,
    'четыре тысячи триста тридцать две тонны пять центнеров двенадцать килограммов пятьсот восемьдесят два грамма',
    numericWordWithPostfix,
    4332512582,
    {
        ...GrammDict,
        5: {
            1: 'центнер', 2: 'центнера', 3: 'центнера', 4: 'центнера', 11: 'центнеров', 12: 'центнеров', 13: 'центнеров', 14: 'центнеров', defaultWord: 'центнеров'
        }
    }
);