/* v8 ignore start */
// Stryker disable all
import type { LayoutBaseProps } from '@/types/Next';

import PagesHtmlElement from '@/components/layouts/base/PagesHtmlElement';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <PagesHtmlElement params={params}>{children}</PagesHtmlElement>;
}
// Stryker restore all
/* v8 ignore stop */
