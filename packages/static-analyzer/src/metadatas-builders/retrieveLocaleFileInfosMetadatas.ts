import * as fs from 'fs';
import { LOCALES_INFOS_ROOT_KEY } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import { objInnerToObj } from '../lib/etc';
import getRawDataFromBracesDeclaration from '../lib/getRawDataFromBracesDeclaration';
import { I18nJSONPart } from '../types/metadatas';

const { INTERRUPTED: ERROR_SUFFIX } = CRITICAL_ERRORS_STR;

/**
 * @throws {Error}
 */
function buildLocaleFileMetadatasFromLocaleFile(localeFilePath: string): I18nJSONPart {
  const error = new Error(`Couldn't extract the content of the '${LOCALES_INFOS_ROOT_KEY}' i18n section!` + ' ' + ERROR_SUFFIX + '\n');
  const localeFileContent = fs.readFileSync(localeFilePath, 'utf8');
  const startIndex = localeFileContent.indexOf(LOCALES_INFOS_ROOT_KEY);

  const localeInfosInner = getRawDataFromBracesDeclaration(localeFileContent, startIndex);
  if (!localeInfosInner) throw error;
  try {
    const obj: I18nJSONPart = objInnerToObj(localeInfosInner);
    return obj;
  } catch {
    throw error;
  }
}

export function retrieveLocaleFileInfosMetadatas(localeFilePath: string): I18nJSONPart {
  const localeFileInfos = buildLocaleFileMetadatasFromLocaleFile(localeFilePath);
  return localeFileInfos;
}

export default retrieveLocaleFileInfosMetadatas;
