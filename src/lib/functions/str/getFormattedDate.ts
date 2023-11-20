import type { LanguageFlag } from '##/types/hell/i18n';
import capitalize from './capitalize';

export const getFormattedDate = (language: LanguageFlag, date: Date, giveTime: boolean = false): string =>
  capitalize(new Intl.DateTimeFormat(language, { dateStyle: 'full', ...(giveTime ? { timeStyle: 'short' } : {}) }).format(date).toString());

export default getFormattedDate;
