import type { RefObject } from 'react';
import getRefCurrentPtr from '../react/getRefCurrentPtr';
import resetWindowScroll from './resetWindowScroll';
import scrollToTop from './scrollToTop';

function resetScroll<T extends HTMLElement>(scrollableElementToResetRef?: RefObject<T>, alsoResetWindowScroll?: boolean) {
  if (!scrollableElementToResetRef) {
    resetWindowScroll();
    return;
  }

  const scrollableElementToResetInstance = getRefCurrentPtr(scrollableElementToResetRef);
  if (scrollableElementToResetInstance) scrollToTop(scrollableElementToResetInstance);
  if (alsoResetWindowScroll) resetWindowScroll();
}

export default resetScroll;
