import type { Maybe, MaybeObjectValue } from './CustomUtilityTypes';

type MaybeSession<T> = T | undefined;
type MaybeSessionProp<T> = MaybeObjectValue<Maybe<T>>;

export type User = MaybeSession<{
  name?: MaybeSessionProp<string>;
  email?: MaybeSessionProp<string>;
  image?: MaybeSessionProp<string>;
}>;
