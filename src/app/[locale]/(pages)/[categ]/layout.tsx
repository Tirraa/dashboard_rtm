import MAIN_NEXT_UI_CLS from '@/components/config/styles/next-ui';
import Breadcrumbs from '@/components/shared/misc/Breadcrumbs';
import { cn } from '@/lib/tailwind';
import { LayoutMinimalProps } from '@/types/Next';

export default function BlogLayout({ children }: LayoutMinimalProps) {
  return (
    <main className={cn('flex-1 w-full', MAIN_NEXT_UI_CLS)}>
      <Breadcrumbs />
      {children}
    </main>
  );
}
