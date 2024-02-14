/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';

import PagesRootElement from '@/components/layouts/base/PagesRootElement';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <PagesRootElement params={params}>{children}</PagesRootElement>;
}

// Stryker restore all
/* v8 ignore stop */
