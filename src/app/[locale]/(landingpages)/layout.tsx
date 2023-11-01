import LandingPagesHtmlElement from '@/components/layouts/base/LandingPagesHtmlElement';
import type { LayoutBaseProps } from '@/types/Next';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return <LandingPagesHtmlElement {...{ children, params }} />;
}
