'use client';

import NavbarButtonStyle from '@/components/_config/_styles/NavbarButtonStyle';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { NavDataRouteTitleGetter } from '@/types/NavData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

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
