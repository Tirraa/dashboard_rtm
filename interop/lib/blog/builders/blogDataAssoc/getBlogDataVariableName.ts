import capitalize from '../../../../../src/lib/app-agnostic/str/capitalize';
import pluralize from '../../../../../src/lib/app-agnostic/str/pluralize';

export const getBlogDataVariableName = (name: string): string => 'all' + capitalize(pluralize(name));

export default getBlogDataVariableName;
