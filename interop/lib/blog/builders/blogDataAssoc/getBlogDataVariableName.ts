import { pluralize } from 'inflection';

import { capitalize } from '../../unifiedImport';

const getBlogDataVariableName = (name: string): string => 'all' + capitalize(pluralize(name));

export default getBlogDataVariableName;
