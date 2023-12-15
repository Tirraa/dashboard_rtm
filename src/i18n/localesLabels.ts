import type { LanguageLabels } from '@rtm/shared-types/I18n';

const localesLabels: LanguageLabels = {
  en: 'English',
  fr: 'Français'
} as const;

export const localesEmojis: LanguageLabels = {
  en: '🇬🇧',
  fr: '🇫🇷'
} as const;

export default localesLabels;
