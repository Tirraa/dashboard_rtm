'use client';

import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { LANGUAGES, i18ns } from '@/config/i18n';
import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/i18n/client';
import localesLabels, { localesEmojis } from '@/i18n/localesLabels';
import { cn } from '@/lib/tailwind';
import type { WithIsMobile } from '@/types/Next';
import type { ChangeLocaleFun, LanguageFlag } from '@/types/i18n';
import type { FunctionComponent } from 'react';

interface NavbarLanguageMenuProps extends WithIsMobile {}

const dropdownItemsGenerator = (changeLocale: ChangeLocaleFun, currentLocale: LanguageFlag) =>
  LANGUAGES.map((language) => (
    <DropdownMenuItem key={language} className="relative my-1 px-3 py-2" textValue={localesLabels[language]} asChild>
      <button
        onClick={() => changeLocale(language)}
        className={cn(
          BUTTON_CONFIG.CLASSNAME,
          'w-full',
          currentLocale === language
            ? cn(BUTTON_CONFIG.ACTIVE_CLASSNAME, 'hover:bg-primary hover:text-white focus:bg-primary focus:text-white')
            : BUTTON_CONFIG.NOT_ACTIVE_CLASSNAME
        )}
      >
        <span className="absolute ltr:right-2 rtl:left-2">{localesEmojis[language]}</span>
        <span>{localesLabels[language]}</span>
      </button>
    </DropdownMenuItem>
  ));

export const NavbarLanguageMenu: FunctionComponent<NavbarLanguageMenuProps> = ({ isMobile }) => {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const scopedT = useScopedI18n(`${i18ns.navbar}.sr-only`);

  return (
    <DropdownMenu withDeepResetOnLgBreakpointEvents>
      <DropdownMenuTrigger asChild>
        <button className="h-full bg-transparent text-primary-foreground">{localesEmojis[currentLocale]}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('min-w-[125px] dark:border-card lg:relative ltr:lg:right-10 rtl:lg:left-10 lg:dark:border-inherit', {
          'relative top-1': !isMobile
        })}
        aria-label={scopedT('language-switcher-menu')}
      >
        {dropdownItemsGenerator(changeLocale, currentLocale)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarLanguageMenu;
