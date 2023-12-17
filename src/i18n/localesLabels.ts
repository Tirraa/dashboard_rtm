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
