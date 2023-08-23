export function indexOfNthOccurrence(str: string, needle: string, n: number) {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = str.indexOf(needle, index + 1);
    if (index === -1) break;
  }
  return index;
}

export default indexOfNthOccurrence;
