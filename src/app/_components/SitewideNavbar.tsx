'use client';

import { Button, Collapse, IconButton, Navbar, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
import navbarElements from '../_config/SitewideNavbar/sitewideNavbarRoutesComponents';

interface SitewideNavbarProps {}

const navbarId = 'sitewide-navbar';

export const SitewideNavbar: FunctionComponent<SitewideNavbarProps> = () => {
  const [openNav, setOpenNav] = useState(false);
  const wrappedNavbarElements = navbarElements.map((elm, index) => {
    return (
      <Typography key={`navbar-btn-typography-${index}`} as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        {elm}
      </Typography>
    );
  });

  useEffect(() => {
    const collapseNavbarMenuWhenWindowIsLargeEnough = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener('resize', collapseNavbarMenuWhenWindowIsLargeEnough);
    return () => window.removeEventListener('resize', collapseNavbarMenuWhenWindowIsLargeEnough);
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

  const navList = <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">{wrappedNavbarElements}</ul>;

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
          <div className="mr-4 hidden lg:block">{navList}</div>
          <Button variant="gradient" size="sm" className="hidden lg:inline-block">
            <span>Buy Now</span>
          </Button>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
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
      </div>
      <Collapse open={openNav}>
        {navList}
        <Button variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Buy Now</span>
        </Button>
      </Collapse>
    </Navbar>
  );
};

export default SitewideNavbar;
