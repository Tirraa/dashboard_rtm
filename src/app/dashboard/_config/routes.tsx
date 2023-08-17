import getSlashEnvelope from '@/app/_lib/getSlashEnvelope';
import { DashboardRoutes, DashboardRoutesTitles } from './utils/types';

export const dashboardRouteBase = '/dashboard';
const b = getSlashEnvelope(dashboardRouteBase);

// {ToDo} i18n this?
export const dashboardRoutes: DashboardRoutes = {
  BASE_PAGE: b,
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
