/* v8 ignore start */
// Stryker disable all

import type { AppPath, Href } from '@rtm/shared-types/Next';
import type { NextRequest } from 'next/server';

import { buildPathFromParts } from '@rtm/shared-lib/str';
import { getMaybeI18nFlagFromRequest } from '@/lib/next';
import { NextResponse } from 'next/server';

function takeShortcut(req: NextRequest, shortcut: AppPath) {
  const maybeI18nFlag = getMaybeI18nFlagFromRequest(req);
  const i18nPrefix = maybeI18nFlag || '';
  const head = process.env.AUTH_URL as Href;

  const dest = i18nPrefix ? buildPathFromParts(head, i18nPrefix, shortcut) : buildPathFromParts(head, shortcut);

  return NextResponse.redirect(dest);
}

export default takeShortcut;

// Stryker restore all
/* v8 ignore stop */
