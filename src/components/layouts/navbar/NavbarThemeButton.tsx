'use client';

import NAVBAR_ICON_STYLE from '@/components/config/styles/navbar/NavbarIconStyle';
import { Button } from '@/components/ui/Button';
import { i18ns } from '@/config/i18n';
import { DEFAULT_DARK_VARIANT, DEFAULT_VARIANT } from '@/config/themes';
import { useScopedI18n } from '@/i18n/client';
import type { WithIsMobile } from '@/types/Next';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
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

  const className = 'h-full w-fit text-primary-foreground';

  if (theme !== DEFAULT_VARIANT) {
    return (
      <Button {...{ className }} onClick={() => setTheme(DEFAULT_VARIANT)} size="icon" withTransparentBackground>
        <SunIcon width={SIZE} height={SIZE} />
        <span className="sr-only">{scopedT('switch-to-light-mode')}</span>
      </Button>
    );
  }

  return (
    <Button {...{ className }} onClick={() => setTheme(DEFAULT_DARK_VARIANT)} size="icon" withTransparentBackground>
      <MoonIcon width={SIZE} height={SIZE} />
      <span className="sr-only">{scopedT('switch-to-dark-mode')}</span>
    </Button>
  );
};

export default NavbarThemeButton;
