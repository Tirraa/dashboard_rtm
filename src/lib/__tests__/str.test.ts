import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';

import { hrefMatchesPathname } from '../str';

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
