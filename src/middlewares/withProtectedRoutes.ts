/* v8 ignore start */
// Stryker disable all

import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import type { NextRequestWithAuth } from 'next-auth/middleware';

import isProtectedRoute from '@/lib/misc/isProtectedRoute';
import { mainMiddlewaresChain } from '@/middlewaresChain';
import { getMaybeI18nFlagFromRequest } from '@/lib/next';
import { withAuth } from 'next-auth/middleware';
import ROUTES_ROOTS from '##/config/routes';

function authMiddleware(request: NextRequest) {
  const maybeI18nFlag = getMaybeI18nFlagFromRequest(request);
  const i18nPrefix = maybeI18nFlag ? '/' + maybeI18nFlag : '';

  return withAuth(mainMiddlewaresChain, {
    pages: { signIn: i18nPrefix + ROUTES_ROOTS.LANDING_PAGES + 'sign-up' }
  });
}

const withProtectedRoutes: MiddlewareFactory = (next: NextMiddleware) => async (req: NextRequest, _next: NextFetchEvent) => {
  const request = req as NextRequestWithAuth;
  if (isProtectedRoute(request.nextUrl.pathname)) return authMiddleware(request)(request, _next);
  const res = await next(request, _next);
  return res;
};

export default withProtectedRoutes;

// Stryker restore all
/* v8 ignore stop */
