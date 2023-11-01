import NotFoundCatchall from '@/components/phantoms/NotFoundCatchall';
import type { NotFoundCatchallParams } from '@/types/Next';

export default function Page({ params }: NotFoundCatchallParams) {
  NotFoundCatchall({ params });
}
