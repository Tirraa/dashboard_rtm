import { describe, expect, it } from 'vitest';

import getFormattedDate from '../getFormattedDate';

describe('getFormattedDate', () => {
  it('should return the correct formatted date (basic test, since it relays on native functions)', () => {
    const language = 'fr';
    // eslint-disable-next-line no-magic-numbers
    const date = new Date(1998, 1, 1, 7, 29, 0, 0);

    expect(getFormattedDate(language, date, false)).toBe('Dimanche 1 février 1998');
    expect(getFormattedDate(language, date, true)).toBe('1 févr. 1998, 07:29');
  });
});
