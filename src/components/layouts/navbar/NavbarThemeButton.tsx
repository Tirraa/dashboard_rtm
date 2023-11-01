'use client';

import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { i18ns } from '@/config/i18n';
import { DEFAULT_DARK_VARIANT, DEFAULT_VARIANT } from '@/config/themes';
import { useScopedI18n } from '@/i18n/client';
import { cn } from '@/lib/tailwind';
import type { WithIsMobile } from '@/types/Next';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

interface NavbarLoginButtonProps extends WithIsMobile {}

const { SIZE_PX_VALUE: SIZE } = NAVBAR_ICON_STYLE;

export const NavbarThemeButton: FunctionComponent<NavbarLoginButtonProps> = ({ isMobile }) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const scopedT = useScopedI18n(`${i18ns.navbar}.sr-only`);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  const nextuiRelatedClasses = cn('min-w-unit-0', isMobile ? 'w-unit-7' : 'w-unit-5');
  const classNameBase = 'h-full bg-transparent text-white';

  if (theme !== DEFAULT_VARIANT)
    return (
      <Button className={cn(classNameBase, nextuiRelatedClasses)} onClick={() => setTheme(DEFAULT_VARIANT)} isIconOnly disableRipple>
        <SunIcon width={SIZE} height={SIZE} />
        <span className="sr-only">{scopedT('switch-to-light-mode')}</span>
      </Button>
    );

  return (
    <Button className={cn(classNameBase, nextuiRelatedClasses)} onClick={() => setTheme(DEFAULT_DARK_VARIANT)} isIconOnly disableRipple>
      <MoonIcon width={SIZE} height={SIZE} />
      <span className="sr-only">{scopedT('switch-to-dark-mode')}</span>
    </Button>
  );
};

export default NavbarThemeButton;
