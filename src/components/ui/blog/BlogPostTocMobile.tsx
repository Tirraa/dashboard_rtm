'use client';

import type { FunctionComponent } from 'react';

import dynamic from 'next/dynamic';

import type { SharedBlogPostTocProps } from './BlogPostTocDesktop';

const BlogPostTocMobileLazy = dynamic(() => import('./BlogPostTocMobileLazy'), { loading: () => <div className="min-h-[62px]" />, ssr: false });

interface BlogPostTocMobileProps extends SharedBlogPostTocProps {}

const BlogPostTocMobile: FunctionComponent<BlogPostTocMobileProps> = ({ headings }) => <BlogPostTocMobileLazy headings={headings} />;

export default BlogPostTocMobile;
