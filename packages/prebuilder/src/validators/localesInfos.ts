import type { MaybeEmptyErrorsDetectionFeedback, ErrorsDetectionFeedback, Path } from '../types/Metadatas';
import type { VocabKey } from '../config/translations';

import retrieveLocaleFileInfosMetadatas from '../metadatas-builders/retrieveLocaleFileInfosMetadatas';
import { LOCALES_LNG_INFOS_KEY, LIST_ELEMENT_PREFIX } from '../config';
import formatMessage from '../config/formatMessage';

// https://github.com/vitest-dev/vitest/discussions/2484
const fs = require('fs/promises');
const path = require('path');

const localesExtension = '.ts';

async function localeFileInfosValidator(localeFilePath: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback: ErrorsDetectionFeedback = '';

  const localeMetadatas = await retrieveLocaleFileInfosMetadatas(localeFilePath);
  const expectedLocaleCode = path.basename(localeFilePath, localesExtension);
  const localeCode = localeMetadatas[LOCALES_LNG_INFOS_KEY];

  if (!localeCode) {
    feedback += formatMessage('localesInfosEmptyOrMissing' satisfies VocabKey, { localeFilePath });
  } else if (expectedLocaleCode !== localeCode) {
    feedback += formatMessage('localesInfosMismatch' satisfies VocabKey, { expectedLocaleCode, localeFilePath, localeCode });
  }

  return feedback;
}

/**
 * @throws {BuilderError}
 */
export default async function localesInfosValidator(localesFolder: Path, i18nSchemaFilePath: Path): Promise<MaybeEmptyErrorsDetectionFeedback> {
  let feedback: ErrorsDetectionFeedback = '';

  const files: string[] = await fs.readdir(localesFolder);
  const filteredFiles = files.filter((file: string) => path.extname(file) === '.ts' && path.basename(file) !== path.basename(i18nSchemaFilePath));
  const fullFilesPaths = filteredFiles.map((filename) => path.join(localesFolder, filename));
  const localeFileInfosValidatorFeedbacks = [];

  for (const currentFile of fullFilesPaths) {
    try {
      const currentFeedback = await localeFileInfosValidator(currentFile);
      if (currentFeedback) localeFileInfosValidatorFeedbacks.push(currentFeedback);
    } catch (error) {
      throw error;
    }
  }

  if (localeFileInfosValidatorFeedbacks.length > 0) {
    feedback +=
      localeFileInfosValidatorFeedbacks.length > 1
        ? `${LIST_ELEMENT_PREFIX}${localeFileInfosValidatorFeedbacks
            .map((localeFileInfosValidatorFeedback) =>
              localeFileInfosValidatorFeedback.replaceAll(
                '\n',
                '\n' + ' '.repeat(LIST_ELEMENT_PREFIX.length - LIST_ELEMENT_PREFIX.split('\n').length + 1)
              )
            )
            .join(LIST_ELEMENT_PREFIX)}` + '\n'
        : localeFileInfosValidatorFeedbacks[0] + '\n';
  }
  return feedback;
}
