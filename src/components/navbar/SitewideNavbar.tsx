'use client';

import NavbarConfig from '@/components/_config/_styles/Navbar';
import NavbarElement from '@/components/_hoc/navbar/NavbarElement';
import TextNodeWithStupidUppercaseEffect from '@/components/misc/TextNodeWithStupidUppercaseEffect';
import SITEWIDE_NAVBAR_DROPDOWNS_CONFIG from '@/config/SitewideNavbar/dropdownsConfig';
import SITEWIDE_NAVBAR_ROUTES, { SITEWIDE_NAVBAR_ROUTES_TITLES } from '@/config/SitewideNavbar/routesImpl';
import RoutesBase from '@/config/routes';
import { getClientSideI18n, useCurrentLocale } from '@/i18n/client';
import getComputedNavData from '@/lib/misc/getComputedNavData';
import { getRefCurrentPtr } from '@/lib/react';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nComponentProps } from '@/types/Next';
import { Collapse, IconButton, Navbar, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import NavbarButton from './NavbarButton';

interface SitewideNavbarProps {}

const { NAVBAR_ID, NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE, LOGO_SIZE_PX_VALUE } = NavbarConfig;

let navbarMobileDropdownIsHidden = false;

export function buildNavbarElements({ i18nProps }: i18nComponentProps) {
  const computedNavData = getComputedNavData(SITEWIDE_NAVBAR_ROUTES, SITEWIDE_NAVBAR_ROUTES_TITLES, SITEWIDE_NAVBAR_DROPDOWNS_CONFIG);
  const navbarElements = computedNavData.map(({ i18nTitle, path, embeddedEntities }) => (
    <NavbarElement key={`navbar-btn-${i18nTitle}${path}`} {...{ i18nProps, i18nTitle, path, embeddedEntities }} />
  ));
  return navbarElements;
}

export const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = () => {
  const mobileMenuInstanceRef = useRef<HTMLDivElement>(null);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const globalT = getClientSideI18n();

  useEffect(
    () => {
      function handleResize() {
        const mobileMenuInstance = getRefCurrentPtr(mobileMenuInstanceRef);
        if (!mobileMenuInstance || !window) return;
        if (window.innerWidth >= NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE) {
          if (!navbarMobileDropdownIsHidden) {
            mobileMenuInstance.classList.add('hidden');
            navbarMobileDropdownIsHidden = true;
          }
        } else if (navbarMobileDropdownIsHidden) {
          mobileMenuInstance.classList.remove('hidden');
          navbarMobileDropdownIsHidden = false;
        }
      }

      if (window) window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        if (window) window.removeEventListener('resize', handleResize);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const navbarCollapseElement = document.getElementById(NAVBAR_ID as string);
    const closeNavbarOnOutsideClick = (e: Event): void =>
      openNav && e.target instanceof Node && navbarCollapseElement && !navbarCollapseElement.contains(e.target) ? setOpenNav(false) : undefined;

    document.addEventListener('click', closeNavbarOnOutsideClick);
    return () => document.removeEventListener('click', closeNavbarOnOutsideClick);
  }, [openNav]);

  const navbarElements = buildNavbarElements({ i18nProps: { [i18nTaxonomy.LANG_FLAG]: useCurrentLocale() } });
  const desktopNavbarElements = navbarElements.map((elm, index) => (
    <Typography key={`navbar-btn-typography-${index}`} as="li" color="blue-gray" className="p-1 font-normal">
      {elm}
    </Typography>
  ));

  const mobileNavbarElements = navbarElements.map((elm, index) => (
    <Typography key={`navbar-btn-typography-${index}`} as="li" color="blue-gray" className="p-1 font-normal">
      {elm.props.embeddedEntities ? <NavbarButton {...elm.props} /> : elm}
    </Typography>
  ));

  const desktopNavbarLastElement = desktopNavbarElements.pop();
  const desktopNavList = (
    <ul className="w-full mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">{desktopNavbarElements}</ul>
  );

  const mobileNavList = (
    <ul className="w-full mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">{mobileNavbarElements}</ul>
  );

  const logo = globalT('ugly.logo');
  const brand = globalT('vocab.brand');

  // {ToDo} use a formatter for the img alt
  return (
    <Navbar
      id={NAVBAR_ID as string}
      color="blue"
      fullWidth={true}
      className="aiw bg-gray-800 sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4"
    >
      <div className="flex items-center justify-between text-white">
        <Link href={RoutesBase.WEBSITE_ROOT}>
          <div className="flex">
            <Image src="/assets/rtm-logo.svg" height={LOGO_SIZE_PX_VALUE} width={LOGO_SIZE_PX_VALUE} alt={`${brand} (${logo})`} />
            <Typography as="span" className="hidden lg:block ml-4 py-1.5 font-medium">
              <TextNodeWithStupidUppercaseEffect str={brand} />
            </Typography>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">{desktopNavList}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={true}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6 scale-125"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 scale-125" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
        <div className="hidden lg:block">{desktopNavbarLastElement}</div>
      </div>
      <Collapse ref={mobileMenuInstanceRef} className="flex justify-center text-center" open={openNav}>
        {mobileNavList}
      </Collapse>
    </Navbar>
  );
};

export default SitewideNavbar;
