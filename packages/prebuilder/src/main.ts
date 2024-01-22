/* v8 ignore start */
// Stryker disable all
import formatMessage from './config/formatMessage';

/* eslint-disable perfectionist/sort-imports */
import type { MaybeUndefined, Tuple } from '@rtm/shared-types/CustomUtilityTypes';

import { ArgError } from 'arg';
import path from 'path';

import type { MaybeEmptyErrorsDetectionFeedback, Path } from './types/Metadatas';
import type { VocabKey } from './config/translations';

import { ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX, FLAGS } from './config';
import getBlogArchitectureMetadatas from './metadatas-builders/blogArchitectureMetadatas';
import generateBlogArchitectureType from './generators/blog/blogArchitectureType';
import generateI18nBlogCategories from './generators/blog/i18nBlogCategories';
import sysBlogSubcategoriesValidator from './validators/sysBlogSubcategories';
import sysBlogCategoriesValidator from './validators/sysBlogCategories';
import ArgumentsValidatorError from './errors/ArgumentsValidatorError';
import localesInfosValidator from './validators/localesInfos';
import sysBlogSlugsValidator from './validators/sysBlogSlugs';
import generateBlogType from './generators/blog/blogType';
import { prefixFeedback, foldFeedbacks } from './lib/feedbacksMerge';
import parseArguments from './validators/arguments';
import FeedbackError from './errors/FeedbackError';
import BuilderError from './errors/BuilderError';
import sysLpCategoriesValidator from './validators/sysLpCategories';
import sysLpSlugsValidator from './validators/sysLpSlugs';
import getLpMetadatas from './metadatas-builders/landingPagesMetadatas';
import generateLandingPageType from './generators/lp/lpType';
/* eslint-enable perfectionist/sort-imports */

const BENCHMARK_ACCURACY = 5;

const HANDLED_ERRORS_TYPES = [FeedbackError, BuilderError, ArgumentsValidatorError, ArgError];

let [
  localesCheckersStartTime,
  localesCheckersEndTime,
  blogTaxonomyCheckersStartTime,
  blogTaxonomyCheckersEndTime,
  blogCodegenStartTime,
  blogCodegenEndTime,
  lpCodegenStartTime,
  lpCodegenEndTime,
  lpTaxonomyCheckersStartTime,
  lpTaxonomyCheckersEndTime
]: MaybeUndefined<number>[] = [];

const moveToRoot = () => process.chdir(path.join(__dirname, ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX));

function printPrebuilderDoneMsg(sideEffectAtExit?: () => void) {
  console.log(formatMessage('prebuildDone' satisfies VocabKey));
  if (typeof sideEffectAtExit === 'function') sideEffectAtExit();
}

