'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { navbarSearchBtnProps } from '@/config/searchMenu';
import { useEffect, useState } from 'react';

import type { NavbarSearchButtonProps } from './NavbarSearchButtonInner';

const NavbarSearchButton: FunctionComponent<{}> = () => {
  const placeholder = <div className="min-h-[19px] min-w-[20px]" />;

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<NavbarSearchButtonProps<typeof navbarSearchBtnProps.allTabValues>>>>(null);

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    import('./NavbarSearchButtonInner').then((component) => setComponent(() => component.default));
  });

  if (Component === null) return placeholder;

  return (
    <Component
      tabValueInitialState={navbarSearchBtnProps.tabValueInitialState}
      quickAccessBtns={navbarSearchBtnProps.quickAccessBtns}
      tabInputLabels={navbarSearchBtnProps.tabInputLabels}
      allTabValues={navbarSearchBtnProps.allTabValues}
      tabTriggers={navbarSearchBtnProps.tabTriggers}
      banners={navbarSearchBtnProps.banners}
    />
  );
};

export default NavbarSearchButton;
