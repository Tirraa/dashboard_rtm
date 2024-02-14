/* v8 ignore start */
// Stryker disable all

import type { FunctionComponent, ReactNode } from 'react';

import PrimitiveComponents from '@/components/config/blog/PrimitiveComponents';
import NextComponents from '@/components/config/blog/NextComponents';
import { useMDXComponent } from 'next-contentlayer/hooks';
import CTAs from '@/components/config/blog/CTAs';

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

// Stryker restore all
/* v8 ignore stop */
