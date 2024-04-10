export type DigitList<T = string> = {
    /** Ключ-число */
    [Digit: number]: T;
};

export type WordDictionary = DigitList<DigitList & {
    /** Слово по умолчанию */
    defaultWord: string;
    /** Союз перед строкой единицы измерения */
    beforeUnion?: string;
    /** Склонение */
    sexType?: string;
}> & {
    /** Союз по умолчанию */
    defaultBeforeUnion?: string;
};

export type DigitDictionary = DigitList<DigitList & {
    /** Тип склонения */
    sexType?: {
        /** Строки чисел для данного склонения */
        [Sex: string]: DigitList;
    };
    /** Слова-исключения для склонения по разрядам чисел */
    placeExceptions?: DigitList<DigitList>;
}>;

export type PlaceDictionary = DigitList<DigitList & {
    /** Слово по умолчанию */
    defaultWord: string;
}>