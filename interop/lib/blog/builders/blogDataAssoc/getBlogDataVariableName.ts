import { capitalize, pluralize } from '../../unifiedImport';

export const getBlogDataVariableName = (name: string): string => 'all' + capitalize(pluralize(name));

export default getBlogDataVariableName;
