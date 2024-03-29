import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { Id } from '@rtm/shared-types/Numbers';

import { unpackIds } from '@rtm/shared-lib/misc';

export const sortUnpackedIds = (unpacked: Id[]) => unpacked.sort((a, b) => a - b);

/**
 * @throws {RangeError}
 */
export function getUnpackedAndSanitizedFilters(packedIds: MaybeNull<string>, expectedIds: Set<Id>, maxId: Id) {
  if (packedIds === null) return [];

  const unpackedAndSanitizedFilters = sortUnpackedIds(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    Array.from(new Set<Id>(unpackIds(packedIds).filter((id) => 0 <= id && id <= maxId && expectedIds.has(id))))
  );

  return unpackedAndSanitizedFilters;
}
