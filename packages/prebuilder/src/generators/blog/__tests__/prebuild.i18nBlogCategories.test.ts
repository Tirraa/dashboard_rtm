// eslint-disable-next-line import/no-extraneous-dependencies
import { FAKE_BLOG_METADATAS_A, FAKE_BLOG_METADATAS_B } from '𝕍/commons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import generateI18nBlogCategories from '../i18nBlogCategories';

const fs = require('fs/promises');

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

describe('generateI18nBlogCategories (formatted)', () => {
  const pretty = true;
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_BLOG_CATEGORIES_MIN';

    await generateI18nBlogCategories(
      EMPTY_METADATAS,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_MIN_FAKE_BLOG_METADATAS_A';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_A,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_MIN_FAKE_BLOG_METADATAS_B';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_B,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_EMPTY_EXTRAS_FAKE_BLOG_METADATAS_A';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_A,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_EMPTY_EXTRAS_FAKE_BLOG_METADATAS_B';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_B,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_ONE_EXTRA_FAKE_BLOG_METADATAS_A';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_A,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_ONE_EXTRA_FAKE_BLOG_METADATAS_B';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_B,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_THREE_EXTRAS_FAKE_BLOG_METADATAS_A';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_A,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_THREE_EXTRAS_FAKE_BLOG_METADATAS_B';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_B,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});

describe('generateI18nBlogCategories (ugly)', () => {
  const pretty = false;
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_BLOG_CATEGORIES_MIN';

    await generateI18nBlogCategories(
      EMPTY_METADATAS,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_MIN_FAKE_BLOG_METADATAS_A';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_A,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_MIN_FAKE_BLOG_METADATAS_B';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_B,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_MIN,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_MIN
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_EMPTY_EXTRAS_FAKE_BLOG_METADATAS_A';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_A,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_EMPTY_EXTRAS_FAKE_BLOG_METADATAS_B';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_B,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_EMPTY
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_ONE_EXTRA_FAKE_BLOG_METADATAS_A';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_A,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_ONE_EXTRA_FAKE_BLOG_METADATAS_B';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_B,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_ONE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_ONE
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_THREE_EXTRAS_FAKE_BLOG_METADATAS_A';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_A,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_NOT_EMPTY_BLOG_CATEGORIES_USING_THREE_EXTRAS_FAKE_BLOG_METADATAS_B';

    await generateI18nBlogCategories(
      FAKE_BLOG_METADATAS_B,
      pretty,
      targetFile,
      __TARGET_FOLDER,
      __PREFIXED_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_THREE,
      __I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS_THREE
    );
    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
