import { describe, expect, it } from 'vitest';

import fromKebabCaseToSentenceCase from '../fromKebabCaseToSentenceCase';

describe('fromKebabCaseToSentenceCase', () => {
  it('should return a sentence case string, given kebab-case string', () => {
    expect(fromKebabCaseToSentenceCase('foo')).toBe('Foo');
    expect(fromKebabCaseToSentenceCase('foo-bar')).toBe('Foo bar');
    expect(fromKebabCaseToSentenceCase('foo-bar-foo')).toBe('Foo bar foo');
  });

  it('should return only capitalized strings, given not kebab-case strings', () => {
    expect(fromKebabCaseToSentenceCase('Foo')).toBe('Foo');
    expect(fromKebabCaseToSentenceCase('Foo bar')).toBe('Foo bar');
    expect(fromKebabCaseToSentenceCase('Foo bar foo')).toBe('Foo bar foo');
    expect(fromKebabCaseToSentenceCase('Foo Bar foo')).toBe('Foo Bar foo');
    expect(fromKebabCaseToSentenceCase('FoO BaR FoO')).toBe('FoO BaR FoO');
    expect(fromKebabCaseToSentenceCase('foO BaR FoO')).toBe('FoO BaR FoO');
  });

  it("should return '', given an empty string", () => {
    expect(fromKebabCaseToSentenceCase('')).toBe('');
  });
});
