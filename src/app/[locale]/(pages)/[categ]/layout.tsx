import MAIN_NEXT_UI_CLS from '@/components/config/styles/next-ui/providerStyle';
import Breadcrumbs from '@/components/shared/misc/Breadcrumbs';
import ELEMENTS_ID from '@/config/elementsId';
import { cn } from '@/lib/tailwind';
import { LayoutMinimalProps } from '@/types/Next';

export default function BlogLayout({ children }: LayoutMinimalProps) {
  return (
    <main className={cn('flex-1 w-full', MAIN_NEXT_UI_CLS)} id={ELEMENTS_ID.ROOT}>
      <Breadcrumbs />
      {children}
    </main>
  );
}
