import { isDeepStrictEqual } from 'util';

const isString = (value: unknown) => typeof value === 'string';

const hasThreeConsecutiveChars = (value: string) => /\w{3,}/.test(value.trim());

const isStringAndHasNotThreeConsecutiveChars = (value: unknown): boolean => isString(value)
  && !hasThreeConsecutiveChars(value as string);

const isSetOrMap = (value: unknown): boolean => value instanceof Set || value instanceof Map;

const isFunction = (value: unknown): boolean => typeof value === 'function';

const isEmptyArray = (value: unknown): boolean => Array.isArray(value) && value.length === 0;

const searchThroughObject = <T, K>(
  obj: T, phrase: K): boolean => Object.values(obj)
    .some((value) => {
      if (!value || isFunction(value)
      || isStringAndHasNotThreeConsecutiveChars(value)
      || isEmptyArray(value)) {
        return false;
      }
      if (isDeepStrictEqual(value, phrase)) return true;
      if (typeof value === 'object') {
        return isSetOrMap(value)
          ? searchThroughObject(Array.from(value.values()), phrase)
          : searchThroughObject(value, phrase);
      }
      return false;
    });

export const filterWith = <T, K>(array: (Record<string, T>)[], elementToFind: K) => {
  if (!elementToFind
    || isStringAndHasNotThreeConsecutiveChars(elementToFind)
    || array.length === 0) {
    return [];
  }
  return array.filter((element) => searchThroughObject(element, elementToFind));
};
