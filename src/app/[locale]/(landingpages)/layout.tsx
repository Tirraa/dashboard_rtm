import LandingPagesHtmlElement from '@/components/layouts/base/LandingPagesHtmlElement';
import { LayoutBaseProps } from '@/types/Next';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <LandingPagesHtmlElement {...{ children, params }} />;
}
