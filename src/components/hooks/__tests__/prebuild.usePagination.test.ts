import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import usePagination from '../usePagination';

describe('usePagination', () => {
  it('should return 2, given a list of 10 elements and expecting 5 items per page', () => {
    // eslint-disable-next-line no-magic-numbers
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const itemsPerPage = 5;
    const expected = 2;

    const { result } = renderHook(() => usePagination(items, itemsPerPage));
    expect(result.current).toBe(expected);
  });

  it("should recompute pages amount, given the items list's length changes", () => {
    // eslint-disable-next-line no-magic-numbers
    let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const itemsPerPage = 5;
    const expectedOnFirstRender = 2;
    const expectedOnSecondRender = 3;
    const { rerender, result } = renderHook(() => usePagination(items, itemsPerPage));

    expect(result.current).toBe(expectedOnFirstRender);

    // eslint-disable-next-line no-magic-numbers
    items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    rerender();

    expect(result.current).toBe(expectedOnSecondRender);
  });
});
