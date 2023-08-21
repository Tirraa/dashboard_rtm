'use client';

import { Discord as DiscordConfig } from '@/app/_config/discord';
import { CogIcon } from '@heroicons/react/20/solid';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, FunctionComponent } from 'react';

interface HomepageInnerProps {}

const style: CSSProperties = {
  filter: 'invert(42%) sepia(7%) saturate(5518%) hue-rotate(189deg) brightness(92%) contrast(91%)'
};
const [width, height]: [number, number] = [226, 69];

// {ToDo} i18n this!
const HomepageInner: FunctionComponent<HomepageInnerProps> = () => (
  <div className="m-auto">
    <Image src="/rtm-txt-logo.svg" {...{ style, width, height }} alt="Rust Team Management (text logo)" />
    <h1 className="mt-2">Rust Team Management</h1>
    <Link href={DiscordConfig.botInviteLink} target="_blank">
      <Button className="mt-4 text-xl normal-case flex items-center gap-2" variant="gradient" size="lg">
        <CogIcon className="h-7 w-7" /> Inviter le bot
      </Button>
    </Link>
  </div>
);

export default HomepageInner;
