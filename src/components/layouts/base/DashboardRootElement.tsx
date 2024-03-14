/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';
import type { FunctionComponent } from 'react';

import DocumentRoot from '@/components/layouts/base/DocumentRoot';

interface HtmlElementProps extends LayoutBaseProps {}

const DashboardRootElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => (
  <DocumentRoot disableGoToTopButton params={params} withNavbar>
    {children}
  </DocumentRoot>
);

export default DashboardRootElement;

// Stryker restore all
/* v8 ignore stop */
