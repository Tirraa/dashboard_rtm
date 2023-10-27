import PrimitiveComponents from '@/components/config/styles/blog/PrimitiveComponents';
import InviteTheBotButton from '@/components/shared/ui/cta/InviteTheBotButton';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import { FunctionComponent, ReactNode } from 'react';

const components: Record<string, (...args: any[]) => JSX.Element | ReactNode> = {
  ...PrimitiveComponents,
  Image,
  InviteTheBotButton
};

interface MdxProps {
  code: string;
}

export const MDX: FunctionComponent<MdxProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <article className="mdx">
      <Component {...{ components }} />
    </article>
  );
};

export default MDX;
