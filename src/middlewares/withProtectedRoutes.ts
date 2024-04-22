/* v8 ignore start */
// Stryker disable all

import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import type { MiddlewareFactory, AppPath } from '@rtm/shared-types/Next';
import type { NextRequestWithAuth } from 'next-auth/middleware';

import getAuthenticatedUserRouteShortcut from '@/lib/misc/getAuthenticatedUserRouteShortcut';
import isProtectedRoute from '@/lib/misc/isProtectedRoute';
import { mainMiddlewaresChain } from '@/middlewaresChain';
import { buildPathFromParts } from '@rtm/shared-lib/str';
import { getMaybeI18nFlagFromRequest } from '@/lib/next';
import { withAuth } from 'next-auth/middleware';
import ROUTES_ROOTS from '##/config/routes';

function protectedRoutesAuthMiddleware(request: NextRequest) {
  const maybeI18nFlag = getMaybeI18nFlagFromRequest(request);
  const i18nPrefix = maybeI18nFlag ? maybeI18nFlag : '';

  return withAuth(mainMiddlewaresChain, {
    pages: { signIn: buildPathFromParts(i18nPrefix, ROUTES_ROOTS.LANDING_PAGES, 'sign-up') }
  });
}

function authenticatedShortcutsAuthMiddleware(request: NextRequest, shortcut: AppPath) {
  const maybeI18nFlag = getMaybeI18nFlagFromRequest(request);
  const i18nPrefix = maybeI18nFlag ? maybeI18nFlag : '';

  return withAuth(mainMiddlewaresChain, {
    pages: { signIn: buildPathFromParts(i18nPrefix, shortcut) },
    callbacks: { authorized: ({ token }) => !Boolean(token) }
  });
}

// {ToDo} Rewrite this when we'll get rid of Next Auth in this project
const withProtectedRoutes: MiddlewareFactory = (next: NextMiddleware) => async (req: NextRequest, _next: NextFetchEvent) => {
  const request = req as NextRequestWithAuth;
  if (isProtectedRoute(request.nextUrl.pathname)) return protectedRoutesAuthMiddleware(request)(request, _next);

  const maybeShortcut = getAuthenticatedUserRouteShortcut(req.nextUrl.pathname);
  if (maybeShortcut !== undefined) return authenticatedShortcutsAuthMiddleware(request, maybeShortcut)(request, _next);

  const res = await next(request, _next);
  return res;
};

export default withProtectedRoutes;

// Stryker restore all
/* v8 ignore stop */
