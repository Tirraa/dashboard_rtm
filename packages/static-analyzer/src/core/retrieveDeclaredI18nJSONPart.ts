import * as fs from 'fs';
import { I18N_BLOG_CATEGORIES_OBJ_NEEDLE } from '../config/config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import getRawDataFromBracesDeclaration from '../lib/getRawDataFromBracesDeclaration';
import { I18nJSONPart } from '../types/metadatas';

const { METADATAS_BUILDERS: ERROR_SUFFIX } = CRITICAL_ERRORS_STR;

/**
 * @throws {Error}
 */
function buildBlogCategoriesMetadatasFromI18nConfigFile(i18nConfigFilePath: string): I18nJSONPart {
  const asObj = (i18nData: string) => eval('({' + i18nData + '})');

  const error = new Error("Couldn't extract the content of the 'blog-categories' i18n section!" + ' ' + ERROR_SUFFIX + '\n');
  const i18nConfigFileContent = fs.readFileSync(i18nConfigFilePath, 'utf8');
  const startIndex = i18nConfigFileContent.indexOf(I18N_BLOG_CATEGORIES_OBJ_NEEDLE);

  const i18nBlogCategoriesData = getRawDataFromBracesDeclaration(i18nConfigFileContent, startIndex);
  if (!i18nBlogCategoriesData) throw error;
  try {
    const obj: I18nJSONPart = asObj(i18nBlogCategoriesData);
    return obj;
  } catch {
    throw error;
  }
}

export function retrieveDeclaredI18nBlogCategoriesJSON(i18nConfigFilePath: string): I18nJSONPart {
  const i18nDeclaredMetadata = buildBlogCategoriesMetadatasFromI18nConfigFile(i18nConfigFilePath);
  return i18nDeclaredMetadata;
}

export default retrieveDeclaredI18nBlogCategoriesJSON;
