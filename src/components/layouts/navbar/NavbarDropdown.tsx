'use client';

import type { NavbarDropdownElement, EmbeddedEntities } from '@/types/NavData';
import type { FunctionComponent, RefObject } from 'react';

import NavbarDropdownMenuButtonStyle, {
  NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST
} from '@/components/config/styles/navbar/NavbarDropdownMenuButtonStyle';
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenu } from '@/components/ui/DropdownMenu';
import NavbarDropdownButtonIconStyle from '@/components/config/styles/navbar/NavbarDropdownButtonIconStyle';
import { getRefCurrentPtr, getLinkTarget } from '@rtm/shared-lib/react';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState, useRef } from 'react';
import { getClientSideI18n } from '@/i18n/client';
import { hrefMatchesPathname } from '@/lib/str';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavbarButtonProps extends NavbarDropdownElement {}

const { isNotActiveClassList: navbarDropdownIsNotActiveClassList, isActiveClassList: navbarDropdownIsActiveClassList } =
  NavbarDropdownMenuButtonStyle;

const { isNotActiveClassList: navbarDropdownBtnIconIsNotActiveClassList, isActiveClassList: navbarDropdownBtnIconIsActiveClassList } =
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
        className="p-0 dark:bg-opacity-20 dark:text-muted-foreground dark:hover:text-primary-foreground"
        key={`${href}-${title}-navbar-menu-item`}
        style={{ minWidth }}
        textValue={title}
        asChild
      >
        <Link className={NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST} target={target} title={title} href={href}>
          {title}
        </Link>
      </DropdownMenuItem>
    );
  });
};

const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ embeddedEntities, path: href, i18nTitle }) => {
  const currentPathname = usePathname();
  const globalT = getClientSideI18n();
  const isLargeScreen = useIsLargeScreen();
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
    <DropdownMenu withDeepResetOnLgBreakpointEvents onOpenChange={onOpenChange} open={isOpened}>
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
