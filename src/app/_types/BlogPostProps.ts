import BlogTaxonomy from '../_taxonomies/blog';

export interface BlogPostProps {
  params: {
    [BlogTaxonomy.slug]: string;
  };
}

export default BlogPostProps;
