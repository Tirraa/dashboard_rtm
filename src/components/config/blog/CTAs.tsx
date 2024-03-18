/* v8 ignore start */
// Stryker disable all

import MdxInviteTheBotButton from '@/components/ui/cta/MdxInviteTheBotButton';
import MdxSignupButton from '@/components/ui/cta/MdxSignupButton';

const CTAs: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  InviteTheBotButton: ({ ...props }) => <MdxInviteTheBotButton {...props} />,
  SignupButton: ({ ...props }) => <MdxSignupButton {...props} />
};

export default CTAs;

// Stryker restore all
/* v8 ignore stop */
