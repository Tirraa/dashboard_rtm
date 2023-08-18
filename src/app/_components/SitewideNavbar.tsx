'use client';

import { Collapse, IconButton, Navbar, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import navbarElements from '../_config/SitewideNavbar/sitewideNavbarRoutesComponents';
import { getRefCurrentPtr } from '../_lib/getRefCurrentPtr';

interface SitewideNavbarProps {}

const navbarId = 'sitewide-navbar';

export const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = () => {
  const mobileMenuInstanceRef = useRef<HTMLDivElement>(null);
  const [openNav, setOpenNav] = useState(false);
  const wrappedNavbarElements = navbarElements.map((elm, index) => {
    return (
      <Typography key={`navbar-btn-typography-${index}`} as="li" color="blue-gray" className="p-1 font-normal">
        {elm}
      </Typography>
    );
  });

  const getMobileMenuInstance = () => getRefCurrentPtr(mobileMenuInstanceRef);

  useEffect(() => {
    let hiddenMobileMenuInstance = false;
    let coroutine: NodeJS.Timeout | null = null;
    const hotfixClassList = ['opacity-0', 'hidden'];
    const collapseNavbarMenuWhenWindowIsLargeEnough = () => {
      if (window.innerWidth >= 960) {
        if (!hiddenMobileMenuInstance) {
          const mobileMenuInstance = getMobileMenuInstance();
          mobileMenuInstance?.classList.add(...hotfixClassList);
          hiddenMobileMenuInstance = true;
          coroutine = setTimeout(() => {
            setOpenNav(false);
            clearTimeout(coroutine as NodeJS.Timeout);
            coroutine = null;
          }, 250);
        }
      } else {
        if (hiddenMobileMenuInstance) {
          const mobileMenuInstance = getMobileMenuInstance();
          mobileMenuInstance?.classList.remove(...hotfixClassList);
          hiddenMobileMenuInstance = false;
        }
        if (coroutine) {
          clearTimeout(coroutine);
          coroutine = null;
        }
      }
    };
    window.addEventListener('resize', collapseNavbarMenuWhenWindowIsLargeEnough);
    return () => {
      window.removeEventListener('resize', collapseNavbarMenuWhenWindowIsLargeEnough);
      if (coroutine) clearTimeout(coroutine);
    };
  }, []);

  useEffect(() => {
    const navbarCollapseElement = document.getElementById(navbarId);
    const closeNavbarOnOutsideClick = (e: Event) => {
      if (openNav && e.target instanceof Node && navbarCollapseElement) {
        if (!navbarCollapseElement.contains(e.target)) {
          setOpenNav(false);
        }
      }
    };

    document.addEventListener('click', closeNavbarOnOutsideClick);
    return () => document.removeEventListener('click', closeNavbarOnOutsideClick);
  }, [openNav]);

  const mobileNavList = (
    <ul className="w-full mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">{wrappedNavbarElements}</ul>
  );

  const wrappedNavbarElements2 = [...wrappedNavbarElements];
  const loginElement = wrappedNavbarElements2.pop();
  const desktopNavList = (
    <ul className="w-full mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">{wrappedNavbarElements2}</ul>
  );

  return (
    <Navbar
      id={navbarId}
      color="blue"
      fullWidth={true}
      className="aiw bg-gray-800 sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4"
    >
      <div className="flex items-center justify-between text-white">
        <Link href="#">
          <Typography as="span" className="mr-4 cursor-pointer py-1.5 font-medium">
            Material Tailwind
          </Typography>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
        <div className="hidden lg:block">{loginElement}</div>
      </div>
      <Collapse ref={mobileMenuInstanceRef} className="flex justify-center text-center" open={openNav}>
        {mobileNavList}
      </Collapse>
    </Navbar>
  );
};

export default SitewideNavbar;
