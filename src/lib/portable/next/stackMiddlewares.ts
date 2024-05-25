import type { MiddlewareFactory } from '@rtm/shared-types/Next';
import type { NextMiddleware } from 'next/server';

import { NextResponse } from 'next/server';

// eslint-disable-next-line no-magic-numbers
function stackMiddlewares(functions: MiddlewareFactory[] = [], index = 0): NextMiddleware {
  const currentMiddleware = functions[index];
  if (currentMiddleware) {
    // eslint-disable-next-line no-magic-numbers
    const nextMiddleware = stackMiddlewares(functions, index + 1);
    return currentMiddleware(nextMiddleware);
  }
  return () => NextResponse.next();
}

export default stackMiddlewares;
