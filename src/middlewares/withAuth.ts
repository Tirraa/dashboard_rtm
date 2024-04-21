import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import type { NextRequest } from 'next/server';

import getVipRouteShortcut from '@/lib/misc/getVipRouteShortcut';
import isProtectedRoute from '@/lib/misc/isProtectedRoute';

import protectRoute from './protectRoute';
import takeShortcut from './takeShortcut';

// eslint-disable-next-line require-await
const withAuth: MiddlewareFactory = () => async (request: NextRequest) => {
  const { auth } = request as any;
  if (!auth && isProtectedRoute(request.nextUrl.pathname)) return protectRoute(request);

  if (auth) {
    const maybeShortcut = getVipRouteShortcut(request.nextUrl.pathname);
    if (maybeShortcut !== undefined) return takeShortcut(request, maybeShortcut);
  }
};

export default withAuth;
