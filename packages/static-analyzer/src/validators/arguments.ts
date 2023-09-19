import * as fs from 'fs';
import { FLAGS } from '../config/config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import TFlagsAssoc from '../types/flags';

const { ARGUMENTS_PARSER: ERROR_SUFFIX } = CRITICAL_ERRORS_STR;

function getRetrievedValuesFromArgs(args: string[]): TFlagsAssoc {
  const postsFolderArgIdx = args.indexOf(FLAGS.POSTS_FOLDER) + 1;
  const blogConfigFileArgIdx = args.indexOf(FLAGS.BLOG_CONFIG_FILE) + 1;
  const i18nConfigFileArgIdx = args.indexOf(FLAGS.I18N_DEFAULT_LOCALE_FILE) + 1;

  const retrievedValuesFromArgs: TFlagsAssoc = {
    POSTS_FOLDER: args[postsFolderArgIdx],
    BLOG_CONFIG_FILE: args[blogConfigFileArgIdx],
    I18N_DEFAULT_LOCALE_FILE: args[i18nConfigFileArgIdx]
  };
  return retrievedValuesFromArgs;
}

/**
 * @throws {Error}
 */
function checkIfArgumentsSeemLegit({ ...args }: TFlagsAssoc) {
  if (Object.values(args).some((arg) => arg === undefined)) {
    throw new Error('Wrong arguments.' + ' ' + ERROR_SUFFIX);
  }
}

/**
 * @throws {Error}
 */
function checkIfFilesExist({ BLOG_CONFIG_FILE, I18N_DEFAULT_LOCALE_FILE, POSTS_FOLDER }: TFlagsAssoc) {
  const blogConfigFileDoesExist = fs.existsSync(BLOG_CONFIG_FILE);
  if (!blogConfigFileDoesExist) {
    throw new Error("Can't open the blog config file!" + ' ' + ERROR_SUFFIX);
  }

  const i18nConfigFileDoesExist = fs.existsSync(I18N_DEFAULT_LOCALE_FILE);
  if (!i18nConfigFileDoesExist) {
    throw new Error("Can't open the i18n config file!" + ' ' + ERROR_SUFFIX);
  }

  const postsFolderDoesExist = fs.existsSync(POSTS_FOLDER);
  if (!postsFolderDoesExist) {
    throw new Error("Can't open the posts folder!" + ' ' + ERROR_SUFFIX);
  }

  const postsFolderIsDirectory = fs.statSync(POSTS_FOLDER).isDirectory();
  if (!postsFolderIsDirectory) {
    throw new Error('The posts folder you indicated is NOT a directory!' + ' ' + ERROR_SUFFIX);
  }
}

function validateArguments(): TFlagsAssoc {
  const args = process.argv.slice(2);
  const retrievedValuesFromArgs = getRetrievedValuesFromArgs(args);

  checkIfArgumentsSeemLegit(retrievedValuesFromArgs);
  checkIfFilesExist(retrievedValuesFromArgs);
  return retrievedValuesFromArgs;
}

export function validateArgumentsThenReturnRetrievedValuesFromArgs() {
  const retrievedValuesFromArgs = validateArguments();
  return retrievedValuesFromArgs;
}

export default validateArgumentsThenReturnRetrievedValuesFromArgs;
