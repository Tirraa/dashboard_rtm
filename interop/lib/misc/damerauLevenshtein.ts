/* eslint-disable @typescript-eslint/no-magic-numbers */
function damerauLevenshtein(s1: string, s2: string): number {
  const s1len = s1.length;
  const s2len = s2.length;
  const matrix: number[][] = Array.from({ length: s1len + 1 }, () => new Array(s2len + 1).fill(0));

  for (let i: number = 1; i <= s1len; i++) {
    matrix[i][0] = i;
  }

  for (let j: number = 1; j <= s2len; j++) {
    matrix[0][j] = j;
  }

  for (let i: number = 1; i <= s1len; i++) {
    for (let j: number = 1; j <= s2len; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
        if (i > 1 && j > 1 && s1[i - 1] === s2[j - 2] && s1[i - 2] === s2[j - 1]) {
          matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + 1);
        }
      }
    }
  }
  return matrix[s1len][s2len];
}
/* eslint-enable @typescript-eslint/no-magic-numbers */

export default damerauLevenshtein;
