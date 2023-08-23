import FolderRelatedBlogPosts from '@/app/_components/_definitelyCoupledToServerCtx/FolderRelatedBlogPosts';
import BlogTaxonomy from '@/app/_taxonomies/blog';
import { BlogLayoutProps } from '@/app/_types/BlogProps';

export const Page = ({ params }: BlogLayoutProps) => <FolderRelatedBlogPosts title={() => params[BlogTaxonomy.category]} />;
export default Page;
