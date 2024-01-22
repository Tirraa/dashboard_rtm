import arg from 'arg';

import type { MaybeEmptyErrorsDetectionFeedback, ErrorsDetectionFeedback, Path } from '../types/Metadatas';
import type { VocabKey, Locale } from '../config/translations';

import { UNKNOWN_LOCALE_FALLBACK_MSG, LOCALES } from '../config/translations';
import ArgumentsValidatorError from '../errors/ArgumentsValidatorError';
import { prefixFeedback, foldFeedbacks } from '../lib/feedbacksMerge';
import formatMessage, { changeLocale } from '../config/formatMessage';
import { FLAGS } from '../config';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

const getErrorPrefix = () => formatMessage('impossibleToStartThePrebuilder' satisfies VocabKey);

function getUnknownOptionsFeedback(UNKNOWN_OPTIONS: any[], havingUnknownOptions: boolean) {
  const unknownOptionsFeedback: MaybeEmptyErrorsDetectionFeedback = havingUnknownOptions
    ? formatMessage('unknownOptions' satisfies VocabKey, { UNKNOWN_OPTIONS: UNKNOWN_OPTIONS.join(', '), count: UNKNOWN_OPTIONS.length })
    : '';
  return unknownOptionsFeedback;
}

function getIncorrectOptionsFeedbacks({
  wrongUseOfNoBlogOption,
  wrongUseOfNoI18nOption,
  wrongUseOfNoLpOption,
  invalidBlogOptions,
  invalidI18nOptions
}: {
  wrongUseOfNoBlogOption: boolean;
  wrongUseOfNoI18nOption: boolean;
  wrongUseOfNoLpOption: boolean;
  invalidBlogOptions: boolean;
  invalidI18nOptions: boolean;
}) {
  const incorrectOptionsFeedbacks: ErrorsDetectionFeedback[] = [];
  if (invalidBlogOptions) {
    incorrectOptionsFeedbacks.push(
      formatMessage('unauthorizedToOmitOption' satisfies VocabKey, {
        requiredOptionToAuthorizeOmission: FLAGS.NO_BLOG,
        omittedOption: FLAGS.BLOG_POSTS_FOLDER
      })
    );
  }

  if (invalidI18nOptions) {
    incorrectOptionsFeedbacks.push(
      formatMessage('unauthorizedToOmitOption' satisfies VocabKey, {
        omittedOption: FLAGS.I18N_LOCALES_SCHEMA_FILEPATH,
        requiredOptionToAuthorizeOmission: FLAGS.NO_I18N
      })
    );
  }

  if (wrongUseOfNoBlogOption) {
    incorrectOptionsFeedbacks.push(
      formatMessage('incompatibleOption' satisfies VocabKey, {
        scope: formatMessage('blog' satisfies VocabKey),
        incompatibleOption: FLAGS.NO_BLOG
      })
    );
  }

  if (wrongUseOfNoI18nOption) {
    incorrectOptionsFeedbacks.push(
      formatMessage('incompatibleOption' satisfies VocabKey, {
        scope: formatMessage('i18n' satisfies VocabKey),
        incompatibleOption: FLAGS.NO_I18N
      })
    );
  }

  if (wrongUseOfNoLpOption) {
    incorrectOptionsFeedbacks.push(
      formatMessage('incompatibleOption' satisfies VocabKey, {
        scope: formatMessage('lp' satisfies VocabKey),
        incompatibleOption: FLAGS.NO_LP
      })
    );
  }
  return incorrectOptionsFeedbacks;
}

