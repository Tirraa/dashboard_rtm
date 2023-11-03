'use client';

import NAVBAR_STYLE from '@/components/config/styles/navbar/NavbarStyle';
import NavbarButton from '@/components/layouts/navbar/NavbarButton';
import NavbarToggle from '@/components/layouts/navbar/NavbarToggle';
import NavbarElement from '@/components/ui/hoc/NavbarElement';
import { NAVBAR_EXTRAS_COMPONENTS_DESKTOP, NAVBAR_EXTRAS_COMPONENTS_MOBILE } from '@/config/SitewideNavbar/Extras/utils/ComponentsMapping';
import SITEWIDE_NAVBAR_DROPDOWNS_CONFIG from '@/config/SitewideNavbar/dropdownsConfig';
import SITEWIDE_NAVBAR_ROUTES, { SITEWIDE_NAVBAR_ROUTES_TITLES } from '@/config/SitewideNavbar/routesImpl';
import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getClientSideI18n, useCurrentLocale } from '@/i18n/client';
import getComputedNavData from '@/lib/misc/getComputedNavData';
import { cn } from '@/lib/tailwind';
import i18nTaxonomy from '@/taxonomies/i18n';
import type { NavbarItems } from '@/types/NavData';
import type { WithClassname, i18nComponentProps } from '@/types/Next';
import type { LanguageFlag } from '@/types/i18n';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType, FunctionComponent, ReactNode } from 'react';

interface SitewideNavbarProps {}
type TItemAsComponent = unknown & WithClassname;

const { LOGO_SIZE_PX_VALUE } = NAVBAR_STYLE;

const buildNavbarExtrasForDesktop = (): ReactNode[] =>
  Object.values(NAVBAR_EXTRAS_COMPONENTS_DESKTOP).map((jsx, index) => (
    <li className="flex h-fit w-fit p-[2px]" key={`${index}-navbar-extra-desktop`}>
      {jsx}
    </li>
  ));

const buildNavbarExtrasForMobile = (): ReactNode[] =>
  Object.values(NAVBAR_EXTRAS_COMPONENTS_MOBILE).map((jsx, index) => (
    <li className="h-[40px]" key={`${index}-navbar-extra-mobile`}>
      {jsx}
    </li>
  ));

function buildNavbarItems({ i18nProps }: i18nComponentProps): NavbarItems {
  const computedNavData = getComputedNavData(SITEWIDE_NAVBAR_ROUTES, SITEWIDE_NAVBAR_ROUTES_TITLES, SITEWIDE_NAVBAR_DROPDOWNS_CONFIG);
  const navbarItems = computedNavData.map(({ i18nTitle, path, embeddedEntities }) => ({
    i18nTitle,
    jsx: <NavbarElement key={`${i18nTitle}-${path}-navbar-btn`} {...{ i18nProps, i18nTitle, path, embeddedEntities }} />
  }));
  return navbarItems;
}

export const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = () => {
  const globalT = getClientSideI18n();
  const logoAlt = globalT(`${i18ns.vocab}.sr-only.brand-logo`);
  const currentLocale: LanguageFlag = useCurrentLocale();

  const navbarItemClassName = 'p-[5px]';
  const navbarItems = buildNavbarItems({ i18nProps: { [i18nTaxonomy.LANG_FLAG]: currentLocale } });
  const desktopNavbarItems = navbarItems.map((item, index) => (
    <li key={`${index}-navbar-btn-typography-desktop`} className={navbarItemClassName}>
      {item.jsx}
    </li>
  ));

  const mobileNavbarItems: NavbarItems = navbarItems.map((item, index) => {
    const ItemAsComponent: ComponentType<TItemAsComponent> = () =>
      item.jsx.props.embeddedEntities ? <NavbarButton {...item.jsx.props} /> : item.jsx;
    return {
      ...item,
      jsx: <ItemAsComponent key={`${index}-navbar-btn-typography-mobile`} className={navbarItemClassName} />
    };
  });

  const navbarExtrasClassNameBase = 'gap-4 h-full flex-row flex-nowrap items-center';
  const navbarBrand = (
    <Link href={ROUTES_ROOTS.WEBSITE} className="transition-[filter] hover:brightness-75">
      <Image src="/assets/rtm-logo.svg" height={LOGO_SIZE_PX_VALUE} width={LOGO_SIZE_PX_VALUE} alt={logoAlt} priority />
    </Link>
  );

  return (
    <nav className="sticky inset-x-0 top-0 z-30 flex h-auto w-full items-center justify-center bg-black backdrop-blur-lg backdrop-saturate-150 dark:bg-card">
      <header className="relative z-30 flex h-[82px] w-full max-w-full flex-row flex-nowrap items-center justify-between gap-4 px-5">
        {navbarBrand}

        <ul className="hidden justify-center gap-4 lg:flex">{desktopNavbarItems}</ul>

        <ul className={cn('hidden justify-end lg:flex', navbarExtrasClassNameBase)}>{buildNavbarExtrasForDesktop()}</ul>

        <ul className={cn('flex justify-end lg:hidden', navbarExtrasClassNameBase)}>
          {buildNavbarExtrasForMobile()}
          <li className="h-[40px]">
            <NavbarToggle items={mobileNavbarItems} />
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default SitewideNavbar;
