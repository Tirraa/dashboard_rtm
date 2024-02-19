import { expectType } from 'jest-tsd';
import { describe, it } from 'vitest';

import type { MakePagesLangAndPathPairs, IndexToken } from './Page';

const _ = {};

describe('MakePagesLangAndPathPairs', () => {
  it('should pass, given a single URL (short path)', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/fr/foo'>;

    expectType<{ path: 'foo'; lang: 'fr' }>(fake);
  });

  it('should pass, given twins (short path)', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/fr/foo' | '/en/foo'>;

    expectType<{ path: 'foo'; lang: 'fr' } | { path: 'foo'; lang: 'en' }>(fake);
  });

  it('should pass, given disjonction (short path)', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/fr/foo' | '/en/bar'>;

    expectType<{ path: 'foo'; lang: 'fr' } | { path: 'bar'; lang: 'en' }>(fake);
  });

  it('should pass, given a single URL (long path)', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/fr/foo/bar/baz'>;

    expectType<{ path: 'foo/bar/baz'; lang: 'fr' }>(fake);
  });

  it('should pass, given twins (long path)', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/fr/foo/bar/baz' | '/en/foo/bar/baz'>;

    expectType<{ path: 'foo/bar/baz'; lang: 'fr' } | { path: 'foo/bar/baz'; lang: 'en' }>(fake);
  });

  it('should pass, given disjonction (long path)', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/en/foo/bar/baz/1' | '/fr/foo/bar/baz'>;

    expectType<{ path: 'foo/bar/baz/1'; lang: 'en' } | { path: 'foo/bar/baz'; lang: 'fr' }>(fake);
  });
});

describe('MakePagesLangAndPathPairs (index notation)', () => {
  it('should pass, given a single URL', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/fr'>;

    expectType<{ path: IndexToken; lang: 'fr' }>(fake);
  });

  it('should pass, given twins', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/fr' | '/en'>;

    expectType<{ path: IndexToken; lang: 'fr' } | { path: IndexToken; lang: 'en' }>(fake);
  });

  it('should pass, given disjonction', () => {
    const fake = _ as MakePagesLangAndPathPairs<'/en/bar' | '/fr'>;

    expectType<{ path: IndexToken; lang: 'fr' } | { path: 'bar'; lang: 'en' }>(fake);
  });
});
