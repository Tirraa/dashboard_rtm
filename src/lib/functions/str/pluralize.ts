export function pluralize(word: string): string {
  if (word.toLocaleLowerCase().endsWith('S')) word = word.slice(0, -1);
  return word.endsWith('s') ? word : word + 's';
}

export default pluralize;
