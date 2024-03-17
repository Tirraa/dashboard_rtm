/* v8 ignore start */
// Stryker disable all

'use client';

import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { CogIcon } from '@heroicons/react/20/solid';
import { getClientSideI18n } from '@/i18n/client';
import { Button } from '@/components/ui/Button';
import DISCORD_CONFIG from '@/config/discord';
import { i18ns } from '##/config/i18n';

export interface InviteTheBotButtonProps extends Partial<WithClassname> {}

const InviteTheBotButton: FunctionComponent<InviteTheBotButtonProps> = ({ className: classNameValue }) => {
  const globalT = getClientSideI18n();
  const className = classNameValue ?? '';

  return (
    <Button href={DISCORD_CONFIG.BOT_INVITE_LINK} className={className}>
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

// Stryker restore all
/* v8 ignore stop */
