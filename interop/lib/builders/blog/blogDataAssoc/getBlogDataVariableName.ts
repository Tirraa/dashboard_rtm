/* v8 ignore start */
// Stryker disable all
import { pluralize } from 'inflection';

import { capitalize } from '../../unifiedImport';

const getBlogDataVariableName = (name: string): string => 'all' + capitalize(pluralize(name));

export default getBlogDataVariableName;
// Stryker restore all
/* v8 ignore stop */
