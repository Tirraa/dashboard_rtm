import InviteTheBotButton from '@/components/ui/cta/InviteTheBotButton';

export const CTAs: Record<string, (...args: any[]) => JSX.Element> = {
  InviteTheBotButton: ({ ...props }) => <InviteTheBotButton {...props} />
};

export default CTAs;
