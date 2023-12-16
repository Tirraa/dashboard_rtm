import { describe, expect, it } from 'vitest';
import getFormattedDate from '../getFormattedDate';

describe('getFormattedDate', () => {
  it('should return the correct formatted date (basic test, since it relays on native functions)', () => {
    const language = 'fr';
    const date = new Date(1998, 1, 1, 7, 29, 0, 0);

    expect(getFormattedDate(language, date, false)).toBe('Dimanche 1 février 1998');
    expect(getFormattedDate(language, date, true)).toBe('Dimanche 1 février 1998 à 07:29');
  });
});
