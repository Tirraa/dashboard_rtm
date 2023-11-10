export function deleteTrailingSlashes(str: string): string {
  const maxEndIndex = str.length - 1;
  let endIndex = maxEndIndex;

  while (endIndex >= 0 && str.charAt(endIndex) === '/') endIndex -= 1;
  if (endIndex === maxEndIndex) return str;
  if (endIndex === -1) return '';

  const stringWithoutTrailingSlashes = str.substring(0, endIndex + 1);
  return stringWithoutTrailingSlashes;
}

export default deleteTrailingSlashes;
