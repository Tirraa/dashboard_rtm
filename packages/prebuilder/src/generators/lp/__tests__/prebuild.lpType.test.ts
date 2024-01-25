// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import generateLandingPageType from '../lpType';

const fs = require('fs');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/lp/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'LP_TYPE';

describe('generateLandingPageType (formatted)', () => {
  const pretty = true;

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_LP_TYPE';
    await generateLandingPageType({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_LP_TYPE';
    await generateLandingPageType(
      {
        'fake-category-one': {
          DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'],
          en: ['fake-lp-01', 'fake-lp-03'],
          it: ['fake-lp-01', 'fake-lp-02'],
          fr: ['fake-lp-01']
        },
        'fake-empty-subcategories-nested-in-category': {
          DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'],
          zh: ['fake-lp-10']
        },
        'fake-category-three': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], en: ['fake-lp-03'], it: ['fake-lp-03'] },
        'fake-subcategory-four': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], es: ['fake-lp-04'] },
        'fake-category-two': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], zh: ['fake-lp-10'] },
        'fake-empty-category': {}
      },
      pretty,
      targetFile,
      __TARGET_FOLDER
    );

    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});

describe('generateLandingPageType (ugly)', () => {
  const pretty = false;

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_LP_TYPE';
    await generateLandingPageType({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_LP_TYPE';
    await generateLandingPageType(
      {
        'fake-category-one': {
          DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'],
          en: ['fake-lp-01', 'fake-lp-03'],
          it: ['fake-lp-01', 'fake-lp-02'],
          fr: ['fake-lp-01']
        },
        'fake-empty-subcategories-nested-in-category': {
          DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'],
          zh: ['fake-lp-10']
        },
        'fake-category-three': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], en: ['fake-lp-03'], it: ['fake-lp-03'] },
        'fake-subcategory-four': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], es: ['fake-lp-04'] },
        'fake-category-two': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], zh: ['fake-lp-10'] },
        'fake-empty-category': {}
      },
      pretty,
      targetFile,
      __TARGET_FOLDER
    );

    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
