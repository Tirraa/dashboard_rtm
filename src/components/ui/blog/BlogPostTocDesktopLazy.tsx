'use client';

import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent } from 'react';

import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import { useState } from 'react';

import { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';
import { CardContent, CardHeader, CardTitle, Card } from '../Card';
import BlogPostTocDesktopInner from './BlogPostTocDesktopInner';

export interface BlogPostTocDesktopProps {
  headings: DocumentHeading[];
}

const BlogPostTocDesktopLazy: FunctionComponent<BlogPostTocDesktopProps> = ({ headings }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const title = scopedT('toc');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <Card
      className="align-center ml-4 hidden h-fit w-60 border-none bg-black text-secondary dark:bg-card dark:text-foreground lg:block rtl:ml-0 rtl:mr-4"
      style={{ clipPath: `inset(1px 0% -${COLLAPSE_BUTTON_HEIGTH_IN_PX}px 0%)` }}
    >
      <CardHeader className="relative z-10 rounded-lg bg-black dark:bg-card">
        <CardTitle className="px-2 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent
        className={cn('p-0 pb-6', {
          'pb-4': isCollapsed
        })}
      >
        <BlogPostTocDesktopInner setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} headings={headings} ariaLabel={title} />
      </CardContent>
    </Card>
  );
};

export default BlogPostTocDesktopLazy;
