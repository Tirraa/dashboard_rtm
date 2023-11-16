import type { FunctionComponent } from 'react';
import Crumb from '../Crumb';

interface BlogPostCrumbProps {
  label: string;
  url: string;
}

const BlogPostCrumb: FunctionComponent<BlogPostCrumbProps> = ({ label, url }) => <Crumb label={label} href={url} isLeaf />;

export default BlogPostCrumb;
