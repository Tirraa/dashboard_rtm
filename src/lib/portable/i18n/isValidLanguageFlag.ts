import type LanguageFlag from '@rtm/shared-types/LanguageFlag';

import { LANGUAGES } from '../../../../interop/config/i18n';

const isValidLanguageFlag = (key: string): key is LanguageFlag => (LANGUAGES as any[]).includes(key);
export default isValidLanguageFlag;
