const searchThroughObject = (obj: Record<string, unknown>, phrase: string): boolean => {
  let result = false;
  for (const value of Object.values(obj)) {
    if (typeof value === 'object' && value !== null) {
      result = searchThroughObject(value as Record<string, unknown>, phrase);
    } else if (typeof value === 'string' || typeof value === 'number') {
      result = String(value) === phrase;
    }
    if (result) break;
  }
  return result;
};

export const filterWith = (array: Record<string, unknown>[], phrase: string) => {
  if (!/\w{3,}/.test(phrase.trim()) || array.length === 0) return [];
  return array.filter((element) => searchThroughObject(element, phrase));
};
