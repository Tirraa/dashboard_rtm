import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { UnknownLandingPageSlug } from '@/types/LandingPage';

import { InvalidArgumentsError } from '../../../unifiedImport';
import buildLandingPageCategory from './category';

/**
 * @throws {InvalidArgumentsError}
 */
function buildLandingPageSlugFromStr(flattenedPath: string): UnknownLandingPageSlug {
  const slugBuilder = (flattenedPath: string, lastSlashIndex: number): UnknownLandingPageSlug =>
    flattenedPath.substring(lastSlashIndex + 1) as UnknownLandingPageSlug;

  const lastSlashIndex = flattenedPath.lastIndexOf('/');

  if (lastSlashIndex === -1) {
    throw new InvalidArgumentsError(buildLandingPageSlugFromStr.name, { flattenedPath }, "Can't find any '/' character in flattenedPath");
  }

  if (lastSlashIndex === flattenedPath.length - 1) {
    throw new InvalidArgumentsError(
      buildLandingPageSlugFromStr.name,
      { flattenedPath },
      "Can't find anything after the last '/' character in flattenedPath"
    );
  }

  const slug = slugBuilder(flattenedPath, lastSlashIndex);
  return slug;
}

export function buildLandingPageSlugFromLpObj(lp: DocumentToCompute): UnknownLandingPageSlug {
  const { flattenedPath } = lp._raw;
  return buildLandingPageSlugFromStr(flattenedPath);
}

const buildLandingPageSlug = (lp: DocumentToCompute): UnknownLandingPageSlug =>
  buildLandingPageCategory(lp) + '-' + buildLandingPageSlugFromLpObj(lp);

export default buildLandingPageSlug;
