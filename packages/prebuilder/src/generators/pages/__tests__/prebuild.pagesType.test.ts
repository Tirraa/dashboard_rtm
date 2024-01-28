// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import generatePagesType from '../pagesType';

const fs = require('fs/promises');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/pages/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'PAGES_TYPE';

describe('generatePagesType (formatted)', () => {
  const pretty = true;
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_PAGES_TYPE';
    await generatePagesType({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_PAGES_TYPE';
    await generatePagesType(
      {
        'nesting-1/nesting-2': [
          {
            pathWithoutHead: 'nesting-2/page-00',
            path: 'nesting-1/nesting-2/page-00',
            url: '/nesting-1/nesting-2/page-00',
            nestingLevelTwo: 'nesting-2',
            head: 'nesting-1',
            tail: 'page-00'
          },
          {
            pathWithoutHead: 'nesting-2/page-01',
            path: 'nesting-1/nesting-2/page-01',
            url: '/nesting-1/nesting-2/page-01',
            nestingLevelTwo: 'nesting-2',
            head: 'nesting-1',
            tail: 'page-01'
          }
        ],
        'nesting-1': [
          {
            pathWithoutHead: 'page-00',
            path: 'nesting-1/page-00',
            url: '/nesting-1/page-00',
            nestingLevelTwo: '',
            head: 'nesting-1',
            tail: 'page-00'
          },
          {
            pathWithoutHead: 'page-01',
            path: 'nesting-1/page-01',
            url: '/nesting-1/page-01',
            nestingLevelTwo: '',
            head: 'nesting-1',
            tail: 'page-01'
          }
        ],
        '/': [
          {
            pathWithoutHead: 'page-00',
            nestingLevelTwo: '',
            path: 'page-00',
            url: '/page-00',
            tail: 'page-00',
            head: '/'
          },
          {
            pathWithoutHead: 'page-01',
            nestingLevelTwo: '',
            path: 'page-01',
            url: '/page-01',
            tail: 'page-01',
            head: '/'
          }
        ],
        'en/nesting-1/nesting-2': [
          {
            pathWithoutHead: 'nesting-1/nesting-2/page-00',
            path: 'en/nesting-1/nesting-2/page-00',
            url: '/en/nesting-1/nesting-2/page-00',
            nestingLevelTwo: 'nesting-1',
            tail: 'page-00',
            head: 'en'
          }
        ],
        'en/nesting-1': [
          {
            pathWithoutHead: 'nesting-1/page-00',
            path: 'en/nesting-1/page-00',
            url: '/en/nesting-1/page-00',
            nestingLevelTwo: 'nesting-1',
            tail: 'page-00',
            head: 'en'
          }
        ],
        en: [
          {
            pathWithoutHead: 'page-00',
            nestingLevelTwo: '',
            path: 'en/page-00',
            url: '/en/page-00',
            tail: 'page-00',
            head: 'en'
          }
        ]
      },
      pretty,
      targetFile,
      __TARGET_FOLDER
    );

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});

describe('generatePagesType (ugly)', () => {
  const pretty = false;
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_EMPTY_PAGES_TYPE';
    await generatePagesType({}, pretty, targetFile, __TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });

  it('should match snapshot', async () => {
    const targetFile = 'FAKE_PAGES_TYPE';
    await generatePagesType(
      {
        'nesting-1/nesting-2': [
          {
            pathWithoutHead: 'nesting-2/page-00',
            path: 'nesting-1/nesting-2/page-00',
            url: '/nesting-1/nesting-2/page-00',
            nestingLevelTwo: 'nesting-2',
            head: 'nesting-1',
            tail: 'page-00'
          },
          {
            pathWithoutHead: 'nesting-2/page-01',
            path: 'nesting-1/nesting-2/page-01',
            url: '/nesting-1/nesting-2/page-01',
            nestingLevelTwo: 'nesting-2',
            head: 'nesting-1',
            tail: 'page-01'
          }
        ],
        'nesting-1': [
          {
            pathWithoutHead: 'page-00',
            path: 'nesting-1/page-00',
            url: '/nesting-1/page-00',
            nestingLevelTwo: '',
            head: 'nesting-1',
            tail: 'page-00'
          },
          {
            pathWithoutHead: 'page-01',
            path: 'nesting-1/page-01',
            url: '/nesting-1/page-01',
            nestingLevelTwo: '',
            head: 'nesting-1',
            tail: 'page-01'
          }
        ],
        '/': [
          {
            pathWithoutHead: 'page-00',
            nestingLevelTwo: '',
            path: 'page-00',
            url: '/page-00',
            tail: 'page-00',
            head: '/'
          },
          {
            pathWithoutHead: 'page-01',
            nestingLevelTwo: '',
            path: 'page-01',
            url: '/page-01',
            tail: 'page-01',
            head: '/'
          }
        ],
        'en/nesting-1/nesting-2': [
          {
            pathWithoutHead: 'nesting-1/nesting-2/page-00',
            path: 'en/nesting-1/nesting-2/page-00',
            url: '/en/nesting-1/nesting-2/page-00',
            nestingLevelTwo: 'nesting-1',
            tail: 'page-00',
            head: 'en'
          }
        ],
        'en/nesting-1': [
          {
            pathWithoutHead: 'nesting-1/page-00',
            path: 'en/nesting-1/page-00',
            url: '/en/nesting-1/page-00',
            nestingLevelTwo: 'nesting-1',
            tail: 'page-00',
            head: 'en'
          }
        ],
        en: [
          {
            pathWithoutHead: 'page-00',
            nestingLevelTwo: '',
            path: 'en/page-00',
            url: '/en/page-00',
            tail: 'page-00',
            head: 'en'
          }
        ]
      },
      pretty,
      targetFile,
      __TARGET_FOLDER
    );

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
