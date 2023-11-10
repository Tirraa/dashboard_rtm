'use client';

import { useScopedI18n } from '@/i18n/client';
import { i18ns } from 'interop/config/i18n';
import Image from 'next/image';
import type { CSSProperties, FunctionComponent } from 'react';
import InviteTheBotButton from '../ui/cta/InviteTheBotButton';

interface HomepageProps {}

const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

export const Homepage: FunctionComponent<HomepageProps> = () => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const alt = scopedT('sr-only.brand-logo');
  const brand = scopedT('brand');

  return (
    <div className="text-center">
      <Image src="/assets/rtm-txt-logo.svg" style={style} width={width} height={height} alt={alt} className="m-auto" priority />
      <h1 className="mt-2">{brand}</h1>
      <InviteTheBotButton />
    </div>
  );
};

export default Homepage;
