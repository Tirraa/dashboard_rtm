'use client';

import ButtonHoC from '@/components/ui/hoc/ButtonHoC';
import DISCORD_CONFIG from '@/config/discord';
import { i18ns } from '@/config/i18n';
import { getClientSideI18n } from '@/i18n/client';
import { CogIcon } from '@heroicons/react/20/solid';
import type { FunctionComponent } from 'react';

interface InviteTheBotButtonProps {}

export const InviteTheBotButton: FunctionComponent<InviteTheBotButtonProps> = () => {
  const globalT = getClientSideI18n();

  return (
    <ButtonHoC href={DISCORD_CONFIG.BOT_INVITE_LINK}>
      <span className="flex items-center gap-1">
        <span>
          <CogIcon className="h-7 w-7" />
        </span>
        <span>{globalT(`${i18ns.vocab}.invite-the-bot`)}</span>
      </span>
    </ButtonHoC>
  );
};

export default InviteTheBotButton;
