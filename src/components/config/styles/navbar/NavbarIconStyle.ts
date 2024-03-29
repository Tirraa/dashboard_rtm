/* v8 ignore start */
// Stryker disable all

import type { PxValue } from '@rtm/shared-types/Numbers';

type NavbarIconStyleType = {
  SIZE_PX_VALUE: PxValue;
};

const NAVBAR_ICON_STYLE: NavbarIconStyleType = {
  SIZE_PX_VALUE: 25
} as const;

export default NAVBAR_ICON_STYLE;

// Stryker restore all
/* v8 ignore stop */
