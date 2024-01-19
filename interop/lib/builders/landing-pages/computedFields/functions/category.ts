import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';

import { getFlattenedPathWithoutRootFolder, InvalidArgumentsError, LANDING_PAGES_FOLDER, indexOfNthOccurrence } from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildLandingPageCategoryFromStr(flattenedPath: string) {
  const categBuilder = (flattenedPath: string, firstSlashIndex: number) => flattenedPath.substring(0, firstSlashIndex);

  const firstSlashIndex = indexOfNthOccurrence(flattenedPath, '/', 1);
  if (firstSlashIndex === -1) {
    throw new InvalidArgumentsError(buildLandingPageCategoryFromStr.name, { flattenedPath }, "Can't find any '/' character in flattenedPath");
  }

  const categ = categBuilder(flattenedPath, firstSlashIndex);
  return categ;
}

function buildLandingPageCategoryFromLpObj(lp: DocumentToCompute) {
  const flattenedPath = getFlattenedPathWithoutRootFolder(lp._raw.flattenedPath, LANDING_PAGES_FOLDER);
  return buildLandingPageCategoryFromStr(flattenedPath);
}

const buildLandingPageCategory = (lp: DocumentToCompute) => buildLandingPageCategoryFromLpObj(lp);

export default buildLandingPageCategory;
