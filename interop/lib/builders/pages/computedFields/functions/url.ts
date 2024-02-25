import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { INDEX_TOKEN, ROUTES_ROOTS } from '../../../unifiedImport';
import buildPageLanguageFlag from './language';
import buildPagePath from './path';

function buildPageUrl(page: DocumentToCompute): AppPath {
  const part1 = ROUTES_ROOTS.WEBSITE + buildPageLanguageFlag(page);
  const part2 = '/' + buildPagePath(page);
  const url =
    part2 === '/' + INDEX_TOKEN
      ? ROUTES_ROOTS.WEBSITE + buildPageLanguageFlag(page)
      : ROUTES_ROOTS.WEBSITE + buildPageLanguageFlag(page) + '/' + buildPagePath(page);
  return url;
}

export default buildPageUrl;
