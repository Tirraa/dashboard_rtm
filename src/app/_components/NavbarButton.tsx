'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import { getLinkTarget } from '../_lib/react';
import { hrefMatchesPathname } from '../_lib/str';
import { NavDataRouteTitleGetter } from '../_types/NavData';
import NavbarButtonStyle from './_config/_styles/NavbarButtonStyle';

interface NavbarButtonProps {
  title: NavDataRouteTitleGetter;
  href: string;
}

const active = { className: NavbarButtonStyle.isActiveClassList };
const inactive = { className: NavbarButtonStyle.isNotActiveClassList };

const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ title, href }) => {
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) ? active : inactive;
  const target = getLinkTarget(href);

  return <Link {...{ ...classList, href, ...target }}>{title()}</Link>;
};

export default NavbarButton;
