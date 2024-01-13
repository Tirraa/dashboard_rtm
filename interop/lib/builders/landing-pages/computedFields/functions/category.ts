import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { LandingPageCategory } from '@/types/LandingPage';

import { getFlattenedPathWithoutRootFolder, InvalidArgumentsError, indexOfNthOccurrence, LANDING_PAGES_FOLDER } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildLandingPageCategoryFromStr(flattenedPath: string): LandingPageCategory {
  const categBuilder = (flattenedPath: string, firstSlashIndex: number): LandingPageCategory =>
    flattenedPath.substring(0, firstSlashIndex) as LandingPageCategory;

  const firstSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (firstSlashIndex === -1) {
    throw new InvalidArgumentsError(buildLandingPageCategoryFromStr.name, { flattenedPath }, "Can't find any '/' character in flattenedPath");
  }

  const categ = categBuilder(flattenedPath, firstSlashIndex);
  return categ;
}

function buildLandingPageCategoryFromLpObj(lp: DocumentToCompute): LandingPageCategory {
  const flattenedPath = getFlattenedPathWithoutRootFolder(lp._raw.flattenedPath, LANDING_PAGES_FOLDER);
  return buildLandingPageCategoryFromStr(flattenedPath);
}

const buildLandingPageCategory = (lp: DocumentToCompute): LandingPageCategory => buildLandingPageCategoryFromLpObj(lp);

export default buildLandingPageCategory;
