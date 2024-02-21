import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { getFlattenedPathWithoutRootFolder, isValidLanguageFlag, PAGES_FOLDER } from '../../../unifiedImport';

const TOP_LEVEL_ROOT = '/';

function buildPageRoot(page: DocumentToCompute): AppPath {
  const { flattenedPath } = page._raw;
  const flattenedPathFirstSlashIndex = flattenedPath.indexOf('/');
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (flattenedPathFirstSlashIndex === -1) return TOP_LEVEL_ROOT;

  let path = getFlattenedPathWithoutRootFolder(page._raw.flattenedPath, PAGES_FOLDER);
  const maybeLanguageEnvelopeEndSlashIndex = path.indexOf('/');

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (maybeLanguageEnvelopeEndSlashIndex !== -1) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const maybeLanguage = path.substring(0, maybeLanguageEnvelopeEndSlashIndex);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (isValidLanguageFlag(maybeLanguage)) path = path.substring(maybeLanguage.length + 1);
  }

  const maybeRootEnvelopeEndSlashIndex = path.indexOf('/');
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (maybeRootEnvelopeEndSlashIndex === -1) return TOP_LEVEL_ROOT;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const root = path.substring(0, maybeRootEnvelopeEndSlashIndex);
  return root;
}

export default buildPageRoot;
