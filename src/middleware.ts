import { DEFAULT_LANGUAGE, LANGUAGES } from '@/config/i18n';
import { withAuth } from 'next-auth/middleware';
import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getPathnameWithoutI18nFlag } from './lib/i18n';

const PROTECTED_ROUTES = ['/dashboard'];
export const config = {
  matcher: ['/((?!api|static|_next|.*\\..*).*)']
};

const I18nMiddlewareInstance = createI18nMiddleware({
  locales: LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  urlMappingStrategy: 'rewrite'
});

function i18nMiddleware(request: NextRequest) {
  const i18nResponse: NextResponse = I18nMiddlewareInstance(request);
  return i18nResponse;
}

const authMiddleware = withAuth(
  function onSuccess(req) {
    return i18nMiddleware(req);
  },
  {
    pages: {
      signIn: '/sign-up'
    }
  }
);

export default function middleware(req: NextRequest) {
  const currentRoute = getPathnameWithoutI18nFlag(req.nextUrl.pathname);
  const isProtectedRoute = PROTECTED_ROUTES.find((r) => currentRoute.startsWith(r));

  return isProtectedRoute ? (authMiddleware as any)(req) : i18nMiddleware(req);
}
