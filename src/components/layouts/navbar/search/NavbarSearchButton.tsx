'use client';

import type { FunctionComponent } from 'react';

import { navbarSearchBtnProps } from '@/config/searchMenu';

import NavbarSearchButtonInner from './NavbarSearchButtonInner';

const NavbarSearchButton: FunctionComponent<{}> = () => (
  <NavbarSearchButtonInner
    tabValueInitialState={navbarSearchBtnProps.tabValueInitialState}
    quickAccessBtns={navbarSearchBtnProps.quickAccessBtns}
    tabInputLabels={navbarSearchBtnProps.tabInputLabels}
    allTabValues={navbarSearchBtnProps.allTabValues}
    tabTriggers={navbarSearchBtnProps.tabTriggers}
    banners={navbarSearchBtnProps.banners}
  />
);

export default NavbarSearchButton;
