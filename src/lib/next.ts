import { AppPath, MiddlewareFactory } from '@/types/Next';
import { ClassName } from '@/types/React';
import { NextFont } from 'next/dist/compiled/@next/font';
import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { getPathnameMaybeI18nFlag, getPathnameWithoutI18nFlag } from './i18n';

export const fCls = (f: NextFont): ClassName => ({ className: f.className });
export const fClStr = (f: NextFont): string => f.className;

export function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}

export const getMaybeI18nFlagFromRequest = (request: NextRequest) => getPathnameMaybeI18nFlag(request.nextUrl.pathname);

export const getPathParts = (pathname: AppPath) =>
  getPathnameWithoutI18nFlag(pathname)
    .split('/')
    .filter((notEmptyPartFilterWorkaround) => notEmptyPartFilterWorkaround);
