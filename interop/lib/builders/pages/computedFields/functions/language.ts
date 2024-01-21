import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { LanguageFlag } from '@rtm/shared-types/LanguageFlag';

import { getFlattenedPathWithoutRootFolder, indexOfNthOccurrence, isValidLanguageFlag, DEFAULT_LANGUAGE, PAGES_FOLDER } from '../../../unifiedImport';

function buildPageLanguageFlagFromStr(flattenedPath: string): LanguageFlag {
  const envelopeEndSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (envelopeEndSlashIndex === -1) return DEFAULT_LANGUAGE;

  const maybeLanguage = flattenedPath.substring(0, envelopeEndSlashIndex);
  if (isValidLanguageFlag(maybeLanguage)) return maybeLanguage;

  return DEFAULT_LANGUAGE;
}

function buildPageLanguageFlag(page: DocumentToCompute): LanguageFlag {
  const flattenedPath = getFlattenedPathWithoutRootFolder(page._raw.flattenedPath, PAGES_FOLDER);
  const language = buildPageLanguageFlagFromStr(flattenedPath);
  return language;
}

export default buildPageLanguageFlag;
