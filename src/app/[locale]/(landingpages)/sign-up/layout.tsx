import { MAIN_CLS } from '@/components/config/styles/main';
import { cn } from '@/lib/tailwind';
import type { LayoutMinimalProps } from '@rtm/shared-types/src/Next';

export default function SignUpLayout({ children }: LayoutMinimalProps) {
  return <main className={cn('flex flex-1 items-center justify-center', MAIN_CLS)}>{children}</main>;
}
