/* v8 ignore start */
// Stryker disable all

import type { RefObject } from 'react';

import getRefCurrentPtr from '../react/getRefCurrentPtr';
import resetWindowScroll from './resetWindowScroll';
import snapToTopLeft from './snapToTopLeft';

function resetScroll<T extends HTMLElement>(scrollableElementToResetRef?: RefObject<T>, alsoResetWindowScroll?: boolean) {
  if (!scrollableElementToResetRef) {
    resetWindowScroll();
    return;
  }

  const scrollableElementToResetInstance = getRefCurrentPtr(scrollableElementToResetRef);
  if (scrollableElementToResetInstance) snapToTopLeft(scrollableElementToResetInstance);
  if (alsoResetWindowScroll) resetWindowScroll();
}

export default resetScroll;

// Stryker restore all
/* v8 ignore stop */
