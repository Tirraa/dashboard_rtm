/* v8 ignore start */
// Stryker disable all

'use client';

import type { FunctionComponent } from 'react';

import BUTTON_CONFIG from '@/components/config/styles/buttons';
import capitalize from '@/lib/portable/str/capitalize';
import { Button } from '@/components/ui/Button';
import { useScopedI18n } from '@/i18n/client';
import ROUTES_ROOTS from '##/config/routes';
import { signIn } from 'next-auth/react';
import { i18ns } from '##/config/i18n';

export interface SignUpButtonProps {}

const SignupButton: FunctionComponent<SignUpButtonProps> = () => {
  const scopedT = useScopedI18n(i18ns.auth);
  const className = BUTTON_CONFIG.CLASSNAME;

  return (
    <Button onClick={() => signIn('discord', { callbackUrl: ROUTES_ROOTS.DASHBOARD })} className={className} size="lg">
      {capitalize(scopedT('signup'))}
    </Button>
  );
};

export default SignupButton;

// Stryker restore all
/* v8 ignore stop */
