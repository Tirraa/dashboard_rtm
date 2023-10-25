'use client';

import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { DEFAULT_DARK_VARIANT, DEFAULT_VARIANT } from '@/config/themes';
import { cn } from '@/lib/tailwind';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { FunctionComponent, useEffect, useState } from 'react';

interface NavbarLoginButtonProps {
  isMobile?: boolean;
}

const { DESKTOP_SIZE_PX_VALUE, MOBILE_SIZE_PX_VALUE } = NAVBAR_ICON_STYLE;

// {ToDo} i18nVocab for the 'Switch to ...' (using a formatter)
export const NavbarThemeButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const SIZE = isMobile ? MOBILE_SIZE_PX_VALUE : DESKTOP_SIZE_PX_VALUE;
  const nextuiRelatedClasses = cn('min-w-unit-0', isMobile ? 'w-unit-7' : 'w-unit-5');
  const classNameBase = 'bg-transparent text-white';

  if (theme !== DEFAULT_VARIANT)
    return (
      <Button className={cn(classNameBase, nextuiRelatedClasses)} onClick={() => setTheme(DEFAULT_VARIANT)} isIconOnly disableRipple>
        <SunIcon width={SIZE} height={SIZE} />
        <span className="sr-only">{`Switch to ${DEFAULT_VARIANT} theme`}</span>
      </Button>
    );

  return (
    <Button className={cn(classNameBase, nextuiRelatedClasses)} onClick={() => setTheme(DEFAULT_DARK_VARIANT)} isIconOnly disableRipple>
      <MoonIcon width={SIZE} height={SIZE} />
      <span className="sr-only">{`Switch to ${DEFAULT_DARK_VARIANT} theme (default)`}</span>
    </Button>
  );
};

export default NavbarThemeButton;
