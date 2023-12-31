import type { I18nJSONPart } from '../types/Metadatas';

import getRawDataFromBracesDeclaration from '../lib/getRawDataFromBracesDeclaration';
import { LOCALES_INFOS_OBJ_NEEDLE, LOCALES_INFOS_ROOT_KEY } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import BuilderError from '../errors/BuilderError';
import { objInnerToObj } from '../lib/etc';

const { INTERRUPTED: ERROR_SUFFIX } = CRITICAL_ERRORS_STR;

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

/**
 * @throws {BuilderError}
 */
async function buildLocaleFileMetadatasFromLocaleFile(localeFilePath: string): Promise<I18nJSONPart> {
  const error = new BuilderError(`Couldn't extract the content of the '${LOCALES_INFOS_ROOT_KEY}' i18n section!` + ' ' + ERROR_SUFFIX + '\n');
  const localeFileContent = await fs.readFile(localeFilePath, 'utf8');
  const startIndex = localeFileContent.indexOf(LOCALES_INFOS_OBJ_NEEDLE);

  const localeInfosInner = getRawDataFromBracesDeclaration(localeFileContent, startIndex);
  if (!localeInfosInner) throw error;
  try {
    const obj: I18nJSONPart = objInnerToObj(localeInfosInner);
    return obj;
  } catch {
    throw error;
  }
}

export default async function retrieveLocaleFileInfosMetadatas(localeFilePath: string): Promise<I18nJSONPart> {
  const localeFileInfos = await buildLocaleFileMetadatasFromLocaleFile(localeFilePath);
  return localeFileInfos;
}
