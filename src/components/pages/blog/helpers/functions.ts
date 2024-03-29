import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTagId } from '@/types/Blog';

import { unpackIds } from '@rtm/shared-lib/misc';

export const sortUnpackedIds = (unpacked: BlogTagId[]) => unpacked.sort((a, b) => a - b);

/**
 * @throws {RangeError}
 */
export function getUnpackedAndSanitizedFilters(packedIds: MaybeNull<string>, expectedIds: Set<BlogTagId>, maxId: BlogTagId) {
  if (packedIds === null) return [];

  const unpackedAndSanitizedFilters = sortUnpackedIds(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    Array.from(new Set<BlogTagId>(unpackIds(packedIds).filter((id) => 0 <= id && id <= maxId && expectedIds.has(id))))
  );

  return unpackedAndSanitizedFilters;
}
