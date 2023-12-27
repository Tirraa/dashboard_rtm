"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const traverseFolder_1 = __importDefault(require("../traverseFolder"));
const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';
(0, vitest_1.describe)('traverseFolder', () => {
    (0, vitest_1.it)('should return an arborescence, given a valid RootFolder (full)', () => {
        (0, vitest_1.expect)((0, traverseFolder_1.default)('./packages/prebuilder/src/lib/__tests__/fakeDirectory')).toMatchSnapshot();
    });
    (0, vitest_1.it)('should return an arborescence, given a valid RootFolder (partial)', () => {
        (0, vitest_1.expect)((0, traverseFolder_1.default)('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar')).toMatchSnapshot();
    });
    (0, vitest_1.it)('should return an arborescence, given a valid RootFolder (partial 2)', () => {
        (0, vitest_1.expect)((0, traverseFolder_1.default)('./packages/prebuilder/src/lib/__tests__/fakeDirectory/bar/baz/foo')).toMatchSnapshot();
    });
    (0, vitest_1.it)('should throw ENOENT, given invalid path', () => {
        vitest_1.expect.assertions(1);
        try {
            (0, traverseFolder_1.default)(INVALID_PATH);
        }
        catch (e) {
            const interceptedError = e;
            if ('code' in interceptedError) {
                (0, vitest_1.expect)(interceptedError.code).toBe('ENOENT');
            }
            else {
                throw new Error('Error code not found');
            }
        }
    });
});
