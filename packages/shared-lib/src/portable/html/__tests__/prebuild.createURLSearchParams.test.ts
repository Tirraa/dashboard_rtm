import { describe, expect, it } from 'vitest';

import createURLSearchParams from '../createURLSearchParams';

describe('createURLSearchParams', () => {
  it('should create URLSearchParams, given searchParams object', () => {
    const _URLSearchParams = createURLSearchParams({ foo: '1', bar: '2' });
    expect(_URLSearchParams).toBe('?foo=1&bar=2');
  });

  it('should create URLSearchParams, given searchParams and currentSearchParams objects', () => {
    const oldURLSearchParams = new URLSearchParams('bar=2');
    const _URLSearchParams = createURLSearchParams({ foo: '1' }, oldURLSearchParams);
    expect(_URLSearchParams).toBe('?bar=2&foo=1');
  });

  it('should create URLSearchParams, overriding', () => {
    const oldURLSearchParams = new URLSearchParams('bar=3');
    const _URLSearchParams = createURLSearchParams({ bar: '1' }, oldURLSearchParams);
    expect(_URLSearchParams).toBe('?bar=1');
  });

  it('should create URLSearchParams, cleanup (empty new searchParams obj)', () => {
    const oldURLSearchParams = new URLSearchParams('bar=3&foo=');
    const _URLSearchParams = createURLSearchParams({}, oldURLSearchParams);
    expect(_URLSearchParams).toBe('?bar=3');
  });

  it('should create URLSearchParams, cleanup (not empty searchParams obj)', () => {
    const oldURLSearchParams = new URLSearchParams('bar=3&foo=');
    const _URLSearchParams = createURLSearchParams({ baz: '' }, oldURLSearchParams);
    expect(_URLSearchParams).toBe('?bar=3');
  });

  it('should return an empty string, given empty searchParams object', () => {
    const _URLSearchParams = createURLSearchParams({});
    expect(_URLSearchParams).toBe('');
  });

  it('should return an empty string, given both empty searchParams and currentSearchParams objects', () => {
    const emptyURLSearchParams = new URLSearchParams();
    const _URLSearchParams = createURLSearchParams({}, emptyURLSearchParams);
    expect(_URLSearchParams).toBe('');
  });

  it('should return an empty string, given stupid args', () => {
    const stupidURLSearchParams = new URLSearchParams('whatever=');
    const _URLSearchParams = createURLSearchParams({ foo: null, bar: null, baz: '' }, stupidURLSearchParams);
    expect(_URLSearchParams).toBe('');
  });
});
