import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { UnknownLandingPageSlug } from '@/types/LandingPage';

import { throwIfForbiddenToUseIndexErrorLpCtx } from '../../../unifiedImport';
import buildLandingPageCategory from './category';

/**
 * @throws {InvalidArgumentsError}
 */
function buildLandingPageSlugFromStr(flattenedPath: string): UnknownLandingPageSlug {
  const slugBuilder = (flattenedPath: string, lastSlashIndex: number): UnknownLandingPageSlug =>
    flattenedPath.substring(lastSlashIndex + 1) as UnknownLandingPageSlug;

  const lastSlashIndex = flattenedPath.lastIndexOf('/');

  const slug = slugBuilder(flattenedPath, lastSlashIndex);
  return slug;
}

export function buildLandingPageSlugFromLpObj(lp: DocumentToCompute): UnknownLandingPageSlug {
  const { sourceFilePath, flattenedPath } = lp._raw;

  throwIfForbiddenToUseIndexErrorLpCtx(sourceFilePath);

  const landingPageSlug = buildLandingPageSlugFromStr(flattenedPath);
  return landingPageSlug;
}

const buildLandingPageSlug = (lp: DocumentToCompute): UnknownLandingPageSlug =>
  buildLandingPageCategory(lp) + '-' + buildLandingPageSlugFromLpObj(lp);

export default buildLandingPageSlug;
