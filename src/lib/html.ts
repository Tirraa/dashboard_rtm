/* v8 ignore start */
// Stryker disable all

import { FOOTER_CONTAINER_ID, SITEWIDE_NAVBAR_ID, BODY_CONTAINER_ID } from '@/config/elementsId';

export const getBodyContainer = () => document.getElementById(BODY_CONTAINER_ID) as HTMLElement;

export const getNavbar = () => document.getElementById(SITEWIDE_NAVBAR_ID);

export const getFooter = () => document.getElementById(FOOTER_CONTAINER_ID);

// Stryker restore all
/* v8 ignore stop */
