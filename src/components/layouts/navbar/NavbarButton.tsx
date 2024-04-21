'use client';

import type { ButtonHTMLAttributes as ReactButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';
import type { WithClassname, AppPath } from '@rtm/shared-types/Next';
import type { AtomicNavDataEntity } from '@/types/NavData';

import NavbarButtonStyle from '@/components/config/styles/navbar/NavbarButtonStyle';
import { hrefAndPathnameExactMatch, hrefMatchesPathname } from '@/lib/str';
import getLinkTarget from '@rtm/shared-lib/portable/react/getLinkTarget';
import { getClientSideI18n } from '@/i18n/client';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

type OptionalIcon = { icon?: ReactNode };
type OptionalPath = { path?: AppPath };

interface INavbarButtonProps
  extends Pick<AtomicNavDataEntity, 'i18nTitle'>,
    OptionalPath,
    OptionalIcon,
    ReactButtonHTMLAttributes<HTMLButtonElement> {}

type NavbarButtonProps = INavbarButtonProps & OptionalPath;

const { isNotActiveClassList, isActiveClassList } = NavbarButtonStyle;

const ButtonAsIs: FunctionComponent<Pick<NavbarButtonProps, 'i18nTitle' | 'onClick' | 'type'> & Partial<WithClassname> & OptionalIcon> = ({
  className: classNameValue,
  i18nTitle,
  onClick,
  icon,
  type
}) => {
  const globalT = getClientSideI18n();

  return icon ? (
    <Button className={cn(isNotActiveClassList, 'bg-transparent', classNameValue)} onClick={onClick} type={type}>
      {icon}
      {globalT(i18nTitle)}
    </Button>
  ) : (
    <Button className={cn(isNotActiveClassList, 'bg-transparent', classNameValue)} onClick={onClick} type={type}>
      {globalT(i18nTitle)}
    </Button>
  );
};

const ButtonAsLink: FunctionComponent<Pick<AtomicNavDataEntity, 'i18nTitle' | 'path'> & Partial<WithClassname> & OptionalIcon> = ({
  className: classNameValue,
  path: href,
  i18nTitle,
  icon
}) => {
  const globalT = getClientSideI18n();
  const currentPathname = usePathname();
  const isActive = hrefMatchesPathname(href, currentPathname);
  const className = cn(isActive ? isActiveClassList : isNotActiveClassList, classNameValue);
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

const NavbarButton: FunctionComponent<NavbarButtonProps> = ({ i18nTitle, className, onClick, path, icon, type }) => {
  const generateNavbarButtonWithoutIcon: () => ReactNode = () =>
    path ? (
      <ButtonAsLink className={className} i18nTitle={i18nTitle} path={path} />
    ) : (
      <ButtonAsIs className={className} i18nTitle={i18nTitle} onClick={onClick} type={type} />
    );

  const generateNavbarButtonWithIcon: () => ReactNode = () =>
    path ? (
      <ButtonAsLink i18nTitle={i18nTitle} className={className} icon={icon} path={path} />
    ) : (
      <ButtonAsIs i18nTitle={i18nTitle} className={className} onClick={onClick} icon={icon} type={type} />
    );

  return icon ? generateNavbarButtonWithIcon() : generateNavbarButtonWithoutIcon();
};

export default NavbarButton;
