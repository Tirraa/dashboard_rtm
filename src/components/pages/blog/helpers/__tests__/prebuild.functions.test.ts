import { packIds } from '@rtm/shared-lib/misc';
import { describe, expect, it } from 'vitest';

import { getUnpackedAndSanitizedFilters } from '../functions';

describe('getUnpackedAndSanitizedFilters', () => {
  const __FILTERS_KEY = 'filters';
  const maxId = 2;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const expectedIds = new Set([0, 1]);

  it('should return sanitized and sorted filter ids, given valid but ugly input', () => {
    const params = new URLSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const filters = packIds([2, 0, 1]);

    params.append(__FILTERS_KEY, filters);

    const unpackedAndSanitizedFilters = getUnpackedAndSanitizedFilters(params, expectedIds, maxId, __FILTERS_KEY);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(unpackedAndSanitizedFilters).toStrictEqual([0, 1]);
  });

  it('should return an empty array, given an empty URLSearchParams', () => {
    const params = new URLSearchParams();

    const unpackedAndSanitizedFilters = getUnpackedAndSanitizedFilters(params, expectedIds, maxId, __FILTERS_KEY);
    expect(unpackedAndSanitizedFilters).toStrictEqual([]);
  });
});
