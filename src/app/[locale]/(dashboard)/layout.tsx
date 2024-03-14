/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';

import DashboardRootElement from '@/components/layouts/base/DashboardRootElement';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <DashboardRootElement params={params}>{children}</DashboardRootElement>;
}

// Stryker restore all
/* v8 ignore stop */
