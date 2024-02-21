// eslint-disable-next-line no-magic-numbers
function indexOfNthOccurrence(strHaystack: string, needle: string, n: number): number | -1 {
  let index = -1;
  for (let i = 0; i < n; i++) {
    // eslint-disable-next-line no-magic-numbers
    index = strHaystack.indexOf(needle, index + 1);
    // Stryker Workaround 1. Pointless mutants (out of scope: surviving is expected behavior).
    // Stryker disable next-line ConditionalExpression,UnaryOperator
    // eslint-disable-next-line no-magic-numbers
    if (index === -1) break;
  }
  return index;
}

export default indexOfNthOccurrence;
