'use client';

import NavbarButtonStyle from '@/components/config/styles/navbar/NavbarButtonStyle';
import { getClientSideI18n } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { AtomicNavDataEntity } from '@/types/NavData';
import { AppPath } from '@/types/Next';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

interface INavbarButtonProps extends Omit<AtomicNavDataEntity, 'path'> {
  path?: AppPath;
  onClick?: Function;
}
type NavbarButtonProps = INavbarButtonProps & ({ onClick: Function } | { path: AppPath });

const { isActiveClassList, isNotActiveClassList } = NavbarButtonStyle;

export const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, onClick: onClickFun, path: href }) => {
  const globalT = getClientSideI18n();
  const currentPathname = usePathname();

  if (onClickFun) {
    const className = isNotActiveClassList;
    return (
      <Button {...{ className }} onClick={() => onClickFun()}>
        {globalT(i18nTitle)}
      </Button>
    );
  } else if (href) {
    const className = hrefMatchesPathname(href, currentPathname) ? isActiveClassList : isNotActiveClassList;
    const target = getLinkTarget(href);

    return <Link {...{ className, href, ...target }}>{globalT(i18nTitle)}</Link>;
  }
};

export default NavbarButton;
