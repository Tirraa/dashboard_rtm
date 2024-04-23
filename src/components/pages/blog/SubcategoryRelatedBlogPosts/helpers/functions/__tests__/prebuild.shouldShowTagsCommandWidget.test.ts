import { describe, expect, it } from 'vitest';

import shouldShowTagsCommandWidget from '../shouldShowTagsCommandWidget';

describe('shouldShowTagsCommandWidget', () => {
  it('should return true or false depending on pagesAmount', () => {
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowTagsCommandWidget(0)).toBe(false);
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowTagsCommandWidget(1)).toBe(false);
    // eslint-disable-next-line no-magic-numbers
    expect(shouldShowTagsCommandWidget(2)).toBe(true);
  });
});
