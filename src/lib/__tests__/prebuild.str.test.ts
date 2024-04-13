import { FAKE_LOCALES } from '𝕍/commons';
// eslint-disable-next-line perfectionist/sort-imports
import { DEFAULT_LANGUAGE, LANGUAGES } from '##/config/i18n';
import { describe, expect, it, vi } from 'vitest';

import { hrefAndPathnameExactMatch, hrefMatchesPathname } from '../str';

vi.mock('##/config/i18n', async (orgImport) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await orgImport<typeof import('##/config/i18n')>();

  return {
    ...mod,
    LANGUAGES: Array.from(new Set<string>([mod.DEFAULT_LANGUAGE, ...FAKE_LOCALES]))
  };
});

const NOT_DEFAULT_LANGUAGE = LANGUAGES.find((lang) => lang !== DEFAULT_LANGUAGE);

describe('hrefMatchesPathname', () => {
  it('should return true', () => {
    expect(hrefMatchesPathname('/foo/bar', '/foo/bar/1', '/')).toBe(true);
    expect(hrefMatchesPathname('/foo', '/foo/bar/1', '/')).toBe(true);
    expect(hrefMatchesPathname('/dashboard/foo', '/dashboard/foo/1', '/dashboard')).toBe(true);
    expect(hrefMatchesPathname('/dashboard', '/dashboard/bar', '/')).toBe(true);
    expect(hrefMatchesPathname('/dashboard', `/${DEFAULT_LANGUAGE}/dashboard/bar`, '/')).toBe(true);
    expect(hrefMatchesPathname('/dashboard', `/${DEFAULT_LANGUAGE}/dashboard`, '/')).toBe(true);
  });

  it('should return false', () => {
    expect(hrefMatchesPathname('/dashboard', '/dashboard/bar', '/dashboard')).toBe(false);
  });
});

describe('hrefAndPathnameExactMatch', () => {
  it('should return true', () => {
    expect(hrefAndPathnameExactMatch('foo', 'foo')).toBe(true);
    expect(hrefAndPathnameExactMatch('/foo', '/foo/')).toBe(true);
    expect(hrefAndPathnameExactMatch('/foo/', '/foo')).toBe(true);
    expect(hrefAndPathnameExactMatch('/foo', '/foo////')).toBe(true);
    expect(hrefAndPathnameExactMatch('/foo////', '/foo')).toBe(true);
    expect(hrefAndPathnameExactMatch('/foo', '/foo')).toBe(true);
    expect(hrefAndPathnameExactMatch('/foo', `/${DEFAULT_LANGUAGE}/foo`)).toBe(true);
    expect(hrefAndPathnameExactMatch(`/${DEFAULT_LANGUAGE}/foo`, '/foo')).toBe(true);
    expect(hrefAndPathnameExactMatch(`/${DEFAULT_LANGUAGE}/dashboard`, `/${DEFAULT_LANGUAGE}/dashboard`)).toBe(true);
    expect(hrefAndPathnameExactMatch(`/foo`, `/${NOT_DEFAULT_LANGUAGE}/foo`)).toBe(true);
    expect(hrefAndPathnameExactMatch('/', `/${NOT_DEFAULT_LANGUAGE}`)).toBe(true);
  });

  it('should return false', () => {
    expect(hrefAndPathnameExactMatch(`/${NOT_DEFAULT_LANGUAGE}/dashboard`, '/dashboard')).toBe(false);
    expect(hrefAndPathnameExactMatch('/dashboard', '/dashboard/bar')).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(hrefAndPathnameExactMatch(`/${LANGUAGES[0]}/dashboard`, `/${LANGUAGES[1]}/dashboard/bar`)).toBe(false);
  });
});

vi.doUnmock('##/config/i18n');
