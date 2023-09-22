import HtmlConfig from '@/config/html';
import { serverCtx } from './next';

export function computeHTMLElementHeight(htmlElement: HTMLElement): number {
  const { height } = htmlElement.getBoundingClientRect();
  const { marginTop, marginBottom } = getComputedStyle(htmlElement);
  const heightDeltas = [marginTop, marginBottom].map(parseFloat);
  const computedHeight = height + heightDeltas.reduce((acc, value) => acc + value, 0);
  return computedHeight;
}

export function computeHTMLElementWidth(htmlElement: HTMLElement): number {
  const { width } = htmlElement.getBoundingClientRect();
  const { marginRight, marginLeft } = getComputedStyle(htmlElement);
  const widthDeltas = [marginRight, marginLeft].map(parseFloat);
  const computedWidth = width + widthDeltas.reduce((acc, value) => acc + value, 0);
  return computedWidth;
}

export function pxValueToRemValue(pxValue: number): number {
  if (serverCtx()) return pxValue / HtmlConfig.ROOT_FONT_SIZE_PX_VALUE_FALLBACK;
  const htmlElement = document.documentElement;
  const rootFontSize = window.getComputedStyle(htmlElement).fontSize;
  const rootFontSizeValue = parseFloat(rootFontSize);
  return pxValue / rootFontSizeValue;
}
