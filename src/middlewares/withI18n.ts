import { DEFAULT_LANGUAGE, LANGUAGES } from '##/config/i18n';
import type { I18nMiddlewareConfig } from '@rtm/shared-types/I18n';
import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import { createI18nMiddleware } from 'next-international/middleware';
import type { NextRequest, NextResponse } from 'next/server';

const I18N_MIDDLEWARE_CONFIG: I18nMiddlewareConfig = {
  locales: LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  urlMappingStrategy: 'rewriteDefault'
} as const;

const i18nMiddlewareInstance = createI18nMiddleware(I18N_MIDDLEWARE_CONFIG);

const i18nMiddleware = (request: NextRequest): NextResponse => i18nMiddlewareInstance(request);

const withI18n: MiddlewareFactory = () => async (request: NextRequest) => i18nMiddleware(request);

export default withI18n;
