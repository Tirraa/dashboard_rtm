import { readFileSync } from 'fs';
import { BLOG_CATEGORIES_I18N_ROOT_KEY, I18N_BLOG_CATEGORIES_OBJ_NEEDLE } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import BuilderError from '../errors/exceptions/BuilderError';
import { objInnerToObj } from '../lib/etc';
import getRawDataFromBracesDeclaration from '../lib/getRawDataFromBracesDeclaration';
import { I18nJSONPart } from '../types/metadatas';

const { INTERRUPTED: ERROR_SUFFIX } = CRITICAL_ERRORS_STR;

/**
 * @throws {BuilderError}
 */
function buildBlogCategoriesMetadatasFromI18nConfigFile(i18nConfigFilePath: string): I18nJSONPart {
  const error = new BuilderError(`Couldn't extract the content of the '${BLOG_CATEGORIES_I18N_ROOT_KEY}' i18n section!` + ' ' + ERROR_SUFFIX + '\n');
  const i18nConfigFileContent = readFileSync(i18nConfigFilePath, 'utf8');
  const startIndex = i18nConfigFileContent.indexOf(I18N_BLOG_CATEGORIES_OBJ_NEEDLE);

  const i18nBlogCategoriesInner = getRawDataFromBracesDeclaration(i18nConfigFileContent, startIndex);
  if (!i18nBlogCategoriesInner) throw error;
  try {
    const obj: I18nJSONPart = objInnerToObj(i18nBlogCategoriesInner);
    return obj;
  } catch {
    throw error;
  }
}

export function retrieveI18nBlogCategoriesJSONMetadatas(i18nConfigFilePath: string): I18nJSONPart {
  const i18nDeclaredMetadata = buildBlogCategoriesMetadatasFromI18nConfigFile(i18nConfigFilePath);
  return i18nDeclaredMetadata;
}

export default retrieveI18nBlogCategoriesJSONMetadatas;
