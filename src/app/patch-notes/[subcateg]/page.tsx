import SubCategoryRelatedBlogPosts from '@/app/_components/blog/SubCategoryRelatedBlogPosts';
import { BlogSubCategoryPageProps } from '@/app/_types/Blog';

export const Page = ({ params }: BlogSubCategoryPageProps) => <SubCategoryRelatedBlogPosts {...{ params }} />;
export default Page;
