import { AppPath } from '@/types/Next';

enum ERoutesBase {
  WEBSITE_ROOT,
  BLOG,
  PATCH_NOTES,
  DASHBOARD
}
type RoutesBaseKeys = keyof typeof ERoutesBase;

type TRoutesBase = Record<RoutesBaseKeys, AppPath>;

const Routes = {
  WEBSITE_ROOT: '/',
  BLOG: '/'
} satisfies Partial<TRoutesBase>;

const BLOG_ROUTES_BASE = Routes.BLOG;
const DASHBOARD_ROUTES_BASE = Routes.WEBSITE_ROOT;

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
