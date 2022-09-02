export function arrayToHashmap<T>(arr: T[], keyfield: keyof T): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      hashmap[el[keyfield as any]] = el;
    }
  }
  return hashmap;
}
