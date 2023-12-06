import { readdirSync } from 'fs';
import path from 'path';
import { LIST_ELEMENT_PREFIX, LOCALES_INFOS_ROOT_KEY, LOCALES_LNG_INFOS_KEY } from '../config';
import { CRITICAL_ERRORS_STR } from '../config/vocab';
import BuilderError from '../errors/exceptions/BuilderError';
import { prefixFeedback } from '../lib/feedbacksMerge';
import retrieveLocaleFileInfosMetadatas from '../metadatas-builders/retrieveLocaleFileInfosMetadatas';
import type { ErrorsDetectionFeedback, MaybeEmptyErrorsDetectionFeedback, Path } from '../types/metadatas';

const localesExtension = '.ts';
const { FAILED_TO_PASS: ERROR_PREFIX } = CRITICAL_ERRORS_STR;

function localeFileInfosValidator(localeFilePath: string): MaybeEmptyErrorsDetectionFeedback {
  let feedback: ErrorsDetectionFeedback = '';

  const localeMetadatas = retrieveLocaleFileInfosMetadatas(localeFilePath);
  const expectedLocaleCode = path.basename(localeFilePath, localesExtension);
  const localeCode = localeMetadatas[LOCALES_LNG_INFOS_KEY];

  if (!localeCode) {
    feedback += `The '${LOCALES_LNG_INFOS_KEY}' field value is empty or missing in '${LOCALES_INFOS_ROOT_KEY}'! (${localeFilePath})`;
  } else if (expectedLocaleCode !== localeCode) {
    feedback +=
      `The '${LOCALES_INFOS_ROOT_KEY}.${LOCALES_LNG_INFOS_KEY}' field value should match the locale filename! (${localeFilePath})` +
      '\n' +
      `Expected value: '${expectedLocaleCode}', given value: '${localeCode}'`;
  }

  return feedback;
}

/**
 * @throws {BuilderError}
 */
function localesInfosValidator(localesFolder: string, i18nSchemaFilePath: Path): MaybeEmptyErrorsDetectionFeedback {
  const ERROR_PREFIX_TAIL = `(locales files infos)`;
  let feedback: ErrorsDetectionFeedback = '';

  const files: string[] = readdirSync(localesFolder).filter(
    (file) => path.extname(file) === '.ts' && path.basename(file) !== path.basename(i18nSchemaFilePath)
  );
  const fullFilesPaths = files.map((filename) => [localesFolder, filename].join('/'));
  const localeFileInfosValidatorFeedbacks = [];

  for (const currentFile of fullFilesPaths) {
    try {
      const currentFeedback = localeFileInfosValidator(currentFile);
      if (currentFeedback) localeFileInfosValidatorFeedbacks.push(currentFeedback);
    } catch (error) {
      throw error;
    }
  }

  if (localeFileInfosValidatorFeedbacks.length > 0) {
    if (localeFileInfosValidatorFeedbacks.length > 1) {
      feedback +=
        `${LIST_ELEMENT_PREFIX}${localeFileInfosValidatorFeedbacks
          .map((localeFileInfosValidatorFeedback) =>
            localeFileInfosValidatorFeedback.replaceAll(
              '\n',
              '\n' + ' '.repeat(LIST_ELEMENT_PREFIX.length - LIST_ELEMENT_PREFIX.split('\n').length + 1)
            )
          )
          .join(LIST_ELEMENT_PREFIX)}` + '\n';
    } else {
      feedback += '\n' + localeFileInfosValidatorFeedbacks[0] + '\n';
    }
  }
  feedback = prefixFeedback(feedback, ERROR_PREFIX + ' ' + ERROR_PREFIX_TAIL);
  return feedback;
}

export default localesInfosValidator;
