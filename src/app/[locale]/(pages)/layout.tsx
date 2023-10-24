import PagesHtmlElement from '@/components/layouts/base/PagesHtmlElement';
import { LayoutBaseProps } from '@/types/Next';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <PagesHtmlElement {...{ children, params }} />;
}
