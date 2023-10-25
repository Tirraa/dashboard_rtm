'use client';

import { i18ns } from '@/config/i18n';
import { getClientSideI18n } from '@/i18n/client';
import Image from 'next/image';
import { CSSProperties, FunctionComponent } from 'react';
import InviteTheBotButton from '../shared/cta/InviteTheBotButton';

interface HomepageProps {}

// {ToDo} Please, design a real logo
const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

// {ToDo} use a formatter for the img alt
export const Homepage: FunctionComponent<HomepageProps> = () => {
  const globalT = getClientSideI18n();
  const brand = globalT(`${i18ns.vocab}.brand`);
  const logo = globalT(`${i18ns.ugly}.logo`);

  return (
    <div className="text-center">
      <Image src="/assets/rtm-txt-logo.svg" {...{ style, width, height }} alt={`${brand} (${logo})`} className="m-auto" priority={true} />
      <h1 className="mt-2">{brand}</h1>
      <InviteTheBotButton />
    </div>
  );
};

export default Homepage;
