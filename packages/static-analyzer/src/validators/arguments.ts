import * as fs from 'fs';
import { FLAGS } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import TFlagsAssoc, { MaybeIncorrectTFlagsAssoc } from '../types/flags';

const { ARGUMENTS_PARSER: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

function getRetrievedValuesFromArgs(args: string[]): MaybeIncorrectTFlagsAssoc {
  const indexOfPostsFolder = args.indexOf(FLAGS.POSTS_FOLDER);
  const indexOfBlogConfigFile = args.indexOf(FLAGS.BLOG_CONFIG_FILE);
  const indexOfDefaultI18nLocaleFile = args.indexOf(FLAGS.I18N_DEFAULT_LOCALE_FILE);

  const postsFolderArgIdx = indexOfPostsFolder !== -1 ? indexOfPostsFolder + 1 : -1;
  const blogConfigFileArgIdx = indexOfBlogConfigFile !== -1 ? indexOfBlogConfigFile + 1 : -1;
  const defaultI18nLocaleFileArgIdx = indexOfDefaultI18nLocaleFile !== -1 ? indexOfDefaultI18nLocaleFile + 1 : -1;

  const retrievedValuesFromArgs: MaybeIncorrectTFlagsAssoc = {
    POSTS_FOLDER: postsFolderArgIdx !== -1 ? args[postsFolderArgIdx] : undefined,
    BLOG_CONFIG_FILE: blogConfigFileArgIdx !== -1 ? args[blogConfigFileArgIdx] : undefined,
    I18N_DEFAULT_LOCALE_FILE: defaultI18nLocaleFileArgIdx !== -1 ? args[defaultI18nLocaleFileArgIdx] : undefined
  };
  return retrievedValuesFromArgs;
}

/**
 * @throws {Error}
 */
function checkIfArgumentsSeemLegit({ ...args }: MaybeIncorrectTFlagsAssoc) {
  if (Object.values(args).some((arg) => arg === undefined || arg.startsWith('-'))) {
    throw new Error(ERROR_PREFIX + '\n' + 'Wrong arguments.' + '\n');
  }
}

/**
 * @throws {Error}
 */
function checkIfFilesExist({ BLOG_CONFIG_FILE, I18N_DEFAULT_LOCALE_FILE, POSTS_FOLDER }: TFlagsAssoc) {
  const blogConfigFileExists = fs.existsSync(BLOG_CONFIG_FILE);
  if (!blogConfigFileExists) {
    throw new Error(ERROR_PREFIX + '\n' + "Can't open the blog config file!" + '\n');
  }

  const i18nDefaultLocaleFileExists = fs.existsSync(I18N_DEFAULT_LOCALE_FILE);
  if (!i18nDefaultLocaleFileExists) {
    throw new Error(ERROR_PREFIX + '\n' + "Can't open the default locale i18n file!" + '\n');
  }

  const postsFolderExists = fs.existsSync(POSTS_FOLDER);
  if (!postsFolderExists) {
    throw new Error(ERROR_PREFIX + '\n' + "Can't open the posts folder!" + '\n');
  }

  const postsFolderIsDirectory = fs.statSync(POSTS_FOLDER).isDirectory();
  if (!postsFolderIsDirectory) {
    throw new Error(ERROR_PREFIX + '\n' + 'The posts folder you indicated is NOT a directory!' + '\n');
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
