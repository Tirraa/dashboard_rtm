import BlogTaxonomy from '../_taxonomies/blog';

export interface BlogPostProps {
  params: {
    [BlogTaxonomy.slug]: string;
  };
}

export interface BlogLayoutProps {
  params: {
    [BlogTaxonomy.category]: string;
  };
}
