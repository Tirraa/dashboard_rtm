"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retrieveLocaleFileInfosMetadatas_1 = __importDefault(require("../metadatas-builders/retrieveLocaleFileInfosMetadatas"));
const config_1 = require("../config");
const feedbacksMerge_1 = require("../lib/feedbacksMerge");
const vocab_1 = require("../config/vocab");
// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs');
const path = require('path');
const localesExtension = '.ts';
const { FAILED_TO_PASS: ERROR_PREFIX } = vocab_1.CRITICAL_ERRORS_STR;
function localeFileInfosValidator(localeFilePath) {
    let feedback = '';
    const localeMetadatas = (0, retrieveLocaleFileInfosMetadatas_1.default)(localeFilePath);
    const expectedLocaleCode = path.basename(localeFilePath, localesExtension);
    const localeCode = localeMetadatas[config_1.LOCALES_LNG_INFOS_KEY];
    if (!localeCode) {
        feedback += `The '${config_1.LOCALES_LNG_INFOS_KEY}' field value is empty or missing in '${config_1.LOCALES_INFOS_ROOT_KEY}'! (${localeFilePath})`;
    }
    else if (expectedLocaleCode !== localeCode) {
        feedback +=
            `The '${config_1.LOCALES_INFOS_ROOT_KEY}.${config_1.LOCALES_LNG_INFOS_KEY}' field value should match the locale filename! (${localeFilePath})` +
                '\n' +
                `Expected value: '${expectedLocaleCode}', given value: '${localeCode}'`;
    }
    return feedback;
}
/**
 * @throws {BuilderError}
 */
function localesInfosValidator(localesFolder, i18nSchemaFilePath) {
    const ERROR_PREFIX_TAIL = `(locales files infos)`;
    let feedback = '';
    const files = fs
        .readdirSync(localesFolder)
        .filter((file) => path.extname(file) === '.ts' && path.basename(file) !== path.basename(i18nSchemaFilePath));
    const fullFilesPaths = files.map((filename) => [localesFolder, filename].join('/'));
    const localeFileInfosValidatorFeedbacks = [];
    for (const currentFile of fullFilesPaths) {
        try {
            const currentFeedback = localeFileInfosValidator(currentFile);
            if (currentFeedback)
                localeFileInfosValidatorFeedbacks.push(currentFeedback);
        }
        catch (error) {
            throw error;
        }
    }
    if (localeFileInfosValidatorFeedbacks.length > 0) {
        if (localeFileInfosValidatorFeedbacks.length > 1) {
            feedback +=
                `${config_1.LIST_ELEMENT_PREFIX}${localeFileInfosValidatorFeedbacks
                    .map((localeFileInfosValidatorFeedback) => localeFileInfosValidatorFeedback.replaceAll('\n', '\n' + ' '.repeat(config_1.LIST_ELEMENT_PREFIX.length - config_1.LIST_ELEMENT_PREFIX.split('\n').length + 1)))
                    .join(config_1.LIST_ELEMENT_PREFIX)}` + '\n';
        }
        else {
            feedback += '\n' + localeFileInfosValidatorFeedbacks[0] + '\n';
        }
    }
    feedback = (0, feedbacksMerge_1.prefixFeedback)(feedback, ERROR_PREFIX + ' ' + ERROR_PREFIX_TAIL);
    return feedback;
}
exports.default = localesInfosValidator;
