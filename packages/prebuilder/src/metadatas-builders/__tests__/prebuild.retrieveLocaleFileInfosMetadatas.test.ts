// @ts-expect-error
import BuilderError from '@rtm/prebuilder/errors/BuilderError';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import retrieveLocaleFileInfosMetadatas from '../retrieveLocaleFileInfosMetadatas';

const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';

const VALID_I18N_LOCALE_FILEPATH = './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/foo_valid_locale.ts';
const INVALID_I18N_LOCALE_FILEPATH_NOT_EVALUABLE =
  './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/bar_invalid_locales_not_evaluable_infos.ts';
const INVALID_I18N_LOCALE_FILEPATH_EMPTY_INFOS =
  './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/baz_invalid_locales_empty_infos.ts';

describe('retrieveLocaleFileInfosMetadatas', () => {
  it('should throw ENOENT, given invalid locale filepath', () => {
    expect.assertions(1);

    try {
      retrieveLocaleFileInfosMetadatas(INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should throw, given an invalid locale filepath (not evaluable)', () => {
    expect(() => retrieveLocaleFileInfosMetadatas(INVALID_I18N_LOCALE_FILEPATH_NOT_EVALUABLE)).toThrowError(BuilderError);
  });

  it('should throw, given an invalid locale filepath (empty infos)', () => {
    expect(() => retrieveLocaleFileInfosMetadatas(INVALID_I18N_LOCALE_FILEPATH_EMPTY_INFOS)).toThrowError(BuilderError);
  });

  it('should return a valid object, given a valid locale filepath', () => {
    const retrievedData = retrieveLocaleFileInfosMetadatas(VALID_I18N_LOCALE_FILEPATH);
    expect(retrievedData).toStrictEqual({ lng: 'NOT testing localesInfosValidator here! Only testing retrieveLocaleFilesInfosMetadatas!' });
  });
});
