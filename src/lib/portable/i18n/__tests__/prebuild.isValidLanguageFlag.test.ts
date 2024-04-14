import { describe, expect, it } from 'vitest';
import { LANGUAGES } from '##/config/i18n';

import isValidLanguageFlag from '../isValidLanguageFlag';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const FIRST_LANG = LANGUAGES[0];

const PREFIX = '$';
let prefixAcc = PREFIX;
while (LANGUAGES.includes((prefixAcc + FIRST_LANG) as any)) prefixAcc += PREFIX;
const invalidLanguage = prefixAcc + FIRST_LANG;

describe('isValidLanguageFlag', () => {
  it('should return true for valid language flag', () => expect(isValidLanguageFlag(FIRST_LANG)).toBe(true));

  it('should return false for an invalid language flag', () => {
    expect(isValidLanguageFlag(invalidLanguage)).toBe(false);
  });
});
