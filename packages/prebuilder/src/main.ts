/* v8 ignore start */
// Stryker disable all
import formatMessage from './config/formatMessage';

/* eslint-disable perfectionist/sort-imports */
import type { MaybeUndefined, Tuple } from '@rtm/shared-types/CustomUtilityTypes';

import { ArgError } from 'arg';
import path from 'path';

import type { MaybeEmptyErrorsDetectionFeedback, Arborescence, Path } from './types/Metadatas';
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
import generateLandingPagesType from './generators/lp/lpType';
import sysPagesValidator from './validators/sysPages';
import getPagesArchitectureMetadatas from './metadatas-builders/pagesArchitectureMetadatas';
import generatePagesType from './generators/pages/pagesType';
/* eslint-enable perfectionist/sort-imports */

const BENCHMARK_ACCURACY = 5;

const HANDLED_ERRORS_TYPES = [FeedbackError, BuilderError, ArgumentsValidatorError, ArgError];

let [
  localesCheckersStartTime,
  localesCheckersEndTime,
  pagesCodegenStartTime,
  pagesCodegenEndTime,
  pagesTaxonomyCheckersStartTime,
  pagesTaxonomyCheckersEndTime,
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
  pagesTaxonomyCheckersStartTime,
  blogTaxonomyCheckersStartTime,
  pagesTaxonomyCheckersEndTime,
  blogTaxonomyCheckersEndTime,
  lpTaxonomyCheckersStartTime,
  lpTaxonomyCheckersEndTime,
  localesCheckersStartTime,
  localesCheckersEndTime,
  pagesCodegenStartTime,
  blogCodegenStartTime,
  pagesCodegenEndTime,
  blogCodegenEndTime,
  lpCodegenStartTime,
  lpCodegenEndTime,
  globalStartTime
}: Partial<{
  pagesTaxonomyCheckersStartTime: number;
  blogTaxonomyCheckersStartTime: number;
  pagesTaxonomyCheckersEndTime: number;
  blogTaxonomyCheckersEndTime: number;
  lpTaxonomyCheckersStartTime: number;
  lpTaxonomyCheckersEndTime: number;
  localesCheckersStartTime: number;
  localesCheckersEndTime: number;
  pagesCodegenStartTime: number;
  blogCodegenStartTime: number;
  pagesCodegenEndTime: number;
  blogCodegenEndTime: number;
  lpCodegenStartTime: number;
  lpCodegenEndTime: number;
  globalStartTime: number;
}>) {
  const IGNORED = -1 as const;

  const computeDelay = (maybeStart: MaybeUndefined<number>, maybeEnd: MaybeUndefined<number>) =>
    maybeStart === undefined || maybeEnd === undefined ? IGNORED : (Math.abs(maybeEnd - maybeStart) / 1e3).toFixed(BENCHMARK_ACCURACY);

  const [
    localesElapsedTime,
    pagesTaxonomyElapsedTime,
    blogTaxonomyElapsedTime,
    lpTaxonomyElapsedTime,
    pagesCodegenElapsedTime,
    blogCodegenElapsedTime,
    lpCodegenElapsedTime,
    totalGlobalElapsedTime
  ] = [
    computeDelay(localesCheckersStartTime, localesCheckersEndTime),
    computeDelay(pagesTaxonomyCheckersStartTime, pagesTaxonomyCheckersEndTime),
    computeDelay(blogTaxonomyCheckersStartTime, blogTaxonomyCheckersEndTime),
    computeDelay(lpTaxonomyCheckersStartTime, lpTaxonomyCheckersEndTime),
    computeDelay(pagesCodegenStartTime, pagesCodegenEndTime),
    computeDelay(blogCodegenStartTime, blogCodegenEndTime),
    computeDelay(lpCodegenStartTime, lpCodegenEndTime),
    computeDelay(globalStartTime, performance.now())
  ];

  (
    [
      ['validatedLocalesInfosBenchmark', localesElapsedTime],
      ['validatedPagesTaxonomyBenchmark', pagesTaxonomyElapsedTime],
      ['validatedBlogTaxonomyBenchmark', blogTaxonomyElapsedTime],
      ['validatedLpTaxonomyBenchmark', lpTaxonomyElapsedTime],
      ['pagesCodegenBenchmark', pagesCodegenElapsedTime],
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
async function validateLocales(I18N_LOCALES_SCHEMA_FILEPATH: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  localesCheckersStartTime = performance.now();
  const localesFolder = path.dirname(I18N_LOCALES_SCHEMA_FILEPATH);
  const feedback = await localesInfosValidator(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH);
  localesCheckersEndTime = performance.now();
  return feedback;
}

/**
 * @effect {Benchmark}
 */
async function pagesTaxonomyValidator(PAGES_FOLDER: Path) {
  pagesTaxonomyCheckersStartTime = performance.now();
  const pagesValidatorResult = await sysPagesValidator(PAGES_FOLDER);
  pagesTaxonomyCheckersEndTime = performance.now();
  return pagesValidatorResult;
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
async function generatePagesCode(pagesArborescence: Arborescence, PRETTY_CODEGEN: boolean) {
  pagesCodegenStartTime = performance.now();
  const pagesMetadatas = getPagesArchitectureMetadatas(pagesArborescence);
  await generatePagesType(pagesMetadatas, PRETTY_CODEGEN);
  pagesCodegenEndTime = performance.now();
}

async function generatePhonyPagesCode() {
  await generatePagesType({}, false);
}

/**
 * @effect {Benchmark}
 */
async function generateBlogCode(BLOG_POSTS_FOLDER: Path, PRETTY_CODEGEN: boolean) {
  blogCodegenStartTime = performance.now();
  const blogArchitecture = await getBlogArchitectureMetadatas(BLOG_POSTS_FOLDER);

  await Promise.all([
    generateBlogArchitectureType(blogArchitecture, PRETTY_CODEGEN),
    generateI18nBlogCategories(blogArchitecture, PRETTY_CODEGEN),
    generateBlogType(blogArchitecture, PRETTY_CODEGEN)
  ]);
  blogCodegenEndTime = performance.now();
}

async function generatePhonyBlogCode() {
  await Promise.all([generateBlogArchitectureType({}, false), generateI18nBlogCategories({}, false), generateBlogType({}, false)]);
}

/**
 * @effect {Benchmark}
 */
async function generateLpCode(LP_FOLDER: Path, PRETTY_CODEGEN: boolean) {
  lpCodegenStartTime = performance.now();
  const lpArchitecture = await getLpMetadatas(LP_FOLDER);
  await generateLandingPagesType(lpArchitecture, PRETTY_CODEGEN);
  lpCodegenEndTime = performance.now();
}

async function generatePhonyLpCode() {
  await generateLandingPagesType({}, false);
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
  } else console.error(formatMessage('unhandledError' satisfies VocabKey, { error }));
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
      [FLAGS.PRETTY_CODEGEN]: PRETTY_CODEGEN,
      [FLAGS.PAGES_FOLDER]: PAGES_FOLDER,
      [FLAGS.NO_PAGES]: NO_PAGES,
      [FLAGS.NO_I18N]: NO_I18N,
      [FLAGS.NO_BLOG]: NO_BLOG,
      [FLAGS.NO_LP]: NO_LP
    } = retrievedValuesFromArgs as Required<typeof retrievedValuesFromArgs>;

    const NO_CONTENTLAYER_RELATED_FEATURES = NO_BLOG && NO_LP && NO_PAGES;

    const localesValidatorFeedback: MaybeEmptyErrorsDetectionFeedback =
      !SKIP_LOCALES_INFOS && !NO_I18N ? await validateLocales(I18N_LOCALES_SCHEMA_FILEPATH) : '';

    if (NO_CONTENTLAYER_RELATED_FEATURES) {
      if (localesValidatorFeedback) throw new FeedbackError(localesValidatorFeedback);
      printPrebuilderDoneMsg(() => SKIP_BENCHMARKS || printPrebuildReport({ localesCheckersStartTime, localesCheckersEndTime }));
      return;
    }

    const PHONY_PAGES_CHECKERS_RESULT = { arborescence: [] as Arborescence, feedback: '' } as const;
    const pagesFeedbackPromise = !NO_PAGES ? pagesTaxonomyValidator(PAGES_FOLDER) : PHONY_PAGES_CHECKERS_RESULT;
    const blogFeedbackPromise = !NO_BLOG ? blogTaxonomyValidator(BLOG_POSTS_FOLDER) : '';
    const lpFeedbackPromise = !NO_LP ? lpTaxonomyValidator(LP_FOLDER) : '';
    const [pagesCheckerResult, blogFeedback, lpFeedback] = await Promise.all([pagesFeedbackPromise, blogFeedbackPromise, lpFeedbackPromise]);

    const { arborescence: pagesArborescence, feedback: pagesCheckerFeedback } = pagesCheckerResult;

    const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);
    const feedback = prefixFeedback(foldFeedbacks(localesValidatorFeedback, pagesCheckerFeedback, blogFeedback, lpFeedback), ERROR_PREFIX + '\n');
    if (feedback) throw new FeedbackError(feedback);

    await Promise.all([
      (!NO_PAGES && generatePagesCode(pagesArborescence, PRETTY_CODEGEN)) || generatePhonyPagesCode(),
      (!NO_BLOG && generateBlogCode(BLOG_POSTS_FOLDER, PRETTY_CODEGEN)) || generatePhonyBlogCode(),
      (!NO_LP && generateLpCode(LP_FOLDER, PRETTY_CODEGEN)) || generatePhonyLpCode()
    ]);

    printPrebuilderDoneMsg(
      () =>
        SKIP_BENCHMARKS ||
        printPrebuildReport({
          pagesTaxonomyCheckersStartTime,
          blogTaxonomyCheckersStartTime,
          pagesTaxonomyCheckersEndTime,
          blogTaxonomyCheckersEndTime,
          lpTaxonomyCheckersStartTime,
          lpTaxonomyCheckersEndTime,
          localesCheckersStartTime,
          localesCheckersEndTime,
          pagesCodegenStartTime,
          blogCodegenStartTime,
          pagesCodegenEndTime,
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
