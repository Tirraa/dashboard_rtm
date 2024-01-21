import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { getFlattenedPathWithoutRootFolder, indexOfNthOccurrence, isValidLanguageFlag, PAGES_FOLDER } from '../../../unifiedImport';

function buildPagePath(page: DocumentToCompute): AppPath {
  const path = getFlattenedPathWithoutRootFolder(page._raw.flattenedPath, PAGES_FOLDER);
  const maybeLanguageEnvelopeEndSlashIndex = indexOfNthOccurrence(path, '/', 1);

  if (maybeLanguageEnvelopeEndSlashIndex !== -1) {
    const maybeLanguage = path.substring(0, maybeLanguageEnvelopeEndSlashIndex);
    if (isValidLanguageFlag(maybeLanguage)) return path.substring(maybeLanguage.length + 1);
  }
  return path;
}

export default buildPagePath;
