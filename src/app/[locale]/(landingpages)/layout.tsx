/* v8 ignore start */
// Stryker disable all
import type { LayoutBaseProps } from '@/types/Next';

import LandingPagesHtmlElement from '@/components/layouts/base/LandingPagesHtmlElement';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <LandingPagesHtmlElement params={params}>{children}</LandingPagesHtmlElement>;
}
/* v8 ignore stop */
// Stryker restore all
