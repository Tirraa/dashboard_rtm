import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { LanguageFlag } from '@rtm/shared-types/LanguageFlag';

import {
  getFlattenedPathWithoutRootFolder,
  getPathWithIndexSuffix,
  isValidLanguageFlag,
  DEFAULT_LANGUAGE,
  PAGES_FOLDER
} from '../../../unifiedImport';

function buildPageLanguageFlagFromStr(flattenedPath: string): LanguageFlag {
  const maybeLanguageEnvelopeEndSlashIndex = flattenedPath.indexOf('/');
  if (maybeLanguageEnvelopeEndSlashIndex === -1) return DEFAULT_LANGUAGE;

  const maybeLanguage = flattenedPath.substring(0, maybeLanguageEnvelopeEndSlashIndex);
  if (isValidLanguageFlag(maybeLanguage)) return maybeLanguage;

  return DEFAULT_LANGUAGE;
}

function buildPageLanguageFlag(page: DocumentToCompute): LanguageFlag {
  const { sourceFilePath, flattenedPath } = page._raw;

  const transformedFlattenedPath = getPathWithIndexSuffix(flattenedPath, sourceFilePath);
  const path = getFlattenedPathWithoutRootFolder(transformedFlattenedPath, PAGES_FOLDER);

  const maybeLanguageEnvelopeEndSlashIndex = path.indexOf('/');
  if (maybeLanguageEnvelopeEndSlashIndex === -1) return DEFAULT_LANGUAGE;

  const language = buildPageLanguageFlagFromStr(path);
  return language;
}

export default buildPageLanguageFlag;
