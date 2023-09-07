import { AppPath } from '@/types/Next';

type TRoutesBase = {
  SITEWIDE: AppPath;
  DASHBOARD: AppPath;
  PATCH_NOTES: AppPath;
};

export const RoutesBase: TRoutesBase = {
  SITEWIDE: '/',
  DASHBOARD: '/dashboard',
  PATCH_NOTES: '/patch-notes'
} as const;

export default RoutesBase;
