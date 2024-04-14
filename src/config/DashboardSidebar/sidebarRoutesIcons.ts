/* v8 ignore start */
// Stryker disable all

import type { DashboardRoutesIcons } from '@/config/DashboardSidebar/utils/IconsMapping';

import { ActivityLogIcon, SketchLogoIcon, DashboardIcon } from '@radix-ui/react-icons';

/* eslint-disable perfectionist/sort-objects */
const SIDEBAR_ROUTES_ICONS: DashboardRoutesIcons = {
  MAIN_PAGE: SketchLogoIcon,
  BAR_PAGE: ActivityLogIcon,
  FOO_PAGE: DashboardIcon
};
/* eslint-enable perfectionist/sort-objects */

export default SIDEBAR_ROUTES_ICONS;

// Stryker restore all
/* v8 ignore stop */
