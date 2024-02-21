import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import {
  throwIfForbiddenToUseIndexErrorLpCtx,
  getFlattenedPathWithoutRootFolder,
  getPathWithIndexSuffix,
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

  const transformedFlattenedPath = getPathWithIndexSuffix(flattenedPath, sourceFilePath);

  const path = getFlattenedPathWithoutRootFolder(transformedFlattenedPath, LANDING_PAGES_FOLDER);
  const pathParts = path.split('/');

  // eslint-disable-next-line no-magic-numbers
  if (pathParts.length !== 2 && pathParts.length !== 3) {
    throw new InvalidArgumentsError(buildLandingPageUrl.name, { path }, 'Invalid path! Expected 2 or 3 parts, but got: ' + pathParts.length);
  }

  // eslint-disable-next-line no-magic-numbers
  if (pathParts.length <= OPTIONAL_LOCALE_PART_INDEX + 1) {
    const url = '/' + DEFAULT_LANGUAGE + root + pathParts.join('-');
    return url;
  }

  const localePart = pathParts[OPTIONAL_LOCALE_PART_INDEX];
  // eslint-disable-next-line no-magic-numbers
  pathParts.splice(OPTIONAL_LOCALE_PART_INDEX, 1);
  const url = '/' + localePart + root + pathParts.join('-');
  return url;
}

export default buildLandingPageUrl;
