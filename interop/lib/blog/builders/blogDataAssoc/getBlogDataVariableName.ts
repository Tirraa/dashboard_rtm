import capitalize from '../../../../../src/lib/functions/str/capitalize';
import pluralize from '../../../../../src/lib/functions/str/pluralize';

export const getBlogDataVariableName = (name: string): string => 'all' + capitalize(pluralize(name));

export default getBlogDataVariableName;
