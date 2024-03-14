function computeHTMLElementWidth(htmlElement: HTMLElement, includeMargins: boolean = false): number {
  const { width } = htmlElement.getBoundingClientRect();
  if (!includeMargins) return width;

  const { marginRight, marginLeft } = getComputedStyle(htmlElement);
  const widthDeltas = [marginRight, marginLeft].map(parseFloat);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const computedWidth = width + widthDeltas.reduce((acc, value) => acc + value, 0);
  return computedWidth;
}

export default computeHTMLElementWidth;
