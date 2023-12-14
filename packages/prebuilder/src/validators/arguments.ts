import arg from 'arg';
import { existsSync, statSync } from 'fs';
import { FLAGS as OPTIONS } from '../config';
import {
  ARG_ERROR_PREFIX,
  CRITICAL_ERRORS_STR,
  DISABLE_BLOG_ANALYSIS_ADVICE,
  DISABLE_I18N_ANALYSIS_ADVICE,
  KNOWN_OPTIONS_PREFIX,
  UNKNOWN_OPTIONS_PREFIX,
  WRONG_OPTIONS_PREFIX
} from '../config/vocab';
import ArgumentsValidatorError from '../errors/ArgumentsValidatorError';
import { prefixFeedback } from '../lib/feedbacksMerge';

const { IMPOSSIBLE_TO_START: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

/**
 * @throws {ArgumentsValidatorError}
 */
function crashIfArgumentsAreInvalid({ ...args }) {
  const {
    [OPTIONS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER,
    [OPTIONS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
    [OPTIONS.NO_BLOG]: NO_BLOG,
    [OPTIONS.NO_I18N]: NO_I18N,
    _: UNKNOWN_OPTIONS
  } = args;

  const invalidBlogOptions = BLOG_POSTS_FOLDER === undefined && !NO_BLOG;
  const invalidI18nOptions = I18N_LOCALES_SCHEMA_FILEPATH === undefined && !NO_I18N;
  const wrongUseOfNoBlogOption = BLOG_POSTS_FOLDER !== undefined && NO_BLOG;
  const wrongUseOfNoI18nOption = I18N_LOCALES_SCHEMA_FILEPATH !== undefined && NO_I18N;
  const breakingBlogDependencyToI18n = BLOG_POSTS_FOLDER !== undefined && NO_I18N;
  const unknownOptions = UNKNOWN_OPTIONS.length > 0;
  const P = ARG_ERROR_PREFIX + UNKNOWN_OPTIONS_PREFIX;
  const P2 = ARG_ERROR_PREFIX + WRONG_OPTIONS_PREFIX;

  let feedback = unknownOptions ? P + UNKNOWN_OPTIONS.join(', ') + '\n' + KNOWN_OPTIONS_PREFIX + Object.values(OPTIONS).join(', ') : '';
  if (invalidBlogOptions) {
    feedback += P2 + `you must use the ${OPTIONS.BLOG_POSTS_FOLDER} option unless you are using the ${OPTIONS.NO_BLOG} option.`;
  } else if (invalidI18nOptions) {
    feedback += P2 + `you can't omit the ${OPTIONS.I18N_LOCALES_SCHEMA_FILEPATH} option if you don't use the ${OPTIONS.NO_I18N} option.`;
  } else if (wrongUseOfNoBlogOption) {
    feedback += P2 + `you can't use the ${OPTIONS.NO_BLOG} option if you use blog related options.`;
  } else if (wrongUseOfNoI18nOption) {
    feedback += P2 + `you can't use the ${OPTIONS.NO_I18N} option if you use i18n related options.`;
  } else if (breakingBlogDependencyToI18n) {
    feedback +=
      P2 +
      `you can't use both the ${OPTIONS.NO_I18N} option and blog related options: the blog feature relies on i18n.` +
      '\n' +
      `Maybe you want to use the ${OPTIONS.NO_I18N} and ${OPTIONS.NO_BLOG} options?`;
  }

  if (!feedback) return;

  feedback += '\n\n';
  feedback += 'Options:' + '\n' + JSON.stringify(args, (k, v) => ((k === '_' && !unknownOptions) || !v ? undefined : v), 2);
  throw new ArgumentsValidatorError(prefixFeedback(feedback, ERROR_PREFIX + '\n'));
}

/**
 * @throws {ArgumentsValidatorError}
 */
function crashIfFilesDoesNotExist({ ...args }) {
  const {
    [OPTIONS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
    [OPTIONS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER,
    [OPTIONS.NO_BLOG]: NO_BLOG,
    [OPTIONS.NO_I18N]: NO_I18N
  } = args;

  function checkI18n() {
    if (NO_I18N) return;

    const i18nDefaultLocaleFileExists = existsSync(I18N_LOCALES_SCHEMA_FILEPATH);
    if (!i18nDefaultLocaleFileExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the i18n locale schema file!" + '\n' + DISABLE_I18N_ANALYSIS_ADVICE);
    }
  }

  function checkBlog() {
    if (NO_BLOG) return;

    const ADVICE = DISABLE_BLOG_ANALYSIS_ADVICE;

    const postsFolderExists = existsSync(BLOG_POSTS_FOLDER);
    if (!postsFolderExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the posts folder!" + '\n' + ADVICE);
    }

    const postsFolderIsDirectory = statSync(BLOG_POSTS_FOLDER).isDirectory();
    if (!postsFolderIsDirectory) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + 'The posts folder you indicated is NOT a directory!' + '\n' + ADVICE);
    }
  }

  checkI18n();
  checkBlog();
}

function parseArguments() {
  const args = arg(
    {
      [OPTIONS.I18N_LOCALES_SCHEMA_FILEPATH]: String,
      [OPTIONS.BLOG_POSTS_FOLDER]: String,
      [OPTIONS.SKIP_LOCALES_INFOS]: Boolean,
      [OPTIONS.NO_BLOG]: Boolean,
      [OPTIONS.NO_I18N]: Boolean
    },
    { permissive: true }
  );

  crashIfArgumentsAreInvalid(args);
  crashIfFilesDoesNotExist(args);
  return args;
}

export default parseArguments;
