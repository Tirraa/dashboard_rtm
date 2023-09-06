type TRoutesBase = {
  SITEWIDE: string;
  DASHBOARD: string;
  PATCH_NOTES: string;
};

export const RoutesBase: TRoutesBase = {
  SITEWIDE: '/',
  DASHBOARD: '/dashboard',
  PATCH_NOTES: '/patch-notes'
} as const;

export default RoutesBase;
