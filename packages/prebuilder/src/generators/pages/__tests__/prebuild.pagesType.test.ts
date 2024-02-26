// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, it } from 'vitest';

import type { Page } from '../../../types/Metadatas';

import generatePagesType, { HARDCODED_FALLBACK_TYPE_FIELDS } from '../pagesType';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/pages/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'PAGES_TYPE';

describe('Hard-coded values safety check', () => {
  it('should not be stale', () => {
    function isStale(fields: (keyof Page)[]) {
      for (const field of fields) {
        if (!HARDCODED_FALLBACK_TYPE_FIELDS.has(field)) {
          const expectedFields = fields.sort().join(', ');
          const gotFields = Array.from(HARDCODED_FALLBACK_TYPE_FIELDS).sort().join(', ');
          console.warn('stale:', { expectedFields, gotFields });
          return true;
        }
      }
      return false;
    }

    // NOTE: Typechecked via tsc --noEmit --skipLibCheck
    // Check the package.json script: `before-build:tricky-typechecks`
    const fakePage: Page = {
      nestingLevelTwo: 'FAKE',
      pathWithoutHead: 'FAKE',
      path: 'FAKE',
      head: 'FAKE',
      tail: 'FAKE',
      url: 'FAKE'
    };
    const fields = Object.keys(fakePage) as (keyof Page)[];

    expect(isStale(fields)).toBe(false);
  });
});

describe('generatePagesType (formatted)', () => {
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

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
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

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
