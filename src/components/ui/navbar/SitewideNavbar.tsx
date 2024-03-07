'use client';

import type { FunctionComponent, ReactElement } from 'react';
import type { NavbarItems } from '@/types/NavData';

import { NAVBAR_EXTRAS_COMPONENTS_DESKTOP, NAVBAR_EXTRAS_COMPONENTS_MOBILE } from '@/config/SitewideNavbar/Extras/utils/ComponentsMapping';
import SITEWIDE_NAVBAR_ROUTES, { SITEWIDE_NAVBAR_ROUTES_TITLES } from '@/config/SitewideNavbar/routesImpl';
import SITEWIDE_NAVBAR_DROPDOWNS_CONFIG from '@/config/SitewideNavbar/dropdownsConfig';
import NAVBAR_STYLE from '@/components/config/styles/navbar/NavbarStyle';
import NavbarButton from '@/components/layouts/navbar/NavbarButton';
import NavbarToggle from '@/components/layouts/navbar/NavbarToggle';
import getComputedNavData from '@/lib/misc/getComputedNavData';
import NavbarElement from '@/components/ui/hoc/NavbarElement';
import { getClientSideI18n } from '@/i18n/client';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Image from 'next/image';
import Link from 'next/link';

interface SitewideNavbarProps {}

const { LOGO_SIZE_PX_VALUE } = NAVBAR_STYLE;
const navbarExtrasForMobileClassNameBase = 'h-[40px]';

const buildNavbarExtrasForDesktop: () => ReactElement[] = () =>
  Object.values(NAVBAR_EXTRAS_COMPONENTS_DESKTOP).map((jsx, index) => (
    <li key={`${index}-navbar-extra-desktop`} className="flex h-fit w-fit p-[2px]">
      {jsx}
    </li>
  ));

const buildNavbarExtrasForMobile: () => ReactElement[] = () =>
  Object.values(NAVBAR_EXTRAS_COMPONENTS_MOBILE).map((jsx, index) => (
    <li className={navbarExtrasForMobileClassNameBase} key={`${index}-navbar-extra-mobile`}>
      {jsx}
    </li>
  ));

function buildNavbarItems(): NavbarItems {
  const computedNavData = getComputedNavData(SITEWIDE_NAVBAR_ROUTES, SITEWIDE_NAVBAR_ROUTES_TITLES, SITEWIDE_NAVBAR_DROPDOWNS_CONFIG);
  const navbarItems = computedNavData.map(({ embeddedEntities, i18nTitle, path }) => ({
    jsx: <NavbarElement key={`${i18nTitle}-${path}-navbar-btn`} embeddedEntities={embeddedEntities} i18nTitle={i18nTitle} path={path} />,
    i18nTitle
  }));
  return navbarItems;
}

const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = () => {
  const globalT = getClientSideI18n();
  const logoAlt = globalT(`${i18ns.vocab}.sr-only.brand-logo`);

  const navbarItemClassName = 'p-[5px]';
  const navbarItems = buildNavbarItems();
  const desktopNavbarItems = navbarItems.map((item, index) => (
    <li key={`${index}-navbar-btn-typography-desktop`} className={navbarItemClassName}>
      {item.jsx}
    </li>
  ));

  const mobileNavbarItems: NavbarItems = navbarItems.map((item) => ({
    ...item,
    jsx: item.jsx.props.embeddedEntities ? <NavbarButton {...item.jsx.props} /> : item.jsx
  }));

  const navbarExtrasClassNameBase = 'gap-4 h-full flex-row flex-nowrap items-center';
  const navbarBrand = (
    <Link className="transition-[filter] hover:brightness-75" href={ROUTES_ROOTS.WEBSITE}>
      <Image height={LOGO_SIZE_PX_VALUE} src="/assets/rtm-logo.svg" width={LOGO_SIZE_PX_VALUE} alt={logoAlt} priority />
    </Link>
  );

  return (
    <nav className="max-w-screen min-w-screen sticky inset-x-0 top-0 z-30 flex h-auto w-screen select-none items-center justify-center bg-black backdrop-blur-lg backdrop-saturate-150 dark:bg-card">
      <header className="max-w-screen relative z-30 flex h-[82px] w-screen flex-row flex-nowrap items-center justify-between gap-4 px-5">
        {navbarBrand}

        <ul className="hidden justify-center gap-4 lg:flex">{desktopNavbarItems}</ul>

        <ul className={cn('relative hidden justify-end lg:flex ltr:left-1 rtl:right-1', navbarExtrasClassNameBase)}>
          {buildNavbarExtrasForDesktop()}
        </ul>

        <ul className={cn('flex justify-end lg:hidden', navbarExtrasClassNameBase)}>
          {buildNavbarExtrasForMobile()}
          <li className={navbarExtrasForMobileClassNameBase}>
            <NavbarToggle items={mobileNavbarItems} />
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default SitewideNavbar;
