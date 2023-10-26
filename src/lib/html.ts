import { RefObject } from 'react';
import { getRefCurrentPtr } from './react';

export const scrollToTop = (item?: HTMLElement) => (item ? item.scrollTo(0, 0) : window.scrollTo(0, 0));
export const resetWindowScroll = () => scrollToTop();
export const getDirection = () => window.getComputedStyle(document.documentElement).direction as 'rtl' | 'ltr';

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

export function resetScroll<T extends HTMLElement>(scrollableElementToResetRef?: RefObject<T>, alsoResetWindowScroll?: boolean) {
  if (!scrollableElementToResetRef) {
    resetWindowScroll();
    return;
  }

  const refCurrentPtr = getRefCurrentPtr(scrollableElementToResetRef);
  if (refCurrentPtr) scrollToTop(refCurrentPtr);
  if (alsoResetWindowScroll) resetWindowScroll();
}
