import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import type { NextMiddleware, NextRequest } from 'next/server';
import type { NextFont } from 'next/dist/compiled/@next/font';

import { NextResponse } from 'next/server';

import { getPathnameMaybeI18nFlag } from './i18n';

/* v8 ignore start */
// Stryker disable all

export const fcn = (f: NextFont): string => f.className;

export const getMaybeI18nFlagFromRequest = (request: NextRequest) => getPathnameMaybeI18nFlag(request.nextUrl.pathname);

// Stryker restore all
/* v8 ignore stop */

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const currentMiddleware = functions[index];
  if (currentMiddleware) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const nextMiddleware = stackMiddlewares(functions, index + 1);
    return currentMiddleware(nextMiddleware);
  }
  return () => NextResponse.next();
}
