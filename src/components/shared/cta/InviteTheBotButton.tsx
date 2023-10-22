'use client';

import RtmButton from '@/components/shared/misc/RtmButton';
import DISCORD_CONFIG from '@/config/discord';
import { i18ns } from '@/config/i18n';
import { getClientSideI18n } from '@/i18n/client';
import { CogIcon } from '@heroicons/react/20/solid';
import { FunctionComponent } from 'react';

interface InviteTheBotButtonProps {}

const InviteTheBotButton: FunctionComponent<InviteTheBotButtonProps> = () => {
  const globalT = getClientSideI18n();

  return (
    <RtmButton
      label={globalT(`${i18ns.vocab}.invite-the-bot`)}
      __IconComponent={<CogIcon className="h-7 w-7" />}
      href={DISCORD_CONFIG.BOT_INVITE_LINK}
    />
  );
};

export default InviteTheBotButton;
