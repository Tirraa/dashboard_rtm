import { describe, expect, it } from 'vitest';

import getLinkTarget from '../getLinkTarget';

describe('getLinkTarget', () => {
  it('should return target blank, given external link', () => {
    const target = getLinkTarget('https://example.com');
    expect(target).toBe('_blank');
  });

  it('should return target undefined, given internal link', () => {
    const target = getLinkTarget('foo/bar');
    expect(target).toBe(undefined);
  });
});
