'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { CardContent, CardHeader, CardTitle, Card } from '@/components/ui/Card';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { useScopedI18n } from '@/i18n/client';
import { useEffect, useState } from 'react';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';
import { cn } from '@/lib/tailwind';

import type { BlogPostTocDesktopInnerProps, SharedBlogPostTocProps } from '../types';

import { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

const BlogPostTocDesktopLazy: FunctionComponent<SharedBlogPostTocProps> = ({ headings }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const title = capitalize(scopedT('toc'));

  const placeholder = null;
  const isLargeScreen = useIsLargeScreen();

  const [Component, setComponent] = useState<MaybeNull<FunctionComponent<BlogPostTocDesktopInnerProps>>>(null);
  const [isMagnetized, setIsMagnetized] = useState<boolean>(false);

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
      <CardHeader
        className={cn('relative z-10 rounded-b-lg rounded-t-lg bg-black transition-[border-radius] duration-150 dark:bg-card', {
          'rounded-t-none': isMagnetized
        })}
      >
        <CardTitle className="px-2 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-[-2px] p-0 pb-6">
        <Component setIsMagnetized={setIsMagnetized} isMagnetized={isMagnetized} headings={headings} ariaLabel={title} />
      </CardContent>
    </Card>
  );
};

export default BlogPostTocDesktopLazy;
