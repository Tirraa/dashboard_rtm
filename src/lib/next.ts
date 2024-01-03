import type { MiddlewareFactory, AppPath } from '@rtm/shared-types/Next';
import type { NextMiddleware, NextRequest } from 'next/server';
import type { NextFont } from 'next/dist/compiled/@next/font';

import { NextResponse } from 'next/server';

import { getPathnameWithoutI18nFlag, getPathnameMaybeI18nFlag } from './i18n';

/* v8 ignore start */
// Stryker disable all
export const fcn = (f: NextFont): string => f.className;

export const getMaybeI18nFlagFromRequest = (request: NextRequest) => getPathnameMaybeI18nFlag(request.nextUrl.pathname);
// Stryker restore all
/* v8 ignore stop */

export function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const currentMiddleware = functions[index];
  if (currentMiddleware) {
    const nextMiddleware = stackMiddlewares(functions, index + 1);
    return currentMiddleware(nextMiddleware);
  }
  return () => NextResponse.next();
}

export function getPathParts(pathname: AppPath) {
  let pathnameWithoutI18nFlag = getPathnameWithoutI18nFlag(pathname);
  if (pathnameWithoutI18nFlag.charAt(0) === '/') pathnameWithoutI18nFlag = pathnameWithoutI18nFlag.substring(1);

  return pathnameWithoutI18nFlag.split('/');
}
