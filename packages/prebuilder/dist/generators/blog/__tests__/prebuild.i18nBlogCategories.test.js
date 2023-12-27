"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const i18nBlogCategories_1 = __importDefault(require("../i18nBlogCategories"));
const fs = require('fs');
const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/blog/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'I18N_BLOG_CATEGORIES';
const __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN = ['_title', '_meta-description'];
const __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN = ['title', 'meta-description'];
const __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE = ['_fake'];
const __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE = ['fake'];
const __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE = ['_title', '_meta-description', '_fake'];
const __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE = ['title', 'meta-description', 'fake'];
const __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY = [];
const __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY = [];
const EMPTY_METADATAS = {};
const FAKE_METADATAS_A = {
    'fake-category-one': {
        'fake-subcategory-one': {
            DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'],
            en: ['fake-post-01', 'fake-post-03'],
            it: ['fake-post-01', 'fake-post-02'],
            fr: ['fake-post-01']
        },
        'fake-subcategory-three': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], es: ['fake-post-01'], zh: ['fake-post-02'] },
        'fake-subcategory-two': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], fr: ['fake-post-02'] }
    },
    'fake-category-three': {
        'fake-subcategory-five': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], en: ['fake-post-03'], it: ['fake-post-03'] },
        'fake-subcategory-four': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], es: ['fake-post-04'] }
    },
    'fake-category-two': { 'fake-subcategory-six': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'], zh: ['fake-post-10'] } }
};
const FAKE_METADATAS_B = {
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
};
(0, vitest_1.describe)('generateI18nBlogCategories', () => {
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_EMPTY_BLOG_CATEGORIES_MIN';
        (0, i18nBlogCategories_1.default)(EMPTY_METADATAS, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_MIN_FAKE_METADATAS_A';
        (0, i18nBlogCategories_1.default)(FAKE_METADATAS_A, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_MIN_FAKE_METADATAS_B';
        (0, i18nBlogCategories_1.default)(FAKE_METADATAS_B, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_EMPTY_EXTRAS_FAKE_METADATAS_A';
        (0, i18nBlogCategories_1.default)(FAKE_METADATAS_A, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_EMPTY_EXTRAS_FAKE_METADATAS_B';
        (0, i18nBlogCategories_1.default)(FAKE_METADATAS_B, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_ONES_EXTRAS_FAKE_METADATAS_A';
        (0, i18nBlogCategories_1.default)(FAKE_METADATAS_A, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_ONES_EXTRAS_FAKE_METADATAS_B';
        (0, i18nBlogCategories_1.default)(FAKE_METADATAS_B, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_THREES_EXTRAS_FAKE_METADATAS_A';
        (0, i18nBlogCategories_1.default)(FAKE_METADATAS_A, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
    (0, vitest_1.it)('should match snapshot', () => {
        const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_THREES_EXTRAS_FAKE_METADATAS_B';
        (0, i18nBlogCategories_1.default)(FAKE_METADATAS_B, targetFile, __TARGET_FOLDER, __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE, __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE);
        const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
        (0, vitest_1.expect)(fileContent).toMatchSnapshot();
    });
});
