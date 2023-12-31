/* v8 ignore start */
// Stryker disable all
import type { DashboardRoutesIcons } from '@/config/DashboardSidebar/utils/IconsMapping';

import { RxActivityLog, RxSketchLogo, RxDashboard } from 'react-icons/rx';

/* eslint-disable perfectionist/sort-objects */
const SIDEBAR_ROUTES_ICONS: DashboardRoutesIcons = {
  MAIN_PAGE: RxSketchLogo,
  BAR_PAGE: RxActivityLog,
  FOO_PAGE: RxDashboard
};
/* eslint-enable perfectionist/sort-objects */

export default SIDEBAR_ROUTES_ICONS;
/* v8 ignore stop */
// Stryker restore all
