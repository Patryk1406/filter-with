import { isDeepStrictEqual } from 'util';

const hasThreeConsecutiveChars = (phrase: string) => /\w{3,}/.test(phrase.trim());

const isSetOrMap = (value: unknown) => value instanceof Set || value instanceof Map;

const searchThroughObject = <T, K>(
  obj: T, phrase: K): boolean => {
  let result = false;
  for (const value of Object.values(obj)) {
    if (result) break;
    if (!value || typeof value === 'function'
      || (typeof value === 'string' && !hasThreeConsecutiveChars(value))
      || (Array.isArray(value) && value.length === 0)) {
      continue;
    }
    if (isDeepStrictEqual(value, phrase)) {
      result = true;
      break;
    }
    if (typeof value === 'object') {
      result = isSetOrMap(value)
        ? searchThroughObject(Array.from(value.values()), phrase)
        : searchThroughObject(value, phrase);
    }
  }
  return result;
};

export const filterWith = <T, K>(array: (Record<string, T>)[], elementToFind: K) => {
  if (!elementToFind
    || (typeof elementToFind === 'string' && !hasThreeConsecutiveChars(elementToFind))
    || array.length === 0) {
    return [];
  }
  return array.filter((element) => searchThroughObject(element, elementToFind));
};
