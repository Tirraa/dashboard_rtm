import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { getFlattenedPathWithoutRootFolder, isValidLanguageFlag, INDEX_TOKEN, PAGES_FOLDER } from '../../../unifiedImport';

function buildPagePath(page: DocumentToCompute): AppPath {
  const flattenedPath = page._raw.flattenedPath;
  const indexOfFirstSlash = flattenedPath.indexOf('/');
  if (indexOfFirstSlash === -1 || indexOfFirstSlash === flattenedPath.length - 1) return INDEX_TOKEN;

  const documentPath = getFlattenedPathWithoutRootFolder(flattenedPath, PAGES_FOLDER);
  const documentPathParts = documentPath.split('/');
  const maybeLanguage = documentPathParts[0];

  if (isValidLanguageFlag(maybeLanguage)) {
    const documentPathWithoutLanguage = documentPathParts.join('/').substring(maybeLanguage.length + 1);
    if (documentPathWithoutLanguage === '') return INDEX_TOKEN;
    return documentPathWithoutLanguage;
  }
  return documentPath;
}

export default buildPagePath;
