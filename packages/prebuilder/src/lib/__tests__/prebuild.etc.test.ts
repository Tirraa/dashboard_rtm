import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';

// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import getRawDataFromBracesDeclaration from '../getRawDataFromBracesDeclaration';
import { localesInfosInnerToObj } from '../etc';

describe('localesInfosInnerToObj', () => {
  it('should return an obj when parsing succeeds', () => {
    const objInner = '"foo": "bar"';
    expect(localesInfosInnerToObj(objInner)).toStrictEqual({ foo: 'bar' });
  });

  it('should return an obj, given a valid obj inner', () => {
    const initialObj = { foo: 'bar', bar: 'foo' };
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const objInner = getRawDataFromBracesDeclaration(JSON.stringify(initialObj), 0);
    expect(objInner).not.toBe(null);
    expect(localesInfosInnerToObj(objInner as string)).toStrictEqual(initialObj);
  });

  it('should return an obj, given a valid obj inner (nested)', () => {
    const initialObj = {
      baz: {
        baz: {
          bar: 'foo'
        },
        foo: 'bar',
        bar: 'foo'
      },
      foo: 'bar',
      bar: 'foo'
    };

    const objInner = getRawDataFromBracesDeclaration(
      JSON.stringify(initialObj),
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      0
    );
    expect(objInner).not.toBe(null);
    expect(localesInfosInnerToObj(objInner as string)).toStrictEqual(initialObj);
  });

  it('should return an obj, given a valid obj inner (literals)', () => {
    const objInner = "foo: 'bar', bar: 'foo'";
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(localesInfosInnerToObj(objInner)).toStrictEqual({ foo: 'bar', bar: 'foo' });
  });

  it('should return an obj, given a valid obj inner (string literals)', () => {
    const objInner = "'foo': 'bar', 'bar': 'foo'";
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(localesInfosInnerToObj(objInner)).toStrictEqual({ foo: 'bar', bar: 'foo' });
  });

  it('should throw when Babel parsing fails', () => {
    const objInner = 'foo: bar';
    expect(() => localesInfosInnerToObj(objInner)).toThrow();
  });

  it('should throw, given an invalid obj inner (numeric literals)', () => {
    const objInner = "2172183: 'bar', 211838173: 'foo'";
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(() => localesInfosInnerToObj(objInner)).toThrow();
  });

  it('should throw, given an invalid obj inner (int values)', () => {
    const objInner = 'foo: 45, bar: 12';
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(() => localesInfosInnerToObj(objInner)).toThrow();
  });

  it('should throw when encountering unsupported value type', () => {
    const objInner = 'foo: /regex/';
    expect(() => localesInfosInnerToObj(objInner)).toThrow();
  });

  it('should throw, given stupid input (random number)', () => {
    const objInner = '88909988799';
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(() => localesInfosInnerToObj(objInner)).toThrow();
  });

  it('should return empty object, given empty string input', () => {
    const objInner: EmptyString = '';
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(localesInfosInnerToObj(objInner)).toStrictEqual({});
  });

  it('should throw when JSON parsing fails', () => {
    const objInner = 'invalid json';
    expect(() => localesInfosInnerToObj(objInner)).toThrow();
  });
});
