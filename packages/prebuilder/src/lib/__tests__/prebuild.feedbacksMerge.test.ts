import { describe, expect, it } from 'vitest';

import { prefixFeedback, foldFeedbacks } from '../feedbacksMerge';

describe('prefixFeedback', () => {
  it('should return empty string, given empty feedback', () => {
    expect(prefixFeedback('', 'prefix')).toBe('');
  });

  it('should return prefixed feedback string, given feedback and prefix', () => {
    expect(prefixFeedback('feedback', 'prefix: ')).toBe('prefix: feedback');
  });
});

describe('foldFeedbacks', () => {
  it('should return an empty string, given no feedback', () => {
    expect(foldFeedbacks()).toBe('');
  });

  it('should return an empty string, given an empty feedback', () => {
    expect(foldFeedbacks('')).toBe('');
  });

  it('should return the same string, given only one feedback', () => {
    expect(foldFeedbacks('foo')).toBe('foo');
  });

  it('should return the merged feedbacks, given two feedbacks', () => {
    expect(foldFeedbacks('foo', 'bar')).toBe('foo\nbar');
  });

  it('should return the folded feedbacks, given three feedbacks', () => {
    expect(foldFeedbacks('foo', 'bar', 'baz')).toBe('foo\nbar\nbaz');
  });

  it('should return the first feedback, given a first valid feedback and a second empty feedback', () => {
    expect(foldFeedbacks('foo', '')).toBe('foo');
  });

  it('should return the second feedback, given a first empty feedback and a second valid feedback', () => {
    expect(foldFeedbacks('', 'bar')).toBe('bar');
  });
});
