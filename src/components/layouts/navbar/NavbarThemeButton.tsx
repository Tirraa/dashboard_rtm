'use client';

import { RESETTED_BUTTON_PROPS } from '@/components/config/styles/material-tailwind/ButtonsStyles';
import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import useLocalStorageTheme from '@/components/hooks/useThemeFromLocalStorage';
import { DEFAULT_VARIANT } from '@/config/themes';
import { selectTheme } from '@/themes/themeControl';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Button } from '@material-tailwind/react';
import { FunctionComponent } from 'react';

interface NavbarLoginButtonProps {
  isMobile?: boolean;
}

const { DESKTOP_SIZE_PX_VALUE, MOBILE_SIZE_PX_VALUE } = NAVBAR_ICON_STYLE;

// {ToDo} i18nVocab for the 'Switch to ...' (using a formatter)
export const NavbarThemeButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const theme = useLocalStorageTheme();

  const SIZE = isMobile ? MOBILE_SIZE_PX_VALUE : DESKTOP_SIZE_PX_VALUE;

  if (theme !== DEFAULT_VARIANT)
    return (
      <Button {...RESETTED_BUTTON_PROPS} onClick={() => selectTheme(DEFAULT_VARIANT)}>
        <SunIcon width={SIZE} height={SIZE} />
        <span className="sr-only">{`Switch to ${DEFAULT_VARIANT} theme (default)`}</span>
      </Button>
    );

  return (
    <Button {...RESETTED_BUTTON_PROPS} onClick={() => selectTheme('dark')}>
      <MoonIcon width={SIZE} height={SIZE} />
      <span className="sr-only">Switch to dark theme</span>
    </Button>
  );
};

export default NavbarThemeButton;
