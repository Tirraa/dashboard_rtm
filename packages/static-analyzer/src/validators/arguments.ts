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
import ArgumentsValidatorError from '../errors/exceptions/ArgumentsValidatorError';
import { prefixFeedback } from '../lib/feedbacksMerge';

const { IMPOSSIBLE_TO_START: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

/**
 * @throws {ArgumentsValidatorError}
 */
function crashIfArgumentsAreInvalid({ ...args }) {
  const {
    [OPTIONS.POSTS_FOLDER]: POSTS_FOLDER,
    [OPTIONS.BLOG_CONFIG_FILEPATH]: BLOG_CONFIG_FILEPATH,
    [OPTIONS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
    [OPTIONS.NO_BLOG]: NO_BLOG,
    [OPTIONS.NO_I18N]: NO_I18N,
    _: UNKNOWN_OPTIONS
  } = args;

  const invalidBlogOptions = (POSTS_FOLDER === undefined || BLOG_CONFIG_FILEPATH === undefined) && !NO_BLOG;
  const invalidI18nOptions = I18N_LOCALES_SCHEMA_FILEPATH === undefined && !NO_I18N;
  const wrongUseOfNoBlogOption = (POSTS_FOLDER !== undefined || BLOG_CONFIG_FILEPATH !== undefined) && NO_BLOG;
  const wrongUseOfNoI18nOption = I18N_LOCALES_SCHEMA_FILEPATH !== undefined && NO_I18N;
  const breakingBlogDependencyToI18n = (POSTS_FOLDER !== undefined || BLOG_CONFIG_FILEPATH !== undefined) && NO_I18N;
  const unknownOptions = UNKNOWN_OPTIONS.length > 0;
  const P = ARG_ERROR_PREFIX + UNKNOWN_OPTIONS_PREFIX;
  const P2 = ARG_ERROR_PREFIX + WRONG_OPTIONS_PREFIX;

  let feedback = unknownOptions ? P + UNKNOWN_OPTIONS.join(', ') + '\n' + KNOWN_OPTIONS_PREFIX + Object.values(OPTIONS).join(', ') : '';
  if (invalidBlogOptions) {
    feedback +=
      P2 + `you must use the ${OPTIONS.POSTS_FOLDER} and ${OPTIONS.BLOG_CONFIG_FILEPATH} options unless you are using the ${OPTIONS.NO_BLOG} option.`;
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
function checkIfFilesExist({ ...args }) {
  const {
    [OPTIONS.BLOG_CONFIG_FILEPATH]: BLOG_CONFIG_FILEPATH,
    [OPTIONS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
    [OPTIONS.POSTS_FOLDER]: POSTS_FOLDER,
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
    const blogConfigFileExists = existsSync(BLOG_CONFIG_FILEPATH);
    if (!blogConfigFileExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the blog config file!" + '\n' + ADVICE);
    }

    const postsFolderExists = existsSync(POSTS_FOLDER);
    if (!postsFolderExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the posts folder!" + '\n' + ADVICE);
    }

    const postsFolderIsDirectory = statSync(POSTS_FOLDER).isDirectory();
    if (!postsFolderIsDirectory) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + 'The posts folder you indicated is NOT a directory!' + '\n' + ADVICE);
    }
  }

  checkI18n();
  checkBlog();
}

export function parseArguments() {
  const args = arg(
    {
      [OPTIONS.BLOG_CONFIG_FILEPATH]: String,
      [OPTIONS.I18N_LOCALES_SCHEMA_FILEPATH]: String,
      [OPTIONS.POSTS_FOLDER]: String,
      [OPTIONS.SKIP_LOCALES_INFOS]: Boolean,
      [OPTIONS.NO_BLOG]: Boolean,
      [OPTIONS.NO_I18N]: Boolean
    },
    { permissive: true }
  );

  crashIfArgumentsAreInvalid(args);
  checkIfFilesExist(args);
  return args;
}

export default parseArguments;
