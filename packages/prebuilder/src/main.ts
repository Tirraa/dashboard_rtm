/* v8 ignore start */
// Stryker disable all

import formatMessage from './config/formatMessage';

// NOTE: formatMessage import MUST be at the top of the file

import type { MaybeUndefined, MaybeNull, Couple } from '@rtm/shared-types/CustomUtilityTypes';

import { dirname, join } from 'path';
import { ArgError } from 'arg';

import type { MaybeEmptyErrorsDetectionFeedback, Arborescence, Path } from './types/Metadatas';
import type { VocabKey } from './config/translations';

import generateDefaultLanguageTokenType from './generators/defaultLanguageToken/defaultLanguageTokenType';
import getPagesArchitectureMetadatas from './metadatas-builders/pagesArchitectureMetadatas';
import getBlogArchitectureMetadatas from './metadatas-builders/blogArchitectureMetadatas';
import generateBlogArchitectureType from './generators/blog/blogArchitectureType';
import { ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX, FLAGS } from './config';
import generateI18nBlogCategories from './generators/blog/i18nBlogCategories';
import sysBlogSubcategoriesValidator from './validators/sysBlogSubcategories';
import sysBlogCategoriesValidator from './validators/sysBlogCategories';
import getLpMetadatas from './metadatas-builders/landingPagesMetadatas';
import generateI18nPagesTitles from './generators/blog/i18nPagesTitles';
import ArgumentsValidatorError from './errors/ArgumentsValidatorError';
import { prefixFeedback, foldFeedbacks } from './lib/feedbacksMerge';
import sysLpCategoriesValidator from './validators/sysLpCategories';
import localesInfosValidator from './validators/localesInfos';
import sysBlogSlugsValidator from './validators/sysBlogSlugs';
import generateLandingPagesType from './generators/lp/lpType';
import generatePagesType from './generators/pages/pagesType';
import generateIndexFile from './generators/index/indexFile';
import generateBlogType from './generators/blog/blogType';
import sysLpSlugsValidator from './validators/sysLpSlugs';
import sysPagesValidator from './validators/sysPages';
import parseArguments from './validators/arguments';
import FeedbackError from './errors/FeedbackError';
import BuilderError from './errors/BuilderError';
import watch from './dx/watcher';

/* eslint-enable import/first */

// NOTE: The prebuilder is too greedy
// https://github.com/Tirraa/dashboard_rtm/issues/78

const BENCHMARK_ACCURACY = 5;

const HANDLED_ERRORS_TYPES = [FeedbackError, BuilderError, ArgumentsValidatorError, ArgError];

let clocks = {} as Partial<{
  pagesTaxonomyCheckersStartTime: number;
  blogTaxonomyCheckersStartTime: number;
  pagesTaxonomyCheckersEndTime: number;
  blogTaxonomyCheckersEndTime: number;
  lpTaxonomyCheckersStartTime: number;
  lpTaxonomyCheckersEndTime: number;
  localesCheckersStartTime: number;
  localesCheckersEndTime: number;
  pagesCodegenStartTime: number;
  utilsCodegenStartTime: number;
  blogCodegenStartTime: number;
  pagesCodegenEndTime: number;
  utilsCodegenEndTime: number;
  blogCodegenEndTime: number;
  lpCodegenStartTime: number;
  lpCodegenEndTime: number;
  globalStartTime: number;
}>;

const resetBenchmarkClocks = () => (clocks = {});

const moveToRoot = () => process.chdir(join(__dirname, ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX));

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
  utilsCodegenStartTime,
  blogCodegenStartTime,
  pagesCodegenEndTime,
  utilsCodegenEndTime,
  blogCodegenEndTime,
  lpCodegenStartTime,
  lpCodegenEndTime,
  globalStartTime
}: typeof clocks) {
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
    utilsElapsedTime,
    totalGlobalElapsedTime
  ] = [
    computeDelay(localesCheckersStartTime, localesCheckersEndTime),
    computeDelay(pagesTaxonomyCheckersStartTime, pagesTaxonomyCheckersEndTime),
    computeDelay(blogTaxonomyCheckersStartTime, blogTaxonomyCheckersEndTime),
    computeDelay(lpTaxonomyCheckersStartTime, lpTaxonomyCheckersEndTime),
    computeDelay(pagesCodegenStartTime, pagesCodegenEndTime),
    computeDelay(blogCodegenStartTime, blogCodegenEndTime),
    computeDelay(lpCodegenStartTime, lpCodegenEndTime),
    computeDelay(utilsCodegenStartTime, utilsCodegenEndTime),
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
      ['generatedUtilTypesBenchmark', utilsElapsedTime],
      ['totalExecutionTimeBenchmark', totalGlobalElapsedTime]
    ] satisfies Couple<VocabKey, typeof IGNORED | string>[]
  ).forEach(([label, duration]) => {
    if (duration === IGNORED) return;
    console.log(formatMessage(label satisfies VocabKey, { duration }));
  });
}

