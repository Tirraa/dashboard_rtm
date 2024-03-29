import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';

import { unpackIds } from '@rtm/shared-lib/misc';

export const sortUnpackedIds = (unpacked: number[]) => unpacked.sort((a, b) => a - b);

/**
 * @throws {RangeError}
 */
export function getUnpackedAndSanitizedFilters(packedIds: MaybeNull<string>, expectedIds: Set<number>, maxId: number) {
  if (packedIds === null) return [];

  const unpackedAndSanitizedFilters = sortUnpackedIds(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    Array.from(new Set<number>(unpackIds(packedIds).filter((id) => 0 <= id && id <= maxId && expectedIds.has(id))))
  );

  return unpackedAndSanitizedFilters;
}
