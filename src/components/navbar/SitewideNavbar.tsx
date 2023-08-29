'use client';

import useCollapseNavbarOnResize from '@/components/_customHooks/_hotfixes/useCollapseNavbarOnResize';
import RtmTextNode from '@/components/misc/RtmTextNodeWithUppercaseEffect';
import sitewideNavbarDropdownsConfig from '@/config/SitewideNavbar/dropDownsConfig';
import sitewideNavbarRoutes, { sitewideNavbarRoutesTitles } from '@/config/SitewideNavbar/routesImpl';
import RoutesBase from '@/config/routes';
import { getClientSideTranslation } from '@/i18n/client';
import UniversalVocab from '@/i18n/locales/UniversalVocab';
import getComputedNavData from '@/lib/misc/getComputedNavData';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nComponentProps } from '@/types/Next';
import { Collapse, IconButton, Navbar, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import NavbarElement from '../_hoc/navbar/NavbarElement';
import NavbarButton from './NavbarButton';

interface SitewideNavbarProps extends i18nComponentProps {}

const navbarId = 'sitewide-navbar';
const forceNavbarMenuToCollapseBreakpointPxValue = 960;
const logoSizeInPx = 50;

export function buildNavbarElements({ i18nProps }: i18nComponentProps) {
  const computedNavData = getComputedNavData(sitewideNavbarRoutes, sitewideNavbarRoutesTitles, sitewideNavbarDropdownsConfig);
  const navbarElements = computedNavData.map(({ i18nTitleInfos, path, embeddedEntities }) => {
    return <NavbarElement key={`navbar-btn-${i18nTitleInfos.targetKey}${path}`} {...{ i18nProps, i18nTitleInfos, path, embeddedEntities }} />;
  });
  return navbarElements;
}

export const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = ({ i18nProps }) => {
  const mobileMenuInstanceRef = useRef<HTMLDivElement>(null);
  const [openNav, setOpenNav] = useState<boolean>(false);
  const lng = i18nProps[i18nTaxonomy.langFlag];
  const { t } = getClientSideTranslation(lng);

  useCollapseNavbarOnResize(forceNavbarMenuToCollapseBreakpointPxValue, mobileMenuInstanceRef, setOpenNav);

  useEffect(() => {
    const navbarCollapseElement = document.getElementById(navbarId);
    const closeNavbarOnOutsideClick = (e: Event) =>
      openNav && e.target instanceof Node && !navbarCollapseElement?.contains(e.target) ? setOpenNav(false) : undefined;

    document.addEventListener('click', closeNavbarOnOutsideClick);
    return () => document.removeEventListener('click', closeNavbarOnOutsideClick);
  }, [openNav]);

  const navbarElements = buildNavbarElements({ i18nProps });
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

  return (
    <Navbar
      id={navbarId}
      color="blue"
      fullWidth={true}
      className="aiw bg-gray-800 sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4"
    >
      <div className="flex items-center justify-between text-white">
        <Link href={RoutesBase.sitewide}>
          <div className="flex">
            <Image src="/assets/rtm-logo.svg" height={logoSizeInPx} width={logoSizeInPx} alt={`${UniversalVocab.brand} (${t('logo')})`} />
            <Typography as="span" className="hidden lg:block ml-4 py-1.5 font-medium">
              <RtmTextNode />
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
