import { Post, allPosts } from 'contentlayer/generated';
import { BlogCategory, BlogSlug } from '../_types/BlogProps';

export const getPost = (targettedSlug: BlogSlug, targettedCateg: '' | BlogCategory): undefined | Post =>
  allPosts.find((post) => post._raw.flattenedPath === (targettedCateg !== '' ? `${targettedCateg}/${targettedSlug}` : targettedSlug));
