import BlogTaxonomy from '../_taxonomies/blog';

export type BlogCategory = 'dashboard' | 'discord-bot';
export type BlogSlug = string;

export interface BlogPostProps {
  params: {
    [BlogTaxonomy.slug]: BlogSlug;
  };
}

export interface BlogLayoutProps {
  params: {
    [BlogTaxonomy.category]: BlogCategory;
  };
}
