/* v8 ignore start */
// Stryker disable all

import getMaybeI18nFlagFromRequest from './notPortable/next/getMaybeI18nFlagFromRequest';
import stackMiddlewares from './portable/next/stackMiddlewares';
import traceError from './notPortable/next/traceError';
import fcn from './portable/next/fcn';

export { getMaybeI18nFlagFromRequest, stackMiddlewares, traceError, fcn };

// Stryker restore all
/* v8 ignore stop */
