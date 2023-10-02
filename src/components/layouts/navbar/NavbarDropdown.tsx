'use client';

import NavbarDropdownButtonStyle, {
  NAVBAR_DROPDOWN_INNER_BUTTONS_CLASSLIST,
  navbarDropdownComponentProps
} from '@/components/config/styles/NavbarDropdownButtonStyle';
import { getClientSideI18n } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { EmbeddedEntities, NavbarDropdownElement } from '@/types/NavData';
import { ClassName } from '@/types/React';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent, useState } from 'react';

interface NavbarButtonProps extends NavbarDropdownElement {}

const { isActiveClassList, isNotActiveClassList } = NavbarDropdownButtonStyle;
const ACTIVE: ClassName = { className: isActiveClassList };
const INACTIVE: ClassName = { className: isNotActiveClassList };

const menuItemsGenerator = (embeddedEntities: EmbeddedEntities) => {
  const globalT = getClientSideI18n();
  return embeddedEntities.map(({ path: href, i18nTitle }) => {
    const title = globalT(i18nTitle);
    const target = getLinkTarget(href);

    return (
      <MenuItem key={`${href}-${title}-navbar-menu-item`} className="p-0 dark:bg-opacity-20 dark:text-gray-300 dark:hover:text-white">
        <Link className={NAVBAR_DROPDOWN_INNER_BUTTONS_CLASSLIST} {...{ title, href, ...target }}>
          {title}
        </Link>
      </MenuItem>
    );
  });
};

export const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, path: href, embeddedEntities }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) || openMenu ? ACTIVE : INACTIVE;
  const globalT = getClientSideI18n();
  const title = globalT(i18nTitle);

  return (
    <Menu {...navbarDropdownComponentProps} handler={setOpenMenu} open={openMenu}>
      <MenuHandler>
        <div {...classList}>
          {title}
          <ChevronDownIcon className={`transition-all relative top-1 ml-1 h-5 w-5 ${openMenu ? 'rotate-180' : ''}`} aria-hidden="true" />
        </div>
      </MenuHandler>
      <MenuList {...{ className: 'dark:bg-slate-950 dark:border-gray-500' }}>{menuItemsGenerator(embeddedEntities)}</MenuList>
    </Menu>
  );
};

export default NavbarDropdown;
