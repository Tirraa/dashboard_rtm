import RtmButton from '@/components/misc/RtmButton';
import DiscordConfig from '@/config/discord';
import { getServerSideI18n } from '@/i18n/server';
import { CogIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { CSSProperties, FunctionComponent } from 'react';

interface HomepageInnerProps {}

// {ToDo} Please, design a real logo
const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

// {ToDo} use a formatter for the img alt
export const HomepageInner: FunctionComponent<HomepageInnerProps> = async () => {
  const globalT = await getServerSideI18n();
  const brand = globalT('vocab.brand');
  const logo = globalT('ugly.logo');
  const inviteTheBot = globalT('vocab.invite-the-bot');

  return (
    <div className="m-auto">
      <div className="flex flex-col items-center align-center justify-center">
        <Image src="/assets/rtm-txt-logo.svg" {...{ style, width, height }} alt={`${brand} (${logo})`} className="flex" />
        <h1 className="mt-2">{brand}</h1>
        <RtmButton label={inviteTheBot} __IconComponent={<CogIcon className="h-7 w-7" />} href={DiscordConfig.BOT_INVITE_LINK} />
      </div>
    </div>
  );
};

export default HomepageInner;
