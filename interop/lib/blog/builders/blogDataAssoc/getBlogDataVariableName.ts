import { capitalize, pluralize } from '../../unifiedImport';

const getBlogDataVariableName = (name: string): string => 'all' + capitalize(pluralize(name));

export default getBlogDataVariableName;
