"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const getRawDataFromBracesDeclaration_1 = __importDefault(require("../getRawDataFromBracesDeclaration"));
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
(0, vitest_1.describe)('getRawDataFromBracesDeclaration', () => {
    (0, vitest_1.it)('should pass, given any string, with default startIndex which is equal to 0', () => {
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)('test')).toBe(null);
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)('{}')).toBe('');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)('{{}}')).toBe('{}');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(JSON.stringify(OBJ_A))).toBe('"foo":"bar"');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(JSON.stringify(OBJ_B))).toBe('"baz":{"foo":"bar","bar":"foo"},"foo":"bar","bar":"foo"');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(JSON.stringify(OBJ_C))).toBe('"baz":{"foo":"bar","bar":"foo"},"bar":{"foo":"foo","bar":"bar"},"foo":"bar"');
    });
    (0, vitest_1.it)('should pass, given any string, with startIndex', () => {
        const padding_1 = ' ';
        const padding_2 = ' '.repeat(2);
        const padding_3 = ' '.repeat(3);
        const padding_4 = ' '.repeat(4);
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(padding_1 + '{}', padding_1.length)).toBe('');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(padding_2 + '{{}}', padding_2.length)).toBe('{}');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(padding_3 + JSON.stringify(OBJ_A), padding_3.length)).toBe('"foo":"bar"');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(padding_4 + JSON.stringify(OBJ_B), padding_4.length)).toBe('"baz":{"foo":"bar","bar":"foo"},"foo":"bar","bar":"foo"');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(padding_1 + JSON.stringify(OBJ_C), padding_1.length)).toBe('"baz":{"foo":"bar","bar":"foo"},"bar":{"foo":"foo","bar":"bar"},"foo":"bar"');
        (0, vitest_1.expect)((0, getRawDataFromBracesDeclaration_1.default)(`{foo:{bar: 'baz';}}`, 1)).toBe("bar: 'baz';");
    });
});
