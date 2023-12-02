import surroundString from './surroundString';

export const getSlashEnvelope = (str: string): string => surroundString(str, '/');
export default getSlashEnvelope;
