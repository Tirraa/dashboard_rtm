'use client';

import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent } from 'react';

import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';

import { CardContent, CardHeader, CardTitle, Card } from '../Card';
import BlogPostTocDesktopInner from './BlogPostTocDesktopInner';

export interface BlogPostTocDesktopProps {
  headings: DocumentHeading[];
}

const BlogPostTocDesktopLazy: FunctionComponent<BlogPostTocDesktopProps> = ({ headings }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const title = scopedT('toc');

  return (
    <Card
      className="align-center ml-4 hidden h-fit w-60 border-none bg-black text-secondary dark:bg-card dark:text-foreground lg:block rtl:ml-0 rtl:mr-4"
      style={{ clipPath: 'inset(1px 0% -30px 0%)' }}
    >
      <CardHeader className="relative z-10 rounded-lg bg-black dark:bg-card">
        <CardTitle className="px-2 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <BlogPostTocDesktopInner headings={headings} ariaLabel={title} />
      </CardContent>
    </Card>
  );
};

export default BlogPostTocDesktopLazy;
