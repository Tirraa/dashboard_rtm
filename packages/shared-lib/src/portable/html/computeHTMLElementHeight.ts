function computeHTMLElementHeight(htmlElement: HTMLElement): number {
  const { height } = htmlElement.getBoundingClientRect();
  const { marginBottom, marginTop } = getComputedStyle(htmlElement);
  const heightDeltas = [marginTop, marginBottom].map(parseFloat);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const computedHeight = height + heightDeltas.reduce((acc, value) => acc + value, 0);
  return computedHeight;
}

export default computeHTMLElementHeight;
