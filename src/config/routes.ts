import { AppPath } from '@/types/Next';

export const RoutesBase: Record<string, AppPath> = {
  SITEWIDE: '/',
  DASHBOARD: '/dashboard',
  PATCH_NOTES: '/patch-notes'
} as const;

export default RoutesBase;
