import { describe, expect, it } from 'vitest';

import createURLSearchParams from '../createURLSearchParams';

describe('createURLSearchParams', () => {
  it('should create URLSearchParams, given searchParams object', () => {
    const URLSearchParams = createURLSearchParams({ foo: '1', bar: '2' });
    expect(URLSearchParams).toBe('?foo=1&bar=2');
  });

  it('should return an empty string, given empty searchParams object', () => {
    const URLSearchParams = createURLSearchParams({});
    expect(URLSearchParams).toBe('');
  });
});
