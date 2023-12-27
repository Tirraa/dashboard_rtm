"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error
const BuilderError_1 = __importDefault(require("@rtm/prebuilder/errors/BuilderError"));
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const localesInfos_1 = __importDefault(require("../localesInfos"));
const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';
const VALID_LOCALES_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_locales/valid_fake_locales';
const VALID_I18N_LOCALES_SCHEMA_FILEPATH = './packages/prebuilder/src/validators/__tests__/fake_locales/valid_fake_locales/schema.ts';
const INVALID_LOCALES_FOLDER = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales';
const INVALID_I18N_LOCALES_SCHEMA_FILEPATH = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales/schema.ts';
const INVALID_LOCALES_FOLDER_SEVERAL_LNG_FIELD_MISMATCH = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_several_lng_field_mismatch';
const INVALID_I18N_LOCALES_SCHEMA_FILEPATH_SEVERAL_LNG_FIELD_MISMATCH = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_several_lng_field_mismatch/schema.ts';
const INVALID_LOCALES_FOLDER_MISSING_LOCALE_CODE = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_missing_locale_infos';
const INVALID_I18N_LOCALES_SCHEMA_FILEPATH_MISSING_LOCALE_CODE = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_missing_locale_infos/schema.ts';
const INVALID_LOCALES_FOLDER_EMPTY_LNG_FIELD = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_empty_lng_field';
const INVALID_I18N_LOCALES_SCHEMA_FILEPATH_EMPTY_LNG_FIELD = './packages/prebuilder/src/validators/__tests__/fake_locales/invalid_fake_locales_empty_lng_field/schema.ts';
const EMPTY_FEEDBACK = '';
(0, vitest_1.describe)('localesInfosValidator', () => {
    (0, vitest_1.it)('should not produce error feedback, given valid inputs', () => {
        const feedback = (0, localesInfos_1.default)(VALID_LOCALES_FOLDER, VALID_I18N_LOCALES_SCHEMA_FILEPATH);
        (0, vitest_1.expect)(feedback).toBe(EMPTY_FEEDBACK);
    });
    (0, vitest_1.it)('should throw ENOENT, given invalid localesFolder', () => {
        vitest_1.expect.assertions(2);
        try {
            (0, localesInfos_1.default)(INVALID_PATH, VALID_I18N_LOCALES_SCHEMA_FILEPATH);
        }
        catch (e) {
            const interceptedError = e;
            if ('code' in interceptedError) {
                (0, vitest_1.expect)(interceptedError.code).toBe('ENOENT');
            }
            else {
                throw new Error('Error code not found');
            }
        }
        try {
            (0, localesInfos_1.default)(INVALID_PATH, INVALID_PATH);
        }
        catch (e) {
            const interceptedError = e;
            if ('code' in interceptedError) {
                (0, vitest_1.expect)(interceptedError.code).toBe('ENOENT');
            }
            else {
                throw new Error('Error code not found');
            }
        }
    });
    (0, vitest_1.it)('should throw BuilderError, given invalid i18nSchemaFilePath', () => {
        (0, vitest_1.expect)(() => (0, localesInfos_1.default)(VALID_LOCALES_FOLDER, INVALID_PATH)).toThrowError(BuilderError_1.default);
    });
    (0, vitest_1.it)('should throw, given invalid locales folder (missing locale infos in it.ts)', () => {
        (0, vitest_1.expect)(() => (0, localesInfos_1.default)(INVALID_LOCALES_FOLDER_MISSING_LOCALE_CODE, INVALID_I18N_LOCALES_SCHEMA_FILEPATH_MISSING_LOCALE_CODE)).toThrowError(BuilderError_1.default);
    });
    (0, vitest_1.it)('should produce an error feedback, given invalid locales folder (invalid locale code)', () => {
        const feedback = (0, localesInfos_1.default)(INVALID_LOCALES_FOLDER, INVALID_I18N_LOCALES_SCHEMA_FILEPATH);
        (0, vitest_1.expect)(feedback).not.toBe(EMPTY_FEEDBACK);
    });
    (0, vitest_1.it)('should produce an error feedback, given invalid locales folder with several issues (invalid locale code in both invalid_it.ts and invalid_fr.ts)', () => {
        const feedback = (0, localesInfos_1.default)(INVALID_LOCALES_FOLDER_SEVERAL_LNG_FIELD_MISMATCH, INVALID_I18N_LOCALES_SCHEMA_FILEPATH_SEVERAL_LNG_FIELD_MISMATCH);
        (0, vitest_1.expect)(feedback).not.toBe(EMPTY_FEEDBACK);
    });
    (0, vitest_1.it)('should produce error feedback, given one _infos obj has an empty lng field', () => {
        const feedback = (0, localesInfos_1.default)(INVALID_LOCALES_FOLDER_EMPTY_LNG_FIELD, INVALID_I18N_LOCALES_SCHEMA_FILEPATH_EMPTY_LNG_FIELD);
        (0, vitest_1.expect)(feedback).not.toBe(EMPTY_FEEDBACK);
    });
});
