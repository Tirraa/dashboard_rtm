// eslint-disable-next-line import/no-extraneous-dependencies
import { INDEX_TOKEN } from '##/lib/builders/unifiedImport';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, it } from 'vitest';

import generateBlogDocumentsTypes from '../blogDocumentsTypes';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/blog/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'BLOG_DOCUMENTS_TYPES';

describe('generateBlogDocumentsTypes (formatted)', () => {
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

  const pretty = true;
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_BLOG_DOCUMENTS_TYPES';
    await generateBlogDocumentsTypes({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_BLOG_DOCUMENTS_TYPES';
    await generateBlogDocumentsTypes(
      {
        'fake-category-one': {
          'fake-subcategory-one': {
            DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03'],
            en: ['fake-post-01', 'fake-post-03'],
            it: ['fake-post-01', 'fake-post-02'],
            fr: ['fake-post-01']
          },
          'fake-subcategory-three': {
            DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03', INDEX_TOKEN],
            es: ['fake-post-01', INDEX_TOKEN],
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
      },
      pretty,
      targetFile,
      __TARGET_FOLDER
    );

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});

describe('generateBlogDocumentsTypes (ugly)', () => {
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

  const pretty = false;
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_BLOG_DOCUMENTS_TYPES';
    await generateBlogDocumentsTypes({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_BLOG_DOCUMENTS_TYPES';
    await generateBlogDocumentsTypes(
      {
        'fake-category-one': {
          'fake-subcategory-one': {
            DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03', INDEX_TOKEN],
            en: ['fake-post-01', 'fake-post-03', INDEX_TOKEN],
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
          'fake-subcategory-five': {
            DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03', INDEX_TOKEN],
            en: ['fake-post-03'],
            it: ['fake-post-03']
          },
          'fake-subcategory-four': {
            DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03', INDEX_TOKEN],
            es: ['fake-post-04', INDEX_TOKEN]
          }
        },
        'fake-empty-subcategories-nested-in-category': {
          'fake-subcategory-seven': {
            DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03', INDEX_TOKEN],
            zh: ['fake-post-10', INDEX_TOKEN]
          },
          'fake-empty-subcategory': {}
        },
        'fake-category-two': {
          'fake-subcategory-six': { DEFAULT_LANGUAGE: ['fake-post-01', 'fake-post-02', 'fake-post-03', INDEX_TOKEN], zh: ['fake-post-10'] }
        },
        'fake-empty-category': {}
      },
      pretty,
      targetFile,
      __TARGET_FOLDER
    );

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
