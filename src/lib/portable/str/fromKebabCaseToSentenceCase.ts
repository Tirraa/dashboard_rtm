import capitalize from './capitalize';

const fromKebabCaseToSentenceCase = (str: string) => capitalize(str.replace(/-+/g, ' '));

export default fromKebabCaseToSentenceCase;
