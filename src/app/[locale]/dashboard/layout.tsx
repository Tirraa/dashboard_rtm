import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { setStaticParamsLocale } from 'next-international/server';

interface DashboardLayoutProps extends LayoutBaseProps {}

export function generateStaticParams() {
  return getStaticParams();
}

export default function DashboardLayout({ params, children }: DashboardLayoutProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return (
    <div className="flex">
      <DashboardSidebar {...{ i18nProps: { ...params } }} />
      <main className="flex-1" id="main-box-id">
        {children}
      </main>
    </div>
  );
}
