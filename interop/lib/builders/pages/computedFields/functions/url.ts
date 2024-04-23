import type { DocumentToCompute } from '@rtm/shared-types/ContentlayerConfig';
import type { AppPath } from '@rtm/shared-types/Next';

import { ROUTES_ROOTS, INDEX_TOKEN } from '../../../unifiedImport';
import buildPageLanguageFlag from './language';
import buildPagePath from './path';

function buildPageUrl(page: DocumentToCompute): AppPath {
  const part1 = ROUTES_ROOTS.WEBSITE + buildPageLanguageFlag(page);
  const part2 = '/' + buildPagePath(page);
  const endingWithIndexTokenNeedle = '/' + INDEX_TOKEN;
  // eslint-disable-next-line no-magic-numbers
  const url = part2.endsWith(endingWithIndexTokenNeedle) ? part1 + part2.slice(0, -endingWithIndexTokenNeedle.length) : part1 + part2;
  return url;
}

export default buildPageUrl;
