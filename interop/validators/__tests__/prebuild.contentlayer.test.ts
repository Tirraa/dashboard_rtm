import { describe, expect, it } from 'vitest';

import ContentlayerDuplicateTypesError from '../errors/ContentlayerDuplicateTypesError';
import validateContentlayerConfig from '../contentlayer';

describe('validateContentlayerConfig', () => {
  it('should throw, given invalid config, containing duplicates', () => {
    expect(() =>
      validateContentlayerConfig([
        { def: () => ({ name: 'duplicate' }), type: 'document' },
        { def: () => ({ name: 'duplicate' }), type: 'document' },
        { def: () => ({ name: 'notDuplicate' }), type: 'document' }
      ])
    ).toThrowError(ContentlayerDuplicateTypesError);
  });

  it('should not throw, given invalid config, containing duplicates', () => {
    expect(() =>
      validateContentlayerConfig([
        { def: () => ({ name: 'a' }), type: 'document' },
        { def: () => ({ name: 'b' }), type: 'document' },
        { def: () => ({ name: 'c' }), type: 'document' }
      ])
    ).not.toThrowError(ContentlayerDuplicateTypesError);
  });
});
