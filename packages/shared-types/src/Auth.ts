/* v8 ignore start */
import type { MaybeSessionUserField, MaybeSessionUser } from '@rtm/shared-types/CustomUtilityTypes';

export type User = MaybeSessionUser<{
  email?: MaybeSessionUserField<string>;
  image?: MaybeSessionUserField<string>;
  name?: MaybeSessionUserField<string>;
}>;
/* v8 ignore stop */
