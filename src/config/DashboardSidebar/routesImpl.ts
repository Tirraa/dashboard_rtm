import { i18ns } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import type { DashboardRoutes, DashboardRoutesTitles } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { getSlashEnvelope } from '@/lib/str';

const BASE = getSlashEnvelope(ROUTES_ROOTS.DASHBOARD);

export const DASHBOARD_ROUTES: DashboardRoutes = {
  MAIN_PAGE: ROUTES_ROOTS.DASHBOARD,
  FOO_PAGE: BASE + 'foo',
  BAR_PAGE: BASE + 'bar'
} as const;

const dashboard = i18ns.dashboard;
export const DASHBOARD_ROUTES_TITLES: DashboardRoutesTitles = {
  MAIN_PAGE: `${dashboard}.pages-titles.main`,
  FOO_PAGE: `${dashboard}.pages-titles.foo`,
  BAR_PAGE: `${dashboard}.pages-titles.bar`
} as const;

export default DASHBOARD_ROUTES;
