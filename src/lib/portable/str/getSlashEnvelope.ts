import surroundString from './surroundString';

const getSlashEnvelope = (str: string): string => surroundString(str, '/');
export default getSlashEnvelope;
