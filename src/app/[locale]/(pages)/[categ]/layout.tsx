import { MAIN_CLS } from '@/components/config/styles/main';
import { cn } from '@/lib/tailwind';
import type { LayoutMinimalProps } from '@/types/Next';

export default function BlogLayout({ children }: LayoutMinimalProps) {
  return <main className={cn('w-full flex-1', MAIN_CLS)}>{children}</main>;
}
