import type { JSONValue } from '@rtm/shared-types/CustomUtilityTypes';
import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import type { NextMiddleware, NextRequest } from 'next/server';
import type { NextFont } from 'next/dist/compiled/@next/font';

import { API_ERROR_TRACE_ENDPOINT } from '@/config/utils';
import { NextResponse } from 'next/server';

import { getPathnameMaybeI18nFlag } from './i18n';

/* v8 ignore start */
// Stryker disable all

export const fcn = (f: NextFont): string => f.className;

export const getMaybeI18nFlagFromRequest = (request: NextRequest) => getPathnameMaybeI18nFlag(request.nextUrl.pathname);

export function traceError(error: Error, additionalInfo?: JSONValue) {
  const report = { ...error, additionalInfo: additionalInfo ? JSON.stringify(additionalInfo) : undefined };

  fetch(API_ERROR_TRACE_ENDPOINT, {
    // * ... https://goulet.dev/posts/error-serialization-in-js/
    body: JSON.stringify(report, ['message', 'name', 'stack', 'cause', 'additionalInfo']),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
}

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
