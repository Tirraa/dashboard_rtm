import type { AuthRoutes } from '@/config/Auth/utils/RoutesMapping';

export const AUTH_ROUTES: AuthRoutes = {
  LOGIN: '/api/auth/signin'
} as const;
