import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { getFlattenedPathWithoutRootFolder, PAGES_FOLDER } from '../../../unifiedImport';

export const INDEX_NEEDLE = 'index';

// {ToDo} Handle withIndexNotationCtx properly, based on the sourceFilePath field
// {ToDo} Handle languages sanitizing properly, based on isValidLanguageFlag
function buildPagePath(page: DocumentToCompute): AppPath {
  const path = getFlattenedPathWithoutRootFolder(page._raw.flattenedPath, PAGES_FOLDER);
  return path;
}

export default buildPagePath;