/**
 * @effect {Benchmark}
 */
async function validateLocales(localesFolder: Path, I18N_LOCALES_SCHEMA_FILEPATH: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  clocks.localesCheckersStartTime = performance.now();
  const feedback = await localesInfosValidator(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH);
  clocks.localesCheckersEndTime = performance.now();
  return feedback;
}

/**
 * @effect {Benchmark}
 */
async function pagesTaxonomyValidator(PAGES_FOLDER: Path) {
  clocks.pagesTaxonomyCheckersStartTime = performance.now();
  const pagesValidatorResult = await sysPagesValidator(PAGES_FOLDER);
  clocks.pagesTaxonomyCheckersEndTime = performance.now();
  return pagesValidatorResult;
}

/**
 * @effect {Benchmark}
 */
async function blogTaxonomyValidator(BLOG_POSTS_FOLDER: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  clocks.blogTaxonomyCheckersStartTime = performance.now();
  const [sysBlogCategoriesValidatorFeedback, sysBlogSubcategoriesValidatorFeedback, sysBlogSlugsValidatorFeedback] = await Promise.all([
    sysBlogCategoriesValidator(BLOG_POSTS_FOLDER),
    sysBlogSubcategoriesValidator(BLOG_POSTS_FOLDER),
    sysBlogSlugsValidator(BLOG_POSTS_FOLDER)
  ]);

  const feedback = foldFeedbacks(sysBlogCategoriesValidatorFeedback, sysBlogSubcategoriesValidatorFeedback, sysBlogSlugsValidatorFeedback);
  clocks.blogTaxonomyCheckersEndTime = performance.now();
  return feedback;
}

/**
 * @effect {Benchmark}
 */
async function lpTaxonomyValidator(LP_FOLDER: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  clocks.lpTaxonomyCheckersStartTime = performance.now();
  const [sysLpCategoriesValidatorFeedback, sysLpSlugsValidatorFeedback] = await Promise.all([
    sysLpCategoriesValidator(LP_FOLDER),
    sysLpSlugsValidator(LP_FOLDER)
  ]);

  const feedback = foldFeedbacks(sysLpCategoriesValidatorFeedback, sysLpSlugsValidatorFeedback);
  clocks.lpTaxonomyCheckersEndTime = performance.now();
  return feedback;
}

/**
 * @effect {Benchmark}
 */
async function generateUtilTypes() {
  clocks.utilsCodegenStartTime = performance.now();
  await generateDefaultLanguageTokenType();
  await generateIndexFile();
  clocks.utilsCodegenEndTime = performance.now();
}

/**
 * @effect {Benchmark}
 */
async function generatePagesCode(pagesArborescence: Arborescence, PRETTY_CODEGEN: boolean) {
  clocks.pagesCodegenStartTime = performance.now();
  const pagesMetadatas = getPagesArchitectureMetadatas(pagesArborescence);
  await generatePagesType(pagesMetadatas, PRETTY_CODEGEN);
  clocks.pagesCodegenEndTime = performance.now();
}

async function generatePhonyPagesCode() {
  await generatePagesType({}, false);
}

/**
 * @effect {Benchmark}
 */
async function generateBlogCode(BLOG_POSTS_FOLDER: Path, PRETTY_CODEGEN: boolean) {
  clocks.blogCodegenStartTime = performance.now();
  const blogArchitecture = await getBlogArchitectureMetadatas(BLOG_POSTS_FOLDER);

  await Promise.all([
    generateBlogArchitectureType(blogArchitecture, PRETTY_CODEGEN),
    generateI18nBlogCategories(blogArchitecture, PRETTY_CODEGEN),
    generateBlogType(blogArchitecture, PRETTY_CODEGEN),
    generateI18nPagesTitles(blogArchitecture, PRETTY_CODEGEN)
  ]);
  clocks.blogCodegenEndTime = performance.now();
}

