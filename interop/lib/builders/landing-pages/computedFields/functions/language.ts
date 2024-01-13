import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { LanguageFlag } from '@rtm/shared-types/LanguageFlag';

import { getFlattenedPathWithoutRootFolder, indexOfNthOccurrence, LANDING_PAGES_FOLDER, DEFAULT_LANGUAGE } from '../../../unifiedImport';

function buildLandingPageLanguageFlagFromStr(flattenedPath: string): LanguageFlag | string {
  const envelopeBeginSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (envelopeBeginSlashIndex === -1) return DEFAULT_LANGUAGE;

  const envelopeEndSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 2);

  if (envelopeBeginSlashIndex !== -1 && envelopeEndSlashIndex !== -1) {
    const language = flattenedPath.substring(envelopeBeginSlashIndex + 1, envelopeEndSlashIndex);
    return language;
  }
  return DEFAULT_LANGUAGE;
}

function buildLandingPageLanguageFlag(lp: DocumentToCompute): LanguageFlag | string {
  const flattenedPath = getFlattenedPathWithoutRootFolder(lp._raw.flattenedPath, LANDING_PAGES_FOLDER);
  const language = buildLandingPageLanguageFlagFromStr(flattenedPath);
  return language;
}

export default buildLandingPageLanguageFlag;
