import '@/app/globals.css';
import HtmlElement from '@/components/layouts/base/HtmlElement';
import { LayoutBaseProps } from '@/types/Next';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <HtmlElement {...{ children, params }} />;
}
