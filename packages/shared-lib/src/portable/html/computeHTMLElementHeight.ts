// NOTE: includeMargins is a debt for now, remove it in the future if it's not needed
function computeHTMLElementHeight(htmlElement: HTMLElement, includeMargins: boolean = false): number {
  const { height } = htmlElement.getBoundingClientRect();
  if (!includeMargins) return height;

  const { marginBottom, marginTop } = getComputedStyle(htmlElement);
  const heightDeltas = [marginTop, marginBottom].map(parseFloat);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const computedHeight = height + Math.abs(heightDeltas.reduce((acc, value) => acc + value, 0));
  return computedHeight;
}

export default computeHTMLElementHeight;
