import { LOCALES_INFOS_OBJ_NEEDLE, LOCALES_INFOS_ROOT_KEY } from '@/config';
import { CRITICAL_ERRORS_STR } from '@/config/vocab';
import BuilderError from '@/errors/BuilderError';
import { objInnerToObj } from '@/lib/etc';
import getRawDataFromBracesDeclaration from '@/lib/getRawDataFromBracesDeclaration';
import type { I18nJSONPart } from '@/types/metadatas';
import { readFileSync } from 'fs';

const { INTERRUPTED: ERROR_SUFFIX } = CRITICAL_ERRORS_STR;

/**
 * @throws {BuilderError}
 */
function buildLocaleFileMetadatasFromLocaleFile(localeFilePath: string): I18nJSONPart {
  const error = new BuilderError(`Couldn't extract the content of the '${LOCALES_INFOS_ROOT_KEY}' i18n section!` + ' ' + ERROR_SUFFIX + '\n');
  const localeFileContent = readFileSync(localeFilePath, 'utf8');
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

function retrieveLocaleFileInfosMetadatas(localeFilePath: string): I18nJSONPart {
  const localeFileInfos = buildLocaleFileMetadatasFromLocaleFile(localeFilePath);
  return localeFileInfos;
}

export default retrieveLocaleFileInfosMetadatas;
