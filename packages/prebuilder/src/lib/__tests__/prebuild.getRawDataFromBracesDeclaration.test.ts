// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import getRawDataFromBracesDeclaration from '../getRawDataFromBracesDeclaration';

const OBJ_A = { foo: 'bar' };
const OBJ_B = {
  baz: {
    foo: 'bar',
    bar: 'foo'
  },
  foo: 'bar',
  bar: 'foo'
};

const OBJ_C = {
  baz: {
    foo: 'bar',
    bar: 'foo'
  },
  bar: {
    foo: 'foo',
    bar: 'bar'
  },
  foo: 'bar'
};

describe('getRawDataFromBracesDeclaration', () => {
  it('should pass, given any string, with default startIndex which is equal to 0', () => {
    expect(getRawDataFromBracesDeclaration('test')).toBe(null);
    expect(getRawDataFromBracesDeclaration('{}')).toBe('');
    expect(getRawDataFromBracesDeclaration('{{}}')).toBe('{}');
    expect(getRawDataFromBracesDeclaration(JSON.stringify(OBJ_A))).toBe('"foo":"bar"');
    expect(getRawDataFromBracesDeclaration(JSON.stringify(OBJ_B))).toBe('"baz":{"foo":"bar","bar":"foo"},"foo":"bar","bar":"foo"');
    expect(getRawDataFromBracesDeclaration(JSON.stringify(OBJ_C))).toBe(
      '"baz":{"foo":"bar","bar":"foo"},"bar":{"foo":"foo","bar":"bar"},"foo":"bar"'
    );
  });

  it('should pass, given any string, with startIndex', () => {
    const padding_1 = ' ';
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const padding_2 = ' '.repeat(2);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const padding_3 = ' '.repeat(3);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const padding_4 = ' '.repeat(4);

    expect(getRawDataFromBracesDeclaration(padding_1 + '{}', padding_1.length)).toBe('');
    expect(getRawDataFromBracesDeclaration(padding_2 + '{{}}', padding_2.length)).toBe('{}');
    expect(getRawDataFromBracesDeclaration(padding_3 + JSON.stringify(OBJ_A), padding_3.length)).toBe('"foo":"bar"');
    expect(getRawDataFromBracesDeclaration(padding_4 + JSON.stringify(OBJ_B), padding_4.length)).toBe(
      '"baz":{"foo":"bar","bar":"foo"},"foo":"bar","bar":"foo"'
    );
    expect(getRawDataFromBracesDeclaration(padding_1 + JSON.stringify(OBJ_C), padding_1.length)).toBe(
      '"baz":{"foo":"bar","bar":"foo"},"bar":{"foo":"foo","bar":"bar"},"foo":"bar"'
    );
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(getRawDataFromBracesDeclaration(`{foo:{bar: 'baz';}}`, 1)).toBe("bar: 'baz';");
  });
});
