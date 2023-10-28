import DocumentRoot from '@/components/layouts/base/DocumentRoot';
import { LayoutBaseProps } from '@/types/Next';
import 'intl-locale-textinfo-polyfill';
import { FunctionComponent } from 'react';

interface HtmlElementProps extends LayoutBaseProps {}

export const PagesHtmlElement: FunctionComponent<HtmlElementProps> = ({ children, params }) => <DocumentRoot {...{ children, params }} withNavbar />;

export default PagesHtmlElement;
