import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { UnknownLandingPageSlug } from '@/types/LandingPage';
import type { Index } from '@rtm/shared-types/Numbers';

import { throwIfForbiddenToUseIndexErrorLpCtx, getPathWithIndexSuffix } from '../../../unifiedImport';
import buildLandingPageCategory from './category';

/**
 * @throws {InvalidArgumentsError}
 */
function buildLandingPageSlugFromStr(flattenedPath: string): UnknownLandingPageSlug {
  const slugBuilder = (flattenedPath: string, lastSlashIndex: Index): UnknownLandingPageSlug =>
    // eslint-disable-next-line no-magic-numbers
    flattenedPath.substring(lastSlashIndex + 1) as UnknownLandingPageSlug;

  const lastSlashIndex = flattenedPath.lastIndexOf('/');

  const slug = slugBuilder(flattenedPath, lastSlashIndex);
  return slug;
}

export function buildLandingPageSlugFromLpObj(lp: DocumentToCompute): UnknownLandingPageSlug {
  const { sourceFilePath, flattenedPath } = lp._raw;

  throwIfForbiddenToUseIndexErrorLpCtx(sourceFilePath);

  const transformedFlattenedPath = getPathWithIndexSuffix(flattenedPath, sourceFilePath);

  const landingPageSlug = buildLandingPageSlugFromStr(transformedFlattenedPath);
  return landingPageSlug;
}

const buildLandingPageSlug = (lp: DocumentToCompute): UnknownLandingPageSlug =>
  buildLandingPageCategory(lp) + '-' + buildLandingPageSlugFromLpObj(lp);

export default buildLandingPageSlug;
