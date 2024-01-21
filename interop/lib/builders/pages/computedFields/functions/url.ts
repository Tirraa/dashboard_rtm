import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { ROUTES_ROOTS } from '../../../unifiedImport';
import buildPageLanguageFlag from './language';
import buildPagePath from './path';

function buildPageUrl(page: DocumentToCompute): AppPath {
  const url = ROUTES_ROOTS.WEBSITE + buildPageLanguageFlag(page) + '/' + buildPagePath(page);
  return url;
}

export default buildPageUrl;
