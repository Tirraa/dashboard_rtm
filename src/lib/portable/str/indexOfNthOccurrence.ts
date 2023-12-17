function indexOfNthOccurrence(strHaystack: string, needle: string, n: number): number | -1 {
  let index = -1;
  for (let i = 0; i < n; i++) {
    index = strHaystack.indexOf(needle, index + 1);
    if (index === -1) break;
  }
  return index;
}

export default indexOfNthOccurrence;
