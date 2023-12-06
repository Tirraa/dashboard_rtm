'use client';

import { i18ns } from '##/config/i18n';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { getClientSideI18n, useScopedI18n } from '@/i18n/client';
import { getBreakpoint } from '@/lib/tailwind';
import type { NavbarItems } from '@/types/NavData';
import { useMediaQuery } from '@react-hook/media-query';
import { preserveKeyboardNavigation } from '@rtm/shared-lib/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';

interface NavbarToggleProps {
  items: NavbarItems;
}

const menuItemsGenerator = (items: NavbarItems) => {
  const globalT = getClientSideI18n();

  return items.map((item, index) => {
    return (
      <DropdownMenuItem
        key={`navbar-hamburger-menu-item-${index}`}
        className="my-1 p-0"
        textValue={globalT(item.i18nTitle)}
        onClick={(event) => preserveKeyboardNavigation(event.target)}
      >
        {item.jsx}
      </DropdownMenuItem>
    );
  });
};

const NavbarToggle: FunctionComponent<NavbarToggleProps> = ({ items }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const onOpenChange = (opened: boolean) => setIsOpened(opened);

  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  const scopedT = useScopedI18n(`${i18ns.navbar}.sr-only`);

  const togglerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const togglerInstance = getRefCurrentPtr(togglerRef);
    if (!togglerInstance) return;
    togglerInstance.dataset.open = isOpened ? 'true' : 'false';
  }, [togglerRef, isOpened]);

  useEffect(() => {
    if (isLargeScreen) setIsOpened(false);
  }, [isLargeScreen]);

  const className =
    "flex h-full w-full flex-col items-center justify-center text-white transition-opacity before:block before:h-px before:w-6 before:-translate-y-1 before:rotate-0 before:bg-current before:transition-transform before:duration-150 before:content-[''] after:block after:h-px after:w-6 after:translate-y-1 after:rotate-0 after:bg-current after:transition-transform after:duration-150 after:content-[''] data-[pressed=true]:opacity-70 data-[open=true]:before:translate-y-px data-[open=true]:before:rotate-45 data-[open=true]:after:translate-y-0 data-[open=true]:after:-rotate-45";

  return (
    <DropdownMenu open={isOpened} onOpenChange={onOpenChange} withDeepResetOnLgBreakpointEvents>
      <DropdownMenuTrigger aria-label={!isOpened ? scopedT('open-hamburger-menu') : scopedT('close-hamburger-menu')} asChild>
        <button ref={togglerRef} className={className} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative min-w-[145px] ltr:right-4 rtl:left-4 dark:border-card" aria-label={scopedT('hamburger-menu')}>
        <nav>{menuItemsGenerator(items)}</nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarToggle;
