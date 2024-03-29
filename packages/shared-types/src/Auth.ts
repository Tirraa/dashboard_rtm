/* v8 ignore start */
// Stryker disable all

import type { MaybeSessionUserField, MaybeSessionUser } from '@rtm/shared-types/CustomUtilityTypes';

export type User = MaybeSessionUser<{
  email?: MaybeSessionUserField<string>;
  image?: MaybeSessionUserField<string>;
  name?: MaybeSessionUserField<string>;
}>;

// Stryker restore all
/* v8 ignore stop */
