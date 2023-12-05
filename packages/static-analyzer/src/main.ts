import { ArgError } from 'arg';
import path from 'path';
import { FLAGS as ARGV, ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX } from './config';
import { BUGTRACKER_URL, DOC_URL, STATIC_ANALYSIS_DONE } from './config/vocab';
import ArgumentsValidatorError from './errors/exceptions/ArgumentsValidatorError';
import BuilderError from './errors/exceptions/BuilderError';
import FeedbackError from './errors/exceptions/FeedbackError';
import { foldFeedbacks } from './lib/feedbacksMerge';
import retrieveI18nBlogCategoriesJSONMetadatas from './metadatas-builders/retrieveI18nBlogCategoriesJSONMetadatas';
import retrieveMetadatas from './metadatas-builders/retrieveMetadatas';
import type { MaybeEmptyErrorsDetectionFeedback } from './types/metadatas';
import declaredBlogArchitectureValidator from './validators/architectureMatching';
import parseArguments from './validators/arguments';
import declaredI18nValidator from './validators/i18nMatching';
import localesInfosValidator from './validators/localesInfos';
import sysBlogSlugsValidator from './validators/sysBlogSlugs';

const HANDLED_ERRORS_TYPES = [FeedbackError, BuilderError, ArgumentsValidatorError, ArgError];

const moveToRoot = () => process.chdir(path.join(__dirname, ROOT_FOLDER_RELATIVE_PATH_FROM_STATIC_ANALYZER_CTX));

const printStaticAnalysisPassedMsg = () => console.log(STATIC_ANALYSIS_DONE);

/**
 * @throws {FeedbackError}
 */
function processStaticAnalysis() {
  moveToRoot();
  try {
    const retrievedValuesFromArgs = parseArguments();
    const {
      [ARGV.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER,
      [ARGV.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
      [ARGV.BLOG_CONFIG_FILEPATH]: BLOG_CONFIG_FILEPATH,
      [ARGV.SKIP_LOCALES_INFOS]: SKIP_LOCALES_INFOS,
      [ARGV.NO_I18N]: NO_I18N,
      [ARGV.NO_BLOG]: NO_BLOG
    } = retrievedValuesFromArgs as Required<typeof retrievedValuesFromArgs>;

    let localesValidatorFeedback: MaybeEmptyErrorsDetectionFeedback = '';
    if (!SKIP_LOCALES_INFOS && !NO_I18N) {
      const localesFolder = path.dirname(I18N_LOCALES_SCHEMA_FILEPATH);
      localesValidatorFeedback = localesInfosValidator(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH);
    }

    if (NO_BLOG) {
      if (localesValidatorFeedback) throw new FeedbackError(localesValidatorFeedback);
      printStaticAnalysisPassedMsg();
      return;
    }

    const [metadatasFromSys, declaredMetadatas] = retrieveMetadatas(retrievedValuesFromArgs);
    const i18nBlogCategoriesJSON = retrieveI18nBlogCategoriesJSONMetadatas(I18N_LOCALES_SCHEMA_FILEPATH);

    const blogArchitectureValidatorFeedback = declaredBlogArchitectureValidator(metadatasFromSys, declaredMetadatas, BLOG_CONFIG_FILEPATH);

    const sysBlogSlugsValidatorFeedback = sysBlogSlugsValidator(BLOG_POSTS_FOLDER);

    const i18nValidatorFeedback = NO_I18N ? '' : declaredI18nValidator(metadatasFromSys, i18nBlogCategoriesJSON, I18N_LOCALES_SCHEMA_FILEPATH);

    const feedbacks = foldFeedbacks(
      blogArchitectureValidatorFeedback,
      sysBlogSlugsValidatorFeedback,
      localesValidatorFeedback,
      i18nValidatorFeedback
    );
    if (feedbacks) throw new FeedbackError(feedbacks);

    printStaticAnalysisPassedMsg();
  } catch (error) {
    const isErrorHandled = HANDLED_ERRORS_TYPES.some((errorType) => error instanceof errorType);

    if (isErrorHandled) {
      if (error instanceof ArgError) {
        console.error(error + '\n');
      } else {
        const msg = (error as Error).message + (!(error instanceof FeedbackError) ? '\n' : '');
        console.error(msg);
      }
    } else {
      console.error('Unhandled error!' + '\n' + error + '\n\n' + `RTFM: ${DOC_URL}` + '\n' + `Bugtracker: ${BUGTRACKER_URL}` + '\n');
    }

    process.exit(1);
  }
}

processStaticAnalysis();
