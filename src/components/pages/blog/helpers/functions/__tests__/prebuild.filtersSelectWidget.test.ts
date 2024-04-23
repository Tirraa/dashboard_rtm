import { describe, expect, it } from 'vitest';

import { getSanitizedCurrentFilterIndex } from '../filtersSelectWidget';
import { FIRST_FILTER_INDEX } from '../../constants';

describe('getSanitizedCurrentFilterIndex', () => {
  it('should return FIRST_FILTER_INDEX, given valid inputs and expecting FIRST_FILTER_INDEX', () => {
    const maxFilter = 1;
    const filtersKeys = 'filter';
    const searchParams = new URLSearchParams('?' + filtersKeys + '=' + FIRST_FILTER_INDEX);
    const expected = FIRST_FILTER_INDEX;

    const sanitizedCurrentFilterIndex = getSanitizedCurrentFilterIndex(searchParams, maxFilter, filtersKeys);
    expect(sanitizedCurrentFilterIndex).toBe(expected);
  });

  it('should return FIRST_FILTER_INDEX, given empty SearchParams', () => {
    const maxFilter = 1;
    const filtersKeys = 'filter';
    const searchParams = new URLSearchParams();
    const expected = FIRST_FILTER_INDEX;

    const sanitizedCurrentFilterIndex = getSanitizedCurrentFilterIndex(searchParams, maxFilter, filtersKeys);
    expect(sanitizedCurrentFilterIndex).toBe(expected);
  });

  it('should return FIRST_FILTER_INDEX, given FIRST_FILTER_INDEX is bigger than filter', () => {
    const maxFilter = 1;
    const filtersKeys = 'filter';
    // eslint-disable-next-line no-magic-numbers
    const searchParams = new URLSearchParams('?' + filtersKeys + '=' + String(FIRST_FILTER_INDEX - 1));
    const expected = FIRST_FILTER_INDEX;

    const sanitizedCurrentFilterIndex = getSanitizedCurrentFilterIndex(searchParams, maxFilter, filtersKeys);
    expect(sanitizedCurrentFilterIndex).toBe(expected);
  });

  it('should return FIRST_FILTER_INDEX, given filter is not a number', () => {
    const maxFilter = 1;
    const filtersKeys = 'filter';
    // eslint-disable-next-line no-magic-numbers
    const searchParams = new URLSearchParams('?' + filtersKeys + '=' + 'aabcdef');
    const expected = FIRST_FILTER_INDEX;

    const sanitizedCurrentFilterIndex = getSanitizedCurrentFilterIndex(searchParams, maxFilter, filtersKeys);
    expect(sanitizedCurrentFilterIndex).toBe(expected);
  });

  it('should return maxFilter, given filter is bigger than maxFilter', () => {
    const maxFilter = 1;
    const filtersKeys = 'filter';
    // eslint-disable-next-line no-magic-numbers
    const searchParams = new URLSearchParams('?' + filtersKeys + '=' + String(maxFilter + 1));
    const expected = maxFilter;

    const sanitizedCurrentFilterIndex = getSanitizedCurrentFilterIndex(searchParams, maxFilter, filtersKeys);
    expect(sanitizedCurrentFilterIndex).toBe(expected);
  });

  it('should return 3, given filter is equal to 3 and maxFilter is bigger than 3', () => {
    const expected = 3;
    // eslint-disable-next-line no-magic-numbers
    const maxFilter = expected + 1;
    const filtersKeys = 'filter';
    // eslint-disable-next-line no-magic-numbers
    const searchParams = new URLSearchParams('?' + filtersKeys + '=' + expected);

    const sanitizedCurrentFilterIndex = getSanitizedCurrentFilterIndex(searchParams, maxFilter, filtersKeys);
    expect(sanitizedCurrentFilterIndex).toBe(expected);
  });
});
