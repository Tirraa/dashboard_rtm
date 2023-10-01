'use client';

import NotFoundCatchall from '@/components/shared/misc/NotFoundCatchall';
import { NotFoundCatchallParams } from '@/types/Next';

export default function Page({ params }: NotFoundCatchallParams) {
  NotFoundCatchall({ params });
}
