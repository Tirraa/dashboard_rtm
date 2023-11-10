import computeHTMLElementHeight from './app-agnostic/html/computeHTMLElementHeight';
import computeHTMLElementWidth from './app-agnostic/html/computeHTMLElementWidth';
import createURLSearchParams from './app-agnostic/html/createURLSearchParams';
import getDirection from './app-agnostic/html/getDirection';
import preserveKeyboardNavigation from './app-agnostic/html/preserveKeyboardNavigation';
import resetScroll from './app-agnostic/html/resetScroll';
import resetWindowScroll from './app-agnostic/html/resetWindowScroll';
import scrollToTop from './app-agnostic/html/scrollToTop';

import ELEMENTS_ID from '@/config/elementsId';

export const getBodyContainer = () => document.getElementById(ELEMENTS_ID.BODY_CONTAINER) as HTMLElement;

export {
  computeHTMLElementHeight,
  computeHTMLElementWidth,
  createURLSearchParams,
  getDirection,
  preserveKeyboardNavigation,
  resetScroll,
  resetWindowScroll,
  scrollToTop
};
