/* v8 ignore start */
// Stryker disable all

import formatMessage from 'format-message';

import type { Locale } from './translations';

import translations, { DEFAULT_LOCALE } from './translations';

namespace Ctx {
  export let currentLocale: Locale = DEFAULT_LOCALE;
}

const setup = () =>
  formatMessage.setup({
    locale: Ctx.currentLocale,
    translations
  });

export function changeLocale(locale: Locale) {
  Ctx.currentLocale = locale;
  setup();
}

export const getCurrentLocale = () => Ctx.currentLocale;

setup();

export default formatMessage;

// Stryker restore all
/* v8 ignore stop */
