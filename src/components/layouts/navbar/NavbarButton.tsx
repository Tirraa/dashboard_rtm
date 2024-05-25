'use client';

import type { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import type { AtomicNavDataEntity } from '@/types/NavData';
import type { AppPath } from '@rtm/shared-types/Next';

import hrefAndPathnameExactMatch from '@/lib/notPortable/str/hrefAndPathnameExactMatch';
import NavbarButtonStyle from '@/components/config/styles/navbar/NavbarButtonStyle';
import hrefMatchesPathname from '@/lib/notPortable/str/hrefMatchesPathname';
import getLinkTarget from '@rtm/shared-lib/portable/react/getLinkTarget';
import { getClientSideI18n } from '@/i18n/client';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import cn from '@/lib/portable/tailwind/cn';
import Link from 'next/link';

type OptionalIcon = { icon?: ReactNode };
type OptionalPath = { path?: AppPath };
type OptionalOnClick = { onClick?: MouseEventHandler<HTMLButtonElement> };

type RequiredPath = Required<OptionalPath>;
type RequiredOnClick = Required<OptionalOnClick>;

interface INavbarButtonProps extends Pick<AtomicNavDataEntity, 'i18nTitle'>, OptionalPath, OptionalOnClick, OptionalIcon {}
type NavbarButtonProps = (RequiredOnClick | RequiredPath) & INavbarButtonProps;

const { isNotActiveClassList, isActiveClassList } = NavbarButtonStyle;

const ButtonAsIs: FunctionComponent<Pick<NavbarButtonProps, 'i18nTitle' | 'onClick'> & OptionalIcon> = ({ onClick: onClickFun, i18nTitle, icon }) => {
  const globalT = getClientSideI18n();

  if (onClickFun) {
    return icon ? (
      <Button className={cn(isNotActiveClassList, 'items-center gap-2 bg-transparent')} onClick={(e) => onClickFun(e)}>
        {icon}
        {globalT(i18nTitle)}
      </Button>
    ) : (
      <Button className={cn(isNotActiveClassList, 'bg-transparent')} onClick={(e) => onClickFun(e)}>
        {globalT(i18nTitle)}
      </Button>
    );
  }

  return icon ? (
    <Button className={cn(isNotActiveClassList, 'bg-transparent')}>
      {icon}
      {globalT(i18nTitle)}
    </Button>
  ) : (
    <Button className={cn(isNotActiveClassList, 'bg-transparent')}>{globalT(i18nTitle)}</Button>
  );
};

const ButtonAsLink: FunctionComponent<Pick<AtomicNavDataEntity, 'i18nTitle' | 'path'> & OptionalIcon> = ({ path: href, i18nTitle, icon }) => {
  const globalT = getClientSideI18n();
  const currentPathname = usePathname();
  const isActive = hrefMatchesPathname(href, currentPathname);
  const className = isActive ? isActiveClassList : isNotActiveClassList;
  const target = getLinkTarget(href);
  const exactMatch = hrefAndPathnameExactMatch(href, currentPathname);

  if (icon) {
    return (
      <Link className={cn(className, 'flex items-center')} aria-current={exactMatch ? 'page' : undefined} target={target} href={href}>
        {icon}
        {globalT(i18nTitle)}
      </Link>
    );
  }

  return (
    <Link aria-current={exactMatch ? 'page' : undefined} className={className} target={target} href={href}>
      {globalT(i18nTitle)}
    </Link>
  );
};

const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, onClick, path, icon }) => {
  const generateNavbarButtonWithoutIcon: () => ReactNode = () => {
    if (onClick) return <ButtonAsIs i18nTitle={i18nTitle} onClick={onClick} />;
    else if (path) return <ButtonAsLink i18nTitle={i18nTitle} path={path} />;
    return null;
  };

  const generateNavbarButtonWithIcon: () => ReactNode = () => {
    if (onClick) return <ButtonAsIs i18nTitle={i18nTitle} onClick={onClick} icon={icon} />;
    else if (path) return <ButtonAsLink i18nTitle={i18nTitle} icon={icon} path={path} />;
    return null;
  };

  return icon ? generateNavbarButtonWithIcon() : generateNavbarButtonWithoutIcon();
};

export default NavbarButton;
