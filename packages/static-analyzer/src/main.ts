import path from 'path';
import { ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX } from './config';
import { STATIC_ANALYSIS_DONE } from './config/vocab';
import retrieveI18nBlogCategoriesJSONMetadatas from './metadatas-builders/retrieveI18nBlogCategoriesJSONMetadatas';
import retrieveMetadatas from './metadatas-builders/retrieveMetadatas';
import declaredBlogArchitectureValidator from './validators/architectureMatching';
import validateArgumentsThenReturnRetrievedValuesFromArgs from './validators/arguments';
import declaredI18nValidator from './validators/i18nMatching';
import localesInfosValidator from './validators/localesInfos';

const moveToCallerDirectory = () => process.chdir(path.join(__dirname, ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX));

/**
 * @throws {Error}
 */
function processStaticAnalysis() {
  moveToCallerDirectory();
  try {
    const retrievedValuesFromArgs = validateArgumentsThenReturnRetrievedValuesFromArgs();
    const { I18N_DEFAULT_LOCALE_FILE, BLOG_CONFIG_FILE } = retrievedValuesFromArgs;
    const [metadatasFromSys, declaredMetadatas] = retrieveMetadatas(retrievedValuesFromArgs);
    const i18nBlogCategoriesJSON = retrieveI18nBlogCategoriesJSONMetadatas(I18N_DEFAULT_LOCALE_FILE);

    const blogArchitectureValidatorFeedback = declaredBlogArchitectureValidator(metadatasFromSys, declaredMetadatas, BLOG_CONFIG_FILE);
    if (blogArchitectureValidatorFeedback) throw new Error(blogArchitectureValidatorFeedback);

    if (!retrievedValuesFromArgs.SKIP_LOCALES_INFOS) {
      const localesFolder = path.dirname(I18N_DEFAULT_LOCALE_FILE);
      const localesValidatorFeedback = localesInfosValidator(localesFolder);
      if (localesValidatorFeedback) throw new Error(localesValidatorFeedback);
    }

    const i18nValidatorFeedback = declaredI18nValidator(metadatasFromSys, i18nBlogCategoriesJSON, I18N_DEFAULT_LOCALE_FILE);
    if (i18nValidatorFeedback) throw new Error(i18nValidatorFeedback);

    console.log(STATIC_ANALYSIS_DONE);
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
}

processStaticAnalysis();
