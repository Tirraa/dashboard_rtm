import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import {
  throwIfForbiddenToUseIndexErrorLpCtx,
  getFlattenedPathWithoutRootFolder,
  InvalidArgumentsError,
  LANDING_PAGES_FOLDER,
  DEFAULT_LANGUAGE,
  ROUTES_ROOTS
} from '../../../unifiedImport';

function buildLandingPageUrl(lp: DocumentToCompute): AppPath {
  const { sourceFilePath, flattenedPath } = lp._raw;

  throwIfForbiddenToUseIndexErrorLpCtx(sourceFilePath);

  const OPTIONAL_LOCALE_PART_INDEX = 1;
  const root = ROUTES_ROOTS.LANDING_PAGES;

  const path = getFlattenedPathWithoutRootFolder(flattenedPath, LANDING_PAGES_FOLDER);
  const pathParts = path.split('/');

  if (pathParts.length !== 2 && pathParts.length !== 3) {
    throw new InvalidArgumentsError(
      buildLandingPageUrl.name,
      { flattenedPath },
      `Invalid flattenedPath! Expected 2 or 3 parts, but got: ${pathParts.length}.`
    );
  }

  if (pathParts.length <= OPTIONAL_LOCALE_PART_INDEX + 1) {
    const url = '/' + DEFAULT_LANGUAGE + root + pathParts.join('-');
    return url;
  }

  const localePart = pathParts[OPTIONAL_LOCALE_PART_INDEX];
  pathParts.splice(OPTIONAL_LOCALE_PART_INDEX, 1);
  const url = '/' + localePart + root + pathParts.join('-');
  return url;
}

export default buildLandingPageUrl;
