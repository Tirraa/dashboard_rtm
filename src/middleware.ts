import { NextRequest, NextResponse } from 'next/server';

import { createI18nMiddleware } from 'next-international/middleware';
import { fallbackLng } from './config/i18n';
import { languages } from './i18n/settings';

const I18nMiddleware = createI18nMiddleware({
  locales: languages,
  defaultLocale: fallbackLng
});

// * ... Work-around (1): used for getServerSidePathnameWorkaround
function appendCurrentUrlHeader(request: NextRequest, i18nResponse: NextResponse) {
  i18nResponse.headers.set('x-url', request.url);
}

export function middleware(request: NextRequest) {
  const i18nResponse: NextResponse = I18nMiddleware(request);
  appendCurrentUrlHeader(request, i18nResponse);
  return i18nResponse;
}

export const config = {
  matcher: ['/((?!api|static|_next|.*\\..*).*)']
};
