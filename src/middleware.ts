import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LANGUAGE, LANGUAGES } from '@/config/i18n';
import { createI18nMiddleware } from 'next-international/middleware';

const I18nMiddleware = createI18nMiddleware({
  locales: LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  urlMappingStrategy: 'rewriteDefault'
});

export function middleware(request: NextRequest) {
  const i18nResponse: NextResponse = I18nMiddleware(request);
  return i18nResponse;
}

export const config = {
  matcher: ['/((?!api|static|_next|.*\\..*).*)']
};
