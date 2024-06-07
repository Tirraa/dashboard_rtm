/* v8 ignore start */
// Stryker disable all

import type { JSONValue } from '@rtm/shared-types/CustomUtilityTypes';

import { API_ERROR_TRACE_ENDPOINT } from '@/config/utils';

function traceError(error: Error, additionalInfo?: JSONValue) {
  const report = { ...error, additionalInfo: additionalInfo ? JSON.stringify(additionalInfo) : undefined };

  fetch(API_ERROR_TRACE_ENDPOINT, {
    // * ... https://goulet.dev/posts/error-serialization-in-js/
    body: JSON.stringify(report, ['message', 'name', 'stack', 'cause', 'code', 'additionalInfo']),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST'
  });
}

export default traceError;

// Stryker restore all
/* v8 ignore stop */
