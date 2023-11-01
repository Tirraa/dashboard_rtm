'use client';

import NavbarButtonStyle from '@/components/config/styles/navbar/NavbarButtonStyle';
import { getClientSideI18n } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { hrefMatchesPathname } from '@/lib/str';
import { cn } from '@/lib/tailwind';
import type { AtomicNavDataEntity } from '@/types/NavData';
import type { AppPath } from '@/types/Next';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent, ReactNode } from 'react';

type OptionalIcon = { icon?: ReactNode };
type OptionalPath = { path?: AppPath };
type OptionalOnClick = { onClick?: Function };

type RequiredPath = Required<OptionalPath>;
type RequiredOnClick = Required<OptionalOnClick>;

interface INavbarButtonProps extends Pick<AtomicNavDataEntity, 'i18nTitle'>, OptionalPath, OptionalOnClick, OptionalIcon {}
type NavbarButtonProps = INavbarButtonProps & (RequiredOnClick | RequiredPath);

const { isActiveClassList, isNotActiveClassList } = NavbarButtonStyle;

const ButtonAsIs: FunctionComponent<Pick<NavbarButtonProps, 'i18nTitle' | 'onClick'> & OptionalIcon> = ({ i18nTitle, onClick: onClickFun, icon }) => {
  const globalT = getClientSideI18n();

  if (onClickFun) {
    return icon ? (
      <Button className={cn(isNotActiveClassList, 'items-center gap-2 bg-slate-900')} onClick={() => onClickFun()}>
        {icon}
        {globalT(i18nTitle)}
      </Button>
    ) : (
      <Button className={cn(isNotActiveClassList, 'bg-slate-900')} onClick={() => onClickFun()}>
        {globalT(i18nTitle)}
      </Button>
    );
  }

  return icon ? (
    <Button className={cn(isNotActiveClassList, 'bg-slate-900')}>
      {icon}
      {globalT(i18nTitle)}
    </Button>
  ) : (
    <Button className={cn(isNotActiveClassList, 'bg-slate-900')}>{globalT(i18nTitle)}</Button>
  );
};

const ButtonAsLink: FunctionComponent<Pick<AtomicNavDataEntity, 'i18nTitle' | 'path'> & OptionalIcon> = ({ i18nTitle, path: href, icon }) => {
  const globalT = getClientSideI18n();
  const currentPathname = usePathname();
  const className = hrefMatchesPathname(href, currentPathname) ? isActiveClassList : isNotActiveClassList;
  const target = getLinkTarget(href);

  if (icon) {
    return (
      <Link {...{ href, ...target }} className={cn(className, 'flex items-center')}>
        {icon}
        {globalT(i18nTitle)}
      </Link>
    );
  }
  return <Link {...{ className, href, ...target }}>{globalT(i18nTitle)}</Link>;
};

export const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, onClick, path, icon }) => {
  const generateNavbarButtonWithoutIcon = (): ReactNode => {
    if (onClick) return <ButtonAsIs {...{ i18nTitle, onClick }} />;
    else if (path) return <ButtonAsLink {...{ i18nTitle, path }} />;
    return null;
  };

  const generateNavbarButtonWithIcon = (): ReactNode => {
    if (onClick) return <ButtonAsIs {...{ i18nTitle, onClick, icon }} />;
    else if (path) return <ButtonAsLink {...{ i18nTitle, path, icon }} />;
    return null;
  };

  return icon ? generateNavbarButtonWithIcon() : generateNavbarButtonWithoutIcon();
};

export default NavbarButton;
