'use client';

import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';

// eslint-disable-next-line no-unused-vars
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  redirect(ROUTES_ROOTS.WEBSITE);
}
