import { AppPath } from '@/types/Next';

enum ERoutesBase {
  SITEWIDE,
  BLOG,
  PATCH_NOTES,
  DASHBOARD
}
type RoutesBaseKeys = keyof typeof ERoutesBase;

type TRoutesBase = Record<RoutesBaseKeys, AppPath>;

const Routes = {
  SITEWIDE: '/',
  BLOG: '/'
} satisfies Partial<TRoutesBase>;

const BLOG_ROUTES_BASE = Routes.BLOG;
const DASHBOARD_ROUTES_BASE = Routes.SITEWIDE;

const BlogRoutes = {
  PATCH_NOTES: BLOG_ROUTES_BASE + 'patch-notes'
} satisfies Partial<TRoutesBase>;

const DashboardRoutes = {
  DASHBOARD: DASHBOARD_ROUTES_BASE + 'dashboard'
} satisfies Partial<TRoutesBase>;

export const RoutesBase = {
  ...Routes,
  ...BlogRoutes,
  ...DashboardRoutes
} satisfies TRoutesBase;

export default RoutesBase;
