'use client';

import NavbarDropdownButtonIconStyle from '@/components/config/styles/navbar/NavbarDropdownButtonIconStyle';
import NavbarDropdownMenuButtonStyle, {
  NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST
} from '@/components/config/styles/navbar/NavbarDropdownMenuButtonStyle';
import { getClientSideI18n } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { EmbeddedEntities, NavbarDropdownElement } from '@/types/NavData';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent, useState } from 'react';

interface NavbarButtonProps extends NavbarDropdownElement {}

const { isActiveClassList: navbarDropdownIsActiveClassList, isNotActiveClassList: navbarDropdownIsNotActiveClassList } =
  NavbarDropdownMenuButtonStyle;

const { isActiveClassList: navbarDropdownBtnIconIsActiveClassList, isNotActiveClassList: navbarDropdownBtnIconIsNotActiveClassList } =
  NavbarDropdownButtonIconStyle;

const menuItemsGenerator = (embeddedEntities: EmbeddedEntities) => {
  const globalT = getClientSideI18n();
  return embeddedEntities.map(({ path: href, i18nTitle }) => {
    const title = globalT(i18nTitle);
    const target = getLinkTarget(href);

    return (
      <DropdownItem key={`${href}-${title}-navbar-menu-item`} className="p-0 dark:bg-opacity-20 dark:text-gray-300 dark:hover:text-white">
        <Link className={NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST} {...{ title, href, ...target }}>
          {title}
        </Link>
      </DropdownItem>
    );
  });
};

export const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, path: href, embeddedEntities }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleOpenChange = (opened: boolean) => {
    setIsOpened(opened);
  };

  const currentPathname = usePathname();
  const navbarDropdownClassName =
    hrefMatchesPathname(href, currentPathname) || isOpened ? navbarDropdownIsActiveClassList : navbarDropdownIsNotActiveClassList;
  const navbarDropdownBtnClassName = isOpened ? navbarDropdownBtnIconIsActiveClassList : navbarDropdownBtnIconIsNotActiveClassList;
  const globalT = getClientSideI18n();
  const title = globalT(i18nTitle);

  return (
    <Dropdown onOpenChange={handleOpenChange} className="py-1 px-1 border dark:border-black dark:bg-slate-950">
      <DropdownTrigger>
        <div tabIndex={0} className={navbarDropdownClassName}>
          {title}
          <ChevronDownIcon className={navbarDropdownBtnClassName} aria-hidden="true" />
        </div>
      </DropdownTrigger>
      <DropdownMenu className="dark:bg-slate-950">{menuItemsGenerator(embeddedEntities)}</DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
