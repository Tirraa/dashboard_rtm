import PagesHtmlElement from '@/components/layouts/base/PagesHtmlElement';
import type { LayoutBaseProps } from '@/types/Next';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <PagesHtmlElement {...{ children, params }} />;
}
