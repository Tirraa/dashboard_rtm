import { cookieName, fallbackLng, languages } from '@/i18n/settings';
import { Void } from '@/types/UglyTypes';
import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|apple-icon.png|icon.svg|robots.txt|sw.js)(?!.*\\.xml$).*)']
};

// * ... Work-around (1): used for getServerSidePathnameWorkaround
function headersWithCurrentUrl(request: NextRequest): Headers {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  return requestHeaders;
}

function i18nSupport(request: NextRequest, requestHeaders: Headers): NextResponse | Void {
  let lng = undefined;
  let cookieCurrentValue = undefined;

  if (request.cookies.has(cookieName)) {
    cookieCurrentValue = request.cookies.get(cookieName)?.value;
  }
  if (!lng && cookieCurrentValue) lng = acceptLanguage.get(cookieCurrentValue);
  if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  if (!languages.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) && !request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL(`/${lng}${request.nextUrl.pathname}`, request.url));
  }

  if (request.headers.has('referer')) {
    const refererUrl = new URL(request.headers.get('referer') as string);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }
  return undefined;
}

export function middleware(request: NextRequest) {
  const requestHeaders = headersWithCurrentUrl(request);
  const defaultResponse = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  const i18nResponse = i18nSupport(request, requestHeaders);
  if (i18nResponse) return i18nResponse;

  return defaultResponse;
}
