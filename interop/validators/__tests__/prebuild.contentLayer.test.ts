import { describe, expect, it } from 'vitest';

import ContentLayerDuplicateTypesError from '../errors/ContentLayerDuplicateTypesError';
import validateContentLayerConfig from '../contentLayer';

describe('validateContentLayerConfig', () => {
  it('should throw, given invalid config, containing duplicates', () => {
    expect(() =>
      validateContentLayerConfig([
        { def: () => ({ name: 'duplicate' }), type: 'document' },
        { def: () => ({ name: 'duplicate' }), type: 'document' },
        { def: () => ({ name: 'notDuplicate' }), type: 'document' }
      ])
    ).toThrowError(ContentLayerDuplicateTypesError);
  });

  it('should not throw, given invalid config, containing duplicates', () => {
    expect(() =>
      validateContentLayerConfig([
        { def: () => ({ name: 'a' }), type: 'document' },
        { def: () => ({ name: 'b' }), type: 'document' },
        { def: () => ({ name: 'c' }), type: 'document' }
      ])
    ).not.toThrowError(ContentLayerDuplicateTypesError);
  });
});
