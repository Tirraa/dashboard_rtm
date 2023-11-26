export function deleteLeadingSlashes(str: string): string {
  const maxStartIndex = str.length - 1;
  let startIndex = 0;

  while (startIndex <= maxStartIndex && str.charAt(startIndex) === '/') startIndex += 1;
  if (startIndex === 0) return str;
  if (startIndex > maxStartIndex) return '';

  const stringWithoutLeadingSlashes = str.substring(startIndex);
  return stringWithoutLeadingSlashes;
}

export default deleteLeadingSlashes;
