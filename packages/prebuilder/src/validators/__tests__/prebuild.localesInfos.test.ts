import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';

// @ts-expect-error
import BuilderError from '@rtm/prebuilder/errors/BuilderError';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { INVALID_PATH } from '𝕍/commons';

import localesInfosValidator from '../localesInfos';

const VALID_LOCALES_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_locales/valid_fake_locales';
const VALID_I18N_LOCALES_SCHEMA_FILEPATH = './packages/prebuilder/src/validators/__tests__/fake_locales/valid_fake_locales/schema.ts';

const INVALID_LOCALES_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales';
const INVALID_I18N_LOCALES_SCHEMA_FILEPATH = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales/schema.ts';

const INVALID_LOCALES_FOLDER_SEVERAL_LNG_FIELD_MISMATCH =
  './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_several_lng_field_mismatch';
const INVALID_I18N_LOCALES_SCHEMA_FILEPATH_SEVERAL_LNG_FIELD_MISMATCH =
  './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_several_lng_field_mismatch/schema.ts';

const INVALID_LOCALES_FOLDER_MISSING_LOCALE_CODE =
  './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_missing_locale_infos';
const INVALID_I18N_LOCALES_SCHEMA_FILEPATH_MISSING_LOCALE_CODE =
  './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_missing_locale_infos/schema.ts';

const INVALID_LOCALES_FOLDER_EMPTY_LNG_FIELD = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_empty_lng_field';
const INVALID_I18N_LOCALES_SCHEMA_FILEPATH_EMPTY_LNG_FIELD =
  './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_empty_lng_field/schema.ts';

const EMPTY_FEEDBACK: EmptyString = '';

describe('localesInfosValidator', () => {
  it('should not produce error feedback, given valid inputs', async () => {
    const feedback = await localesInfosValidator(VALID_LOCALES_FOLDER, VALID_I18N_LOCALES_SCHEMA_FILEPATH);
    expect(feedback).toBe(EMPTY_FEEDBACK);
  });

  it('should throw ENOENT, given invalid localesFolder', async () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(2);

    try {
      await localesInfosValidator(INVALID_PATH, VALID_I18N_LOCALES_SCHEMA_FILEPATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }

    try {
      await localesInfosValidator(INVALID_PATH, INVALID_PATH);
    } catch (e) {
      const interceptedError = e as Error;
      if ('code' in interceptedError) {
        expect(interceptedError.code).toBe('ENOENT');
      } else {
        throw new Error('Error code not found');
      }
    }
  });

  it('should throw BuilderError, given invalid i18nSchemaFilePath', async () => {
    await expect(localesInfosValidator(VALID_LOCALES_FOLDER, INVALID_PATH)).rejects.toThrowError(BuilderError);
  });

  it('should throw, given invalid locales folder (missing locale infos in it.ts)', async () => {
    await expect(
      localesInfosValidator(INVALID_LOCALES_FOLDER_MISSING_LOCALE_CODE, INVALID_I18N_LOCALES_SCHEMA_FILEPATH_MISSING_LOCALE_CODE)
    ).rejects.toThrowError(BuilderError);
  });

  it('should produce an error feedback, given invalid locales folder (invalid locale code)', async () => {
    const feedback = await localesInfosValidator(INVALID_LOCALES_FOLDER, INVALID_I18N_LOCALES_SCHEMA_FILEPATH);
    expect(feedback).not.toBe(EMPTY_FEEDBACK);
  });

  it('should produce an error feedback, given invalid locales folder with several issues (invalid locale code in both invalid_it.ts and invalid_fr.ts)', async () => {
    const feedback = await localesInfosValidator(
      INVALID_LOCALES_FOLDER_SEVERAL_LNG_FIELD_MISMATCH,
      INVALID_I18N_LOCALES_SCHEMA_FILEPATH_SEVERAL_LNG_FIELD_MISMATCH
    );
    expect(feedback).not.toBe(EMPTY_FEEDBACK);
  });

  it('should produce error feedback, given one _infos obj has an empty lng field', async () => {
    const feedback = await localesInfosValidator(INVALID_LOCALES_FOLDER_EMPTY_LNG_FIELD, INVALID_I18N_LOCALES_SCHEMA_FILEPATH_EMPTY_LNG_FIELD);
    expect(feedback).not.toBe(EMPTY_FEEDBACK);
  });
});
