'use client';

import NavbarButtonStyle from '@/components/config/styles/NavbarButtonStyle';
import { getClientSideI18n } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { AtomicNavDataEntity } from '@/types/NavData';
import { AppPath } from '@/types/Next';
import { ClassName } from '@/types/React';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

interface INavbarButtonProps extends Omit<AtomicNavDataEntity, 'path'> {
  path?: AppPath;
  onClick?: Function;
}

type NavbarButtonProps = INavbarButtonProps & ({ onClick: Function } | { path: AppPath });

const ACTIVE: ClassName = { className: NavbarButtonStyle.isActiveClassList };
const INACTIVE: ClassName = { className: NavbarButtonStyle.isNotActiveClassList };

export const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, onClick, path: href }) => {
  const globalT = getClientSideI18n();
  const currentPathname = usePathname();

  if (onClick) {
    const classList = INACTIVE;
    return (
      <button {...{ ...classList }} onClick={() => onClick()}>
        {globalT(i18nTitle)}
      </button>
    );
  } else if (href) {
    const classList = hrefMatchesPathname(href, currentPathname) ? ACTIVE : INACTIVE;
    const target = getLinkTarget(href);

    return <Link {...{ ...classList, ...target, href }}>{globalT(i18nTitle)}</Link>;
  }
};

export default NavbarButton;
