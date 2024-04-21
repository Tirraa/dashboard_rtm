/* v8 ignore start */
// Stryker disable all

'use server';

import { signInProviderActionFlag } from '@/config/authMisc';
import ROUTES_ROOTS from '##/config/routes';
import { signIn } from '@/auth';

// eslint-disable-next-line require-await
export async function signInAction() {
  'use server';
  await signIn(signInProviderActionFlag, { callbackUrl: ROUTES_ROOTS.DASHBOARD });
}

// Stryker restore all
/* v8 ignore stop */
