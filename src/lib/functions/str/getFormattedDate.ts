import type { LanguageFlag } from '##/types/hell/i18n';
import capitalize from './capitalize';

export const getFormattedDate = (lng: LanguageFlag, date: Date, giveTime: boolean = false): string =>
  capitalize(new Intl.DateTimeFormat(lng, { dateStyle: 'full', ...(giveTime ? { timeStyle: 'short' } : {}) }).format(date).toString());

export default getFormattedDate;
