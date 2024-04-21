/* v8 ignore start */
// Stryker disable all

import type { NextMiddleware, NextFetchEvent, NextResponse, NextRequest } from 'next/server';
import type { I18nMiddlewareConfig } from '@rtm/shared-types/I18n';
import type { MiddlewareFactory } from '@rtm/shared-types/Next';

import { createI18nMiddleware } from 'next-international/middleware';
import { DEFAULT_LANGUAGE, LANGUAGES } from '##/config/i18n';
import { OK } from '##/config/httpCodes';

const I18N_MIDDLEWARE_CONFIG: I18nMiddlewareConfig = {
  urlMappingStrategy: 'rewriteDefault',
  defaultLocale: DEFAULT_LANGUAGE,
  locales: LANGUAGES
} as const;

const i18nMiddlewareInstance = createI18nMiddleware(I18N_MIDDLEWARE_CONFIG);

const i18nMiddleware = (request: NextRequest): NextResponse => i18nMiddlewareInstance(request);

// {ToDo} Chain this properly when Next International v2 will be released
// https://github.com/QuiiBz/next-international/issues/359
const withI18n: MiddlewareFactory = (next: NextMiddleware) => async (request: NextRequest, _next: NextFetchEvent) => {
  const res = i18nMiddleware(request);
  const authRes = await next(request, _next);
  if (authRes && authRes.status !== OK) return authRes;
  return res;
};

export default withI18n;

// Stryker restore all
/* v8 ignore stop */
