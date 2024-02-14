/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';

import HtmlElement from '@/components/layouts/base/HtmlElement';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <HtmlElement params={params}>{children}</HtmlElement>;
}

// Stryker restore all
/* v8 ignore stop */