function printPrebuildReport({
  blogTaxonomyCheckersStartTime,
  blogTaxonomyCheckersEndTime,
  lpTaxonomyCheckersStartTime,
  lpTaxonomyCheckersEndTime,
  localesCheckersStartTime,
  localesCheckersEndTime,
  blogCodegenStartTime,
  blogCodegenEndTime,
  lpCodegenStartTime,
  lpCodegenEndTime,
  globalStartTime
}: Partial<{
  blogTaxonomyCheckersStartTime: number;
  blogTaxonomyCheckersEndTime: number;
  lpTaxonomyCheckersStartTime: number;
  lpTaxonomyCheckersEndTime: number;
  localesCheckersStartTime: number;
  localesCheckersEndTime: number;
  blogCodegenStartTime: number;
  blogCodegenEndTime: number;
  lpCodegenStartTime: number;
  lpCodegenEndTime: number;
  globalStartTime: number;
}>) {
  const IGNORED = -1 as const;

  const computeDelay = (maybeStart: MaybeUndefined<number>, maybeEnd: MaybeUndefined<number>) =>
    maybeStart === undefined || maybeEnd === undefined ? IGNORED : (Math.abs(maybeEnd - maybeStart) / 1e3).toFixed(BENCHMARK_ACCURACY);

  const [localesElapsedTime, blogTaxonomyElapsedTime, lpTaxonomyElapsedTime, blogCodegenElapsedTime, lpCodegenElapsedTime, totalGlobalElapsedTime] = [
    computeDelay(localesCheckersStartTime, localesCheckersEndTime),
    computeDelay(blogTaxonomyCheckersStartTime, blogTaxonomyCheckersEndTime),
    computeDelay(lpTaxonomyCheckersStartTime, lpTaxonomyCheckersEndTime),
    computeDelay(blogCodegenStartTime, blogCodegenEndTime),
    computeDelay(lpCodegenStartTime, lpCodegenEndTime),
    computeDelay(globalStartTime, performance.now())
  ];

  (
    [
      ['validatedLocalesInfosBenchmark', localesElapsedTime],
      ['validatedBlogTaxonomyBenchmark', blogTaxonomyElapsedTime],
      ['validatedLpTaxonomyBenchmark', lpTaxonomyElapsedTime],
      ['blogCodegenBenchmark', blogCodegenElapsedTime],
      ['lpCodegenBenchmark', lpCodegenElapsedTime],
      ['totalExecutionTimeBenchmark', totalGlobalElapsedTime]
    ] satisfies Tuple<VocabKey, typeof IGNORED | string>[]
  ).forEach(([label, duration]) => {
    if (duration === IGNORED) return;
    console.log(formatMessage(label satisfies VocabKey, { duration }));
  });
}

/**
 * @effect {Benchmark}
 */
async function blogTaxonomyValidator(BLOG_POSTS_FOLDER: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  blogTaxonomyCheckersStartTime = performance.now();
  const [sysBlogCategoriesValidatorFeedback, sysBlogSubcategoriesValidatorFeedback, sysBlogSlugsValidatorFeedback] = await Promise.all([
    sysBlogCategoriesValidator(BLOG_POSTS_FOLDER),
    sysBlogSubcategoriesValidator(BLOG_POSTS_FOLDER),
    sysBlogSlugsValidator(BLOG_POSTS_FOLDER)
  ]);

  const feedback = foldFeedbacks(sysBlogCategoriesValidatorFeedback, sysBlogSubcategoriesValidatorFeedback, sysBlogSlugsValidatorFeedback);
  blogTaxonomyCheckersEndTime = performance.now();
  return feedback;
}

/**
 * @effect {Benchmark}
 */
async function lpTaxonomyValidator(LP_FOLDER: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  lpTaxonomyCheckersStartTime = performance.now();
  const [sysLpCategoriesValidatorFeedback, sysLpSlugsValidatorFeedback] = await Promise.all([
    sysLpCategoriesValidator(LP_FOLDER),
    sysLpSlugsValidator(LP_FOLDER)
  ]);

  const feedback = foldFeedbacks(sysLpCategoriesValidatorFeedback, sysLpSlugsValidatorFeedback);
  lpTaxonomyCheckersEndTime = performance.now();
  return feedback;
}

/**
 * @effect {Benchmark}
 */
async function generateBlogCode(BLOG_POSTS_FOLDER: Path, FORMAT_CODEGEN: boolean) {
  blogCodegenStartTime = performance.now();
  const blogArchitecture = await getBlogArchitectureMetadatas(BLOG_POSTS_FOLDER);

  await Promise.all([
    generateBlogArchitectureType(blogArchitecture, FORMAT_CODEGEN),
    generateI18nBlogCategories(blogArchitecture, FORMAT_CODEGEN),
    generateBlogType(blogArchitecture, FORMAT_CODEGEN)
  ]);
  blogCodegenEndTime = performance.now();
}

/**
 * @effect {Benchmark}
 */
