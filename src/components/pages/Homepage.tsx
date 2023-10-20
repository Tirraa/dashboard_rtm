'use client';

import RtmButton from '@/components/shared/cta/RtmButton';
import DISCORD_CONFIG from '@/config/discord';
import { i18ns } from '@/config/i18n';
import { getClientSideI18n } from '@/i18n/client';
import { CogIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { CSSProperties, FunctionComponent } from 'react';

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
  const inviteTheBot = globalT(`${i18ns.vocab}.invite-the-bot`);

  return (
    <div className="flex flex-col items-center align-center justify-center">
      <Image src="/assets/rtm-txt-logo.svg" {...{ style, width, height }} alt={`${brand} (${logo})`} className="flex" priority={true} />
      <h1 className="mt-2">{brand}</h1>
      <RtmButton label={inviteTheBot} __IconComponent={<CogIcon className="h-7 w-7" />} href={DISCORD_CONFIG.BOT_INVITE_LINK} />
    </div>
  );
};

export default Homepage;
