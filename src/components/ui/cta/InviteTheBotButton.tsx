'use client';

import type { FunctionComponent } from 'react';

import { CogIcon } from '@heroicons/react/20/solid';
import { getClientSideI18n } from '@/i18n/client';
import { Button } from '@/components/ui/Button';
import DISCORD_CONFIG from '@/config/discord';
import { i18ns } from '##/config/i18n';

interface InviteTheBotButtonProps {}

const InviteTheBotButton: FunctionComponent<InviteTheBotButtonProps> = () => {
  const globalT = getClientSideI18n();

  return (
    <Button href={DISCORD_CONFIG.BOT_INVITE_LINK}>
      <span className="flex items-center gap-1">
        <span>
          <CogIcon className="h-7 w-7" />
        </span>
        <span>{globalT(`${i18ns.vocab}.invite-the-bot`)}</span>
      </span>
    </Button>
  );
};

export default InviteTheBotButton;
