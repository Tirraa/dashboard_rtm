import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Id } from '@rtm/shared-types/Numbers';

import { unpackIds } from '@rtm/shared-lib/misc';

import { FILTERS_KEY } from './constants';

export const sortUnpackedIds = (unpacked: Id[]) => unpacked.sort((a, b) => a - b);

/**
 * @throws {RangeError}
 */
function generateUnpackedAndSanitizedFilters(packedIds: string, expectedIds: Set<Id>, maxId: Id) {
  const unpackedAndSanitizedFilters = sortUnpackedIds(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    Array.from(new Set<Id>(unpackIds(packedIds).filter((id) => 0 <= id && id <= maxId && expectedIds.has(id))))
  );

  return unpackedAndSanitizedFilters;
}

/**
 * @throws {RangeError}
 */
export function getUnpackedAndSanitizedFilters(searchParams: URLSearchParams, expectedIds: Set<Id>, maxId: Id, __FILTERS_KEY: string = FILTERS_KEY) {
  const packedIds: MaybeNull<string> = searchParams.get(__FILTERS_KEY);
  if (packedIds === null) return [];

  const generatedUnpackedAndSanitizedFilters = generateUnpackedAndSanitizedFilters(packedIds, expectedIds, maxId);

  return generatedUnpackedAndSanitizedFilters;
}
