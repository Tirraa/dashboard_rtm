/* v8 ignore start */
// Stryker disable all

import type { PxValue } from '@rtm/shared-types/Numbers';

type NavbarStyleType = {
  LOGO_HEIGHT: PxValue;
  LOGO_WIDTH: PxValue;
};

const NAVBAR_STYLE: NavbarStyleType = {
  LOGO_HEIGHT: 70,
  LOGO_WIDTH: 99
} as const;

export default NAVBAR_STYLE;

// Stryker restore all
/* v8 ignore stop */
