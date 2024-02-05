/* v8 ignore start */
// Stryker disable all
import type { LayoutBaseProps } from '@/types/Next';

import DocumentRoot from '@/components/layouts/base/DocumentRoot';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <DocumentRoot params={params}>{children}</DocumentRoot>;
}
// Stryker restore all
/* v8 ignore stop */
