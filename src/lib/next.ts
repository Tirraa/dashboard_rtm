import type { AppPath, MiddlewareFactory } from '@/types/Next';
import type { ClassName } from '@/types/React';
import type { NextFont } from 'next/dist/compiled/@next/font';
import type { NextMiddleware, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getPathnameMaybeI18nFlag, getPathnameWithoutI18nFlag } from './i18n';

export const fCls = (f: NextFont): ClassName => ({ className: f.className });
export const fClStr = (f: NextFont): string => f.className;

export function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const currentMiddleware = functions[index];
  if (currentMiddleware) {
    const nextMiddleware = stackMiddlewares(functions, index + 1);
    return currentMiddleware(nextMiddleware);
  }
  return () => NextResponse.next();
}

export const getMaybeI18nFlagFromRequest = (request: NextRequest) => getPathnameMaybeI18nFlag(request.nextUrl.pathname);

export function getPathParts(pathname: AppPath) {
  let pathnameWithoutI18nFlag = getPathnameWithoutI18nFlag(pathname);
  if (pathnameWithoutI18nFlag.charAt(0) === '/') pathnameWithoutI18nFlag = pathnameWithoutI18nFlag.substring(1);

  return pathnameWithoutI18nFlag.split('/');
}
