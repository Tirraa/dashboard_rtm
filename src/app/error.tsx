'use client';

import { redirect } from 'next/navigation';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  redirect('/');
}
