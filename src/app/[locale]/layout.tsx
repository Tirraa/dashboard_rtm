import '@/app/globals.css';
import HtmlElement from '@/components/misc/HtmlElement';
import I18nProvider from '@/contexts/I18nProvider';
import { LayoutBaseProps } from '@/types/Next';

export default function RootLayout({ children, params }: LayoutBaseProps) {
  return (
    <I18nProvider>
      <HtmlElement {...{ children, params }} />
    </I18nProvider>
  );
}
