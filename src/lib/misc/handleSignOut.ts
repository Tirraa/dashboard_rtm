/* v8 ignore start */
// Stryker disable all

import type { AppPath } from '@rtm/shared-types/Next';

import ROUTES_ROOTS from '##/config/routes';
import { signOut } from 'next-auth/react';

import isProtectedRoute from './isProtectedRoute';

function handleSignOut(currentUrl: AppPath) {
  if (isProtectedRoute(currentUrl)) {
    signOut({ callbackUrl: ROUTES_ROOTS.WEBSITE });
    return;
  }
  signOut();
}

export default handleSignOut;

// Stryker restore all
/* v8 ignore stop */
