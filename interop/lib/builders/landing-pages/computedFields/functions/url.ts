import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import {
  getFlattenedPathWithoutRootFolder,
  InvalidArgumentsError,
  LANDING_PAGES_FOLDER,
  DEFAULT_LANGUAGE,
  ROUTES_ROOTS
} from '../../../unifiedImport';

function buildLandingPageUrl(lp: DocumentToCompute): AppPath {
  const OPTIONAL_LOCALE_PART_INDEX = 1;
  const root = ROUTES_ROOTS.LANDING_PAGES;

  const flattenedPath = getFlattenedPathWithoutRootFolder(lp._raw.flattenedPath, LANDING_PAGES_FOLDER);
  const flattenedPathParts = flattenedPath.split('/');

  if (flattenedPathParts.length !== 3 && flattenedPathParts.length !== 2) {
    throw new InvalidArgumentsError(
      buildLandingPageUrl.name,
      { flattenedPath },
      `Invalid flattenedPath! Expected 2 or 3 parts, but got: ${flattenedPathParts.length}.`
    );
  }

  if (flattenedPathParts.length <= OPTIONAL_LOCALE_PART_INDEX + 1) {
    const url = '/' + DEFAULT_LANGUAGE + root + flattenedPathParts.join('-');
    return url;
  }

  const localePart = flattenedPathParts[OPTIONAL_LOCALE_PART_INDEX];
  flattenedPathParts.splice(OPTIONAL_LOCALE_PART_INDEX, 1);
  const url = '/' + localePart + root + flattenedPathParts.join('-');
  return url;
}

export default buildLandingPageUrl;
