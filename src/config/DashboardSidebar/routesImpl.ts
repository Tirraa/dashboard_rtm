import RoutesBase from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';
import { i18ns } from '../i18n';
import { DashboardRoutes, DashboardRoutesTitles } from './utils/RoutesMapping';

const BASE = getSlashEnvelope(RoutesBase.DASHBOARD);

export const dashboardRoutes: DashboardRoutes = {
  BASE_PAGE: RoutesBase.DASHBOARD,
  FOO_PAGE: BASE + 'foo',
  BAR_PAGE: BASE + 'bar'
};

const dashboard = i18ns.dashboard;
export const dashboardRoutesTitles: DashboardRoutesTitles = {
  BASE_PAGE: `${dashboard}.base-page`,
  FOO_PAGE: `${dashboard}.foo-page`,
  BAR_PAGE: `${dashboard}.bar-page`
};

export default dashboardRoutes;
