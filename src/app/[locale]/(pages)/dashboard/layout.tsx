/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';

import DashboardLayoutClient from '@/components/layouts/dashboard/DashboardLayoutClient';
import { setStaticParamsLocale } from 'next-international/server';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getStaticParams } from '@/i18n/server';

interface DashboardLayoutProps extends LayoutBaseProps {}

export function generateStaticParams() {
  return getStaticParams();
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}

// Stryker restore all
/* v8 ignore stop */
