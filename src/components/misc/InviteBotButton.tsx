'use client';

import DiscordConfig from '@/config/discord';
import { LanguageFlag } from '@/config/i18n';
import { getClientSideTranslation } from '@/i18n/client';
import { getLinkTarget } from '@/lib/react';
import { CogIcon } from '@heroicons/react/20/solid';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface InviteBotButtonProps {
  lng: LanguageFlag;
}

const href = DiscordConfig.botInviteLink;
const target = getLinkTarget(href);

export const InviteBotButton: FunctionComponent<InviteBotButtonProps> = ({ lng }) => {
  const { t } = getClientSideTranslation(lng);
  const label = t('invite-the-bot');

  return (
    <Link {...{ href, ...target }}>
      <Button className="mt-4 text-xl normal-case flex items-center gap-2" variant="gradient" size="lg">
        <CogIcon className="h-7 w-7" /> {label}
      </Button>
    </Link>
  );
};

export default InviteBotButton;
