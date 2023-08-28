/**
 * Convert an object array into a json object, with keys corresponding to array entries
 * @param keyfield any unique field which all array objects contain to use as hash keys (e.g. 'id')
 */
export function arrayToHashmap<T>(arr: T[], keyfield: keyof T): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      hashmap[el[keyfield as any]] = el;
    }
  }
  return hashmap;
}

export function sortJSONObjectByKey(data: any) {
  return Object.keys(data)
    .sort()
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
}

type DBComparisonTypes = string | number | Date | null | Record<string, any>;

/**
 * Minimal implementation to test limited object equivalence
 * Comparators are records with entries in string, number or Date format
 *
 * This list is updated only when unexpected differences are found
 * */
export function areDBObjectsEqual(
  a: Record<string, DBComparisonTypes> = {},
  b: Record<string, DBComparisonTypes> = {}
) {
  // Inner value comparison
  function areDBValuesEqual(valA: DBComparisonTypes, valB: DBComparisonTypes) {
    if (typeof valA !== typeof valB) {
      return false;
    }

    if (valA) {
      if (valA instanceof Date && valB instanceof Date) {
        return valA.getTime() === valB.getTime();
      }
      if (valA.constructor === {}.constructor) {
        const nestedEqual = areDBObjectsEqual(valA as any, valB as any);
        if (!nestedEqual) {
          // console.log("[M]", "parent", valA, valB);
        }
        return nestedEqual;
      }
    }

    return valA === valB;
  }
  // Main comparison
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  // ensure both have same number of keys
  if (aKeys.length !== bKeys.length) return false;
  // ensure every key in a matches every key in b
  const diffKey = aKeys.find((key) => !areDBValuesEqual(a[key], b[key]));
  if (diffKey) {
    // console.log("[M]", diffKey, a[diffKey], b[diffKey]);
    // console.log(a, b);
    return false;
  }
  return true;
}
