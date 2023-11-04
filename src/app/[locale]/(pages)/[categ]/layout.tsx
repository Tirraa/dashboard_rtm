import { MAIN_UI_RELATED_CLS } from '@/components/config/styles/next-ui';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { cn } from '@/lib/tailwind';
import type { LayoutMinimalProps } from '@/types/Next';

export default function BlogLayout({ children }: LayoutMinimalProps) {
  return (
    <main className={cn('w-full flex-1', MAIN_UI_RELATED_CLS)}>
      <Breadcrumbs />
      {children}
    </main>
  );
}
