'use client';

import type { PostBase } from '@/types/Blog';
import type { FunctionComponent } from 'react';
import Crumb from '../Crumb';

interface BlogPostCrumbProps {
  post: PostBase;
}

const BlogPostCrumb: FunctionComponent<BlogPostCrumbProps> = ({ post }) => <Crumb label={post.title} href={post.url} isLeaf />;

export default BlogPostCrumb;
