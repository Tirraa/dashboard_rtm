function deleteLeadingSlashes(str: string): string {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const maxStartIndex = str.length - 1;
  let startIndex = 0;

  while (startIndex <= maxStartIndex && str.charAt(startIndex) === '/') ++startIndex;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (startIndex === 0) return str;
  if (startIndex > maxStartIndex) return '';

  const stringWithoutLeadingSlashes = str.substring(startIndex);
  return stringWithoutLeadingSlashes;
}

export default deleteLeadingSlashes;
