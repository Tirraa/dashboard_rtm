import FolderRelatedBlogPosts from '@/app/_components/_definitelyCoupledToServerCtx/FolderRelatedBlogPosts';

export const Page = ({ params }: { params: { categ: string } }) => <FolderRelatedBlogPosts title={() => params.categ} />;
export default Page;
