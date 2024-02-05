/* v8 ignore start */
// Stryker disable all
import type { LayoutBaseProps } from '@/types/Next';

import LandingPagesRootElement from '@/components/layouts/base/LandingPagesRootElement';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <LandingPagesRootElement params={params}>{children}</LandingPagesRootElement>;
}
// Stryker restore all
/* v8 ignore stop */
