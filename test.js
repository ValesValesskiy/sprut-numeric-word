const { getResults, test } = require('./utils/test');
const { numericWord, numericWordWithPostfix, RubDict, GrammDict, onlyPostfix } = require('./dist');

const numericWordDefaultTestTitle = 'Результат для числа $1:';
const numericWordGrammTestTitle = 'Результат для числа $1(в граммах):';

const numericWordDefaultBlock = 'Тестирование `numericWord` со словарём по умолчанию:';
const numericWordGrammBlock = 'Тестирование `numericWordWithPostfix` со словарём единиц массы(число - количество граммов):';
const numericWordGrammBlockWithCentnerBlock = 'Тестирование `numericWordWithPostfix` с модифицированным словарём единиц массы с добавлением центнеров в пятом разряде(10 000 граммов - 1 центнер):';
const numericWordOnlyGrammBlock = 'Тестирование `onlyPostfix` со словарём единиц массы(только граммы - `GrammDict[0]`):';

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
    numericWordGrammTestTitle,
    'четыре тысячи триста тридцать две тонны пятьсот два килограмма пятьсот восемьдесят два грамма',
    numericWordWithPostfix,
    4332502582,
    GrammDict
);
test(
    numericWordGrammBlock,
    numericWordGrammTestTitle,
    'ноль граммов',
    numericWordWithPostfix,
    0,
    GrammDict
);
test(
    numericWordGrammBlock,
    numericWordGrammTestTitle,
    'две тонны пятьдесят два грамма',
    numericWordWithPostfix,
    2000052,
    GrammDict
);
test(
    numericWordGrammBlock,
    numericWordGrammTestTitle,
    'две тонны',
    numericWordWithPostfix,
    2000000,
    GrammDict
);
test(
    numericWordGrammBlock,
    numericWordGrammTestTitle,
    'одна тонна',
    numericWordWithPostfix,
    1000000,
    GrammDict
);
test(
    numericWordGrammBlock,
    numericWordGrammTestTitle,
    'одна тысяча тонн',
    numericWordWithPostfix,
    1000000000,
    GrammDict
);
test(
    numericWordGrammBlock,
    numericWordGrammTestTitle,
    'два грамма',
    numericWordWithPostfix,
    2,
    GrammDict
);

test(
    numericWordGrammBlockWithCentnerBlock,
    numericWordGrammTestTitle,
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

test(
    numericWordOnlyGrammBlock,
    numericWordDefaultTestTitle,
    'граммов',
    onlyPostfix,
    1000,
    {
        0: GrammDict[0]
    }
);
test(
    numericWordOnlyGrammBlock,
    numericWordDefaultTestTitle,
    'грамма',
    onlyPostfix,
    2,
    {
        0: GrammDict[0]
    }
);