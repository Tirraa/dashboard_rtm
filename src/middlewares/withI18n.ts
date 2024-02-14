/* v8 ignore start */
// Stryker disable all

import type { I18nMiddlewareConfig } from '@rtm/shared-types/I18n';
import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import type { NextResponse, NextRequest } from 'next/server';

import { createI18nMiddleware } from 'next-international/middleware';
import { DEFAULT_LANGUAGE, LANGUAGES } from '##/config/i18n';

const I18N_MIDDLEWARE_CONFIG: I18nMiddlewareConfig = {
  urlMappingStrategy: 'rewriteDefault',
  defaultLocale: DEFAULT_LANGUAGE,
  locales: LANGUAGES
} as const;

const i18nMiddlewareInstance = createI18nMiddleware(I18N_MIDDLEWARE_CONFIG);

const i18nMiddleware = (request: NextRequest): NextResponse => i18nMiddlewareInstance(request);

const withI18n: MiddlewareFactory = () => async (request: NextRequest) => i18nMiddleware(request);

export default withI18n;

// Stryker restore all
/* v8 ignore stop */
