export function computeHTMLElementHeight(HtmlElement: HTMLElement) {
  const { height } = HtmlElement.getBoundingClientRect();
  const { paddingTop, paddingBottom, marginTop, marginBottom } = getComputedStyle(HtmlElement);
  const heightDeltas = [paddingTop, paddingBottom, marginTop, marginBottom].map(parseFloat);
  const computedHeight = height + heightDeltas.reduce((acc, value) => acc + value, 0);
  return computedHeight;
}

export function computeHTMLElementWidth(HtmlElement: HTMLElement) {
  const { height } = HtmlElement.getBoundingClientRect();
  const { paddingRight, paddingLeft, marginRight, marginLeft } = getComputedStyle(HtmlElement);
  const heightDeltas = [paddingRight, paddingLeft, marginRight, marginLeft].map(parseFloat);
  const computedHeight = height + heightDeltas.reduce((acc, value) => acc + value, 0);
  return computedHeight;
}
