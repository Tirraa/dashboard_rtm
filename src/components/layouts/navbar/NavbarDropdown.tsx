'use client';

import NavbarDropdownButtonIconStyle from '@/components/config/styles/navbar/NavbarDropdownButtonIconStyle';
import NavbarHamburgerMenuButtonStyle, {
  NAVBAR_HAMBURGER_MENU_BUTTON_COMPONENTS_PROPS,
  NAVBAR_HAMBURGER_MENU_INNER_BUTTONS_CLASSLIST
} from '@/components/config/styles/navbar/NavbarHamburgerMenuButtonStyle';
import { getClientSideI18n } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { EmbeddedEntities, NavbarDropdownElement } from '@/types/NavData';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent, useState } from 'react';

interface NavbarButtonProps extends NavbarDropdownElement {}

const { isActiveClassList: navbarHamburgerIsActiveClassList, isNotActiveClassList: navbarHamburgerIsNotActiveClassList } =
  NavbarHamburgerMenuButtonStyle;

const { isActiveClassList: navbarDropdownBtnIconIsActiveClassList, isNotActiveClassList: navbarDropdownBtnIconIsNotActiveClassList } =
  NavbarDropdownButtonIconStyle;

const menuItemsGenerator = (embeddedEntities: EmbeddedEntities) => {
  const globalT = getClientSideI18n();
  return embeddedEntities.map(({ path: href, i18nTitle }) => {
    const title = globalT(i18nTitle);
    const target = getLinkTarget(href);

    return (
      <MenuItem key={`${href}-${title}-navbar-menu-item`} className="p-0 dark:bg-opacity-20 dark:text-gray-300 dark:hover:text-white">
        <Link className={NAVBAR_HAMBURGER_MENU_INNER_BUTTONS_CLASSLIST} {...{ title, href, ...target }}>
          {title}
        </Link>
      </MenuItem>
    );
  });
};

export const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, path: href, embeddedEntities }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const currentPathname = usePathname();
  const navbarHamburgerClassName =
    hrefMatchesPathname(href, currentPathname) || openMenu ? navbarHamburgerIsActiveClassList : navbarHamburgerIsNotActiveClassList;
  const navbarDropdownBtnClassName = openMenu ? navbarDropdownBtnIconIsActiveClassList : navbarDropdownBtnIconIsNotActiveClassList;
  const globalT = getClientSideI18n();
  const title = globalT(i18nTitle);

  return (
    <Menu {...NAVBAR_HAMBURGER_MENU_BUTTON_COMPONENTS_PROPS} handler={setOpenMenu} open={openMenu}>
      <MenuHandler>
        <div className={navbarHamburgerClassName}>
          {title}
          <ChevronDownIcon className={navbarDropdownBtnClassName} aria-hidden="true" />
        </div>
      </MenuHandler>
      <MenuList {...{ className: 'dark:bg-slate-950 dark:border-gray-500' }}>{menuItemsGenerator(embeddedEntities)}</MenuList>
    </Menu>
  );
};

export default NavbarDropdown;
