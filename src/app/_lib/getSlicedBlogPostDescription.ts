import BlogConfig from '../_config/blog';

export function getSlicedBlogPostDescription(description: string) {
  const takeLimit = BlogConfig.blogPostPeviewDescriptionCharactersLimit - 1;
  if (description.length <= takeLimit) return description;
  const slicedDescription = description.slice(0, takeLimit) + '…';
  return slicedDescription;
}
