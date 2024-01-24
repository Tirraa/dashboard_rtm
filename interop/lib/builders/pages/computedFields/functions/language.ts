import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { LanguageFlag } from '@rtm/shared-types/LanguageFlag';

import { getFlattenedPathWithoutRootFolder, isValidLanguageFlag, DEFAULT_LANGUAGE, PAGES_FOLDER } from '../../../unifiedImport';

function buildPageLanguageFlagFromStr(flattenedPath: string): LanguageFlag {
  const maybeLanguageEnvelopeEndSlashIndex = flattenedPath.indexOf('/');
  if (maybeLanguageEnvelopeEndSlashIndex === -1) return DEFAULT_LANGUAGE;

  const maybeLanguage = flattenedPath.substring(0, maybeLanguageEnvelopeEndSlashIndex);
  if (isValidLanguageFlag(maybeLanguage)) return maybeLanguage;

  return DEFAULT_LANGUAGE;
}

function buildPageLanguageFlag(page: DocumentToCompute): LanguageFlag {
  const orgFlattenedPath = page._raw.flattenedPath;
  const maybeLanguageEnvelopeEndSlashIndex = orgFlattenedPath.indexOf('/');
  if (maybeLanguageEnvelopeEndSlashIndex === -1) return DEFAULT_LANGUAGE;

  const flattenedPath = getFlattenedPathWithoutRootFolder(orgFlattenedPath, PAGES_FOLDER);
  const language = buildPageLanguageFlagFromStr(flattenedPath);
  return language;
}

export default buildPageLanguageFlag;
