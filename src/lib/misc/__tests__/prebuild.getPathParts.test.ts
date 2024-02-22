import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';

import getPathParts from '../getPathParts';

describe('getPathParts', () => {
  it('should return path parts, given path without i18n flag', () => {
    const pathParts = getPathParts('/_absolutely_not_lang/foo/bar');
    expect(pathParts).toStrictEqual(['_absolutely_not_lang', 'foo', 'bar']);
  });

  it("should return path parts, given path without i18n flag, not starting with '/'", () => {
    const pathParts = getPathParts('_absolutely_not_lang/foo/bar');
    expect(pathParts).toStrictEqual(['_absolutely_not_lang', 'foo', 'bar']);
  });

  it('should return path parts, given path with an i18n flag', () => {
    const pathParts = getPathParts(`/${DEFAULT_LANGUAGE}/foo/bar`);
    expect(pathParts).toStrictEqual(['foo', 'bar']);
  });
});
