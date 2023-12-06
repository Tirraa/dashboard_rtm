function pluralize(word: string): string {
  if (word.endsWith('S')) word = word.slice(0, -1) + 's';
  return word.endsWith('s') ? word : word + 's';
}

export default pluralize;
