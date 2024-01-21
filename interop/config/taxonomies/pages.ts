/* v8 ignore start */
// Stryker disable all

import type { PathSegment } from '@rtm/shared-types/Next';

namespace PageTaxonomy {
  export const PATH = 'path';
}

export type TPageTaxonomy = {
  [PageTaxonomy.PATH]: PathSegment[];
};

// export default PageTaxonomy;

// Stryker restore all
/* v8 ignore stop */
