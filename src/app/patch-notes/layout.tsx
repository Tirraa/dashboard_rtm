import { allPosts } from 'contentlayer/generated';
import { ReactNode } from 'react';
import BlogTaxonomy from '../_taxonomies/blog';

export const generateStaticParams = async () => allPosts.map((post) => ({ [BlogTaxonomy.slug]: post._raw.flattenedPath }));

export const BlogLayout = ({ children }: { children: ReactNode }) => <>{children}</>;
export default BlogLayout;
