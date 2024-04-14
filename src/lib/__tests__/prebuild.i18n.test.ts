import { DEFAULT_LANGUAGE, LANGUAGES } from '##/config/i18n';
import { describe, expect, it } from 'vitest';
import ROUTES_ROOTS from '##/config/routes';

import { getPathnameWithoutI18nFlag, getPathnameMaybeI18nFlag } from '../i18n';

const PREFIX = 'a';
let prefixAcc = PREFIX;
while (LANGUAGES.includes((prefixAcc + DEFAULT_LANGUAGE) as any)) prefixAcc += PREFIX;
const invalidLanguage = prefixAcc + DEFAULT_LANGUAGE;

describe('getPathnameMaybeI18nFlag', () => {
  it('should return null or a flag, given a pathname without i18n flag and a pathname with an i18n flag', () => {
    expect(getPathnameMaybeI18nFlag(`/${invalidLanguage}`)).toBe(null);
    expect(getPathnameMaybeI18nFlag(`/${DEFAULT_LANGUAGE}/foo`)).toBe(DEFAULT_LANGUAGE);
  });
});

describe('getPathnameWithoutI18nFlag', () => {
  it('should return the same path or the path without its i18n flag, given a pathname without i18n flag and a pathname with an i18n flag', () => {
    expect(getPathnameWithoutI18nFlag(`/${invalidLanguage}`)).toBe(`/${invalidLanguage}`);
    expect(getPathnameWithoutI18nFlag(`/${DEFAULT_LANGUAGE}/foo`)).toBe('/foo');
    expect(getPathnameWithoutI18nFlag(`${ROUTES_ROOTS.WEBSITE}${DEFAULT_LANGUAGE}`)).toBe(ROUTES_ROOTS.WEBSITE);
  });
});
