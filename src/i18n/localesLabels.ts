/* v8 ignore start */
// Stryker disable all
import type { LanguageLabels } from '@rtm/shared-types/I18n';

const localesLabels: LanguageLabels = {
  fr: 'Français',
  en: 'English'
} as const;

export const localesEmojis: LanguageLabels = {
  en: '🇬🇧',
  fr: '🇫🇷'
} as const;

export default localesLabels;
/* v8 ignore stop */
// Stryker restore all
