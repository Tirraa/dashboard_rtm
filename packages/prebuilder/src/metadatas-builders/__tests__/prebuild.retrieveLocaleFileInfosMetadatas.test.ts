// @ts-expect-error
import BuilderError from '@rtm/prebuilder/errors/BuilderError';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_PATH } from '𝕍/commons';

import retrieveLocaleFileInfosMetadatas from '../retrieveLocaleFileInfosMetadatas';

const VALID_I18N_LOCALE_FILEPATH = './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/foo_valid_locale.ts';
const INVALID_I18N_LOCALE_FILEPATH_NOT_EVALUABLE =
  './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/bar_invalid_locales_not_evaluable_infos.ts';
const INVALID_I18N_LOCALE_FILEPATH_EMPTY_INFOS =
  './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/baz_invalid_locales_empty_infos.ts';

describe('retrieveLocaleFileInfosMetadatas', () => {
  it('should throw ENOENT, given invalid locale filepath', async () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    try {
      await retrieveLocaleFileInfosMetadatas(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should throw, given an invalid locale filepath (not evaluable)', async () => {
    await expect(retrieveLocaleFileInfosMetadatas(INVALID_I18N_LOCALE_FILEPATH_NOT_EVALUABLE)).rejects.toThrowError(BuilderError);
  });

  it('should throw, given an invalid locale filepath (empty infos)', async () => {
    await expect(retrieveLocaleFileInfosMetadatas(INVALID_I18N_LOCALE_FILEPATH_EMPTY_INFOS)).rejects.toThrowError(BuilderError);
  });

  it('should return a valid object, given a valid locale filepath', async () => {
    const retrievedData = await retrieveLocaleFileInfosMetadatas(VALID_I18N_LOCALE_FILEPATH);
    expect(retrievedData).toStrictEqual({ lng: 'NOT testing localesInfosValidator here! Only testing retrieveLocaleFilesInfosMetadatas!' });
  });
});
