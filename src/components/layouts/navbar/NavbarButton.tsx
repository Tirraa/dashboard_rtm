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
import { ComponentType, FunctionComponent, ReactNode } from 'react';

type MyIcon = ComponentType<unknown>;

interface INavbarButtonProps extends Omit<AtomicNavDataEntity, 'path'> {
  path?: AppPath;
  onClick?: Function;
  __Icon?: MyIcon;
}
type NavbarButtonProps = INavbarButtonProps & ({ onClick: Function } | { path: AppPath });

const { isActiveClassList, isNotActiveClassList } = NavbarButtonStyle;

const ButtonAsIs: FunctionComponent<Pick<NavbarButtonProps, 'i18nTitle' | 'onClick'> & { __Icon?: MyIcon }> = ({
  i18nTitle,
  onClick: onClickFun,
  __Icon
}) => {
  const globalT = getClientSideI18n();

  if (onClickFun) {
    return __Icon ? (
      <Button className={isNotActiveClassList + ' ' + 'flex items-center gap-2'} onClick={() => onClickFun()}>
        <__Icon />
        {globalT(i18nTitle)}
      </Button>
    ) : (
      <Button className={isNotActiveClassList} onClick={() => onClickFun()}>
        {globalT(i18nTitle)}
      </Button>
    );
  }

  return __Icon ? (
    <Button className={isNotActiveClassList}>
      <__Icon />
      {globalT(i18nTitle)}
    </Button>
  ) : (
    <Button className={isNotActiveClassList}>{globalT(i18nTitle)}</Button>
  );
};

const ButtonAsLink: FunctionComponent<AtomicNavDataEntity & { __Icon?: MyIcon }> = ({ i18nTitle, path: href, __Icon }) => {
  const globalT = getClientSideI18n();
  const currentPathname = usePathname();
  const className = hrefMatchesPathname(href, currentPathname) ? isActiveClassList : isNotActiveClassList;
  const target = getLinkTarget(href);

  if (__Icon) {
    return (
      <Link {...{ href, ...target }} className={className + ' ' + 'flex items-center'}>
        <__Icon />
        {globalT(i18nTitle)}
      </Link>
    );
  }
  return <Link {...{ className, href, ...target }}>{globalT(i18nTitle)}</Link>;
};

export function NavbarButton({ i18nTitle, onClick, path, __Icon }: NavbarButtonProps) {
  const generateNavbarButtonWithoutIcon = (): ReactNode => {
    if (onClick) return <ButtonAsIs {...{ i18nTitle, onClick }} />;
    else if (path) return <ButtonAsLink {...{ i18nTitle, path }} />;
  };

  const generateNavbarButtonWithIcon = (): ReactNode => {
    if (onClick) return <ButtonAsIs {...{ i18nTitle, onClick, __Icon }} />;
    else if (path) return <ButtonAsLink {...{ i18nTitle, path, __Icon }} />;
  };

  return __Icon ? generateNavbarButtonWithIcon() : generateNavbarButtonWithoutIcon();
}

export default NavbarButton;
