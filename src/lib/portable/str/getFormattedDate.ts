import type { LanguageFlag } from '@rtm/shared-types/I18n';

import capitalize from './capitalize';

// Stryker Workaround 1. Pointless mutant (no coverage on giveTime: boolean = true).
// Stryker disable next-line BooleanLiteral
const getFormattedDate = (language: LanguageFlag, date: Date, giveTime: boolean = false): string =>
  capitalize(new Intl.DateTimeFormat(language, { dateStyle: 'full', ...(giveTime ? { timeStyle: 'short' } : {}) }).format(date).toString());

export default getFormattedDate;
