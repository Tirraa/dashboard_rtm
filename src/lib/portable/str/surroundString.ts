const surroundString = (str: string, envelope: string): string =>
  (!str.startsWith(envelope) ? envelope : '') + str + (!str.endsWith(envelope) ? envelope : '');

export default surroundString;
