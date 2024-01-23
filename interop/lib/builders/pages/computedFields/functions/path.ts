import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { getFlattenedPathWithoutRootFolder, indexOfNthOccurrence, isValidLanguageFlag, PAGES_FOLDER } from '../../../unifiedImport';

export const INDEX_NEEDLE = 'index';

function buildPagePath(page: DocumentToCompute): AppPath {
  let path = getFlattenedPathWithoutRootFolder(page._raw.flattenedPath, PAGES_FOLDER);
  let withIndexNotationCtx = false;

  if (path.endsWith('/' + INDEX_NEEDLE)) {
    path = path.slice(0, -INDEX_NEEDLE.length - 1);
    withIndexNotationCtx = true;
  } else if (path.endsWith(INDEX_NEEDLE)) {
    path = path.slice(0, -INDEX_NEEDLE.length);
    withIndexNotationCtx = true;
  }

  const maybeLanguageEnvelopeEndSlashIndex = indexOfNthOccurrence(path, '/', 1);
  if (maybeLanguageEnvelopeEndSlashIndex !== -1) {
    const maybeLanguage = path.substring(0, maybeLanguageEnvelopeEndSlashIndex);
    if (isValidLanguageFlag(maybeLanguage)) return path.substring(maybeLanguage.length + 1);
  } else if (withIndexNotationCtx && isValidLanguageFlag(path)) return INDEX_NEEDLE;

  return path;
}

export default buildPagePath;
