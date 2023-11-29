import type { MaybeSessionUser, MaybeSessionUserField } from '@rtm/shared-types/CustomUtilityTypes';

export type User = MaybeSessionUser<{
  name?: MaybeSessionUserField<string>;
  email?: MaybeSessionUserField<string>;
  image?: MaybeSessionUserField<string>;
}>;
