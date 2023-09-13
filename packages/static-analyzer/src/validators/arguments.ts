import * as fs from 'fs';
import { FLAGS } from '../config/config';
import { ERRORS_SUFFIXES } from '../config/vocab';
import TFlagsAssoc from '../types/flags';

const { ARGUMENTS_PARSER: ERROR_SUFFIX } = ERRORS_SUFFIXES;

function getRetrievedValuesFromArgs(args: string[]): TFlagsAssoc {
  const postsFolderArgIdx = args.indexOf(FLAGS.POSTS_FOLDER) + 1;
  const blogConfigFileArgIdx = args.indexOf(FLAGS.BLOG_CONFIG_FILE) + 1;

  const retrievedValuesFromArgs: TFlagsAssoc = {
    POSTS_FOLDER: args[postsFolderArgIdx],
    BLOG_CONFIG_FILE: args[blogConfigFileArgIdx]
  };
  return retrievedValuesFromArgs;
}

/**
 * @throws {Error}
 */
function checkStaticallyIfArgumentsSeemLegit(retrievedValuesFromArgs: TFlagsAssoc) {
  if (!retrievedValuesFromArgs.POSTS_FOLDER || !retrievedValuesFromArgs.BLOG_CONFIG_FILE) {
    throw new Error('Wrong arguments.' + ' ' + ERROR_SUFFIX);
  }
}

/**
 * @throws {Error}
 */
function checkFilesExist(retrievedValuesFromArgs: TFlagsAssoc) {
  const blogConfigFileDoesExist = fs.existsSync(retrievedValuesFromArgs.BLOG_CONFIG_FILE);
  if (!blogConfigFileDoesExist) {
    throw new Error("Can't open the blog config file!" + ' ' + ERROR_SUFFIX);
  }

  const postsFolderDoesExist = fs.existsSync(retrievedValuesFromArgs.POSTS_FOLDER);
  if (!postsFolderDoesExist) {
    throw new Error("Can't open the posts folder!" + ' ' + ERROR_SUFFIX);
  }

  const postsFolderIsDirectory = fs.statSync(retrievedValuesFromArgs.POSTS_FOLDER).isDirectory();
  if (!postsFolderIsDirectory) {
    throw new Error('The posts folder you indicated is NOT a directory!' + ' ' + ERROR_SUFFIX);
  }
}

function validateArguments(): TFlagsAssoc {
  const args = process.argv.slice(2);
  const retrievedValuesFromArgs = getRetrievedValuesFromArgs(args);

  checkStaticallyIfArgumentsSeemLegit(retrievedValuesFromArgs);
  checkFilesExist(retrievedValuesFromArgs);
  return retrievedValuesFromArgs;
}

export function validateArgumentsThenReturnRetrievedValuesFromArgs() {
  const retrievedValuesFromArgs = validateArguments();
  return retrievedValuesFromArgs;
}

export default validateArgumentsThenReturnRetrievedValuesFromArgs;
