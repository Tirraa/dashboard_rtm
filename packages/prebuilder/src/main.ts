/* v8 ignore start */
// Stryker disable all
import type { MaybeUndefined, Tuple } from '@rtm/shared-types/CustomUtilityTypes';

import { ArgError } from 'arg';
import path from 'path';

import type { MaybeEmptyErrorsDetectionFeedback } from './types/Metadatas';

import getBlogArchitectureMetadatas from './metadatas-builders/blogArchitectureMetadatas';
import generateBlogArchitectureType from './generators/blog/blogArchitectureType';
import { ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX, FLAGS } from './config';
import generateI18nBlogCategories from './generators/blog/i18nBlogCategories';
import sysBlogSubcategoriesValidator from './validators/sysBlogSubcategories';
import { BUGTRACKER_URL, PREBUILD_DONE, DOC_URL } from './config/vocab';
import sysBlogCategoriesValidator from './validators/sysBlogCategories';
import ArgumentsValidatorError from './errors/ArgumentsValidatorError';
import localesInfosValidator from './validators/localesInfos';
import sysBlogSlugsValidator from './validators/sysBlogSlugs';
import generateBlogType from './generators/blog/blogType';
import { foldFeedbacks } from './lib/feedbacksMerge';
import parseArguments from './validators/arguments';
import FeedbackError from './errors/FeedbackError';
import BuilderError from './errors/BuilderError';

const BENCHMARK_ACCURACY = 5;

const HANDLED_ERRORS_TYPES = [FeedbackError, BuilderError, ArgumentsValidatorError, ArgError];

const moveToRoot = () => process.chdir(path.join(__dirname, ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX));

function printPrebuilderDoneMsg(sideEffectAtExit?: () => void) {
  console.log(PREBUILD_DONE);
  if (typeof sideEffectAtExit === 'function') sideEffectAtExit();
}

function printPrebuildReport({
  taxonomyCheckersStartTime,
  localesCheckersStartTime,
  taxonomyCheckersEndTime,
  localesCheckersEndTime,
  codegenStartTime,
  globalStartTime,
  codegenEndTime
}: Partial<{
  taxonomyCheckersStartTime: number;
  localesCheckersStartTime: number;
  taxonomyCheckersEndTime: number;
  localesCheckersEndTime: number;
  codegenStartTime: number;
  globalStartTime: number;
  codegenEndTime: number;
}>) {
  const TIME_UNIT = 's';
  const IGNORED = -1 as const;

  const computeDelay = (maybeStart: MaybeUndefined<number>, maybeEnd: MaybeUndefined<number>) =>
    maybeStart === undefined || maybeEnd === undefined ? IGNORED : (Math.abs(maybeEnd - maybeStart) / 1e3).toFixed(BENCHMARK_ACCURACY);

  const globalEndTime = performance.now();
  const [localesElapsedTime, taxonomyElapsedTime, codegenElapsedTime, totalGlobalElapsedTime] = [
    computeDelay(localesCheckersStartTime, localesCheckersEndTime),
    computeDelay(taxonomyCheckersStartTime, taxonomyCheckersEndTime),
    computeDelay(codegenStartTime, codegenEndTime),
    computeDelay(globalStartTime, globalEndTime)
  ];

  (
    [
      ['Validated locales infos in:', localesElapsedTime],
      ['Validated taxonomy in:', taxonomyElapsedTime],
      ['Generated code in:', codegenElapsedTime],
      ['Total execution time:', totalGlobalElapsedTime]
    ] satisfies Tuple<string, typeof IGNORED | string>[]
  ).forEach(([label, value]) => {
    if (value === IGNORED) return;
    console.log(label + ' ' + '~' + value + TIME_UNIT);
  });
}

/**
 * @throws {FeedbackError}
 */
async function processPrebuild() {
  const globalStartTime = performance.now();

  moveToRoot();

  try {
    const retrievedValuesFromArgs = await parseArguments();
    const {
      [FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
      [FLAGS.SKIP_LOCALES_INFOS]: SKIP_LOCALES_INFOS,
      [FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER,
      [FLAGS.SKIP_BENCHMARKS]: SKIP_BENCHMARKS,
      [FLAGS.NO_I18N]: NO_I18N,
      [FLAGS.NO_BLOG]: NO_BLOG
    } = retrievedValuesFromArgs as Required<typeof retrievedValuesFromArgs>;
    const NO_CONTENTLAYER_RELATED_FEATURES = NO_BLOG;

    let [localesCheckersStartTime, taxonomyCheckersStartTime, taxonomyCheckersEndTime, codegenStartTime, codegenEndTime]: MaybeUndefined<number>[] =
      [];
    let localesValidatorFeedback: MaybeEmptyErrorsDetectionFeedback = '';

    if (!SKIP_LOCALES_INFOS && !NO_I18N) {
      localesCheckersStartTime = performance.now();
      const localesFolder = path.dirname(I18N_LOCALES_SCHEMA_FILEPATH);
      localesValidatorFeedback = await localesInfosValidator(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH);
    }
    const localesCheckersEndTime = performance.now();

    if (NO_CONTENTLAYER_RELATED_FEATURES) {
      if (localesValidatorFeedback) throw new FeedbackError(localesValidatorFeedback);
      printPrebuilderDoneMsg(() => SKIP_BENCHMARKS || printPrebuildReport({ localesCheckersStartTime, localesCheckersEndTime }));
      return;
    }

    if (!NO_BLOG) {
      taxonomyCheckersStartTime = performance.now();
      const [sysBlogCategoriesValidatorFeedback, sysBlogSubcategoriesValidatorFeedback, sysBlogSlugsValidatorFeedback] = await Promise.all([
        sysBlogCategoriesValidator(BLOG_POSTS_FOLDER),
        sysBlogSubcategoriesValidator(BLOG_POSTS_FOLDER),
        sysBlogSlugsValidator(BLOG_POSTS_FOLDER)
      ]);

      const feedbacks = foldFeedbacks(
        sysBlogCategoriesValidatorFeedback,
        sysBlogSubcategoriesValidatorFeedback,
        sysBlogSlugsValidatorFeedback,
        localesValidatorFeedback
      );
      if (feedbacks) throw new FeedbackError(feedbacks);
      taxonomyCheckersEndTime = performance.now();

      codegenStartTime = performance.now();
      const blogArchitecture = await getBlogArchitectureMetadatas(BLOG_POSTS_FOLDER);

      await Promise.all([
        generateBlogArchitectureType(blogArchitecture),
        generateI18nBlogCategories(blogArchitecture),
        generateBlogType(blogArchitecture)
      ]);
      codegenEndTime = performance.now();
    }

    printPrebuilderDoneMsg(
      () =>
        SKIP_BENCHMARKS ||
        printPrebuildReport({
          taxonomyCheckersStartTime,
          localesCheckersStartTime,
          taxonomyCheckersEndTime,
          localesCheckersEndTime,
          codegenStartTime,
          globalStartTime,
          codegenEndTime
        })
    );
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

processPrebuild();
// Stryker restore all
/* v8 ignore stop */
