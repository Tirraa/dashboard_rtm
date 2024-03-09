/* v8 ignore start */
// Stryker disable all

import type { FunctionComponent, ReactNode } from 'react';

import PrimitiveComponents from '@/components/config/blog/PrimitiveComponents';
import NextComponents from '@/components/config/blog/NextComponents';
import { useMDXComponent } from 'next-contentlayer/hooks';
import CTAs from '@/components/config/blog/CTAs';
import { cn } from '@/lib/tailwind';

const components: Record<PropertyKey, (...args: any[]) => JSX.Element | ReactNode> = {
  ...PrimitiveComponents,
  ...NextComponents,
  ...CTAs
};

interface MdxProps {
  className?: string;
  code: string;
}

const MDX: FunctionComponent<MdxProps> = ({ className: classNameValue, code }) => {
  const MDXComponent = useMDXComponent(code);
  const className = classNameValue ?? '';

  return (
    <article className={cn('mdx break-word', className)}>
      <MDXComponent components={components} />
    </article>
  );
};

export default MDX;

// Stryker restore all
/* v8 ignore stop */
