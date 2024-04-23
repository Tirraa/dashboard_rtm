import { describe, expect, it } from 'vitest';

import shouldShowPaginationWidget from '../shouldShowPaginationWidget';

describe('shouldShowPaginationWidget', () => {
  it('should return true or false depending on pagesAmount', () => {
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowPaginationWidget(0)).toBe(false);
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowPaginationWidget(1)).toBe(false);
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowPaginationWidget(2)).toBe(true);
  });
});
