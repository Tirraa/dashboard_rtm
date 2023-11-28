import { getPathnameWithoutI18nFlag } from '@/lib/i18n';
import { getMaybeI18nFlagFromRequest } from '@/lib/next';
import { getSlashEnvelope } from '@/lib/str';
import { APP_PROTECTED_PATHS } from '@/middleware';
import { mainMiddlewaresChain } from '@/middlewaresChain';
import type { AppPath, MiddlewareFactory } from '@rtm/shared-types/src/Next';
import type { NextRequestWithAuth } from 'next-auth/middleware';
import { withAuth } from 'next-auth/middleware';
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

function authMiddleware(request: NextRequest) {
  const maybeI18nFlag = getMaybeI18nFlagFromRequest(request);
  const i18nPrefix = maybeI18nFlag ? getSlashEnvelope(maybeI18nFlag) : '/';

  return withAuth(mainMiddlewaresChain, {
    pages: { signIn: i18nPrefix + 'sign-up' }
  });
}

function isProtectedRoute(pathname: AppPath) {
  const currentRoute = getPathnameWithoutI18nFlag(pathname);
  const isProtectedRoute = APP_PROTECTED_PATHS.find((r) => currentRoute.startsWith(r));
  return Boolean(isProtectedRoute);
}

export const withProtectedRoutes: MiddlewareFactory = (next: NextMiddleware) => async (req: NextRequest, _next: NextFetchEvent) => {
  const request = req as NextRequestWithAuth;
  if (isProtectedRoute(request.nextUrl.pathname)) return authMiddleware(request)(request, _next);
  const res = await next(request, _next);
  return res;
};

export default withProtectedRoutes;
