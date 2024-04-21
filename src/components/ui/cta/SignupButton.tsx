/* v8 ignore start */
// Stryker disable all

'use client';

import type { FunctionComponent } from 'react';

import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { Button } from '@/components/ui/Button';
import { signInAction } from '@/lib/authServer';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';

export interface SignUpButtonProps {}

const SignupButton: FunctionComponent<SignUpButtonProps> = () => {
  const scopedT = useScopedI18n(i18ns.auth);
  const className = BUTTON_CONFIG.CLASSNAME;

  return (
    <form action={signInAction} className="contents">
      <Button className={className} type="submit" size="lg">
        {capitalize(scopedT('signup'))}
      </Button>
    </form>
  );
};

export default SignupButton;

// Stryker restore all
/* v8 ignore stop */
