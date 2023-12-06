import CTAs from '@/components/config/blog/CTAs';
import NextComponents from '@/components/config/blog/NextComponents';
import PrimitiveComponents from '@/components/config/blog/PrimitiveComponents';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { FunctionComponent, ReactNode } from 'react';

// eslint-disable-next-line no-unused-vars
const components: Record<PropertyKey, (...args: any[]) => JSX.Element | ReactNode> = {
  ...PrimitiveComponents,
  ...NextComponents,
  ...CTAs
};

interface MdxProps {
  code: string;
}

const MDX: FunctionComponent<MdxProps> = ({ code }) => {
  const MDXComponent = useMDXComponent(code);

  return (
    <article className="mdx break-word">
      <MDXComponent components={components} />
    </article>
  );
};

export default MDX;
