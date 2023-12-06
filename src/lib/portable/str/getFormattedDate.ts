import type { LanguageFlag } from '##/types/magic/I18n';
import capitalize from './capitalize';

const getFormattedDate = (language: LanguageFlag, date: Date, giveTime: boolean = false): string =>
  capitalize(new Intl.DateTimeFormat(language, { dateStyle: 'full', ...(giveTime ? { timeStyle: 'short' } : {}) }).format(date).toString());

export default getFormattedDate;
