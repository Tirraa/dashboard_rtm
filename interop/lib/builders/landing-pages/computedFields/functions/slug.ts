import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { UnknownLandingPageSlug } from '@/types/LandingPage';

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

export const buildLandingPageCategory = (lp: DocumentToCompute) => buildLandingPageCategoryFromLpObj(lp);

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
  [buildLandingPageCategory(lp), buildLandingPageSlugFromLpObj(lp)].join('-');

export default buildLandingPageSlug;
