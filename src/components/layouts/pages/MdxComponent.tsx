/* v8 ignore start */
// Stryker disable all

import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent, ReactNode } from 'react';

import PrimitiveComponents from '@/components/config/mdx/PrimitiveComponents';
import NextComponents from '@/components/config/mdx/NextComponents';
import SharedCTAs from '@/components/config/mdx/SharedCTAs';
import { useMDXComponent } from 'next-contentlayer/hooks';
import ELEMENTS_ID from '@/config/elementsId';
import { cn } from '@/lib/tailwind';

const components: Record<PropertyKey, (...args: any[]) => JSX.Element | ReactNode> = {
  ...PrimitiveComponents,
  ...NextComponents,
  ...SharedCTAs
};

interface MdxProps extends Partial<WithClassname> {
  code: string;
}

const PageMDX: FunctionComponent<MdxProps> = ({ className: classNameValue, code }) => {
  const MDXComponent = useMDXComponent(code);
  const className = classNameValue ?? '';

  return (
    <article className={cn('mdx break-word mb-4', className)} id={ELEMENTS_ID.MDX_BODY}>
      <MDXComponent components={components} />
    </article>
  );
};

export default PageMDX;

// Stryker restore all
/* v8 ignore stop */
