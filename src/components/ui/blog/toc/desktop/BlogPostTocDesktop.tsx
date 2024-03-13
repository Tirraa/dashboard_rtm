'use client';

import type { FunctionComponent } from 'react';

import dynamic from 'next/dynamic';

import type { SharedBlogPostTocProps } from '../types';

const BlogPostTocDesktopLazy = dynamic(() => import('./BlogPostTocDesktopLazy'), { ssr: false });

const BlogPostTocDesktop: FunctionComponent<SharedBlogPostTocProps> = ({ headings }) => {
  return (
    <aside className="sticky top-16 h-0 hover:opacity-100 lg:block lg:w-0">
      <BlogPostTocDesktopLazy headings={headings} />
    </aside>
  );
};

export default BlogPostTocDesktop;
