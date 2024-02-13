/* v8 ignore start */
// Stryker disable all
'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

import type { SignUpButtonProps } from './SignupButton';

// https://v3.gatsbyjs.com/docs/mdx/importing-and-using-components/#lazy-loading-components
const MdxSignupButton: FunctionComponent<SignUpButtonProps> = (props) => {
  const placeholder = <div className="min-h-[44px]" />;
  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<SignUpButtonProps>>>(null);
  useEffect(() => {
    import('@/components/ui/cta/SignupButton').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return placeholder;
  return <Component {...props} />;
};

export default MdxSignupButton;
// Stryker restore all
/* v8 ignore stop */
