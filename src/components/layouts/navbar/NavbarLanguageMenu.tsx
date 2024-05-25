'use client';

import type { ChangeLocaleFun, LanguageFlag } from '@rtm/shared-types/I18n';
import type { WithIsMobile } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenu } from '@/components/ui/DropdownMenu';
import { useCurrentLocale, useChangeLocale, useScopedI18n } from '@/i18n/client';
import localesLabels, { localesEmojis } from '@/i18n/localesLabels';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { LANGUAGES, i18ns } from '##/config/i18n';
import cn from '@/lib/portable/tailwind/cn';
import { useState } from 'react';

interface NavbarLanguageMenuProps extends WithIsMobile {}

const dropdownItemsGenerator = (changeLocale: ChangeLocaleFun, currentLocale: LanguageFlag) =>
  LANGUAGES.map((language) => (
    <DropdownMenuItem className="relative my-1 px-3 py-2" textValue={localesLabels[language]} key={language} asChild>
      <button
        className={cn(
          BUTTON_CONFIG.CLASSNAME,
          'w-full',
          currentLocale === language
            ? cn(BUTTON_CONFIG.ACTIVE_CLASSNAME, 'hover:bg-primary hover:text-white focus:bg-primary focus:text-white')
            : cn(BUTTON_CONFIG.NOT_ACTIVE_CLASSNAME, 'text-black')
        )}
        onClick={language !== currentLocale ? () => changeLocale(language) : undefined}
      >
        <span className="absolute ltr:right-2 rtl:left-2">{localesEmojis[language]}</span>
        <span>{localesLabels[language]}</span>
      </button>
    </DropdownMenuItem>
  ));

const NavbarLanguageMenu: FunctionComponent<NavbarLanguageMenuProps> = ({ isMobile }) => {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const scopedT = useScopedI18n(`${i18ns.navbar}.sr-only`);

  const [opened, setOpened] = useState<boolean>(false);
  const onOpenChange = (opened: boolean) => setOpened(opened);

  return (
    <DropdownMenu withDeepResetOnLgBreakpointEvents onOpenChange={onOpenChange} open={opened}>
      <DropdownMenuTrigger aria-label={!opened ? scopedT('open-language-switcher-menu') : scopedT('close-language-switcher-menu')} asChild>
        <button className="h-full bg-transparent text-primary-foreground">{localesEmojis[currentLocale]}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn('min-w-[125px] dark:border-card lg:relative lg:dark:border-inherit ltr:lg:right-10 rtl:lg:left-10', {
          'dark:bg-card [&>button]:h-12': isMobile,
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
