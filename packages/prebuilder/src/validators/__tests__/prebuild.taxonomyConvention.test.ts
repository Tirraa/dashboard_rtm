import { describe, expect, it } from 'vitest';

import isValidTaxonomy from '../taxonomyConvention';
import { MAX_TAXONOMY_LEN } from '../../config';

describe('isValidTaxonomy', () => {
  it('should return false, given invalid taxonomies', () => {
    const tooLong = 'a'.repeat(MAX_TAXONOMY_LEN + 1);

    expect(isValidTaxonomy('_$!§%&/()=?')).toBe(false);
    expect(isValidTaxonomy('0_$!§%&/()=?')).toBe(false);
    expect(isValidTaxonomy('foo-bar_$!§%&/()=?')).toBe(false);
    expect(isValidTaxonomy('_foo-bar_$!§%&/()=?')).toBe(false);
    expect(isValidTaxonomy('_foo-bar')).toBe(false);
    expect(isValidTaxonomy('$foo-bar')).toBe(false);
    expect(isValidTaxonomy(tooLong)).toBe(false);
  });

  it('should return true, given valid taxonomies', () => {
    expect(isValidTaxonomy('foo-bar')).toBe(true);
    expect(isValidTaxonomy('0-foo-bar')).toBe(true);
  });
});
