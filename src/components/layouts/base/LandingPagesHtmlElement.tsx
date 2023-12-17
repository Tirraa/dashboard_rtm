import type { LayoutBaseProps } from '@/types/Next';
import type { FunctionComponent } from 'react';

import DocumentRoot from '@/components/layouts/base/DocumentRoot';
import 'intl-locale-textinfo-polyfill';

interface HtmlElementProps extends LayoutBaseProps {}

const LandingPagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => (
  <DocumentRoot params={params}>{children}</DocumentRoot>
);

export default LandingPagesHtmlElement;
