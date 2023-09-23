import ROUTES_ROOTS from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';
import { i18ns } from '../i18n';
import { DashboardRoutes, DashboardRoutesTitles } from './utils/RoutesMapping';

const BASE = getSlashEnvelope(ROUTES_ROOTS.DASHBOARD);

export const DASHBOARD_ROUTES: DashboardRoutes = {
  BASE_PAGE: ROUTES_ROOTS.DASHBOARD,
  FOO_PAGE: BASE + 'foo',
  BAR_PAGE: BASE + 'bar'
};

const dashboard = i18ns.dashboard;
export const DASHBOARD_ROUTES_TITLES: DashboardRoutesTitles = {
  BASE_PAGE: `${dashboard}.base-page`,
  FOO_PAGE: `${dashboard}.foo-page`,
  BAR_PAGE: `${dashboard}.bar-page`
};

export default DASHBOARD_ROUTES;
