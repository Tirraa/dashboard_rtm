/* v8 ignore start */
// Stryker disable all
import type { LayoutBaseProps } from '@/types/Next';

import LandingPagesHtmlElement from '@/components/layouts/base/LandingPagesHtmlElement';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <LandingPagesHtmlElement params={params}>{children}</LandingPagesHtmlElement>;
}
// Stryker restore all
/* v8 ignore stop */
