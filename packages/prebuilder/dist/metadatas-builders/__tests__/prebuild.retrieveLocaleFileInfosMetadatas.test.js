"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error
const BuilderError_1 = __importDefault(require("@rtm/prebuilder/errors/BuilderError"));
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const retrieveLocaleFileInfosMetadatas_1 = __importDefault(require("../retrieveLocaleFileInfosMetadatas"));
const INVALID_PATH = './bless/the/draco/these/rounds/holy/sorry/bout/your/luck';
const VALID_I18N_LOCALE_FILEPATH = './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/foo_valid_locale.ts';
const INVALID_I18N_LOCALE_FILEPATH_NOT_EVALUABLE = './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/bar_invalid_locales_not_evaluable_infos.ts';
const INVALID_I18N_LOCALE_FILEPATH_EMPTY_INFOS = './packages/prebuilder/src/metadatas-builders/__tests__/fake_locales/baz_invalid_locales_empty_infos.ts';
(0, vitest_1.describe)('retrieveLocaleFileInfosMetadatas', () => {
    (0, vitest_1.it)('should throw ENOENT, given invalid locale filepath', () => {
        vitest_1.expect.assertions(1);
        try {
            (0, retrieveLocaleFileInfosMetadatas_1.default)(INVALID_PATH);
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
    (0, vitest_1.it)('should throw, given an invalid locale filepath (not evaluable)', () => {
        (0, vitest_1.expect)(() => (0, retrieveLocaleFileInfosMetadatas_1.default)(INVALID_I18N_LOCALE_FILEPATH_NOT_EVALUABLE)).toThrowError(BuilderError_1.default);
    });
    (0, vitest_1.it)('should throw, given an invalid locale filepath (empty infos)', () => {
        (0, vitest_1.expect)(() => (0, retrieveLocaleFileInfosMetadatas_1.default)(INVALID_I18N_LOCALE_FILEPATH_EMPTY_INFOS)).toThrowError(BuilderError_1.default);
    });
    (0, vitest_1.it)('should return a valid object, given a valid locale filepath', () => {
        const retrievedData = (0, retrieveLocaleFileInfosMetadatas_1.default)(VALID_I18N_LOCALE_FILEPATH);
        (0, vitest_1.expect)(retrievedData).toStrictEqual({ lng: 'NOT testing localesInfosValidator here! Only testing retrieveLocaleFilesInfosMetadatas!' });
    });
});
