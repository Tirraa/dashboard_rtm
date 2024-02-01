// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import generateDefaultLanguageTokenType from '../defaultLanguageTokenType';

const fs = require('fs');

const __TARGET_FOLDER_ROOT = './packages/prebuilder/src/generators/defaultLanguageToken/__tests__/FAKE_CODEGEN';
const __TARGET_FOLDER = __TARGET_FOLDER_ROOT + '/' + 'DEFAULT_LANGUAGE_TOKEN_TYPE';
const __TOKEN = 'FAKE_TOKEN';

describe('generateDefaultLanguageTokenType', () => {
  it('should match snapshot', async () => {
    const targetFile = 'FAKE_DEFAULT_LANGUAGE_TOKEN_TYPE';
    await generateDefaultLanguageTokenType(__TOKEN, targetFile, __TARGET_FOLDER);

    const fileContent = fs.readFileSync(`${__TARGET_FOLDER}/${targetFile}.ts`, 'utf8');
    expect(fileContent).toMatchSnapshot();
  });
});
