"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const feedbacksMerge_1 = require("../feedbacksMerge");
(0, vitest_1.describe)('prefixFeedback', () => {
    (0, vitest_1.it)('should return empty string, given empty feedback', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.prefixFeedback)('', 'prefix')).toBe('');
    });
    (0, vitest_1.it)('should return prefixed feedback string, given feedback and prefix', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.prefixFeedback)('feedback', 'prefix: ')).toBe('prefix: feedback');
    });
});
(0, vitest_1.describe)('foldFeedbacks', () => {
    (0, vitest_1.it)('should return an empty string, given no feedback', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.foldFeedbacks)()).toBe('');
    });
    (0, vitest_1.it)('should return an empty string, given an empty feedback', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.foldFeedbacks)('')).toBe('');
    });
    (0, vitest_1.it)('should return the same string, given only one feedback', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.foldFeedbacks)('foo')).toBe('foo');
    });
    (0, vitest_1.it)('should return the merged feedbacks, given two feedbacks', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.foldFeedbacks)('foo', 'bar')).toBe('foo\nbar');
    });
    (0, vitest_1.it)('should return the folded feedbacks, given three feedbacks', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.foldFeedbacks)('foo', 'bar', 'baz')).toBe('foo\nbar\nbaz');
    });
    (0, vitest_1.it)('should return the first feedback, given a first valid feedback and a second empty feedback', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.foldFeedbacks)('foo', '')).toBe('foo');
    });
    (0, vitest_1.it)('should return the second feedback, given a first empty feedback and a second valid feedback', () => {
        (0, vitest_1.expect)((0, feedbacksMerge_1.foldFeedbacks)('', 'bar')).toBe('bar');
    });
});
