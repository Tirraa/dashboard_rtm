import * as fs from 'fs';
import { FLAGS } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import ArgumentsValidatorError from '../errors/exceptions/ArgumentsValidatorError';
import TFlagsAssoc, { MaybeIncorrectTFlagsAssoc } from '../types/flags';

const { IMPOSSIBLE_TO_START: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

function getRetrievedValuesFromArgs(args: string[]): MaybeIncorrectTFlagsAssoc {
  const indexOfPostsFolder = args.indexOf(FLAGS.POSTS_FOLDER);
  const indexOfBlogConfigFile = args.indexOf(FLAGS.BLOG_CONFIG_FILE);
  const indexOfDefaultI18nLocaleFile = args.indexOf(FLAGS.I18N_DEFAULT_LOCALE_FILE);
  const indexOfSkipLocalesInfos = args.indexOf(FLAGS.SKIP_LOCALES_INFOS);

  const POSTS_FOLDER = indexOfPostsFolder !== -1 ? args[indexOfPostsFolder + 1] : undefined;
  const BLOG_CONFIG_FILE = indexOfBlogConfigFile !== -1 ? args[indexOfBlogConfigFile + 1] : undefined;
  const I18N_DEFAULT_LOCALE_FILE = indexOfDefaultI18nLocaleFile !== -1 ? args[indexOfDefaultI18nLocaleFile + 1] : undefined;
  const SKIP_LOCALES_INFOS = indexOfSkipLocalesInfos === -1 ? '' : 'Look at my horse, my horse is amazing';

  const retrievedValuesFromArgs: MaybeIncorrectTFlagsAssoc = {
    POSTS_FOLDER,
    BLOG_CONFIG_FILE,
    I18N_DEFAULT_LOCALE_FILE,
    SKIP_LOCALES_INFOS
  };
  return retrievedValuesFromArgs;
}

/**
 * @throws {ArgumentsValidatorError}
 */
function checkIfArgumentsSeemLegit({ ...args }: MaybeIncorrectTFlagsAssoc) {
  if (Object.values(args).some((arg) => arg === undefined || arg.startsWith('-'))) {
    throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + 'Wrong arguments.' + '\n');
  }
}

/**
 * @throws {ArgumentsValidatorError}
 */
function checkIfFilesExist({ BLOG_CONFIG_FILE, I18N_DEFAULT_LOCALE_FILE, POSTS_FOLDER }: TFlagsAssoc) {
  const blogConfigFileExists = fs.existsSync(BLOG_CONFIG_FILE);
  if (!blogConfigFileExists) {
    throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the blog config file!" + '\n');
  }

  const i18nDefaultLocaleFileExists = fs.existsSync(I18N_DEFAULT_LOCALE_FILE);
  if (!i18nDefaultLocaleFileExists) {
    throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the default locale i18n file!" + '\n');
  }

  const postsFolderExists = fs.existsSync(POSTS_FOLDER);
  if (!postsFolderExists) {
    throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + "Can't open the posts folder!" + '\n');
  }

  const postsFolderIsDirectory = fs.statSync(POSTS_FOLDER).isDirectory();
  if (!postsFolderIsDirectory) {
    throw new ArgumentsValidatorError(ERROR_PREFIX + '\n' + 'The posts folder you indicated is NOT a directory!' + '\n');
  }
}

function validateArguments(): TFlagsAssoc {
  const args = process.argv.slice(2);
  const retrievedValuesFromArgs = getRetrievedValuesFromArgs(args);

  checkIfArgumentsSeemLegit(retrievedValuesFromArgs);

  const safeRetrievedValuesFromArgs = retrievedValuesFromArgs as TFlagsAssoc;
  checkIfFilesExist(safeRetrievedValuesFromArgs);
  return safeRetrievedValuesFromArgs;
}

export function validateArgumentsThenReturnRetrievedValuesFromArgs() {
  const retrievedValuesFromArgs = validateArguments();
  return retrievedValuesFromArgs;
}

export default validateArgumentsThenReturnRetrievedValuesFromArgs;
