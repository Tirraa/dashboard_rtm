/* v8 ignore start */
// Stryker disable all

import ELEMENTS_ID from '@/config/elementsId';

export const getBodyContainer = () => document.getElementById(ELEMENTS_ID.BODY_CONTAINER) as HTMLElement;

export const getNavbar = () => document.getElementById(ELEMENTS_ID.SITEWIDE_NAVBAR);

export const getFooter = () => document.getElementById(ELEMENTS_ID.FOOTER_CONTAINER);

// Stryker restore all
/* v8 ignore stop */
