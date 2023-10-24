'use client';

import { useChangeLocale, useCurrentLocale } from '@/i18n/client';
import { Button } from '@nextui-org/button';
import { FunctionComponent, useEffect } from 'react';

interface LanguageSwitcherProps {}

const LanguageSwitcher: FunctionComponent<LanguageSwitcherProps> = () => {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  useEffect(() => {
    // if (currentLocale === 'en') document.documentElement.dir = 'rtl';
    // else document.documentElement.dir = 'ltr';
  }, [currentLocale]);

  return (
    <div className="flex flex-col gap-4">
      <Button className="bg-slate-950" onClick={() => changeLocale('en')}>
        EN
      </Button>
      <Button className="bg-slate-950" onClick={() => changeLocale('fr')}>
        FR
      </Button>
    </div>
  );
};
export default LanguageSwitcher;