async function generatePhonyBlogCode() {
  await Promise.all([
    generateBlogArchitectureType({}, false),
    generateI18nBlogCategories({}, false),
    generateBlogType({}, false),
    generateI18nPagesTitles({}, false)
  ]);
}

/**
 * @effect {Benchmark}
 */
async function generateLpCode(LP_FOLDER: Path, PRETTY_CODEGEN: boolean) {
  clocks.lpCodegenStartTime = performance.now();
  const lpArchitecture = await getLpMetadatas(LP_FOLDER);
  await generateLandingPagesType(lpArchitecture, PRETTY_CODEGEN);
  clocks.lpCodegenEndTime = performance.now();
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

function getPagesFeedbackPromise(NO_PAGES: boolean, PAGES_FOLDER: Path) {
  const PHONY_PAGES_CHECKERS_RESULT = { arborescence: [] as Arborescence, feedback: '' } as const;
  const pagesFeedbackPromise = !NO_PAGES ? pagesTaxonomyValidator(PAGES_FOLDER) : PHONY_PAGES_CHECKERS_RESULT;

  return pagesFeedbackPromise;
}

function getBlogFeedbackPromise(NO_BLOG: boolean, BLOG_POSTS_FOLDER: Path) {
  const blogFeedbackPromise = !NO_BLOG ? blogTaxonomyValidator(BLOG_POSTS_FOLDER) : '';
  return blogFeedbackPromise;
}

function getLpFeedbackPromise(NO_LP: boolean, LP_FOLDER: Path) {
  const lpFeedbackPromise = !NO_LP ? lpTaxonomyValidator(LP_FOLDER) : '';
  return lpFeedbackPromise;
}

async function localesValidationProcedure(localesFolder: Path, I18N_LOCALES_SCHEMA_FILEPATH: Path) {
  const localesValidatorFeedback = await validateLocales(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH);
  if (localesValidatorFeedback) throw new FeedbackError(localesValidatorFeedback);
}

async function pagesGenerationProcedure(NO_PAGES: boolean, PAGES_FOLDER: Path, PRETTY_CODEGEN: boolean) {
  const pagesFeedbackPromise = getPagesFeedbackPromise(NO_PAGES, PAGES_FOLDER);
  const pagesCheckerResult = await pagesFeedbackPromise;

  const { feedback: pagesCheckerFeedback } = pagesCheckerResult;

  const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);
  const feedback = prefixFeedback(pagesCheckerFeedback, ERROR_PREFIX + '\n');
  if (feedback) throw new FeedbackError(feedback);

  const { arborescence: pagesArborescence } = pagesCheckerResult;

  await generatePagesCode(pagesArborescence, PRETTY_CODEGEN);
}

async function blogGenerationProcedure(NO_BLOG: boolean, BLOG_POSTS_FOLDER: Path, PRETTY_CODEGEN: boolean) {
  const blogFeedbackPromise = getBlogFeedbackPromise(NO_BLOG, BLOG_POSTS_FOLDER);
  const blogFeedback = await blogFeedbackPromise;

  const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);
  const feedback = prefixFeedback(blogFeedback, ERROR_PREFIX + '\n');
  if (feedback) throw new FeedbackError(feedback);

  await generateBlogCode(BLOG_POSTS_FOLDER, PRETTY_CODEGEN);
}

async function lpGenerationProcedure(NO_LP: boolean, LP_FOLDER: Path, PRETTY_CODEGEN: boolean) {
  const lpFeedbackPromise = getLpFeedbackPromise(NO_LP, LP_FOLDER);
  const lpFeedback = await lpFeedbackPromise;

  const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);
  const feedback = prefixFeedback(lpFeedback, ERROR_PREFIX + '\n');
  if (feedback) throw new FeedbackError(feedback);

  await generateLpCode(LP_FOLDER, PRETTY_CODEGEN);
}

/**
 * @throws {FeedbackError}
 * @effect {Benchmark}
 */
