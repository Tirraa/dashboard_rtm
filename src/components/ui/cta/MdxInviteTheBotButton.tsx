/* v8 ignore start */
// Stryker disable all
'use client';

import type { InviteTheBotButtonProps } from '@/components/ui/cta/InviteTheBotButton';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useEffect, useState } from 'react';

const MdxInviteTheBotButton: FunctionComponent<InviteTheBotButtonProps> = (props) => {
  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<InviteTheBotButtonProps>>>(null);
  useEffect(() => {
    import('@/components/ui/cta/InviteTheBotButton').then((component) => setComponent(() => component.default));
  }, []);
  if (Component === null) return '';
  return <Component {...props} />;
};

export default MdxInviteTheBotButton;
// Stryker restore all
/* v8 ignore stop */
