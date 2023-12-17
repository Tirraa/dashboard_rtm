import { describe, expect, it } from 'vitest';

import getSlashEnvelope from '../getSlashEnvelope';

describe('getSlashEnvelope', () => {
  it('should return /foo/', () => {
    const expected = '/foo/';
    expect(getSlashEnvelope('foo')).toBe(expected);
    expect(getSlashEnvelope('/foo')).toBe(expected);
    expect(getSlashEnvelope('foo/')).toBe(expected);
    expect(getSlashEnvelope('/foo/')).toBe(expected);
  });

  it("should return '//', given empty string", () => {
    expect(getSlashEnvelope('')).toBe('//');
  });
});
