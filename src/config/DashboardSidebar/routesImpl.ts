/* v8 ignore start */
import type { DashboardRoutesTitles, DashboardRoutes } from '@/config/DashboardSidebar/utils/RoutesMapping';

import { getSlashEnvelope } from '@/lib/str';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

const BASE = getSlashEnvelope(ROUTES_ROOTS.DASHBOARD);

const DASHBOARD_ROUTES: DashboardRoutes = {
  MAIN_PAGE: ROUTES_ROOTS.DASHBOARD,
  FOO_PAGE: BASE + 'foo',
  BAR_PAGE: BASE + 'bar'
} as const;

const { dashboardPagesTitles } = i18ns;
export const DASHBOARD_ROUTES_TITLES: DashboardRoutesTitles = {
  MAIN_PAGE: `${dashboardPagesTitles}.main`,
  FOO_PAGE: `${dashboardPagesTitles}.foo`,
  BAR_PAGE: `${dashboardPagesTitles}.bar`
} as const;

export default DASHBOARD_ROUTES;
/* v8 ignore stop */
