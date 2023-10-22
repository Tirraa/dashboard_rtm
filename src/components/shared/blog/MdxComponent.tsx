import PrimitiveComponents from '@/components/config/styles/blog/PrimitiveComponents';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import { FunctionComponent, ReactNode } from 'react';
import InviteTheBotButton from '../cta/InviteTheBotButton';

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
    <div className="mdx">
      <Component {...{ components }} />
    </div>
  );
};

export default MDX;
