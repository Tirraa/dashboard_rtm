/* v8 ignore start */
'use client';

import type { FunctionComponent } from 'react';

import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { getClientSideI18n } from '@/i18n/client';
import { Button } from '@/components/ui/Button';
import ROUTES_ROOTS from '##/config/routes';
import { signIn } from 'next-auth/react';
import { i18ns } from '##/config/i18n';

interface SignUpButtonProps {}

const SignupButton: FunctionComponent<SignUpButtonProps> = () => {
  const globalT = getClientSideI18n();
  const className = BUTTON_CONFIG.CLASSNAME;

  return (
    <Button onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} className={className} size="lg">
      {globalT(`${i18ns.auth}.signup`)}
    </Button>
  );
};

export default SignupButton;
/* v8 ignore stop */
