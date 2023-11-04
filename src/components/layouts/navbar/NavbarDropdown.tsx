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
import type { WithOnMouseEnter, WithOnMouseLeave } from '@/types/Next';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useMediaQuery } from '@react-hook/media-query';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

interface NavbarButtonProps extends NavbarDropdownElement, Partial<WithOnMouseEnter & WithOnMouseLeave> {}

const { isActiveClassList: navbarDropdownIsActiveClassList, isNotActiveClassList: navbarDropdownIsNotActiveClassList } =
  NavbarDropdownMenuButtonStyle;

const { isActiveClassList: navbarDropdownBtnIconIsActiveClassList, isNotActiveClassList: navbarDropdownBtnIconIsNotActiveClassList } =
  NavbarDropdownButtonIconStyle;

const menuItemsGenerator = (embeddedEntities: EmbeddedEntities, btnRef: RefObject<HTMLButtonElement>) => {
  const globalT = getClientSideI18n();

  return embeddedEntities.map(({ path: href, i18nTitle }) => {
    const title = globalT(i18nTitle);
    const target = getLinkTarget(href);
    const btnRefCurrentPtr = getRefCurrentPtr(btnRef);
    const minWidth = btnRefCurrentPtr ? window.getComputedStyle(btnRefCurrentPtr).width : '0';

    return (
      <DropdownMenuItem
        key={`${href}-${title}-navbar-menu-item`}
        className="p-0 dark:bg-opacity-20 dark:text-muted-foreground dark:hover:text-primary-foreground"
        textValue={title}
        style={{ minWidth }}
        asChild
      >
        <Link className={NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST} {...{ title, href, ...target }}>
          {title}
        </Link>
      </DropdownMenuItem>
    );
  });
};

export const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({
  i18nTitle,
  path: href,
  embeddedEntities,
  withOnMouseEnter,
  withOnMouseLeave
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleOpenChange = (opened: boolean) => setIsOpened(opened);
  const globalT = getClientSideI18n();
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isLargeScreen) setIsOpened(false);
  }, [isLargeScreen]);

  const currentPathname = usePathname();
  const navbarDropdownClassName =
    hrefMatchesPathname(href, currentPathname) || isOpened ? navbarDropdownIsActiveClassList : navbarDropdownIsNotActiveClassList;
  const navbarDropdownBtnClassName = isOpened ? navbarDropdownBtnIconIsActiveClassList : navbarDropdownBtnIconIsNotActiveClassList;
  const title = globalT(i18nTitle);
  const onMouseEnter = withOnMouseEnter ? () => setIsOpened(true) : undefined;
  const onMouseLeave = withOnMouseLeave ? () => setIsOpened(false) : undefined;

  return (
    <DropdownMenu open={isOpened} onOpenChange={handleOpenChange} withDeepResetOnLgBreakpointEvents>
      <DropdownMenuTrigger {...{ onMouseEnter }} asChild>
        <button className={navbarDropdownClassName} ref={btnRef}>
          {title}
          <ChevronDownIcon className={navbarDropdownBtnClassName} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label={title} {...{ onMouseLeave }}>
        {menuItemsGenerator(embeddedEntities, btnRef)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
