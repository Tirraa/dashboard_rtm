import { AUTH_ROUTES } from '@/config/Auth/routesImpl';
import { i18ns } from '@/config/i18n';
import { NavbarExtrasRoutes, NavbarExtrasRoutesTitles } from './utils/RoutesMapping';

export const NAVBAR_EXTRAS_ROUTES: NavbarExtrasRoutes = {
  LOGIN: AUTH_ROUTES.LOGIN
};

const auth = i18ns.auth;
export const DASHBOARD_ROUTES_TITLES: NavbarExtrasRoutesTitles = {
  LOGIN: `${auth}.login`
};

export default NAVBAR_EXTRAS_ROUTES;
