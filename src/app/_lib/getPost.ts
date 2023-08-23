import { allPosts } from 'contentlayer/generated';

export const getPost = (slug: string, curCategory: string) =>
  allPosts.find((post) => post._raw.flattenedPath === (curCategory !== '' ? `${curCategory}/${slug}` : slug));
