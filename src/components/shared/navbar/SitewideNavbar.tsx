'use client';

import NavbarElement from '@/components/_hoc/navbar/NavbarElement';
import NAVBAR_STYLE from '@/components/config/styles/navbar/NavbarStyle';
import NavbarButton from '@/components/layouts/navbar/NavbarButton';
import DASHBOARD_SIDEBAR_CLASSES from '@/config/DashboardSidebar/classes';
import { NAVBAR_EXTRAS_COMPONENTS_DESKTOP, NAVBAR_EXTRAS_COMPONENTS_MOBILE } from '@/config/SitewideNavbar/Extras/utils/ComponentsMapping';
import SITEWIDE_NAVBAR_DROPDOWNS_CONFIG from '@/config/SitewideNavbar/dropdownsConfig';
import SITEWIDE_NAVBAR_ROUTES, { SITEWIDE_NAVBAR_ROUTES_TITLES } from '@/config/SitewideNavbar/routesImpl';
import { i18ns } from '@/config/i18n';
import PRODUCT_CLASSES from '@/config/productClasses';
import ROUTES_ROOTS from '@/config/routes';
import { getClientSideI18n, useCurrentLocale } from '@/i18n/client';
import getComputedNavData from '@/lib/misc/getComputedNavData';
import { getRefCurrentPtr } from '@/lib/react';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nComponentProps } from '@/types/Next';
import { Collapse, IconButton, Navbar, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react';

interface SitewideNavbarProps {}

const { NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE, LOGO_SIZE_PX_VALUE } = NAVBAR_STYLE;
const { PRODUCT_PREFIX } = PRODUCT_CLASSES;

let navbarMobileDropdownIsHidden = false;

const buildNavbarExtrasForDesktop = () => (
  <>
    {Object.values(NAVBAR_EXTRAS_COMPONENTS_DESKTOP).map((component, index) => (
      <Fragment key={`${index}-navbar-extra-desktop`}>{component}</Fragment>
    ))}
  </>
);

const buildNavbarExtrasForMobile = () => (
  <>
    {Object.values(NAVBAR_EXTRAS_COMPONENTS_MOBILE).map((component, index) => (
      <Fragment key={`${index}-navbar-extra-mobile`}>{component}</Fragment>
    ))}
  </>
);

export function buildNavbarElements({ i18nProps }: i18nComponentProps) {
  const computedNavData = getComputedNavData(SITEWIDE_NAVBAR_ROUTES, SITEWIDE_NAVBAR_ROUTES_TITLES, SITEWIDE_NAVBAR_DROPDOWNS_CONFIG);
  const navbarElements = computedNavData.map(({ i18nTitle, path, embeddedEntities }) => (
    <NavbarElement key={`${i18nTitle}-${path}-navbar-btn`} {...{ i18nProps, i18nTitle, path, embeddedEntities }} />
  ));
  return navbarElements;
}

export const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = () => {
  const mobileMenuInstanceRef = useRef<HTMLDivElement>(null);
  const navbarInstanceRef = useRef<HTMLDivElement>(null);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const globalT = getClientSideI18n();

  useEffect(
    () => {
      function handleResize() {
        const mobileMenuInstance = getRefCurrentPtr(mobileMenuInstanceRef);
        if (!mobileMenuInstance) return;
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

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      const navbarElement = getRefCurrentPtr(navbarInstanceRef);

      function isDashboardSidebarOrDashboardSidebarBody(element: HTMLElement): boolean {
        const dashboardSidebarExpectedClasses = [PRODUCT_PREFIX, DASHBOARD_SIDEBAR_CLASSES.SIDEBAR];
        const dashboardSidebarBodyExpectedClasses = [PRODUCT_PREFIX, DASHBOARD_SIDEBAR_CLASSES.SIDEBAR_BODY];

        const isDashboardSidebarBody = dashboardSidebarBodyExpectedClasses.every((cls) => element.classList.contains(cls));
        const isDashboardSidebar = dashboardSidebarExpectedClasses.every((cls) => element.classList.contains(cls));
        return isDashboardSidebarBody || isDashboardSidebar;
      }

      const ignoreClick = (element: HTMLElement): boolean =>
        Boolean(
          element.tagName === 'BUTTON' ||
            element.closest('button') ||
            element.tagName === 'A' ||
            element.closest('a') ||
            isDashboardSidebarOrDashboardSidebarBody(element)
        );

      const closeNavbarOnOutsideClick = (e: Event): void => {
        const targetElement = e.target instanceof HTMLElement ? e.target : null;
        if (openNav && navbarElement && targetElement && !navbarElement.contains(targetElement) && !ignoreClick(targetElement)) setOpenNav(false);
      };

      document.addEventListener('click', closeNavbarOnOutsideClick);
      return () => document.removeEventListener('click', closeNavbarOnOutsideClick);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openNav]
  );

  const navbarElements = buildNavbarElements({ i18nProps: { [i18nTaxonomy.LANG_FLAG]: useCurrentLocale() } });
  const desktopNavbarElements = navbarElements.map((elm, index) => (
    <Typography key={`${index}-navbar-btn-typography-desktop`} as="li" color="blue-gray" className="p-1 font-normal">
      {elm}
    </Typography>
  ));

  const mobileNavbarElements = navbarElements.map((elm, index) => (
    <Typography key={`${index}-navbar-btn-typography-mobile`} as="li" color="blue-gray" className="p-1 font-normal">
      {elm.props.embeddedEntities ? <NavbarButton {...elm.props} /> : elm}
    </Typography>
  ));

  const desktopNavList = (
    <ul className="w-full mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2 rtl:flex-row-reverse">
      {desktopNavbarElements}
    </ul>
  );

  const mobileNavList = (
    <ul className="w-full mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">{mobileNavbarElements}</ul>
  );

  const logo = globalT(`${i18ns.ugly}.logo`);
  const brand = globalT(`${i18ns.vocab}.brand`);

  // {ToDo} use a formatter for the img alt
  return (
    <Navbar
      ref={navbarInstanceRef}
      color="blue"
      fullWidth={true}
      className="aiw bg-black sticky top-0 z-20 h-max max-w-full overflow-hidden rounded-none py-2 px-4 lg:px-8 lg:py-4"
    >
      <div className="flex items-center justify-between text-white rtl:flex-row-reverse">
        <Link href={ROUTES_ROOTS.WEBSITE}>
          <div className="flex">
            <Image src="/assets/rtm-logo.svg" height={LOGO_SIZE_PX_VALUE} width={LOGO_SIZE_PX_VALUE} alt={`${brand} (${logo})`} />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex">{desktopNavList}</nav>
          <div className="flex gap-4 lg:hidden rtl:flex-row-reverse">
            {buildNavbarExtrasForMobile()}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
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
        </div>
        <div className="hidden lg:flex lg:gap-4 rtl:flex-row-reverse">{buildNavbarExtrasForDesktop()}</div>
      </div>

      <Collapse ref={mobileMenuInstanceRef} className="flex justify-center text-center" open={openNav}>
        {mobileNavList}
      </Collapse>
    </Navbar>
  );
};

export default SitewideNavbar;
