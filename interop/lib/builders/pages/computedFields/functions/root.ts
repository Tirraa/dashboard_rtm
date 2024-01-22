import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { getFlattenedPathWithoutRootFolder, indexOfNthOccurrence, isValidLanguageFlag, PAGES_FOLDER } from '../../../unifiedImport';

function buildPageRoot(page: DocumentToCompute): AppPath {
  let path = getFlattenedPathWithoutRootFolder(page._raw.flattenedPath, PAGES_FOLDER);
  const maybeLanguageEnvelopeEndSlashIndex = indexOfNthOccurrence(path, '/', 1);

  if (maybeLanguageEnvelopeEndSlashIndex !== -1) {
    const maybeLanguage = path.substring(0, maybeLanguageEnvelopeEndSlashIndex);
    if (isValidLanguageFlag(maybeLanguage)) path = path.substring(maybeLanguage.length + 1);
  }

  const maybeRootEnvelopeEndSlashIndex = indexOfNthOccurrence(path, '/', 1);
  if (maybeRootEnvelopeEndSlashIndex === -1) return '';
  const root = path.substring(0, maybeRootEnvelopeEndSlashIndex);
  return root;
}

export default buildPageRoot;