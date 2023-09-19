import path from 'path';
import { ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX } from './config/config';
import retrieveDeclaredI18nBlogCategoriesJSON from './core/retrieveDeclaredI18nJSONPart';
import retrieveMetadatas from './core/retrieveMetadatas';
import declaredBlogArchitectureValidator from './validators/architectureMatching';
import validateArgumentsThenReturnRetrievedValuesFromArgs from './validators/arguments';
import declaredI18nValidator from './validators/i18nMatching';

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
    const i18nBlogCategoriesJSON = retrieveDeclaredI18nBlogCategoriesJSON(I18N_DEFAULT_LOCALE_FILE);

    const blogArchitectureValidatorFeedback = declaredBlogArchitectureValidator(metadatasFromSys, declaredMetadatas, BLOG_CONFIG_FILE);
    if (blogArchitectureValidatorFeedback) throw new Error(blogArchitectureValidatorFeedback);

    const i18nValidatorFeedback = declaredI18nValidator(metadatasFromSys, i18nBlogCategoriesJSON, I18N_DEFAULT_LOCALE_FILE);
    if (i18nValidatorFeedback) throw new Error(i18nValidatorFeedback);

    console.log('... Static analysis done.');
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
}

processStaticAnalysis();
