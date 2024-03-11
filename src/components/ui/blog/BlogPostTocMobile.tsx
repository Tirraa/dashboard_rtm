'use client';

import type { FunctionComponent } from 'react';

import dynamic from 'next/dynamic';

import type { BlogPostTocDesktopProps } from './BlogPostTocDesktopLazy';

const BlogPostTocMobileLazy = dynamic(() => import('./BlogPostTocMobileLazy'), { loading: () => <div className="min-h-[62px]" />, ssr: false });

interface BlogPostTocMobileProps extends BlogPostTocDesktopProps {}

const BlogPostTocMobile: FunctionComponent<BlogPostTocMobileProps> = ({ headings }) => <BlogPostTocMobileLazy headings={headings} />;

export default BlogPostTocMobile;
