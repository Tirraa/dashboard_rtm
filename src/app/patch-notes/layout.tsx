import { allPosts } from 'contentlayer/generated';
import { ReactNode } from 'react';

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const BlogLayout = ({ children }: { children: ReactNode }) => <>{children}</>;
export default BlogLayout;
