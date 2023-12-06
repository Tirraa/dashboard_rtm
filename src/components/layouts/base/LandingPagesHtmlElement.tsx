import DocumentRoot from '@/components/layouts/base/DocumentRoot';
import type { LayoutBaseProps } from '@/types/Next';
import 'intl-locale-textinfo-polyfill';
import type { FunctionComponent } from 'react';

interface HtmlElementProps extends LayoutBaseProps {}

const LandingPagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => (
  <DocumentRoot params={params}>{children}</DocumentRoot>
);

export default LandingPagesHtmlElement;
