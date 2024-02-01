/* v8 ignore start */
// Stryker disable all
import type DefaultLanguageToken from '@rtm/generated/DefaultLanguageToken';
import type { DefaultLanguage } from '##/config/i18n';
import type Blog from '@rtm/generated/Blog';

// * ... Adapter (rewriting)
type StrictBlog = {
  [Category in keyof Blog]: {
    [Subcategory in keyof Blog[Category]]: {
      [Language in keyof Blog[Category][Subcategory] as Language extends DefaultLanguageToken
        ? DefaultLanguage
        : Language]: Blog[Category][Subcategory][Language];
    };
  };
};

export default StrictBlog;
// Stryker restore all
/* v8 ignore stop */
