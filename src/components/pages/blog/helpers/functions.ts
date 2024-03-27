import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';

import { blogTagOptions } from '##/lib/builders/unifiedImport';
import { unpackIds } from '@rtm/shared-lib/misc';

import { FIRST_PAGE_IDX, FILTERS_KEY, PAGE_KEY } from './constants';

export const sortUnpackedIds = (unpacked: number[]) => unpacked.sort((a, b) => a - b);

/**
 * @throws {RangeError}
 */
export function getUnpackedAndSanitizedFilters(searchParams: URLSearchParams, filtersKey: string = FILTERS_KEY) {
  const packedIds: MaybeNull<string> = searchParams.get(filtersKey);
  if (packedIds === null) return [];

  const unpackedAndSanitizedFilters = sortUnpackedIds(
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    Array.from(new Set<number>(unpackIds(packedIds).filter((id) => 0 <= id && id < blogTagOptions.length)))
  );

  return unpackedAndSanitizedFilters;
}

export function getSanitizedCurrentPage(searchParams: URLSearchParams, maxPage: number, pageKey: string = PAGE_KEY) {
  const maybeUnsafePageFromUrl: MaybeNull<string> = searchParams.get(pageKey);
  const unsafePageFromUrl = maybeUnsafePageFromUrl === null ? FIRST_PAGE_IDX : Number(maybeUnsafePageFromUrl);

  if (isNaN(unsafePageFromUrl)) return FIRST_PAGE_IDX;
  if (unsafePageFromUrl < FIRST_PAGE_IDX) return FIRST_PAGE_IDX;
  if (unsafePageFromUrl > maxPage) return maxPage;
  return unsafePageFromUrl;
}
