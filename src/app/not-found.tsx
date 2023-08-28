'use client';

import NotFoundInner from '@/components/pagesInner/Notfound';
import { LanguageFlag } from '@/config/i18n';
import { getPathnameI18nPart } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const lng: LanguageFlag = getPathnameI18nPart(pathname);

  return (
    <html lang={lng} dir={lng}>
      <body className="flex flex-col min-h-screen">
        <NotFoundInner forcedLang={lng} />
      </body>
    </html>
  );
}
