import I18nTaxonomy from '##/config/taxonomies/i18n';
import DashboardLayoutClient from '@/components/layouts/dashboard/DashboardLayoutClient';
import { getStaticParams } from '@/i18n/server';
import type { LayoutBaseProps } from '@/types/Next';
import { setStaticParamsLocale } from 'next-international/server';

interface DashboardLayoutProps extends LayoutBaseProps {}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function DashboardLayout({ params, children }: DashboardLayoutProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
