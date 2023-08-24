import FolderRelatedBlogPosts from '@/app/_components/_definitelyCoupledToServerCtx/FolderRelatedBlogPosts';
import { BlogLayoutProps } from '@/app/_types/Blog';

export const Page = ({ params }: BlogLayoutProps) => <FolderRelatedBlogPosts {...{ params }} />;
export default Page;
