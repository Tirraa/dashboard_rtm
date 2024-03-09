'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent } from 'react';

import { useMediaQuery } from '@react-hook/media-query';
import { getBreakpoint } from '@/lib/tailwind';
import { useScopedI18n } from '@/i18n/client';
import { useEffect, useState } from 'react';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';

import type { BlogPostTocDesktopInnerProps } from './BlogPostTocDesktopInner';

import { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';
import { CardContent, CardHeader, CardTitle, Card } from '../Card';

export interface BlogPostTocDesktopProps {
  headings: DocumentHeading[];
}

const BlogPostTocDesktopLazy: FunctionComponent<BlogPostTocDesktopProps> = ({ headings }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const title = capitalize(scopedT('toc'));

  const placeholder = null;
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<BlogPostTocDesktopInnerProps>>>(null);

  useEffect(() => {
    if (!isLargeScreen || Component !== null) return;
    // eslint-disable-next-line promise/catch-or-return
    import('./BlogPostTocDesktopInner').then((component) => setComponent(() => component.default));
  });

  if (Component === null) return placeholder;

  return (
    <Card
      className="align-center ml-4 hidden h-fit w-60 border-none bg-black text-secondary dark:bg-card dark:text-foreground lg:block rtl:ml-0 rtl:mr-4"
      style={{ clipPath: `inset(1px 0% -${COLLAPSE_BUTTON_HEIGTH_IN_PX}px 0%)` }}
    >
      <CardHeader className="relative z-10 rounded-lg bg-black dark:bg-card">
        <CardTitle className="px-2 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className={'p-0 pb-6'}>
        <Component headings={headings} ariaLabel={title} />
      </CardContent>
    </Card>
  );
};

export default BlogPostTocDesktopLazy;
