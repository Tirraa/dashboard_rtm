import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_LANGUAGE, LANGUAGES } from '@/config/i18n';
import NextConfig from '@/config/next';
import { createI18nMiddleware } from 'next-international/middleware';

const I18nMiddleware = createI18nMiddleware({
  locales: LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  urlMappingStrategy: 'rewriteDefault'
});

// * ... Work-around (1): used for getServerSidePathnameWorkaround
const appendCurrentUrlHeader = (request: NextRequest, i18nResponse: NextResponse) =>
  i18nResponse.headers.set(NextConfig.SERVER_SIDE_PATHNAME_HEADER_NAME, request.url);

export function middleware(request: NextRequest) {
  const i18nResponse: NextResponse = I18nMiddleware(request);
  appendCurrentUrlHeader(request, i18nResponse);
  return i18nResponse;
}

export const config = {
  matcher: ['/((?!api|static|_next|.*\\..*).*)']
};
