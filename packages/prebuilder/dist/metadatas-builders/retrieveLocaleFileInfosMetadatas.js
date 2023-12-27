"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRawDataFromBracesDeclaration_1 = __importDefault(require("../lib/getRawDataFromBracesDeclaration"));
const config_1 = require("../config");
const vocab_1 = require("../config/vocab");
const BuilderError_1 = __importDefault(require("../errors/BuilderError"));
const etc_1 = require("../lib/etc");
const { INTERRUPTED: ERROR_SUFFIX } = vocab_1.CRITICAL_ERRORS_STR;
// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs');
/**
 * @throws {BuilderError}
 */
function buildLocaleFileMetadatasFromLocaleFile(localeFilePath) {
    const error = new BuilderError_1.default(`Couldn't extract the content of the '${config_1.LOCALES_INFOS_ROOT_KEY}' i18n section!` + ' ' + ERROR_SUFFIX + '\n');
    const localeFileContent = fs.readFileSync(localeFilePath, 'utf8');
    const startIndex = localeFileContent.indexOf(config_1.LOCALES_INFOS_OBJ_NEEDLE);
    const localeInfosInner = (0, getRawDataFromBracesDeclaration_1.default)(localeFileContent, startIndex);
    if (!localeInfosInner)
        throw error;
    try {
        const obj = (0, etc_1.objInnerToObj)(localeInfosInner);
        return obj;
    }
    catch {
        throw error;
    }
}
function retrieveLocaleFileInfosMetadatas(localeFilePath) {
    const localeFileInfos = buildLocaleFileMetadatasFromLocaleFile(localeFilePath);
    return localeFileInfos;
}
exports.default = retrieveLocaleFileInfosMetadatas;
