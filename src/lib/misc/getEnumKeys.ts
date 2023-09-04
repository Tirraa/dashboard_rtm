export const getEnumKeys = (e: object): string[] => Object.keys(e).filter((key) => isNaN(Number(key)));
export const getEnumFirstKey = (e: object): string => getEnumKeys(e)[0];

export default getEnumKeys;
