'use client';

import NAVBAR_STYLE from '@/components/config/styles/navbar/NavbarStyle';
import NavbarButton from '@/components/layouts/navbar/NavbarButton';
import NavbarElement from '@/components/layouts/navbar/NavbarElement';
import { NAVBAR_EXTRAS_COMPONENTS_DESKTOP, NAVBAR_EXTRAS_COMPONENTS_MOBILE } from '@/config/SitewideNavbar/Extras/utils/ComponentsMapping';
import SITEWIDE_NAVBAR_DROPDOWNS_CONFIG from '@/config/SitewideNavbar/dropdownsConfig';
import SITEWIDE_NAVBAR_ROUTES, { SITEWIDE_NAVBAR_ROUTES_TITLES } from '@/config/SitewideNavbar/routesImpl';
import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getClientSideI18n, useCurrentLocale } from '@/i18n/client';
import getComputedNavData from '@/lib/misc/getComputedNavData';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nComponentProps } from '@/types/Next';
import { LanguageFlag } from '@/types/i18n';
import { Link } from '@nextui-org/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/navbar';
import Image from 'next/image';
import { FunctionComponent } from 'react';

interface SitewideNavbarProps {}

const { LOGO_SIZE_PX_VALUE } = NAVBAR_STYLE;

const buildNavbarExtrasForDesktop = () =>
  Object.values(NAVBAR_EXTRAS_COMPONENTS_DESKTOP).map((component, index) => (
    <NavbarItem key={`${index}-navbar-extra-desktop`}>{component}</NavbarItem>
  ));

const buildNavbarExtrasForMobile = () =>
  Object.values(NAVBAR_EXTRAS_COMPONENTS_MOBILE).map((component, index) => <NavbarItem key={`${index}-navbar-extra-mobile`}>{component}</NavbarItem>);

function buildNavbarElements({ i18nProps }: i18nComponentProps) {
  const computedNavData = getComputedNavData(SITEWIDE_NAVBAR_ROUTES, SITEWIDE_NAVBAR_ROUTES_TITLES, SITEWIDE_NAVBAR_DROPDOWNS_CONFIG);
  const navbarElements = computedNavData.map(({ i18nTitle, path, embeddedEntities }) => (
    <NavbarElement key={`${i18nTitle}-${path}-navbar-btn`} {...{ i18nProps, i18nTitle, path, embeddedEntities }} />
  ));
  return navbarElements;
}

const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = () => {
  const globalT = getClientSideI18n();
  const logo = globalT(`${i18ns.ugly}.logo`);
  const brand = globalT(`${i18ns.vocab}.brand`);
  const currentLocale: LanguageFlag = useCurrentLocale();

  const navbarElements = buildNavbarElements({ i18nProps: { [i18nTaxonomy.LANG_FLAG]: currentLocale } });
  const desktopNavbarElements = navbarElements.map((elm, index) => (
    <NavbarItem key={`${index}-navbar-btn-typography-desktop`} className="p-1 font-normal">
      {elm}
    </NavbarItem>
  ));

  const mobileNavbarElements = navbarElements.map((elm, index) => (
    <NavbarMenuItem key={`${index}-navbar-btn-typography-mobile`} className="p-1 font-normal">
      {elm.props.embeddedEntities ? <NavbarButton {...elm.props} /> : elm}
    </NavbarMenuItem>
  ));

  return (
    <Navbar height={'82px'} maxWidth="full" classNames={{ base: 'bg-black', wrapper: 'px-5' }} disableAnimation>
      <NavbarContent className="lg:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href={ROUTES_ROOTS.WEBSITE} className="transition-[filter] hover:brightness-75">
            <div className="flex">
              <Image src="/assets/rtm-logo.svg" height={LOGO_SIZE_PX_VALUE} width={LOGO_SIZE_PX_VALUE} alt={`${brand} (${logo})`} priority={true} />
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="start">
        <NavbarBrand>
          <Link href={ROUTES_ROOTS.WEBSITE} className="transition-[filter] hover:brightness-75">
            <div className="flex">
              <Image src="/assets/rtm-logo.svg" height={LOGO_SIZE_PX_VALUE} width={LOGO_SIZE_PX_VALUE} alt={`${brand} (${logo})`} priority={true} />
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {desktopNavbarElements}
      </NavbarContent>

      <NavbarContent className="hidden lg:flex" justify="end">
        {buildNavbarExtrasForDesktop()}
      </NavbarContent>

      <NavbarContent className="flex lg:hidden" justify="end">
        {buildNavbarExtrasForMobile()}
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      <NavbarMenu className="pt-4">{mobileNavbarElements}</NavbarMenu>
    </Navbar>
  );
};

export default SitewideNavbar;
