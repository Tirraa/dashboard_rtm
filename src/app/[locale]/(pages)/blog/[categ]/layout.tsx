/* v8 ignore start */
// Stryker disable all

import type { LayoutMinimalProps } from '@rtm/shared-types/Next';

import { MAIN_CLS } from '@/components/config/styles/main';
import { cn } from '@/lib/tailwind';

export default function BlogLayout({ children }: LayoutMinimalProps) {
  return <main className={cn('w-full flex-1', MAIN_CLS)}>{children}</main>;
}

// Stryker restore all
/* v8 ignore stop */
