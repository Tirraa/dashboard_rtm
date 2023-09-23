'use client';

import RoutesBase from '@/config/routes';
import { redirect } from 'next/navigation';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  redirect(RoutesBase.WEBSITE_ROOT);
}
