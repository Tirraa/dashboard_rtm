'use client';

import { RESETTED_BUTTON_PROPS } from '@/components/config/styles/material-tailwind/ButtonsStyles';
import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { DEFAULT_DARK_VARIANT, DEFAULT_VARIANT } from '@/config/themes';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Button } from '@material-tailwind/react';
import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';

interface NavbarLoginButtonProps {
  isMobile?: boolean;
}

const { DESKTOP_SIZE_PX_VALUE, MOBILE_SIZE_PX_VALUE } = NAVBAR_ICON_STYLE;

// {ToDo} i18nVocab for the 'Switch to ...' (using a formatter)
export const NavbarThemeButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const { theme, setTheme } = useTheme();

  const SIZE = isMobile ? MOBILE_SIZE_PX_VALUE : DESKTOP_SIZE_PX_VALUE;

  if (theme !== DEFAULT_VARIANT)
    return (
      <Button {...RESETTED_BUTTON_PROPS} onClick={() => setTheme(DEFAULT_VARIANT)}>
        <SunIcon width={SIZE} height={SIZE} />
        <span className="sr-only">{`Switch to ${DEFAULT_VARIANT} theme`}</span>
      </Button>
    );

  return (
    <Button {...RESETTED_BUTTON_PROPS} onClick={() => setTheme(DEFAULT_DARK_VARIANT)}>
      <MoonIcon width={SIZE} height={SIZE} />
      <span className="sr-only">{`Switch to ${DEFAULT_DARK_VARIANT} theme (default)`}</span>
    </Button>
  );
};

export default NavbarThemeButton;
