import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import type { NextRequest } from 'next/server';

import getVipRouteShortcut from '@/lib/misc/getVipRouteShortcut';
import isProtectedRoute from '@/lib/misc/isProtectedRoute';
import { auth } from '@/auth';

import protectRoute from './protectRoute';
import takeShortcut from './takeShortcut';

const authMiddleware = auth((req) => {
  const { auth } = req;
  if (!auth && isProtectedRoute(req.nextUrl.pathname)) return protectRoute(req);

  if (auth) {
    const maybeShortcut = getVipRouteShortcut(req.nextUrl.pathname);
    if (maybeShortcut !== undefined) return takeShortcut(req, maybeShortcut);
  }
});

// eslint-disable-next-line require-await
const withAuth: MiddlewareFactory = () => async (request: NextRequest) => authMiddleware(request, {});

export default withAuth;
