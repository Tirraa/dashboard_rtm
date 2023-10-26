'use client';

import { getClientSideI18n, useScopedI18n } from '@/i18n/client';
import { getRefCurrentPtr } from '@/lib/react';
import { getBreakpoint } from '@/lib/tailwind';
import { NavbarItems } from '@/types/NavData';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useMediaQuery } from '@react-hook/media-query';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

interface NavbarToggleProps {
  items: NavbarItems;
}

const menuItemsGenerator = (items: NavbarItems) => {
  const globalT = getClientSideI18n();

  return items.map((item, index) => {
    return (
      <DropdownItem
        key={`navbar-hamburger-menu-item-${index}`}
        className="p-0 dark:bg-opacity-20 dark:text-gray-300 dark:hover:text-white"
        textValue={globalT(item.i18nTitle)}
      >
        {item.component}
      </DropdownItem>
    );
  });
};

const NavbarToggle: FunctionComponent<NavbarToggleProps> = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleOpenChange = (opened: boolean) => setIsMenuOpen(opened);

  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  const scopedT = useScopedI18n('navbar.sr-only');

  const togglerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const togglerInstance = getRefCurrentPtr(togglerRef);
    if (!togglerInstance) return;
    togglerInstance.dataset.open = isMenuOpen ? 'true' : 'false';
  }, [togglerRef, isMenuOpen]);

  // * ... {ToDo} https://github.com/nextui-org/nextui/discussions/1811
  useEffect(() => {
    if (isLargeScreen) setIsMenuOpen(false);
  }, [isLargeScreen]);

  return (
    <Dropdown
      showArrow={true}
      backdrop="blur"
      closeOnSelect={false}
      onOpenChange={handleOpenChange}
      className="py-1 px-1 border dark:border-black dark:bg-slate-950"
      classNames={{ arrow: 'dark:bg-slate-800' }}
    >
      <DropdownTrigger aria-label={!isMenuOpen ? scopedT('open-hamburger-menu') : scopedT('close-hamburger-menu')}>
        <button
          ref={togglerRef}
          className="w-full h-full flex flex-col items-center justify-center text-white transition-opacity outline-none before:content-[''] before:block before:h-px before:w-6 before:bg-current before:transition-transform before:duration-150 before:-translate-y-1 before:rotate-0 after:content-[''] after:block after:h-px after:w-6 after:bg-current after:transition-transform after:duration-150 after:translate-y-1 after:rotate-0 data-[open=true]:before:translate-y-px data-[open=true]:after:translate-y-0 data-[open=true]:before:rotate-45 data-[open=true]:after:-rotate-45 data-[pressed=true]:opacity-70"
        />
      </DropdownTrigger>

      <DropdownMenu className="dark:bg-slate-950" aria-label={scopedT('hamburger-menu')}>
        {menuItemsGenerator(items)}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarToggle;
