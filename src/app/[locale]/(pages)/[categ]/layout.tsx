import Breadcrumbs from '@/components/shared/misc/Breadcrumbs';
import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';

export default function BlogLayout({ children }: LayoutMinimalProps) {
  return (
    <main className="w-full">
      <Breadcrumbs />
      {children}
    </main>
  );
}
