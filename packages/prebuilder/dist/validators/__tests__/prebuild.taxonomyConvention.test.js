"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const taxonomyConvention_1 = __importDefault(require("../taxonomyConvention"));
const config_1 = require("../../config");
(0, vitest_1.describe)('isValidTaxonomy', () => {
    (0, vitest_1.it)('should return false, given invalid taxonomies', () => {
        const tooLong = 'a'.repeat(config_1.MAX_TAXONOMY_LEN + 1);
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)('_$!§%&/()=?')).toBe(false);
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)('0_$!§%&/()=?')).toBe(false);
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)('foo-bar_$!§%&/()=?')).toBe(false);
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)('_foo-bar_$!§%&/()=?')).toBe(false);
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)('_foo-bar')).toBe(false);
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)('$foo-bar')).toBe(false);
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)(tooLong)).toBe(false);
    });
    (0, vitest_1.it)('should return true, given valid taxonomies', () => {
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)('foo-bar')).toBe(true);
        (0, vitest_1.expect)((0, taxonomyConvention_1.default)('0-foo-bar')).toBe(true);
    });
});
