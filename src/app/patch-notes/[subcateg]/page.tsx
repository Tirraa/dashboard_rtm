import SubCategoryRelatedBlogPosts from '@/components/blog/SubCategoryRelatedBlogPosts';
import { adHocBlogPostsParamsRestBuilder } from '@/lib/blog';
import { BlogSubCategoryPageProps } from '@/types/Blog';
import { FunctionComponent } from 'react';

export const Page: FunctionComponent<BlogSubCategoryPageProps> = ({ params }) => {
  const params2 = adHocBlogPostsParamsRestBuilder();
  return <SubCategoryRelatedBlogPosts {...{ params, ...params2 }} />;
};

export default Page;
