import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Id } from '@rtm/shared-types/Numbers';

import { sortNumbers, unpackIds } from '@rtm/shared-lib/misc';

/**
 * @throws {RangeError}
 */
function buildUnpackedAndSanitizedFilters(packedIds: string, expectedIds: Set<Id>) {
  const unpackedAndSanitizedFilters = sortNumbers(
    // eslint-disable-next-line no-magic-numbers
    Array.from(new Set<Id>(unpackIds(packedIds).filter((id) => expectedIds.has(id))))
  );

  return unpackedAndSanitizedFilters;
}

/**
 * @throws {RangeError}
 */
export function getUnpackedAndSanitizedFilters(searchParams: URLSearchParams, expectedIds: Set<Id>, filtersKey: string) {
  const packedIds: MaybeNull<string> = searchParams.get(filtersKey);
  if (packedIds === null) return [];

  const generatedUnpackedAndSanitizedFilters = buildUnpackedAndSanitizedFilters(packedIds, expectedIds);
  return generatedUnpackedAndSanitizedFilters;
}
