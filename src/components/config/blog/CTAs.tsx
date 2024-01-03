/* v8 ignore start */
// Stryker disable all
import InviteTheBotButton from '@/components/ui/cta/InviteTheBotButton';

const CTAs: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  InviteTheBotButton: ({ ...props }) => <InviteTheBotButton {...props} />
};

export default CTAs;
// Stryker restore all
/* v8 ignore stop */
