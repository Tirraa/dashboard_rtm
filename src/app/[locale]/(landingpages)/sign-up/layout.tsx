import MAIN_NEXT_UI_CLS from '@/components/config/styles/next-ui';
import { cn } from '@/lib/tailwind';
import { LayoutMinimalProps } from '@/types/Next';

export default function SignUpLayout({ children }: LayoutMinimalProps) {
  return <main className={cn('flex flex-1 justify-center items-center', MAIN_NEXT_UI_CLS)}>{children}</main>;
}
