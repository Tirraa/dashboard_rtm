export function computeHTMLElementHeight(htmlElement: HTMLElement): number {
  const { height } = htmlElement.getBoundingClientRect();
  const { marginTop, marginBottom } = getComputedStyle(htmlElement);
  const heightDeltas = [marginTop, marginBottom].map(parseFloat);
  const computedHeight = height + heightDeltas.reduce((acc, value) => acc + value, 0);
  return computedHeight;
}

export default computeHTMLElementHeight;
