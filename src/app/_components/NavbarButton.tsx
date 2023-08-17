'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import { hrefMatchesPathname } from '../_lib/hrefPathnameMatching';
import { NavDataRouteTitleGetter } from '../_types/NavData';
import NavbarButtonStyle from './_config/_styles/NavbarButtonStyle';

interface NavbarButtonProps {
  href: string;
  title: NavDataRouteTitleGetter;
}

const active = { className: NavbarButtonStyle.isActiveClassList };
const inactive = { className: NavbarButtonStyle.isNotActiveClassList };

const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ href, title }) => {
  const currentPathname = usePathname();
  const activeStateClassList = hrefMatchesPathname(href, currentPathname) ? active : inactive;
  const p = { ...activeStateClassList, href };

  return <Link {...p}>{title()}</Link>;
};

export default NavbarButton;
