import SubCategoryRelatedBlogPosts from '@/components/blog/SubCategoryRelatedBlogPosts';
import { BlogSubCategoryPageProps } from '@/types/Blog';

export const Page = ({ params }: BlogSubCategoryPageProps) => <SubCategoryRelatedBlogPosts {...{ params }} />;
export default Page;
