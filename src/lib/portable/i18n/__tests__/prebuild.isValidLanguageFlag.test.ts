import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '##/config/i18n';

import isValidLanguageFlag from '../isValidLanguageFlag';

describe('isValidLanguageFlag', () => {
  const FIRST_LANG = LANGUAGES[0];

  it('should return true for valid language flag', () => expect(isValidLanguageFlag(FIRST_LANG)).toBe(true));

  it('should return false for an invalid language flag', () => {
    const PREFIX = '$';
    let prefixAcc = PREFIX;
    while (LANGUAGES.includes((prefixAcc + FIRST_LANG) as any)) prefixAcc += PREFIX;
    const invalidLanguage = prefixAcc + FIRST_LANG;
    expect(isValidLanguageFlag(invalidLanguage)).toBe(false);
  });
});
