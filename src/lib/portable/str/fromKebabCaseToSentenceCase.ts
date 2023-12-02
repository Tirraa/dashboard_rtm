import capitalize from './capitalize';

export const fromKebabCaseToSentenceCase = (str: string) => capitalize(str.replace(/-+/g, ' '));

export default fromKebabCaseToSentenceCase;
