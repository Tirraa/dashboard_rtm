// eslint-disable-next-line import/no-extraneous-dependencies
import { afterAll, describe, expect, it } from 'vitest';

import generateIndexFile from '../indexFile';

const fs = require('fs/promises');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/index/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'INDEX_FILE';

describe('generateIndexFile', () => {
  afterAll(async () => {
    await fs.rm(__TARGET_FOLDER, { recursive: true });
  });

  it('should match snapshot', async () => {
    await generateIndexFile(__TARGET_FOLDER);

    const fileContent = await fs.readFile(`${__TARGET_FOLDER}/index.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