async function processPrebuild() {
  clocks.globalStartTime = performance.now();

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
      [FLAGS.NO_LP]: NO_LP,
      [FLAGS.WATCH]: WATCH
    } = retrievedValuesFromArgs as Required<typeof retrievedValuesFromArgs>;

    const printBenchmark = () => printPrebuilderDoneMsg(() => SKIP_BENCHMARKS || printPrebuildReport(clocks));
    const localesFolder: MaybeNull<Path> = !SKIP_LOCALES_INFOS || !NO_I18N ? dirname(I18N_LOCALES_SCHEMA_FILEPATH) : null;

    async function genLoop() {
      async function firstShot() {
        const NO_CONTENTLAYER_RELATED_FEATURES = NO_BLOG && NO_LP && NO_PAGES;

        const localesValidatorFeedback: MaybeEmptyErrorsDetectionFeedback =
          localesFolder !== null ? await validateLocales(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH) : '';

        if (NO_CONTENTLAYER_RELATED_FEATURES) {
          if (localesValidatorFeedback) throw new FeedbackError(localesValidatorFeedback);
          printBenchmark();
          return;
        }

        const pagesFeedbackPromise = getPagesFeedbackPromise(NO_PAGES, PAGES_FOLDER);
        const blogFeedbackPromise = getBlogFeedbackPromise(NO_BLOG, BLOG_POSTS_FOLDER);
        const lpFeedbackPromise = getLpFeedbackPromise(NO_LP, LP_FOLDER);
        const [pagesCheckerResult, blogFeedback, lpFeedback] = await Promise.all([pagesFeedbackPromise, blogFeedbackPromise, lpFeedbackPromise]);

        const { feedback: pagesCheckerFeedback } = pagesCheckerResult;

        const ERROR_PREFIX = formatMessage('failedToPassThePrebuild' satisfies VocabKey);
        const feedback = prefixFeedback(foldFeedbacks(localesValidatorFeedback, pagesCheckerFeedback, blogFeedback, lpFeedback), ERROR_PREFIX + '\n');
        if (feedback) throw new FeedbackError(feedback);

        const { arborescence: pagesArborescence } = pagesCheckerResult;

        await Promise.all([
          (!NO_PAGES && generatePagesCode(pagesArborescence, PRETTY_CODEGEN)) || generatePhonyPagesCode(),
          (!NO_BLOG && generateBlogCode(BLOG_POSTS_FOLDER, PRETTY_CODEGEN)) || generatePhonyBlogCode(),
          (!NO_LP && generateLpCode(LP_FOLDER, PRETTY_CODEGEN)) || generatePhonyLpCode(),
          generateUtilTypes()
        ]);

        printBenchmark();
      }

      await firstShot();
      if (WATCH) initializeWatchers();

      function initializeWatchers() {
        async function asyncProcedurePlayer(procedure: () => Promise<void>) {
          try {
            resetBenchmarkClocks();
            await procedure();
            printBenchmark();
            SKIP_BENCHMARKS || console.log();
          } catch (e) {
            console.error((e as Error).message);
          }
        }

        if (localesFolder !== null) {
          watch(localesFolder, async () => await asyncProcedurePlayer(() => localesValidationProcedure(localesFolder, I18N_LOCALES_SCHEMA_FILEPATH)));
        }

        if (!NO_PAGES) {
          watch(PAGES_FOLDER, async () => await asyncProcedurePlayer(() => pagesGenerationProcedure(NO_PAGES, PAGES_FOLDER, PRETTY_CODEGEN)));
        }

        if (!NO_BLOG) {
          watch(BLOG_POSTS_FOLDER, async () => await asyncProcedurePlayer(() => blogGenerationProcedure(NO_BLOG, BLOG_POSTS_FOLDER, PRETTY_CODEGEN)));
        }

        if (!NO_LP) {
          watch(LP_FOLDER, async () => await asyncProcedurePlayer(() => lpGenerationProcedure(NO_LP, LP_FOLDER, PRETTY_CODEGEN)));
        }

        console.log();
        console.log(formatMessage('watchersReady' satisfies VocabKey));
        console.log();
      }
    }

    await genLoop();
  } catch (error) {
    logError(error);
    process.exit(1);
  }
}

processPrebuild();

// Stryker restore all
/* v8 ignore stop */
