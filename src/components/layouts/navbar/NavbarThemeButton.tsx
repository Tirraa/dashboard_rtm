'use client';

import { RESETTED_BUTTON_PROPS } from '@/components/config/styles/material-tailwind/ButtonsStyles';
import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { DEFAULT_VARIANT, ThemeVariant } from '@/config/themes';
import { getThemeFromLocalStorage, selectTheme } from '@/themes/themeControl';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Button } from '@material-tailwind/react';
import { FunctionComponent, useEffect, useState } from 'react';

interface NavbarLoginButtonProps {
  isMobile?: boolean;
}

interface NavbarLoginButtonMobileProps {
  theme: ThemeVariant;
  doSelectTheme: Function;
}

const { DESKTOP_SIZE_PX_VALUE, MOBILE_SIZE_PX_VALUE } = NAVBAR_ICON_STYLE;

// {ToDo} i18nVocab for the 'Switch to ...' (using a formatter)
const NavbarThemeButtonMobile: FunctionComponent<NavbarLoginButtonMobileProps> = ({ theme, doSelectTheme }) => {
  if (theme === 'dark')
    return (
      <Button {...RESETTED_BUTTON_PROPS} onClick={() => doSelectTheme('light')}>
        <SunIcon width={MOBILE_SIZE_PX_VALUE} height={MOBILE_SIZE_PX_VALUE} />
        <span className="sr-only">Switch to light theme</span>
      </Button>
    );

  return (
    <Button {...RESETTED_BUTTON_PROPS} onClick={() => doSelectTheme('dark')}>
      <MoonIcon width={MOBILE_SIZE_PX_VALUE} height={MOBILE_SIZE_PX_VALUE} />
      <span className="sr-only">Switch to dark theme</span>
    </Button>
  );
};

// {ToDo} i18nVocab for the 'Switch to ...' (using a formatter)
export const NavbarThemeButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const [theme, setTheme] = useState<ThemeVariant>(DEFAULT_VARIANT);

  useEffect(() => {
    setTheme(getThemeFromLocalStorage() as ThemeVariant);
  }, []);

  function doSelectTheme(themeCls: ThemeVariant) {
    selectTheme(themeCls);
    setTheme(themeCls);
  }

  if (isMobile) return <NavbarThemeButtonMobile {...{ doSelectTheme, theme }} />;

  if (theme === 'dark')
    return (
      <Button {...RESETTED_BUTTON_PROPS} onClick={() => doSelectTheme('light')}>
        <SunIcon width={DESKTOP_SIZE_PX_VALUE} height={DESKTOP_SIZE_PX_VALUE} />
        <span className="sr-only">Switch to light theme</span>
      </Button>
    );

  return (
    <Button {...RESETTED_BUTTON_PROPS} onClick={() => doSelectTheme('dark')}>
      <MoonIcon width={DESKTOP_SIZE_PX_VALUE} height={DESKTOP_SIZE_PX_VALUE} />
      <span className="sr-only">Switch to dark theme</span>
    </Button>
  );
};

export default NavbarThemeButton;
