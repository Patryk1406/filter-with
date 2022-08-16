import { isDeepStrictEqual } from 'util';

const isString = (value: unknown) => typeof value === 'string';

const hasThreeConsecutiveChars = (value: string) => /\w{3,}/.test(value.trim());

const canBeSearchedString = (value: unknown): boolean => isString(value)
  && !hasThreeConsecutiveChars(value as string);

const isSetOrMap = (value: unknown): boolean => value instanceof Set || value instanceof Map;

const isFunction = (value: unknown): boolean => typeof value === 'function';

const isEmptyArray = (value: unknown): boolean => Array.isArray(value) && value.length === 0;

const cannotBeTarget = (value: unknown): boolean => !value || isFunction(value)
  || canBeSearchedString(value)
  || isEmptyArray(value);

const searchThroughObject = <T, K>(
  obj: T, target: K): boolean => Object.values(obj)
    .some((value) => {
      if (cannotBeTarget(value)) {
        return false;
      }
      if (isDeepStrictEqual(value, target)) return true;
      if (typeof value === 'object') {
        return isSetOrMap(value)
          ? searchThroughObject(Array.from(value.values()), target)
          : searchThroughObject(value, target);
      }
      return false;
    });

export const filterWith = <T, K>(
  array: Record<string, T>[], elementToFind: K): [] | Record<string, T>[] => {
  if (!elementToFind
    || canBeSearchedString(elementToFind)
    || array.length === 0) {
    return [];
  }
  return array.filter((element) => searchThroughObject(element, elementToFind));
};
