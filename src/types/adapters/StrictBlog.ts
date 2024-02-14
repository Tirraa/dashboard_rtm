/* v8 ignore start */
// Stryker disable all
//!\ TESTED VIA JEST-TSD

import type DefaultLanguageToken from '@rtm/generated/DefaultLanguageToken';
import type { DefaultLanguage } from '##/config/i18n';
import type Blog from '@rtm/generated/Blog';

// * ... Adapter (rewriting)
type StrictBlog<__Blog extends object = Blog> = {
  [Category in keyof __Blog]: {
    [Subcategory in keyof __Blog[Category]]: {
      [Language in keyof __Blog[Category][Subcategory] as Language extends DefaultLanguageToken
        ? DefaultLanguage
        : Language]: __Blog[Category][Subcategory][Language];
    };
  };
};

export default StrictBlog;

// Stryker restore all
/* v8 ignore stop */
