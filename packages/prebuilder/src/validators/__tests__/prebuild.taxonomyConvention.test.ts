// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { isValidBlogTaxonomy, isValidPageTaxonomy, isValidLpTaxonomy } from '../taxonomyConvention';
import { MAX_BLOG_TAXONOMY_LEN, MAX_PAGE_TAXONOMY_LEN, MAX_LP_TAXONOMY_LEN } from '../../config';

describe('isValidPageTaxonomy', () => {
  it('should return false, given invalid taxonomies', () => {
    // eslint-disable-next-line no-magic-numbers
    const tooLong = 'w'.repeat(MAX_PAGE_TAXONOMY_LEN + 1);

    expect(isValidPageTaxonomy('_$!§%&/()=?')).toBe(false);
    expect(isValidPageTaxonomy('0_$!§%&/()=?')).toBe(false);
    expect(isValidPageTaxonomy('foo-bar_$!§%&/()=?')).toBe(false);
    expect(isValidPageTaxonomy('_foo-bar_$!§%&/()=?')).toBe(false);
    expect(isValidPageTaxonomy('_foo-bar')).toBe(false);
    expect(isValidPageTaxonomy('$foo-bar')).toBe(false);
    expect(isValidPageTaxonomy(tooLong)).toBe(false);
  });

  it('should return true, given valid taxonomies', () => {
    expect(isValidPageTaxonomy('foo-bar')).toBe(true);
    expect(isValidPageTaxonomy('0-foo-bar')).toBe(true);
  });
});

describe('isValidBlogTaxonomy', () => {
  it('should return false, given invalid taxonomies', () => {
    // eslint-disable-next-line no-magic-numbers
    const tooLong = 'w'.repeat(MAX_BLOG_TAXONOMY_LEN + 1);

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

describe('isValidLpTaxonomy', () => {
  it('should return false, given invalid taxonomies', () => {
    // eslint-disable-next-line no-magic-numbers
    const tooLong = 'w'.repeat(MAX_LP_TAXONOMY_LEN + 1);

    expect(isValidLpTaxonomy('_$!§%&/()=?')).toBe(false);
    expect(isValidLpTaxonomy('0_$!§%&/()=?')).toBe(false);
    expect(isValidLpTaxonomy('foo-bar_$!§%&/()=?')).toBe(false);
    expect(isValidLpTaxonomy('_foo-bar_$!§%&/()=?')).toBe(false);
    expect(isValidLpTaxonomy('_foo-bar')).toBe(false);
    expect(isValidLpTaxonomy('$foo-bar')).toBe(false);
    expect(isValidLpTaxonomy(tooLong)).toBe(false);
  });

  it('should return true, given valid taxonomies', () => {
    expect(isValidLpTaxonomy('foo-bar')).toBe(true);
    expect(isValidLpTaxonomy('0-foo-bar')).toBe(true);
  });
});
