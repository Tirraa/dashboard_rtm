// eslint-disable-next-line import/no-extraneous-dependencies
import { INDEX_TOKEN } from '##/lib/builders/unifiedImport';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, it } from 'vitest';

import generateLandingPagesType from '../lpType';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/lp/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'LP_TYPE';

describe('generateLandingPagesType (formatted)', () => {
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

  const pretty = true;

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_LP_TYPE';
    await generateLandingPagesType({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_LP_TYPE';
    await generateLandingPagesType(
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

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});

describe('generateLandingPagesType (ugly)', () => {
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

  const pretty = false;

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_LP_TYPE';
    await generateLandingPagesType({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_LP_TYPE';
    await generateLandingPagesType(
      {
        'fake-category-one': {
          DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03', INDEX_TOKEN],
          it: ['fake-lp-01', 'fake-lp-02', INDEX_TOKEN],
          en: ['fake-lp-01', 'fake-lp-03'],
          fr: ['fake-lp-01']
        },
        'fake-empty-subcategories-nested-in-category': {
          DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'],
          zh: ['fake-lp-10']
        },
        'fake-category-three': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], en: ['fake-lp-03'], it: ['fake-lp-03'] },
        'fake-category-two': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], zh: ['fake-lp-10', INDEX_TOKEN] },
        'fake-subcategory-four': { DEFAULT_LANGUAGE: ['fake-lp-01', 'fake-lp-02', 'fake-lp-03'], es: ['fake-lp-04'] },
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
