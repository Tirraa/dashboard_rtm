'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { LANGUAGES, i18ns } from '@/config/i18n';
import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/i18n/client';
import localesLabels, { localesEmojis } from '@/i18n/localesLabels';
import { cn } from '@/lib/tailwind';
import type { WithIsMobile } from '@/types/Next';
import type { LanguageFlag } from '@/types/i18n';
import type { FunctionComponent } from 'react';

interface NavbarLanguageMenuProps extends WithIsMobile {}

const dropdownItemsGenerator = (changeLocale: (language: LanguageFlag) => void) =>
  LANGUAGES.map((language) => (
    <DropdownMenuItem key={language} className="relative" textValue={localesLabels[language]} asChild>
      <button onClick={() => changeLocale(language)} className="w-full">
        <span className="absolute right-2">{localesEmojis[language]}</span>
        <span>{localesLabels[language]}</span>
      </button>
    </DropdownMenuItem>
  ));

export const NavbarLanguageMenu: FunctionComponent<NavbarLanguageMenuProps> = ({ isMobile }) => {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const scopedT = useScopedI18n(`${i18ns.navbar}.sr-only`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-full bg-transparent text-primary-foreground">{localesEmojis[currentLocale]}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn('min-w-[110px]', { 'relative bottom-5': isMobile })} aria-label={scopedT('language-switcher-menu')}>
        {dropdownItemsGenerator(changeLocale)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarLanguageMenu;
