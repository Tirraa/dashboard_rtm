/* v8 ignore start */
'use client';

import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';

// eslint-disable-next-line no-unused-vars
export default function Error({ error, reset }: { reset: () => void; error: Error }) {
  redirect(ROUTES_ROOTS.WEBSITE);
}
/* v8 ignore stop */
