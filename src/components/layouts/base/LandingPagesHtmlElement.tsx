import DocumentRoot from '@/components/layouts/base/DocumentRoot';
import type { LayoutBaseProps } from '@/types/Next';
import 'intl-locale-textinfo-polyfill';
import type { FunctionComponent } from 'react';

interface HtmlElementProps extends LayoutBaseProps {}

export const LandingPagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => <DocumentRoot {...{ children, params }} />;

export default LandingPagesHtmlElement;
