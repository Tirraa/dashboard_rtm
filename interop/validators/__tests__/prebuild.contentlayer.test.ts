import { describe, expect, it, vi } from 'vitest';

import validateContentlayerConfig from '../contentlayer';

describe('validateContentlayerConfig (happy paths)', () => {
  it('should not throw, given valid config, not containing duplicates', () => {
    expect(() =>
      validateContentlayerConfig(
        [
          { def: () => ({ name: 'a' }), type: 'document' },
          { def: () => ({ name: 'b' }), type: 'document' },
          { def: () => ({ name: 'c' }), type: 'document' }
        ],
        ['a', 'b']
      )
    ).not.toThrowError();
  });
});

describe('validateContentlayerConfig (unhappy paths)', () => {
  const errorSpy = vi.spyOn(console, 'error');
  errorSpy.mockImplementation(vi.fn(() => {}));

  it('should throw, given invalid config, containing document types duplicates', () => {
    expect(() =>
      validateContentlayerConfig(
        [
          { def: () => ({ name: 'duplicate' }), type: 'document' },
          { def: () => ({ name: 'duplicate' }), type: 'document' },
          { def: () => ({ name: 'notDuplicate' }), type: 'document' }
        ],
        ['tag_one', 'tag_two']
      )
    ).toThrowError();
  });

  it('should throw, given invalid config, containing blog tags duplicates', () => {
    expect(() =>
      validateContentlayerConfig(
        [
          { def: () => ({ name: 'a' }), type: 'document' },
          { def: () => ({ name: 'b' }), type: 'document' },
          { def: () => ({ name: 'c' }), type: 'document' }
        ],
        ['duplicate', 'duplicate']
      )
    ).toThrowError();
  });

  it('should throw, given invalid config, containing both document types and blog tags duplicates', () => {
    expect(() =>
      validateContentlayerConfig(
        [
          { def: () => ({ name: 'duplicate' }), type: 'document' },
          { def: () => ({ name: 'duplicate' }), type: 'document' },
          { def: () => ({ name: 'notDuplicate' }), type: 'document' }
        ],
        ['duplicate', 'duplicate']
      )
    ).toThrowError();
  });
});
