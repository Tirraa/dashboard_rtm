export function computeHTMLElementHeight(HtmlElement: HTMLElement): number {
  const { height } = HtmlElement.getBoundingClientRect();
  const { paddingTop, paddingBottom, marginTop, marginBottom } = getComputedStyle(HtmlElement);
  const heightDeltas = [paddingTop, paddingBottom, marginTop, marginBottom].map(parseFloat);
  const computedHeight = height + heightDeltas.reduce((acc, value) => acc + value, 0);
  return computedHeight;
}

export function computeHTMLElementWidth(HtmlElement: HTMLElement): number {
  const { width } = HtmlElement.getBoundingClientRect();
  const { paddingRight, paddingLeft, marginRight, marginLeft } = getComputedStyle(HtmlElement);
  const widthDeltas = [paddingRight, paddingLeft, marginRight, marginLeft].map(parseFloat);
  const computedWidth = width + widthDeltas.reduce((acc, value) => acc + value, 0);
  return computedWidth;
}