function getBreakingDependenciesFeedbacks({
  breakingBlogDependencyToI18n,
  breakingLpDependencyToI18n
}: {
  breakingBlogDependencyToI18n: boolean;
  breakingLpDependencyToI18n: boolean;
}): ErrorsDetectionFeedback[] {
  const breakingDependenciesFeedbacks: ErrorsDetectionFeedback[] = [];

  if (breakingBlogDependencyToI18n) {
    breakingDependenciesFeedbacks.push(
      formatMessage('breakingDependency' satisfies VocabKey, {
        scope: formatMessage('blog' satisfies VocabKey),
        incompatibleOption: FLAGS.NO_I18N
      }) +
        '\n' +
        formatMessage('disableBothI18nAndBlogAnalysisMaybeAdvice' satisfies VocabKey)
    );
  }

  if (breakingLpDependencyToI18n) {
    breakingDependenciesFeedbacks.push(
      formatMessage('breakingDependency' satisfies VocabKey, {
        scope: formatMessage('lp' satisfies VocabKey),
        incompatibleOption: FLAGS.NO_I18N
      }) +
        '\n' +
        formatMessage('disableBothI18nAndLpAnalysisMaybeAdvice' satisfies VocabKey)
    );
  }
  return breakingDependenciesFeedbacks;
}

/**
 * @throws {ArgumentsValidatorError}
 */
