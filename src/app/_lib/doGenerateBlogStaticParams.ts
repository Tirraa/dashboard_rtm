import { allPosts } from 'contentlayer/generated';
import BlogTaxonomy from '../_taxonomies/blog';

export const doGenerateBlogStaticParams = async () => allPosts.map((post) => ({ [BlogTaxonomy.slug]: post._raw.flattenedPath }));
export default doGenerateBlogStaticParams;
