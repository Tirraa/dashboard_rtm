import { DEFAULT_LANGUAGE } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import { describe, expect, it } from 'vitest';
import { getPathnameMaybeI18nFlag, getPathnameWithoutI18nFlag } from '../i18n';

describe('getPathnameMaybeI18nFlag', () => {
  it('should return empty string or flag, given a pathname without i18n flag and a pathname with an i18n flag', () => {
    expect(getPathnameMaybeI18nFlag('/foo')).toBe('');
    expect(getPathnameMaybeI18nFlag(`/${DEFAULT_LANGUAGE}/foo`)).toBe(DEFAULT_LANGUAGE);
  });
});

describe('getPathnameWithoutI18nFlag', () => {
  it('should return the same path or the path without its i18n flag, given a pathname without i18n flag and a pathname with an i18n flag', () => {
    expect(getPathnameWithoutI18nFlag('/foo')).toBe('/foo');
    expect(getPathnameWithoutI18nFlag(`/${DEFAULT_LANGUAGE}/foo`)).toBe('/foo');
    expect(getPathnameWithoutI18nFlag(`${ROUTES_ROOTS.WEBSITE}${DEFAULT_LANGUAGE}`)).toBe(ROUTES_ROOTS.WEBSITE);
  });
});
