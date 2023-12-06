'use client';

import { i18ns } from '##/config/i18n';
import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { Button } from '@/components/ui/Button';
import { DEFAULT_DARK_VARIANT, DEFAULT_VARIANT } from '@/config/themes';
import { useScopedI18n } from '@/i18n/client';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { useTheme } from 'next-themes';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

interface NavbarLoginButtonProps {}

const { SIZE_PX_VALUE: SIZE } = NAVBAR_ICON_STYLE;

// https://github.com/pacocoursey/next-themes/issues/220#issuecomment-1818410035

const NavbarThemeButton: FunctionComponent<NavbarLoginButtonProps> = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [changeThemeValue, setChangeThemeValue] = useState<string>('');

  const scopedT = useScopedI18n(`${i18ns.navbar}.sr-only`);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    setChangeThemeValue(theme !== DEFAULT_VARIANT ? DEFAULT_VARIANT : DEFAULT_DARK_VARIANT);
  }, [theme]);

  useEffect(
    () => {
      const checkDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newValue =
        theme === DEFAULT_DARK_VARIANT
          ? DEFAULT_VARIANT
          : theme === DEFAULT_VARIANT
            ? DEFAULT_DARK_VARIANT
            : checkDarkTheme
              ? DEFAULT_VARIANT
              : DEFAULT_DARK_VARIANT;
      setChangeThemeValue(newValue);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!isMounted) return null;

  const className = 'h-full w-fit text-primary-foreground';

  if (changeThemeValue === DEFAULT_VARIANT || theme === DEFAULT_DARK_VARIANT) {
    return (
      <Button className={className} onClick={() => setTheme(DEFAULT_VARIANT)} size="icon" withTransparentBackground>
        <SunIcon width={SIZE} height={SIZE} />
        <span className="sr-only">{scopedT('switch-to-light-mode')}</span>
      </Button>
    );
  }

  return (
    <Button className={className} onClick={() => setTheme(DEFAULT_DARK_VARIANT)} size="icon" withTransparentBackground>
      <MoonIcon width={SIZE} height={SIZE} />
      <span className="sr-only">{scopedT('switch-to-dark-mode')}</span>
    </Button>
  );
};

export default NavbarThemeButton;
