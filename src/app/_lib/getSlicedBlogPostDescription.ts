import BlogConfig from '../_config/blog';

type DescriptionAsIs = string;
type CroppedDescription = string;

export function getSlicedBlogPostDescription(description: string): DescriptionAsIs | CroppedDescription {
  const takeLimit = BlogConfig.blogPostPeviewDescriptionCharactersLimit - 1;
  if (description.length <= takeLimit) {
    return description;
  }
  const slicedDescription = description.slice(0, takeLimit) + '…';
  return slicedDescription;
}
