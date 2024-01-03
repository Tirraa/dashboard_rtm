/* v8 ignore start */
// Stryker disable all
'use client';

import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Error({ error, reset }: { reset: () => void; error: Error }) {
  redirect(ROUTES_ROOTS.WEBSITE);
}
// Stryker restore all
/* v8 ignore stop */
