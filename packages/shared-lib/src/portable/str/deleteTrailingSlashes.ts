function deleteTrailingSlashes(str: string): string {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const maxEndIndex = str.length - 1;
  let endIndex = maxEndIndex;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  while (endIndex >= 0 && str.charAt(endIndex) === '/') --endIndex;
  if (endIndex === maxEndIndex) return str;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (endIndex === -1) return '';

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const stringWithoutTrailingSlashes = str.substring(0, endIndex + 1);
  return stringWithoutTrailingSlashes;
}

export default deleteTrailingSlashes;
