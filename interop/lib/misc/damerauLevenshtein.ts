/* eslint-disable @typescript-eslint/no-magic-numbers */
function damerauLevenshtein(s1: string, s2: string, threshold: number = -1): number {
  if (s1 === s2) return 0;
  if (threshold === 0) return 1;

  const [s1len, s2len] = [s1.length, s2.length];
  const matrix: number[][] = Array.from({ length: s1len + 1 }, () => new Array(s2len + 1).fill(0));
  let currentMinDistance = Number.MAX_VALUE;

  for (let i = 1; i <= s1len; i++) matrix[i][0] = i;

  for (let j = 1; j <= s2len; j++) matrix[0][j] = j;

  for (let i = 1; i <= s1len; i++) {
    for (let j = 1; j <= s2len; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
        if (i > 1 && j > 1 && s1[i - 1] === s2[j - 2] && s1[i - 2] === s2[j - 1]) {
          matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + 1);
        }
      }

      if (matrix[i][j] < currentMinDistance) currentMinDistance = matrix[i][j];
    }

    if (0 < threshold && threshold < currentMinDistance) return threshold + 1;
  }

  return matrix[s1len][s2len];
}
/* eslint-enable @typescript-eslint/no-magic-numbers */

export default damerauLevenshtein;
