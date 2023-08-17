'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import getSlashEnvelope from '../_lib/getSlashEnvelope';
import { NavDataRouteTitleGetter } from '../_types/NavData';
import NavbarButtonStyle from './_config/_styles/NavbarButtonStyle';

interface NavbarButtonProps {
  href: string;
  title: NavDataRouteTitleGetter;
}

const active = { className: NavbarButtonStyle.isActive };
const inactive = { className: NavbarButtonStyle.isNotActive };

const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ href, title }) => {
  const currentPathname = usePathname();
  const activeStateCls = currentPathname === href || (href !== '/' && currentPathname.startsWith(getSlashEnvelope(href))) ? active : inactive;
  const p = { ...activeStateCls, href };

  return <Link {...p}>{title()}</Link>;
};

export default NavbarButton;
