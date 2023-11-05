import ELEMENTS_ID from '@/config/elementsId';
import type { Direction } from '@/types/HTML';
import type { LineSegment } from '@/types/Math';
import type { RefObject } from 'react';
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

  const scrollableElementToResetInstance = getRefCurrentPtr(scrollableElementToResetRef);
  if (scrollableElementToResetInstance) scrollToTop(scrollableElementToResetInstance);
  if (alsoResetWindowScroll) resetWindowScroll();
}

export function preserveKeyboardNavigation(element: EventTarget | HTMLElement) {
  if (!(element instanceof HTMLElement)) return;

  const linkElement = element.querySelector('a');
  const buttonElement = !linkElement ? element.querySelector('button') : undefined;

  if (linkElement) linkElement.click();
  else if (buttonElement) buttonElement.click();
}

export const getCurrentDir = () => document.documentElement.dir as Direction;

export const getBodyContainer = () => document.getElementById(ELEMENTS_ID.BODY_CONTAINER) as HTMLElement;

export function getDOMRectDiagonal(rect: DOMRect): LineSegment {
  const startX = rect.x;
  const endX = rect.x + rect.width;
  const startY = rect.y;
  const endY = rect.y + rect.height;

  return { start: { x: startX, y: startY }, end: { x: endX, y: endY } };
}
