/* v8 ignore start */
// Stryker disable all

import { pluralize } from 'inflection';

import { capitalize } from '../../unifiedImport';

// * ... Adapter (narrowing)
// * ... https://github.com/contentlayerdev/contentlayer/blob/main/packages/%40contentlayer/core/src/generation/common.ts#L7
const getBlogDataVariableName = (name: string): string => 'all' + capitalize(pluralize(name));

export default getBlogDataVariableName;

// Stryker restore all
/* v8 ignore stop */
