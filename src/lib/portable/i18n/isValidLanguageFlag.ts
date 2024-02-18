import type { LanguageFlag } from '@rtm/shared-types/I18n';

import { LANGUAGES } from '../../../../interop/config/i18n';

const isValidLanguageFlag = (key: string): key is LanguageFlag => (LANGUAGES as any[]).includes(key);
export default isValidLanguageFlag;