function crashIfArgumentsAreInvalid({ ...args }) {
  const {
    [FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
    [FLAGS.LANDING_PAGES_FOLDER]: LANDING_PAGES_FOLDER,
    [FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER,
    [FLAGS.NO_BLOG]: NO_BLOG,
    [FLAGS.NO_I18N]: NO_I18N,
    [FLAGS.NO_LP]: NO_LP,
    _: UNKNOWN_OPTIONS
  } = args;

  const invalidBlogOptions = BLOG_POSTS_FOLDER === undefined && !NO_BLOG;
  const invalidI18nOptions = I18N_LOCALES_SCHEMA_FILEPATH === undefined && !NO_I18N;

  const wrongUseOfNoBlogOption = BLOG_POSTS_FOLDER !== undefined && NO_BLOG;
  const wrongUseOfNoI18nOption = I18N_LOCALES_SCHEMA_FILEPATH !== undefined && NO_I18N;
  const wrongUseOfNoLpOption = LANDING_PAGES_FOLDER !== undefined && NO_LP;

  const breakingBlogDependencyToI18n = BLOG_POSTS_FOLDER !== undefined && NO_I18N;
  const breakingLpDependencyToI18n = LANDING_PAGES_FOLDER !== undefined && NO_I18N;

  const havingUnknownOptions = UNKNOWN_OPTIONS.length > 0;

  const unknownOptionsFeedback: MaybeEmptyErrorsDetectionFeedback = getUnknownOptionsFeedback(UNKNOWN_OPTIONS, havingUnknownOptions);

  const incorrectOptionsFeedbacks: ErrorsDetectionFeedback[] = getIncorrectOptionsFeedbacks({
    wrongUseOfNoBlogOption,
    wrongUseOfNoI18nOption,
    wrongUseOfNoLpOption,
    invalidBlogOptions,
    invalidI18nOptions
  });

  const breakingDependenciesFeedbacks: ErrorsDetectionFeedback[] = getBreakingDependenciesFeedbacks({
    breakingBlogDependencyToI18n,
    breakingLpDependencyToI18n
  });

  let feedback: MaybeEmptyErrorsDetectionFeedback = foldFeedbacks(
    unknownOptionsFeedback,
    ...incorrectOptionsFeedbacks,
    ...breakingDependenciesFeedbacks
  );
  if (!feedback) return;

  feedback += '\n\n' + JSON.stringify(args, (k, v) => ((k === '_' && !havingUnknownOptions) || !v ? undefined : v), 2);
  throw new ArgumentsValidatorError(prefixFeedback(feedback, getErrorPrefix() + '\n' + formatMessage('optionsAreInvalid' satisfies VocabKey) + '\n'));
}

async function fileExists(path: Path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * @throws {ArgumentsValidatorError}
 */
async function crashIfFilesDoesNotExist({ ...args }) {
  const {
    [FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
    [FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER,
    [FLAGS.LANDING_PAGES_FOLDER]: LP_FOLDER,
    [FLAGS.NO_BLOG]: NO_BLOG,
    [FLAGS.NO_I18N]: NO_I18N,
    [FLAGS.NO_LP]: NO_LP
  } = args;

  async function checkI18n() {
    if (NO_I18N) return;

    const ADVICE = formatMessage('disableI18nAnalysisAdvice' satisfies VocabKey);
    const ERROR_PREFIX = getErrorPrefix();

    const i18nDefaultLocaleFileExists = await fileExists(I18N_LOCALES_SCHEMA_FILEPATH);
    if (!i18nDefaultLocaleFileExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + formatMessage('cantOpenTheI18nLocaleSchemaFile' satisfies VocabKey) + '\n' + ADVICE);
    }

    const i18nLocalesSchemaStat = await fs.stat(I18N_LOCALES_SCHEMA_FILEPATH);
    const localesSchemaIsAFile = i18nLocalesSchemaStat.isFile();
    if (!localesSchemaIsAFile) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + formatMessage('theLocaleSchemaIsNotFile' satisfies VocabKey) + '\n' + ADVICE);
    }
  }

  async function checkBlog() {
    if (NO_BLOG) return;

    const ADVICE = formatMessage('disableBlogAnalysisAdvice' satisfies VocabKey);
    const ERROR_PREFIX = getErrorPrefix();

    const postsFolderExists = await fileExists(BLOG_POSTS_FOLDER);
    if (!postsFolderExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + formatMessage('cantOpenThePostsFolder' satisfies VocabKey) + '\n' + ADVICE);
    }

    const postsFolderStat = await fs.stat(BLOG_POSTS_FOLDER);
    const postsFolderIsDirectory = postsFolderStat.isDirectory();
    if (!postsFolderIsDirectory) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + formatMessage('thePostsFolderIsNotDirectory' satisfies VocabKey) + '\n' + ADVICE);
    }
  }

  async function checkLp() {
    if (NO_LP) return;

    const ADVICE = formatMessage('disableLpAnalysisAdvice' satisfies VocabKey);
    const ERROR_PREFIX = getErrorPrefix();

    const lpFolderExists = await fileExists(LP_FOLDER);
    if (!lpFolderExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + formatMessage('cantOpenTheLpFolder' satisfies VocabKey) + '\n' + ADVICE);
    }

    const lpFolderStat = await fs.stat(LP_FOLDER);
    const lpFolderIsDirectory = lpFolderStat.isDirectory();
    if (!lpFolderIsDirectory) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + formatMessage('theLpFolderIsNotDirectory' satisfies VocabKey) + '\n' + ADVICE);
    }
  }

  await Promise.all([checkI18n(), checkBlog(), checkLp()]);
}

export default async function parseArguments() {
  const args = arg(
    {
      [FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: String,
      [FLAGS.LANDING_PAGES_FOLDER]: String,
      [FLAGS.SKIP_LOCALES_INFOS]: Boolean,
      [FLAGS.BLOG_POSTS_FOLDER]: String,
      [FLAGS.SKIP_BENCHMARKS]: Boolean,
      [FLAGS.FORMAT_CODEGEN]: Boolean,
      [FLAGS.NO_BLOG]: Boolean,
      [FLAGS.NO_I18N]: Boolean,
      [FLAGS.NO_LP]: Boolean,
      [FLAGS.LANG]: String
    },
    { permissive: true }
  );

  const maybeLang = args[FLAGS.LANG];
  if (maybeLang) {
    if (LOCALES.includes(maybeLang as any)) changeLocale(maybeLang as Locale);
    else console.warn(UNKNOWN_LOCALE_FALLBACK_MSG(maybeLang));
  }

  crashIfArgumentsAreInvalid(args);
  await crashIfFilesDoesNotExist(args);
  return args;
}
