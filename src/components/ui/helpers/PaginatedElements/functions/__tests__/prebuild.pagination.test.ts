import { describe, expect, it } from 'vitest';

import { getSanitizedCurrentPage } from '../pagination';
import { FIRST_PAGE_PARAM } from '../../constants';

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
    // eslint-disable-next-line no-magic-numbers
    const page = maxPage + 1;
    params.append(__PAGE_KEY, String(page));

    const sanitizedPage = getSanitizedCurrentPage(params, maxPage, __PAGE_KEY);
    expect(sanitizedPage).toBe(maxPage);
  });
});
