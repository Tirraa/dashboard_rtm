'use client';

import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { Button } from '@/components/ui/Button';
import ROUTES_ROOTS from '@/config/routes';
import { getClientSideI18n } from '@/i18n/client';
import { i18ns } from 'interop/config/i18n';
import { signIn } from 'next-auth/react';
import type { FunctionComponent } from 'react';

interface SignUpButtonProps {}

export const SignupButton: FunctionComponent<SignUpButtonProps> = () => {
  const globalT = getClientSideI18n();
  const className = BUTTON_CONFIG.CLASSNAME;

  return (
    <Button size="lg" onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} className={className}>
      {globalT(`${i18ns.auth}.signup`)}
    </Button>
  );
};

export default SignupButton;
