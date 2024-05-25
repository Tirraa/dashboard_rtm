/* v8 ignore start */
// Stryker disable all

import computePathnameI18nFlagUnstrict from './portable/i18n/computePathnameI18nFlagUnstrict';
import getPathnameWithoutI18nFlag from './notPortable/i18n/getPathnameWithoutI18nFlag';
import getPathnameMaybeI18nFlag from './notPortable/i18n/getPathnameMaybeI18nFlag';

export { computePathnameI18nFlagUnstrict, getPathnameWithoutI18nFlag, getPathnameMaybeI18nFlag };

// Stryker restore all
/* v8 ignore stop */
