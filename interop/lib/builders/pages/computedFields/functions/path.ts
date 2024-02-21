import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { getFlattenedPathWithoutRootFolder, isValidLanguageFlag, PAGES_FOLDER, INDEX_TOKEN } from '../../../unifiedImport';

function buildPagePath(page: DocumentToCompute): AppPath {
  const { flattenedPath } = page._raw;
  const indexOfFirstSlash = flattenedPath.indexOf('/');
  // eslint-disable-next-line no-magic-numbers
  if (indexOfFirstSlash === -1) return INDEX_TOKEN;

  const documentPath = getFlattenedPathWithoutRootFolder(flattenedPath, PAGES_FOLDER);
  const documentPathParts = documentPath.split('/');
  // eslint-disable-next-line no-magic-numbers
  const maybeLanguage = documentPathParts[0];

  if (isValidLanguageFlag(maybeLanguage)) {
    // eslint-disable-next-line no-magic-numbers
    const documentPathWithoutLanguage = documentPathParts.join('/').substring(maybeLanguage.length + 1);
    if (documentPathWithoutLanguage === '') return INDEX_TOKEN;
    return documentPathWithoutLanguage;
  }
  return documentPath;
}

export default buildPagePath;
