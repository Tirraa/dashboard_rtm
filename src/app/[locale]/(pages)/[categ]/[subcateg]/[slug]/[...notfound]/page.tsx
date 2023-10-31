'use client';

import NotFoundCatchall from '@/components/phantoms/NotFoundCatchall';
import { NotFoundCatchallParams } from '@/types/Next';

export default function Page({ params }: NotFoundCatchallParams) {
  NotFoundCatchall({ params });
}
