import SubCategoryRelatedBlogPosts from '@/components/blog/SubCategoryRelatedBlogPosts';
import { adHocBlogPostsParamsRestBuilder } from '@/lib/blog';
import { BlogSubCategoryPageProps } from '@/types/Blog';

export function Page({ params }: BlogSubCategoryPageProps) {
  const params2 = adHocBlogPostsParamsRestBuilder();
  return <SubCategoryRelatedBlogPosts {...{ params, ...params2 }} />;
}
export default Page;
