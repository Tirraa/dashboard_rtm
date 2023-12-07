const endsWithChars = (str: string, endsChar: string) => endsChar.split('').some((char) => str.endsWith(char));

export default endsWithChars;
