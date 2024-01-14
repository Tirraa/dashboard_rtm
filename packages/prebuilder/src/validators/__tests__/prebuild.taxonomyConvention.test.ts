// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { isValidBlogTaxonomy } from '../taxonomyConvention';
import { MAX_TAXONOMY_LEN } from '../../config';

describe('isValidBlogTaxonomy', () => {
  it('should return false, given invalid taxonomies', () => {
    const tooLong = 'w'.repeat(MAX_TAXONOMY_LEN + 1);

    expect(isValidBlogTaxonomy('_$!§%&/()=?')).toBe(false);
    expect(isValidBlogTaxonomy('0_$!§%&/()=?')).toBe(false);
    expect(isValidBlogTaxonomy('foo-bar_$!§%&/()=?')).toBe(false);
    expect(isValidBlogTaxonomy('_foo-bar_$!§%&/()=?')).toBe(false);
    expect(isValidBlogTaxonomy('_foo-bar')).toBe(false);
    expect(isValidBlogTaxonomy('$foo-bar')).toBe(false);
    expect(isValidBlogTaxonomy(tooLong)).toBe(false);
  });

  it('should return true, given valid taxonomies', () => {
    expect(isValidBlogTaxonomy('foo-bar')).toBe(true);
    expect(isValidBlogTaxonomy('0-foo-bar')).toBe(true);
  });
});
