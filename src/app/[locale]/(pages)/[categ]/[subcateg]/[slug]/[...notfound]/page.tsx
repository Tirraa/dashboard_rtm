/* v8 ignore start */
'use client';

import type { NotFoundCatchallParams } from '@/types/Next';

import NotFoundCatchall from '@/components/phantoms/NotFoundCatchall';

export default function Page({ params }: NotFoundCatchallParams) {
  NotFoundCatchall({ params });
}
/* v8 ignore stop */
