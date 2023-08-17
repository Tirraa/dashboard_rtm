'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import { NavDataRouteTitleGetter } from '../_types/NavData';

interface NavbarButtonProps {
  href: string;
  title: NavDataRouteTitleGetter;
}

const active = { className: 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium' };
const inactive = { className: 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium' };

const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ href, title }) => {
  const currentPathname = usePathname();
  const activeStateCls = currentPathname === href ? active : inactive;
  const p = { href, ...activeStateCls };

  return <Link {...p}>{title()}</Link>;
};

export default NavbarButton;
