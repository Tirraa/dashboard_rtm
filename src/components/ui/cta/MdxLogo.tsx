'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import type { LogoProps } from './Logo';

interface MdxLogoProps extends LogoProps {}

// https://v3.gatsbyjs.com/docs/mdx/importing-and-using-components/#lazy-loading-components
const MdxLogo: FunctionComponent<MdxLogoProps> = (props) => {
  const placeholder = <div className="min-h-[201.45px]" />;
  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<MdxLogoProps>>>(null);

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    import('./Logo').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return placeholder;
  return <Component {...props} />;
};

export default MdxLogo;
