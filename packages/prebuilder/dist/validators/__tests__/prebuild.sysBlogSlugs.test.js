"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const sysBlogSlugs_1 = __importDefault(require("../sysBlogSlugs"));
const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';
const VALID_BLOG_POSTS_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_posts_folders/valid_fake_posts_folder';
const INVALID_BLOG_POSTS_FOLDER_CONTAINING_ONE_INVALID_BLOG_SLUG = './packages/prebuilder/src/validators/__tests__/fake_posts_folders/invalid_fake_posts_folder_invalid_blog_slug';
const INVALID_BLOG_POSTS_FOLDER_CONTAINING_SEVERAL_INVALID_BLOG_SLUGS = './packages/prebuilder/src/validators/__tests__/fake_posts_folders/invalid_fake_posts_folder_several_invalid_blog_slugs';
// {ToDo} Rewrite this when https://github.com/Tirraa/dashboard_rtm/issues/16 will be solved.
const INVALID_SLUG_NEEDLE = 'Invalid slug'.toLowerCase();
const INVALID_SLUGS_NEEDLE = 'Invalid slugs'.toLowerCase();
const EMPTY_FEEDBACK = '';
(0, vitest_1.describe)('sysBlogSlugsValidator', () => {
    (0, vitest_1.it)('should throw ENOENT, given invalid path', () => {
        vitest_1.expect.assertions(1);
        try {
            (0, sysBlogSlugs_1.default)(INVALID_PATH);
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
    (0, vitest_1.it)('should produce an error feedback, given a path to a folder with an invalid blog slug', () => {
        const feedback = (0, sysBlogSlugs_1.default)(INVALID_BLOG_POSTS_FOLDER_CONTAINING_ONE_INVALID_BLOG_SLUG);
        (0, vitest_1.expect)(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
    });
    (0, vitest_1.it)('should produce an error feedback, given a path to a folder with several invalid blog slugs', () => {
        const feedback = (0, sysBlogSlugs_1.default)(INVALID_BLOG_POSTS_FOLDER_CONTAINING_SEVERAL_INVALID_BLOG_SLUGS);
        (0, vitest_1.expect)(feedback.toLowerCase().includes(INVALID_SLUG_NEEDLE)).toBe(true);
        (0, vitest_1.expect)(feedback.toLowerCase().includes(INVALID_SLUGS_NEEDLE)).toBe(true);
    });
    (0, vitest_1.it)('should not produce any feedback, given a path to a valid blog posts folder', () => {
        const feedback = (0, sysBlogSlugs_1.default)(VALID_BLOG_POSTS_FOLDER);
        (0, vitest_1.expect)(feedback).toBe(EMPTY_FEEDBACK);
    });
});
