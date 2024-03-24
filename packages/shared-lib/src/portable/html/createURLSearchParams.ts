import type { JSPrimitives } from '@rtm/shared-types/CustomUtilityTypes';

import isEmptyObject from '../misc/isEmptyObject';

const EMPTY_QUERY_STRING = '?';

function createURLSearchParams(params: Record<PropertyKey, JSPrimitives>, currentSearchParams?: URLSearchParams): string {
  const emptyParams = isEmptyObject(params);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if ((emptyParams && !currentSearchParams) || (emptyParams && currentSearchParams && currentSearchParams.size === 0)) return EMPTY_QUERY_STRING;

  const newSearchParams = new URLSearchParams(currentSearchParams?.toString() ?? '');

  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      newSearchParams.delete(key);
    } else newSearchParams.set(key, String(value));
  }

  for (const [key, value] of Array.from(newSearchParams.entries())) {
    if (!value) newSearchParams.delete(key);
  }

  const q = newSearchParams.toString();
  return q ? '?' + q : EMPTY_QUERY_STRING;
}

export default createURLSearchParams;
