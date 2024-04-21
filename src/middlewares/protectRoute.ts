/* v8 ignore start */
// Stryker disable all

import type { Href } from '@rtm/shared-types/Next';
import type { NextRequest } from 'next/server';

import { buildPathFromParts } from '@rtm/shared-lib/str';
import { getMaybeI18nFlagFromRequest } from '@/lib/next';
import ROUTES_ROOTS from '##/config/routes';
import { NextResponse } from 'next/server';

function protectRoute(req: NextRequest) {
  const maybeI18nFlag = getMaybeI18nFlagFromRequest(req);
  const i18nPrefix = maybeI18nFlag || '';
  const head = process.env.AUTH_URL as Href;

  const dest = i18nPrefix
    ? buildPathFromParts(head, i18nPrefix, ROUTES_ROOTS.LANDING_PAGES, 'sign-up')
    : buildPathFromParts(head, ROUTES_ROOTS.LANDING_PAGES, 'sign-up');

  return NextResponse.redirect(dest);
}

export default protectRoute;

// Stryker restore all
/* v8 ignore stop */
