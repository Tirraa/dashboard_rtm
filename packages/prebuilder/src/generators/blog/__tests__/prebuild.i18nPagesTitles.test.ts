// eslint-disable-next-line import/no-extraneous-dependencies
import { FAKE_BLOG_METADATAS_A, FAKE_BLOG_METADATAS_B } from '𝕍/commons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, it } from 'vitest';

import generateI18nPagesTitles from '../i18nPagesTitles';

const fs = require('fs/promises');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/blog/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'I18N_PAGES_TITLES';

describe('generateI18nPagesTitles (formatted)', () => {
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

  const pretty = true;

  it('should match snapshot', async () => {
    const targetFile = 'EMPTY_FAKE_PAGES_TITLES';

    await generateI18nPagesTitles({}, pretty, targetFile, __TARGET_FOLDER);
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_PAGES_TITLES_FAKE_METADATAS_A';

    await generateI18nPagesTitles(FAKE_BLOG_METADATAS_A, pretty, targetFile, __TARGET_FOLDER);
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_PAGES_TITLES_FAKE_METADATAS_B';

    await generateI18nPagesTitles(FAKE_BLOG_METADATAS_B, pretty, targetFile, __TARGET_FOLDER);
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});

describe('generateI18nPagesTitles (ugly)', () => {
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

  const pretty = false;

  it('should match snapshot', async () => {
    const targetFile = 'EMPTY_FAKE_PAGES_TITLES';

    await generateI18nPagesTitles({}, pretty, targetFile, __TARGET_FOLDER);
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_PAGES_TITLES_FAKE_METADATAS_A';

    await generateI18nPagesTitles(FAKE_BLOG_METADATAS_A, pretty, targetFile, __TARGET_FOLDER);
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_PAGES_TITLES_FAKE_METADATAS_B';

    await generateI18nPagesTitles(FAKE_BLOG_METADATAS_B, pretty, targetFile, __TARGET_FOLDER);
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
