// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import generateBlogType from '../blogType';

const fs = require('fs/promises');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/blog/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'BLOG_TYPE';

describe('generateBlogType (formatted)', () => {
  const pretty = true;
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_BLOG_TYPE';
    await generateBlogType({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_BLOG_TYPE';
    await generateBlogType(
      {
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
      },
      pretty,
      targetFile,
      __TARGET_FOLDER
    );

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});

describe('generateBlogType (ugly)', () => {
  const pretty = false;
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_BLOG_TYPE';
    await generateBlogType({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_BLOG_TYPE';
    await generateBlogType(
      {
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
      },
      pretty,
      targetFile,
      __TARGET_FOLDER
    );

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
