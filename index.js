const { numericWord, GrammDict, numericWordWithPostfix } = require('./dist');

console.log('8-996-619-24-87'.split('-').map((n) => numericWord(Number(n))).join(' '));

console.log(numericWordWithPostfix(2000001, GrammDict));