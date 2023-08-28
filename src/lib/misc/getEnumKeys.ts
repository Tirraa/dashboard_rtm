export function getEnumKeys(e: object): string[] {
  return Object.keys(e).filter((key) => isNaN(Number(key))) as string[];
}

export function getEnumFirstKey(e: object): string {
  return Object.values(e)[0] as string;
}

export default getEnumKeys;
