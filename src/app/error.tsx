'use client';

import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  redirect(ROUTES_ROOTS.WEBSITE);
}
