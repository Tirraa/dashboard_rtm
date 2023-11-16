import computeHTMLElementHeight from './functions/html/computeHTMLElementHeight';
import computeHTMLElementWidth from './functions/html/computeHTMLElementWidth';
import createURLSearchParams from './functions/html/createURLSearchParams';
import getDirection from './functions/html/getDirection';
import preserveKeyboardNavigation from './functions/html/preserveKeyboardNavigation';
import resetScroll from './functions/html/resetScroll';
import resetWindowScroll from './functions/html/resetWindowScroll';
import scrollToTop from './functions/html/scrollToTop';

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
