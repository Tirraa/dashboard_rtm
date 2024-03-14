/* v8 ignore start */
// Stryker disable all

'use client';

import type { NotFoundCatchallParams } from '@/types/Next';

import NotFoundCatchall from '@/components/phantoms/NotFoundCatchall';

export default function Page({ params }: NotFoundCatchallParams) {
  NotFoundCatchall({ params });
}

// Stryker restore all
/* v8 ignore stop */
