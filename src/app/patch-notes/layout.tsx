import { allPatchPosts } from 'contentlayer/generated';
import { ReactNode } from 'react';
import BlogTaxonomy from '../_taxonomies/blog';

// {ToDo} dynamically associate categ's parent folder name with postsCollection
// So we will write: verySmartFunction().map((post) => ...)
export const generateStaticParams = async () => allPatchPosts.map((post) => ({ [BlogTaxonomy.slug]: post._raw.flattenedPath }));

export const BlogLayout = ({ children }: { children: ReactNode }) => <>{children}</>;
export default BlogLayout;
