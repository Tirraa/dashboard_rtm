/* v8 ignore start */
// Stryker disable all

import MdxInviteTheBotButton from '@/components/ui/cta/MdxInviteTheBotButton';
import MdxSignupButton from '@/components/ui/cta/MdxSignupButton';

const SharedCTAs: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  InviteTheBotButton: ({ ...props }) => <MdxInviteTheBotButton {...props} />,
  SignupButton: ({ ...props }) => <MdxSignupButton {...props} />
};

export default SharedCTAs;

// Stryker restore all
/* v8 ignore stop */
