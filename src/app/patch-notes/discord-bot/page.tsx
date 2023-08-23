import FolderRelatedBlogPosts from '@/app/_components/_definitelyCoupledToServerCtx/FolderRelatedBlogPosts';
import { Metadata } from 'next';

// {ToDo} i18n this!
const title = () => 'Bot Discord';

export const metadata: Metadata = {
  title: title(),
  description: 'lorem ipsum dolor sit amet'
};

export const Page = () => <FolderRelatedBlogPosts {...{ title }} />;

export default Page;
