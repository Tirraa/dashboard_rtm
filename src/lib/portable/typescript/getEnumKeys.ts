const getEnumKeys = <T extends Record<string, unknown>>(enumerableObject: T): (keyof T)[] =>
  Object.keys(enumerableObject).filter((key) => isNaN(Number(key)));

export default getEnumKeys;
