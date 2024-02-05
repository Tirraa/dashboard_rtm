/* v8 ignore start */
// Stryker disable all
import type { LayoutBaseProps } from '@/types/Next';
import type { FunctionComponent } from 'react';

import DocumentRoot from '@/components/layouts/base/DocumentRoot';

interface HtmlElementProps extends LayoutBaseProps {}

const LandingPagesRootElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => (
  <DocumentRoot params={params}>{children}</DocumentRoot>
);

export default LandingPagesRootElement;
// Stryker restore all
/* v8 ignore stop */
