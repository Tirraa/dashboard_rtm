"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const blogArchitectureType_1 = __importDefault(require("../blogArchitectureType"));
const fs = require('fs');
const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/blog/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'BLOG_ARCHITECTURE_TYPE';
(0, vitest_1.describe)('generateBlogArchitectureType', () => {
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_EMPTY_BLOG_ARCHITECTURE_TYPE';
        (0, blogArchitectureType_1.default)({}, targetFile, __TARGET_FOLDER);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_BLOG_ARCHITECTURE_TYPE';
        (0, blogArchitectureType_1.default)({
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
                'fake-subcategory-two': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], fr: ['fake-post-02'] }
            },
            'fake-category-three': {
                'fake-subcategory-five': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], en: ['fake-post-03'], it: ['fake-post-03'] },
                'fake-subcategory-four': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], es: ['fake-post-04'] }
            },
            'fake-category-two': { 'fake-subcategory-six': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], zh: ['fake-post-10'] } }
        }, targetFile, __TARGET_FOLDER);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
});
