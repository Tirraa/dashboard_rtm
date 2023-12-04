import type { LanguageLabels } from '##/types/magic/I18n';

export const localesLabels: LanguageLabels = {
  en: 'English',
  fr: 'Français'
} as const;

export const localesEmojis: LanguageLabels = {
  en: '🇬🇧',
  fr: '🇫🇷'
} as const;

export default localesLabels;
