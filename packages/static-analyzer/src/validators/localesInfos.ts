import * as fs from 'fs';
import path from 'path';
import { LOCALES_INFOS_ROOT_KEY, LOCALES_LNG_INFOS_KEY } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import { prefixFeedback } from '../lib/feedbacksMerge';
import retrieveLocaleFileInfosMetadatas from '../metadatas-builders/retrieveLocaleFileInfosMetadatas';
import { ErrorsDetectionFeedback } from '../types/metadatas';

const localesExtension = '.ts';
const { INTERRUPTED: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

function localeFileInfosValidator(localeFilePath: string): '' | ErrorsDetectionFeedback {
  let feedback: ErrorsDetectionFeedback = '';
  const localeMetadatas = retrieveLocaleFileInfosMetadatas(localeFilePath);
  const expectedLocaleCode = path.basename(localeFilePath, localesExtension);
  const localeCode = localeMetadatas[LOCALES_LNG_INFOS_KEY];

  if (!localeCode) {
    feedback += `The '${LOCALES_LNG_INFOS_KEY}' field value is empty or missing in ${LOCALES_INFOS_ROOT_KEY}! (${localeFilePath})` + '\n';
  } else if (expectedLocaleCode !== localeCode) {
    feedback +=
      `The '${LOCALES_LNG_INFOS_KEY}' field value should match the locale filename! (${localeFilePath})` +
      '\n' +
      `Expected value: '${expectedLocaleCode}', given value: '${localeCode}'` +
      '\n';
  }

  return feedback;
}

/**
 * @throws {Error}
 */
export function localesInfosValidator(localesFolder: string): '' | ErrorsDetectionFeedback {
  let feedback: ErrorsDetectionFeedback = '';
  const files: string[] = fs.readdirSync(localesFolder).filter((file) => path.extname(file) === '.ts');

  const fullFilesPaths = files.map((filename) => [localesFolder, filename].join('/'));
  for (const file of fullFilesPaths) {
    try {
      feedback += localeFileInfosValidator(file);
    } catch (error) {
      throw error;
    }
  }

  feedback = prefixFeedback(feedback, ERROR_PREFIX + '\n');
  return feedback;
}

export default localesInfosValidator;
