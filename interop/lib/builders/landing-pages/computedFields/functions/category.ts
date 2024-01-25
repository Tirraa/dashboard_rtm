import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { UnknownLandingPageCategory } from '@/types/LandingPage';

import { getFlattenedPathWithoutRootFolder, InvalidArgumentsError, LANDING_PAGES_FOLDER } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildLandingPageCategoryFromStr(flattenedPath: string): UnknownLandingPageCategory {
  const categBuilder = (flattenedPath: string, firstSlashIndex: number) => flattenedPath.substring(0, firstSlashIndex);

  const firstSlashIndex = flattenedPath.indexOf('/');
  if (firstSlashIndex === -1) {
    throw new InvalidArgumentsError(buildLandingPageCategoryFromStr.name, { flattenedPath }, "Can't find any '/' character in flattenedPath");
  }

  const categ = categBuilder(flattenedPath, firstSlashIndex);
  return categ;
}

function buildLandingPageCategoryFromLpObj(lp: DocumentToCompute): UnknownLandingPageCategory {
  const flattenedPath = getFlattenedPathWithoutRootFolder(lp._raw.flattenedPath, LANDING_PAGES_FOLDER);
  const landingPageCategory = buildLandingPageCategoryFromStr(flattenedPath);
  return landingPageCategory;
}

const buildLandingPageCategory = (lp: DocumentToCompute): UnknownLandingPageCategory => buildLandingPageCategoryFromLpObj(lp);

export default buildLandingPageCategory;
