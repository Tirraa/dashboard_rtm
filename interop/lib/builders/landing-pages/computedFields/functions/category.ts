import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { UnknownLandingPageCategory } from '@/types/LandingPage';

import {
  throwIfForbiddenToUseIndexErrorLpCtx,
  getFlattenedPathWithoutRootFolder,
  getPathWithIndexSuffix,
  LANDING_PAGES_FOLDER
} from '../../../unifiedImport';

/**
 * @throws {InvalidArgumentsError}
 */
function buildLandingPageCategoryFromStr(flattenedPath: string): UnknownLandingPageCategory {
  const categBuilder = (flattenedPath: string, firstSlashIndex: number) => flattenedPath.substring(0, firstSlashIndex);

  const firstSlashIndex = flattenedPath.indexOf('/');

  const categ = categBuilder(flattenedPath, firstSlashIndex);
  return categ;
}

function buildLandingPageCategoryFromLpObj(lp: DocumentToCompute): UnknownLandingPageCategory {
  const { sourceFilePath, flattenedPath } = lp._raw;

  throwIfForbiddenToUseIndexErrorLpCtx(sourceFilePath);

  const transformedFlattenedPath = getPathWithIndexSuffix(flattenedPath, sourceFilePath);

  const path = getFlattenedPathWithoutRootFolder(transformedFlattenedPath, LANDING_PAGES_FOLDER);
  const landingPageCategory = buildLandingPageCategoryFromStr(path);
  return landingPageCategory;
}

const buildLandingPageCategory = (lp: DocumentToCompute): UnknownLandingPageCategory => buildLandingPageCategoryFromLpObj(lp);

export default buildLandingPageCategory;
