/* v8 ignore start */
// Stryker disable all

import type { NextRequest } from 'next/server';

import getPathnameMaybeI18nFlag from '../../notPortable/i18n/getPathnameMaybeI18nFlag';

const getMaybeI18nFlagFromRequest = (request: NextRequest) => getPathnameMaybeI18nFlag(request.nextUrl.pathname);

export default getMaybeI18nFlagFromRequest;

// Stryker restore all
/* v8 ignore stop */