async function generateLpCode(LP_FOLDER: Path, FORMAT_CODEGEN: boolean) {
  lpCodegenStartTime = performance.now();
  const lpArchitecture = await getLpMetadatas(LP_FOLDER);
  generateLandingPageType(lpArchitecture, FORMAT_CODEGEN);
  lpCodegenEndTime = performance.now();
}

/**
 * @effect {Benchmark}
 */
async function validateLocales(I18N_LOCALES_SCHEMA_FILEPATH: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  localesCheckersStartTime = performance.now();
  const localesFolder = path.dirname(I18N_LOCALES_SCHEMA_FILEPATH);
  const feedback = await localesInfosValidator(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH);
  localesCheckersEndTime = performance.now();
  return feedback;
}

function logError(error: unknown) {
  const isErrorHandled = HANDLED_ERRORS_TYPES.some((errorType) => error instanceof errorType);

  if (isErrorHandled) {
    if (error instanceof ArgError) {
      console.error(error + '\n');
    } else {
      const msg = (error as Error).message + (!(error instanceof FeedbackError) ? '\n' : '');
      console.error(msg);
    }
  } else {
    console.error(formatMessage('unhandledError' satisfies VocabKey, { error }));
  }
}

/**
 * @throws {FeedbackError}
 * @effect {Benchmark}
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
      [FLAGS.LANDING_PAGES_FOLDER]: LP_FOLDER,
      [FLAGS.FORMAT_CODEGEN]: FORMAT_CODEGEN,
      [FLAGS.NO_I18N]: NO_I18N,
      [FLAGS.NO_BLOG]: NO_BLOG,
      [FLAGS.NO_LP]: NO_LP
    } = retrievedValuesFromArgs as Required<typeof retrievedValuesFromArgs>;

    const NO_CONTENTLAYER_RELATED_FEATURES = NO_BLOG && NO_LP; // {ToDo} && NO_PAGES && ...;

    const localesValidatorFeedback: MaybeEmptyErrorsDetectionFeedback =
      !SKIP_LOCALES_INFOS && !NO_I18N ? await validateLocales(I18N_LOCALES_SCHEMA_FILEPATH) : '';

    if (NO_CONTENTLAYER_RELATED_FEATURES) {
      if (localesValidatorFeedback) throw new FeedbackError(localesValidatorFeedback);
      printPrebuilderDoneMsg(() => SKIP_BENCHMARKS || printPrebuildReport({ localesCheckersStartTime, localesCheckersEndTime }));
      return;
    }

    const blogFeedbackPromise = !NO_BLOG ? blogTaxonomyValidator(BLOG_POSTS_FOLDER) : '';
    const lpFeedbackPromise = !NO_LP ? lpTaxonomyValidator(LP_FOLDER) : '';
    const [blogFeedback, lpFeedback] = await Promise.all([blogFeedbackPromise, lpFeedbackPromise]);

    const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);
    const feedback = prefixFeedback(foldFeedbacks(localesValidatorFeedback, blogFeedback, lpFeedback), ERROR_PREFIX + '\n');
    if (feedback) throw new FeedbackError(feedback);

    await Promise.all([!NO_BLOG && generateBlogCode(BLOG_POSTS_FOLDER, FORMAT_CODEGEN), !NO_LP && generateLpCode(LP_FOLDER, FORMAT_CODEGEN)]);

    printPrebuilderDoneMsg(
      () =>
        SKIP_BENCHMARKS ||
        printPrebuildReport({
          blogTaxonomyCheckersStartTime,
          blogTaxonomyCheckersEndTime,
          lpTaxonomyCheckersStartTime,
          lpTaxonomyCheckersEndTime,
          localesCheckersStartTime,
          localesCheckersEndTime,
          blogCodegenStartTime,
          blogCodegenEndTime,
          lpCodegenStartTime,
          lpCodegenEndTime,
          globalStartTime
        })
    );
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}

processPrebuild();
// Stryker restore all
/* v8 ignore stop */
