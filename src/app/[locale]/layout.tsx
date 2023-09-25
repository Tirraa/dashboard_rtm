import '@/app/globals.css';
import HtmlElement from '@/components/misc/HtmlElement';
import I18nProvider from '@/contexts/I18nProvider';
import { LayoutMinimalProps } from '@/types/CustomUtilitaryTypes';

export default function RootLayout({ children }: LayoutMinimalProps) {
  return (
    <I18nProvider>
      <HtmlElement {...{ children }} />
    </I18nProvider>
  );
}
