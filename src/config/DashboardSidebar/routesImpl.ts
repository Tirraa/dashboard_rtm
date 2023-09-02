import RoutesBase from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';
import { i18ns } from '../i18n';
import { DashboardRoutes, DashboardRoutesTitles } from './utils/RoutesMapping';

const b = getSlashEnvelope(RoutesBase.dashboard);

export const dashboardRoutes: DashboardRoutes = {
  BASE_PAGE: RoutesBase.dashboard,
  FOO_PAGE: b + 'foo',
  BAR_PAGE: b + 'bar'
};

const dashboard = i18ns.dashboard;
export const dashboardRoutesTitles: DashboardRoutesTitles = {
  BASE_PAGE: `${dashboard}.base-page`,
  FOO_PAGE: `${dashboard}.foo-page`,
  BAR_PAGE: `${dashboard}.bar-page`
};

export default dashboardRoutes;
