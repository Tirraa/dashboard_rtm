'use client';

import NAVBAR_STYLE from '@/components/config/styles/navbar/NavbarStyle';
import NavbarButton from '@/components/layouts/navbar/NavbarButton';
import NavbarToggle from '@/components/layouts/navbar/NavbarToggle';
import NavbarElement from '@/components/shared/ui/hoc/NavbarElement';
import { NAVBAR_EXTRAS_COMPONENTS_DESKTOP, NAVBAR_EXTRAS_COMPONENTS_MOBILE } from '@/config/SitewideNavbar/Extras/utils/ComponentsMapping';
import SITEWIDE_NAVBAR_DROPDOWNS_CONFIG from '@/config/SitewideNavbar/dropdownsConfig';
import SITEWIDE_NAVBAR_ROUTES, { SITEWIDE_NAVBAR_ROUTES_TITLES } from '@/config/SitewideNavbar/routesImpl';
import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getClientSideI18n, useCurrentLocale } from '@/i18n/client';
import getComputedNavData from '@/lib/misc/getComputedNavData';
import { cn } from '@/lib/tailwind';
import i18nTaxonomy from '@/taxonomies/i18n';
import { NavbarItems } from '@/types/NavData';
import { i18nComponentProps } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { Link } from '@nextui-org/link';
import Image from 'next/image';
import { ComponentType, FunctionComponent, ReactNode } from 'react';

interface SitewideNavbarProps {}
type TItemAsComponent = unknown & { className: string };

const { LOGO_SIZE_PX_VALUE } = NAVBAR_STYLE;

const buildNavbarExtrasForDesktop = (): ReactNode[] =>
  Object.values(NAVBAR_EXTRAS_COMPONENTS_DESKTOP).map((component, index) => <li key={`${index}-navbar-extra-desktop`}>{component}</li>);

const buildNavbarExtrasForMobile = (): ReactNode[] =>
  Object.values(NAVBAR_EXTRAS_COMPONENTS_MOBILE).map((component, index) => <li key={`${index}-navbar-extra-mobile`}>{component}</li>);

function buildNavbarItems({ i18nProps }: i18nComponentProps): NavbarItems {
  const computedNavData = getComputedNavData(SITEWIDE_NAVBAR_ROUTES, SITEWIDE_NAVBAR_ROUTES_TITLES, SITEWIDE_NAVBAR_DROPDOWNS_CONFIG);
  const navbarItems = computedNavData.map(({ i18nTitle, path, embeddedEntities }) => ({
    i18nTitle,
    component: <NavbarElement key={`${i18nTitle}-${path}-navbar-btn`} {...{ i18nProps, i18nTitle, path, embeddedEntities }} />
  }));
  return navbarItems;
}

const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = () => {
  const globalT = getClientSideI18n();
  const logoAlt = globalT(`${i18ns.vocab}.sr-only.brand-logo`);
  const currentLocale: LanguageFlag = useCurrentLocale();

  const navbarItemClassName = 'p-1 font-normal';
  const navbarItems = buildNavbarItems({ i18nProps: { [i18nTaxonomy.LANG_FLAG]: currentLocale } });
  const desktopNavbarItems = navbarItems.map((item, index) => (
    <li key={`${index}-navbar-btn-typography-desktop`} className={navbarItemClassName}>
      {item.component}
    </li>
  ));

  const mobileNavbarItems: NavbarItems = navbarItems.map((item, index) => {
    const ItemAsComponent: ComponentType<TItemAsComponent> = () =>
      item.component.props.embeddedEntities ? <NavbarButton {...item.component.props} /> : item.component;
    return {
      i18nTitle: item.i18nTitle,
      component: <ItemAsComponent key={`${index}-navbar-btn-typography-mobile`} className={navbarItemClassName} />
    };
  });

  const navbarExtrasClassNameBase = 'gap-4 h-full flex-row flex-nowrap items-center';
  const navbarBrand = (
    <Link href={ROUTES_ROOTS.WEBSITE} className="transition-[filter] hover:brightness-75">
      <Image src="/assets/rtm-logo.svg" height={LOGO_SIZE_PX_VALUE} width={LOGO_SIZE_PX_VALUE} alt={logoAlt} priority={true} />
    </Link>
  );

  return (
    <nav className="flex z-30 w-full h-auto items-center justify-center sticky top-0 inset-x-0 backdrop-blur-lg backdrop-saturate-150 bg-black">
      <header className="z-30 flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[82px] max-w-full px-5">
        {navbarBrand}

        <ul className="hidden lg:flex gap-4 justify-center">{desktopNavbarItems}</ul>

        <ul className={cn('hidden lg:flex justify-end', navbarExtrasClassNameBase)}>{buildNavbarExtrasForDesktop()}</ul>

        <ul className={cn('flex lg:hidden justify-end', navbarExtrasClassNameBase)}>
          {buildNavbarExtrasForMobile()}
          <li className="h-unit-10">
            <NavbarToggle items={mobileNavbarItems} />
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default SitewideNavbar;
