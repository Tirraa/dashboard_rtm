import InviteTheBotButton from '@/components/ui/cta/InviteTheBotButton';

export const CTAs: Record<PropertyKey, (...args: any[]) => JSX.Element> = {
  InviteTheBotButton: ({ ...props }) => <InviteTheBotButton {...props} />
};

export default CTAs;
