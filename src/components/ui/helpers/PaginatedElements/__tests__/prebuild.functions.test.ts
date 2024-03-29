import { describe, expect, it } from 'vitest';
import { createElement } from 'react';

import { getPaginatedElementsCurrentSlice, getSanitizedCurrentPage } from '../functions';
import { FIRST_PAGE_PARAM } from '../constants';

describe('getPaginatedElementsCurrentSlice', () => {
  const pageSize = 10;
  const pagesAmount = 10;
  const totalPages = pageSize * pagesAmount;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers, @typescript-eslint/no-unused-vars
  const elements = Array.from({ length: totalPages }, (_, i) => createElement('div', { key: i }, `ReactElement ${i + 1}`));

  it('should return the correct slice for the first page', () => {
    const page = 1;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(slice).toStrictEqual(elements.slice(0, 10));
  });

  it('should return the correct slice for the 5th page', () => {
    const page = 5;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(slice).toStrictEqual(elements.slice(40, 50));
  });

  it('should return elements, given bigger pageSize than elements length', () => {
    const page = 1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const slice = getPaginatedElementsCurrentSlice(page, totalPages + 1, elements);
    expect(slice).toStrictEqual(elements);
  });

  it('should return an empty array for a page that does not exist', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const page = pagesAmount + 1;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    expect(slice).toStrictEqual([]);
  });

  it('should handle page 0 as the first page', () => {
    const page = 0;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(slice).toStrictEqual(elements.slice(0, 10));
  });

  it('should handle negative page as the first page', () => {
    const page = -1;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(slice).toStrictEqual(elements.slice(0, 10));
  });
});

describe('getSanitizedCurrentPage', () => {
  const __PAGE_KEY = 'page';
  const maxPage = 10;

  it('should return the same page, given a valid page number', () => {
    const params = new URLSearchParams();
    const page = 8;
    params.append(__PAGE_KEY, String(page));

    const sanitizedPage = getSanitizedCurrentPage(params, maxPage, __PAGE_KEY);
    expect(sanitizedPage).toBe(page);
  });

  it('should return FIRST_PAGE_PARAM, given a negative page number', () => {
    const params = new URLSearchParams();
    const page = -4;
    params.append(__PAGE_KEY, String(page));

    const sanitizedPage = getSanitizedCurrentPage(params, maxPage, __PAGE_KEY);
    expect(sanitizedPage).toBe(FIRST_PAGE_PARAM);
  });

  it('should return FIRST_PAGE_PARAM, given an empty URLSearchParams', () => {
    const params = new URLSearchParams();

    const sanitizedPage = getSanitizedCurrentPage(params, maxPage, __PAGE_KEY);
    expect(sanitizedPage).toBe(FIRST_PAGE_PARAM);
  });

  it('should return FIRST_PAGE_PARAM, given an invalid page number', () => {
    const params = new URLSearchParams();
    const page = 'qsjkqsdq';
    params.append(__PAGE_KEY, page);

    const sanitizedPage = getSanitizedCurrentPage(params, maxPage, __PAGE_KEY);
    expect(sanitizedPage).toBe(FIRST_PAGE_PARAM);
  });

  it('should return maxPage, given a too big page number', () => {
    const params = new URLSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const page = maxPage + 1;
    params.append(__PAGE_KEY, String(page));

    const sanitizedPage = getSanitizedCurrentPage(params, maxPage, __PAGE_KEY);
    expect(sanitizedPage).toBe(maxPage);
  });
});
