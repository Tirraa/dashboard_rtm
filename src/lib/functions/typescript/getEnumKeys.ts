export const getEnumKeys = (e: object): string[] => Object.keys(e).filter((key) => isNaN(Number(key)));

export default getEnumKeys;
