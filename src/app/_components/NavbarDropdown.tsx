'use client';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import { hrefMatchesPathname } from '../_lib/hrefPathnameMatching';
import { EmbeddedEntities, NavDataRouteTitleGetter } from '../_types/NavData';
import NavbarButtonStyle from './_config/_styles/NavbarButtonStyle';

interface NavbarButtonProps {
  href: string;
  title: NavDataRouteTitleGetter;
  embeddedEntities: EmbeddedEntities;
}

const activeCls = { className: NavbarButtonStyle.isActiveClassList };
const inactiveCls = { className: NavbarButtonStyle.isNotActiveClassList };

function menuItemsGenerator(embeddedEntities: EmbeddedEntities) {
  return embeddedEntities.map(({ getPath: href, getTitle }) => {
    const title = getTitle();

    return (
      <MenuItem key={href + title}>
        <Link {...{ title, href }}>{title}</Link>
      </MenuItem>
    );
  });
}

const NavbarDropdown: FunctionComponent<NavbarButtonProps> = ({ href, title, embeddedEntities }) => {
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) ? activeCls : inactiveCls;

  return (
    <Menu>
      <MenuHandler>
        <div {...classList}>
          {title()}
          <ChevronDownIcon className="relative top-1 ml-1 h-5 w-5" aria-hidden="true" />
        </div>
      </MenuHandler>
      <MenuList>{menuItemsGenerator(embeddedEntities)}</MenuList>
    </Menu>
  );
};

export default NavbarDropdown;
