'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { getBreakpoint } from '@/lib/tailwind';
import { useEffect, useState } from 'react';

export interface BlogPostTocDesktopProps {
  headings: DocumentHeading[];
}

const BlogPostTocDesktop: FunctionComponent<BlogPostTocDesktopProps> = ({ headings }) => {
  const placeholder = null;
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<BlogPostTocDesktopProps>>>(null);

  useEffect(() => {
    if (!isLargeScreen || Component !== null) return;
    // eslint-disable-next-line promise/catch-or-return
    import('./BlogPostTocDesktopLazy').then((component) => setComponent(() => component.default));
  });

  if (Component === null) return placeholder;

  return (
    <aside className="sticky top-16 h-0 hover:opacity-100 lg:block lg:w-0">
      <Component headings={headings} />
    </aside>
  );
};

export default BlogPostTocDesktop;
