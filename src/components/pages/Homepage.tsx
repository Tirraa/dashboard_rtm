'use client';

import { i18ns } from '@/config/i18n';
import { useScopedI18n } from '@/i18n/client';
import Image from 'next/image';
import { CSSProperties, FunctionComponent } from 'react';
import InviteTheBotButton from '../shared/ui/cta/InviteTheBotButton';

interface HomepageProps {}

// {ToDo} Please, design a real logo
const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

export const Homepage: FunctionComponent<HomepageProps> = () => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const logoAlt = scopedT('sr-only.brand-logo');
  const brand = scopedT('brand');

  return (
    <div className="text-center">
      <Image src="/assets/rtm-txt-logo.svg" {...{ style, width, height }} alt={logoAlt} className="m-auto" priority={true} />
      <h1 className="mt-2">{brand}</h1>
      <InviteTheBotButton />
    </div>
  );
};

export default Homepage;
