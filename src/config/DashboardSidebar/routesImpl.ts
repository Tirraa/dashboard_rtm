import { i18ns } from '@/config/i18n';
import RoutesBase from '@/config/routes';
import { getSlashEnvelope } from '@/lib/str';
import { DashboardRoutes, DashboardRoutesTitles } from './utils/RoutesMapping';

const b = getSlashEnvelope(RoutesBase.dashboard);

export const dashboardRoutes: DashboardRoutes = {
  BASE_PAGE: RoutesBase.dashboard,
  FOO_PAGE: b + 'foo',
  BAR_PAGE: b + 'bar'
};

const ns = i18ns.dashboard;
export const dashboardRoutesTitles: DashboardRoutesTitles = {
  BASE_PAGE: { targetKey: 'base-page', ns },
  FOO_PAGE: { targetKey: 'foo-page', ns },
  BAR_PAGE: { targetKey: 'bar-page', ns }
};

export default dashboardRoutes;
