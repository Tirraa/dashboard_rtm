'use client';

import NavbarDropdownButtonIconStyle from '@/components/config/styles/navbar/NavbarDropdownButtonIconStyle';
import NavbarDropdownMenuButtonStyle, {
  NAVBAR_DROPDOWN_MENU_BUTTON_COMPONENTS_PROPS,
  NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST
} from '@/components/config/styles/navbar/NavbarDropdownMenuButtonStyle';
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
      <MenuItem key={`${href}-${title}-navbar-menu-item`} className="p-0 dark:bg-opacity-20 dark:text-gray-300 dark:hover:text-white">
        <Link className={NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST} {...{ title, href, ...target }}>
          {title}
        </Link>
      </MenuItem>
    );
  });
};

export const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, path: href, embeddedEntities }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const currentPathname = usePathname();
  const navbarDropdownClassName =
    hrefMatchesPathname(href, currentPathname) || openMenu ? navbarDropdownIsActiveClassList : navbarDropdownIsNotActiveClassList;
  const navbarDropdownBtnClassName = openMenu ? navbarDropdownBtnIconIsActiveClassList : navbarDropdownBtnIconIsNotActiveClassList;
  const globalT = getClientSideI18n();
  const title = globalT(i18nTitle);

  return (
    <Menu {...NAVBAR_DROPDOWN_MENU_BUTTON_COMPONENTS_PROPS} handler={setOpenMenu} open={openMenu}>
      <MenuHandler>
        <div tabIndex={0} className={navbarDropdownClassName}>
          {title}
          <ChevronDownIcon className={navbarDropdownBtnClassName} aria-hidden="true" />
        </div>
      </MenuHandler>
      <MenuList {...{ className: 'dark:bg-slate-950 dark:border-gray-500' }}>{menuItemsGenerator(embeddedEntities)}</MenuList>
    </Menu>
  );
};

export default NavbarDropdown;
