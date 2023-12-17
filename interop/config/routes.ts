import type { AppPath } from '@rtm/shared-types/Next';

import getSlashEnvelope from '../../src/lib/portable/str/getSlashEnvelope';

type RoutesRootsKeys = 'PATCH_NOTES' | 'DASHBOARD' | 'WEBSITE' | 'BLOG';
type RoutesRoots = Record<RoutesRootsKeys, AppPath>;

const ROUTES_ROOTS_BASE = {
  WEBSITE: getSlashEnvelope('/'),
  BLOG: getSlashEnvelope('/')
} satisfies Partial<RoutesRoots>;

const blogRoutesBase = ROUTES_ROOTS_BASE.BLOG;
const dashboardRoutesBase = ROUTES_ROOTS_BASE.WEBSITE;

const BLOG_ROUTES_ROOTS = {
  PATCH_NOTES: blogRoutesBase + 'patch-notes'
} satisfies Partial<RoutesRoots>;

const DASHBOARD_ROUTES_ROOTS = {
  DASHBOARD: dashboardRoutesBase + 'dashboard'
} satisfies Partial<RoutesRoots>;

const ROUTES_ROOTS = {
  ...ROUTES_ROOTS_BASE,
  ...BLOG_ROUTES_ROOTS,
  ...DASHBOARD_ROUTES_ROOTS
} satisfies RoutesRoots;

export default ROUTES_ROOTS;
