"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const blogType_1 = __importDefault(require("../blogType"));
const fs = require('fs');
const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/blog/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'BLOG_TYPE';
(0, vitest_1.describe)('generateBlogType', () => {
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_EMPTY_BLOG_TYPE';
        (0, blogType_1.default)({}, targetFile, __TARGET_FOLDER);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_BLOG_TYPE';
        (0, blogType_1.default)({
            'fake-category-one': {
                'fake-subcategory-one': {
                    DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'],
                    en: ['fake-post-01', 'fake-post-03'],
                    it: ['fake-post-01', 'fake-post-02'],
                    fr: ['fake-post-01']
                },
                'fake-subcategory-three': {
                    DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'],
                    es: ['fake-post-01'],
                    zh: ['fake-post-02']
                },
                'fake-subcategory-two': { fr: ['fake-post-02'] }
            },
            'fake-category-three': {
                'fake-subcategory-five': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], en: ['fake-post-03'], it: ['fake-post-03'] },
                'fake-subcategory-four': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], es: ['fake-post-04'] }
            },
            'fake-empty-subcategories-nested-in-category': {
                'fake-subcategory-seven': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], zh: ['fake-post-10'] },
                'fake-empty-subcategory': {}
            },
            'fake-category-two': { 'fake-subcategory-six': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], zh: ['fake-post-10'] } },
            'fake-empty-category': {}
        }, targetFile, __TARGET_FOLDER);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
});
