'use client';

import NavbarDropdownButtonStyle, {
  navbarDropdownComponentProps,
  navbarDropdownInnerButtonsClassList
} from '@/components/_config/_styles/NavbarDropdownButtonStyle';
import { hrefMatchesPathname } from '@/lib/str';
import { EmbeddedEntities, NavDataRouteTitleGetter } from '@/types/NavData';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent, useState } from 'react';

interface NavbarButtonProps {
  title: NavDataRouteTitleGetter;
  href: string;
  embeddedEntities: EmbeddedEntities;
}

const { isActiveClassList, isNotActiveClassList } = NavbarDropdownButtonStyle;
const active = { className: isActiveClassList };
const inactive = { className: isNotActiveClassList };

const menuItemsGenerator = (embeddedEntities: EmbeddedEntities) =>
  embeddedEntities.map(({ getPath: href, getTitle }) => {
    const title = getTitle();

    return (
      <MenuItem key={href + title} className="p-0">
        <Link className={navbarDropdownInnerButtonsClassList} {...{ title, href }}>
          {title}
        </Link>
      </MenuItem>
    );
  });

const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ title, href, embeddedEntities }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) || openMenu ? active : inactive;

  return (
    <Menu {...navbarDropdownComponentProps} handler={setOpenMenu} open={openMenu}>
      <MenuHandler>
        <div {...classList}>
          {title()}
          <ChevronDownIcon className={`transition-all relative top-1 ml-1 h-5 w-5 ${openMenu ? 'rotate-180' : ''}`} aria-hidden="true" />
        </div>
      </MenuHandler>
      <MenuList>{menuItemsGenerator(embeddedEntities)}</MenuList>
    </Menu>
  );
};

export default NavbarDropdown;
