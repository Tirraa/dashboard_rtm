import BlogPost from '@/app/_components/_definitelyCoupledToServerCtx/BlogPost';
import BlogPostProps from '@/app/_types/BlogPostProps';
import { FunctionComponent } from 'react';

export const Page: FunctionComponent<BlogPostProps> = ({ params }) => <BlogPost {...{ params }} />;
export default Page;
