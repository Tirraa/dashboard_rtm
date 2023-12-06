import InviteTheBotButton from '@/components/ui/cta/InviteTheBotButton';

// eslint-disable-next-line no-unused-vars
export const CTAs: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  InviteTheBotButton: ({ ...props }) => <InviteTheBotButton {...props} />
};

export default CTAs;
