/* v8 ignore start */
// Stryker disable all
'use client';

import type { MaybeNull } from 'packages/shared-types/src/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import type { SignUpButtonProps } from './SignupButton';

const MdxSignupButton: FunctionComponent<SignUpButtonProps> = (props) => {
  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<SignUpButtonProps>>>(null);
  useEffect(() => {
    import('@/components/ui/cta/SignupButton').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return '';
  return <Component {...props} />;
};

export default MdxSignupButton;
// Stryker restore all
/* v8 ignore stop */
