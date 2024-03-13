'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { useScopedI18n } from '@/i18n/client';
import { useEffect, useState } from 'react';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';

import type { BlogPostTocMobileInnerProps } from './BlogPostTocMobileInner';
import type { SharedBlogPostTocProps } from './BlogPostTocDesktop';

const BlogPostTocDesktopLazy: FunctionComponent<SharedBlogPostTocProps> = ({ headings }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const title = capitalize(scopedT('toc'));

  const placeholder = <div className="min-h-[62px]" />;
  const isLargeScreen = useIsLargeScreen();

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<BlogPostTocMobileInnerProps>>>(null);

  useEffect(() => {
    if (isLargeScreen || Component !== null) return;
    // eslint-disable-next-line promise/catch-or-return
    import('./BlogPostTocMobileInner').then((component) => setComponent(() => component.default));
  });

  if (Component === null) return placeholder;

  return <Component headings={headings} ariaLabel={title} />;
};

export default BlogPostTocDesktopLazy;
