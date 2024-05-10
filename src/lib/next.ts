import type { MiddlewareFactory, TracedError } from '@rtm/shared-types/Next';
import type { NextMiddleware, NextRequest } from 'next/server';
import type { NextFont } from 'next/dist/compiled/@next/font';

import { API_ERROR_TRACE_ENDPOINT } from '@/config/utils';
import { NextResponse } from 'next/server';

import { getPathnameMaybeI18nFlag } from './i18n';

/* v8 ignore start */
// Stryker disable all

export const fcn = (f: NextFont): string => f.className;

export const getMaybeI18nFlagFromRequest = (request: NextRequest) => getPathnameMaybeI18nFlag(request.nextUrl.pathname);

export const traceError = (error: TracedError) =>
  fetch(API_ERROR_TRACE_ENDPOINT, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(error),
    method: 'POST'
  });

// Stryker restore all
/* v8 ignore stop */

// eslint-disable-next-line no-magic-numbers
export function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const currentMiddleware = functions[index];
  if (currentMiddleware) {
    // eslint-disable-next-line no-magic-numbers
    const nextMiddleware = stackMiddlewares(functions, index + 1);
    return currentMiddleware(nextMiddleware);
  }
  return () => NextResponse.next();
}
