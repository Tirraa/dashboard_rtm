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

const BlogPostTocDesktop: FunctionComponent<BlogPostTocDesktopProps> = ({ headings }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const title = scopedT('toc');

  return (
    <aside className="sticky top-16 h-0 hover:opacity-100 lg:block lg:w-0">
      <Card className="align-center ml-4 hidden h-fit w-60 border-black bg-black text-secondary dark:border-card dark:bg-card dark:text-foreground lg:block rtl:ml-0 rtl:mr-4">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogPostTocDesktopInner headings={headings} ariaLabel={title} />
        </CardContent>
      </Card>
    </aside>
  );
};

export default BlogPostTocDesktop;
