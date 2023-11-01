import type { AppPath } from '@/types/Next';

enum ERoutesRoots {
  WEBSITE,
  BLOG,
  PATCH_NOTES,
  DASHBOARD
}
type RoutesRootsKeys = keyof typeof ERoutesRoots;

type TRoutesRoots = Record<RoutesRootsKeys, AppPath>;

const ROUTES_ROOTS_BASE = {
  WEBSITE: '/',
  BLOG: '/'
} satisfies Partial<TRoutesRoots>;

const blogRoutesBase = ROUTES_ROOTS_BASE.BLOG;
const dashboardRoutesBase = ROUTES_ROOTS_BASE.WEBSITE;

const BLOG_ROUTES_ROOTS = {
  PATCH_NOTES: blogRoutesBase + 'patch-notes'
} satisfies Partial<TRoutesRoots>;

const DASHBOARD_ROUTES_ROOTS = {
  DASHBOARD: dashboardRoutesBase + 'dashboard'
} satisfies Partial<TRoutesRoots>;

export const ROUTES_ROOTS = {
  ...ROUTES_ROOTS_BASE,
  ...BLOG_ROUTES_ROOTS,
  ...DASHBOARD_ROUTES_ROOTS
} satisfies TRoutesRoots;

export default ROUTES_ROOTS;
