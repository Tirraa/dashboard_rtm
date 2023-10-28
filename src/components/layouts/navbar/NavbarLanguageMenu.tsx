'use client';

import { LANGUAGES, i18ns } from '@/config/i18n';
import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/i18n/client';
import localesLabels, { localesEmojis } from '@/i18n/localesLabels';
import { cn } from '@/lib/tailwind';
import { WithIsMobile } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { FunctionComponent } from 'react';

interface NavbarLanguageMenuProps extends WithIsMobile {}

const dropdownItemsGenerator = () =>
  LANGUAGES.map((language) => (
    <DropdownItem key={language} className="relative" textValue={localesLabels[language]}>
      <span className="absolute ltr:right-2 rtl:left-2">{localesEmojis[language]}</span>
      {localesLabels[language]}
    </DropdownItem>
  ));

export const NavbarLanguageMenu: FunctionComponent<NavbarLanguageMenuProps> = ({ isMobile }) => {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const scopedT = useScopedI18n(`${i18ns.navbar}.sr-only`);

  const nextuiRelatedClasses = cn('min-w-unit-0', isMobile ? 'w-unit-7' : 'w-unit-5');
  const classNameBase = 'h-full bg-transparent text-white';

  return (
    <Dropdown className="min-w-[135px]">
      <DropdownTrigger>
        <button className={cn(classNameBase, nextuiRelatedClasses)}>{localesEmojis[currentLocale]}</button>
      </DropdownTrigger>
      <DropdownMenu aria-label={scopedT('language-switcher-menu')} onAction={(k) => changeLocale(k as LanguageFlag)}>
        {dropdownItemsGenerator()}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarLanguageMenu;
