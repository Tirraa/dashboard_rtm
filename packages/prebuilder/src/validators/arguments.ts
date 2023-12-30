import arg from 'arg';

import type { Path } from '../types/metadatas';

import {
  DISABLE_BLOG_ANALYSIS_ADVICE,
  DISABLE_I18N_ANALYSIS_ADVICE,
  UNKNOWN_OPTIONS_PREFIX,
  KNOWN_OPTIONS_PREFIX,
  WRONG_OPTIONS_PREFIX,
  CRITICAL_ERRORS_STR,
  ARG_ERROR_PREFIX
} from '../config/vocab';
import ArgumentsValidatorError from '../errors/ArgumentsValidatorError';
import { prefixFeedback } from '../lib/feedbacksMerge';
import { FLAGS } from '../config';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');

const { IMPOSSIBLE_TO_START: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

/**
 * @throws {ArgumentsValidatorError}
 */
function crashIfArgumentsAreInvalid({ ...args }) {
  const {
    [FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: I18N_LOCALES_SCHEMA_FILEPATH,
    [FLAGS.BLOG_POSTS_FOLDER]: BLOG_POSTS_FOLDER,
    [FLAGS.NO_BLOG]: NO_BLOG,
    [FLAGS.NO_I18N]: NO_I18N,
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

  let feedback = unknownOptions ? P + UNKNOWN_OPTIONS.join(', ') + '\n' + KNOWN_OPTIONS_PREFIX + Object.values(FLAGS).join(', ') : '';
  if (invalidBlogOptions) {
    feedback += P2 + `you must use the ${FLAGS.BLOG_POSTS_FOLDER} option unless you are using the ${FLAGS.NO_BLOG} option.`;
  } else if (invalidI18nOptions) {
    feedback += P2 + `you can't omit the ${FLAGS.I18N_LOCALES_SCHEMA_FILEPATH} option if you don't use the ${FLAGS.NO_I18N} option.`;
  } else if (wrongUseOfNoBlogOption) {
    feedback += P2 + `you can't use the ${FLAGS.NO_BLOG} option if you use blog related options.`;
  } else if (wrongUseOfNoI18nOption) {
    feedback += P2 + `you can't use the ${FLAGS.NO_I18N} option if you use i18n related options.`;
  } else if (breakingBlogDependencyToI18n) {
    feedback +=
      P2 +
      `you can't use both the ${FLAGS.NO_I18N} option and blog related options: the blog feature relies on i18n.` +
      '\n' +
      `Maybe you want to use the ${FLAGS.NO_I18N} and ${FLAGS.NO_BLOG} options?`;
  }

  if (!feedback) return;

  feedback += '\n\n';
  feedback += 'Options:' + '\n' + JSON.stringify(args, (k, v) => ((k === '_' && !unknownOptions) || !v ? undefined : v), 2);
  throw new ArgumentsValidatorError(prefixFeedback(feedback, ERROR_PREFIX + '\n'));
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
    [FLAGS.NO_BLOG]: NO_BLOG,
    [FLAGS.NO_I18N]: NO_I18N
  } = args;

  async function checkI18n() {
    if (NO_I18N) return;

    const i18nDefaultLocaleFileExists = await fileExists(I18N_LOCALES_SCHEMA_FILEPATH);
    if (!i18nDefaultLocaleFileExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the i18n locale schema file!" + '\n' + DISABLE_I18N_ANALYSIS_ADVICE);
    }

    const i18nLocalesSchemaStat = await fs.stat(I18N_LOCALES_SCHEMA_FILEPATH);
    const localesSchemaIsAFile = i18nLocalesSchemaStat.isFile();
    if (!localesSchemaIsAFile) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + 'The locale schema you indicated is NOT a file!' + '\n' + DISABLE_I18N_ANALYSIS_ADVICE);
    }
  }

  async function checkBlog() {
    if (NO_BLOG) return;

    const ADVICE = DISABLE_BLOG_ANALYSIS_ADVICE;

    const postsFolderExists = await fileExists(BLOG_POSTS_FOLDER);
    if (!postsFolderExists) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the posts folder!" + '\n' + ADVICE);
    }

    const postsFolderStat = await fs.stat(BLOG_POSTS_FOLDER);
    const postsFolderIsDirectory = postsFolderStat.isDirectory();
    if (!postsFolderIsDirectory) {
      throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + 'The posts folder you indicated is NOT a directory!' + '\n' + ADVICE);
    }
  }

  await Promise.all([checkI18n(), checkBlog()]);
}

export default async function parseArguments() {
  const args = arg(
    {
      [FLAGS.I18N_LOCALES_SCHEMA_FILEPATH]: String,
      [FLAGS.SKIP_LOCALES_INFOS]: Boolean,
      [FLAGS.BLOG_POSTS_FOLDER]: String,
      [FLAGS.NO_BLOG]: Boolean,
      [FLAGS.NO_I18N]: Boolean
    },
    { permissive: true }
  );

  crashIfArgumentsAreInvalid(args);
  await crashIfFilesDoesNotExist(args);
  return args;
}
