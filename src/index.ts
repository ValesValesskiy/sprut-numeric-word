import { DigitDictionary, PlaceDictionary, WordDictionary } from './types';
import { Digits, Places } from './dict';

const reverse = (str: string): string =>
    str.split('').reverse().join('');

const digitWords = (num: string, place: number, digits: DigitDictionary, sexType?: string): string => {
    let res = '';

    for(let i = 0; i < num.length; i++) {
        const localPlace = num.length - 1 - i;

        if (num[i] === '0') {
            continue;
        }

        const localDict = digits[localPlace];
        const dictDigits = Object
            .keys(localDict)
            .map(Number)
            .filter(key => !isNaN(key))
            .sort((a, b) => a > b ? -1 : (a < b ? 1 : 0))
            .map(key => key.toString());

        for(let dictDigit of dictDigits) {
            let isEqual = num.substring(i, i + dictDigit.length) === dictDigit;

            if (isEqual) {
                res += (localDict.placeExceptions?.[place]?.[Number(dictDigit)]
                    || (
                        sexType && localDict.sexType?.[sexType] ? (
                            localDict.sexType[sexType][Number(dictDigit)] || localDict[Number(dictDigit)]
                            )
                            : localDict[Number(dictDigit)]
                        )
                    ) + ' ';
                i += dictDigit.length - 1;
                break;
            }
        }
    }

    return res.trim();
}

const numericWordInner = (num: number, digits: DigitDictionary, places: PlaceDictionary, sexType?: string): Array<{ num: string; numWords: string; placeIndex: number, placeWords: string; }> => {
    if (num === 0) {
        return [{ numWords: digits[0]?.[0] ?? null, placeWords: '', num: '0', placeIndex: 0 }];
    }

    let n = num.toString(),
        placesIndicies = Object
            .keys(places)
            .map(Number)
            .filter(key => !isNaN(key))
            .sort((a, b) => a > b ? 1 : (a < b ? -1 : 0));

  
    placesIndicies.push(Infinity);

    const placeStack = placesIndicies.
        map((placeIndex, i, arr) => ({
            num: reverse(n).substring(arr[i - 1] || 0, placeIndex),
            placeIndex: arr[i - 1] || 0,
        }))
        .filter(({ num }) => num && Number(num) && !isNaN(Number(num)))
        .map(({num, placeIndex}) => ({
            num: reverse(num),
            placeIndex
        }))
        .reverse();

    placeStack.forEach(({ num, placeIndex }) => {
        if (!digits[num.length - 1]) {
            throw new Error(`[WordNum Error]: Требуется дополнить словари для текстового вывода числа ${n}`);
        }
    });

    const wordPalceStack = placeStack.map(({num, placeIndex}, i) => (
        {
            num,
            placeIndex,
            numWords: digitWords(num, placeIndex, digits, sexType)
        }
    ));

    return wordPalceStack.map(( {num, numWords, placeIndex }) => {
        if (placeIndex === 0) {
            return { numWords, placeWords: '', num, placeIndex };
        }

        const localDict = places[placeIndex];
        const dictDigits = Object
            .keys(localDict)
            .map(Number)
            .filter(key => !isNaN(key))
            .sort((a, b) => a > b ? -1 : (a < b ? 1 : 0))
            .map(key => key.toString());

        for(let dictDigit of dictDigits) {
            let isEqual = num.substring(num.length - dictDigit.length) === dictDigit;

            if (isEqual) {
                return { numWords, placeWords: localDict[Number(dictDigit)], num, placeIndex };
            }
        }
        
        return { numWords, placeWords: localDict.defaultWord, num, placeIndex };
    }).filter(({ numWords }) => numWords);
}

export const numericWord = (num: number, digits: DigitDictionary = Digits, places: PlaceDictionary = Places): string =>
    numericWordInner(num, digits, places).map(({ numWords, placeWords }) => numWords + ' ' + placeWords).join(' ').trim();

export const numericWordWithPostfix = (num: number, wordDict: WordDictionary, digits: DigitDictionary = Digits, places: PlaceDictionary = Places, isStringStart?: boolean): string => {
    const wordDictPlaces = Object.keys(wordDict).filter(key => !isNaN(Number(key)));

    if (wordDictPlaces.length > 1) {
        wordDictPlaces.sort((a, b) => a > b ? -1 : (a < b ? 1 : 0));
        const numStr = num.toString();
        let result = '';
        let printedPlaceIndex = 0;

        wordDictPlaces.forEach((wordPlace, index) => {
            if (numStr[Number(wordPlace)]) {
                const newWordDict = {
                    0: wordDict[Number(Number(wordPlace))]
                };
                const newValue = Number(
                    reverse(
                        reverse(numStr)
                            .substring(Number(wordPlace), index ? Number(wordDictPlaces[index - 1]) : numStr.length)
                    )
                );
                const resultPart = numericWordWithPostfix(newValue, newWordDict, digits, places, !printedPlaceIndex);

                result += resultPart ? `${resultPart} ` : '';
                printedPlaceIndex++;
            }
        });

        return result.trim();
    }
    
    if (num === 0 && isStringStart === false) {
        return '';
    }

    const numberPhrase = numericWordInner(num, digits, places, wordDict[0].sexType);

    let beforeUnion;

    const result = numberPhrase.map(({ num, numWords, placeWords, placeIndex }) => {
        if (wordDict[placeIndex]) {
            const localDict = wordDict[placeIndex];
            const dictDigits = Object
                .keys(localDict)
                .map(Number)
                .filter(key => !isNaN(key))
                .sort((a, b) => a > b ? -1 : (a < b ? 1 : 0))
                .map(key => key.toString());

            beforeUnion = localDict.beforeUnion || wordDict.defaultBeforeUnion;

            for(let dictDigit of dictDigits) {
                let isEqual = num.substring(num.length - dictDigit.length) === dictDigit;

                if (isEqual) {
                    return numWords + ' ' + localDict[Number(dictDigit)];
                }
            }

            return numWords + ' ' + localDict.defaultWord;
        } else {
            return numWords + ' ' + placeWords;
        }
    }).join(' ').trim();
    
    return (!isStringStart && beforeUnion ? `${beforeUnion} ` : '') + result;
}

export { RubDict, GrammDict, Digits, Places } from './dict';