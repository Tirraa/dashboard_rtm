'use client';

import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { FunctionComponent } from 'react';

import dynamic from 'next/dynamic';

const BlogPostTocDesktopLazy = dynamic(() => import('./BlogPostTocDesktopLazy'), { ssr: false });

export interface SharedBlogPostTocProps {
  headings: DocumentHeading[];
}

const BlogPostTocDesktop: FunctionComponent<SharedBlogPostTocProps> = ({ headings }) => {
  return (
    <aside className="sticky top-16 h-0 hover:opacity-100 lg:block lg:w-0">
      <BlogPostTocDesktopLazy headings={headings} />
    </aside>
  );
};

export default BlogPostTocDesktop;
