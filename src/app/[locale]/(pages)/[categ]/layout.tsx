import MAIN_NEXT_UI_CLS from '@/components/config/styles/next-ui';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { cn } from '@/lib/tailwind';
import { LayoutMinimalProps } from '@/types/Next';

export default function BlogLayout({ children }: LayoutMinimalProps) {
  return (
    <main className={cn('w-full flex-1', MAIN_NEXT_UI_CLS)}>
      <Breadcrumbs />
      {children}
    </main>
  );
}
