import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Id } from '@rtm/shared-types/Numbers';

import { sortNumbers, unpackIds } from '@rtm/shared-lib/misc';

/**
 * @throws {RangeError}
 */
function generateUnpackedAndSanitizedFilters(packedIds: string, expectedIds: Set<Id>, maxId: Id) {
  const unpackedAndSanitizedFilters = sortNumbers(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    Array.from(new Set<Id>(unpackIds(packedIds).filter((id) => 0 <= id && id <= maxId && expectedIds.has(id))))
  );

  return unpackedAndSanitizedFilters;
}

/**
 * @throws {RangeError}
 */
export function getUnpackedAndSanitizedFilters(searchParams: URLSearchParams, expectedIds: Set<Id>, maxId: Id, filtersKey: string) {
  const packedIds: MaybeNull<string> = searchParams.get(filtersKey);
  if (packedIds === null) return [];

  const generatedUnpackedAndSanitizedFilters = generateUnpackedAndSanitizedFilters(packedIds, expectedIds, maxId);
  return generatedUnpackedAndSanitizedFilters;
}
