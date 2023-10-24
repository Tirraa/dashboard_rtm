'use client';

import { useChangeLocale, useCurrentLocale } from '@/i18n/client';
import { Button } from '@material-tailwind/react';
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
      <Button onClick={() => changeLocale('en')}>EN</Button>
      <Button onClick={() => changeLocale('fr')}>FR</Button>
    </div>
  );
};
export default LanguageSwitcher;
