// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import generateI18nBlogCategories from '../i18nBlogCategories';

const fs = require('fs');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/blog/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'I18N_BLOG_CATEGORIES';

const __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN: string[] = ['_title', '_meta-description'];
const __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN: string[] = ['title', 'meta-description'];

const __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE: string[] = ['_fake'];
const __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE: string[] = ['fake'];

const __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE: string[] = ['_title', '_meta-description', '_fake'];
const __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE: string[] = ['title', 'meta-description', 'fake'];

const __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY: string[] = [];
const __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY: string[] = [];

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

describe('generateI18nBlogCategories', () => {
  it('should match snapshot', () => {
    const targetFile = 'FAKE_EMPTY_BLOG_CATEGORIES_MIN';

    generateI18nBlogCategories(
      EMPTY_METADATAS,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_MIN_FAKE_METADATAS_A';

    generateI18nBlogCategories(
      FAKE_METADATAS_A,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_MIN_FAKE_METADATAS_B';

    generateI18nBlogCategories(
      FAKE_METADATAS_B,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_EMPTY_EXTRAS_FAKE_METADATAS_A';

    generateI18nBlogCategories(
      FAKE_METADATAS_A,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_EMPTY_EXTRAS_FAKE_METADATAS_B';

    generateI18nBlogCategories(
      FAKE_METADATAS_B,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_ONES_EXTRAS_FAKE_METADATAS_A';

    generateI18nBlogCategories(
      FAKE_METADATAS_A,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_ONES_EXTRAS_FAKE_METADATAS_B';

    generateI18nBlogCategories(
      FAKE_METADATAS_B,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_THREES_EXTRAS_FAKE_METADATAS_A';

    generateI18nBlogCategories(
      FAKE_METADATAS_A,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_THREES_EXTRAS_FAKE_METADATAS_B';

    generateI18nBlogCategories(
      FAKE_METADATAS_B,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE
    );
    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
