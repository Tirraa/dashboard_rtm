/* v8 ignore start */
// Stryker disable all
import InviteTheBotButton from '@/components/ui/cta/InviteTheBotButton';
import SignupButton from '@/components/ui/cta/SignupButton';

const CTAs: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  InviteTheBotButton: ({ ...props }) => <InviteTheBotButton {...props} />,
  SignupButton: ({ ...props }) => <SignupButton {...props} />
};

export default CTAs;
// Stryker restore all
/* v8 ignore stop */
