import { DEFAULT_LANGUAGE, LANGUAGES } from '##/config/i18n';
import type { I18nMiddlewareConfig } from '##/types/magic/I18n';
import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import { createI18nMiddleware } from 'next-international/middleware';
import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const I18N_MIDDLEWARE_CONFIG: I18nMiddlewareConfig = {
  locales: LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  urlMappingStrategy: 'rewriteDefault'
} as const;

const i18nMiddlewareInstance = createI18nMiddleware(I18N_MIDDLEWARE_CONFIG);

const i18nMiddleware = (request: NextRequest): NextResponse => i18nMiddlewareInstance(request);

export const withI18n: MiddlewareFactory = (_) => async (request: NextRequest, _next: NextFetchEvent) => i18nMiddleware(request);

export default withI18n;
