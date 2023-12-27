"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const blogArchitectureMetadatas_1 = __importDefault(require("../blogArchitectureMetadatas"));
const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';
const VALID_BLOG_POSTS_FOLDER_PATH = './packages/prebuilder/src/metadatas-builders/__tests__/fake_blog_posts_folder';
(0, vitest_1.describe)('getBlogArchitectureMetadatas', () => {
    (0, vitest_1.it)('should throw ENOENT, given invalid path', () => {
        vitest_1.expect.assertions(1);
        try {
            (0, blogArchitectureMetadatas_1.default)(INVALID_PATH);
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
    (0, vitest_1.it)('should return an exhaustive metadatas object, given a valid blog posts folder path', () => {
        (0, vitest_1.expect)((0, blogArchitectureMetadatas_1.default)(VALID_BLOG_POSTS_FOLDER_PATH)).toMatchSnapshot();
    });
});
