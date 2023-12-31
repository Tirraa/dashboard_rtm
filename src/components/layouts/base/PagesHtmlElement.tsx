/* v8 ignore start */
// Stryker disable all
import type { LayoutBaseProps } from '@/types/Next';
import type { FunctionComponent } from 'react';

import DocumentRoot from '@/components/layouts/base/DocumentRoot';

interface HtmlElementProps extends LayoutBaseProps {}

const PagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => (
  <DocumentRoot params={params} withNavbar>
    {children}
  </DocumentRoot>
);

export default PagesHtmlElement;
/* v8 ignore stop */
// Stryker restore all
