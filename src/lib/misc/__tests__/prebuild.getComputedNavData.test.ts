import { describe, expect, it } from 'vitest';

import getComputedNavData from '../getComputedNavData';

describe('getComputedNavData', () => {
  it('should return a simple computed navData, given simple valid input', () => {
    const computedNavData = getComputedNavData(
      {
        // @ts-expect-error
        ___FOO_PAGE___: 'foo'
      },
      { ___FOO_PAGE___: 'testing.foo.foo' }
    );

    expect(computedNavData).toStrictEqual([{ i18nTitle: 'testing.foo.foo', path: 'foo' }]);
  });

  it('should return a multi-entries computed navData, given a multi-entries valid input', () => {
    const computedNavData = getComputedNavData(
      {
        // @ts-expect-error
        ___FOO_PAGE___: 'foo',
        ___BAR_PAGE___: 'bar'
      },
      {
        ___FOO_PAGE___: 'testing.foo.foo',
        ___BAR_PAGE___: 'testing.foo.bar'
      }
    );

    expect(computedNavData).toStrictEqual([
      { i18nTitle: 'testing.foo.foo', path: 'foo' },
      { i18nTitle: 'testing.foo.bar', path: 'bar' }
    ]);
  });

  it('should return a multi-entries computed navData with embedded entities, given a multi-entries with embedded entities valid input', () => {
    const computedNavData = getComputedNavData(
      {
        // @ts-expect-error
        ___FOOA_PAGE___: 'fooa',
        ___FOO_PAGE___: 'foo',
        ___BAR_PAGE___: 'bar'
      },
      {
        ___FOOA_PAGE___: 'testing.foo.fooa',
        ___FOO_PAGE___: 'testing.foo.foo',
        ___BAR_PAGE___: 'testing.foo.bar'
      },
      {
        ___FOOA_PAGE___: [
          { i18nTitle: 'testing.foo.fooa.bar', path: 'fooa/bar' },
          { i18nTitle: 'testing.foo.foob.bar', path: 'foob/bar' }
        ]
      }
    );

    expect(computedNavData).toStrictEqual([
      {
        embeddedEntities: [
          { i18nTitle: 'testing.foo.fooa.bar', path: 'fooa/bar' },
          { i18nTitle: 'testing.foo.foob.bar', path: 'foob/bar' }
        ],
        i18nTitle: 'testing.foo.fooa',
        path: 'fooa'
      },
      { i18nTitle: 'testing.foo.foo', path: 'foo' },
      { i18nTitle: 'testing.foo.bar', path: 'bar' }
    ]);
  });
});
