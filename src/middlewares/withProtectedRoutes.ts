import { getPathnameWithoutI18nFlag } from '@/lib/i18n';
import { appProtectedPaths, authMiddleware } from '@/middleware';
import { MiddlewareFactory } from '@/types/Next';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

function isProtectedRoute(request: NextRequest) {
  const currentRoute = getPathnameWithoutI18nFlag(request.nextUrl.pathname);
  const isProtectedRoute = appProtectedPaths.find((r) => currentRoute.startsWith(r));
  return Boolean(isProtectedRoute);
}

export const withProtectedRoutes: MiddlewareFactory = (next: NextMiddleware) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const request = req as NextRequestWithAuth;
    if (isProtectedRoute(request)) return authMiddleware(request)(request, _next);
    const res = await next(request, _next);
    return res;
  };
};

export default withProtectedRoutes;
