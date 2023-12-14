import { ArgError } from 'arg';
import path from 'path';
import { FLAGS as ARGV, ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX } from './config';
import { BUGTRACKER_URL, DOC_URL, PREBUILD_DONE } from './config/vocab';
import ArgumentsValidatorError from './errors/ArgumentsValidatorError';
import BuilderError from './errors/BuilderError';
import FeedbackError from './errors/FeedbackError';
import generateBlogArchitectureType from './generators/blog/blogArchitectureType';
import generateI18nBlogCategories from './generators/blog/i18nBlogCategories';
import { foldFeedbacks } from './lib/feedbacksMerge';
import getBlogArchitectureMetadatas from './metadatas-builders/blogArchitectureMetadatas';
import type { MaybeEmptyErrorsDetectionFeedback } from './types/metadatas';
import parseArguments from './validators/arguments';
import localesInfosValidator from './validators/localesInfos';
import sysBlogSlugsValidator from './validators/sysBlogSlugs';

const HANDLED_ERRORS_TYPES = [FeedbackError, BuilderError, ArgumentsValidatorError, ArgError];

const moveToRoot = () => process.chdir(path.join(__dirname, ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX));

const printPrebuilderDoneMsg = () => console.log(PREBUILD_DONE);

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
      printPrebuilderDoneMsg();
      return;
    }

    const sysBlogSlugsValidatorFeedback = sysBlogSlugsValidator(BLOG_POSTS_FOLDER);

    const feedbacks = foldFeedbacks(sysBlogSlugsValidatorFeedback, localesValidatorFeedback);
    if (feedbacks) throw new FeedbackError(feedbacks);

    const blogArchitecture = getBlogArchitectureMetadatas(retrievedValuesFromArgs);

    generateBlogArchitectureType(blogArchitecture);
    generateI18nBlogCategories(blogArchitecture);

    printPrebuilderDoneMsg();
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
