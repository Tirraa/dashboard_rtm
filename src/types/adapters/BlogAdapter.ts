/* v8 ignore start */
// Stryker disable all
//!\ TESTED VIA JEST-TSD

import type { DefaultLanguageToken, Blog } from '@rtm/generated';
import type { DefaultLanguage } from '##/config/i18n';

// * ... Adapter (rewriting)
type BlogAdapter<__Blog extends object = Blog> = {
  [Category in keyof __Blog]: {
    [Subcategory in keyof __Blog[Category]]: {
      [Language in keyof __Blog[Category][Subcategory] as Language extends DefaultLanguageToken
        ? DefaultLanguage
        : Language]: __Blog[Category][Subcategory][Language];
    };
  };
};

export default BlogAdapter;

// Stryker restore all
/* v8 ignore stop */
