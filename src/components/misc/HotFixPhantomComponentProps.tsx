'use client';

import { COOKIE_NAME } from '@/i18n/settings';
import { getPathnameI18nFlag } from '@/lib/i18n';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

interface HotFixPhantomComponentProps {}

function I18nCookieHotFixPhantom() {
  const pathname = usePathname();
  const langFlag = getPathnameI18nFlag(pathname);
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);

  if (cookies[COOKIE_NAME] !== langFlag) setCookie(COOKIE_NAME, langFlag);
  return <></>;
}

const HotFixPhantomComponent: FunctionComponent<HotFixPhantomComponentProps> = () => {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <I18nCookieHotFixPhantom />
    </CookiesProvider>
  );
};

export default HotFixPhantomComponent;
