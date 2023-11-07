'use client';

import NavbarDropdownButtonIconStyle from '@/components/config/styles/navbar/NavbarDropdownButtonIconStyle';
import NavbarDropdownMenuButtonStyle, {
  NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST
} from '@/components/config/styles/navbar/NavbarDropdownMenuButtonStyle';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { getClientSideI18n } from '@/i18n/client';
import { getLinkTarget, getRefCurrentPtr } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { getBreakpoint } from '@/lib/tailwind';
import type { EmbeddedEntities, NavbarDropdownElement } from '@/types/NavData';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useMediaQuery } from '@react-hook/media-query';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

interface NavbarButtonProps extends NavbarDropdownElement {}

const { isActiveClassList: navbarDropdownIsActiveClassList, isNotActiveClassList: navbarDropdownIsNotActiveClassList } =
  NavbarDropdownMenuButtonStyle;

const { isActiveClassList: navbarDropdownBtnIconIsActiveClassList, isNotActiveClassList: navbarDropdownBtnIconIsNotActiveClassList } =
  NavbarDropdownButtonIconStyle;

const menuItemsGenerator = (embeddedEntities: EmbeddedEntities, triggerRef: RefObject<HTMLButtonElement>) => {
  const globalT = getClientSideI18n();

  return embeddedEntities.map(({ path: href, i18nTitle }) => {
    const title = globalT(i18nTitle);
    const target = getLinkTarget(href);
    const triggerRefInstance = getRefCurrentPtr(triggerRef);
    const minWidth = triggerRefInstance ? window.getComputedStyle(triggerRefInstance).width : '0';

    return (
      <DropdownMenuItem
        key={`${href}-${title}-navbar-menu-item`}
        className="p-0 dark:bg-opacity-20 dark:text-muted-foreground dark:hover:text-primary-foreground"
        textValue={title}
        style={{ minWidth }}
        asChild
      >
        <Link className={NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST} title={title} href={href} target={target}>
          {title}
        </Link>
      </DropdownMenuItem>
    );
  });
};

// {ToDo} Use Navigation Menu instead of this.
// https://github.com/radix-ui/themes/discussions/139
export const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, path: href, embeddedEntities }) => {
  const currentPathname = usePathname();
  const globalT = getClientSideI18n();
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const title = globalT(i18nTitle);

  const [isOpened, setIsOpened] = useState<boolean>(false);
  useEffect(() => {
    if (!isLargeScreen) setIsOpened(false);
  }, [isLargeScreen]);

  const navbarDropdownClassName =
    hrefMatchesPathname(href, currentPathname) || isOpened ? navbarDropdownIsActiveClassList : navbarDropdownIsNotActiveClassList;
  const navbarDropdownBtnClassName = isOpened ? navbarDropdownBtnIconIsActiveClassList : navbarDropdownBtnIconIsNotActiveClassList;

  const onOpenChange = (opened: boolean) => setIsOpened(opened);

  return (
    <DropdownMenu open={isOpened} onOpenChange={onOpenChange} withDeepResetOnLgBreakpointEvents>
      <DropdownMenuTrigger ref={triggerRef} asChild>
        <button className={navbarDropdownClassName}>
          {title}
          <ChevronDownIcon className={navbarDropdownBtnClassName} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label={title}>{menuItemsGenerator(embeddedEntities, triggerRef)}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
