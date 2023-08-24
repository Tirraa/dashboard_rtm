import RoutesBase from '@/app/_config/routes';
import { getSlashEnvelope } from '@/app/_lib/str';
import { DashboardRoutes, DashboardRoutesTitles } from './utils/RoutesMapping';

const b = getSlashEnvelope(RoutesBase.dashboard);

// {ToDo} i18n this?
export const dashboardRoutes: DashboardRoutes = {
  BASE_PAGE: RoutesBase.dashboard,
  FOO_PAGE: b + 'foo',
  BAR_PAGE: b + 'bar'
};

// {ToDo} i18n this!
export const dashboardRoutesTitles: DashboardRoutesTitles = {
  BASE_PAGE: () => 'AAA Page',
  FOO_PAGE: () => 'BBB Page',
  BAR_PAGE: () => 'CCC Page'
};

export default dashboardRoutes;
